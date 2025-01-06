'use client';
import { assets, blog_data } from '@/Assets/assets';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Link from 'next/link'; // Added Link import

const Page = ({ params }) => {
  const [data, setData] = useState(null);

  // Fetch blog data based on the params.id
  const fetchBlogData = async () => {
    const response = await axios.get('/api/blog',{
      params:{
        id:params.id
      }
    })
    setData(response.data);
  }
  

  useEffect(() => {
    fetchBlogData(); // Fetch blog data when component mounts or params.id changes
  }, []);

  return (
    <>
      {data ? (
        <>
          <div className="bg-gray-200 py-5 md:px-12 lg:px-28">
            <div className="flex justify-between items-center">
              <Link href='/'>
                <Image src={assets.logo} width={180} alt="Logo" className="w-[130px] sm:w-auto" />
              </Link>
              <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border-black shadow-[-7px_7px_0px_#000000]">
                Get started <Image src={assets.arrow} alt="Arrow Icon" />
              </button>
            </div>
            <div className="text-center my-24">
              <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">{data.title}</h1>
              <Image
                className="mx-auto mt-6 border border-white rounded-full"
                src={data.author_img}
                width={60}
                height={60}
                alt={data.author}
              />
              <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">{data.author}</p>
            </div>
          </div>
          <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
            <Image
              className="border-4 border-white"
              src={data.image}
              width={1280}
              height={720}
              alt="Blog Content"
            />
            <h1 className="my-8 text-[26px] font-semibold">Introduction</h1>
            <p>{data.description}</p>
            <h3 className="my-5 text-[18px] font-semibold">Step 1: Self-Reflection and Goal Setting</h3>
            <p className="my-3">
              Before you can manage your lifestyle, you must have a clear understanding of what you want
              to achieve. Start by reflecting on your values, aspirations, and long-term goals.
            </p>
            <h3 className="my-5 text-[18px] font-semibold">Step 2: Taking Action</h3>
            <p className="my-3">
              Develop a concrete plan of action and implement small, measurable steps toward your goals.
            </p>
            <h3 className="my-5 text-[18px] font-semibold">Conclusion</h3>
            <p className="my-3">
              Managing your lifestyle is a journey that requires commitment and self-awareness. By
              following this step-by-step guide, you can take control of your life and make meaningful
              changes that lead to a balanced and fulfilling lifestyle.
            </p>
            <div className="my-24">
              <p className="text-black font-semibold my-4">Share this article on social media</p>
              <div className="flex space-x-4">
                <Image src={assets.facebook_icon} width={50} height={50} alt="Facebook" />
                <Image src={assets.twitter_icon} width={50} height={50} alt="Twitter" />
                <Image src={assets.googleplus_icon} width={50} height={50} alt="Google Plus" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-10">
          <p>Loading content...</p>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Page;
