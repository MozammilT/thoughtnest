import { motion } from "motion/react";

function Loading() {
  const dotVariants = {
    jump: {
      y: -30,
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      animate="jump"
      transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
      className="loader-container"
    >
      <motion.div className="dot" variants={dotVariants} />
      <motion.div className="dot" variants={dotVariants} />
      <motion.div className="dot" variants={dotVariants} />
      <StyleSheet />
    </motion.div>
  );
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
  return (
    <style>
      {`
        .loader-container {
          position: fixed;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 50;
        }

        .dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #fdc700;
          will-change: transform;
          margin: 0 5px;
        }
      `}
    </style>
  );
}

export default Loading;
