
"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaChevronDown, FaUser, FaSignOutAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const AuthInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error(error.message || "সাইন আউট করতে সমস্যা হয়েছে!");
    } else {
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
    }
    setIsOpen(false);
  };

  const handleProfile =()=>{
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative">
      {user ? (
        <div>
          {/* Profile button */}
          <button
            onClick={handleProfile}
            className="flex items-center gap-3 rounded-full px-3 py-2 transition hover:bg-gray-100"
          >
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-700">
                <FaUser />
              </div>
            )}

            <span className="text-sm font-medium text-gray-800">
              {user.name}
            </span>

            <FaChevronDown
              className={`text-xs text-gray-500 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown menu */}
          {isOpen && (
            <div className="absolute right-0 top-full z-50 mt-3 w-64 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">
              {/* User information */}
              <div className="border-b border-gray-100 pb-3">
                <p className="font-semibold text-gray-800">
                  {user.name}
                </p>
                <p className="mt-1 break-all text-sm text-gray-500">
                  {user.email}
                </p>
              </div>

              {/* Profile link */}
              <Link
                href="/Profile"
                onClick={() => setIsOpen(false)}
                className="mt-2 flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaUser className="text-blue-500" />
                আমার প্রোফাইল
              </Link>

              {/* Sign out */}
              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                <FaSignOutAlt />
                সাইন আউট
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            href="/SignIn"
            className="rounded-lg px-4 py-2 font-bold"
          >
            সাইন ইন
          </Link>

          <Link
            href="/SignUp"
            className="rounded-lg bg-green-600 px-4 py-2 font-bold text-white transition hover:bg-green-800"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthInfo;
