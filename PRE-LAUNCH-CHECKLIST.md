# Convoria MSP Billing Toolkit: Pre-launch Checklist

## Required before accepting payment

- [ ] Set the verified payment-provider URL in `CONVORIA_MSP_CHECKOUT_URL` in `assets/convoria.js`.
- [ ] Confirm the £49 price, currency, VAT/tax treatment, invoice process and any regional consumer-law obligations.
- [ ] Confirm the refund policy before publishing any refund promise. The public page currently makes no 14-day refund claim.
- [ ] Test the payment flow, confirmation email and fulfilment process end to end after a checkout URL is provided.

## Claims requiring operational verification

- [ ] Verify any future claim about encrypted file storage before publishing it.
- [ ] Verify any future claim about expiring file-sharing links before publishing it.
- [ ] Verify any future claim about file deletion within 14 days before publishing it.
- [ ] Create and validate a compatibility matrix for PSA and distributor export formats before claiming broad support.
- [ ] Confirm the exact scope, turnaround, data-handling process and commercial terms for the done-for-you reconciliation service.
- [ ] Confirm the feasibility language and supported systems for each email-to-ticket implementation before making system-specific claims.

## Deployment and content

- [ ] Replace the relative canonical URLs with the final production HTTPS URLs for the homepage and `/msp-billing-toolkit/` route.
- [ ] Confirm that the production static host serves `msp-billing-toolkit/index.html` at `/msp-billing-toolkit/`.
- [ ] Review the existing Google Apps Script form endpoint and obtain/retain appropriate privacy consent for submitted lead data.
- [ ] Review the fictional report disclosure after any product or sample-data changes.
- [ ] Add approved privacy and terms pages, then replace the footer email-based privacy contact link with their real URLs.
