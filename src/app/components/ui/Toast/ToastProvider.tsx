"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import {
  CheckCircledIcon,
  Cross2Icon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { Toast } from "radix-ui";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastMessage {
  id: string;
  title?: string;
  description: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextValue {
  showToast: (options: {
    description: string;
    title?: string;
    type?: ToastType;
    duration?: number;
  }) => void;
  toast: {
    success: (description: string, title?: string) => void;
    error: (description: string, title?: string) => void;
    warning: (description: string, title?: string) => void;
    info: (description: string, title?: string) => void;
  };
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    ({
      description,
      title,
      type = "info",
      duration = 4000,
    }: {
      description: string;
      title?: string;
      type?: ToastType;
      duration?: number;
    }) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const newToast: ToastMessage = { id, title, description, type, duration };
      setToasts((prev) => [...prev, newToast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toastMethods = {
    success: (description: string, title?: string) =>
      showToast({ description, title, type: "success" }),
    error: (description: string, title?: string) =>
      showToast({ description, title, type: "error" }),
    warning: (description: string, title?: string) =>
      showToast({ description, title, type: "warning" }),
    info: (description: string, title?: string) =>
      showToast({ description, title, type: "info" }),
  };

  const getVariantStyles = (type: ToastType) => {
    switch (type) {
      case "success":
        return {
          border: "border-emerald-500/30",
          bg: "bg-emerald-50/95 dark:bg-emerald-950/90 text-emerald-950 dark:text-emerald-50",
          iconBg: "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400",
          icon: <CheckCircledIcon className="w-5 h-5" />,
          defaultTitle: "Sucesso",
        };
      case "error":
        return {
          border: "border-rose-500/30",
          bg: "bg-rose-50/95 dark:bg-rose-950/90 text-rose-950 dark:text-rose-50",
          iconBg: "bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400",
          icon: <CrossCircledIcon className="w-5 h-5" />,
          defaultTitle: "Erro",
        };
      case "warning":
        return {
          border: "border-amber-500/30",
          bg: "bg-amber-50/95 dark:bg-amber-950/90 text-amber-950 dark:text-amber-50",
          iconBg: "bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400",
          icon: <ExclamationTriangleIcon className="w-5 h-5" />,
          defaultTitle: "Atenção",
        };
      case "info":
      default:
        return {
          border: "border-blue-500/30",
          bg: "bg-blue-50/95 dark:bg-blue-950/90 text-blue-950 dark:text-blue-50",
          iconBg: "bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400",
          icon: <InfoCircledIcon className="w-5 h-5" />,
          defaultTitle: "Informação",
        };
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, toast: toastMethods }}>
      <Toast.Provider swipeDirection="right">
        {children}

        {toasts.map((item) => {
          const style = getVariantStyles(item.type);
          return (
            <Toast.Root
              key={item.id}
              duration={item.duration}
              onOpenChange={(open) => {
                if (!open) removeToast(item.id);
              }}
              className={`flex items-start gap-3 p-4 rounded-xl shadow-lg backdrop-blur-md border ${style.border} ${style.bg}
                data-[state=open]:animate-toast-slide-in data-[state=closed]:animate-toast-hide
                data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]
                data-[swipe=cancel]:translate-x-0 transition-transform
                data-[swipe=end]:animate-toast-swipe-out select-none`}
            >
              <div className={`p-1.5 rounded-lg flex-shrink-0 ${style.iconBg}`}>
                {style.icon}
              </div>

              <div className="flex-1 pt-0.5">
                <Toast.Title className="text-sm font-semibold leading-tight">
                  {item.title || style.defaultTitle}
                </Toast.Title>
                <Toast.Description className="mt-1 text-xs opacity-90 leading-relaxed">
                  {item.description}
                </Toast.Description>
              </div>

              <Toast.Close
                className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors p-1 rounded-md cursor-pointer"
                aria-label="Fechar notificação"
              >
                <Cross2Icon className="w-4 h-4" />
              </Toast.Close>
            </Toast.Root>
          );
        })}

        <Toast.Viewport className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 w-[360px] max-w-[calc(100vw-2rem)] outline-none" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast deve ser utilizado dentro de um ToastProvider");
  }
  return context;
};
