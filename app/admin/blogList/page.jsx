'use client'; // Enables client-side rendering for this component

// Importing necessary modules and components
import React, { useEffect, useState } from 'react'; // React hooks for state management and lifecycle methods
import axios from 'axios'; // For making HTTP requests
import { toast } from 'react-toastify'; // For displaying notifications
import BlogTableItem from '@/Components/AdminComponents/BlogTableItem'; // Custom component to display individual blog items in a table

const Page = () => {
  // State to store the list of blogs fetched from the server
  const [blogs, setBlogs] = useState([]);

  // Function to fetch blogs from the API
  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog'); // Send a GET request to fetch blog data
      setBlogs(response.data.blogs); // Update state with the fetched blogs
    } catch (error) {
      console.error('Error fetching blogs:', error); // Log error to the console
      toast.error('Failed to fetch blogs'); // Display error notification
    }
  };

  // Function to delete a blog by its ID
  const deleteBlog = async (mongoId) => {
    try {
      const response = await axios.delete('/api/blog', {
        params: { id: mongoId }, // Pass the blog ID as a query parameter
      });
      toast.success(response.data.msg); // Display success notification
      fetchBlogs(); // Refresh the blog list after deletion
    } catch (error) {
      console.error('Error deleting blog:', error); // Log error to the console
      toast.error('Failed to delete blog'); // Display error notification
    }
  };

  // useEffect to fetch blogs when the component is mounted
  useEffect(() => {
    fetchBlogs(); // Fetch blogs on component mount
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      {/* Page title */}
      <h1 className="text-3xl font-bold text-gray-800">All Blogs</h1>
      
      {/* Blog table container */}
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-8 border border-gray-300 rounded-lg shadow-lg">
        <table className="w-full text-sm text-gray-700">
          <thead className="text-xs uppercase bg-gray-100 text-gray-600">
            <tr>
              {/* Table headers */}
              <th className="hidden sm:block px-6 py-3 text-left">Author Name</th>
              <th className="px-6 py-3 text-left">Blog Title</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-2 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Render each blog as a table row using the BlogTableItem component */}
            {blogs.map((item) => (
              <BlogTableItem
                key={item._id} // Unique key for each blog
                mongoId={item._id} // Blog ID
                title={item.title} // Blog title
                author={item.author} // Author's name
                date={item.date} // Publication date
                deleteBlog={deleteBlog} // Function to delete the blog
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
