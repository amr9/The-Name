// SMTP delivery. Called only by the queue worker — nothing on the request
// path waits for a mail server.

import nodemailer from 'nodemailer';

import { config } from './config.js';
import { site } from '../src/data/site.js';

export const mailTo = config.mailTo || site.email;

const transport = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.secure,
  auth: { user: config.smtp.user, pass: config.smtp.pass },
});

// Header values are visitor-supplied, and a bare CR or LF in one is how a
// header injection starts (an extra Bcc:, a forged From:). Strip them and
// cap the length before anything reaches a header.
function headerSafe(value, max = 200) {
  return String(value ?? '')
    .replace(/[\r\n]+/g, ' ')
    .trim()
    .slice(0, max);
}

// A submission row from the database -> the message the business receives.
export function buildEnquiry(row) {
  const name = headerSafe(row.name, 120);
  const email = headerSafe(row.email, 200);

  return {
    from: config.smtp.from,
    to: mailTo,
    // So hitting reply in the mail client answers the visitor directly.
    replyTo: { name, address: email },
    subject: `Website enquiry — ${name}`,
    text: [
      // Single-line fields are flattened here too. Not for safety — the
      // body cannot inject a header — but so a newline pasted into the name
      // box cannot make the summary block unreadable.
      `Name:    ${headerSafe(row.name, 120)}`,
      `Email:   ${headerSafe(row.email, 200)}`,
      `Phone:   ${headerSafe(row.phone, 40) || '—'}`,
      '',
      row.message,
      '',
      '—',
      `Received: ${row.created_at}`,
      `IP:       ${row.ip || 'unknown'}`,
      `Ref:      #${row.id}`,
      `Sent from the ${site.name} website contact form`,
    ].join('\n'),
  };
}

export function sendEnquiry(row) {
  return transport.sendMail(buildEnquiry(row));
}

// Proves the credentials at boot instead of at the first enquiry. A failure
// is logged, not fatal — the queue holds submissions safely either way, and
// a contact form that still accepts messages during an SMTP outage is worth
// more than one that refuses to start.
export async function verifyTransport() {
  try {
    await transport.verify();
    console.log(`[contact] SMTP ready at ${config.smtp.host}:${config.smtp.port}`);
    return true;
  } catch (err) {
    console.error(`[contact] SMTP not reachable: ${err.message} — submissions will queue until it is`);
    return false;
  }
}

export function closeMailer() {
  transport.close();
}
