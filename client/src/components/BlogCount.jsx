import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";
import { blog_data } from "../constants/assets.js";

function BlogCount() {
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));
  const countValue = blog_data.length;

  useEffect(() => {
    const controls = animate(count, countValue, { duration: 3 });
    return () => controls.stop();
  }, []);

  return (
    <p className="text-sm text-gray-600 mb-2">
      Published
      <motion.strong className="w-[25px] inline-block text-center">
        {rounded}
      </motion.strong>
      insightful blog posts and counting...
    </p>
  );
}
export default BlogCount;
