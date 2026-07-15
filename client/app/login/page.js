"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/auth";


export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [auth, setAuth, { login }] = useAuth();

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        user,
      );

      if (res.data.success) {
        // Use auth context login function
        login(res.data.user);
        toast.success(res.data.message || "Login successful");
        setUser({ email: "", password: "" });

      } else {
        toast.error(res.data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);

      // Handle axios error response
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.error ||
            error.response.data.message ||
            "Login failed",
        );
      } else {
        toast.error("Error in login. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0A0D12] relative overflow-hidden">
   
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-105 w-180 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="w-full max-w-md relative">
        {/* Editor window */}
        <div className="bg-[#0D1117] text-[#E6EDF3] rounded-xl border border-[#1F2733] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] overflow-hidden">

          {/* Tab bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#1F2733] bg-[#0B0E14]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#F85149]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#E3B341]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#3FB950]/70" />
              </div>
              <span className="font-mono text-xs text-[#7D8590] tracking-tight">
                auth/login.tsx
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="flex">

            {/* Content */}
            <div className="flex-1 px-6 sm:px-8 py-8">
              <p className="text-xl font-semibold tracking-tight mb-1">
                Log in to your account
              </p>
              <p className="font-mono text-xs text-[#3FB950]/80 mb-6">
                {"// authenticate to continue"}
              </p>

              <form onSubmit={onLogin} className="space-y-4">
                <div className="group relative border-l-2 border-transparent focus-within:border-[#3FB950] transition-colors duration-200 pl-3 -ml-3">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    required
                    value={user.email}
                    onChange={(e) =>
                      setUser((user) => ({ ...user, email: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-lg border border-[#1F2733] bg-[#0B0E14] text-sm text-[#E6EDF3] placeholder:text-[#4B5563] focus:outline-none focus:border-[#3FB950]/60 focus:ring-2 focus:ring-[#3FB950]/10 transition-all duration-200"
                  />
                </div>

                <div className="group relative border-l-2 border-transparent focus-within:border-[#3FB950] transition-colors duration-200 pl-3 -ml-3">
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    required
                    value={user.password}
                    onChange={(e) =>
                      setUser((user) => ({
                        ...user,
                        password: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-lg border border-[#1F2733] bg-[#0B0E14] text-sm text-[#E6EDF3] placeholder:text-[#4B5563] focus:outline-none focus:border-[#3FB950]/60 focus:ring-2 focus:ring-[#3FB950]/10 transition-all duration-200"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-linear-to-r from-[#6E7AFF] to-[#5B63E8] text-white font-mono text-sm font-medium tracking-wide hover:shadow-[0_0_0_1px_rgba(110,122,255,0.4),0_8px_24px_-8px_rgba(110,122,255,0.5)] hover:brightness-110 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Logging In...
                    </div>
                  ) : (
                    <span>{"> Log In"}</span>
                  )}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 pt-4 mt-2 border-t border-[#1F2733]">
                  <span className="font-mono text-xs text-[#7D8590] whitespace-nowrap pt-4">
                    <span className="text-[#4B5563]">{"// "}</span>
                    Already have an account?{" "}
                    <Link
                      href="/signup"
                      className="text-[#3FB950] hover:text-[#56D364] underline underline-offset-4 decoration-[#3FB950]/30 transition-colors duration-150"
                    >
                      Sign Up
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}