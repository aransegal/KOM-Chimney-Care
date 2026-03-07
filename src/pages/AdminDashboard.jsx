import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Calendar, Clock, CheckCircle, RefreshCw, Search,
  Users, Loader2
} from "lucide-react";

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  in_progress: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  new: "bg-slate-100 text-slate-800",
  contacted: "bg-blue-100 text-blue-800",
  scheduled: "bg-indigo-100 text-indigo-800",
};

export default function AdminDashboard() {
  const [tab, setTab] = useState("bookings");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [qbLoading, setQbLoading] = useState(null);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    base44.auth.me()
      .then((u) => {
        if (!u || u.role !== "admin") {
          base44.auth.redirectToLogin(window.location.href);
        } else {
          setUser(u);
        }
      })
      .catch(() => base44.auth.redirectToLogin(window.location.href))
      .finally(() => setAuthChecked(true));
  }, []);

  const { data: bookings = [], isLoading: loadingBookings } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => base44.entities.Booking.list("-created_date", 100),
    enabled: !!user,
  });

  const { data: leads = [], isLoading: loadingLeads } = useQuery({
    queryKey: ["leads"],
    queryFn: () => base44.entities.ServiceRequest.list("-created_date", 100),
    enabled: !!user,
  });

  const updateBooking = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Booking.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings"] }),
  });

  const updateLead = useMutation({
    mutationFn: ({ id, data }) => base44.entities.ServiceRequest.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["leads"] }),
  });

  if (!authChecked || !user) return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
    </div>
  );

  const handleCreateQBProject = async (booking) => {
    setQbLoading(booking.id);
    try {
      const res = await base44.functions.invoke("createQuickbooksProject", { booking_id: booking.id });
      alert(`QuickBooks project created!\nProject: ${res.data.project_name}`);
    } catch (e) {
      alert("Error creating QuickBooks project: " + (e.message || "Unknown error"));
    }
    setQbLoading(null);
  };

  const filteredBookings = bookings.filter((b) => {
    const q = search.toLowerCase();
    const matchSearch =
      b.customer_name?.toLowerCase().includes(q) ||
      b.customer_phone?.toLowerCase().includes(q) ||
      b.booking_number?.toLowerCase().includes(q);
    const matchFilter = filter === "all" || b.status === filter;
    return matchSearch && matchFilter;
  });

  const filteredLeads = leads.filter((l) => {
    const q = search.toLowerCase();
    return (
      l.name?.toLowerCase().includes(q) ||
      l.phone?.toLowerCase().includes(q) ||
      l.email?.toLowerCase().includes(q)
    );
  });

  const stats = [
    { label: "Total Bookings", value: bookings.length, icon: Calendar, color: "bg-blue-50 text-blue-600" },
    { label: "Pending", value: bookings.filter((b) => b.status === "pending").length, icon: Clock, color: "bg-yellow-50 text-yellow-600" },
    { label: "Completed", value: bookings.filter((b) => b.status === "completed").length, icon: CheckCircle, color: "bg-green-50 text-green-600" },
    { label: "New Leads", value: leads.filter((l) => l.status === "new").length, icon: Users, color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-500 mt-1">Manage bookings and service requests</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              queryClient.invalidateQueries({ queryKey: ["bookings"] });
              queryClient.invalidateQueries({ queryKey: ["leads"] });
            }}
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">{stat.value}</div>
              <div className="text-slate-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("bookings")}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${tab === "bookings" ? "bg-orange-600 text-white shadow" : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"}`}
          >
            Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setTab("leads")}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${tab === "leads" ? "bg-orange-600 text-white shadow" : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"}`}
          >
            Leads ({leads.length})
          </button>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder={tab === "bookings" ? "Search bookings..." : "Search leads..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-white"
            />
          </div>
          {tab === "bookings" && (
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-10 rounded-md border border-input bg-white px-3 py-2 text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          )}
        </div>

        {/* Bookings Table */}
        {tab === "bookings" && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {loadingBookings ? (
              <div className="p-12 text-center text-slate-400">Loading bookings...</div>
            ) : filteredBookings.length === 0 ? (
              <div className="p-12 text-center text-slate-400">No bookings found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Booking #</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Customer</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Service</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Payment</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
                      </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                      {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-mono text-xs font-bold text-slate-600">{b.booking_number || "—"}</span>
                          {b.is_emergency && (
                            <span className="ml-2 text-xs bg-red-100 text-red-700 rounded px-1.5 py-0.5">EMERGENCY</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-slate-900">{b.customer_name}</div>
                          <div className="text-slate-400 text-xs">{b.customer_phone}</div>
                        </td>
                        <td className="py-3 px-4 capitalize">{b.service_type?.replace("_", " ")}</td>
                        <td className="py-3 px-4 text-slate-600">{b.preferred_date || "—"}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[b.status] || "bg-slate-100 text-slate-700"}`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2 items-center">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${b.payment_status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                              {b.payment_status || "unpaid"}
                            </span>
                            {b.payment_status !== "paid" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 text-xs text-green-700 border-green-300 hover:bg-green-50"
                                onClick={() => updateBooking.mutate({ id: b.id, data: { payment_status: "paid" } })}
                              >
                                Mark Paid
                              </Button>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2 flex-wrap">
                            {b.status === "pending" && (
                              <Button
                                size="sm"
                                className="h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={() => updateBooking.mutate({ id: b.id, data: { status: "confirmed" } })}
                              >
                                Confirm
                              </Button>
                            )}
                            {b.status === "confirmed" && b.payment_status === "paid" && (
                              <Button
                                size="sm"
                                className="h-7 text-xs bg-green-700 hover:bg-green-800 text-white"
                                disabled={qbLoading === b.id}
                                onClick={() => handleCreateQBProject(b)}
                              >
                                {qbLoading === b.id ? "Creating..." : "→ QuickBooks"}
                              </Button>
                            )}
                            {b.status === "confirmed" && (
                              <Button
                                size="sm"
                                className="h-7 text-xs bg-purple-600 hover:bg-purple-700 text-white"
                                onClick={() => updateBooking.mutate({ id: b.id, data: { status: "in_progress" } })}
                              >
                                Start
                              </Button>
                            )}
                            {b.status === "in_progress" && (
                              <Button
                                size="sm"
                                className="h-7 text-xs bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => updateBooking.mutate({ id: b.id, data: { status: "completed" } })}
                              >
                                Complete
                              </Button>
                            )}
                            {!["cancelled", "completed"].includes(b.status) && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => updateBooking.mutate({ id: b.id, data: { status: "cancelled" } })}
                              >
                                Cancel
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Leads Table */}
        {tab === "leads" && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {loadingLeads ? (
              <div className="p-12 text-center text-slate-400">Loading leads...</div>
            ) : filteredLeads.length === 0 ? (
              <div className="p-12 text-center text-slate-400">No leads found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Contact</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Service</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.map((l) => (
                      <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-medium text-slate-900">{l.name}</td>
                        <td className="py-3 px-4">
                          <div className="text-slate-700">{l.phone}</div>
                          <div className="text-slate-400 text-xs">{l.email}</div>
                        </td>
                        <td className="py-3 px-4 capitalize">{l.service_type?.replace("_", " ")}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[l.status] || "bg-slate-100 text-slate-700"}`}>
                            {l.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            {l.status === "new" && (
                              <Button
                                size="sm"
                                className="h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={() => updateLead.mutate({ id: l.id, data: { status: "contacted" } })}
                              >
                                Mark Contacted
                              </Button>
                            )}
                            {l.status === "contacted" && (
                              <Button
                                size="sm"
                                className="h-7 text-xs bg-indigo-600 hover:bg-indigo-700 text-white"
                                onClick={() => updateLead.mutate({ id: l.id, data: { status: "scheduled" } })}
                              >
                                Mark Scheduled
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}