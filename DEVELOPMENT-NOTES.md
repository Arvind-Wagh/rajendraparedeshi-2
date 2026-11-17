# Development and pre-publication review

This static site is a review draft. Do not host or promote it until the items below have been checked by Dr. Pardeshi and, where noted, an appropriate reviewer.

## Doctor confirmation

See [DOCTOR-CONFIRMATION.md](DOCTOR-CONFIRMATION.md) for the separate confirmation checklist.

## Medical and legal review

- Have a qualified clinician review every health-related statement, topic summary, service description, emergency instruction, and any future educational article before publication. The current education cards are short topic summaries, not full articles.
- Have legal counsel review the Privacy Policy and Terms & Conditions before publication. In particular, confirm the website operator/data controller identity, hosting log practices, email handling and retention, any messaging-consent process, external-service disclosures, applicable privacy obligations, and whether any jurisdiction or intellectual-property wording is needed.
- Confirm that the optional SMS/RCS/WhatsApp checkbox wording and any subsequent use of those channels match the practice's actual communications process. The box is unchecked by default and is not required.

## Contact form limitations

- The form is client-side only. It validates name, phone number, and email, then opens a prefilled `mailto:` draft.
- The website has no backend, database, delivery confirmation, spam filtering, or submission tracking. The visitor must send the draft in their own email application; if no email application is configured, the form cannot complete the enquiry.
- The optional messaging checkbox value is included in the draft. The site itself does not transmit or save form data.
- Do not describe this as appointment booking, an online consultation, or a confirmed submission.

## SEO and hosting checks

- The canonical URL, social metadata, `robots.txt`, and `sitemap.xml` currently use `https://rajendrasinghpardeshi.com/`. Confirm the production domain, HTTPS setup, and control of that domain before hosting.
- Re-check canonical and social image URLs after any domain or path change. Update `sitemap.xml` after future content changes.
- Confirm image ownership and intended sharing image before enabling search indexing or social promotion.

