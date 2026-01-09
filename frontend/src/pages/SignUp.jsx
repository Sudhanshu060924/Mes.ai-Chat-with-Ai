import React from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {

    const navigate = useNavigate();
  return (
    <div className="bg-slate-600 w-full h-screen flex justify-center items-center">
      <div className="w-[60vh]  h-[70vh] bg-gray-300 rounded-lg gap-10 flex flex-col justify-start items-center ">
        <div className="bg-gray-100 w-full h-[25%] rounded-b-[30%] rounded-t-lg">
          <h1 className=" text-2xl text-black-400/60 font-semibold text-center pt-10 ">
            Welcome to Mes.ai | Chat with Ai
          </h1>
        </div>
        <form className="w-full max-w-sm mx-auto p-6  rounded-lg shadow-md space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-300 text-black px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Sign Up
          </button>
        </form>

        <p onClick={()=>{navigate('/login')}}
         className="pb-5 cursor-pointer ">
          Already Have an account ?{" "}
          <span className="text-blue-500 cursor-pointer">Login</span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
