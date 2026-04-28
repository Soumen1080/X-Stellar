"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWalletContext } from "@/context/WalletContext";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { isConnected, isConnecting, isHydrated } = useWalletContext();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isHydrated) return;

    if (!isConnected) {
      router.replace("/auth");
      return;
    }

    if (isConnected && !isAuthenticated && !isLoading) {
      router.replace("/auth");
    }
  }, [isHydrated, isConnected, isAuthenticated, isLoading, router]);

  // Show spinner while connecting or loading auth
  if (isConnecting || (isHydrated && isConnected && isLoading)) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-[#2DD4BF] animate-spin" />
          <p className="text-sm text-[#888] font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Still hydrating
  if (!isHydrated) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <Loader2 className="w-8 h-8 text-[#2DD4BF] animate-spin" />
      </div>
    );
  }

  // Not connected or not authenticated — redirect is in progress
  if (!isConnected || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
