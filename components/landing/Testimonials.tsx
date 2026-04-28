"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "Finally, a bill-splitting app that doesn't require trust. Every payment is verifiable on-chain — exactly what our group needed.",
    name: "Priya Sharma",
    role: "Crypto Enthusiast",
    initial: "P",
    color: "bg-violet-500",
  },
  {
    quote: "We used it for our Goa trip with 8 people. Settlement took seconds, not days of chasing payments. Game changer.",
    name: "Arjun Mehta",
    role: "Product Designer",
    initial: "A",
    color: "bg-blue-500",
  },
  {
    quote: "The Freighter integration is seamless. Connect, split, pay — done. No complicated setup, no hidden fees.",
    name: "Sneha Patel",
    role: "Software Engineer",
    initial: "S",
    color: "bg-amber-500",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#F6F6F6]">
      <div className="container-max section-padding">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="badge-lime text-[10px] mb-4 inline-flex">Testimonials</span>
          <h2 className="heading-section text-[#0F0F14] mt-4">Loved by early adopters</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-base p-7"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#2DD4BF] text-[#2DD4BF]" />
                ))}
              </div>
              <p className="text-sm text-[#555] leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold`}>
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F0F14]">{t.name}</p>
                  <p className="text-xs text-[#888]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
