import { useEffect, useRef } from "react";
import { animate, stagger } from "motion";
import { splitText } from "motion-plus";
import { useTheme } from "../context/ThemeContext.jsx";

function HeaderPara() {
  const pRef = useRef(null);
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!pRef) return;

      const { words } = splitText(pRef.current);

      animate(
        words,
        { opacity: [0, 1], y: [10, 0] },
        { type: "spring", duration: 1.5, bounce: 0, delay: stagger(0.05) }
      );
    });
  }, []);

  return (
    <p
      ref={pRef}
      className={`my-6 sm:my-8 max-w-2xl m-auto max-sm:text-base text-lg bg ${
        darkMode ? "text-gray-200" : "text-gray-500"
      }`}
    >
      This is your space to think out loud, to share what matters, and to write
      without filters. Whether it's one word or a thousand, your story starts
      right here.
    </p>
  );
}

export default HeaderPara;
