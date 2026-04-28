"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap, Shield, Clock, Layers, ReceiptText, TrendingUp, AlertCircle, Map,
  ArrowRight, ArrowLeft, CheckCircle2, Plus, QrCode, Send, Loader2,
} from "lucide-react";
import type { ElementType } from "react";
import type { Expense } from "@/types/expense";
import AuthGuard from "@/components/auth/AuthGuard";
import ConnectWalletButton from "@/components/wallet/ConnectWalletButton";
import WalletInfo from "@/components/wallet/WalletInfo";
import { StellarStarLogo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useWalletContext } from "@/context/WalletContext";
import { useAuth } from "@/context/AuthContext";
import { useExpense } from "@/context/ExpenseContext";
import { useTrip } from "@/context/TripContext";
import { formatAddress, formatXLM } from "@/lib/utils";

/* ─── ConnectPrompt ─── */
function ConnectPrompt() {
  return (
    <div className="min-h-screen bg-[#F6F6F6] relative">
      <div className="absolute inset-0 bg-hero-grid bg-[length:40px_40px] opacity-30" />
      <div className="absolute inset-0 bg-radial-lime" />
      <div className="relative z-10">
        <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 max-w-5xl mx-auto">
          <StellarStarLogo size="md" />
          <Link href="/" className="flex items-center gap-1.5 text-sm text-[#888] hover:text-[#0F0F14] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </nav>
        <div className="flex items-center justify-center px-4 pt-12 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="max-w-md w-full bg-white rounded-3xl shadow-[0_8px_60px_-12px_rgba(0,0,0,0.15)] border border-[#E5E5E5] overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-[#2DD4BF] via-[#0D9488] to-[#2DD4BF]" />
            <div className="p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#2DD4BF] flex items-center justify-center mx-auto mb-6">
                <Zap className="w-7 h-7 text-[#0F0F14]" />
              </div>
              <h2 className="text-xl font-bold text-[#0F0F14] mb-2">Connect your wallet</h2>
              <p className="text-sm text-[#888] mb-8">Install Freighter to get started. No password needed — your wallet is your identity.</p>
              <ConnectWalletButton className="w-full justify-center" />
              <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-[#E5E5E5]/60">
                {[
                  { icon: Shield, label: "Non-custodial" },
                  { icon: Clock, label: "<5s finality" },
                  { icon: Layers, label: "On-chain receipts" },
                ].map((f) => (
                  <div key={f.label} className="text-center">
                    <f.icon className="w-4 h-4 text-[#2DD4BF] mx-auto mb-1" />
                    <span className="text-[10px] text-[#888] font-medium">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        <p className="text-center text-xs text-[#888] pb-8">
          Don&apos;t have Freighter?{" "}
          <a href="https://www.freighter.app/" target="_blank" rel="noopener noreferrer" className="text-[#2DD4BF] font-semibold hover:underline">
            Install it here →
          </a>
        </p>
      </div>
    </div>
  );
}

/* ─── StatCard ─── */
function StatCard({ label, value, sub, icon: Icon, accent }: { label: string; value: string; sub?: string; icon: ElementType; accent?: boolean }) {
  return (
    <div className={`rounded-2xl p-4 sm:p-5 ${accent ? "bg-[#0F0F14] text-white" : "bg-white border border-[#E5E5E5]"}`}>
      <Icon className={`w-5 h-5 mb-3 ${accent ? "text-[#2DD4BF]" : "text-[#888]"}`} />
      <p className={`text-xl font-black ${accent ? "text-[#2DD4BF]" : "text-[#0F0F14]"}`}>{value}</p>
      <p className={`text-xs mt-0.5 ${accent ? "text-white/50" : "text-[#888]"}`}>{label}</p>
      {sub && <p className={`text-[10px] mt-0.5 ${accent ? "text-white/30" : "text-[#AAAAAA]"}`}>{sub}</p>}
    </div>
  );
}

/* ─── RecentExpenseRow ─── */
function RecentExpenseRow({ expense }: { expense: Expense }) {
  const allPaid = expense.shares.every((s) => s.paid);
  const paidCount = expense.shares.filter((s) => s.paid).length;
  const date = new Date(expense.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <Link href="/expenses" className="flex items-center gap-3 px-4 py-3 hover:bg-[#F6F6F6] transition-colors rounded-xl group">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${allPaid ? "bg-[#2DD4BF]/10" : "bg-[#F6F6F6]"}`}>
        <ReceiptText className={`w-4 h-4 ${allPaid ? "text-[#2DD4BF]" : "text-[#888]"}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#0F0F14] truncate">{expense.title}</p>
        <p className="text-[11px] text-[#888]">{formatXLM(expense.totalAmount)} XLM · {expense.members.length} members · {date}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {allPaid ? (
          <CheckCircle2 className="w-4 h-4 text-[#2DD4BF]" />
        ) : (
          <span className="text-[11px] text-[#888] font-medium">{paidCount}/{expense.shares.length} paid</span>
        )}
        <ArrowRight className="w-4 h-4 text-[#E5E5E5] group-hover:text-[#2DD4BF] transition-colors" />
      </div>
    </Link>
  );
}

/* ─── DashboardView ─── */
function DashboardView() {
  const { publicKey } = useWalletContext();
  const { user } = useAuth();
  const { expenses } = useExpense();
  const { trips } = useTrip();

  const totalXLM = expenses.reduce((s, e) => s + parseFloat(e.totalAmount || "0"), 0);
  const pendingShares = expenses.reduce((s, e) => s + e.shares.filter((sh) => !sh.paid).length, 0);
  const displayName = user?.displayName || formatAddress(publicKey ?? "", 6);
  const recentExpenses = expenses.slice(0, 5);

  const QUICK_ACCESS = [
    { icon: ReceiptText, title: "Expenses", desc: "Manage splits", href: "/expenses", badge: `${expenses.length}`, color: "text-[#2DD4BF]" },
    { icon: Send, title: "Pay via XLM", desc: "Settle debts", href: "/expenses", badge: "Live", color: "text-[#2DD4BF]" },
    { icon: QrCode, title: "QR Payments", desc: "Scan & pay", href: "/expenses", badge: "Live", color: "text-[#2DD4BF]" },
    { icon: Map, title: "Trip Mode", desc: "Group expenses", href: "/trips", badge: `${trips.length}`, color: "text-[#2DD4BF]" },
  ];

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-[#E5E5E5]/60">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
          <StellarStarLogo size="md" />
          <div className="hidden sm:flex items-center gap-1">
            <Link href="/expenses" className="px-4 py-2 text-sm font-medium text-[#555] hover:text-[#0F0F14] rounded-xl hover:bg-black/5 transition-all">Expenses</Link>
            <Link href="/trips" className="px-4 py-2 text-sm font-medium text-[#555] hover:text-[#0F0F14] rounded-xl hover:bg-black/5 transition-all">Trips</Link>
          </div>
          <ConnectWalletButton />
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Welcome Banner */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="bg-[#0F0F14] rounded-3xl p-5 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-dark pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2DD4BF]/40 to-transparent" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2DD4BF]/15 text-[10px] font-semibold text-[#2DD4BF] uppercase tracking-wider mb-4">
              <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2DD4BF] opacity-75" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#2DD4BF]" /></span>
              Wallet Connected · Stellar Testnet
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Welcome, <span className="text-[#2DD4BF]">{displayName}</span>
            </h1>
            <p className="text-sm text-white/40 mt-1">Manage your expenses and settlements on the Stellar network.</p>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard icon={ReceiptText} label="Total Expenses" value={String(expenses.length)} sub="All time" />
          <StatCard icon={TrendingUp} label="Total XLM Spent" value={formatXLM(totalXLM)} sub="Across all expenses" accent />
          <StatCard icon={AlertCircle} label="Pending Shares" value={String(pendingShares)} sub="Awaiting payment" />
          <StatCard icon={Map} label="Trips" value={String(trips.length)} sub="Active groups" />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1"><WalletInfo /></div>
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5E5E5]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E5E5]/60">
              <div className="flex items-center gap-2">
                <ReceiptText className="w-4 h-4 text-[#888]" />
                <h3 className="text-sm font-bold text-[#0F0F14]">Recent Expenses</h3>
              </div>
              <Link href="/expenses" className="text-xs text-[#2DD4BF] font-semibold hover:underline">View all →</Link>
            </div>
            <div className="p-2">
              {recentExpenses.length === 0 ? (
                <div className="text-center py-12">
                  <ReceiptText className="w-10 h-10 text-[#E5E5E5] mx-auto mb-3" />
                  <p className="text-sm font-semibold text-[#0F0F14] mb-1">No expenses yet</p>
                  <p className="text-xs text-[#888] mb-4">Create your first expense to get started</p>
                  <Link href="/expenses"><Button variant="dark" size="sm"><Plus className="w-4 h-4" /> New Expense</Button></Link>
                </div>
              ) : (
                <>
                  {recentExpenses.map((e) => <RecentExpenseRow key={e.id} expense={e} />)}
                  {expenses.length > 5 && (
                    <Link href="/expenses" className="block text-center py-3 text-xs text-[#2DD4BF] font-semibold hover:underline">
                      +{expenses.length - 5} more expenses →
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {QUICK_ACCESS.map((q) => (
            <Link key={q.title} href={q.href}
              className="bg-white rounded-2xl border border-[#E5E5E5] p-4 group hover:border-[#2DD4BF]/50 hover:shadow-[0_4px_24px_-4px_rgba(45,212,191,0.15)] transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#2DD4BF]/10 flex items-center justify-center">
                  <q.icon className="w-4 h-4 text-[#2DD4BF]" />
                </div>
                <span className="badge-lime text-[9px] px-2 py-0.5">{q.badge}</span>
              </div>
              <h4 className="text-sm font-bold text-[#0F0F14] mb-0.5">{q.title}</h4>
              <p className="text-[11px] text-[#888] mb-2">{q.desc}</p>
              <span className="text-[11px] text-[#2DD4BF] font-semibold group-hover:underline">Open →</span>
            </Link>
          ))}
        </div>

        {/* CTA Row */}
        <div className="flex flex-wrap gap-3">
          <Link href="/expenses"><Button variant="dark" size="md"><Plus className="w-4 h-4" /> New Expense</Button></Link>
          <Link href="/trips"><Button variant="outline" size="md">View Trips</Button></Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function DashboardPage() {
  const { isConnected, isConnecting } = useWalletContext();

  if (isConnecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F6F6]">
        <Loader2 className="w-8 h-8 text-[#2DD4BF] animate-spin" />
      </div>
    );
  }

  if (!isConnected) return <ConnectPrompt />;

  return <AuthGuard><DashboardView /></AuthGuard>;
}
