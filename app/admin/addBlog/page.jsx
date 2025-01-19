'use client'; // Enables client-side rendering for this component

import { assets } from '@/Assets/assets'; // Custom assets module
import axios from 'axios'; // For making HTTP requests
import Image from 'next/image'; // For optimized image rendering in Next.js
import React, { useState, useEffect } from 'react'; // React for state and component rendering
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

const Page = () => {
  const [image, setImage] = useState(null); // For storing the uploaded image file
  const [loading, setLoading] = useState(false); // For handling form submission state
  const [data, setData] = useState({
    title: '',
    description: '',
    category: 'Startup',
    author: '',
    authorImg: '/author_img.png',
  });

  // Cleanup the object URL when the image changes or component unmounts
  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
    };
  }, [image]);

  // Updates form state when input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handles form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('author', data.author);
      formData.append('authorImg', data.authorImg);
      formData.append('image', image);

      const response = await axios.post('/api/blog', formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(null);
        setData({
          title: '',
          description: '',
          category: 'Startup',
          author: '',
          authorImg: '/author_img.png',
        });
      } else {
        throw new Error(response.data.msg || 'Unknown error occurred');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || 'Failed to add blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 py-16 sm:py-24">
      <form onSubmit={onSubmitHandler} className="bg-white p-8 max-w-3xl mx-auto rounded-lg shadow-lg space-y-6">
        {/* Thumbnail Upload Section */}
        <div className="mb-8">
          <p className="text-lg font-semibold text-gray-700 mb-4">Upload Thumbnail</p>
          <label htmlFor="image" className="cursor-pointer" aria-label="Upload Thumbnail">
            <div
              className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center hover:border-teal-500 transition duration-300"
              role="button"
              aria-describedby="image-upload"
            >
              <Image
                className="rounded-lg"
                src={!image ? assets.upload_area : URL.createObjectURL(image)}
                width={160}
                height={80}
                alt="Upload Thumbnail"
              />
            </div>
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
            aria-required="true"
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

          <FormInput
            label="Blog Description"
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            type="textarea"
            placeholder="Write content here"
            rows={6}
            required
          />

          {/* Dropdown for Blog Category */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Blog Category</label>
            <select
              name="category"
              onChange={onChangeHandler}
              value={data.category}
              className="w-full sm:w-[580px] mt-2 p-4 border border-gray-300 rounded-lg text-gray-600 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              <option value="Sports">Sports</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-8">
            <button
              type="submit"
              className={`w-40 h-12 ${loading ? 'bg-gray-400' : 'bg-teal-600'} text-white font-semibold rounded-lg shadow-md transition duration-300`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'ADD'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
