"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useOrder } from "@/context/OrderContext";

export default function OrderSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearOrder } = useOrder();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      // Clear the order after successful payment
      clearOrder();
    }
  }, [sessionId, clearOrder]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You for Your Order!
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Your payment has been processed successfully. We'll start preparing your order right away.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Order ID: {sessionId}
              </p>
              <button
                onClick={() => router.push("/menu")}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                Order Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 