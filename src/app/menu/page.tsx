"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { menuItems } from "@/data/menu";

const categories = [
  "All",
  ...new Set(menuItems.map((item) => item.category)),
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = menuItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Our Menu
          </h1>
          <p className="mt-4 text-xl text-gray-700">
            Discover our authentic Mediterranean dishes
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeCategory === category
                    ? "bg-amber-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              href={`/menu/${item.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.name}
                </h3>
                <p className="mt-1 text-sm text-gray-700 line-clamp-2">
                  {item.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-amber-600 font-semibold">
                    ${item.price}
                  </span>
                  <span className="text-xs text-gray-500">
                    {item.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 