

"use client";

import { signIn } from "next-auth/react";

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
        className="bg-pink-400 text-white p-3 rounded-md text-lg"
        onClick={() => handleLogin("google")}
      >
        Влез чрез Google
      </button>
      <button
        className="bg-black text-white p-3 rounded-md text-lg"
        onClick={() => handleLogin("github")}
      >
        Влез чрез Github
      </button>
    </div>
  );
}

export default SocialLogin;

