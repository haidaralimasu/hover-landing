// Single source for company facts and fees shown on /company, the FAQ and
// JSON-LD. Every value here must match production (backend GitHub `prod`
// vars / settings.py defaults) - see docs/claims.md. Change both together.

export const company = {
  legalName: "Hover Technologies LLC",
  address: {
    street: "1001 S Main St",
    city: "Kalispell",
    region: "MT",
    postalCode: "59901",
    country: "US",
  },
  email: "tech@hover.money",
} as const;

// backend settings.py: TRANSFER_FEE_BPS (0), BRIDGE_DEVELOPER_FEE_BPS (100),
// BRIDGE_OFFRAMP_FEE_BPS (50). None are overridden in prod as of 2026-10-28.
export const fees = {
  sendToHoverUser: 0,
  addFromBank: 1,
  withdrawToBank: 0.5,
} as const;
