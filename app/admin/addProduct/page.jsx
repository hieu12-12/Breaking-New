'use client'; // Enables client-side rendering for this component

// Importing necessary modules and assets
import { assets } from '@/Assets/assets'; // Path to custom assets
import axios from 'axios'; // For HTTP requests
import Image from 'next/image'; // Next.js image optimization
import React, { useState } from 'react'; // React hooks for state management

const page = () => {
  // State for storing the uploaded image and form data
  const [image, setImage] = useState(false); // Holds the uploaded image file
  const [data, setData] = useState({
    title: '', // Blog title
    description: '', // Blog description
    category: 'Startup', // Default category
    Author: 'Hieu Tran', // Default author name
  });

  // Handler for updating form state when input fields change
  const onChangeHandler = (event) => {
    const name = event.target.name; // Name of the form field
    const value = event.target.value; // Value of the form field
    setData((prevData) => ({ ...prevData, [name]: value })); // Update state with new value
    console.log(data); // Log the updated state (for debugging)
  };

  // Handler for form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Create FormData object to send data including the image
    const formData = new FormData();
    formData.append('title', data.title); // Append title
    formData.append('description', data.description); // Append description
    formData.append('category', data.category); // Append category
    formData.append('author', data.Author); // Append author
    formData.append('image', image); // Append image file

    // Make POST request to the backend API
    const response = await axios.post('/api/blog', formData);
    if (response.data.success) {
      // If submission is successful
      toast.success(response.data.msg); // Show success notification
      setImage(false); // Reset image state
      setData({
        title: '', // Reset title
        description: '', // Reset description
        category: 'Startup', // Reset to default category
        Author: '', // Reset author name
      });
    } else {
      // If submission fails
      toast.error('Error'); // Show error notification
    }
  };

  return (
    <>
      {/* Form for submitting blog data */}
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        {/* Thumbnail upload section */}
        <p className="text-xl">Upload thumbnail</p>
        <label htmlFor="image">
          <Image
            className="mt-4"
            src={!image ? assets.upload_area : URL.createObjectURL(image)} // Preview uploaded image or placeholder
            width={140}
            height={70}
            alt="Thumbnail"
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])} // Update image state
          type="file"
          id="image"
          hidden
          required
        />

        {/* Blog title input field */}
        <p className="text-xl mt-4">Blog title</p>
        <input
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Type here"
          required
        />

        {/* Blog description input field */}
        <p className="text-xl mt-4">Blog Description</p>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          placeholder="Write content here"
          rows={6}
          required
        />

        {/* Blog category dropdown */}
        <p className="text-xl mt-4">Blog category</p>
        <select
          name="category"
          onChange={onChangeHandler}
          value={data.category}
          className="w-40 mt-4 px-4 py-3 border text-gray-500"
        >
          <option value="Sports">Sports</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>

        {/* Submit button */}
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
          ADD
        </button>
      </form>
    </>
  );
};

export default page;
