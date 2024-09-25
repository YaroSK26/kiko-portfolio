import React from 'react';
import { motion } from 'framer-motion';

const Gallery = () => {
  const images = [
    "./1.jpg",
    "./2.jpg",
    "./3.jpg",
    "./4.jpg",
    "./5.jpg",
    "./6.jpg",
    "./7.jpg",
    "./8.jpg",
  ];
//
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      id="gallery"
      className="flex flex-wrap justify-center max-w-4xl items-center mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-4 w-full text-center">Gallery</h2>
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="m-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 * (index + 1) }}
        >
          <img src={image} alt={`Gallery ${index}`} className="w-48 h-48 object-cover" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Gallery;