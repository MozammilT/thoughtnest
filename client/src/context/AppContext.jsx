import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { createContext, useContext, useState, useEffect } from "react";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchAdmin = async () => {
    try {
      setLoading(true);
      console.log("Fetching user details...");

      const { data } = await axios.get("/api/admin");
      if (data.success) {
        console.log("User is authenticated:", data.admin);
        setAdmin(true);
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

  useEffect(() => {
    fetchAdmin();
  }, [location.pathname]);

  const value = {
    admin,
    navigate,
    fetchAdmin,
    loading,
    axios,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
