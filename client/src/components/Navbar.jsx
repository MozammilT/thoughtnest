import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { Menu, X } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler.jsx";

function Navbar() {
  const navigate = useNavigate();
  const { admin } = useAppContext();
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === "dark";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full flex items-center justify-between px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-5 bg-transparent">
      <img
        onClick={() => navigate("/")}
        className="w-36 sm:w-44 h-auto cursor-pointer"
        src={darkMode ? "/logo_dark1.png" : "/main.png"}
        alt="Thoughtnest-logo"
      />

      {/* Hamburger Menu Button (Mobile) */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Right Menu Items */}
      <div
        className={`${menuOpen ? "flex" : "hidden"} ${
          darkMode ? "bg-[#030712]/90 md:bg-transparent" : "bg-white"
        } absolute md:static top-20 right-4 md:flex md:flex-row flex-col md:bg-transparent md:items-center md:gap-6 rounded-lg p-4 md:p-0 z-50 shadow-md md:shadow-none`}
      >
        <AnimatedThemeToggler
          className={`text-sm px-4 py-2 rounded-full mb-2 md:mb-0 cursor-pointer ${
            darkMode ? "bg-gray-800" : "bg-gray-200"
          }`}
        />

        <button
          onClick={() => (admin ? navigate("/dashboard") : navigate("/login"))}
          className="group rounded-full bg-primary text-white flex items-center gap-2 px-6 py-2 text-base cursor-pointer"
        >
          {admin ? "Dashboard" : "Admin Login"}
          <img
            src="/arrow.svg"
            className="group-hover:translate-x-3 transition-all duration-200"
          />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
