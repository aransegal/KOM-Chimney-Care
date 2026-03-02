import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Shield, Zap } from "lucide-react";

const products = [
  {
    name: "Electric 40 Gallon",
    price: "$1,895",
    image: "https://images.thdstatic.com/productImages/6b0c4a1f-1b2e-4b2e-8b2e-1b2e4b2e8b2e/svn/ge-electric-tank-water-heaters-ge40t08dat-64_600.jpg",
    imageUrl: "https://www.geappliances.com/content/dam/geappliances/product-images/water-heaters/electric-tank/GE40T08DAT-large.png",
    alt: "GE Electric 40 Gallon Tank Water Heater",
    type: "Electric",
    gallons: "40 Gal",
  },
  {
    name: "Electric 50 Gallon",
    price: "$1,995",
    imageUrl: "https://www.geappliances.com/content/dam/geappliances/product-images/water-heaters/electric-tank/GE50T12BLM-large.png",
    alt: "GE Electric 50 Gallon Tank Water Heater",
    type: "Electric",
    gallons: "50 Gal",
  },
  {
    name: "Gas 40 Gallon",
    price: "$2,095",
    imageUrl: "https://www.geappliances.com/content/dam/geappliances/product-images/water-heaters/gas-tank/GG40T12BXR-large.png",
    alt: "GE Gas 40 Gallon Tank Water Heater",
    type: "Gas",
    gallons: "40 Gal",
  },
  {
    name: "Gas 50 Gallon",
    price: "$2,195",
    imageUrl: "https://www.geappliances.com/content/dam/geappliances/product-images/water-heaters/gas-tank/GG50T10BXR-large.png",
    alt: "GE Gas 50 Gallon Tank Water Heater",
    type: "Gas",
    gallons: "50 Gal",
  },
  {
    name: "Electric Power Vent 40 Gallon",
    price: "$2,695",
    imageUrl: "https://www.geappliances.com/content/dam/geappliances/product-images/water-heaters/heat-pump/PH40S10BPY-large.png",
    alt: "GE Electric Power Vent 40 Gallon Hybrid Heat Pump Water Heater",
    type: "Electric Power Vent",
    gallons: "40 Gal",
  },
  {
    name: "Electric Power Vent 50 Gallon",
    price: "$2,795",
    imageUrl: "https://www.geappliances.com/content/dam/geappliances/product-images/water-heaters/heat-pump/PH50S10BPY-large.png",
    alt: "GE Electric Power Vent 50 Gallon Hybrid Heat Pump Water Heater",
    type: "Electric Power Vent",
    gallons: "50 Gal",
  },
  {
    name: "Gas Power Vent 40 Gallon",
    price: "$2,895",
    imageUrl: "https://www.geappliances.com/content/dam/geappliances/product-images/water-heaters/gas-power-vent/GG40T08AYV-large.png",
    alt: "GE Gas Power Vent 40 Gallon Water Heater",
    type: "Gas Power Vent",
    gallons: "40 Gal",
  },
  {
    name: "Gas Power Vent 50 Gallon",
    price: "$2,995",
    imageUrl: "https://www.geappliances.com/content/dam/geappliances/product-images/water-heaters/gas-power-vent/GG50T08AYV-large.png",
    alt: "GE Gas Power Vent 50 Gallon Water Heater",
    type: "Gas Power Vent",
    gallons: "50 Gal",
  },
];

// Reliable fallback images from known-good CDN URLs
const fallbackImages = {
  "Electric": "https://tse3.mm.bing.net/th/id/OIP.N8WX4ExQCPPvhUOJX2wbawHaHt?pid=Api",
  "Gas": "https://tse1.mm.bing.net/th/id/OIP.Jk8QMbZN0u1v0G_6nJdz8AHaHa?pid=Api",
  "Electric Power Vent": "https://tse4.mm.bing.net/th/id/OIP.p2YJLvEFpTkqcpS1u6v3TgHaHa?pid=Api",
  "Gas Power Vent": "https://tse2.mm.bing.net/th/id/OIP.V1G2FJNmbmEMVLyPkpgYzQHaHa?pid=Api",
};

const typeColors = {
  "Electric": "bg-blue-50 text-blue-700 border-blue-200",
  "Gas": "bg-orange-50 text-orange-700 border-orange-200",
  "Electric Power Vent": "bg-purple-50 text-purple-700 border-purple-200",
  "Gas Power Vent": "bg-green-50 text-green-700 border-green-200",
};

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">
      <div className="bg-slate-50 flex items-center justify-center p-6 h-48">
        <img
          src={product.imageUrl}
          alt={product.alt}
          className="h-full object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImages[product.type] || fallbackImages["Electric"];
          }}
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${typeColors[product.type]}`}>
            {product.type}
          </span>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            {product.gallons}
          </span>
        </div>
        <h4 className="font-bold text-slate-900 mb-3 text-base">{product.name}</h4>
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-2xl font-extrabold text-green-700">{product.price}</span>
          <Link to={createPageUrl("Booking")}>
            <Button size="sm" className="bg-green-700 hover:bg-green-800 text-white">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPricingSection() {
  return (
    <section id="services-pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-green-700 font-semibold text-sm tracking-widest uppercase mb-3 block">What We Offer</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5">
            Services & Pricing
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Two focused services, transparent pricing, no surprises.
          </p>
        </div>

        {/* Trust Badge */}
        <div className="bg-green-50 border border-green-200 rounded-2xl px-8 py-5 flex flex-col sm:flex-row items-center gap-4 mb-16 text-center sm:text-left">
          <Shield className="w-8 h-8 text-green-700 flex-shrink-0" />
          <div>
            <p className="font-bold text-slate-900 text-lg">No Hidden Fees. Ever.</p>
            <p className="text-slate-600 text-sm">
              We believe in honest, upfront pricing. A{" "}
              <span className="font-bold text-green-700">$79 booking fee</span> secures your appointment — applied toward your service total.
            </p>
          </div>
        </div>

        {/* Service 1: New Installation */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">New Water Heater Tank Installation</h3>
          </div>
          <p className="text-slate-500 mb-8 ml-[52px]">
            Full installation including removal of your old unit, permitting, and final inspection. All prices are all-inclusive.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </div>

        {/* Service 2: Emergency Service */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <Phone className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Emergency Service</h3>
          </div>
          <p className="text-slate-500 mb-6 ml-[52px]">
            Water heater failure can't wait. Our emergency team is on call 24/7 — weekends and holidays included.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-3">
              {["24/7 availability — weekends & holidays", "Arrival within 2 hours", "Call for immediate pricing"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-slate-700 text-sm">
                  <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <a href="tel:+18005551234" className="flex-shrink-0">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-10 h-14 text-base font-semibold shadow-lg shadow-red-200">
                <Phone className="mr-2 w-5 h-5" />
                Call Emergency Line
              </Button>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}