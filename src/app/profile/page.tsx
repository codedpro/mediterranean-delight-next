"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

interface Reservation {
  id: string;
  date: string;
  time: string;
  guests: number;
  status: string;
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

    const fetchReservations = async () => {
      try {
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

    fetchReservations();
  }, [session, router]);

  const cancelReservation = async (id: string) => {
    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "cancelled" }),
      });

      if (!response.ok) throw new Error("Failed to cancel reservation");

      // Update local state
      setReservations((prev) =>
        prev.map((res) =>
          res.id === id ? { ...res, status: "cancelled" } : res
        )
      );
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome, {session.user?.name}!
            </h1>
            <p className="text-gray-600">{session.user?.email}</p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Your Reservations
            </h2>
            {isLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
              </div>
            ) : reservations.length === 0 ? (
              <p className="text-gray-600">You have no reservations yet.</p>
            ) : (
              <div className="space-y-4">
                {reservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="border rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">
                        {format(new Date(reservation.date), "MMMM d, yyyy")}
                      </p>
                      <p className="text-gray-600">
                        {reservation.time} - {reservation.guests} guests
                      </p>
                      <p
                        className={`text-sm ${
                          reservation.status === "confirmed"
                            ? "text-green-600"
                            : reservation.status === "cancelled"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {reservation.status.charAt(0).toUpperCase() +
                          reservation.status.slice(1)}
                      </p>
                    </div>
                    {reservation.status !== "cancelled" && (
                      <button
                        onClick={() => cancelReservation(reservation.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Cancel
                      </button>
                    )}
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