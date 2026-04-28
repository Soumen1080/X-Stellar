export const LS_PUBLIC_KEY = "stellar_star_public_key";
export const LS_USER = "stellar_star_user";

export const STELLAR_HORIZON_URL =
  process.env.NEXT_PUBLIC_STELLAR_HORIZON_URL ??
  "https://horizon-testnet.stellar.org";

export const STELLAR_NETWORK =
  process.env.NEXT_PUBLIC_STELLAR_NETWORK ?? "TESTNET";

export const NETWORK_PASSPHRASE =
  STELLAR_NETWORK === "PUBLIC"
    ? "Public Global Stellar Network ; September 2015"
    : "Test SDF Network ; September 2015";

export const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID ?? "";

export const STELLAR_EXPLORER =
  STELLAR_NETWORK === "PUBLIC"
    ? "https://stellar.expert/explorer/public"
    : "https://stellar.expert/explorer/testnet";

export const FREIGHTER_ID = "freighter";
