import { Transaction } from "@stellar/stellar-sdk";
import { horizonServer } from "./client";
import { NETWORK_PASSPHRASE } from "@/lib/utils/constants";
import type { TransactionResult } from "@/types/stellar";

export async function submitSignedTransaction(
  signedXDR: string
): Promise<TransactionResult> {
  const tx = new Transaction(signedXDR, NETWORK_PASSPHRASE);
  const result = await horizonServer.submitTransaction(tx);
  return { hash: result.hash, successful: true };
}
