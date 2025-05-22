"use client";
// May 21 Carousel app/page.tsx revision
type ToastOptions = {
  title: string;
  description?: string;
};

export function useToast() {
  return {
    toast: ({ title, description }: ToastOptions) => {
      const el = document.createElement("div");
      el.className =
        "fixed bottom-6 right-6 z-50 bg-black text-white px-4 py-2 rounded shadow text-sm";
      el.textContent = title;
      document.body.appendChild(el);

      setTimeout(() => {
        el.remove();
      }, 2500);
    },
  };
}

// // Basic toast system using event emitter (replace with shadcn or native toast if needed)
// import { useEffect } from "react";

// let toastCallback: ((message: string) => void) | null = null;

// export function useToast(callback: (message: string) => void) {
//   useEffect(() => {
//     toastCallback = callback;
//     return () => {
//       toastCallback = null;
//     };
//   }, [callback]);
// }

// export function showToast(message: string) {
//   if (toastCallback) toastCallback(message);
// }
