# Specification

## Summary
**Goal:** Replace text-only “Growithtutor” branding in marketing header/footer (and the standalone static marketing page) with the provided external logo image URL, while keeping navigation, accessibility, and layout intact.

**Planned changes:**
- Update `MarketingHeader` brand mark to render an `<img>` with `src="https://growithtutor.com/wp-content/uploads/2025/08/cropped-cropped-growithtutor-3d-new-logo-150x150.png"`, preserve click-to-home behavior, add meaningful English alt text, constrain sizing, and show a visible “Growithtutor” text fallback if the image fails to load.
- Update `MarketingFooter` brand mark to render the same `<img>` (same exact `src`), with meaningful English alt text, appropriate sizing, and a visible “Growithtutor” text fallback if the image fails to load; keep existing footer links/content unchanged.
- Update `SetupChecklistPage` so the “Logo” checklist item is marked complete and its details reference the configured logo source URL in English.
- Update `frontend/static/growwithtutor-standalone/index.html` so both the header and footer brand marks use the provided logo image URL (exact `src`), with meaningful English alt text and sizing that does not break layout, keeping the rest of the page intact.

**User-visible outcome:** The marketing header, marketing footer, and standalone static marketing page display the Growithtutor logo image (with accessible alt text and safe sizing), while still showing “Growithtutor” if the image can’t be loaded; the setup checklist reflects that the logo is configured via the provided URL.
