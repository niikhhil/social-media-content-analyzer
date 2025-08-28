import React from 'react';
import { motion } from 'framer-motion';

function ThemeSwitcher({ theme, toggleTheme }) {
  return (
    <motion.div
      className="theme-switcher"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9, rotate: -15 }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </motion.div>
  );
}

export default ThemeSwitcher;
