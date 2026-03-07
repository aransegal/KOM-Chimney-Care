import { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, ChevronRight, ChevronLeft, Phone, Shield, Clock } from "lucide-react";
import { createPageUrl } from "@/utils";

const STEPS = ["Choose Product", "Your Details", "Schedule", "Confirm"];

const TIME_SLOTS = ["7:00 AM – 10:00 AM", "10:00 AM – 1:00 PM", "1:00 PM – 4:00 PM", "4:00 PM – 7:00 PM"];

const PRODUCT_IMAGE = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c9ea61bf0c459e3994bae/d217301d4_image.png";

const products = [
{ name: "Electric 40 Gallon", price: "$1,895" },
{ name: "Electric 50 Gallon", price: "$1,995" },
{ name: "Gas 40 Gallon", price: "$2,095" },
{ name: "Gas 50 Gallon", price: "$2,195", popular: true },
{ name: "Electric Power Vent 40 Gallon", price: "$2,695" },
{ name: "Electric Power Vent 50 Gallon", price: "$2,795" },
{ name: "Gas Power Vent 40 Gallon", price: "$2,895" },
{ name: "Gas Power Vent 50 Gallon", price: "$2,995" }];


export default function Booking() {
  const urlParams = new URLSearchParams(window.location.search);
  const preselectedProduct = urlParams.get("product") || "";
  const preselectedPrice = urlParams.get("price") || "";

  const [step, setStep] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(
    preselectedProduct ? { name: preselectedProduct, price: preselectedPrice } : null
  );
  const [booking, setBooking] = useState({
    service_type: "installation",
    heater_type: "tank",
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
    preferred_date: "",
    preferred_time: "",
    notes: preselectedProduct ? `Product: ${preselectedProduct} (${preselectedPrice})` : "",
    is_emergency: false
  });
  const [confirmNoProduct, setConfirmNoProduct] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setLoading(true);
    const ref = "KOM-" + Date.now().toString().slice(-6);
    await base44.entities.Booking.create({
      ...booking,
      booking_number: ref,
      booking_fee: 79,
      payment_status: "unpaid",
      status: "pending"
    });
    setBookingRef(ref);
    setSubmitted(true);
    setLoading(false);
  };

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
          <a href="tel:+13138040844">
            <Button variant="outline" className="w-full border-2 border-orange-600 text-orange-600 hover:bg-orange-50 mb-3">
              <Phone className="mr-2 w-4 h-4" /> Call Us Directly
            </Button>
          </a>
          <Button onClick={() => window.location.href = "/"} variant="ghost" className="w-full text-slate-500">
            Back to Home
          </Button>
        </div>
      </div>);

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
          {STEPS.map((label, i) =>
          <div key={label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                i < step ?
                "bg-orange-600 text-white" :
                i === step ?
                "bg-orange-600 text-white ring-4 ring-orange-100" :
                "bg-white border-2 border-slate-300 text-slate-400"}`
                }>

                  {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-xs mt-1 font-medium hidden sm:block ${i === step ? "text-orange-600" : "text-slate-400"}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 &&
            <div className={`w-10 sm:w-16 h-0.5 mx-1 ${i < step ? "bg-orange-600" : "bg-slate-200"}`} />
            }
            </div>
          )}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

          {/* STEP 0: Chosen Installation */}
          {step === 0 &&
          <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Choose Product</h2>
              {selectedProduct ?
            <>
                  <p className="text-slate-500 mb-6">You selected the following product. You can change your selection below.</p>
                  {/* Selected product highlight */}
                  <div className="flex items-center gap-5 bg-green-50 border-2 border-green-600 rounded-2xl p-5 mb-6">
                    <img src={PRODUCT_IMAGE} alt={selectedProduct.name} className="h-24 object-contain flex-shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">Selected</div>
                      <div className="text-xl font-extrabold text-slate-900">{selectedProduct.name}</div>
                      <div className="text-2xl font-extrabold text-green-700 mt-1">{selectedProduct.price}</div>
                    </div>
                    <button
                  onClick={() => setSelectedProduct(null)}
                  className="ml-auto text-sm text-slate-400 hover:text-slate-700 underline">

                      Change
                    </button>
                  </div>
                </> :

            <>
                  <p className="text-slate-500 mb-6">Select a product to install or skip to continue without a specific selection.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {products.map((product) =>
                <button
                  key={product.name}
                  onClick={() => {
                    setSelectedProduct(product);
                    setBooking((b) => ({ ...b, notes: `Product: ${product.name} (${product.price})` }));
                  }}
                  className={`relative rounded-xl border-2 overflow-hidden flex flex-col transition-all hover:shadow-md text-left ${
                  product.popular ? "border-green-600" : "border-slate-200 hover:border-green-400"}`
                  }>

                        {product.popular &&
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase whitespace-nowrap z-10">
                            Most Popular
                          </div>
                  }
                        <div className={`flex items-center justify-center p-3 pt-7 ${product.popular ? "bg-green-50" : "bg-slate-50"}`}>
                          <img src={PRODUCT_IMAGE} alt={product.name} className="h-20 object-contain" />
                        </div>
                        <div className={`p-3 flex flex-col flex-1 ${product.popular ? "bg-gradient-to-br from-green-700 to-green-800 text-white" : "bg-white"}`}>
                          <p className={`text-xs font-semibold mb-1 leading-snug ${product.popular ? "text-green-100" : "text-slate-700"}`}>
                            {product.name}
                          </p>
                          <p className={`text-lg font-extrabold ${product.popular ? "text-white" : "text-slate-900"}`}>
                            {product.price}
                          </p>
                        </div>
                      </button>
                )}
                  </div>
                </>
            }
              {confirmNoProduct &&
                <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-4 text-center">
                  <p className="text-amber-800 font-medium mb-3">Continue without choosing a product?</p>
                  <div className="flex justify-center gap-3">
                    <Button variant="outline" onClick={() => setConfirmNoProduct(false)}>
                      <ChevronLeft className="mr-1 w-4 h-4" /> Back
                    </Button>
                    <Button onClick={() => { setConfirmNoProduct(false); next(); }} className="bg-orange-600 hover:bg-orange-700 text-white">
                      Yes <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              }
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => window.location.href = "/#pricing"}>
                  <ChevronLeft className="mr-1 w-4 h-4" /> Back
                </Button>
                <Button
                onClick={() => { if (!selectedProduct) { setConfirmNoProduct(true); } else { next(); } }}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8">

                  Next <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </div>
            </div>
          }

          {/* STEP 1: Customer Details */}
          {step === 1 &&
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
                    onChange={(e) => setBooking({ ...booking, customer_name: e.target.value })} />

                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Phone Number *</label>
                    <Input
                    required
                    placeholder="(555) 000-0000"
                    value={booking.customer_phone}
                    onChange={(e) => setBooking({ ...booking, customer_phone: e.target.value })} />

                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">Email Address</label>
                  <Input
                  type="email"
                  placeholder="john@email.com"
                  value={booking.customer_email}
                  onChange={(e) => setBooking({ ...booking, customer_email: e.target.value })} />

                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">Service Address *</label>
                  <Input
                  required
                  placeholder="123 Main St, City, State, ZIP"
                  value={booking.customer_address}
                  onChange={(e) => setBooking({ ...booking, customer_address: e.target.value })} />

                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">Additional Notes</label>
                  <Textarea
                  rows={3}
                  placeholder="Describe your issue, location of unit, or any other details..."
                  value={booking.notes}
                  onChange={(e) => setBooking({ ...booking, notes: e.target.value })} />

                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={back}>
                  <ChevronLeft className="mr-1 w-4 h-4" /> Back
                </Button>
                <Button
                onClick={next}
                disabled={!booking.customer_name || !booking.customer_phone || !booking.customer_address}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8">

                  Next <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </div>
            </div>
          }

          {/* STEP 2: Schedule */}
          {step === 2 &&
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
                  onChange={(e) => setBooking({ ...booking, preferred_date: e.target.value })} />

                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-3 block">Preferred Time Window *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {TIME_SLOTS.map((slot) =>
                  <button
                    key={slot}
                    onClick={() => setBooking({ ...booking, preferred_time: slot })}
                    className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                    booking.preferred_time === slot ?
                    "border-orange-600 bg-orange-50 text-orange-700" :
                    "border-slate-200 text-slate-600 hover:border-orange-300"}`
                    }>

                        {slot}
                      </button>
                  )}
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 text-blue-700 text-sm font-medium">
                  <Clock className="w-4 h-4" />
                  Need same-day or emergency? Call us at (313) 804-0844
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={back}>
                  <ChevronLeft className="mr-1 w-4 h-4" /> Back
                </Button>
                <Button
                onClick={next}
                disabled={!booking.preferred_date || !booking.preferred_time}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8">

                  Review Booking <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </div>
            </div>
          }

          {/* STEP 3: Confirm */}
          {step === 3 &&
          <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Review & Confirm</h2>
              <p className="text-slate-500 mb-6">Please review your booking details before confirming.</p>

              <div className="bg-slate-50 rounded-xl p-5 mb-6 space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  {selectedProduct &&
                <>
                      <div className="text-slate-500">Product</div>
                      <div className="font-semibold text-slate-900">{selectedProduct.name} — {selectedProduct.price}</div>
                    </>
                }
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
                className="bg-orange-600 hover:bg-orange-700 text-white px-10">

                  {loading ? "Confirming..." : "Confirm Booking →"}
                </Button>
              </div>
            </div>
          }
        </div>

        {/* Trust Row */}
        <div className="flex flex-wrap justify-center gap-8 mt-10 text-slate-500 text-sm">
          {[
          { icon: Shield, text: "Licensed & Insured" },
          { icon: Clock, text: "Same-Day Available" },
          { icon: CheckCircle, text: "Satisfaction Guaranteed" }].
          map(({ icon: Icon, text }) =>
          <div key={text} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-orange-500" />
              {text}
            </div>
          )}
        </div>
      </div>
    </div>);

}