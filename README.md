# A Little Letter for Jessica

A private-feeling, mobile-first birthday experience made for Jessica by Rey. It runs entirely in the browser: there is no database, account, analytics, or server-side answer storage.

## Before sharing it

To make the last button open Rey's WhatsApp chat directly, put his full number (country code included, without `+`, spaces, or dashes) in `REY_WHATSAPP` near the top of `app/page.tsx`. For example, an Indonesian number would start with `62`. If it stays blank, WhatsApp will let Jessica choose the chat herself.

## Publish with GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Push to `main` or `master`. The included workflow will build and publish the site automatically.

The site also works locally with `npm install` followed by `npm run dev`.
