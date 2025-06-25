import { useState } from "react";
import { blogCategories } from "../constants/assets";
import { motion } from "motion/react";

function BlogList() {
  const [menu, setMenu] = useState("All");

  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((blog) => (
          <div key={blog} className="relative px-4 py-2 cursor-pointer z-10">
            <motion.button
              onClick={() => setMenu(blog)}
              className="text-base cursor-pointer px-4 py-0.5"
              animate={{ color: menu === blog ? "#fff" : "#374151" }}
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
            >
              {blog}
              {menu === blog && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  className="absolute left-0 top-0.5 right-0 bg-primary rounded-full h-10 -z-1"
                />
              )}
            </motion.button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default BlogList;
