"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      id="about"
      className=""
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">About Me</h2>
      <p className="max-w-2xl mx-auto">
        Felix Gray, a Slovak-Hungarian writer and photographer, is passionate about capturing the human experience's intricate details.<br /><br />
        His work explores themes of loss, introspection, and transformation, focusing on life's darker, more emotional aspects.<br /><br />
        Through his writing, Felix challenges societal norms and pushes storytelling boundaries. His narratives reflect personal and collective struggles, with a style that is both reflective and raw.<br /><br />
        As a photographer, he creates visual counterparts to his written work, exploring contrasts—light and shadow, beauty and decay, simplicity and complexity.<br /><br />
        His photographs serve as a visual commentary on his stories, capturing moments that speak to our silent emotions and untold stories. Each image aims to evoke a profound emotional response, drawing the viewer into the scene.<br /><br />
        His portfolio reflects his desire to push artistic boundaries, blending the literary and visual into cohesive narratives. He is committed to evolving as an artist, experimenting with new styles and mediums.<br /><br />
        His goals include expanding his body of work, engaging with diverse audiences, and contributing to the broader creative landscape with thought-provoking and evocative pieces.
      </p>
    </motion.section>
  );
}