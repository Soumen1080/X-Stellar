"use client";

import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration: number;
}

interface ToastContextType {
  success: (title: string, message?: string, duration?: number) => void;
  error: (title: string, message?: string, duration?: number) => void;
  info: (title: string, message?: string, duration?: number) => void;
  warning: (title: string, message?: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

const TOAST_CONFIG: Record<ToastType, { icon: typeof CheckCircle2; bar: string; iconColor: string }> = {
  success: { icon: CheckCircle2, bar: "bg-[#2DD4BF]", iconColor: "text-[#2DD4BF]" },
  error: { icon: AlertCircle, bar: "bg-red-500", iconColor: "text-red-500" },
  info: { icon: Info, bar: "bg-blue-500", iconColor: "text-blue-500" },
  warning: { icon: AlertTriangle, bar: "bg-amber-500", iconColor: "text-amber-500" },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType, title: string, message?: string, duration = 3000) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value: ToastContextType = {
    success: (t, m, d) => addToast("success", t, m, d),
    error: (t, m, d) => addToast("error", t, m, d),
    info: (t, m, d) => addToast("info", t, m, d),
    warning: (t, m, d) => addToast("warning", t, m, d),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-96 z-[200] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            const config = TOAST_CONFIG[toast.type];
            const Icon = config.icon;
            return (
              <motion.div key={toast.id}
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.95 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto rounded-2xl bg-white border border-[#E5E5E5] shadow-card overflow-hidden flex"
              >
                {/* Color bar */}
                <div className={`w-1 shrink-0 ${config.bar}`} />
                <div className="flex items-start gap-3 px-4 py-3 flex-1 min-w-0">
                  <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${config.iconColor}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0F0F14]">{toast.title}</p>
                    {toast.message && <p className="text-xs text-[#888] mt-0.5">{toast.message}</p>}
                  </div>
                  <button onClick={() => dismiss(toast.id)}
                    className="shrink-0 p-1 rounded-lg hover:bg-[#F6F6F6] transition-colors">
                    <X className="w-3.5 h-3.5 text-[#888]" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextType {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
