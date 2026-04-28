"use client";

import React, { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, ExternalLink } from "lucide-react";
import { useWalletContext } from "@/context/WalletContext";
import { formatAddress, formatXLM } from "@/lib/utils";
import { STELLAR_EXPLORER } from "@/lib/utils/constants";

export default function WalletInfo() {
  const { publicKey, balance, network, isLoadingBalance, refreshBalance } = useWalletContext();
  const [copied, setCopied] = useState(false);

  const copyAddress = useCallback(() => {
    if (!publicKey) return;
    navigator.clipboard.writeText(publicKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [publicKey]);

  const isTestnet = !network || network === "TESTNET";

  return (
    <div className="bg-[#0F0F14] rounded-2xl border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Your Wallet</h3>
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
          isTestnet ? "bg-[#2DD4BF]/15 text-[#14B8A6]" : "bg-blue-500/15 text-blue-500"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isTestnet ? "bg-[#2DD4BF]" : "bg-blue-500"}`} />
          {isTestnet ? "Testnet" : "Mainnet"}
        </span>
      </div>

      {/* Balance */}
      <div className="px-5 py-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] text-white/30 uppercase tracking-wider font-semibold mb-1">Balance</p>
            {isLoadingBalance ? (
              <div className="h-8 w-32 bg-white/5 rounded-xl shimmer" />
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#2DD4BF]">
                  {formatXLM(balance ?? "0")}
                </span>
                <span className="text-sm font-medium text-white/40">XLM</span>
              </div>
            )}
          </div>
          <button onClick={refreshBalance} disabled={isLoadingBalance}
            className="p-2 rounded-xl hover:bg-white/5 transition-colors">
            <RefreshCw className={`w-4 h-4 text-white/40 hover:text-[#2DD4BF] transition-colors ${isLoadingBalance ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Address */}
      <div className="px-5 py-3 border-t border-white/5">
        <p className="text-[10px] text-white/30 uppercase tracking-wider font-semibold mb-1.5">Address</p>
        <button onClick={copyAddress}
          className="flex items-center gap-2 w-full group">
          <span className="text-xs font-mono text-white/50 group-hover:text-white/70 transition-colors truncate flex-1 text-left">
            {formatAddress(publicKey ?? "", 10)}
          </span>
          {copied ? (
            <Check className="w-3.5 h-3.5 text-[#2DD4BF] shrink-0" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-white/30 group-hover:text-[#2DD4BF] shrink-0 transition-colors" />
          )}
        </button>
      </div>

      {/* Explorer Link */}
      <div className="px-5 py-3 border-t border-white/5">
        <a href={`${STELLAR_EXPLORER}/account/${publicKey}`} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-white/30 hover:text-[#2DD4BF] transition-colors">
          <ExternalLink className="w-3.5 h-3.5" />
          View on Stellar Expert
        </a>
      </div>

      {/* Live indicator */}
      <div className="px-5 py-3 border-t border-white/5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2DD4BF] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2DD4BF]" />
          </span>
          <span className="text-[10px] text-white/30 uppercase tracking-wider font-semibold">
            Live on {isTestnet ? "Testnet" : "Mainnet"}
          </span>
        </div>
      </div>
    </div>
  );
}
