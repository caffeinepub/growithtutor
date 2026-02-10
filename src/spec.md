# Specification

## Summary
**Goal:** Display all central contact phone numbers with the India country code prefix “+91 ” across the React app and the standalone landing page, while keeping call/SMS/WhatsApp links working.

**Planned changes:**
- Update `frontend/src/content/siteContent.ts` contact numbers to include the “+91 ” prefix for `whatsapp`, `whatsappSecondary`, `phone1`, and `phone2`.
- Ensure all React components/pages that render these central contact numbers (including ContactPage, ContactSection, MarketingFooter) display the updated “+91 ” prefixed values.
- Update `frontend/static/growwithtutor-standalone/script.js` contact numbers to include the “+91 ” prefix for `CONTENT.contact.whatsapp` and `CONTENT.contact.phone`.
- Adjust/verify tel:, sms:, and wa.me deep link generation so links use digits-only versions of the numbers (e.g., `917011090796`) even though the displayed text includes “+91 ”.

**User-visible outcome:** All displayed contact phone numbers show “+91 ” in front, and “Call Now”, “Send SMS”, and WhatsApp buttons still open the correct destinations.
