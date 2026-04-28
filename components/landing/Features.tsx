"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Scale, Database, QrCode, Map, Wallet } from "lucide-react";

const FEATURES = [
  { icon: Users, title: "Split Equally", desc: "Divide any expense evenly among all members with a single tap. Fair and simple." },
  { icon: Scale, title: "Weighted Splits", desc: "Assign custom weights to each member for proportional splitting based on usage." },
  { icon: Database, title: "On-Chain Receipts", desc: "Every payment is recorded on Stellar's ledger — immutable, transparent proof." },
  { icon: QrCode, title: "QR Payments", desc: "Generate SEP-0007 QR codes for instant mobile payments via any Stellar wallet." },
  { icon: Map, title: "Trip Mode", desc: "Group multiple expenses into trips for collective settlement at the end." },
  { icon: Wallet, title: "Freighter Native", desc: "Connect your Freighter wallet in seconds. No seed phrases, no custody risk." },
];

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

export default function Features() {
  return (
    <section id="features" className="bg-[#0F0F14] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-40" />
      <div className="absolute inset-0 bg-radial-dark" />

      <div className="relative z-10 container-max section-padding">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="badge-dark text-[10px] mb-4 inline-flex">Features</span>
          <h2 className="heading-section text-white mt-4">Everything you need to split fairly.</h2>
          <p className="text-white/40 mt-4 max-w-lg mx-auto">Powered by Stellar, built for simplicity. Every tool you need to manage shared expenses.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} variants={fadeUp}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-[#1A1A22] rounded-3xl border border-white/5 p-7 transition-all duration-300 hover:border-[#2DD4BF]/20 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#2DD4BF]/10 flex items-center justify-center mb-5 group-hover:bg-[#2DD4BF]/20 transition-colors">
                <f.icon className="w-6 h-6 text-[#2DD4BF]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
