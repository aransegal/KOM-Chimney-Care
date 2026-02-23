import { CheckCircle, Flame } from "lucide-react";

const products = [
  {
    name: "KOM Classic Series",
    type: "Tank Water Heaters",
    sizes: "30 – 80 gallons",
    warranty: "6-year",
    description: "Reliable, high-efficiency tank heaters for everyday residential use.",
    badge: "Best Value",
  },
  {
    name: "KOM Infinite Series",
    type: "Tankless Water Heaters",
    sizes: "6 – 11 GPM",
    warranty: "12-year",
    description: "On-demand hot water with 98% efficiency. Never run out of hot water again.",
    badge: "Most Efficient",
  },
  {
    name: "KOM Hybrid Pro",
    type: "Heat Pump Water Heaters",
    sizes: "50 – 80 gallons",
    warranty: "10-year",
    description: "Up to 4x more efficient than traditional electric heaters. Qualifies for federal tax credits.",
    badge: "Eco Choice",
  },
];

const benefits = [
  "NSF & Energy Star certified products",
  "Available exclusively through authorized KOM dealers",
  "Industry-leading warranty coverage",
  "Smart home compatible models available",
  "Manufactured to meet US safety standards",
];

export default function KomUsaSection() {
  return (
    <section id="kom-usa" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-orange-600 font-semibold text-sm tracking-widest uppercase mb-3 block">Our Brand Partner</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5">
            Authorized KOM USA Dealer
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            As a certified KOM USA dealer, we install and service the full lineup of KOM water heaters — backed by manufacturer warranties and factory-trained technicians.
          </p>
        </div>

        {/* KOM Brand Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 lg:p-12 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl" />
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Flame className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">KOM USA</div>
                  <div className="text-orange-400 text-sm">Premium Water Heating Solutions</div>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                KOM USA is a leading American water heater manufacturer known for superior build quality, energy efficiency, and industry-best warranties. Their products are engineered for the demands of modern homes and businesses.
              </p>
              <ul className="space-y-2">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { val: "50+", label: "Models" },
                  { val: "12yr", label: "Max Warranty" },
                  { val: "98%", label: "Efficiency" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold text-orange-400">{s.val}</div>
                    <div className="text-xs text-slate-400 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.name} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-orange-200 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100 rounded-full px-3 py-1">
                    {product.badge}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-medium">{product.warranty} warranty</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{product.name}</h3>
              <div className="text-sm font-medium text-orange-600 mb-2">{product.type}</div>
              <div className="text-xs text-slate-400 mb-4">Available sizes: {product.sizes}</div>
              <p className="text-slate-500 text-sm leading-relaxed">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}