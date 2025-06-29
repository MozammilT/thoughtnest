import { useState, useEffect } from "react";
import { blog_data } from "../../constants/assets.js";
import TableItem from "@/components/admin/TableItem.jsx";

function BloglistMenu() {
  const [blog, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    setBlogs(blog_data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <div className="flex m-4 mt-15 items-center gap-3 text-gray-600">
        <img src="/dashboard_icon_4.svg" />
        <p>All Blogs</p>
      </div>

      <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-600 text-left uppercase">
            <tr>
              <th scope="col" className="px-2 py-4 xl:px-6">
                #
              </th>
              <th scope="col" className="px-2 py-4">
                blog title
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                date
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                status
              </th>
              <th scope="col" className="px-2 py-4">
                actions
              </th>
            </tr>
          </thead>

          <tbody>
            {blog.map((blog, idx) => (
              <TableItem blog={blog} key={idx + 1} fetchBlogs={fetchBlogs} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BloglistMenu;
