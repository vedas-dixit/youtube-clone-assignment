"use client";

import { signOut, useSession, signIn } from "next-auth/react";
import {
  FaYoutube,
  FaSearch,
  FaHome,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { BsGrid } from "react-icons/bs";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-black fixed shadow-md p-4 flex items-center justify-between w-full">
      <div className="flex items-center space-x-4">
        <FaYoutube size={30} className="text-red-600 cursor-pointer" />
        <span className="font-bold text-2xl text-gray-700">YouTube</span>
      </div>

      <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-full w-1/3 max-w-2xl">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-transparent outline-none placeholder-gray-500 text-gray-700"
        />
        <FaSearch size={20} className="text-gray-500 cursor-pointer" />
      </div>

      <div className="flex items-center space-x-6">
        <FaHome size={24} className="text-gray-700 cursor-pointer" />
        <HiOutlineVideoCamera
          size={24}
          className="text-gray-700 cursor-pointer"
        />
        <FaBell size={24} className="text-gray-700 cursor-pointer" />

        {session ? (
          <div className="flex items-center space-x-3">
            <FaUserCircle size={30} className="text-gray-700 cursor-pointer" />
            <span className="text-gray-700">{session.user?.name}</span>
            <button
              onClick={() => signOut()}
              className="text-red-600 hover:text-red-800"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="text-blue-600 hover:text-blue-800"
          >
            Sign In
          </button>
        )}

        <BsGrid size={24} className="text-gray-700 cursor-pointer" />
      </div>
    </nav>
  );
}
