"use client";

import React, { type ReactNode } from "react";
import { useWalletContext } from "@/context/WalletContext";

interface WalletGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function WalletGuard({ children, fallback = null }: WalletGuardProps) {
  const { isConnected } = useWalletContext();

  if (!isConnected) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
