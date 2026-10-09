"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";

const SignInPage = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email as string,
      password: user.password as string,
      callbackURL: "/",
    });
  };
  return (
    <div className="min-h-screen bg-[#f1f5f2] flex flex-col items-center justify-center p-4 font-sans">
      {/* Header */}
      <div className="text-center mb-7">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-gray-500">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-[#FAFCFA] w-full max-w-md rounded-2xl p-6 border border-[#DFE8E0] shadow-sm">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label
              className="block text-gray-800 font-medium mb-2"
              htmlFor="email"
            >
              ইমেইল
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2.5 border border-[#DFE8E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors text-gray-700 bg-transparent"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              className="block text-gray-800 font-medium mb-2"
              htmlFor="password"
            >
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2.5 border border-[#DFE8E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors text-gray-700 bg-transparent"
              placeholder="কমপক্ষে ৮ অক্ষর"
              required
              minLength={8}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#078A43] hover:bg-[#067A3C] text-white text-base font-semibold py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 mt-2"
          >
            সাইন ইন
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 mt-6 mb-2">
          <div className="flex-1 border-t border-gray-200" />
          <span className="text-gray-500 text-sm">অথবা</span>
          <div className="flex-1 border-t border-gray-200" />
        </div>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-semibold text-green-700 hover:text-green-800 hover:underline"
          >
             সাইন আপ করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
