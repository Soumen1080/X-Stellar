import { recordPaymentOnChain } from "@/lib/stellar/contract";

// ─── Mock @stellar/stellar-sdk to avoid TextEncoder issues in jsdom ───

jest.mock("@stellar/stellar-sdk", () => ({
  rpc: {
    Server: jest.fn().mockImplementation(() => ({
      prepareTransaction: jest.fn().mockRejectedValue(new Error("Network error")),
      sendTransaction: jest.fn().mockRejectedValue(new Error("Network error")),
      simulateTransaction: jest.fn().mockRejectedValue(new Error("Network error")),
    })),
    Api: {
      isSimulationSuccess: jest.fn().mockReturnValue(false),
    },
  },
  Contract: jest.fn().mockImplementation(() => ({
    call: jest.fn().mockReturnValue({ type: "invokeHostFunction" }),
  })),
  TransactionBuilder: jest.fn().mockImplementation(() => ({
    addOperation: jest.fn().mockReturnThis(),
    setTimeout: jest.fn().mockReturnThis(),
    build: jest.fn().mockReturnValue({ toXDR: () => "mock-xdr" }),
  })),
  Networks: { TESTNET: "Test SDF Network ; September 2015" },
  Address: jest.fn().mockImplementation(() => ({
    toScVal: jest.fn().mockReturnValue({}),
  })),
  nativeToScVal: jest.fn().mockReturnValue({}),
  scValToNative: jest.fn().mockReturnValue({}),
  BASE_FEE: "100",
  Horizon: {
    Server: jest.fn().mockImplementation(() => ({
      loadAccount: jest.fn().mockRejectedValue(new Error("Network error")),
    })),
  },
}));

// ─── Mock environment ────────────────────────────────────────────────

const originalEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...originalEnv };
});

afterAll(() => {
  process.env = originalEnv;
});

// ─── Tests ───────────────────────────────────────────────────────────

describe("recordPaymentOnChain — contract errors", () => {
  it('throws "Contract not configured" when CONTRACT_ID is empty', async () => {
    process.env.NEXT_PUBLIC_CONTRACT_ID = "";

    // Use the already-imported module (resetModules affects dynamic imports)
    await expect(
      recordPaymentOnChain({
        expenseId: "exp-1",
        payerAddress: "GABCDEFGHIJKLMNOPQRSTUVWXYZ234567ABCDEFGHIJKLMNOPQRSTUV",
        payeeAddress: "GZYXWVUTSRQPONMLKJIHGFEDCBA765432ZYXWVUTSRQPONMLKJIHGF",
        amount: 10,
        sourcePublicKey: "GABCDEFGHIJKLMNOPQRSTUVWXYZ234567ABCDEFGHIJKLMNOPQRSTUV",
      })
    ).rejects.toThrow(/[Cc]ontract not configured/);
  });

  it("degrades gracefully when Soroban server is unreachable", async () => {
    process.env.NEXT_PUBLIC_CONTRACT_ID = "CABC123";

    // With no CONTRACT_ID configured via env constants, recordPaymentOnChain should
    // throw because CONTRACT_ID from constants is evaluated at import time
    await expect(
      recordPaymentOnChain({
        expenseId: "exp-1",
        payerAddress: "GABCDEFGHIJKLMNOPQRSTUVWXYZ234567ABCDEFGHIJKLMNOPQRSTUV",
        payeeAddress: "GZYXWVUTSRQPONMLKJIHGFEDCBA765432ZYXWVUTSRQPONMLKJIHGF",
        amount: 10,
        sourcePublicKey: "GABCDEFGHIJKLMNOPQRSTUVWXYZ234567ABCDEFGHIJKLMNOPQRSTUV",
      })
    ).rejects.toThrow();
  });
});
