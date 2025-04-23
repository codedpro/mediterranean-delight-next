"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOrder } from "@/context/OrderContext";

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useOrder();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              href="/"
              className={`flex items-center px-2 py-2 text-sm font-medium ${
                isActive("/")
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Home
            </Link>
            <Link
              href="/menu"
              className={`flex items-center px-2 py-2 text-sm font-medium ${
                isActive("/menu")
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Menu
            </Link>
            <Link
              href="/reservations"
              className={`flex items-center px-2 py-2 text-sm font-medium ${
                isActive("/reservations")
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Reservations
            </Link>
            <Link
              href="/about"
              className={`flex items-center px-2 py-2 text-sm font-medium ${
                isActive("/about")
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              About
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              href="/order"
              className="relative flex items-center px-2 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 