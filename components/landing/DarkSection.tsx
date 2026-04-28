"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const POINTS = [
  { title: "Transparent", desc: "Every transaction is publicly verifiable on Stellar's ledger." },
  { title: "Fast", desc: "Settlements confirm in ~5 seconds with deterministic finality." },
  { title: "Cheap", desc: "Transaction fees are a fraction of a cent — practically free." },
  { title: "Non-custodial", desc: "Your keys, your funds. We never hold or access your XLM." },
];

const TX_JSON = `{
  "type": "payment",
  "source": "GDKJ...X4RP",
  "destination": "GBML...9QHT",
  "asset": "native",
  "amount": "300.0000000",
  "fee": "0.00001",
  "ledger": 47291034,
  "status": "SUCCESS",
  "timestamp": "2025-01-15T18:42:03Z"
}`;

export default function DarkSection() {
  return (
    <section className="bg-[#0F0F14] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-30" />

      <div className="relative z-10 container-max section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="badge-dark text-[10px] mb-4 inline-flex">Protocol</span>
            <h2 className="heading-section text-white mt-4 mb-8">Why Stellar?</h2>
            <div className="space-y-6">
              {POINTS.map((p, i) => (
                <motion.div key={p.title}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#2DD4BF] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold mb-0.5">{p.title}</h4>
                    <p className="text-white/40 text-sm">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Terminal */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="bg-[#1A1A22] rounded-2xl border border-white/5 overflow-hidden shadow-dark-card">
              {/* Title bar */}
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
                </div>
                <span className="text-[10px] text-white/20 font-mono ml-2">stellar_tx.json</span>
              </div>
              {/* Code */}
              <pre className="px-5 py-4 text-sm font-mono overflow-x-auto">
                {TX_JSON.split("\n").map((line, i) => {
                  // Simple syntax highlighting
                  const highlighted = line
                    .replace(/"([^"]+)":/g, '<span class="text-[#2DD4BF]">"$1"</span>:')
                    .replace(/: "([^"]+)"/g, ': <span class="text-amber-300">"$1"</span>')
                    .replace(/: (\d+)/g, ': <span class="text-violet-400">$1</span>')
                    .replace(/"SUCCESS"/g, '<span class="text-emerald-400">"SUCCESS"</span>');
                  return (
                    <div key={i} className="flex">
                      <span className="w-6 text-white/10 text-right mr-4 select-none text-xs leading-6">{i + 1}</span>
                      <span className="text-white/60 leading-6" dangerouslySetInnerHTML={{ __html: highlighted }} />
                    </div>
                  );
                })}
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
