"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { menuItems } from "@/data/menu";
import { useOrder } from "@/context/OrderContext";

const categories = [
  ...new Set(menuItems.map((item) => item.category)),
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("Appetizer");
  const { addToOrder, totalItems } = useOrder();

  const filteredItems = menuItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[70vh] w-full bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/images/hero/menu-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl text-white font-bold">Our Menu</h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
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
              <div
                key={item.id}
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
                <div className="p-4 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-700 line-clamp-2 min-h-[40px]">
                    {item.description}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-amber-600 font-semibold">
                      ${item.price}
                    </span>
                    <button
                      onClick={() => addToOrder(item)}
                      className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors text-sm font-medium whitespace-nowrap"
                    >
                      Add to Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Order Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link
          href="/order"
          className="relative inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-amber-600 hover:bg-amber-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <span className="mr-2">Your Order</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
} 