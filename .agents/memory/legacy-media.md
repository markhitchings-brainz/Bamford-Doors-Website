---
name: Legacy media availability
description: Reliability constraints when referencing images from the old Bamford WordPress site.
---

Treat a browser-rendered image as the availability check for legacy media, not a successful HEAD request.

**Why:** The old Bamford site has returned 200 to HEAD and default curl requests but 403 to browser-like requests for portrait images. Other images have loaded, so availability is asset-specific.

**How to apply:** Verify externally referenced media in the actual page, retain a clean unavailable-image state, and use user-supplied originals for media that must survive retirement of the old WordPress host.
