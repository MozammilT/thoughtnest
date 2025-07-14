import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import moment from "moment";
import Loading from "../components/Loading.jsx";
import Footer from "../components/Footer.jsx";
import { useAppContext } from "../context/AppContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { toast } from "react-hot-toast";

function Blog() {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { axios } = useAppContext();
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/blog/${id}`);
      if (data.success) {
        setBlogData(data.blogData);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post("/api/blog/comments", { id });
      if (data.success) {
        setComments(data.blogComment);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  const commentHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/api/blog/add-comments", {
        blog: id,
        name,
        content,
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
        fetchComments();
        setContent("");
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : blogData ? (
        <>
          <div className="relative">
            <img
              src="/gradientBackground.png"
              className="absolute -top-50 -z-10 opacity-50"
            />
            <div className="text-center mt-20">
              <p className="text-primary font-medium my-5">
                Published on {moment(blogData.createdAt).format("MMMM Do YYYY")}
              </p>
              <h1
                className={`text-2xl sm:text-5xl font-semibold max-w-2xl my-5 mx-auto ${
                  darkMode ? "text-gray-200" : "text-gray-600"
                }`}
              >
                {blogData.title}
              </h1>
              <p
                className={`text-xl my-5 truncate max-w-lg mx-auto ${
                  darkMode ? "text-gray-100" : "text-gray-600"
                }`}
              >
                {blogData.subTitle}
              </p>
              <span className="text-primary inline-block bg-primary/10 rounded-full px-4 py-1.5 border my-4 text-base font-medium">
                {blogData.author.username}
              </span>
            </div>
            <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
              <img
                src={blogData.image}
                className="rounded-3xl mb-10 w-full h-auto max-h-[450px] object-cover"
              />
              <div
                className="rich-text max-w-3xl mx-auto"
                dangerouslySetInnerHTML={{ __html: blogData.description }}
              ></div>

              <div className="mt-14 mb-10 max-w-3xl mx-auto">
                <p
                  className={`font-semibold text-lg mb-5 ${
                    darkMode ? "text-gray-300" : "text-black"
                  }`}
                >{`Comments (${comments.length})`}</p>
                <div className="flex flex-col gap-4">
                  {comments.map((comment, index) => (
                    <div
                      key={index}
                      className={`relative  border  max-w-xl p-4 rounded ${
                        darkMode
                          ? "bg-primary/15 border-primary/20 text-gray-300"
                          : "bg-primary/2 border-primary/5 text-gray-600"
                      }`}
                    >
                      <div className="flex items-center mb-2 gap-3">
                        <img src="/user_icon.svg" className="w-8" />
                        <p className="font-medium">{comment.name}</p>
                      </div>
                      <p className="text-sm max-w-md ml-10">
                        {comment.content}
                      </p>
                      <div className="absolute right-4 bottom-3 text-sm flex items-center gap-2">
                        {moment(comment.createdAt).fromNow()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <p
                className={`font-semibold text-lg mb-5 ${
                  darkMode ? "text-gray-200" : "text-black"
                }`}
              >
                Add your comment
              </p>
              <form
                onSubmit={commentHandler}
                className="flex flex-col gap-4 items-start max-w-lg"
              >
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className={`w-full p-2 border rounded outline-none mb-5 ${
                    darkMode ? "border-gray-700" : "border-gray-300"
                  }`}
                />
                <textarea
                  required
                  value={content}
                  placeholder="Comment"
                  onChange={(e) => setContent(e.target.value)}
                  className={`w-full p-2 border rounded outline-none h-30 ${
                    darkMode ? "border-gray-700" : "border-gray-300"
                  }`}
                />

                <button
                  type="submit"
                  className="bg-primary/90 text-white text-xl px-4 py-2 rounded-lg cursor-pointer hover:scale-105 transition-all duration-200 mb-15"
                >
                  Submit
                </button>
              </form>

              <div>
                <p
                  className={`font-medium text-lg mb-5 ${
                    darkMode ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  Share this article on social media
                </p>
                <div className="flex gap-3 mb-15">
                  <img
                    src="/twitter_icon.svg"
                    className="w-15 cursor-pointer"
                  />
                  <img
                    src="/facebook_icon.svg"
                    className="w-15 cursor-pointer"
                  />
                  <img
                    src="/googleplus_icon.svg"
                    className="w-15 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <div>No Data found</div>
      )}
    </>
  );
}

export default Blog;
