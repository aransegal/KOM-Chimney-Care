import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone } from "lucide-react";

// Swap image URLs here at any time — one place per service. Omit a key to hide its image.
const TILE_IMAGES = {
  cleaning: "https://images.unsplash.com/photo-1594560225349-7d4541d32e87?w=600&q=80",
};

// autoAdd: true  → first item is pre-added in the cart
// autoAdd: false → category opens but customer must choose size
const services = [
{
  key: "cleaning",
  name: "Chimney Cleaning",
  description: "Professional removal of creosote, soot, and debris from your flue liner and firebox. Safe use starts here.",
  startingFrom: "$299",
  bookParam: "chimney-cleaning",
  autoAdd: true
},
{
  key: "cap",
  name: "Chimney Cap",
  description: "Standard square chimney cap installation or replacement. Protects against water, animals, and debris entry.",
  startingFrom: "$329",
  bookParam: "chimney-cap",
  autoAdd: true
},
{
  key: "roundCap",
  name: "Round Cap",
  description: "Stainless round chimney cap in sizes 4 to 10 inch. Special-order sizes available. Technician verifies fit on site.",
  startingFrom: "$289",
  bookParam: "round-cap",
  autoAdd: false
},
{
  key: "capLiner",
  name: "Flue Liner",
  description: "Flue cap liner in sizes 4 to 10 inch. Special-order sizes available. Technician measures and confirms correct size on site.",
  startingFrom: "$499",
  bookParam: "cap-liner",
  autoAdd: false
}];


export default function ServicesPricingSection() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-slate-900 mb-3 text-4xl font-extrabold text-center sm:text-5xl">Our Services</h2>
        <p className="text-center text-slate-500 text-lg mb-4 max-w-2xl mx-auto">
          Select the service or material you believe you need. Our technician will inspect, verify fit and sizing, and confirm final pricing on site.
        </p>

        {/* Service tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {services.map((service) =>
          <div
            key={service.key}
            className="rounded-2xl border-2 border-slate-200 hover:border-green-600 hover:shadow-xl hover:shadow-green-700/10 overflow-hidden flex flex-col transition-all duration-300 bg-white">
            
              {/* Image */}
              {TILE_IMAGES[service.key] && (
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                  src={TILE_IMAGES[service.key]}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {e.target.style.display = "none";}} />
                
                </div>
              )}

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <h3 className="text-slate-900 font-extrabold text-lg mb-2 leading-tight">{service.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-700 font-bold text-base">Starting from {service.startingFrom}</span>
                </div>
                <Link
                to={`${createPageUrl("Booking")}?category=${encodeURIComponent(service.bookParam)}`}
                className="mt-4 block">
                
                  <Button size="sm" className="bg-green-700 hover:bg-green-800 text-white w-full font-semibold">
                    Book &amp; Verify
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-slate-400 text-sm mb-16 italic">
          Final fit, sizing, and pricing are verified by the technician during the diagnostic visit.
        </p>

        {/* Transparent Pricing */}
        <div className="text-center mt-4">
          <span className="text-green-700 font-semibold text-sm tracking-widest uppercase mb-3 block">Transparent Pricing</span>
          <h2 className="text-slate-900 mb-5 text-4xl font-extrabold text-center sm:text-5xl">No Hidden Fees. Ever.</h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            We believe in honest, upfront pricing. A{" "}
            <span className="font-bold text-green-700">$79 booking fee</span> secures your diagnostics appointment — applied toward your service total.
          </p>
        </div>

        {/* Emergency */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
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

      </div>
    </section>);

}