# Specification

## Summary
**Goal:** Allow the currently logged-in Internet Identity user to securely bootstrap themselves as the first admin (using the existing secret-token mechanism) so they can access content management.

**Planned changes:**
- Backend: Add/enable a secure admin initialization flow that, when no admins exist, accepts a secret token and promotes the caller’s principal to admin; reject missing/invalid tokens.
- Backend: Ensure existing admin authorization checks used by blog CRUD recognize the newly promoted admin principal.
- Backend: Prevent arbitrary promotion once an admin exists (fail or require existing admin privileges).
- Frontend: Add an admin setup screen that shows the logged-in user’s Principal ID and current admin status.
- Frontend: Provide an input for the bootstrap secret token using the existing `caffeineAdminToken` parameter convention, trigger actor re-initialization, and refresh admin status.
- Frontend: On successful bootstrap, show updated admin status and provide navigation to `/admin/blogs`.

**User-visible outcome:** A logged-in user can view/copy their Principal ID, see whether they are an admin, enter the bootstrap secret to become the first admin (when allowed), and then navigate to the admin blog management page.
