---
name: Sanity Studio dependency compatibility
description: Sanity Studio package compatibility and package-registry behavior observed in this workspace.
---

Use a Sanity Studio version whose React peer requirements match the site's React version, and keep `react` and `react-dom` on the exact same release. An older Sanity Studio dependency graph was blocked by the workspace package registry through a transitive package; do not bypass the firewall.

**Why:** Several dependency approaches were needed before finding an installable Studio version compatible with this React app.

**How to apply:** Check Sanity's current peer dependencies and the app's installed React versions before upgrading, downgrading, or adding Studio packages. If the registry blocks a dependency, prefer a newer compatible release rather than forcing the blocked package.

Do not treat failed Sanity queries from a loopback verification server as proof of a broken production bundle.

**Why:** A local production-browser check could load the CMS SDK and Studio chunks successfully, but Sanity rejected the loopback origin with CORS errors. Server-side static builds still fetched published data successfully.

**How to apply:** Separate chunk/runtime failures from origin-allowlist failures. Use a permitted browser origin for full CMS/sign-in verification; do not broaden Sanity access settings just to make a local test pass.
