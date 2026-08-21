# A Little Letter for Oca

A private-feeling, mobile-first birthday experience made for Oca by William. It runs entirely in the browser: there is no database, account, analytics, or server-side answer storage.

## Before sharing it

To make the last button open William's WhatsApp chat directly, put his full number (country code included, without `+`, spaces, or dashes) in `WILLIAM_WHATSAPP` near the top of `app/page.tsx`. For example, an Indonesian number would start with `62`. If it stays blank, WhatsApp will let Oca choose the chat herself.

## Publish with GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Push to `main` or `master`. The included workflow will build and publish the site automatically.

The site also works locally with `npm install` followed by `npm run dev`.
