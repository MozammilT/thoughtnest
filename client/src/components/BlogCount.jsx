import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

function BlogCount() {
  const { axios } = useAppContext();
  const [blogCount, setBlogCount] = useState(0);
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  const getBlogCount = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      if (data.success) {
        setBlogCount(data.blogData.length);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    getBlogCount();
  }, []);

  useEffect(() => {
    const controls = animate(count, blogCount, { duration: 3 });
    return () => controls.stop();
  }, [blogCount]);

  return (
    <p
      className={`text-base mb-2 ${
        darkMode ? "text-gray-200" : "text-gray-600"
      }`}
    >
      Published
      <motion.strong className="w-[25px] inline-block text-center">
        {rounded}
      </motion.strong>
      insightful blog posts and counting...
    </p>
  );
}
export default BlogCount;
