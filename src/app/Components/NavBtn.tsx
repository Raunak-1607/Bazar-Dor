"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";

const AuthInfo = () => {
  const { data: Session } = authClient.useSession();
  const user = Session?.user;
  // console.log(user);

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div className="flex gap-3">
      {user ? (
        <div className="flex gap-3 items-center">
          <h1>{`Welcome ${user.name}`}</h1>
          <button
            onClick={handleSignOut}
            className="btn bg-red-700 text-white rounded-1xl"
          >
            সাইন আউট
          </button>
        </div>
      ) : (
        <div className="flex gap-3 items-center">
          <Link href="../SignIn">
            <button className="btn font-bold py-4  rounded-box">সাইন ইন</button>
          </Link>

          <Link href="../SignUp">
            <button className="btn font-bold bg-green-600 hover:bg-green-800 text-white py-4 rounded-box">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthInfo;
