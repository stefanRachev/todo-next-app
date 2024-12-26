"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

function SocialLogin() {
  const handleLogin = async (provider) => {
    try {
      await signIn(provider, { callbackUrl: "/home" });
    } catch (error) {
      console.error("Social login error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <button
        className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-4 py-2 shadow-md hover:bg-gray-100"
        onClick={() => handleLogin("google")}
      >
        <FcGoogle className="w-5 h-5" />
        <span className="text-gray-700 font-medium">Влез чрез Google</span>
      </button>
      <button
        className="flex items-center space-x-2 bg-black text-white rounded-md px-4 py-2 shadow-md hover:bg-gray-800"
        onClick={() => handleLogin("github")}
      >
        <AiFillGithub className="w-5 h-5" />
        <span className="font-medium">Влез чрез GitHub</span>
      </button>
    </div>
  );
}

export default SocialLogin;
