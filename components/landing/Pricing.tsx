"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Everything you need to split expenses on Stellar Testnet.",
    featured: true,
    features: [
      "Unlimited expenses & splits",
      "Equal, weighted & custom modes",
      "Trip grouping",
      "QR code payments",
      "On-chain receipts",
      "Freighter wallet integration",
      "Testnet support",
    ],
    cta: "Get Started Free",
    href: "/auth",
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    desc: "For power users and teams on Stellar Mainnet.",
    featured: false,
    badge: "Coming Soon",
    features: [
      "Everything in Free",
      "Mainnet support",
      "Priority settlement",
      "Advanced analytics",
      "Multi-wallet support",
      "Export reports (CSV/PDF)",
      "Priority support",
    ],
    cta: "Join Waitlist",
    href: "/auth",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white">
      <div className="container-max section-padding">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="badge-lime text-[10px] mb-4 inline-flex">Pricing</span>
          <h2 className="heading-section text-[#0F0F14] mt-4">Simple, transparent pricing</h2>
          <p className="text-[#888] mt-4 max-w-lg mx-auto">Start free on Testnet. Upgrade when you&apos;re ready for Mainnet.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {PLANS.map((plan, i) => (
            <motion.div key={plan.name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-3xl p-8 relative ${
                plan.featured
                  ? "bg-[#0F0F14] text-white border-2 border-[#2DD4BF]/40 shadow-lime-glow"
                  : "bg-white border border-[#E5E5E5] shadow-card"
              }`}
            >
              {plan.badge && (
                <span className="absolute top-6 right-6 badge-lime text-[10px]">{plan.badge}</span>
              )}
              {plan.featured && (
                <span className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-[#2DD4BF] text-[#0F0F14] text-[10px] font-bold uppercase tracking-wider">
                  Recommended
                </span>
              )}

              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-black">{plan.price}</span>
                <span className={`text-sm ${plan.featured ? "text-white/40" : "text-[#888]"}`}>{plan.period}</span>
              </div>
              <p className={`text-sm mb-8 ${plan.featured ? "text-white/50" : "text-[#888]"}`}>{plan.desc}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.featured ? "text-[#2DD4BF]" : "text-[#2DD4BF]"}`} />
                    <span className={plan.featured ? "text-white/70" : "text-[#555]"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href} className="block">
                <Button variant={plan.featured ? "primary" : "secondary"} size="lg" className="w-full">
                  {plan.featured && <Zap className="w-4 h-4" />}
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
