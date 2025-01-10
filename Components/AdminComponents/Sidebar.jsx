import { assets } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-gradient-to-tl from-gray-800 to-gray-600 p-6 h-screen text-white">
      <div className="mb-8">
        {/* You can add logo or branding here */}
        {/* Optional Space or Logo */}
      </div>
      
      <div className="flex flex-col space-y-6">
        <Link
          href="/admin/addBlog"
          className="flex items-center gap-4 p-4 rounded-lg bg-white text-gray-800 hover:bg-gray-200 transition-all ease-in-out shadow-lg"
        >
          <Image src={assets.add_icon} alt="Add Blog" width={30} height={30} />
          <span className="text-md font-semibold">Add Blog</span>
        </Link>
        <Link
          href="/admin/blogList"
          className="flex items-center gap-4 p-4 rounded-lg bg-white text-gray-800 hover:bg-gray-200 transition-all ease-in-out shadow-lg"
        >
          <Image src={assets.blog_icon} alt="Blog List" width={30} height={30} />
          <span className="text-md font-semibold">Blog List</span>
        </Link>
        <Link
          href="/admin/subscriptions"
          className="flex items-center gap-4 p-4 rounded-lg bg-white text-gray-800 hover:bg-gray-200 transition-all ease-in-out shadow-lg"
        >
          <Image src={assets.email_icon} alt="Subscriptions" width={30} height={30} />
          <span className="text-md font-semibold">Subscriptions</span>
        </Link>
      </div>

      <div className="mt-auto pt-6 text-center">
        {/* Optional Footer or Legal Text */}
        <p className="text-sm">Blogger Admin Panel</p>
      </div>
    </div>
  )
}

export default Sidebar
