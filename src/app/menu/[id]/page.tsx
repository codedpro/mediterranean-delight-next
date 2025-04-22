"use client";

import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { menuItems } from "@/data/menu";

export default function MenuItemDetails() {
  const { id } = useParams();
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);

  const menuItem = menuItems.find((item) => item.id === id);

  if (!menuItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Item not found</h1>
          <Link
            href="/menu"
            className="mt-4 text-amber-600 hover:text-amber-500"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  // Find related items (same category)
  const relatedItems = menuItems.filter(
    (item) => item.category === menuItem.category && item.id !== menuItem.id
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/menu"
            className="text-amber-600 hover:text-amber-500 flex items-center"
          >
            <svg
              className="h-5 w-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Menu
          </Link>
          {session && (
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="text-gray-400 hover:text-amber-600"
            >
              <svg
                className="h-6 w-6"
                fill={isFavorite ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/2">
              <div className="relative h-64 md:h-full">
                <Image
                  src={menuItem.image}
                  alt={menuItem.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="p-8 md:w-1/2">
              <div className="uppercase tracking-wide text-sm text-amber-600 font-semibold">
                {menuItem.category}
              </div>
              <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
                {menuItem.name}
              </h1>
              <p className="mt-3 text-lg text-gray-700">{menuItem.description}</p>
              <div className="mt-4">
                <span className="text-2xl font-bold text-gray-900">
                  ${menuItem.price}
                </span>
              </div>
              {menuItem.nutritionalInfo && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Nutritional Information
                  </h2>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    {Object.entries(menuItem.nutritionalInfo).map(([key, value]) => (
                      <div key={key} className="text-sm text-gray-700">
                        <span className="font-medium">{key}:</span> {value}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {relatedItems.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedItems.slice(0, 3).map((item) => (
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
                    <p className="mt-2 text-amber-600 font-semibold">
                      ${item.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 