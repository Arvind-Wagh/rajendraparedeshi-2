# Website QA report

**Reviewed:** 17 November 2026  
**Preview:** Local XAMPP website in a browser using Playwright controls

## Results

- Homepage, Privacy Policy, and Terms & Conditions loaded with the expected titles and headings.
- Mobile navigation opened, closed after a link selection, and navigated to the intended section. Legal-page navigation and Privacy Policy/Terms links also worked.
- All four website-information tabs activated their matching visible panel. Arrow-key navigation between tabs was also checked.
- Form validation rejected a one-character name, a six-digit phone number, and a malformed email. The optional messaging checkbox remained unchecked and was not required. The invalid form did not navigate or display a success state.
- All six displayed images loaded in the browser and had alt text. No broken in-page anchor targets were found.
- Telephone, email, and WhatsApp link targets were present and consistent with the displayed contact details.
- Browser console error log was empty during the checks.
- Document width did not exceed the viewport at 320, 360, 390, 430, 768, 1024, 1366, or 1920 pixels.
- JavaScript syntax check (`node --check assets/js/app.js`) completed successfully.
- `sitemap.xml` parsed as valid XML. Homepage JSON-LD parsed as valid JSON and uses a `Person` type with reduced claims.

## Limits

- The valid-form email handoff was not launched during QA. The form uses `mailto:`; successful delivery depends on the visitor's email application and requires the visitor to send the draft.
- No backend, storage, or third-party submission service was added.
- No external rich-results validator, production hosting, live phone call, or live WhatsApp conversation was used.
- Contact details, clinic relationship and imagery, all health content, and legal wording still require the confirmations and reviews listed in the development documents before hosting.

