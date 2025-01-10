import { assets, blog_data } from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogItem = ({ title, description, category, image, id }) => {

  return (
    <div className="max-w-[250px] w-full bg-white border border-transparent rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
      <Link href={`/blogs/${id}`}>
        <Image src={image} alt={title} width={400} height={250} className="w-full h-40 object-cover hover:opacity-90 transition-opacity duration-300" />
      </Link>
      <div className="p-4">
        <p className="inline-block bg-teal-500 text-white text-xs font-semibold rounded-full px-4 py-1 mb-3">{category}</p>
        <h5 className="text-lg font-semibold text-gray-900">{title}</h5>
        <p className="text-gray-600 mt-2 text-sm line-clamp-3">{description}</p>
        <Link href={`/blogs/${id}`} className="inline-flex items-center mt-4 text-teal-500 font-medium hover:text-teal-700 transition-colors">
          Read more
          <Image src={assets.arrow} alt="Arrow" width={12} height={12} className="ml-2" />
        </Link>
      </div>
    </div>
  );
}

export default BlogItem;
