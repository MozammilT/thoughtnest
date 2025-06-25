import { useNavigate } from "react-router-dom";

function BlogCard({ blog }) {
  const { title, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative aspect-video rounded-lg overflow-hidden shadow hover:scale-105 hover:shadow-primary/40 duration-300 cursor-pointer"
    >
      {/* Gradient overlay only on bottom half */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black/90 pointer-events-none" />

      {/* Category Badge with subtle shadow */}
      <span className="absolute top-4 left-4 px-3 py-1 inline-block bg-primary/80 text-white rounded-full text-xs shadow-md">
        {category}
      </span>

      {/* Title with better spacing */}
      <p className="absolute bottom-4 left-4 right-4 z-10 text-white text-base font-normal tracking-wide leading-snug">
        {title}
      </p>
    </div>
  );
}

export default BlogCard;
