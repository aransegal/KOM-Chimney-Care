import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Loader2, Package, Calendar, MapPin, LogOut, Wrench, Mail, X, Phone, Clock } from "lucide-react";
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
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResendConfirmation = async () => {
    setSendingEmail(true);
    await base44.functions.invoke("sendBookingConfirmation", { booking_id: selectedBooking.id });
    setEmailSent(true);
    setSendingEmail(false);
  };

  const openBooking = (b) => {
    setSelectedBooking(b);
    setEmailSent(false);
  };

  const closeBooking = () => {
    setSelectedBooking(null);
    setEmailSent(false);
  };

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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 pt-20">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 max-w-md w-full overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-green-700 to-green-800 p-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-1">My Orders</h2>
            <p className="text-green-200 text-sm">Sign in to track your bookings and appointment status</p>
          </div>

          {/* Body */}
          <div className="p-8">
            <Button
              onClick={() => base44.auth.redirectToLogin(window.location.href)}
              className="w-full bg-green-700 hover:bg-green-800 text-white h-11 text-base font-semibold mb-4"
            >
              Sign In / Create Account
            </Button>
            <p className="text-center text-slate-400 text-xs">
              Sign in with Google or your email to view your booking history, appointment details, and order status.
            </p>

            <div className="mt-6 pt-6 border-t border-slate-100 space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                View real-time booking status
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                See appointment details & technician notes
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Access your full service history
              </div>
            </div>
          </div>
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
              <div
                key={b.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => openBooking(b)}
              >
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

            {/* Booking Detail Modal */}
            {selectedBooking && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={closeBooking}>
                <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 capitalize">
                        {selectedBooking.service_type?.replace("_", " ")} Service
                      </h3>
                      {selectedBooking.booking_number && (
                        <div className="text-xs text-slate-400 font-mono mt-0.5">#{selectedBooking.booking_number}</div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLORS[selectedBooking.status] || "bg-slate-100 text-slate-700"}`}>
                        {STATUS_LABELS[selectedBooking.status] || selectedBooking.status}
                      </span>
                      <button onClick={closeBooking} className="text-slate-400 hover:text-slate-600 ml-1">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm mb-6">
                    {selectedBooking.selected_product && (
                      <div className="flex gap-3">
                        <Package className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{selectedBooking.selected_product}</span>
                      </div>
                    )}
                    {selectedBooking.preferred_date && (
                      <div className="flex gap-3">
                        <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{selectedBooking.preferred_date}{selectedBooking.preferred_time ? ` · ${selectedBooking.preferred_time}` : ""}</span>
                      </div>
                    )}
                    {selectedBooking.customer_address && (
                      <div className="flex gap-3">
                        <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{selectedBooking.customer_address}</span>
                      </div>
                    )}
                    {selectedBooking.customer_phone && (
                      <div className="flex gap-3">
                        <Phone className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{selectedBooking.customer_phone}</span>
                      </div>
                    )}
                    {selectedBooking.notes && (
                      <div className="flex gap-3">
                        <Clock className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{selectedBooking.notes}</span>
                      </div>
                    )}
                    {selectedBooking.technician_notes && (
                      <div className="bg-blue-50 rounded-lg p-3 text-slate-700">
                        <span className="font-medium text-blue-800">Technician note: </span>
                        {selectedBooking.technician_notes}
                      </div>
                    )}
                  </div>

                  {selectedBooking.customer_email && (
                    <Button
                      onClick={handleResendConfirmation}
                      disabled={sendingEmail || emailSent}
                      variant="outline"
                      className="w-full"
                    >
                      {sendingEmail ? (
                        <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Sending...</>
                      ) : emailSent ? (
                        <><Mail className="w-4 h-4 mr-2 text-green-500" /> <span className="text-green-600">Confirmation sent!</span></>
                      ) : (
                        <><Mail className="w-4 h-4 mr-2" /> Resend confirmation email</>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}