# The Name — contact form service.
#
# Build this from the REPO ROOT, not from server/:
#   docker build -f server/Dockerfile -t thename-contact .
# The service imports ../shared/contactForm.js and ../src/data/site.js, so
# the context has to include them (see server/README.md).
#
# Debian slim rather than Alpine on purpose: better-sqlite3 is a native
# module and publishes prebuilt binaries for glibc, not musl. On Alpine
# every build would compile it from source.

# — dependencies —
FROM node:22-bookworm-slim AS deps
WORKDIR /app

# The toolchain is only a fallback: npm normally downloads a prebuilt
# better-sqlite3 binary. If the prebuild is ever missing for this platform,
# node-gyp compiles it here instead of failing the build.
RUN apt-get update \
 && apt-get install -y --no-install-recommends python3 make g++ \
 && rm -rf /var/lib/apt/lists/*

COPY server/package.json server/package-lock.json ./
RUN npm ci --omit=dev

# — runtime —
FROM node:22-bookworm-slim
WORKDIR /app

ENV NODE_ENV=production

# Compiled against the same base image, so the native binding matches.
COPY --from=deps /app/node_modules ./server/node_modules

# Only the two files outside server/ that the service actually imports.
COPY shared ./shared
COPY src/data/site.js ./src/data/site.js
COPY server/package.json ./server/
COPY server/*.js ./server/
COPY server/scripts ./server/scripts

# The SQLite file lives here. Mount a volume over it — without one the
# submissions are lost with the container.
RUN mkdir -p /app/data && chown -R node:node /app/data
VOLUME ["/app/data"]

USER node
WORKDIR /app/server

ENV PORT=8787 \
    DB_PATH=/app/data/contact.db

EXPOSE 8787

# Node's own fetch, so the image needs no curl or wget for its healthcheck.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||8787)+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# Not `npm start`: that wraps node in a shell that would not forward
# SIGTERM, and the worker needs the signal to finish an in-flight send
# before the process goes away.
CMD ["node", "index.js"]
