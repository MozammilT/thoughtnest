import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { blog_data } from "../constants/assets.js";
import { useAppContext } from "../context/AppContext.jsx";

function BlogCount() {
  const { axios } = useAppContext();
  const [blogCount, setBlogCount] = useState(0);

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
    <p className="text-base text-gray-600 mb-2">
      Published
      <motion.strong className="w-[25px] inline-block text-center">
        {rounded}
      </motion.strong>
      insightful blog posts and counting...
    </p>
  );
}
export default BlogCount;
