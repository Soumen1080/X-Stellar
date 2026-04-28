export interface RawDebt {
  from: string;
  to: string;
  amount: number;
  fromWallet: string;
  toWallet: string;
}

export interface NetPayment {
  from: string;
  to: string;
  amount: number;
  fromWallet: string;
  toWallet: string;
}

export function computeNetPayments(debts: RawDebt[]): NetPayment[] {
  const net: Record<string, number> = {};
  const wallets: Record<string, string> = {};

  debts.forEach((d) => {
    net[d.from] = (net[d.from] ?? 0) - d.amount;
    net[d.to] = (net[d.to] ?? 0) + d.amount;
    wallets[d.from] = d.fromWallet;
    wallets[d.to] = d.toWallet;
  });

  const creditors = Object.entries(net)
    .filter(([, v]) => v > 0)
    .map(([k, v]) => ({ name: k, amount: v }));

  const debtors = Object.entries(net)
    .filter(([, v]) => v < 0)
    .map(([k, v]) => ({ name: k, amount: -v }));

  const payments: NetPayment[] = [];
  let i = 0,
    j = 0;

  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i].amount, creditors[j].amount);

    if (pay > 0.0000001) {
      payments.push({
        from: debtors[i].name,
        to: creditors[j].name,
        amount: parseFloat(pay.toFixed(7)),
        fromWallet: wallets[debtors[i].name],
        toWallet: wallets[creditors[j].name],
      });
    }

    debtors[i].amount -= pay;
    creditors[j].amount -= pay;

    if (debtors[i].amount < 0.0000001) i++;
    if (creditors[j].amount < 0.0000001) j++;
  }

  return payments;
}
