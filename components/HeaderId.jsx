'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { Button } from "./ui/button"
import { useTheme } from 'next-themes'

export default function HeaderId() {
  const [isOpen, setIsOpen] = useState(false)
    const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme()

  const menuItems = ['About', 'Works', 'Projects','Gallery', 'Contact']

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) {
      return null;
    }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="p-6 border-b sticky top-0 bg-white dark:bg-gray-900 z-10"
    >
      <div className="flex justify-between items-center">
        <a href="/">
          <h1 className="text-3xl font-bold">Felix Gray</h1>
        </a>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            {menuItems.map((item) => (
              <li key={item}>
                <a
                  href={`https://kiko-portfolio.vercel.app/#${item.toLowerCase()}`}
                  className="hover:underline"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 md:hidden"
        >
          <ul className="flex flex-col space-y-2">
            {menuItems.map((item) => (
              <li key={item}>
                <a
                  href={`https://kiko-portfolio.vercel.app/#${item.toLowerCase()}`}
                  className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </motion.header>
  );
}