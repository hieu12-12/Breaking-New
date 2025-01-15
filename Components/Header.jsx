import { assets } from '@/Assets/assets';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link'; // Import Link from Next.js

const Header = () => {

  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post('/api/email', formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail("");
    } else {
      toast.error("Error");
    }
  };

  return (
    <div className="py-8 px-6 md:px-16 lg:px-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
      <div className="flex justify-end items-center">
        {/* Update the Link to point to the correct route */}
        <Link href="/admin/addBlog">
          <button className="flex items-center gap-3 font-semibold py-3 px-6 border border-transparent bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-full shadow-lg hover:from-teal-700 hover:to-teal-500 transition duration-300">
            Admin Panel <Image src={assets.arrow} alt="Arrow" />
          </button>
        </Link>
      </div>
      <div className="text-center mt-16">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Breaking News
        </h1>
        <p className="mt-6 text-sm sm:text-base max-w-[740px] mx-auto text-gray-100 leading-relaxed">
        Top Stories You Cant Miss This Week
        </p>
        <form onSubmit={onSubmitHandler} className="flex justify-between items-center max-w-[500px] sm:max-w-[600px] mx-auto mt-10 bg-white bg-opacity-80 rounded-xl shadow-2xl">
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            type="email" 
            placeholder="Enter your email" 
            className="pl-4 py-3 outline-none w-full text-gray-800 rounded-l-xl focus:ring-2 focus:ring-teal-400 transition duration-300"
            required 
          />
          <button 
            type="submit" 
            className="bg-teal-600 text-white py-3 px-6 sm:px-10 rounded-r-xl hover:bg-teal-700 active:bg-teal-500 transition duration-300">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

export default Header;
