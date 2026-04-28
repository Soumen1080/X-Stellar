import { horizonServer } from "./client";

export async function getXLMBalance(publicKey: string): Promise<string> {
  try {
    const account = await horizonServer.loadAccount(publicKey);
    const native = account.balances.find(
      (b: any) => b.asset_type === "native"
    );
    return native ? parseFloat(native.balance).toFixed(2) : "0.00";
  } catch {
    return "0.00";
  }
}
