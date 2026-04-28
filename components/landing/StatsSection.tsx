"use client";

import React from "react";
import { motion } from "framer-motion";

const STATS = [
  { value: "2,000+", label: "Early Users", color: "text-[#2DD4BF]" },
  { value: "Sub-5s", label: "Settlement Time", color: "text-[#0F0F14]" },
  { value: "100%", label: "On-Chain Verified", color: "text-[#2DD4BF]" },
];

export default function StatsSection() {
  return (
    <section className="bg-white border-y border-[#E5E5E5]/60">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-[#E5E5E5]">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center px-6"
            >
              <p className={`text-4xl lg:text-5xl font-black ${stat.color} mb-2`}>{stat.value}</p>
              <p className="text-sm text-[#888] font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
