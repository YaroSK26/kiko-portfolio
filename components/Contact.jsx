"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      id="contact"
      className="text-center"
    >
      <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
      <Button variant="outline" className="flex items-center mx-auto">
        <Mail className="w-4 h-4 mr-2" />
        Contact Me
      </Button>
    </motion.section>
  );
}
