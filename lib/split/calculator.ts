import type { Member, SplitShare, SplitMode } from "@/types/expense";

export function isValidXLMAmount(value: string): boolean {
  const n = parseFloat(value);
  return !isNaN(n) && n > 0 && /^\d+(\.\d{1,7})?$/.test(value.trim());
}

export function isValidStellarAddress(addr: string): boolean {
  return /^G[A-Z2-7]{55}$/.test(addr.trim());
}

export function calculateSplit(
  totalAmount: number,
  members: Member[],
  paidByMemberId: string,
  mode: SplitMode
): SplitShare[] {
  if (members.length < 2) return [];

  const debtors = members.filter((m) => m.id !== paidByMemberId);

  if (mode === "equal") {
    const share = totalAmount / members.length;
    return debtors.map((m) => ({
      memberId: m.id,
      name: m.name,
      walletAddress: m.walletAddress,
      amount: share.toFixed(7),
      paid: false,
    }));
  }

  if (mode === "weighted") {
    const totalWeight = members.reduce((s, m) => s + (m.weight ?? 1), 0);
    return debtors.map((m) => {
      const w = m.weight ?? 1;
      return {
        memberId: m.id,
        name: m.name,
        walletAddress: m.walletAddress,
        amount: ((totalAmount * w) / totalWeight).toFixed(7),
        paid: false,
      };
    });
  }

  // custom — use weight as direct amount
  return debtors.map((m) => ({
    memberId: m.id,
    name: m.name,
    walletAddress: m.walletAddress,
    amount: (m.weight ?? 0).toFixed(7),
    paid: false,
  }));
}
