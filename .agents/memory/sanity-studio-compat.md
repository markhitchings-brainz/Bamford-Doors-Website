---
name: Sanity Studio dependency compatibility
description: Sanity Studio package compatibility and package-registry behavior observed in this workspace.
---

Use a Sanity Studio version whose React peer requirements match the site's React version, and keep `react` and `react-dom` on the exact same release. An older Sanity Studio dependency graph was blocked by the workspace package registry through a transitive package; do not bypass the firewall.

**Why:** Several dependency approaches were needed before finding an installable Studio version compatible with this React app.

**How to apply:** Check Sanity's current peer dependencies and the app's installed React versions before upgrading, downgrading, or adding Studio packages. If the registry blocks a dependency, prefer a newer compatible release rather than forcing the blocked package.
