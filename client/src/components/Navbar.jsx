import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <img
        onClick={() => navigate("/")}
        className="w-45 h-15 cursor-pointer"
        src="/main.png"
        alt="Thoughtnest-logo"
      />
      <button
        onClick={() => navigate("/admin")}
        className="group rounded-full bg-primary text-white flex items-center gap-2 px-6 py-2 cursor-pointer text-base"
      >
        Admin Login{" "}
        <img
          src="/arrow.svg"
          className="group-hover:translate-x-3 transition-all duration-200"
        />
      </button>
    </nav>
  );
}

export default Navbar;
