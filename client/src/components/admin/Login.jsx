import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { useAppContext } from "../../context/AppContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import axios from "axios";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { fetchAdmin } = useAppContext();
  const { theme } = useTheme();
  const darkMode = theme === "dark";
  const navigate = useNavigate();

  const loginRequestHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/admin/login",
        { identifier, password },
        { withCredentials: true }
      );

      if (data.success) {
        await fetchAdmin();
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div
      className={`flex h-screen flex-col md:flex-row ${
        darkMode ? "bg-dark" : "bg-gray-100"
      }`}
    >
      {/* Left Section */}
      <div
        className={`flex flex-1 flex-col justify-center items-center p-6 sm:p-10  ${
          darkMode ? "bg-dark" : "bg-gray-100"
        }`}
      >
        <h1
          className={`text-3xl sm:text-4xl font-bold mb-2 text-center ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          WELCOME BACK
        </h1>
        <p
          className={`mb-8 text-center ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Please enter your details.
        </p>

        <form
          method="POST"
          onSubmit={loginRequestHandler}
          className="w-full max-w-md space-y-4"
        >
          <div>
            <label
              htmlFor="username"
              className={`block mb-2 font-medium ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Username or Email
            </label>
            <input
              name="username"
              type="text"
              id="username"
              placeholder="Enter your username or email"
              autoComplete="username"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className={`w-full p-3 border rounded-lg text-base focus:outline-none focus:ring-offset-0 focus:shadow-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 ${
                darkMode ? "border-gray-500" : "border-gray-300"
              }`}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className={`block mb-2 font-medium ${
                darkMode ? "text-gray-500" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="**********"
                required
                autoComplete="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-3  border rounded-lg text-base focus:outline-none focus:ring-offset-0 focus:shadow-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 ${
                  darkMode ? "border-gray-500" : "border-gray-300"
                }`}
              />
              <img
                onClick={() => setShowPassword((prev) => !prev)}
                src={showPassword ? "eye_show.svg" : "eye_hide.svg"}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer opacity-70 hover:opacity-100 duration-300 transition-all"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{`${error}`}</p>}
          </div>

          <div className="flex justify-end items-center text-sm">
            <a
              href="#"
              className={`hover:underline ${
                darkMode ? "text-gray-400" : "text-black"
              }`}
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-primary/90 text-white p-3 rounded-lg text-lg hover:bg-primary transition cursor-pointer"
          >
            Log in
          </button>
        </form>

        <a
          href="/auth/google"
          className={`flex items-center justify-center gap-2 w-full max-w-md border border-gray-300 p-3 rounded-lg mt-4 transition ${
            darkMode
              ? "bg-gray-300 hover:bg-gray-400 text-gray-900"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          <IconBrandGoogleFilled size={20} /> Login with Google
        </a>

        <div
          className={`text-sm mt-4 ${
            darkMode ? "text-gray-400" : "text-gray-700"
          }`}
        >
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Sign up for free!
          </Link>
        </div>
      </div>

      <div
        className="hidden md:block flex-1 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/login.svg')" }}
      ></div>
    </div>
  );
}

export default Login;
