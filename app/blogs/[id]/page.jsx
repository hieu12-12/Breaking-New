'use client'
import { assets, blog_data } from '@/Assets/assets';
import Footer from '@/Components/Footer';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Page = ({ params }) => {
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    const response = await axios.get('/api/blog', {
      params: {
        id: params.id
      }
    })
    setData(response.data);
  }

  useEffect(() => {
    fetchBlogData();
  }, []);

  return (
    data ? (
      <>
        <div className="bg-gray-200 py-6 px-6 md:px-14 lg:px-32">
          <div className="flex justify-between items-center">
            <Link href="/">
              <Image src={assets.logo} width={180} alt="Logo" className="w-[130px] sm:w-auto" />
            </Link>
            <button className="flex items-center gap-3 font-semibold py-2 px-4 sm:py-3 sm:px-6 border border-black shadow-lg hover:bg-black hover:text-white transition duration-300">
              Get started <Image src={assets.arrow} alt="Arrow" />
            </button>
          </div>
          <div className="text-center my-20">
            <h1 className="text-3xl sm:text-5xl font-semibold max-w-[800px] mx-auto text-gray-900">{data.title}</h1>
            <div className="mt-6 flex justify-center">
              <Image className="border-4 border-white rounded-full" src={data.authorImg} width={80} height={80} alt="Author" />
            </div>
            <p className="mt-4 text-lg max-w-[800px] mx-auto text-gray-600">{data.author}</p>
          </div>
        </div>
        <div className="mx-6 max-w-[850px] md:mx-auto mt-[-80px] mb-16">
          <Image className="w-full border-4 border-white shadow-lg" src={data.image} width={850} height={480} alt="Blog Image" />
          <div className="blog-content mt-6 text-gray-800" dangerouslySetInnerHTML={{ __html: data.description }}></div>
          <div className="my-20">
            <p className="text-black font-semibold my-6">Share this article on social media</p>
            <div className="flex space-x-6">
              <Image src={assets.facebook_icon} width={50} alt="Facebook" />
              <Image src={assets.twitter_icon} width={50} alt="Twitter" />
              <Image src={assets.googleplus_icon} width={50} alt="Google+" />
            </div>
          </div>
        </div>
        <Footer />
      </>
    ) : <div>Loading...</div>
  );
}

export default Page;
