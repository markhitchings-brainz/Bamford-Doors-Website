# Publishing news and case studies

## Open the editor

After deploying this version to Vercel, open:

https://bamford-doors-website.vercel.app/admin

Once the main domain serves this version, the same editor is available at:

https://bamforddoors.com/admin

Sign in with a Sanity account that has editing access to the Bamford Doors project. Website enquiry accounts do not grant access to Sanity. These exact hosts and the current Replit preview have been authorised for authenticated Sanity requests; new preview/deployment hostnames need to be authorised separately. Do not allow all Vercel websites through a wildcard.

The local screenshot/browser-check origin is also allowed for public read-only requests, without authenticated editing.

## Create a case study

1. Choose **Case studies**, then create a document.
2. Add a project title and generate the URL slug. Avoid changing this after sharing the link.
3. Write the introduction, **The brief**, **Our solution** and **The outcome**.
4. Add the feature image and its image description. Add optional gallery images and captions in the Images tab; drag to reorder.
5. Add any applicable location, sector, completion date and products used in Project details.
6. Client names and testimonials are optional. Only publish information and quotations you have permission to use.
7. Check the publication date and optional SEO title/description in Search & publishing.
8. Choose **Publish**.

Sanity saves drafts separately. Saving a draft does not change the live site; publish your edits to make them public. Unpublish a document to remove it from the public collection, or use Sanity's document actions to delete it. Avoid deleting documents as a substitute for editing.

The listing shows newest publication dates first. Future-dated documents are excluded until their date has passed; this is not an automatic Vercel deployment scheduler.

## Create a news story

Choose **News stories**. Add the title, URL slug, introduction, feature image, article text, category, publication date and optional SEO fields, then publish.

## When changes appear

The public website fetches published content from Sanity on page load. Refresh the page after publishing; the Sanity CDN may take a short time to reflect a change. Drafts are never requested by the public client.

The production build also reads published case studies to generate their route metadata and sitemap entries. With no published projects, the case-study listing displays a genuine empty state and is kept noindex. When projects exist at build time, their URLs and the listing are included in the sitemap.

**The automatic Sanity-to-Vercel rebuild webhook is not configured by this change.** Until it is connected, redeploy Vercel after publishing, unpublishing, deleting or changing a case-study URL to refresh the static SEO files. Future-dated publications need a rebuild when they become public too. A Sanity webhook connected to a Vercel Deploy Hook can automate rebuilds; treat that hook URL as a credential and never put it in browser code or Git.

The first deployment of this version is required before the Vercel editor can offer the new Case study content type.
