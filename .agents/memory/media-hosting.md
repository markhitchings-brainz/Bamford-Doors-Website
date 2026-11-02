---
name: Website video hosting
description: Hosting choice for supplied website videos and Vercel deployment constraints.
---

Use the existing Sanity project to host supplied website videos, with direct in-page playback rather than Vimeo embeds.

**Why:** The user chose Sanity for these videos. The website is intended for Vercel, so large MP4s must not depend on a Replit development server or be committed to the website repository.

**How to apply:** Upload website-ready copies to Sanity and use its permanent public CDN URLs. Keep original uploads unchanged and generated media outside Git. The connected Sanity local-file upload tool has a 50 MiB limit; optimise larger files before uploading and disclose any resolution reduction.
