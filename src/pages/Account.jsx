import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Loader2, Package, Calendar, MapPin, LogOut, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  in_progress: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const STATUS_LABELS = {
  pending: "Pending Confirmation",
  confirmed: "Confirmed",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function Account() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    base44.auth.me()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setAuthLoading(false));
  }, []);

  const { data: bookings = [], isLoading: loadingBookings } = useQuery({
    queryKey: ["my-bookings", user?.email],
    queryFn: () => base44.entities.Booking.filter({ customer_email: user.email }, "-created_date", 50),
    enabled: !!user?.email,
  });

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center max-w-sm w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-green-700" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Track Your Orders</h2>
          <p className="text-slate-500 mb-6">Sign in to view your booking history and appointment status.</p>
          <Button
            onClick={() => base44.auth.redirectToLogin(window.location.href)}
            className="w-full bg-green-700 hover:bg-green-800 text-white"
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Orders</h1>
            <p className="text-slate-500 mt-1">{user.email}</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => base44.auth.logout()}>
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>

        {loadingBookings ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Wrench className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-1">No bookings yet</h3>
            <p className="text-slate-500 text-sm mb-6">Your booking history will appear here after you schedule a service.</p>
            <Link to={createPageUrl("Booking")}>
              <Button className="bg-green-700 hover:bg-green-800 text-white">
                Book a Service
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div key={b.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="font-semibold text-slate-900 capitalize text-lg">
                      {b.service_type?.replace("_", " ")} Service
                    </div>
                    {b.booking_number && (
                      <div className="text-xs text-slate-400 font-mono mt-0.5">Booking #{b.booking_number}</div>
                    )}
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ${STATUS_COLORS[b.status] || "bg-slate-100 text-slate-700"}`}>
                    {STATUS_LABELS[b.status] || b.status}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 text-sm text-slate-600">
                  {b.preferred_date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      {b.preferred_date}{b.preferred_time ? ` · ${b.preferred_time}` : ""}
                    </div>
                  )}
                  {b.customer_address && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span className="truncate">{b.customer_address}</span>
                    </div>
                  )}
                </div>
                {b.technician_notes && (
                  <div className="mt-3 pt-3 border-t border-slate-100 text-sm text-slate-600">
                    <span className="font-medium text-slate-700">Technician note: </span>
                    {b.technician_notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}