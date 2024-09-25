"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      id="about"
      className="text-center"
    >
      <h2 className="text-2xl font-semibold mb-4">About Me</h2>
      <p className="max-w-2xl mx-auto">
        I&apos;m a passionate writer and poet, exploring the depths of human
        emotion and experience through words. My work often reflects on nature,
        love, and the complexities of modern life.
      </p>
    </motion.section>
  );
}
