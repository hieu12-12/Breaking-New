'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import BlogTableItem from '@/Components/AdminComponents/BlogTableItem';

const Page = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs from the API
  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog');
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to fetch blogs');
    }
  };

  // Delete a blog by ID
  const deleteBlog = async (mongoId) => {
    try {
      const response = await axios.delete('/api/blog', {
        params: { id: mongoId },
      });
      toast.success(response.data.msg);
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
    }
  };

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1 className="text-3xl font-bold text-gray-800">All Blogs</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-8 border border-gray-300 rounded-lg shadow-lg">
        <table className="w-full text-sm text-gray-700">
          <thead className="text-xs uppercase bg-gray-100 text-gray-600">
            <tr>
              <th className="hidden sm:block px-6 py-3 text-left">Author Name</th>
              <th className="px-6 py-3 text-left">Blog Title</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-2 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item) => (
              <BlogTableItem
                key={item._id}
                mongoId={item._id}
                title={item.title}
                author={item.author}
                date={item.date}
                deleteBlog={deleteBlog}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
