export interface StellarAccount {
  id: string;
  balances: StellarBalance[];
}

export interface StellarBalance {
  balance: string;
  asset_type: string;
  asset_code?: string;
}

export interface TransactionResult {
  hash: string;
  successful: boolean;
}

export interface PaymentParams {
  sourcePublicKey: string;
  destinationPublicKey: string;
  amount: number;
  memoText?: string;
}
