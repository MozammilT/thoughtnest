import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { useTheme } from "../../context/ThemeContext.jsx";
import axios from "axios";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();
  const darkMode = theme === "dark";
  const navigate = useNavigate();

  const registerRequestHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/admin/register",
        { username, email, password }
      );

      if (data.success) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className={`flex h-screen ${darkMode ? "bg-dark" : "bg-gray-100"}`}>
      <div
        className={`flex flex-1 flex-col justify-center items-center p-10 ${
          darkMode ? "bg-dark" : "bg-gray-100"
        }`}
      >
        <h1
          className={`text-4xl font-bold mb-2 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          WELCOME to <span className="text-primary">ThoughtNest</span>
        </h1>
        <p
          className={`mb-8 text-lg ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Start your Journey with us
        </p>

        <form
          onSubmit={registerRequestHandler}
          method="post"
          className="w-full max-w-sm space-y-5"
        >
          <div>
            <label
              htmlFor="username"
              className={`block mb-2 font-semibold ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Username
            </label>
            <input
              required
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className={`w-full p-3 border rounded-lg text-base focus:outline-none focus:ring-offset-0 focus:shadow-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 ${
                darkMode ? "border-gray-500" : "border-gray-300"
              }`}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className={`block mb-2 font-semibold ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 border rounded-lg text-base focus:outline-none focus:ring-offset-0 focus:shadow-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 ${
                darkMode ? "border-gray-500" : "border-gray-300"
              }`}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className={`block mb-2 font-semibold  ${
                darkMode ? "text-gray-400" : "text-gray-700"
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
                className={`w-full p-3 border rounded-lg text-base focus:outline-none focus:ring-offset-0 focus:shadow-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 ${
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
            className="w-full bg-primary/90 text-white p-3 rounded-lg text-base hover:bg-primary"
          >
            Sign up
          </button>
        </form>

        <a
          href="/auth/google"
          className={`flex items-center justify-center gap-3 w-full max-w-sm border border-gray-300 rounded-lg p-3 mt-4 text-base ${
            darkMode
              ? "bg-gray-300 hover:bg-gray-400 text-gray-900"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          <IconBrandGoogleFilled size={20} />
          Sign up with Google
        </a>

        <div
          className={`text-sm mt-4 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Already have an account?
          <Link to="/login" className="text-primary hover:underline">
            Login here
          </Link>
        </div>
      </div>

      <div
        className="hidden md:block flex-1 bg-no-repeat bg-contain bg-center"
        style={{ backgroundImage: "url('/register.svg')" }}
      ></div>
    </div>
  );
}

export default SignUp;
