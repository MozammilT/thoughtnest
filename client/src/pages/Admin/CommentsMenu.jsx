import { useState, useEffect } from "react";
import moment from "moment";
import { toast } from "react-hot-toast";
import { AlertDialogDemo } from "../../components/AlertDialogue.jsx";
import { useAppContext } from "../../context/AppContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

function CommentsMenu() {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Approved");
  const { axios } = useAppContext();
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  const fetchComents = async () => {
    try {
      const { data } = await axios.get("/api/admin/comments");
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  const deleteComment = async (id) => {
    try {
      const { data } = await axios.delete(`/api/admin/delete-comment/${id}`);
      if (data.success) {
        toast.success(data.message, {
          position: "bottom-right",
          style: {
            borderRadius: "50px",
            background: "#595959",
            color: "#fff",
          },
        });
        fetchComents();
      } else {
        toast.error(err.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  const disapproveCommentStatus = async (id) => {
    try {
      const { data } = await axios.post(`/api/admin/disapprove-comment/${id}`);
      if (data.success) {
        toast.success(data.message, {
          position: "bottom-right",
          style: {
            borderRadius: "50px",
            background: "#595959",
            color: "#fff",
          },
        });
        fetchComents();
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  const approveCommentStatus = async (id) => {
    try {
      const { data } = await axios.post(`/api/admin/approve-comment/${id}`);
      if (data.success) {
        toast.success(data.message, {
          position: "bottom-right",
          style: {
            borderRadius: "50px",
            background: "#595959",
            color: "#fff",
          },
        });
        fetchComents();
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComents();
  }, []);

  return (
    <div
      className={`flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 overflow-y-auto ${
        darkMode ? "bg-[#171717]" : "bg-yellow-50/30"
      }`}
    >
      <div className="max-w-3xl w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div
          className={`flex items-center gap-1 text-lg font-semibold ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <img src="/comments_icon.svg" className="w-15" />
          <h1>Comments</h1>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Approved")}
            className={`border rounded-full px-4 py-1 cursor-pointer text-xs ${
              darkMode ? "shadow-md shadow-neutral-50/5" : "shadow-md"
            } ${
              filter === "Approved"
                ? "text-primary"
                : darkMode
                ? "text-gray-400"
                : "text-gray-700"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter("Not Approved")}
            className={`border rounded-full px-4 py-1 cursor-pointer text-xs ${
              darkMode ? "shadow-md shadow-neutral-50/5" : "shadow-md"
            } ${
              filter === "Not Approved"
                ? "text-primary"
                : darkMode
                ? "text-gray-400"
                : "text-gray-700"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="relative max-w-4xl overflow-x-auto mt-4 shadow rounded-lg scrollbar-hide max-h-[70vh] max-sm:max-h-[60vh] overflow-y-auto">
        {/* ✅ Table for desktop */}
        <table className="w-full text-sm text-gray-500 sm:table hidden">
          <thead
            className={`text-xs uppercase text-left border-b border-gray-300 sticky top-0 z-10 ${
              darkMode ? "bg-[#111827] text-gray-300" : "bg-white text-gray-700"
            }`}
          >
            <tr>
              <th scope="col" className="px-6 py-3">
                Blog title & Comment
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-10 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`${darkMode ? "bg-[#3d3d3d]" : "bg-white"}`}>
            {comments
              .filter((item) =>
                filter === "Approved" ? item.isApproved : !item.isApproved
              )
              .map((comment, idx) => (
                <tr key={idx} className="border-t border-gray-300">
                  <td
                    className={`px-6 py-4 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <b>Blog:</b> {comment.blog.title} <br />
                    <b>Name:</b> {comment.name} <br />
                    <b>Comment:</b> {comment.content}
                  </td>
                  <td
                    className={`px-6 py-4 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {moment(comment.blog.createdAt).format("MMMM Do, YYYY")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center gap-4">
                      {!comment.isApproved ? (
                        <button
                          onClick={() => approveCommentStatus(comment._id)}
                          className="text-green-100 bg-green-600 hover:bg-green-700 border border-green-600 rounded-full px-3 py-1 text-xs cursor-pointer"
                        >
                          Approve
                        </button>
                      ) : (
                        <button
                          onClick={() => disapproveCommentStatus(comment._id)}
                          className="text-red-100 bg-red-600 hover:bg-red-700 border border-red-500 rounded-full px-3 py-1 text-xs cursor-pointer"
                        >
                          Disapprove
                        </button>
                      )}
                      <AlertDialogDemo
                        trigger={
                          <img
                            src="/bin_icon.svg"
                            alt="delete"
                            className="w-5 hover:scale-125 transition-all cursor-pointer"
                          />
                        }
                        title={"Are you sure?"}
                        description={
                          "Doing this will permanently delete this comment from our servers."
                        }
                        onConfirm={() => deleteComment(comment._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* ✅ Card layout for mobile */}
        <div className="sm:hidden flex flex-col gap-4 mt-4">
          {comments
            .filter((item) =>
              filter === "Approved" ? item.isApproved : !item.isApproved
            )
            .map((comment, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-4 shadow-md ${
                  darkMode
                    ? "bg-[#3d3d3d] text-gray-200"
                    : "bg-white text-gray-700"
                }`}
              >
                <p>
                  <b>Blog:</b> {comment.blog.title}
                </p>
                <br />
                <p>
                  <b>Name:</b> {comment.name}
                </p>
                <p>
                  <b>Comment:</b> {comment.content}
                </p>
                <p className="text-xs mt-2 opacity-70">
                  {moment(comment.blog.createdAt).format("MMMM Do, YYYY")}
                </p>
                <div className="flex justify-between items-center mt-3">
                  {!comment.isApproved ? (
                    <button
                      onClick={() => approveCommentStatus(comment._id)}
                      className="text-green-100 bg-green-600 hover:bg-green-700 border border-green-600 rounded-full px-3 py-1 text-xs cursor-pointer"
                    >
                      Approve
                    </button>
                  ) : (
                    <button
                      onClick={() => disapproveCommentStatus(comment._id)}
                      className="text-red-100 bg-red-600 hover:bg-red-700 border border-red-500 rounded-full px-3 py-1 text-xs cursor-pointer"
                    >
                      Disapprove
                    </button>
                  )}
                  <AlertDialogDemo
                    trigger={
                      <img
                        src="/bin_icon.svg"
                        alt="delete"
                        className="w-5 hover:scale-125 transition-all cursor-pointer"
                      />
                    }
                    title={"Are you sure?"}
                    description={
                      "Doing this will permanently delete this comment from our servers."
                    }
                    onConfirm={() => deleteComment(comment._id)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CommentsMenu;
