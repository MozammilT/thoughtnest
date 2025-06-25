import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["blogging", "thinking", "storytelling", "expression"];

function Heading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-7xl max-sm:text-3xl font-semibold text-gray-700 text-center leading-tight">
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
