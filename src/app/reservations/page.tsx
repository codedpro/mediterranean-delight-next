"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";

export default function Reservations() {
  const { data: session } = useSession();
  const router = useRouter();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [specialRequests, setSpecialRequests] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      router.push("/auth/signin");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          time,
          guests,
          specialRequests,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create reservation");
      }

      router.push("/dashboard/reservations");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[40vh] w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero/reservation-hero.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl text-white font-bold">Make a Reservation</h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Reservation Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Your Table</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={format(new Date(), "yyyy-MM-dd")}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                />
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700"
                >
                  Time
                </label>
                <select
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                >
                  <option value="">Select a time</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="21:00">9:00 PM</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="guests"
                  className="block text-sm font-medium text-gray-700"
                >
                  Number of Guests
                </label>
                <select
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="specialRequests"
                  className="block text-sm font-medium text-gray-700"
                >
                  Special Requests
                </label>
                <textarea
                  id="specialRequests"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  placeholder="Any special requests or dietary requirements?"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
                >
                  {isLoading ? "Making Reservation..." : "Make Reservation"}
                </button>
              </div>
            </form>
          </div>

          {/* Policies Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Reservation Policy</h2>
              <div className="prose prose-amber">
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Reservations can be made up to 30 days in advance</li>
                  <li>We hold tables for 15 minutes after the reservation time</li>
                  <li>For parties of 8 or more, please call us directly</li>
                  <li>Special dietary requirements can be noted in the reservation form</li>
                  <li>We recommend making reservations for weekend dining</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancellation Policy</h2>
              <div className="prose prose-amber">
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Cancellations must be made at least 24 hours in advance</li>
                  <li>Late cancellations may result in a cancellation fee</li>
                  <li>For large party cancellations, please call us directly</li>
                  <li>No-shows may be subject to a fee</li>
                  <li>We understand emergencies happen - please call us if you need to cancel last minute</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Need to Modify Your Reservation?</h3>
              <p className="text-amber-800 mb-4">
                If you need to modify your existing reservation, please visit your dashboard or contact us directly.
              </p>
              <Link
                href="/dashboard/reservations"
                className="inline-block bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors"
              >
                View My Reservations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 