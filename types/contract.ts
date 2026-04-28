export interface ContractPaymentEvent {
  expenseId: string;
  payerAddress: string;
  payeeAddress: string;
  amount: string;
  timestamp: number;
  txHash: string;
}

export interface ContractExpense {
  id: string;
  payer: string;
  total_amount: bigint;
  settled: boolean;
}
