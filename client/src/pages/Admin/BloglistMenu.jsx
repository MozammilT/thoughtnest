import { useState, useEffect } from "react";
import TableItem from "@/components/admin/TableItem.jsx";
import { toast } from "react-hot-toast";
import { useAppContext } from "../../context/AppContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import TableItemSkeleton from "@/components/TableItemSkeleton.jsx";

function BloglistMenu() {
  const [blog, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { axios } = useAppContext();
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/admin/blogs");
      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to update a single blog's publish status without refetching all blogs
  const updateBlogStatus = (blogId, newStatus) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blogItem) =>
        blogItem._id === blogId
          ? { ...blogItem, isPublished: newStatus }
          : blogItem
      )
    );
  };

  // Function to remove a blog from the list after deletion
  const removeBlog = (blogId) => {
    setBlogs((prevBlogs) =>
      prevBlogs.filter((blogItem) => blogItem._id !== blogId)
    );
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div
      className={`min-h-screen pl-4 ${
        darkMode ? "bg-[#171717]" : "bg-yellow-50/30"
      }`}
    >
      <div
        className={`flex m-4 mt-10 items-center gap-3 ${
          darkMode ? "text-gray-200" : "text-gray-600"
        }`}
      >
        <img src="/dashboard_icon_4.svg" />
        <p>All Blogs</p>
      </div>

      <div
        className={`relative max-w-6xl shadow-lg border rounded-lg scrollbar-hide overflow-hidden ${
          darkMode ? "border-gray-900" : "border-gray-200"
        }`}
      >
        <div className="max-h-[500px] overflow-y-auto">
          <table
            className={`w-full text-sm ${
              darkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            <thead
              className={`text-xs text-left uppercase sticky top-0 z-10 ${
                darkMode
                  ? "bg-[#111827] text-gray-200"
                  : "bg-white text-gray-600"
              }`}
            >
              <tr>
                <th className="px-2 py-4 xl:px-6">#</th>
                <th className="px-2 py-4">blog title</th>
                <th className="px-2 py-4">Category</th>
                <th className="px-2 py-4 max-sm:hidden text-center">date</th>
                <th className="px-2 py-4 max-sm:hidden">status</th>
                <th className="px-2 py-4">actions</th>
              </tr>
            </thead>

            <tbody>
              {loading
                ? Array.from({ length: 5 }, (_, idx) => (
                    <TableItemSkeleton key={idx} />
                  ))
                : blog.map((blog, idx) => (
                    <TableItem
                      blog={blog}
                      key={blog._id}
                      index={idx + 1}
                      fetchBlogs={fetchBlogs}
                      updateBlogStatus={updateBlogStatus}
                      removeBlog={removeBlog}
                      isAlternate={idx % 2 === 0}
                    />
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BloglistMenu;
