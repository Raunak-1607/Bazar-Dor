"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import React from "react";
import { FaChevronDown, FaUser, FaSignOutAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error(error.message || "সাইন আউট করতে সমস্যা হয়েছে!");
    } else {
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
    }
  };

  const handleUpdate = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    // console.log(user);
    const { data, error } = await authClient.updateUser({
        ...user
    });
    
    if (error) {
      toast.error(error.message || "তথ্য আপডেট করতে সমস্যা হয়েছে!");
    } else {
      toast.success("সফলভাবে তথ্য আপডেট হয়েছে!");
    }
  }

  return (
    <div className="mx-auto mt-25 w-full max-w-3xl px-4">
      {/* Profile heading */}
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-gray-400">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* Profile card */}
      <section className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex min-w-0 items-center gap-3">
          {user?.image ? (
            <Image
              src={user.image}
              height={60}
              width={60}
              alt="Profile picture"
              className="h-16 w-16 shrink-0 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-green-100 text-3xl text-green-700">
              <FaUser />
            </div>
          )}

          <div className="flex min-w-0 flex-col">
            <span className="truncate font-bold text-gray-800">
              {user?.name}
            </span>
            <span className="truncate text-sm text-gray-500">
              {user?.email}
            </span>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="flex shrink-0 items-center gap-2 rounded-lg border border-red-400 px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
        >
          <FaSignOutAlt />
          সাইন আউট
        </button>
      </section>
       
       {/* update user name*/}
      <section className="mt-7 border border-gray-200 bg-white  rounded-2xl  shadow-sm p-4">
         <p className="font-bold text-[20px]">তথ্য</p>

         <div className="p-6 ">
            <form className="space-y-4" onSubmit={handleUpdate}>
          {/* Name Field */}
          <div>
            <label
              className="block text-gray-800 font-medium mb-2"
              htmlFor="name"
            >
              নাম 
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={user?.name || ""}
              className="w-full px-3 py-2.5 border border-[#DFE8E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors text-gray-700 bg-transparent"
              placeholder="আপনার নাম"
              required
            />
          </div>

          

          

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#078A43] hover:bg-[#067A3C] text-white text-base font-semibold py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 mt-2"
          >
            আপডেট 
          </button>
        </form>

         </div>

      </section>
    </div>
  );
};

export default ProfilePage;
