'use client';

import { assets } from '@/Assets/assets';
import Footer from '@/Components/Footer';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link'; // Import Link from Next.js
import React, { useEffect, useState } from 'react';

const Page = ({ params }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch blog data
  const fetchBlogData = async () => {
    try {
      const response = await axios.get('/api/blog', { params: { id: params.id } });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching blog data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchBlogData();
  }, [params.id]);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!data) {
    return <div className="text-center py-20">Blog not found.</div>;
  }

  return (
    <>
      <header className="bg-gray-200 py-6 px-6 md:px-14 lg:px-32">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image src={assets.breakingnews} width={180} alt="Logo" className="w-[130px] sm:w-auto" />
          </Link>
          
          {/* Wrap the button with Link to the admin page */}
          <Link href="/admin/addBlog">
            <button className="flex items-center gap-3 font-semibold py-3 px-6 sm:py-4 sm:px-8 border border-transparent bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:from-purple-600 hover:to-blue-500 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
              Get started <Image src={assets.arrow} alt="Arrow" />
            </button>
          </Link>

        </div>
      </header>
      <main>
        <section className="text-center my-20">
          <h1 className="text-3xl sm:text-5xl font-semibold max-w-[800px] mx-auto text-gray-900">
            {data.title}
          </h1>
          <div className="mt-6 flex justify-center">
            <Image
              className="border-4 border-white rounded-full"
              src={data.authorImg}
              width={80}
              height={80}
              alt="Author"
            />
          </div>
          <p className="mt-4 text-lg max-w-[800px] mx-auto text-gray-600">{data.author}</p>
        </section>
        <section className="mx-6 max-w-[850px] md:mx-auto mt-[-80px] mb-16">
          <Image
            className="w-full border-4 border-white shadow-lg"
            src={data.image}
            width={550}
            height={480}
            alt="Blog Image"
          />
          <article
            className="blog-content mt-6 text-gray-800"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></article>
          <div className="my-20">
            <p className="text-black font-semibold my-6">Share this article on social media</p>
            <div className="flex space-x-6">
              {[ 
                { icon: assets.facebook_icon, alt: 'Facebook' },
                { icon: assets.twitter_icon, alt: 'Twitter' },
                { icon: assets.googleplus_icon, alt: 'Google+' },
              ].map((social, index) => (
                <Image key={index} src={social.icon} width={50} alt={social.alt} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Page;
