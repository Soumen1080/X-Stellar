"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, Copy, Check, LayoutDashboard, Receipt, Map, LogOut } from "lucide-react";
import { StellarStarLogo } from "@/components/ui/Logo";
import { useWalletContext } from "@/context/WalletContext";
import { useAuth } from "@/context/AuthContext";
import { formatAddress } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

const DROPDOWN_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Expenses", href: "/expenses", icon: Receipt },
  { label: "Trips", href: "/trips", icon: Map },
];

export default function Header() {
  const pathname = usePathname();
  const { publicKey, isConnected, disconnect } = useWalletContext();
  const { user, isAuthenticated, signOut } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close dropdown on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setUserMenuOpen(false); setMobileOpen(false); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const copyAddress = useCallback(() => {
    if (!publicKey) return;
    navigator.clipboard.writeText(publicKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [publicKey]);

  const handleSignOut = useCallback(() => {
    signOut();
    disconnect();
    setUserMenuOpen(false);
  }, [signOut, disconnect]);

  const isLanding = pathname === "/";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled
        ? "top-3 mx-4 sm:mx-6 lg:mx-8 bg-white/90 backdrop-blur-xl border border-[#E5E5E5] rounded-2xl shadow-card"
        : "bg-white/80 backdrop-blur-sm border-b border-[#E5E5E5]/60"
    }`}>
      <div className="container-max">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6">
          {/* Logo */}
          <StellarStarLogo />

          {/* Desktop Nav */}
          {isLanding && (
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href}
                  className="px-4 py-2 text-sm font-medium text-[#555] hover:text-[#0F0F14] rounded-xl hover:bg-black/5 transition-all duration-200">
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div ref={dropdownRef} className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-black/5 transition-all duration-200">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2DD4BF] to-[#0D9488] flex items-center justify-center text-white text-sm font-bold">
                    {user.displayName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-[#0F0F14] max-w-[120px] truncate">{user.displayName}</span>
                  <ChevronDown className={`w-4 h-4 text-[#888] transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div initial={{ opacity: 0, scale: 0.95, y: -8 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -8 }} transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-xl border border-[#E5E5E5] overflow-hidden">
                      {/* Wallet Address */}
                      <div className="px-4 py-3 border-b border-[#E5E5E5]/60">
                        <p className="text-xs text-[#888] mb-1">Wallet</p>
                        <button onClick={copyAddress}
                          className="flex items-center gap-2 text-sm font-mono text-[#0F0F14] hover:text-[#2DD4BF] transition-colors">
                          {formatAddress(publicKey ?? "")}
                          {copied ? <Check className="w-3.5 h-3.5 text-[#2DD4BF]" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      {/* Nav Links */}
                      <div className="py-1">
                        {DROPDOWN_LINKS.map((link) => (
                          <Link key={link.href} href={link.href} onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#333] hover:bg-[#F6F6F6] transition-colors">
                            <link.icon className="w-4 h-4 text-[#888]" />
                            {link.label}
                          </Link>
                        ))}
                      </div>
                      {/* Sign Out */}
                      <div className="border-t border-[#E5E5E5]/60 py-1">
                        <button onClick={handleSignOut}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full transition-colors">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : isConnected ? (
              <Link href="/auth" className="btn-primary text-sm px-5 py-2">Sign Up</Link>
            ) : (
              <Link href="/auth" className="btn-dark text-sm px-5 py-2">Get Started</Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden p-2 rounded-xl hover:bg-black/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
            className="md:hidden border-t border-[#E5E5E5]/60 bg-white/95 backdrop-blur-xl overflow-hidden">
            <div className="px-4 py-4 space-y-1">
              {isLanding && NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-[#555] hover:text-[#0F0F14] rounded-xl hover:bg-black/5 transition-all">
                  {link.label}
                </a>
              ))}
              {isAuthenticated ? (
                <>
                  {DROPDOWN_LINKS.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#555] hover:text-[#0F0F14] rounded-xl hover:bg-black/5 transition-all">
                      <link.icon className="w-4 h-4" /> {link.label}
                    </Link>
                  ))}
                  <button onClick={handleSignOut}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 rounded-xl hover:bg-red-50 w-full transition-all">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <Link href="/auth" onClick={() => setMobileOpen(false)}
                  className="block mt-2 btn-dark text-sm text-center w-full">
                  Get Started
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
