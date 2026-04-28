"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="bg-[#0F0F14] relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-[#2DD4BF]/8 rounded-full blur-[150px]" />
      </div>
      <div className="absolute inset-0 bg-grid-dark opacity-20" />

      <div className="relative z-10 container-max section-padding text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-2xl mx-auto">
          <span className="badge-dark text-[10px] mb-6 inline-flex">Get Started</span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mt-4">
            Ready to split <span className="text-gradient-lime">smarter</span>?
          </h2>

          <p className="text-white/40 mt-5 text-lg max-w-lg mx-auto leading-relaxed">
            Join thousands of users splitting expenses on Stellar. Free, fast, and fully on-chain.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link href="/auth">
              <Button variant="primary" size="lg">
                <Zap className="w-4 h-4" /> Start for Free
              </Button>
            </Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost-white" size="lg">
                View on GitHub <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>

          {/* Mini trust line */}
          <p className="text-white/15 text-xs mt-12 uppercase tracking-widest font-semibold">
            No credit card · No custody · Testnet ready
          </p>
        </motion.div>
      </div>
    </section>
  );
}
