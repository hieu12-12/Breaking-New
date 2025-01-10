'use client'
import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    title: '',
    description: '',
    category: 'Startup',
    author: 'Alex Bennett',
    authorImg: '/author_img.png',
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((data) => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('category', data.category)
    formData.append('author', data.author)
    formData.append('authorImg', data.authorImg)
    formData.append('image', image)

    const response = await axios.post('/api/blog', formData)
    if (response.data.success) {
      toast.success(response.data.msg)
      setImage(false)
      setData({
        title: '',
        description: '',
        category: 'Startup',
        author: 'Alex Bennett',
        authorImg: '/author_img.png',
      })
    } else {
      toast.error('Error')
    }
  }

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="pt-5 px-5 sm:pt-12 sm:pl-16 space-y-6 max-w-2xl mx-auto"
      >
        <p className="text-xl font-semibold text-gray-700">Upload Thumbnail</p>
        <label htmlFor="image" className="cursor-pointer">
          <div className="mt-4 relative w-full h-36 border-dashed border-2 border-gray-400 rounded-lg flex justify-center items-center">
            <Image
              className="rounded-lg"
              src={!image ? assets.upload_area : URL.createObjectURL(image)}
              width={140}
              height={70}
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

        <div>
          <p className="text-xl font-semibold text-gray-700">Blog Title</p>
          <input
            name="title"
            onChange={onChangeHandler}
            value={data.title}
            className="w-full sm:w-[500px] mt-4 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            type="text"
            placeholder="Enter blog title"
            required
          />
        </div>

        <div>
          <p className="text-xl font-semibold text-gray-700">Blog Description</p>
          <textarea
            name="description"
            onChange={onChangeHandler}
            value={data.description}
            className="w-full sm:w-[500px] mt-4 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Write content here"
            rows={6}
            required
          />
        </div>

        <div>
          <p className="text-xl font-semibold text-gray-700">Blog Category</p>
          <select
            name="category"
            onChange={onChangeHandler}
            value={data.category}
            className="w-40 mt-4 px-4 py-3 border border-gray-300 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="Startup">Startup</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="mt-8 w-40 h-12 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
          >
            ADD
          </button>
        </div>
      </form>
    </>
  )
}

export default page
