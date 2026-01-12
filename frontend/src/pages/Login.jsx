import { BiShow } from "react-icons/bi";
import { useState } from "react";
import { BiHide } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerURL } from "../main";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/UserSlice";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        `${ServerURL}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
      setEmail("");
      setPassword("");
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log("Error during login:", error);
      setLoading(false);
      setError(
        error.response?.data?.message || "An error occurred during login."
      );
    }
  };
  return (
    <div className="bg-slate-600 w-full h-screen flex justify-center items-center">
      <div className="w-[60vh]  h-[70vh] bg-gray-300 rounded-lg gap-10 flex flex-col justify-start items-center ">
        <div className="bg-gray-100 w-full h-[25%] rounded-b-[30%] rounded-t-lg">
          <h1 className=" text-2xl text-black-400/60 font-semibold text-center pt-10 ">
            Login to Mes.ai | Chat with Ai
          </h1>
        </div>
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm mx-auto p-6  rounded-lg shadow-md space-y-4"
        >
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            value={email}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="overflow-hidden rounded-md relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              className="absolute text-black top-3 right-3 text-xl cursor-pointer"
            >
              {showPassword ? <BiHide /> : <BiShow />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-300 text-black px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && (
            <p className="text-red-500 text-center text-sm mt-2">{error}</p>
          )}
        </form>

        <p
          onClick={() => {
            navigate("/signup");
          }}
          className="pb-5 cursor-pointer "
        >
          New User ?{" "}
          <span className="text-blue-500 cursor-pointer">Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
