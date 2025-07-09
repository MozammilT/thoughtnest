import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext.jsx";
import moment from "moment";
import { toast } from "react-hot-toast";
import { AlertDialogDemo } from "../../components/AlertDialogue.jsx";

function CommentsMenu() {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Approved");
  const { axios } = useAppContext();

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
        toast.success(data.message);
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
        toast.success(data.message);
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
        toast.success(data.message);
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
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-yellow-50/30">
      <div className="flex justify-between items-center max-w-3xl">
        <h1>Comments</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Approved")}
            className={`shadow-md border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "Approved" ? "text-primary" : "text-gray-700"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter("Not Approved")}
            className={`shadow-md border rounded-full px-4 py-1 cursor-pointer text-xs ${
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
              <th scope="col" className="px-10 py-3">
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
                  <td className="px-6 py-4 max-sm:hidden">
                    {moment(comment.blog.createdAt).format("MMMM Do, YYYY")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center gap-4 ml-4">
                      {!comment.isApproved ? (
                        <button
                          onClick={() => approveCommentStatus(comment._id)}
                        >
                          <img
                            src="/tick_icon.svg"
                            title="Approve Comment"
                            className="w-5 hover:scale-105 cursor-pointer transition-all"
                          />
                        </button>
                      ) : (
                        <button
                          onClick={() => disapproveCommentStatus(comment._id)}
                          title="Disapprove comment"
                          className="text-xs border border-green-600 text-green-600 rounded-full px-3 py-1 cursor-pointer"
                        >
                          Disapprove
                        </button>
                      )}
                      <AlertDialogDemo
                        trigger={
                          <img
                            src="/bin_icon.svg"
                            title="Delete Comment"
                            className="w-5 hover:scale-125 cursor-pointer transition-all"
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
      </div>
    </div>
  );
}

export default CommentsMenu;
