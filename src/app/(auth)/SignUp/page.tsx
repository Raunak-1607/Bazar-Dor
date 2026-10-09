"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import google from "@/app/assets/Google.avif";
import Image from "next/image";
import github from "@/app/assets/25231.png";
import Link from "next/link";

const SignUpPage = () => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries());
    const password = user.password as string;

    if (password.length < 8) {
      setError(
        "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে। (Password must be at least 8 characters)",
      );
      return;
    }

    if (user.password !== user.confirmPassword) {
      setError("পাসওয়ার্ড দুটি মিলছে না।");
      return;
    }

    setError(null);
    // console.log(user);

    const { data: resData, error } = await authClient.signUp.email({
      name: user.name as string,
      email: user.email as string,
      password: user.password as string,
      callbackURL: "/",
    });

    console.log(resData, error);
  };

  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };
  const handleGithubSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
    });
  };

  return (
    <div className="min-h-screen bg-[#f1f5f2] flex flex-col items-center justify-center p-4 font-sans">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-gray-500">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="bg-white w-full max-w-md rounded-2xl p-8 border border-gray-100">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div>
            <label
              className="block text-gray-800 font-semibold mb-2"
              htmlFor="name"
            >
              নাম
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors text-gray-700"
              placeholder="যেমন: রহিম উদ্দিন"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              className="block text-gray-800 font-semibold mb-2"
              htmlFor="email"
            >
              ইমেইল
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors text-gray-700"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              className="block text-gray-800 font-semibold mb-2"
              htmlFor="password"
            >
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors text-gray-700"
              placeholder="কমপক্ষে ৮ অক্ষর"
              required
              minLength={8}
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              className="block text-gray-800 font-semibold mb-2"
              htmlFor="confirmPassword"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors text-gray-700"
              placeholder="আবার লিখুন"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#118c42] hover:bg-[#0e7537] text-white text-lg font-medium py-3 rounded-lg transition-colors mt-4 shadow-sm"
          >
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center mt-8 mb-2">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="px-4 text-gray-500 text-sm">অথবা</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-2 rounded-xl border border-[#DFE8E0] bg-[#FAFCFA] px-2 py-3 text-sm font-semibold text-[#26352B] transition-all duration-200 hover:bg-white hover:shadow-sm"
          >
            <Image
              src={google}
              alt="Google logo"
              width={17}
              height={17}
              className="shrink-0 object-contain"
            />
            <span className="whitespace-nowrap">Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            onClick={handleGithubSignIn}
            className="flex items-center justify-center gap-2 rounded-xl border border-[#DFE8E0] bg-[#FAFCFA] px-2 py-3 text-sm font-semibold text-[#26352B] transition-all duration-200 hover:bg-white hover:shadow-sm"
          >
            <Image
              src={github}
              alt="GitHub logo"
              width={17}
              height={17}
              className="shrink-0 object-contain"
            />
            <span className="whitespace-nowrap">GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/SignIn"
            className="font-semibold text-green-700 hover:text-green-800 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <Link href="/">
        <p className="mt-9 text-[15px]  text-gray-500">← হোম পেজে ফিরে যান</p>
      </Link>
    </div>
  );
};

export default SignUpPage;
