import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext.jsx";

const words = ["blogging", "thinking", "storytelling", "expression"];

function Heading() {
  const [index, setIndex] = useState(0);
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1
      className={`text-7xl max-sm:text-3xl font-semibold text-center leading-tight ${
        darkMode ? "text-gray-200" : "text-gray-700"
      }`}
    >
      Your own
      <div className="relative inline-flex justify-center min-w-[250px] sm:w-[130px] px-2 text-primary mx-3 h-[60px] mb-2.5">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute left-0 top-0 right-0 text-center"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </div>
      <br />
      platform.
    </h1>
  );
}

export default Heading;
