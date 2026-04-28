"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Zap, Star, TrendingUp, Users, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const MEMBERS = [
  { name: "Rahul", initial: "R", color: "bg-violet-500", amount: "300", paid: true },
  { name: "Aman", initial: "A", color: "bg-blue-500", amount: "300", paid: true },
  { name: "Kiran", initial: "K", color: "bg-amber-500", amount: "300", paid: false },
  { name: "You", initial: "Y", color: "bg-[#2DD4BF]", amount: "300", paid: false },
];

const TRUST = [
  { abbr: "XLM", name: "Stellar" }, { abbr: "FRT", name: "Freighter" },
  { abbr: "HZN", name: "Horizon" }, { abbr: "TST", name: "Testnet" }, { abbr: "SRB", name: "Soroban" },
];

export default function Hero() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#F6F6F6]">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-grid bg-[length:40px_40px]" />
      <div className="absolute inset-0 bg-radial-lime" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#2DD4BF]/10 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-[#2DD4BF]/8 rounded-full blur-[120px]" />

      <div className="relative z-10 container-max section-padding pt-28 lg:pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-7">
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 text-xs font-semibold text-[#134E4A]">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" /></span>
                Powered by Stellar Blockchain
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} transition={{ duration: 0.5 }} className="heading-hero">
              Share Expenses.{"\n"}<span className="text-gradient-lime">Settle Instantly.</span>
            </motion.h1>

            <motion.p variants={fadeUp} transition={{ duration: 0.5 }} className="text-lg text-[#555] max-w-lg leading-relaxed">
              Track shared spending on the Stellar Network. Fast, transparent, and verifiable — every split recorded on-chain.
            </motion.p>

            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="flex flex-wrap gap-3">
              {isAuthenticated ? (
                <Link href="/dashboard"><Button variant="primary" size="lg"><Zap className="w-4 h-4" /> Open Dashboard</Button></Link>
              ) : (
                <Link href="/auth"><Button variant="primary" size="lg"><Zap className="w-4 h-4" /> Start Splitting</Button></Link>
              )}
              <a href="#how-it-works"><Button variant="secondary" size="lg">Explore the Flow</Button></a>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="flex flex-wrap items-center gap-4 text-sm text-[#888]">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["bg-violet-500","bg-blue-500","bg-amber-500","bg-rose-500"].map((c,i) => (
                    <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-white flex items-center justify-center text-[10px] font-bold text-white`}>{String.fromCharCode(65+i)}</div>
                  ))}
                  <div className="w-7 h-7 rounded-full bg-[#F0F0F0] border-2 border-white flex items-center justify-center text-[10px] font-semibold text-[#888]">+2K</div>
                </div>
                <div className="flex gap-0.5">{[...Array(5)].map((_,i) => <Star key={i} className="w-3.5 h-3.5 fill-[#2DD4BF] text-[#2DD4BF]" />)}</div>
                <span>2,000+ early users</span>
              </div>
              <span className="hidden sm:block text-[#E5E5E5]">|</span>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Non-custodial</span>
                <span className="inline-flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> ~5s finality</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Mock Split Card */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="relative hidden md:block">
            {/* Floating chips */}
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-6 hidden lg:flex items-center gap-2 px-3 py-2 rounded-2xl bg-white border border-[#E5E5E5] shadow-card text-xs font-semibold z-20">
              <TrendingUp className="w-4 h-4 text-[#2DD4BF]" /> Total Settled <span className="text-[#2DD4BF]">2.3M XLM</span>
            </motion.div>
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -right-4 hidden lg:flex items-center gap-2 px-3 py-2 rounded-2xl bg-white border border-[#E5E5E5] shadow-card text-xs font-semibold z-20">
              <Users className="w-4 h-4 text-[#2DD4BF]" /> Active Groups <span className="text-[#2DD4BF]">8,200+</span>
            </motion.div>

            {/* Card */}
            <div className="bg-white rounded-3xl border border-[#E5E5E5] shadow-[0_8px_60px_-12px_rgba(0,0,0,0.12)] p-6 relative">
              <div className="flex items-center justify-between mb-5">
                <div><p className="font-bold text-[#0F0F14]">Group Dinner · <span className="font-normal text-[#888]">tonight</span></p></div>
                <span className="badge-lime text-[10px]">Active</span>
              </div>
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-3xl font-black text-[#0F0F14]">1,200 <span className="text-base font-semibold text-[#888]">XLM</span></span>
                <span className="text-xs text-[#888]">Split 4 ways · Equal</span>
              </div>
              <div className="space-y-3 mb-5">
                {MEMBERS.map((m) => (
                  <div key={m.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${m.color} flex items-center justify-center text-white text-xs font-bold`}>{m.initial}</div>
                      <span className="text-sm font-medium text-[#0F0F14]">{m.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#0F0F14]">{m.amount} XLM</span>
                      {m.paid ? <CheckCircle2 className="w-4 h-4 text-[#2DD4BF]" /> : <div className="w-4 h-4 rounded-full border-2 border-[#E5E5E5]" />}
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full btn-dark py-3 text-sm"><Zap className="w-4 h-4" /> Settle via Stellar</button>
            </div>

            {/* TX hash strip */}
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 left-4 right-4 hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#0F0F14] text-white text-xs z-20">
              <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0" />
              <span className="font-medium">TX Confirmed · Ledger 47,291,034</span>
              <span className="font-mono text-[#2DD4BF] truncate ml-auto">GDKJ...X4RP</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Trust logos */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-24 lg:mt-32">
          <p className="text-xs text-[#888] text-center uppercase tracking-widest font-semibold mb-6">Built on open, trusted protocols</p>
          <div className="flex flex-wrap justify-center gap-3">
            {TRUST.map((t) => (
              <div key={t.abbr} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E5E5E5] text-xs">
                <div className="w-7 h-7 rounded-lg bg-[#0F0F14] flex items-center justify-center text-[10px] font-bold text-[#2DD4BF]">{t.abbr.slice(0,2)}</div>
                <span className="font-semibold text-[#333]">{t.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
