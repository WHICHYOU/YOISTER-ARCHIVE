import type { Meta, StoryObj } from "@storybook/react";
import { motion } from "framer-motion";
import { fadeIn, slideUp, pop } from "@/lib/motion";

const meta: Meta = { title: "Motion/Presets" };
export default meta;
type Story = StoryObj;

export const Fade: Story = {
  render: () => <motion.div variants={fadeIn} initial="hidden" animate="show" className="p-6 bg-brand text-white">Fade In</motion.div>,
};

export const SlideUp: Story = {
  render: () => <motion.div variants={slideUp} initial="hidden" animate="show" className="p-6 bg-brand text-white">Slide Up</motion.div>,
};

export const Pop: Story = {
  render: () => <motion.div variants={pop} initial="hidden" animate="show" className="p-6 bg-brand text-white">Pop</motion.div>,
};
