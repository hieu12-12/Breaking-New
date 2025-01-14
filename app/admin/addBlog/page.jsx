'use client'; // Enables client-side rendering for this component

// Importing necessary dependencies and assets
import { assets } from '@/Assets/assets'; // Custom assets module
import axios from 'axios'; // For making HTTP requests
import Image from 'next/image'; // For optimized image rendering in Next.js
import React, { useState } from 'react'; // React for state and component rendering
import { toast } from 'react-toastify'; // For toast notifications

// Reusable FormInput component: Simplifies input field creation
const FormInput = ({ label, name, value, onChange, type = 'text', placeholder, required, rows }) => (
  <div className="mb-6">
    <label className="block text-lg font-medium text-gray-700 mb-2">{label}</label>
    {type === 'textarea' ? (
      <textarea
        name={name}
        onChange={onChange}
        value={value}
        className="w-full sm:w-[580px] mt-2 p-4 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
        placeholder={placeholder}
        rows={rows}
        required={required}
      />
    ) : (
      <input
        name={name}
        onChange={onChange}
        value={value}
        className="w-full sm:w-[300px] mt-2 p-4 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
        type={type}
        placeholder={placeholder}
        required={required}
      />
    )}
  </div>
);

// Main page component
const page = () => {
  // States for managing form data and image upload
  const [image, setImage] = useState(null); // For storing the uploaded image file
  const [data, setData] = useState({
    title: '', // Blog title
    description: '', // Blog description
    category: 'Startup', // Default category
    author: '', // Author's name
    authorImg: '', // Default author image
  });

  // Updates form state when input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handles form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    const formData = new FormData(); // For sending form data including files
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('author', data.author);
    formData.append('authorImg', data.authorImg);
    formData.append('image', image); // Appends image file

    // Sends data to the backend API
    const response = await axios.post('/api/blog', formData);
    if (response.data.success) {
      // Displays success notification
      toast.success(response.data.msg);
      // Resets form fields
      setImage(null);
      setData({
        title: '',
        description: '',
        category: 'Startup',
        author: '',
        authorImg: '/author_img.png',
      });
    } else {
      // Displays error notification
      toast.error('Error');
    }
  };

  return (
    <div className="bg-gray-100 py-16 sm:py-24">
      <form onSubmit={onSubmitHandler} className="bg-white p-8 max-w-3xl mx-auto rounded-lg shadow-lg space-y-6">
        {/* Thumbnail Upload Section */}
        <div className="mb-8">
          <p className="text-lg font-semibold text-gray-700 mb-4">Upload Thumbnail</p>
          <label htmlFor="image" className="cursor-pointer">
            <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center hover:border-teal-500 transition duration-300">
              {/* Displays a preview or placeholder image */}
              <Image
                className="rounded-lg"
                src={!image ? assets.upload_area : URL.createObjectURL(image)}
                width={160}
                height={80}
                alt="Upload Area"
              />
            </div>
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:space-x-8">
            <div className="flex-1">
              <FormInput label="Blog Title" name="title" value={data.title} onChange={onChangeHandler} placeholder="Enter blog title" required />
            </div>
            <div className="flex-1">
              <FormInput label="Author" name="author" value={data.author} onChange={onChangeHandler} placeholder="Enter author's name" required />
            </div>
          </div>

          <FormInput label="Blog Description" name="description" value={data.description} onChange={onChangeHandler} type="textarea" placeholder="Write content here" rows={6} required />

          {/* Dropdown for Blog Category */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Blog Category</label>
            <select
              name="category"
              onChange={onChangeHandler}
              value={data.category}
              className="w-full sm:w-[580px] mt-2 p-4 border border-gray-300 rounded-lg text-gray-600 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              <option value="Startup">Sports</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-8">
            <button
              type="submit"
              className="w-40 h-12 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
            >
              ADD
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default page;
