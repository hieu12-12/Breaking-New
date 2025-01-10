import { assets } from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-gradient-to-b from-gray-700 via-gray-600 to-gray-500 text-white w-72 h-screen p-6 shadow-2xl">
      {/* Logo Section */}
      <div className="mb-10 flex justify-center">
        <Link href="/">
          <Image
            src={assets.logo}
            alt="Admin Logo"
            width={140}
            height={50}
            className="opacity-90 hover:opacity-100 transition duration-300"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-6">
        <Link href="/admin/addBlog">
          <div className="group flex items-center gap-4 p-4 rounded-lg bg-gray-800 hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer">
            <Image
              src={assets.add_icon}
              alt="Add Blog"
              width={28}
              height={28}
              className="group-hover:scale-110 transition-transform duration-300"
            />
            <span className="font-semibold text-lg group-hover:text-white">Add Blog</span>
          </div>
        </Link>
        <Link href="/admin/blogList">
          <div className="group flex items-center gap-4 p-4 rounded-lg bg-gray-800 hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer">
            <Image
              src={assets.blog_icon}
              alt="Blog List"
              width={28}
              height={28}
              className="group-hover:scale-110 transition-transform duration-300"
            />
            <span className="font-semibold text-lg group-hover:text-white">Blog List</span>
          </div>
        </Link>
        <Link href="/admin/subscriptions">
          <div className="group flex items-center gap-4 p-4 rounded-lg bg-gray-800 hover:bg-purple-600 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer">
            <Image
              src={assets.email_icon}
              alt="Subscriptions"
              width={28}
              height={28}
              className="group-hover:scale-110 transition-transform duration-300"
            />
            <span className="font-semibold text-lg group-hover:text-white">Subscriptions</span>
          </div>
        </Link>
      </nav>

      {/* Decorative Divider */}
      <div className="mt-10 border-t border-gray-400 opacity-50"></div>

      {/* Footer Section */}
      <div className="mt-auto pt-6 text-center">
        <p className="text-sm text-gray-400 tracking-wide">
          © 2025 Breaking News Admin Panel
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
