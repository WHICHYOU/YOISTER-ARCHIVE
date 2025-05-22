import { Variants } from "framer-motion";

/** Standard fade/slide presets used app‑wide */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, translateY: 16 },
  show: { opacity: 1, translateY: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

export const pop: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
};
