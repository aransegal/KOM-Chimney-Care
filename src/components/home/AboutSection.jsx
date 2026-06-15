import { useState, useEffect } from "react";
import { Shield, Award, Users, ThumbsUp } from "lucide-react";

const images = [
"https://media.base44.com/images/public/6a17301a1292b55206aaf2b1/61449718c_Before_After_1.png",
"https://media.base44.com/images/public/6a17301a1292b55206aaf2b1/434d400d4_Before_After_2.png",
"https://media.base44.com/images/public/6a17301a1292b55206aaf2b1/6b2f8392e_Before_After_3.png",
"https://media.base44.com/images/public/6a17301a1292b55206aaf2b1/817288d1d_Before_After_4.png",
"https://media.base44.com/images/public/6a17301a1292b55206aaf2b1/7ce447c9c_Before_After_6.png",
"https://media.base44.com/images/public/6a17301a1292b55206aaf2b1/41da42644_Before_After_7.png",
];


const stats = [
{ value: "5+", label: "Years in Business" },
{ value: "8,400+", label: "Jobs Completed" },
{ value: "4.9★", label: "Average Rating" },
{ value: "100%", label: "Licensed Vendor" }];


const values = [
{
  icon: Shield,
  title: "Safety First",
  description: "Every cleaning and inspection follows strict safety codes. All our technicians are fully licensed and regularly trained."
},
{
  icon: Award,
  title: "Quality Work",
  description: "We use industry-approved methods and equipment to ensure your chimney is clean, safe, and code-compliant."
},
{
  icon: Users,
  title: "Honest & Transparent",
  description: "No surprise fees, no upselling. We diagnose the problem, explain your options, and let you decide."
},
{
  icon: ThumbsUp,
  title: "Customer First",
  description: "We're not done until you're completely satisfied. Our job warranty backs up every service we perform."
}];


function Slideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px]">
      {images.map((src, i) =>
      <img
        key={src}
        src={src}
        alt={`Before & After ${i + 1}`}
        className="absolute inset-0 w-full h-full object-contain"
        style={{
          opacity: i === current ? 1 : 0,
          transition: "opacity 0.75s ease-in-out"
        }} />

      )}
    </div>);

}

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <span className="text-orange-600 mb-3 text-4xl font-semibold text-center uppercase tracking-widest block">ABOUT US</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6">
              Your Neighborhood Chimney Care Specialists
            </h2>
            <p className="text-slate-600 mb-6 text-xl font-medium leading-relaxed">KOM Chimney Care was founded with one mission: provide homeowners and businesses with fast, honest, and expertly executed chimney cleaning and inspection services at a fair price.</p>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm text-center">
                  <div className="text-3xl font-extrabold text-green-700">{stat.value}</div>
                  <div className="text-slate-500 text-sm mt-1">{stat.label}</div>
                </div>
              ))




              }
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl bg-slate-100">
            <Slideshow />
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) =>
          <div key={value.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-orange-200 hover:shadow-md transition-all">
              <div className="w-11 h-11 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <value.icon className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{value.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{value.description}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}