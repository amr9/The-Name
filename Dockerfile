# The Name — static site.
#
# Stage 1 builds the Vite bundle, stage 2 serves it with nginx. The bundle is
# built, not served by `vite preview`, so what runs in production is the same
# artefact `npm run build` produces locally.

# — build —
FROM node:20-alpine AS build
WORKDIR /app

# Dependencies first so a source-only change reuses this layer.
COPY package.json package-lock.json ./
RUN npm ci

COPY index.html vite.config.js ./
COPY public ./public
COPY src ./src
COPY shared ./shared

# Vite substitutes this at build time, so it is an ARG rather than a runtime
# env var. Leave it empty to keep the form posting to the same-origin
# /api/contact that nginx proxies below.
ARG VITE_CONTACT_ENDPOINT=""
ENV VITE_CONTACT_ENDPOINT=$VITE_CONTACT_ENDPOINT

RUN npm run build

# — serve —
FROM nginx:1.27-alpine AS runtime

# A template, not a plain config: nginx's entrypoint runs envsubst over
# /etc/nginx/templates at start-up, so CONTACT_UPSTREAM can point somewhere
# else without rebuilding the image.
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

# Where /api/ is forwarded — the compose service name by default.
ENV CONTACT_UPSTREAM=http://contact:8787

EXPOSE 80
