import { useState, useEffect } from "react";
import moment from "moment";
import { toast } from "react-hot-toast";
import { AlertDialogDemo } from "../../components/AlertDialogue.jsx";
import { useAppContext } from "../../context/AppContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { Trash2, Loader2 } from "lucide-react";

function CommentsMenu() {
  const [comments, setComments] = useState([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});
  const [filter, setFilter] = useState("Approved");
  const { axios } = useAppContext();
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  const filteredComments = comments.filter((item) =>
    filter === "Approved" ? item.isApproved : !item.isApproved
  );

  // Helper function to set loading state for specific comment
  const setCommentLoadingState = (commentId, isLoading) => {
    setLoadingStates((prev) => ({
      ...prev,
      [commentId]: isLoading,
    }));
  };

  const SkeletonDesktop = () => {
    return (
      <tr className="border-t border-gray-300 animate-pulse">
        <td className="px-6 py-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <br />
            <div className="flex items-center gap-2">
              <div className="w-10 h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-40 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
        </td>
        <td className="px-6 py-4">
          <div className="inline-flex items-center gap-4">
            <div className="w-20 h-6 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </td>
      </tr>
    );
  };

  const SkeletonMobile = () => {
    return (
      <div
        className={`rounded-xl p-4 shadow-md ${
          darkMode ? "bg-[#3d3d3d] text-gray-200" : "bg-white text-gray-700"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <br />

        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="flex items-start gap-2">
          <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-40 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="w-24 h-3 bg-gray-200 rounded mt-2 opacity-70 animate-pulse"></div>

        <div className="flex justify-between items-center mt-3">
          <div className="bg-gray-300 rounded-full px-3 py-1 animate-pulse">
            <div className="w-16 h-3 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    );
  };

  const fetchComents = async () => {
    setCommentLoading(true);
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
    } finally {
      setCommentLoading(false);
    }
  };

  const deleteComment = async (id) => {
    setCommentLoadingState(id, true);
    try {
      const { data } = await axios.delete(`/api/admin/delete-comment/${id}`);
      if (data.success) {
        // Remove the comment from state instead of refetching
        setComments((prev) => prev.filter((comment) => comment._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    } finally {
      setCommentLoadingState(id, false);
    }
  };

  const disapproveCommentStatus = async (id) => {
    setCommentLoadingState(id, true);
    try {
      const { data } = await axios.post(`/api/admin/disapprove-comment/${id}`);
      if (data.success) {
        // Update the comment status in state instead of refetching
        setComments((prev) =>
          prev.map((comment) =>
            comment._id === id ? { ...comment, isApproved: false } : comment
          )
        );
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    } finally {
      setCommentLoadingState(id, false);
    }
  };

  const approveCommentStatus = async (id) => {
    setCommentLoadingState(id, true);
    try {
      const { data } = await axios.post(`/api/admin/approve-comment/${id}`);
      if (data.success) {
        // Update the comment status in state instead of refetching
        setComments((prev) =>
          prev.map((comment) =>
            comment._id === id ? { ...comment, isApproved: true } : comment
          )
        );
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    } finally {
      setCommentLoadingState(id, false);
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
      <div className="max-w-5xl w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
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
                ? "text-gray-600"
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
                ? "text-gray-600"
                : "text-gray-700"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="relative max-w-6xl overflow-x-auto mt-4 shadow rounded-lg scrollbar-hide max-h-[70vh] max-sm:max-h-[60vh] overflow-y-auto">
        {/*Table for desktop */}
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
            {commentLoading ? (
              Array.from({ length: 3 }, (_, idx) => (
                <SkeletonDesktop key={idx} />
              ))
            ) : filteredComments.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className={`text-center py-6 ${
                    darkMode ? "bg-[#3d3d3d] text-white" : "bg-white"
                  }`}
                >
                  All caught up! No comments pending approval
                </td>
              </tr>
            ) : (
              filteredComments.map((comment, idx) => (
                <tr key={idx} className="border-t border-gray-300">
                  <td
                    className={`px-6 py-4 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <b>Blog:</b> {comment.blog.title} <br /> <br />
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
                          disabled={loadingStates[comment._id]}
                          className="text-green-100 bg-green-600 hover:bg-green-700 border border-green-600 rounded-full px-3 py-1 text-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                        >
                          {loadingStates[comment._id] && (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          )}
                          Approve
                        </button>
                      ) : (
                        <button
                          onClick={() => disapproveCommentStatus(comment._id)}
                          disabled={loadingStates[comment._id]}
                          className="text-red-100 bg-red-600 hover:bg-red-700 border border-red-500 rounded-full px-3 py-1 text-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                        >
                          {loadingStates[comment._id] && (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          )}
                          Disapprove
                        </button>
                      )}
                      <AlertDialogDemo
                        trigger={
                          <Trash2
                            className={`text-[#ed2626] cursor-pointer hover:scale-125 transition-all ${
                              loadingStates[comment._id]
                                ? "opacity-50 pointer-events-none"
                                : ""
                            }`}
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
              ))
            )}
          </tbody>
        </table>

        {/*Card layout for mobile */}
        <div className="sm:hidden flex flex-col gap-4 mt-4">
          {commentLoading ? (
            Array.from({ length: 3 }, (_, idx) => <SkeletonMobile key={idx} />)
          ) : filteredComments.length === 0 ? (
            <p className="text-center text-gray-500 py-6">
              All caught up! No comments pending approval
            </p>
          ) : (
            filteredComments.map((comment, idx) => (
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
                      disabled={loadingStates[comment._id]}
                      className="text-green-100 bg-green-600 hover:bg-green-700 border border-green-600 rounded-full px-3 py-1 text-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      {loadingStates[comment._id] && (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      )}
                      Approve
                    </button>
                  ) : (
                    <button
                      onClick={() => disapproveCommentStatus(comment._id)}
                      disabled={loadingStates[comment._id]}
                      className="text-red-100 bg-red-600 hover:bg-red-700 border border-red-500 rounded-full px-3 py-1 text-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      {loadingStates[comment._id] && (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      )}
                      Disapprove
                    </button>
                  )}
                  <AlertDialogDemo
                    trigger={
                      <Trash2
                        className={`text-[#ed2626] cursor-pointer hover:scale-125 transition-all ${
                          loadingStates[comment._id]
                            ? "opacity-50 pointer-events-none"
                            : ""
                        }`}
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentsMenu;
