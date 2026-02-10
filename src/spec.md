# Specification

## Summary
**Goal:** Remove the custom flame-sword cursor and restore the normal system cursor across the React app and the standalone landing page.

**Planned changes:**
- Remove the `CustomCursor` component from the global React layout so no custom cursor overlay elements are mounted.
- Update global frontend CSS to stop forcing `cursor: none` and restore standard cursor behavior (including pointer cursors on interactive elements).
- Remove/disable any mousemove-based cursor-follow animation logic and ensure no ring/glow artifacts remain on any route.
- Update the standalone landing page to remove CSS and JS that creates/animates custom cursor elements, while keeping existing standalone interactions working (mobile menu, FAQ accordion, smooth scrolling, contact-form success state).

**User-visible outcome:** The site uses the standard system cursor everywhere, with no custom cursor animation or visual overlay, and all existing page interactions continue to work.
