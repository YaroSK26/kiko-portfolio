"use client"

import { useState, useEffect } from 'react';
import Header from "../components/Header";
import About from "../components/About";
import FeaturedWorks from "../components/FeaturedWorks";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import LetterPullup from "../components/LetterPullup";
import Gallery from '../components/Gallery';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 

    return () => clearTimeout(timer); 
  }, []);

  if (isLoading) {
    return (
      <div className=" bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen flex items-center justify-center text-2xl">
        <LetterPullup words="Felix Gray" delay={0.1} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
      <Header />
      <main className="flex-grow p-6 space-y-12">
        <About />
        <FeaturedWorks />
        <Projects />
        <Gallery/>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}