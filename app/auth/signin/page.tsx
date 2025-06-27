"use client";
import { signIn } from "next-auth/react";

export default function SigninPage() {
  const handleGoogle = () => {
    signIn("google", { callbackUrl: "/home" });
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%), 
                           url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-red-900/20 animate-pulse" />

      <div className="relative z-10 p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">🎬</span>
          </div>
          <h1 className="text-2xl font-bold text-white">WatchPro</h1>
        </div>
      </div>

      <div className="relative z-10 flex mt-24 items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-black/75 backdrop-blur-md p-8 md:p-12 rounded-lg shadow-2xl border border-gray-800">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
                Welcome Back
              </h2>
              <p className="text-gray-300 text-lg">
                Sign in to continue your cinematic journey
              </p>
            </div>

            <button
              onClick={handleGoogle}
              className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-2 px-3 md:py-4 md:px-6 rounded-lg cursor-pointer shadow-lg flex items-center justify-center space-x-3 mb-6"
            >
              <div className="w-5 h-5">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>
              <span className="text-lg">Continue with Google</span>
            </button>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              This page is protected by reCAPTCHA and the Google{" "}
              <a href="#" className="text-blue-400 hover:underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-400 hover:underline">
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
