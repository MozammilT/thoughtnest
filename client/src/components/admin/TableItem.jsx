import moment from "moment";
import { useAppContext } from "../../context/AppContext.jsx";
import { toast } from "react-hot-toast";

function TableItem({ blog, fetchBlogs, index, isAlternate }) {
  const { title, createdAt, category, _id } = blog;
  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;
    try {
      const { data } = await axios.delete(`/api/blog/delete/${_id}`);
      if (data.success) {
        toast.success(data.message);
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
        toast.success(data.message);
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
        isAlternate ? "bg-gray-50" : "bg-white"
      }`}
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
        className={`px-2 py-4 text-left max-sm:hidden font-medium ${
          blog.isPublished ? "text-green-600" : "text-orange-700"
        }`}
      >
        {blog.isPublished ? "Published" : "Unpublished"}
      </th>
      <th className="px-2 py-4 flex text-xs gap-3">
        <button
          onClick={togglePublish}
          className={`px-2 py-1 rounded text-xs font-medium cursor-pointer ${
            blog.isPublished
              ? "bg-red-100 text-red-600 hover:bg-red-200"
              : "bg-green-100 text-green-600 hover:bg-green-200"
          } transition-all`}
        >
          {blog.isPublished ? "Unpublished" : "Published"}
        </button>
        <button onClick={deleteBlog}>
          <img
            src="/cross_icon.svg"
            className="w-8 rounded-full  hover:scale-125 hover:bg-red-100 transition-all cursor-pointer p-1"
            alt="cross-icon"
          />
        </button>
      </th>
    </tr>
  );
}

export default TableItem;
