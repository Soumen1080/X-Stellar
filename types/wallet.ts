export interface WalletContextType {
  publicKey: string | null;
  balance: string | null;
  network: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  isLoadingBalance: boolean;
  isHydrated: boolean;
  error: string | null;
  selectedWalletId: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  refreshBalance: () => Promise<void>;
}
