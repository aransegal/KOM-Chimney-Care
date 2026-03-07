import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, ChevronRight, ChevronLeft, Phone, Shield, Clock } from "lucide-react";

const STEPS = ["Your Details", "Schedule", "Confirm"];

const SERVICE_TYPES = [
  { id: "installation", label: "New Installation", price: "$299+", desc: "Full water heater installation" },
  { id: "repair", label: "Repair / Diagnostic", price: "$89+", desc: "Fix any water heater issue" },
  { id: "maintenance", label: "Annual Maintenance", price: "$79", desc: "Keep your unit running efficiently" },
  { id: "emergency", label: "Emergency Service", price: "Call", desc: "24/7 urgent response" },
];

const HEATER_TYPES = [
  { id: "tank", label: "Tank (Traditional)" },
  { id: "tankless", label: "Tankless / On-Demand" },
  { id: "hybrid", label: "Hybrid / Heat Pump" },
  { id: "solar", label: "Solar" },
  { id: "unknown", label: "Not Sure" },
];

const TIME_SLOTS = ["7:00 AM – 10:00 AM", "10:00 AM – 1:00 PM", "1:00 PM – 4:00 PM", "4:00 PM – 7:00 PM"];

export default function Booking() {
  const [step, setStep] = useState(0);
  const [booking, setBooking] = useState({
    service_type: "",
    heater_type: "",
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
    preferred_date: "",
    preferred_time: "",
    notes: "",
    is_emergency: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setLoading(true);
    const ref = "KOM-" + Date.now().toString().slice(-6);
    const result = await base44.entities.Booking.create({
      ...booking,
      booking_number: ref,
      booking_fee: 79,
      payment_status: "unpaid",
      status: "pending",
    });
    setBookingRef(ref);
    setSubmitted(true);
    setLoading(false);
  };

  const isEmergency = booking.service_type === "emergency";

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-20 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Booking Confirmed!</h2>
          <p className="text-slate-500 mb-4">
            Your booking reference is{" "}
            <span className="font-bold text-orange-600">{bookingRef}</span>
          </p>
          <p className="text-slate-500 text-sm mb-8">
            We'll contact you within 2 hours to confirm your appointment. A $79 booking deposit secures your slot and will be applied toward your service total.
          </p>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-orange-800 font-medium">Next Step: A KOM specialist will call you at <span className="font-bold">{booking.customer_phone}</span> to confirm your appointment details.</p>
          </div>
          <a href="tel:+18005551234">
            <Button variant="outline" className="w-full border-2 border-orange-600 text-orange-600 hover:bg-orange-50 mb-3">
              <Phone className="mr-2 w-4 h-4" /> Call Us Directly
            </Button>
          </a>
          <Button onClick={() => window.location.href = "/"} variant="ghost" className="w-full text-slate-500">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Book Installation</h1>
          <p className="text-slate-500">Secure your appointment with a $79 booking fee — applied to your service total.</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    i < step
                      ? "bg-orange-600 text-white"
                      : i === step
                      ? "bg-orange-600 text-white ring-4 ring-orange-100"
                      : "bg-white border-2 border-slate-300 text-slate-400"
                  }`}
                >
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-xs mt-1 font-medium hidden sm:block ${i === step ? "text-orange-600" : "text-slate-400"}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-12 sm:w-20 h-0.5 mx-1 ${i < step ? "bg-orange-600" : "bg-slate-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          {/* STEP 0: Service Type */}
          {step === 0 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">What do you need?</h2>
              <p className="text-slate-500 mb-6">Select the type of service you're looking for.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {SERVICE_TYPES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setBooking({ ...booking, service_type: s.id, is_emergency: s.id === "emergency" })}
                    className={`text-left p-5 rounded-xl border-2 transition-all ${
                      booking.service_type === s.id
                        ? "border-orange-600 bg-orange-50"
                        : "border-slate-200 hover:border-orange-300"
                    }`}
                  >
                    <div className="font-bold text-slate-900 mb-1">{s.label}</div>
                    <div className="text-slate-500 text-sm mb-2">{s.desc}</div>
                    <div className="font-semibold text-orange-600">{s.price}</div>
                  </button>
                ))}
              </div>

              {isEmergency && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6">
                  <div className="font-bold text-red-700 mb-2">For immediate emergency service, call us now:</div>
                  <a href="tel:+18005551234">
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      <Phone className="mr-2 w-4 h-4" /> (800) 555-1234
                    </Button>
                  </a>
                  <p className="text-red-600 text-sm mt-2">You can still fill out this form and we'll call you back within 15 minutes.</p>
                </div>
              )}

              {booking.service_type && booking.service_type !== "emergency" && (
                <>
                  <div className="mb-6">
                    <h3 className="font-semibold text-slate-900 mb-3">What type of water heater?</h3>
                    <div className="flex flex-wrap gap-2">
                      {HEATER_TYPES.map((h) => (
                        <button
                          key={h.id}
                          onClick={() => setBooking({ ...booking, heater_type: h.id })}
                          className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                            booking.heater_type === h.id
                              ? "border-orange-600 bg-orange-600 text-white"
                              : "border-slate-300 text-slate-600 hover:border-orange-400"
                          }`}
                        >
                          {h.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={next}
                  disabled={!booking.service_type}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8"
                >
                  Next <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 1: Customer Details */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Contact Information</h2>
              <p className="text-slate-500 mb-6">We'll use this to confirm your appointment.</p>
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Full Name *</label>
                    <Input
                      required
                      placeholder="John Smith"
                      value={booking.customer_name}
                      onChange={(e) => setBooking({ ...booking, customer_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Phone Number *</label>
                    <Input
                      required
                      placeholder="(555) 000-0000"
                      value={booking.customer_phone}
                      onChange={(e) => setBooking({ ...booking, customer_phone: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">Email Address</label>
                  <Input
                    type="email"
                    placeholder="john@email.com"
                    value={booking.customer_email}
                    onChange={(e) => setBooking({ ...booking, customer_email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">Service Address *</label>
                  <Input
                    required
                    placeholder="123 Main St, City, State, ZIP"
                    value={booking.customer_address}
                    onChange={(e) => setBooking({ ...booking, customer_address: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">Additional Notes</label>
                  <Textarea
                    rows={3}
                    placeholder="Describe your issue, location of unit, or any other details..."
                    value={booking.notes}
                    onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={back}>
                  <ChevronLeft className="mr-1 w-4 h-4" /> Back
                </Button>
                <Button
                  onClick={next}
                  disabled={!booking.customer_name || !booking.customer_phone || !booking.customer_address}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8"
                >
                  Next <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Schedule */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Choose Your Appointment</h2>
              <p className="text-slate-500 mb-6">Select a preferred date and time window.</p>
              <div className="space-y-5 mb-6">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">Preferred Date *</label>
                  <Input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={booking.preferred_date}
                    onChange={(e) => setBooking({ ...booking, preferred_date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-3 block">Preferred Time Window *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setBooking({ ...booking, preferred_time: slot })}
                        className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                          booking.preferred_time === slot
                            ? "border-orange-600 bg-orange-50 text-orange-700"
                            : "border-slate-200 text-slate-600 hover:border-orange-300"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 text-blue-700 text-sm font-medium">
                  <Clock className="w-4 h-4" />
                  Need same-day or emergency? Call us at (800) 555-1234
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={back}>
                  <ChevronLeft className="mr-1 w-4 h-4" /> Back
                </Button>
                <Button
                  onClick={next}
                  disabled={!booking.preferred_date || !booking.preferred_time}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8"
                >
                  Review Booking <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Confirm */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Review & Confirm</h2>
              <p className="text-slate-500 mb-6">Please review your booking details before confirming.</p>

              <div className="bg-slate-50 rounded-xl p-5 mb-6 space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-slate-500">Service</div>
                  <div className="font-semibold text-slate-900 capitalize">{booking.service_type?.replace("_", " ")}</div>
                  {booking.heater_type && (
                    <>
                      <div className="text-slate-500">Heater Type</div>
                      <div className="font-semibold text-slate-900 capitalize">{booking.heater_type}</div>
                    </>
                  )}
                  <div className="text-slate-500">Name</div>
                  <div className="font-semibold text-slate-900">{booking.customer_name}</div>
                  <div className="text-slate-500">Phone</div>
                  <div className="font-semibold text-slate-900">{booking.customer_phone}</div>
                  <div className="text-slate-500">Address</div>
                  <div className="font-semibold text-slate-900">{booking.customer_address}</div>
                  <div className="text-slate-500">Date</div>
                  <div className="font-semibold text-slate-900">{booking.preferred_date}</div>
                  <div className="text-slate-500">Time Window</div>
                  <div className="font-semibold text-slate-900">{booking.preferred_time}</div>
                </div>
              </div>

              {/* Booking Fee Notice */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-orange-800 mb-1">$79 Booking Fee</div>
                    <div className="text-orange-700 text-sm">
                      A $79 booking deposit secures your appointment and is applied toward your service total. Our team will contact you to collect payment and confirm your appointment.
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={back}>
                  <ChevronLeft className="mr-1 w-4 h-4" /> Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-10"
                >
                  {loading ? "Confirming..." : "Confirm Booking →"}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Trust Row */}
        <div className="flex flex-wrap justify-center gap-8 mt-10 text-slate-500 text-sm">
          {[
            { icon: Shield, text: "Licensed & Insured" },
            { icon: Clock, text: "Same-Day Available" },
            { icon: CheckCircle, text: "Satisfaction Guaranteed" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-orange-500" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}