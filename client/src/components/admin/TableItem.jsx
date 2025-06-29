import moment from "moment";

function TableItem({ blog, fetchBlogs, index }) {
  const { title, createdAt } = blog;

  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <th className="px-2 py-4 text-left font-medium">{title}</th>
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
        <button className="border px-2 py-0.5 mt-1 rounded cursor-pointer font-medium">
          {blog.isPublished ? "Unpublished" : "Published"}
        </button>
        <img
          src="/cross_icon.svg"
          className="w-8 hover:scale-105 transition-all cursor-pointer"
          alt="cross-icon"
        />
      </th>
    </tr>
  );
}

export default TableItem;
