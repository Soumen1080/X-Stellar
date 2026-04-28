import {
  requestFreighterAccess,
  getFreighterPublicKey,
} from "@/lib/freighter";

export const FREIGHTER_ID = "freighter";

export interface WalletKit {
  connect: (walletId: string) => Promise<string>;
  getPublicKey: () => Promise<string>;
  disconnect: () => void;
}

/**
 * Returns a wallet connection kit that currently uses Freighter as
 * the primary wallet provider. Can be extended to support Lobstr,
 * xBull, and other Stellar wallets in the future.
 */
export function getWalletsKit(): WalletKit {
  return {
    async connect(walletId: string): Promise<string> {
      if (walletId !== FREIGHTER_ID) {
        throw new Error(
          `Wallet "${walletId}" is not supported. Currently only Freighter is available.`
        );
      }
      return requestFreighterAccess();
    },

    async getPublicKey(): Promise<string> {
      return getFreighterPublicKey();
    },

    disconnect(): void {
      // Freighter doesn't have a programmatic disconnect API.
      // State cleanup is handled by the WalletContext.
    },
  };
}
