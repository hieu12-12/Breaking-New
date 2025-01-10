'use client'
import BlogTableItem from '@/Components/AdminComponents/BlogTableItem'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
  const [blogs, setBlogs] = useState([])

  const fetchBlogs = async () => {
    const response = await axios.get('/api/blog')
    setBlogs(response.data.blogs)
  }

  const deleteBlog = async (mongoId) => {
    const response = await axios.delete('/api/blog', {
      params: {
        id: mongoId,
      },
    })
    toast.success(response.data.msg)
    fetchBlogs()
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1 className="text-3xl font-bold text-gray-800">All Blogs</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-8 border border-gray-300 rounded-lg shadow-lg">
        <table className="w-full text-sm text-gray-700">
          <thead className="text-xs uppercase bg-gray-100 text-gray-600">
            <tr>
              <th scope="col" className="hidden sm:block px-6 py-3 text-left">
                Author Name
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Blog Title
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Date
              </th>
              <th scope="col" className="px-2 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, index) => (
              <BlogTableItem
                key={index}
                mongoId={item._id}
                title={item.title}
                author={item.author}
                authorImg={item.authorImg}
                date={item.date}
                deleteBlog={deleteBlog}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page
