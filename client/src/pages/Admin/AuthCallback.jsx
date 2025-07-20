import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext.jsx";
import Loading from "@/components/Loading.jsx";

function AuthCallback() {
  const { fetchAdmin } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    const verifySession = async () => {
      await fetchAdmin();
      navigate("/dashboard");
    };
    verifySession();
  }, []);

  return <Loading />;
}

export default AuthCallback;
