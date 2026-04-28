"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wallet, Plus, SplitSquareVertical, Send, CheckCircle2 } from "lucide-react";

const STEPS = [
  {
    num: "01", icon: Wallet, title: "Connect Wallet", desc: "Install Freighter and connect in seconds. No seed phrases to manage — just approve the connection.",
    mock: (
      <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2DD4BF] to-[#0D9488] flex items-center justify-center"><Wallet className="w-5 h-5 text-white" /></div>
          <div><p className="text-sm font-bold text-[#0F0F14]">Freighter Wallet</p><p className="text-xs text-[#888]">Stellar Browser Extension</p></div>
        </div>
        <div className="w-full h-10 rounded-xl bg-[#2DD4BF] flex items-center justify-center text-sm font-semibold text-[#0F0F14]">Connect Wallet</div>
      </div>
    ),
  },
  {
    num: "02", icon: Plus, title: "Add Expense", desc: "Enter a title, amount, pick your split mode, and add members with their Stellar addresses.",
    mock: (
      <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5 shadow-card space-y-3">
        <div className="h-9 rounded-xl border border-[#E5E5E5] px-3 flex items-center text-sm text-[#888]">Group Dinner</div>
        <div className="h-9 rounded-xl border border-[#E5E5E5] px-3 flex items-center text-sm text-[#0F0F14] font-semibold">1,200 XLM</div>
        <div className="flex gap-2">{["Equal","Weighted","Custom"].map((m,i) => (
          <div key={m} className={`flex-1 h-8 rounded-lg flex items-center justify-center text-xs font-semibold ${i===0?"bg-[#2DD4BF] text-[#0F0F14]":"bg-[#F6F6F6] text-[#888]"}`}>{m}</div>
        ))}</div>
      </div>
    ),
  },
  {
    num: "03", icon: SplitSquareVertical, title: "Split & Preview", desc: "See the live calculation before saving. Each member's share is computed and displayed instantly.",
    mock: (
      <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5 shadow-card">
        {[{n:"Rahul",a:"300.00"},{n:"Aman",a:"300.00"},{n:"Kiran",a:"300.00"}].map((m) => (
          <div key={m.n} className="flex items-center justify-between py-2 border-b border-[#E5E5E5]/50 last:border-0">
            <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-md bg-[#2DD4BF]/20 flex items-center justify-center text-[10px] font-bold text-[#134E4A]">{m.n[0]}</div><span className="text-sm text-[#0F0F14]">{m.n}</span></div>
            <span className="text-sm font-semibold text-[#0F0F14]">{m.a} XLM</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: "04", icon: Send, title: "Pay with XLM", desc: "Sign the transaction in Freighter. Confirmed on Stellar in ~5 seconds with on-chain proof.",
    mock: (
      <div className="bg-[#0F0F14] rounded-2xl p-5 border border-white/10">
        <div className="flex items-center gap-2 mb-3"><CheckCircle2 className="w-5 h-5 text-[#2DD4BF]" /><span className="text-sm font-semibold text-white">Payment Confirmed</span></div>
        <div className="space-y-2 text-xs"><div className="flex justify-between"><span className="text-white/40">Amount</span><span className="text-white font-mono">300.0000000 XLM</span></div><div className="flex justify-between"><span className="text-white/40">Ledger</span><span className="text-[#2DD4BF] font-mono">47,291,034</span></div><div className="flex justify-between"><span className="text-white/40">Time</span><span className="text-white/70">~4.8s</span></div></div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#F6F6F6] relative">
      <div className="container-max section-padding">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-20">
          <span className="badge-lime text-[10px] mb-4 inline-flex">Process</span>
          <h2 className="heading-section text-[#0F0F14] mt-4">How it works</h2>
          <p className="text-[#888] mt-4 max-w-lg mx-auto">Four simple steps from connect to confirmed. No complexity, just results.</p>
        </motion.div>

        <div className="space-y-20 lg:space-y-28">
          {STEPS.map((step, i) => (
            <motion.div key={step.num} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
            >
              <div className={`space-y-5 ${i % 2 === 1 ? "lg:order-2 lg:text-left" : ""}`} style={{ direction: "ltr" }}>
                <span className="text-5xl font-black text-[#2DD4BF]/20">{step.num}</span>
                <div className="w-12 h-12 rounded-2xl bg-[#2DD4BF]/10 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-[#2DD4BF]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F0F14]">{step.title}</h3>
                <p className="text-[#888] leading-relaxed max-w-md">{step.desc}</p>
              </div>
              <div className={`max-w-sm ${i % 2 === 1 ? "lg:order-1 lg:ml-auto" : "lg:ml-auto"}`} style={{ direction: "ltr" }}>
                {step.mock}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
