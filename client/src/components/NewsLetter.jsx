import { useTheme } from "../context/ThemeContext.jsx";

function NewsLetter() {
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  return (
    <div
      class={`w-full max-w-5xl mx-auto rounded-2xl mb-10 px-2 text-center text-white py-15 flex flex-col items-center justify-center ${
        darkMode ? "bg-slate-800" : "bg-gray-700"
      }`}
    >
      <h1 class="max-w-lg font-semibold text-4xl/[44px] mt-2">
        Never Miss a Blog!
      </h1>
      <p class="text-primary font-medium">
        Subscribe to get the latest blog, new tech, and exclusive news.
      </p>
      <div class="flex items-center justify-center mt-10 border border-slate-600 focus-within:outline focus-within:outline-neutral-900text-sm rounded-full h-14 max-w-md w-full">
        <input
          type="text"
          class="bg-transparent outline-none rounded-full px-4 h-full flex-1"
          placeholder="Enter your email address"
        />
        <button class="bg-primary text-white rounded-full h-11 mr-1 px-8 flex items-center justify-center">
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default NewsLetter;
