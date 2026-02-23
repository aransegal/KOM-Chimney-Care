import { Shield, Award, Users, ThumbsUp } from "lucide-react";

const stats = [
  { value: "15+", label: "Years in Business" },
  { value: "8,400+", label: "Jobs Completed" },
  { value: "4.9★", label: "Average Rating" },
  { value: "100%", label: "Licensed & Insured" },
];

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description: "Every installation and repair follows strict safety codes. All our technicians are fully licensed and regularly trained.",
  },
  {
    icon: Award,
    title: "Quality Work",
    description: "We use only manufacturer-approved parts and proven methods to ensure your water heater runs reliably for years.",
  },
  {
    icon: Users,
    title: "Honest & Transparent",
    description: "No surprise fees, no upselling. We diagnose the problem, explain your options, and let you decide.",
  },
  {
    icon: ThumbsUp,
    title: "Customer First",
    description: "We're not done until you're completely satisfied. Our job warranty backs up every service we perform.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <span className="text-orange-600 font-semibold text-sm tracking-widest uppercase mb-3 block">Who We Are</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6">
              Your Neighborhood Water Heater Specialists
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              KOM Water Heaters was founded with one mission: provide homeowners and businesses with fast, honest, and expertly executed water heater services at a fair price.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Over the past 15 years, we've grown from a small family operation to a trusted regional provider — but our commitment to treating every customer like a neighbor has never changed.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
                  <div className="text-3xl font-extrabold text-orange-600 mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80"
                alt="KOM technician at work"
                className="w-full h-[480px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-orange-600 text-white rounded-xl p-5 shadow-xl">
              <div className="text-3xl font-extrabold mb-1">15+</div>
              <div className="text-orange-100 text-sm">Years of trusted service</div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <div key={value.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-orange-200 hover:shadow-md transition-all">
              <div className="w-11 h-11 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <value.icon className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{value.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}