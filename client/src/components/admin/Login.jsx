import { useState } from "react";
import { Link } from "react-router-dom";
import { IconBrandGoogleFilled } from "@tabler/icons-react";

function Login({ errorMessage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex h-screen flex-col md:flex-row bg-gray-100">
      {/* Left Section */}
      <div className="flex flex-1 flex-col justify-center items-center p-6 sm:p-10 bg-gray-100">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-800 text-center">
          WELCOME BACK
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Please enter your details.
        </p>

        <form
          action="/login"
          method="POST"
          className="w-full max-w-md space-y-4"
        >
          <div>
            <label
              htmlFor="username"
              className="block mb-2 font-medium text-gray-700"
            >
              Username
            </label>
            <input
              name="username"
              type="text"
              id="username"
              placeholder="Enter your username"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 font-medium text-gray-700"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              placeholder="**********"
              required
              autoComplete
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="text-black hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-primary/90 text-white p-3 rounded-lg text-lg hover:bg-primary transition"
          >
            Log in
          </button>
        </form>

        <a
          href="/auth/google"
          className="flex items-center justify-center gap-2 w-full max-w-md border border-gray-300 p-3 rounded-lg mt-4 hover:bg-gray-300 text-gray-700 transition"
        >
          <IconBrandGoogleFilled size={20} /> Login with Google
        </a>

        <div className="text-sm mt-4 text-gray-700">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Sign up for free!
          </Link>
        </div>
      </div>

      {/* Right Section - Hidden on small devices */}
      <div
        className="hidden md:block flex-1 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/login.svg')" }}
      ></div>
    </div>
  );
}

export default Login;
