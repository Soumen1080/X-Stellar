"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Wallet, ChevronDown, Copy, Check, RefreshCw, ExternalLink, LogOut, Loader2 } from "lucide-react";
import { useWalletContext } from "@/context/WalletContext";
import { formatAddress, formatXLM } from "@/lib/utils";
import { STELLAR_EXPLORER } from "@/lib/utils/constants";

interface ConnectWalletButtonProps {
  className?: string;
}

function NetworkBadge({ network }: { network: string | null }) {
  const isTestnet = !network || network === "TESTNET";
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
      isTestnet ? "bg-[#2DD4BF]/15 text-[#14B8A6]" : "bg-blue-500/15 text-blue-500"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isTestnet ? "bg-[#2DD4BF]" : "bg-blue-500"}`} />
      {isTestnet ? "Testnet" : "Mainnet"}
    </span>
  );
}

export default function ConnectWalletButton({ className = "" }: ConnectWalletButtonProps) {
  const { publicKey, balance, network, isConnected, isConnecting, isLoadingBalance, connect, disconnect, refreshBalance } = useWalletContext();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const copyAddress = useCallback(() => {
    if (!publicKey) return;
    navigator.clipboard.writeText(publicKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [publicKey]);

  const handleDisconnect = useCallback(() => {
    disconnect();
    setDropdownOpen(false);
  }, [disconnect]);

  // Not connected — show connect button
  if (!isConnected) {
    return (
      <button onClick={connect} disabled={isConnecting}
        className={`btn-primary ${className}`}>
        {isConnecting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Wallet className="w-4 h-4" />
        )}
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </button>
    );
  }

  // Connected — show pill button with dropdown
  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-2xl border border-[#E5E5E5] bg-white hover:bg-[#F6F6F6] transition-all duration-200 hover:shadow-card">
        <NetworkBadge network={network} />
        <span className="text-sm font-mono font-medium text-[#0F0F14]">
          {formatAddress(publicKey ?? "", 5)}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#888] transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.95, y: -4 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }} transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl border border-[#E5E5E5] shadow-xl overflow-hidden z-50">

            {/* Address */}
            <div className="px-4 py-3 border-b border-[#E5E5E5]/60">
              <p className="text-[10px] text-[#888] uppercase tracking-wider font-semibold mb-1.5">Wallet Address</p>
              <button onClick={copyAddress}
                className="flex items-center gap-2 w-full group">
                <span className="text-xs font-mono text-[#333] truncate flex-1 text-left">
                  {publicKey}
                </span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-[#2DD4BF] shrink-0" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[#888] group-hover:text-[#2DD4BF] shrink-0 transition-colors" />
                )}
              </button>
            </div>

            {/* Balance */}
            <div className="px-4 py-3 border-b border-[#E5E5E5]/60">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-[#888] uppercase tracking-wider font-semibold mb-0.5">Balance</p>
                  {isLoadingBalance ? (
                    <div className="h-6 w-24 bg-[#F6F6F6] rounded-lg animate-pulse" />
                  ) : (
                    <p className="text-lg font-bold text-[#0F0F14]">
                      {formatXLM(balance ?? "0")} <span className="text-xs font-medium text-[#888]">XLM</span>
                    </p>
                  )}
                </div>
                <button onClick={refreshBalance} disabled={isLoadingBalance}
                  className="p-2 rounded-xl hover:bg-[#F6F6F6] transition-colors">
                  <RefreshCw className={`w-4 h-4 text-[#888] ${isLoadingBalance ? "animate-spin" : ""}`} />
                </button>
              </div>
            </div>

            {/* Explorer Link */}
            <div className="px-4 py-2">
              <a href={`${STELLAR_EXPLORER}/account/${publicKey}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-sm text-[#555] hover:text-[#2DD4BF] hover:bg-[#F6F6F6] rounded-xl transition-all">
                <ExternalLink className="w-4 h-4" /> View on Stellar Expert
              </a>
            </div>

            {/* Disconnect */}
            <div className="border-t border-[#E5E5E5]/60 px-4 py-2">
              <button onClick={handleDisconnect}
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl w-full transition-colors">
                <LogOut className="w-4 h-4" /> Disconnect
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
