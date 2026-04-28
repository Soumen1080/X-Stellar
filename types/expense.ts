export type SplitMode = "equal" | "weighted" | "custom";

export interface Member {
  id: string;
  name: string;
  walletAddress: string;
  weight?: number;
}

export interface SplitShare {
  memberId: string;
  name: string;
  walletAddress: string;
  amount: string;
  paid: boolean;
  txHash?: string;
}

export interface Expense {
  id: string;
  title: string;
  description?: string;
  totalAmount: string;
  splitMode: SplitMode;
  members: Member[];
  shares: SplitShare[];
  paidByMemberId: string;
  settled: boolean;
  createdAt: string;
  updatedAt: string;
  tripId?: string;
}

export interface ExpenseFormData {
  title: string;
  description?: string;
  totalAmount: string;
  splitMode: SplitMode;
  members: Member[];
  paidByMemberId: string;
}
