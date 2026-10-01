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

// — the confirmation email, to the VISITOR —
//
// Deliberately contains NOTHING the visitor typed — not their name, not
// their message. Anyone can type someone else's address into the form; if
// their text were echoed here, the form would become a way to send arbitrary
// content to strangers from our mail server. This way the worst a stranger
// receives is one short, fixed note they can ignore (and the per-address
// rate limit caps how many).
const CONFIRM_COPY = {
  EN: {
    dir: 'ltr',
    subject: `Please confirm your message to ${site.name}`,
    lead: 'Thanks for getting in touch.',
    body: 'To make sure this email address is really yours, please confirm your message:',
    button: 'Confirm my message',
    after: (hours) => `We only receive your message once you confirm. The link works for ${hours} hours.`,
    ignore: 'If you did not write to us, you can ignore this email — nothing will be sent.',
  },
  AR: {
    dir: 'rtl',
    subject: `يرجى تأكيد رسالتك إلى ${site.name}`,
    lead: 'شكرًا لتواصلك معنا.',
    body: 'للتأكد من أن عنوان البريد الإلكتروني هذا يخصّك، يرجى تأكيد رسالتك:',
    button: 'تأكيد رسالتي',
    after: (hours) => `لن تصلنا رسالتك إلا بعد التأكيد. يعمل الرابط لمدة ${hours} ساعة.`,
    ignore: 'إذا لم تراسلنا، يمكنك تجاهل هذه الرسالة — لن يُرسَل أي شيء.',
  },
};

export function buildConfirmation(row, link) {
  const c = CONFIRM_COPY[row.lang] ?? CONFIRM_COPY.EN;
  const hours = Math.round(config.confirm.ttlMs / 3600000);
  return {
    from: config.smtp.from,
    to: headerSafe(row.email, 200),
    subject: c.subject,
    text: [c.lead, '', c.body, '', link, '', c.after(hours), '', c.ignore, '', `— ${site.name}`].join('\n'),
    // A plain button for mail clients that show HTML. Every string in it is
    // ours (the link is our origin + a base64url token), so nothing needs
    // escaping — keep it that way if this ever gains a visitor field.
    html: `<!doctype html><html dir="${c.dir}"><body style="font-family:Arial,sans-serif;color:#000;line-height:1.6;max-width:520px;margin:0 auto;padding:24px">
<p>${c.lead}</p>
<p>${c.body}</p>
<p style="margin:28px 0"><a href="${link}" style="background:#ffbd14;color:#000;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:12px;display:inline-block">${c.button}</a></p>
<p style="font-size:13px;color:#4c4c4c">${c.after(hours)}<br>${c.ignore}</p>
<p style="font-size:13px;color:#4c4c4c">— ${site.name}</p>
</body></html>`,
  };
}

export function sendConfirmation(row, link) {
  return transport.sendMail(buildConfirmation(row, link));
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
