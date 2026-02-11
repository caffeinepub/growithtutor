# Specification

## Summary
**Goal:** Deploy Version 30 to production (Internet Computer mainnet) so the backend and frontend canisters are accessible via mainnet URLs and do not expire like drafts.

**Planned changes:**
- Run a production/mainnet deployment for both backend and frontend canisters (e.g., `dfx deploy --network ic`) and confirm the deployed app is reachable via mainnet canister URL(s).
- Perform a brief post-deploy verification: load the home page, navigate to `/blogs`, and confirm admin routes remain gated behind Internet Identity.
- Update `frontend/DEPLOYMENT.md` with an end-to-end “promote Version 30 to production” section including prerequisites (cycles), exact mainnet deploy command(s), verification steps, and a note that production deployments do not expire (unlike drafts).

**User-visible outcome:** The Version 30 app is live on IC mainnet via its canister URL(s), loads without errors, `/blogs` works, and admin routes are still protected by Internet Identity; deployment docs clearly explain how to repeat this production release process.
