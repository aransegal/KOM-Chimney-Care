import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone } from "lucide-react";

const plans = [
  {
    name: "Basic Repair",
    price: "$89",
    unit: "starting",
    description: "Diagnosis + standard repair for most common water heater issues.",
    features: [
      "System diagnostic",
      "Thermostat replacement",
      "Pilot light repair",
      "Pressure relief valve",
      "90-day labor warranty",
    ],
    cta: "Book Now",
    ctaLink: true,
    highlight: false,
  },
  {
    name: "New Installation",
    price: "$299",
    unit: "starting",
    description: "Full water heater installation including haul-away of your old unit.",
    features: [
      "Removal of old unit",
      "All brand installs",
      "Permit handling",
      "Final inspection",
      "1-year labor warranty",
      "Same-day available",
    ],
    cta: "Book Installation",
    ctaLink: true,
    highlight: true,
  },
  {
    name: "Annual Maintenance",
    price: "$79",
    unit: "per year",
    description: "Keep your water heater running at peak performance all year long.",
    features: [
      "Full flush & clean",
      "Anode rod inspection",
      "Safety valve test",
      "Efficiency check",
      "Written report",
    ],
    cta: "Book Maintenance",
    ctaLink: true,
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-green-700 font-semibold text-sm tracking-widest uppercase mb-3 block">Transparent Pricing</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5">
            No Hidden Fees. Ever.
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            We believe in honest, upfront pricing. A{" "}
            <span className="font-bold text-green-700">$79 booking fee</span> secures your appointment — applied toward your service total.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 flex flex-col relative ${
                plan.highlight
                  ? "bg-gradient-to-br from-green-700 to-green-800 text-white shadow-2xl shadow-green-200 scale-105"
                  : "bg-slate-50 border border-slate-200 text-slate-900"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-wide uppercase">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-end gap-1 mb-3">
                  <span className={`text-4xl font-extrabold ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm pb-1 ${plan.highlight ? "text-green-200" : "text-slate-500"}`}>
                    {plan.unit}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed ${plan.highlight ? "text-green-100" : "text-slate-500"}`}>
                  {plan.description}
                </p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <CheckCircle className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? "text-green-200" : "text-green-600"}`} />
                    <span className={plan.highlight ? "text-orange-50" : "text-slate-600"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to={createPageUrl("Booking")}>
                <Button
                  className={`w-full h-12 font-semibold ${
                    plan.highlight
                      ? "bg-white text-green-700 hover:bg-green-50"
                      : "bg-green-700 hover:bg-green-800 text-white"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-slate-900 text-lg mb-1">Need Emergency Service?</h4>
            <p className="text-slate-600 text-sm">Our emergency team is available 24/7 including weekends and holidays. Call for immediate pricing.</p>
          </div>
          <a href="tel:+18005551234" className="flex-shrink-0">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 h-12">
              <Phone className="mr-2 w-4 h-4" />
              Call Emergency Line
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}