import { useState } from "react";
import { blogCategories, blog_data } from "../constants/assets";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext.jsx";

function BlogList() {
  const [menu, setMenu] = useState("All");
  const { blogs, inputs } = useAppContext();

  const filterBlogs = () => {
    if (inputs === "") {
      return blogs;
    }
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(inputs.toLowerCase()) ||
        blog.category.toLowerCase().includes(inputs.toLowerCase())
    );
  };

  const filteredBlogs = filterBlogs().filter(
    (blog) => menu === "All" || blog.category === menu
  );

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
      {/* Blog cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {filteredBlogs.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 text-lg">
            No content found
          </p>
        ) : (
          filteredBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        )}
      </div>
    </div>
  );
}
export default BlogList;
