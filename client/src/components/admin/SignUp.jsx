import { Link } from "react-router-dom";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const naviagte = useNavigate();
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-1 flex-col justify-center items-center p-10 bg-gray-100">
        <h1 className="text-4xl font-bold mb-2 text-gray-700">
          WELCOME to <span className="text-primary">ThoughtNest</span>
        </h1>
        <p className="text-gray-600 mb-8 text-lg">Start your Journey with us</p>

        <form
          action="/register"
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
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              required
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
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              required
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
              type="password"
              name="password"
              id="password"
              autoComplete="true"
              placeholder="**********"
              required
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
