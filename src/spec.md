# Specification

## Summary
**Goal:** Add admin-only maintenance mode (“unpublish/take site offline”) and make domain change guidance clear and discoverable.

**Planned changes:**
- Add an admin-only “Unpublish / Take site offline” action on `/admin/blogs` that sets `siteLive=false`, shows a success confirmation, and explains it is maintenance mode (no canister rollback).
- When `siteLive=false`, render a maintenance screen on all non-`/admin` routes while keeping `/admin` routes accessible.
- Update the Setup Checklist to display the detected public domain and provide English instructions for changing it via `VITE_PUBLIC_DOMAIN` or the fallback in `frontend/src/config/publicDomain.ts`, with a reference to `frontend/DEPLOYMENT.md`.
- Expand `frontend/DEPLOYMENT.md` with step-by-step domain change instructions, including `VITE_PUBLIC_DOMAIN` and the standalone landing page domain location (`frontend/static/growwithtutor-standalone/index.html`).

**User-visible outcome:** Admins can explicitly take the public site offline without rolling back deployment, and users can follow clear in-app and documentation steps to update the app’s public domain configuration.
