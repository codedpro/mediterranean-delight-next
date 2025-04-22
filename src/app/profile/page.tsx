"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

interface Reservation {
  id: string;
  date: string;
  time: string;
  partySize: number;
  status: string;
  specialRequests?: string;
}

export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    fetchReservations();
  }, [session]);

  const fetchReservations = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/reservations/user");
      if (!response.ok) throw new Error("Failed to fetch reservations");
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelReservation = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this reservation?")) return;

    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "cancelled" }),
      });

      if (!response.ok) throw new Error("Failed to cancel reservation");
      fetchReservations(); // Refresh the list
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome back, {session?.user?.name}
            </p>
          </div>

          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">My Reservations</h2>
            {reservations.length === 0 ? (
              <p className="text-gray-500">You have no reservations yet.</p>
            ) : (
              <div className="space-y-4">
                {reservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {format(new Date(reservation.date), "MMMM d, yyyy")} at{" "}
                          {reservation.time}
                        </p>
                        <p className="text-sm text-gray-500">
                          Party of {reservation.partySize}
                        </p>
                        {reservation.specialRequests && (
                          <p className="text-sm text-gray-500 mt-1">
                            Special Requests: {reservation.specialRequests}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            reservation.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : reservation.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {reservation.status}
                        </span>
                        {reservation.status !== "cancelled" && (
                          <button
                            onClick={() => cancelReservation(reservation.id)}
                            className="text-sm text-red-600 hover:text-red-500"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 