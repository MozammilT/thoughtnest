import { useState, useEffect } from "react";
import { comments_data } from "../../constants/assets.js";
import moment from "moment";

function CommentsMenu() {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Approved");

  const fetchComents = async () => {
    setComments(comments_data);
  };

  useEffect(() => {
    fetchComents();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-yellow-50/30">
      <div className="flex justify-between items-center max-w-3xl">
        <h1>Comments</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Approved")}
            className={`shadow-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "Approved" ? "text-primary" : "text-gray-700"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter("Not Approved")}
            className={`shadow-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "Not Approved" ? "text-primary" : "text-gray-700"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="relative h-4/5 max-w-4xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 uppercase text-left border-b border-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">
                Blog title & Comment
              </th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {comments
              .filter((item) => {
                if (filter === "Approved") return item.isApproved === true;
                return item.isApproved === false;
              })
              .map((comment, idx) => (
                <tr key={idx} className="border-gray-300 border-b">
                  <td className="px-6 py-4">
                    <b className="font-medium text-gray-600">Blog</b> :
                    {comment.blog.title} <br /> <br />
                    <b className="font-medium text-gray-600">Name</b> :
                    {comment.name} <br />
                    <b className="font-medium text-gray-600">Comment</b> :
                    {comment.content}
                  </td>
                  <td cassName="px-6 py-4 max-sm:hidden">
                    {moment(comment.blog.createdAt).format("MMMM Do, YYYY")}
                  </td>
                  <td className="px-20 py-4">
                    <div className="inline-flex items-center gap-4 ml-4">
                      {!comment.isApproved ? (
                        <img
                          src="/tick_icon.svg"
                          className="w-5 hover:scale-105 cursor-pointer transition-all"
                        />
                      ) : (
                        <p className="text-xs border border-green-600 text-green-600 rounded-full px-3 py-1isApproved">
                          Approved
                        </p>
                      )}
                      <img
                        src="/bin_icon.svg"
                        className="w-5 hover:scale-105 cursor-pointer transition-all"
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CommentsMenu;
