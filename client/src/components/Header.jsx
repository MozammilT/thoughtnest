import HeaderPara from "./HeaderPara";
import Heading from "./Heading";

function Header() {
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8 items-center justify-center">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 bg-primary/10 rounded-full text-primary border border-primary/50 text-sm">
          <p>New: AI Feature Integrated</p>
          <img src="/star_icon.svg" className="w-2.5" />
        </div>
        <Heading />
        <HeaderPara />
      </div>

      <form className="flex mx-auto items-center border pl-4 gap-2 bg-white border-gray-500/30 h-[46px] rounded-full overflow-hidden max-w-md w-full">
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
          placeholder="Search for blogs"
          className="w-full h-full outline-none text-sm text-gray-500"
        />
        <button
          type="submit"
          className="bg-primary w-32 h-9 rounded-full text-sm text-white mr-[5px] cursor-pointer"
        >
          Search
        </button>
      </form>

      <img
        src="gradientBackground.png"
        className="absolute -top-50 -z-1 opacity-100"
      />
    </div>
  );
}

export default Header;
