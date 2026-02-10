# Specification

## Summary
**Goal:** Make the app’s public domain/host easy to change by centralizing domain configuration and removing hardcoded domain references.

**Planned changes:**
- Add a single, clearly documented frontend “public domain” setting (e.g., an env var or centralized config constant) and use it wherever the app references its own domain/host.
- Replace hardcoded `growithtutor.com` references (including the marketing header/footer logo URL host) in the React marketing header/footer and the standalone static landing page with the new centralized domain setting (or a documented constant for the standalone page).
- Update deployment documentation with a “Changing the Domain” section that explains DNS/hosting considerations and lists all locations/settings affected by a domain change (including the standalone landing page), with guidance to keep settings in sync.
- Add a small read-only “Domain Settings” checklist item/note in the existing setup/checklist UX to display the currently configured public domain/host value.

**User-visible outcome:** An admin/deployer can change the app’s domain in one documented place, see the configured domain in the app’s setup/checklist UI, and the marketing header/footer + standalone landing page will use the updated domain without hunting for hardcoded references.
