import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, ChevronRight, ChevronLeft, Phone, Shield, Clock, UserCircle } from "lucide-react";
import { createPageUrl } from "@/utils";
import RequestCart, { CATALOG } from "@/components/booking/RequestCart";

const STEPS = ["Request Items", "Your Details", "Schedule", "Confirm"];
const TIME_SLOTS = ["7:00 AM – 10:00 AM", "10:00 AM – 1:00 PM", "1:00 PM – 4:00 PM", "4:00 PM – 7:00 PM"];
const BOOKING_FEE = 29;

export default function Booking() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const preselectedCategory = urlParams.get("category") || urlParams.get("service") || urlParams.get("product") || "";

  // Catalog slug → category name mapping for URL params
  const SLUG_TO_CATEGORY = {
    "chimney-cleaning": "Chimney Cleaning",
    "chimney-cap": "Chimney Cap",
    "round-cap": "Liner Cap",
  };
  // Categories that should NOT auto-add (require size selection)
  const NO_AUTO_ADD = new Set(["Liner Cap"]);

  const resolvedCategory = SLUG_TO_CATEGORY[preselectedCategory] || preselectedCategory;

  const buildInitialCart = () => {
    if (!resolvedCategory) return [];
    const cat = CATALOG.find(
      (c) => c.category.toLowerCase() === resolvedCategory.toLowerCase()
    );
    if (!cat) return [];
    if (NO_AUTO_ADD.has(cat.category)) return [];
    const item = cat.items[0];
    return [{ ...item, qty: 1, category: cat.category }];
  };

  const [step, setStep] = useState(0);
  const [cartItems, setCartItems] = useState(buildInitialCart);
  const [booking, setBooking] = useState({
    service_type: "installation",
    heater_type: "tank",
    customer_first_name: "",
    customer_last_name: "",
    customer_company: "",
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
    preferred_date: "",
    preferred_time: "",
    notes: "",
    is_emergency: false
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [lastBooking, setLastBooking] = useState(null);
  const [autofillDismissed, setAutofillDismissed] = useState(false);

  // Distance calculation state
  const [distanceData, setDistanceData] = useState(null); // { miles, distance_fee, over_threshold, duration_text }
  const [distanceLoading, setDistanceLoading] = useState(false);
  const [distanceError, setDistanceError] = useState(false);
  const distanceTimerRef = useRef(null);

  // Pricing calculations
  const itemsSubtotal = cartItems.reduce((s, ci) => s + ci.price * ci.qty, 0);
  const taxExpenses = itemsSubtotal * 0.15;
  const distanceFee = distanceData?.distance_fee || 0;
  const estimatedTotal = itemsSubtotal + taxExpenses + distanceFee + BOOKING_FEE;

  // Debounced distance calculation
  const calculateDistanceForAddress = useCallback(async (address) => {
    if (!address || address.trim().length < 5) return;
    setDistanceLoading(true);
    setDistanceError(false);
    try {
      const res = await base44.functions.invoke("calculateDistance", { address: address.trim() });
      if (res.data?.miles !== undefined) {
        setDistanceData(res.data);
        setDistanceError(false);
      } else {
        setDistanceError(true);
      }
    } catch {
      setDistanceError(true);
    } finally {
      setDistanceLoading(false);
    }
  }, []);

  // Trigger distance calculation when address changes (debounced 800ms)
  useEffect(() => {
    if (distanceTimerRef.current) clearTimeout(distanceTimerRef.current);
    if (!booking.customer_address || booking.customer_address.trim().length < 5) {
      setDistanceData(null);
      setDistanceError(false);
      return;
    }
    distanceTimerRef.current = setTimeout(() => {
      calculateDistanceForAddress(booking.customer_address);
    }, 800);
    return () => { if (distanceTimerRef.current) clearTimeout(distanceTimerRef.current); };
  }, [booking.customer_address, calculateDistanceForAddress]);

  useEffect(() => {
    base44.auth.me().then(async (user) => {
      if (!user) return;
      setCurrentUser(user);
      const nameParts = (user.full_name || "").split(" ");
      setBooking((b) => ({
        ...b,
        customer_first_name: b.customer_first_name || nameParts[0] || "",
        customer_last_name: b.customer_last_name || nameParts.slice(1).join(" ") || "",
        customer_email: b.customer_email || user.email || ""
      }));
      const bookings = await base44.entities.Booking.filter({ created_by: user.email }, "-created_date", 1);
      if (bookings && bookings.length > 0) setLastBooking(bookings[0]);
    }).catch(() => {});
  }, []);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const validateStep1 = () => {
    const errors = {};
    if (!booking.customer_first_name.trim()) errors.customer_first_name = "First name is required";
    if (!booking.customer_last_name.trim()) errors.customer_last_name = "Last name is required";
    const phone = booking.customer_phone.replace(/\D/g, "");
    if (phone.length !== 10) errors.customer_phone = "Phone number must be 10 digits";
    if (booking.customer_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.customer_email)) {
      errors.customer_email = "Please enter a valid email address";
    }
    if (!booking.customer_address.trim()) errors.customer_address = "Service address is required";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const buildSelectedProductString = () => {
    if (cartItems.length === 0) return "";
    return cartItems
      .map((ci) => `${ci.category} — ${ci.label} x${ci.qty} ($${ci.price * ci.qty})`)
      .join("; ");
  };

  const buildCartJson = () => {
    const items = cartItems.map((ci) => ({
      category: ci.category,
      item: ci.label,
      qty: ci.qty,
      unit_price: ci.price,
      subtotal: ci.price * ci.qty,
    }));
    const cartData = { items, subtotal: itemsSubtotal, tax_expenses_15pct: Math.round(taxExpenses * 100) / 100 };
    if (distanceData) {
      cartData.distance_miles = distanceData.miles;
      cartData.distance_fee = distanceData.distance_fee;
      cartData.distance_over_threshold = distanceData.over_threshold;
    }
    return JSON.stringify(cartData);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const fullName = `${booking.customer_first_name} ${booking.customer_last_name}`.trim();
    const ref = "KOM-" + Date.now().toString().slice(-6);
    const cartNote = cartItems.length > 0 ? `\n\n[REQUEST CART]\n${buildCartJson()}` : "";
    const created = await base44.entities.Booking.create({
      ...booking,
      customer_name: fullName,
      selected_product: buildSelectedProductString(),
      notes: (booking.notes || "") + cartNote,
      booking_number: ref,
      booking_fee: BOOKING_FEE,
      payment_status: "unpaid",
      status: "pending"
    });
    if (booking.customer_email) {
      try {
        await base44.functions.invoke("sendPendingBookingEmail", { booking_id: created.id });
      } catch (e) {
        // Email may fail for non-registered users — booking still confirmed
      }
    }
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
            We'll contact you within 2 hours to confirm your appointment. A $29 booking fee secures your slot.
          </p>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-orange-800 font-medium">
              Next Step: A KOM specialist will call you at{" "}
              <span className="font-bold">{booking.customer_phone}</span> to confirm your appointment details.
            </p>
          </div>
          <a href="tel:+17346662338">
            <Button variant="outline" className="w-full border-2 border-orange-600 text-orange-600 hover:bg-orange-50 mb-3">
              <Phone className="mr-2 w-4 h-4" /> Call Us Directly
            </Button>
          </a>
          <Button onClick={() => navigate(createPageUrl("Home"))} variant="ghost" className="w-full text-slate-500">
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
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Book a Service &amp; Diagnostic</h1>
          <p className="text-slate-500">Secure your diagnostics appointment with a $29 booking fee.</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  i < step ? "bg-orange-600 text-white" : i === step ? "bg-orange-600 text-white ring-4 ring-orange-100" : "bg-white border-2 border-slate-300 text-slate-400"
                }`}>
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-xs mt-1 font-medium hidden sm:block ${i === step ? "text-orange-600" : "text-slate-400"}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-10 sm:w-16 h-0.5 mx-1 ${i < step ? "bg-orange-600" : "bg-slate-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

          {/* STEP 0: Request Cart */}
          {step === 0 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Select Services &amp; Materials</h2>
              <RequestCart
                cartItems={cartItems}
                setCartItems={setCartItems}
                preselectedCategory={resolvedCategory}
              />
              {cartItems.length === 0 && (
                <div className="mt-5 bg-amber-50 border-2 border-amber-300 rounded-2xl p-4">
                  <div className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-1">Nothing selected yet</div>
                  <div className="text-sm text-amber-700">You can still continue to book a general diagnostics visit — our technician will assess on-site.</div>
                </div>
              )}
              <div className="flex justify-end mt-6">
                <Button onClick={next} className="bg-orange-600 hover:bg-orange-700 text-white px-8">
                  Next <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 1: Customer Details */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Contact Information</h2>
              <p className="text-slate-500 mb-6">We'll use this to confirm your diagnostics appointment.</p>

              {lastBooking && !autofillDismissed && (
                <div className="flex items-start gap-4 bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <UserCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold text-blue-900 text-sm mb-0.5">Use info from your last booking?</div>
                    <div className="text-blue-700 text-xs mb-3">{lastBooking.customer_name} · {lastBooking.customer_phone} · {lastBooking.customer_address}</div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white h-8 px-4 text-xs" onClick={() => {
                        const nameParts = (lastBooking.customer_name || "").split(" ");
                        setBooking((b) => ({
                          ...b,
                          customer_first_name: nameParts[0] || "",
                          customer_last_name: nameParts.slice(1).join(" ") || "",
                          customer_email: lastBooking.customer_email || b.customer_email,
                          customer_phone: lastBooking.customer_phone || "",
                          customer_address: lastBooking.customer_address || "",
                          customer_company: lastBooking.customer_company || ""
                        }));
                        setAutofillDismissed(true);
                      }}>Yes, use this info</Button>
                      <Button size="sm" variant="outline" className="h-8 px-4 text-xs" onClick={() => setAutofillDismissed(true)}>No thanks</Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">First Name *</label>
                    <Input placeholder="John" value={booking.customer_first_name}
                      onChange={(e) => { setBooking({ ...booking, customer_first_name: e.target.value }); setFieldErrors((p) => ({ ...p, customer_first_name: null })); }}
                      className={fieldErrors.customer_first_name ? "border-red-400" : ""} />
                    {fieldErrors.customer_first_name && <p className="text-red-500 text-xs mt-1">{fieldErrors.customer_first_name}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Last Name *</label>
                    <Input placeholder="Smith" value={booking.customer_last_name}
                      onChange={(e) => { setBooking({ ...booking, customer_last_name: e.target.value }); setFieldErrors((p) => ({ ...p, customer_last_name: null })); }}
                      className={fieldErrors.customer_last_name ? "border-red-400" : ""} />
                    {fieldErrors.customer_last_name && <p className="text-red-500 text-xs mt-1">{fieldErrors.customer_last_name}</p>}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">Company <span className="text-slate-400 font-normal">(optional)</span></label>
                  <Input placeholder="ABC Corp" value={booking.customer_company}
                    onChange={(e) => setBooking({ ...booking, customer_company: e.target.value })} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Phone Number *</label>
                    <Input placeholder="(555) 000-0000" value={booking.customer_phone}
                      onChange={(e) => { setBooking({ ...booking, customer_phone: e.target.value }); setFieldErrors((p) => ({ ...p, customer_phone: null })); }}
                      className={fieldErrors.customer_phone ? "border-red-400" : ""} />
                    {fieldErrors.customer_phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.customer_phone}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Email Address</label>
                    <Input type="email" placeholder="john@email.com" value={booking.customer_email}
                      onChange={(e) => { setBooking({ ...booking, customer_email: e.target.value }); setFieldErrors((p) => ({ ...p, customer_email: null })); }}
                      className={fieldErrors.customer_email ? "border-red-400" : ""} />
                    {fieldErrors.customer_email && <p className="text-red-500 text-xs mt-1">{fieldErrors.customer_email}</p>}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">Service Address *</label>
                  <Input placeholder="123 Main St, City, State, ZIP" value={booking.customer_address}
                    onChange={(e) => { setBooking({ ...booking, customer_address: e.target.value }); setFieldErrors((p) => ({ ...p, customer_address: null })); }}
                    className={fieldErrors.customer_address ? "border-red-400" : ""} />
                  {fieldErrors.customer_address && <p className="text-red-500 text-xs mt-1">{fieldErrors.customer_address}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">Additional Notes</label>
                  <Textarea rows={3} placeholder="Describe your chimney issue, fireplace type, or any other details..."
                    value={booking.notes}
                    onChange={(e) => setBooking({ ...booking, notes: e.target.value })} />
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={back}><ChevronLeft className="mr-1 w-4 h-4" /> Back</Button>
                <Button onClick={() => { if (validateStep1()) next(); }} className="bg-orange-600 hover:bg-orange-700 text-white px-8">
                  Next <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Schedule */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Choose Your Diagnostics Appointment</h2>
              <p className="text-slate-500 mb-6">Select a preferred date and time window to schedule an appointment with our experts.</p>
              <div className="space-y-5 mb-6">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">Preferred Date *</label>
                  <Input type="date" min={new Date().toISOString().split("T")[0]}
                    value={booking.preferred_date}
                    onChange={(e) => setBooking({ ...booking, preferred_date: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-3 block">Preferred Time Window *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {TIME_SLOTS.map((slot) => (
                      <button key={slot} onClick={() => setBooking({ ...booking, preferred_time: slot })}
                        className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                          booking.preferred_time === slot ? "border-orange-600 bg-orange-50 text-orange-700" : "border-slate-200 text-slate-600 hover:border-orange-300"
                        }`}>
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 text-blue-700 text-sm font-medium">
                  <Clock className="w-4 h-4" />
                  Need a specific time? Call us at (734) 666-2338
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={back}><ChevronLeft className="mr-1 w-4 h-4" /> Back</Button>
                <Button onClick={next} disabled={!booking.preferred_date || !booking.preferred_time}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8">
                  Review Booking <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Confirm */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Review &amp; Confirm</h2>
              <p className="text-slate-500 mb-6">Please review your booking details before confirming.</p>

              <div className="bg-slate-50 rounded-xl p-5 mb-6 space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  {cartItems.length > 0 ? (
                    <>
                      <div className="col-span-2 font-bold text-slate-700 text-xs uppercase tracking-wide mb-1">Requested Items</div>
                      {cartItems.map((ci) => (
                        <div key={ci.id} className="col-span-2 flex justify-between bg-white rounded-lg px-3 py-2 border border-slate-200">
                          <span className="text-slate-700">{ci.category} — {ci.label}{ci.qty > 1 ? ` ×${ci.qty}` : ""}</span>
                          <span className="font-semibold text-slate-900">${(ci.price * ci.qty).toLocaleString()}</span>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="col-span-2 bg-white rounded-lg px-3 py-2 border border-slate-200 text-slate-500 italic text-sm">
                      General Chimney Diagnostic — our technician will assess on-site
                    </div>
                  )}
                  <div className="text-slate-500">Name</div>
                  <div className="font-semibold text-slate-900">{booking.customer_first_name} {booking.customer_last_name}</div>
                  {booking.customer_company && <>
                    <div className="text-slate-500">Company</div>
                    <div className="font-semibold text-slate-900">{booking.customer_company}</div>
                  </>}
                  <div className="text-slate-500">Phone</div>
                  <div className="font-semibold text-slate-900">{booking.customer_phone}</div>
                  {booking.customer_email && <>
                    <div className="text-slate-500">Email</div>
                    <div className="font-semibold text-slate-900">{booking.customer_email}</div>
                  </>}
                  <div className="text-slate-500">Address</div>
                  <div className="font-semibold text-slate-900">{booking.customer_address}</div>
                  <div className="text-slate-500">Date</div>
                  <div className="font-semibold text-slate-900">{booking.preferred_date}</div>
                  <div className="text-slate-500">Time Window</div>
                  <div className="font-semibold text-slate-900">{booking.preferred_time}</div>
                </div>

                {/* Pricing Breakdown */}
                <div className="border-t border-slate-200 pt-3 mt-3 space-y-1.5">
                  <div className="flex justify-between text-slate-600">
                    <span>Items Subtotal</span>
                    <span>${itemsSubtotal.toLocaleString()}</span>
                  </div>
                  {itemsSubtotal > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>Tax &amp; Expenses (15%)</span>
                      <span>${taxExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Distance{distanceData?.miles ? ` (${distanceData.miles} mi)` : ""}</span>
                    {distanceLoading ? (
                      <span className="text-slate-400 text-xs italic">Calculating...</span>
                    ) : distanceData ? (
                      distanceData.distance_fee > 0 ? (
                        <span className="text-red-600 font-medium">${distanceData.distance_fee.toLocaleString()}</span>
                      ) : (
                        <span className="text-green-600 font-medium">$0</span>
                      )
                    ) : distanceError ? (
                      <span className="text-amber-700 text-xs italic">Distance fee pending address verification</span>
                    ) : booking.customer_address ? (
                      <span className="text-slate-400 text-xs italic">Calculating...</span>
                    ) : (
                      <span className="text-slate-400 text-xs italic">Pending address entry</span>
                    )}
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Booking Fee</span>
                    <span>${BOOKING_FEE.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-1.5">
                    <span>Estimated Total</span>
                    <span>${estimatedTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>

              {/* Booking Fee Notice */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-orange-800 mb-1">$29 Booking Fee</div>
                    <div className="text-orange-700 text-sm">
                      A $29 booking fee secures your diagnostics appointment. Our team will contact you to collect payment and confirm your appointment.
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 mb-6">
                <input type="checkbox" id="terms" checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-orange-600 cursor-pointer flex-shrink-0" />
                <label htmlFor="terms" className="text-sm text-slate-600 cursor-pointer">
                  I agree to the{" "}
                  <Link to="/TermsOfService" className="text-orange-600 underline hover:text-orange-700" target="_blank">Terms of Service</Link>{" "}
                  and{" "}
                  <Link to="/PrivacyPolicy" className="text-orange-600 underline hover:text-orange-700" target="_blank">Privacy Policy</Link>
                  , and authorize KOM Chimney Care to contact me regarding my booking.
                </label>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={back}><ChevronLeft className="mr-1 w-4 h-4" /> Back</Button>
                <Button onClick={handleSubmit} disabled={loading || !agreedToTerms}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-10 disabled:opacity-50">
                  {loading ? "Confirming..." : "Confirm Booking →"}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Trust Row */}
        <div className="flex flex-wrap justify-center gap-8 mt-10 text-slate-500 text-sm">
          {[
            { icon: Shield, text: "Licensed Vendor" },
            { icon: Clock, text: "Same-Day Available" },
            { icon: CheckCircle, text: "Satisfaction Guaranteed" }
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