"use client";

import { useOrder } from "@/context/OrderContext";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Order() {
  const { orderItems, updateQuantity, removeFromOrder, totalPrice } = useOrder();
  const { data: session } = useSession();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!session) {
      await signIn(undefined, { callbackUrl: "/order" });
      return;
    }
    // TODO: Implement checkout process
    console.log("Proceeding to checkout...");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-amber-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-amber-900">Your Order</h1>
            <div className="mt-6 max-w-3xl mx-auto">
              <p className="text-lg text-amber-800">
                {session ? (
                  "You're all set to proceed with your order. Review your items below and click 'Proceed to Checkout' when ready."
                ) : (
                  <>
                    To complete your order, you'll need to{" "}
                    <span className="font-semibold">sign in</span> first. Don't worry, your items will be saved.
                  </>
                )}
              </p>
              <div className="mt-4 text-sm text-amber-700">
                <p>• Your order will be saved for 24 hours</p>
                <p>• You can modify quantities or remove items</p>
                <p>• Secure payment processing available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Content */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {orderItems.length === 0 ? (
            <div className="text-center">
              <p className="text-lg text-gray-600">Your order is empty</p>
              <Link
                href="/menu"
                className="mt-6 inline-block bg-amber-600 text-white px-6 py-3 rounded-md hover:bg-amber-700 transition-colors"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="divide-y divide-gray-200">
                {orderItems.map((item) => (
                  <div key={item.id} className="p-6 flex items-center">
                    <div className="relative h-24 w-24 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="ml-6 flex-grow">
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.description}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            -
                          </button>
                          <span className="mx-2 text-gray-700">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center">
                          <span className="text-amber-600 font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeFromOrder(item.id)}
                            className="ml-4 text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium text-gray-900">Total</p>
                    <p className="text-sm text-gray-500">Including tax</p>
                  </div>
                  <div className="text-2xl font-bold text-amber-600">
                    ${totalPrice.toFixed(2)}
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="mt-6 w-full bg-amber-600 text-white px-6 py-3 rounded-md hover:bg-amber-700 transition-colors"
                >
                  {session ? "Proceed to Checkout" : "Sign in to Checkout"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 