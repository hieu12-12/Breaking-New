import { blog_data } from '@/Assets/assets';
import React, { useEffect, useState } from 'react';
import BlogItem from './BlogItem';
import axios from 'axios';

const BlogList = () => {

  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get('/api/blog');
    setBlogs(response.data.blogs);
    console.log(response.data.blogs);
  }

  useEffect(() => {
    fetchBlogs();
  }, [])

  return (
    <div className="px-6 lg:px-24 py-8 bg-gray-50">
      <div className="flex justify-center gap-6 my-8">
        <button
          onClick={() => setMenu('All')}
          className={`${
            menu === "All" ? 'bg-teal-600 text-white' : 'text-gray-800'
          } py-2 px-6 rounded-md font-semibold hover:bg-teal-700 transition-colors duration-300`}>
          All
        </button>
        <button
          onClick={() => setMenu('Technology')}
          className={`${
            menu === "Technology" ? 'bg-teal-600 text-white' : 'text-gray-800'
          } py-2 px-6 rounded-md font-semibold hover:bg-teal-700 transition-colors duration-300`}>
          Technology
        </button>
        <button
          onClick={() => setMenu('Startup')}
          className={`${
            menu === "Startup" ? 'bg-teal-600 text-white' : 'text-gray-800'
          } py-2 px-6 rounded-md font-semibold hover:bg-teal-700 transition-colors duration-300`}>
          Startup
        </button>
        <button
          onClick={() => setMenu('Lifestyle')}
          className={`${
            menu === "Lifestyle" ? 'bg-teal-600 text-white' : 'text-gray-800'
          } py-2 px-6 rounded-md font-semibold hover:bg-teal-700 transition-colors duration-300`}>
          Lifestyle
        </button>
      </div>
      
      <div className="flex flex-wrap justify-center gap-6 xl:gap-12 mb-16">
        {blogs
          .filter(item => menu === "All" ? true : item.category === menu)
          .map((item, index) => (
            <BlogItem
              key={index}
              id={item._id}
              image={item.image}
              title={item.title}
              description={item.description}
              category={item.category}
            />
        ))}
      </div>
    </div>
  );
}

export default BlogList;
