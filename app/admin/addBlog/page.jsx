'use client';

import { assets } from '@/Assets/assets';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

// Reusable FormInput component
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
        className="w-full sm:w-[300px] mt-2 p-4 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-teal-500 focus:outline-none" // Reduced width to 300px here
        type={type}
        placeholder={placeholder}
        required={required}
      />
    )}
  </div>
);

const page = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: '',
    description: '',
    category: 'Startup',
    author: '',
    authorImg: '/author_img.png',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
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
      toast.error('Error');
    }
  };

  return (
    <div className="bg-gray-100 py-16 sm:py-24">
      <form onSubmit={onSubmitHandler} className="bg-white p-8 max-w-3xl mx-auto rounded-lg shadow-lg space-y-6">
        {/* Thumbnail Upload */}
        <div className="mb-8">
          <p className="text-lg font-semibold text-gray-700 mb-4">Upload Thumbnail</p>
          <label htmlFor="image" className="cursor-pointer">
            <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center hover:border-teal-500 transition duration-300">
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
