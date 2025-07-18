import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [admin, setAdmin] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [inputs, setInputs] = useState("");

  const fetchAdmin = async () => {
    try {
      setLoading(true);
      console.log("Fetching user details...");

      const { data } = await axios.get("/api/admin");
      if (data.success) {
        console.log("User is authenticated:", data.admin);
        setAdmin(true);
        setUsername(data.admin.username); 
        console.log(data.admin.username);
      } else {
        console.log("User not authenticated");
        setAdmin(false);
      }
    } catch (err) {
      console.log(
        "Auth check failed:",
        err.response?.data?.message || err.message
      );
      setAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      data.success ? setBlogs(data.blogData) : toast.error(data.message);
    } catch (err) {
      toast.error(err.message, {
        position: "bottom-right",
        style: {
          borderRadius: "50px",
          background: "#595959",
          color: "#fff",
        },
      });
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, [location.pathname]);

  useEffect(() => {
    fetchBlogs();
  }, [location.pathname]);

  const value = {
    admin,
    navigate,
    fetchAdmin,
    loading,
    axios,
    blogs,
    setBlogs,
    inputs,
    setInputs,
    fetchBlogs,
    username,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
