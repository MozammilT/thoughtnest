import { useRef } from "react";
import BlogCount from "./BlogCount";
import HeaderPara from "./HeaderPara";
import Heading from "./Heading";
import { useAppContext } from "../context/AppContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

function Header() {
  const { setInputs, inputs } = useAppContext();
  const inputRef = useRef();
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  const submitHandler = async (e) => {
    e.preventDefault();
    setInputs(inputRef.current.value);
  };

  const clearSearch = async () => {
    setInputs("");
    inputRef.current.value = "";
  };

  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8 items-center justify-center">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 bg-primary/10 rounded-full text-primary border border-primary/50 text-sm">
          <p>New: AI Feature Integrated</p>
          <img src="/star_icon.svg" className="w-2.5" />
        </div>
        <Heading />
        <HeaderPara />
        <BlogCount />
      </div>

      <form
        onSubmit={submitHandler}
        className={`flex mx-auto items-center border pl-4 gap-2 border-gray-500/30 h-[46px] rounded-full overflow-hidden max-w-md max-sm:max-w-xs w-full ${
          darkMode ? "bg-gray-200" : "bg-white"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="#6B7280"
        >
          <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
        </svg>
        <input
          required
          type="text"
          ref={inputRef}
          placeholder="Search for blogs"
          className={`w-full h-full outline-none text-sm  ${
            darkMode ? "text-gray-950" : "text-gray-500"
          }`}
        />
        <button
          type="submit"
          className="bg-primary w-32 h-9 rounded-full text-sm text-white mr-[5px] cursor-pointer"
        >
          Search
        </button>
      </form>
      <div className="text-center mt-5">
        {inputs && (
          <button
            onClick={clearSearch}
            className={`border border-gray-400 font-light text-sm py-0.5 px-3 rounded-sm shadow-custom-sm cursor-pointer ${
              darkMode ? "text-gray-200" : "text-gray-600"
            }`}
          >
            Clear
          </button>
        )}
      </div>

      <img
        src="gradientBackground.png"
        className="absolute -top-50 z-1 opacity-100 max-sm:-top-20 max-sm:w-[600px] max-sm:h-[450px]"
      />
    </div>
  );
}

export default Header;
