import { assets } from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogItem = ({ title, description, category, image, id }) => {
  return (
    <div className="max-w-[280px] w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
      <Link href={`/blogs/${id}`} className="block">
        <Image
          src={image}
          alt={title}
          width={400}
          height={250}
          className="w-full h-48 object-cover hover:opacity-90 transition-opacity duration-300 rounded-t-xl"
        />
      </Link>
      <div className="p-5">
        <p className="inline-block bg-teal-600 text-white text-xs font-semibold rounded-full px-3 py-1 mb-4 shadow-sm">
          {category}
        </p>
        <h5 className="text-xl font-bold text-gray-800 leading-tight hover:text-teal-600 transition-colors">
          {title}
        </h5>
        <p className="text-gray-600 mt-3 text-sm line-clamp-3 leading-relaxed">
          {description}
        </p>
        <Link
          href={`/blogs/${id}`}
          className="inline-flex items-center mt-4 text-teal-600 font-medium hover:text-teal-800 transition-colors group"
        >
          Read more
          <Image
            src={assets.arrow}
            alt="Arrow"
            width={12}
            height={12}
            className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
