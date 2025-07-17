import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useAppContext } from "../../context/AppContext.jsx";
import { Menu, X } from "lucide-react";
import { toast } from "react-hot-toast";

function AdminNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { axios } = useAppContext();
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === "dark";
  const navigate = useNavigate();

  const logoutHandler = async (req, res) => {
    try {
      const { data } = await axios.get("/api/admin/logout");
      if (data.success) {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };
  return (
    <nav className="flex justify-between items-center py-2 mx-8 sm:mx-20 xl:mx-30">
      <img
        onClick={() => navigate("/")}
        className="w-45 h-15 cursor-pointer"
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
        <button
          onClick={() => {
            setMenuOpen(!menuOpen);
            toggleTheme();
          }}
          className="text-sm px-4 py-2 rounded-full text-black dark:text-white bg-gray-200 dark:bg-gray-700 mb-2 md:mb-0"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <button
          onClick={logoutHandler}
          className="group rounded-full bg-primary text-white flex items-center gap-2 px-6 py-2 text-base"
        >
          Logout
          <img
            src="/arrow.svg"
            className="group-hover:translate-x-3 transition-all duration-200"
          />
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;
