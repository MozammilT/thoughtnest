import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import axios from "axios";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      alert(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-1 flex-col justify-center items-center p-10 bg-gray-100">
        <h1 className="text-4xl font-bold mb-2 text-gray-700">
          WELCOME to <span className="text-primary">ThoughtNest</span>
        </h1>
        <p className="text-gray-600 mb-8 text-lg">Start your Journey with us</p>

        <form
          onSubmit={registerRequestHandler}
          method="post"
          className="w-full max-w-sm space-y-5"
        >
          <div>
            <label
              htmlFor="username"
              className="block mb-2 font-semibold text-gray-700"
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
              className="w-full p-3 border border-gray-300 rounded-lg text-base"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-gray-700"
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
              className="w-full p-3 border border-gray-300 rounded-lg text-base"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              required
              type="password"
              name="password"
              id="password"
              autoComplete="true"
              value={password}
              placeholder="**********"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-base"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#" className="text-black">
              Forgot password
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
          className="flex items-center justify-center gap-3 w-full max-w-sm border border-gray-300 rounded-lg p-3 mt-4 bg-white text-gray-700 text-base"
        >
          <IconBrandGoogleFilled size={20} />
          Sign up with Google
        </a>

        <p className="text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login here
          </Link>
        </p>
      </div>

      <div
        className="hidden md:block flex-1 bg-no-repeat bg-contain bg-center"
        style={{ backgroundImage: "url('/register.svg')" }}
      ></div>
    </div>
  );
}

export default SignUp;
