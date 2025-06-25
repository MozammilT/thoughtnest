import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { blog_data, comments_data } from "../constants/assets.js";
import moment from "moment";
import Loading from "../components/Loading.jsx";
import Footer from "../components/Footer.jsx";

function Blog() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      const blogData = blog_data.find((item) => item._id === id);
      setData(blogData);
    } catch (err) {
      cinsole.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    setComments(comments_data);
  };

  const commentHandler = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : data ? (
        <>
          <div className="relative">
            <img
              src="/gradientBackground.png"
              className="absolute -top-50 -z-10 opacity-50"
            />
            <div className="text-center mt-20">
              <p className="text-primary font-medium my-5">
                Published on {moment(data.createdAt).format("MMMM Do YYYY")}
              </p>
              <h1 className="text-gray-600 text-2xl sm:text-5xl font-semibold max-w-2xl my-5 mx-auto">
                {data.title}
              </h1>
              <p className="text-gray-600 text-xl my-5 truncate max-w-lg mx-auto">
                {data.subTitle}
              </p>
              <span className="text-primary inline-block bg-primary/10 rounded-full px-4 py-1.5 border my-4 text-sm">
                Mozammil Tarique
              </span>
            </div>
            <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
              <img
                src={data.image}
                className="rounded-3xl mb-10 w-full h-auto max-h-[450px] object-cover"
              />
              <div
                className="rich-text max-w-3xl mx-auto"
                dangerouslySetInnerHTML={{ __html: data.description }}
              ></div>

              <div className="mt-14 mb-10 max-w-3xl mx-auto">
                <p className="text-black font-semibold text-lg mb-5">{`Comments (${comments.length})`}</p>
                <div className="flex flex-col gap-4">
                  {comments.map((comment, index) => (
                    <div
                      key={index}
                      className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
                    >
                      <div className="flex items-center mb-2 gap-3">
                        <img src="/user_icon.svg" className="w-8" />
                        <p className="font-medium">{comment.name}</p>
                      </div>
                      <p className="text-sm max-w-md ml-8">{comment.name}</p>
                      <div className="absolute right-4 bottom-3 text-sm flex items-center gap-2">
                        {moment(comment.createdAt).fromNow()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <p className="text-black font-semibold text-lg mb-5">
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
                  className="w-full p-2 border border-gray-300 rounded outline-none mb-5"
                />
                <textarea
                  required
                  value={content}
                  placeholder="Comment"
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded outline-none h-48"
                />

                <button
                  type="submit"
                  className="bg-primary/90 text-white text-xl px-4 py-2 rounded-lg cursor-pointer hover:scale-105 transition-all duration-200 mb-15"
                >
                  Submit
                </button>
              </form>

              <div>
                <p className="text-gray-700 font-medium text-lg mb-5">
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
