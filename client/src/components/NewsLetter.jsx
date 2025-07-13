import { useTheme } from "../context/ThemeContext.jsx";

function NewsLetter() {
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 my-32">
      <h1
        className={`md:text-4xl text-2xl font-semibold ${
          darkMode ? "text-gray-300" : "text-gray-800"
        }`}
      >
        Never Miss a Blog!
      </h1>
      <p
        className={`md:text-lg pb-8 text-lg ${
          darkMode ? "text-gray-300/70" : "text-gray-700/70"
        }`}
      >
        Subscribe to get the latest blog, new tech, and exclusive news.
      </p>

      {/* Outer container with rounded corners and bg */}
      <form
        className={`flex items-center max-w-xl w-full overflow-hidden rounded-lg shadow-xs ${
          darkMode ? "bg-[#cfd2d6]" : "bg-white border border-gray-300"
        }`}
      >
        <input
          required
          type="text"
          placeholder="Enter your email id"
          className={`h-full w-full px-4 py-3 outline-none text-sm ${
            darkMode
              ? "bg-[#cfd2d6] text-gray-800 placeholder-gray-600"
              : "bg-white text-gray-800 placeholder-gray-400"
          }`}
        />
        <button
          type="submit"
          className="md:px-10 px-6 py-3 bg-yellow-400 text-white font-semibold text-sm"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default NewsLetter;
