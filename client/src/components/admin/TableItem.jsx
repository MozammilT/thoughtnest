import moment from "moment";
import { toast } from "react-hot-toast";
import { AlertDialogDemo } from "../AlertDialogue.jsx";
import { useAppContext } from "../../context/AppContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { Trash2 } from "lucide-react";

function TableItem({ blog, fetchBlogs, index, isAlternate }) {
  const { title, createdAt, category, _id } = blog;
  const { axios } = useAppContext();
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  const deleteBlog = async () => {
    try {
      const { data } = await axios.delete(`/api/blog/delete/${_id}`);
      if (data.success) {
        toast.success(data.message, {
          position: "bottom-right",
          style: {
            borderRadius: "50px",
            background: "#595959",
            color: "#fff",
          },
        });
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message, {
          position: "bottom-right",
          style: {
            borderRadius: "50px",
            background: "#595959",
            color: "#fff",
          },
        });
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  return (
    <tr
      className={`border-y border-gray-300 ${
        darkMode
          ? isAlternate
            ? "bg-gray-800"
            : "bg-dark"
          : isAlternate
          ? "bg-gray-100"
          : "bg-white"
      } ${darkMode ? "text-gray-300" : "text-gray-600"}`}
    >
      <th className="px-2 py-4">{index}</th>
      <th className="px-2 py-4 text-left font-medium">{title}</th>
      <th className="text-left text-primary inline-block bg-primary/10 rounded-full px-3 py-1.5 border my-4 text-xs font-medium">
        {category}
      </th>
      <th className="px-2 py-4 max-sm:hidden text-left font-medium">
        {moment(createdAt).format("MMMM Do, YYYY")}
      </th>
      <th
        className={`px-2 py-4 text-left max-sm:hidden font-medium min-w-23 ${
          blog.isPublished ? "text-green-600" : "text-orange-700"
        }`}
      >
        {blog.isPublished ? "Published" : "Unpublished"}
      </th>
      <th className="px-2 py-4 flex text-xs gap-3">
        <button
          onClick={togglePublish}
          title={`${
            blog.isPublished ? "Unpublish comment" : "Publish comment"
          }`}
          className={`px-2 py-1 rounded text-xs font-medium cursor-pointer min-w-20 ${
            blog.isPublished
              ? "bg-red-100 text-red-600 hover:bg-red-200"
              : "bg-green-100 text-green-600 hover:bg-green-200"
          } transition-all`}
        >
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>

        <AlertDialogDemo
          trigger={<Trash2 className="text-[#ed2626] cursor-pointer hover:scale-110 transition-all" />}
          title={"Are you sure?"}
          description={
            "Doing this will permanently delete this blog from our servers."
          }
          onConfirm={deleteBlog}
        />
      </th>
    </tr>
  );
}

export default TableItem;
