import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, AlertTriangle, Search, Flame, Shield, Wrench, Droplets, Wind, Layers, CalendarCheck } from "lucide-react";

const services = [
  {
    name: "Chimney Inspection",
    description: "Level 1 & Level 2 inspections. Recommended annually and required when buying or selling a home.",
    price: "Starting from $79",
    popular: false,
    icon: Search,
  },
  {
    name: "Chimney Cleaning / Sweep",
    description: "Professional removal of creosote, soot, and debris from your flue liner and firebox.",
    price: "Quote after inspection",
    popular: true,
    icon: Layers,
  },
  {
    name: "Fireplace & Chimney Safety Check",
    description: "Full system review — damper, crown, cap, flashing, liner, and firebox condition.",
    price: "Starting from $79",
    popular: false,
    icon: Shield,
  },
  {
    name: "Chimney Cap / Animal Guard",
    description: "Installation or replacement of chimney caps and animal guards to prevent water, debris, and animal entry.",
    price: "Quote after inspection",
    popular: false,
    icon: Wrench,
  },
  {
    name: "Chimney Leak Assessment",
    description: "Diagnosis of water intrusion — crown, flashing, cap, masonry, or liner. Full written report provided.",
    price: "Starting from $79",
    popular: false,
    icon: Droplets,
  },
  {
    name: "Smoke / Draft Problem Diagnosis",
    description: "Identify and resolve backdraft, negative pressure, or blocked flue causing smoke to enter the home.",
    price: "Starting from $79",
    popular: false,
    icon: Wind,
  },
  {
    name: "Creosote Buildup Cleaning",
    description: "Heavy-duty cleaning for Stage 2 and Stage 3 creosote. Required before safe fireplace use.",
    price: "Quote after inspection",
    popular: false,
    icon: Flame,
  },
  {
    name: "Annual Chimney Maintenance",
    description: "Comprehensive annual cleaning + inspection package. Best value for regular fireplace users.",
    price: "Quote after inspection",
    popular: false,
    icon: CalendarCheck,
  },
];

const serviceFeatures = [
  "Licensed & insured technicians",
  "Written inspection report",
  "Same-day available",
  "Drop cloths & vacuumed cleanup",
  "3-month labor warranty",
  "All fireplace types",
  "Photo documentation included",
];

export default function ServicesPricingSection() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-slate-900 mb-3 text-4xl font-extrabold text-center sm:text-5xl">Our Services</h2>
        <p className="text-center text-slate-500 text-lg mb-5 max-w-2xl mx-auto">Professional chimney cleaning, inspection, and fireplace safety services.</p>

        {/* What's included */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-2 mb-10 max-w-2xl mx-auto">
          {serviceFeatures.map((f) => (
            <div key={f} className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="text-sm text-slate-600">{f}</span>
            </div>
          ))}
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.name}
                className="relative rounded-2xl border-2 overflow-hidden flex flex-col transition-all hover:shadow-xl hover:shadow-green-700/30 border-slate-200 hover:border-green-700"
              >
                {service.popular ? (
                  <div className="text-center pt-2 px-2">
                    <span className="bg-green-900 text-green-50 px-3 py-1 font-bold uppercase tracking-wide rounded-full inline-block whitespace-nowrap text-xs">MOST POPULAR</span>
                  </div>
                ) : (
                  <div className="pt-2 px-2">
                    <span className="inline-block text-[10px] px-3 py-1">&nbsp;</span>
                  </div>
                )}

                {/* Icon */}
                <div className="flex items-center justify-center pt-4 pb-2">
                  <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-green-700" />
                  </div>
                </div>

                {/* Title */}
                <div className="text-center pt-1 px-3">
                  <p className="text-slate-800 text-base font-bold leading-snug">{service.name}</p>
                </div>

                {/* Description */}
                <div className="px-3 pt-2 flex-1">
                  <p className="text-slate-500 text-xs leading-relaxed text-center">{service.description}</p>
                </div>

                {/* Price & CTA */}
                <div className="p-4 flex flex-col bg-white justify-end">
                  <p className="text-sm font-semibold mb-3 text-green-700 text-center">{service.price}</p>
                  <Link to={createPageUrl("Booking") + `?service=${encodeURIComponent(service.name)}&price=${encodeURIComponent(service.price)}`}>
                    <Button size="sm" className="bg-green-700 text-white px-3 text-sm font-semibold rounded-md w-full hover:bg-green-800">
                      Book Service
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Emergency */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-xl mb-1">Emergency Service</h3>
              <p className="text-slate-600 text-sm">Smoke in the home, suspected chimney fire, or unsafe conditions? Our emergency team is available 24/7 including weekends and holidays.</p>
            </div>
          </div>
          <a href="tel:+17346662338" className="flex-shrink-0">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 h-12">
              <Phone className="mr-2 w-4 h-4" />
              Call Emergency Line
            </Button>
          </a>
        </div>

        {/* Transparent Pricing */}
        <div className="text-center mt-16">
          <span className="text-green-700 font-semibold text-sm tracking-widest uppercase mb-3 block">Transparent Pricing</span>
          <h2 className="text-slate-900 mb-5 text-4xl font-extrabold text-center sm:text-5xl">No Hidden Fees. Ever.</h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            We believe in honest, upfront pricing. A{" "}
            <span className="font-bold text-green-700">$79 booking fee</span> secures your diagnostics appointment — applied toward your service total.
          </p>
        </div>

      </div>
    </section>
  );
}