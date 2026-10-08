"use client";

import React, { useState } from 'react';
import ProductCard, { Products } from './ProductCard';

interface CategoryProductsProps {
  products: Products[];
}

const CategoryProducts = ({ products }: CategoryProductsProps)=> {
  const [sortOption, setSortOption] = useState<"ডিফল্ট" | "দাম (কম থেকে বেশি)" | "দাম (বেশি থেকে কম)">("ডিফল্ট");

  
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "দাম (কম থেকে বেশি)") return a.today - b.today;
    if (sortOption === "দাম (বেশি থেকে কম)") return b.today - a.today;
    return 0; 
  });

  return (
    <>
      {/* Filter / Sort Box */}
      <div className="flex items-center justify-end rounded-xl bg-white px-6 py-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
          <span>সাজান</span>
          <select 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as "ডিফল্ট" | "দাম (কম থেকে বেশি)" | "দাম (বেশি থেকে কম)")}
            className="bg-[#fcfdfc] border border-gray-200 text-gray-700 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-green-500 cursor-pointer"
          >
            <option value="ডিফল্ট">ডিফল্ট</option>
            <option value="দাম (কম থেকে বেশি)">দাম (কম থেকে বেশি)</option>
            <option value="দাম (বেশি থেকে কম)">দাম (বেশি থেকে কম)</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product , index:number) => (
          <ProductCard key={index} all={product} />
        ))}
      </div>
    </>
  );
}
export default CategoryProducts;
