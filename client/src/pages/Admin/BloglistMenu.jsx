import { useState, useEffect } from "react";
import { blog_data } from "../../constants/assets.js";
import TableItem from "@/components/admin/TableItem.jsx";
import { toast } from "react-hot-toast";
import { useAppContext } from "../../context/AppContext.jsx";

function BloglistMenu() {
  const [blog, setBlogs] = useState([]);
  const { axios } = useAppContext();

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/admin/blogs");
      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="bg-yellow-50/30 min-h-screen pl-4">
      <div className="flex m-4 mt-15 items-center gap-3 text-gray-600">
        <img src="/dashboard_icon_4.svg" />
        <p>All Blogs</p>
      </div>

      <div className="relative max-w-4xl shadow-lg border border-gray-200 rounded-lg scrollbar-hide bg-white overflow-hidden">
        <div className="max-h-[450px] overflow-y-auto">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase bg-white sticky top-0 z-10">
              <tr>
                <th className="px-2 py-4 xl:px-6">#</th>
                <th className="px-2 py-4">blog title</th>
                <th className="px-2 py-4">Category</th>
                <th className="px-2 py-4 max-sm:hidden">date</th>
                <th className="px-2 py-4 max-sm:hidden">status</th>
                <th className="px-2 py-4">actions</th>
              </tr>
            </thead>

            <tbody>
              {blog.map((blog, idx) => (
                <TableItem
                  blog={blog}
                  key={idx}
                  index={idx + 1}
                  fetchBlogs={fetchBlogs}
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
