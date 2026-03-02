import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Wrench, Zap, Shield, Settings, ChevronRight } from "lucide-react";

const services = [
{
  icon: Zap,
  title: "New Installation",
  description: "Expert installation of tank, tankless, and hybrid water heaters. We handle everything from removal of your old unit to final testing.",
  highlights: ["All major brands", "Same-day available", "Full code compliance"],
  from: "From $299",
  color: "bg-blue-50 text-blue-600",
  accent: "border-blue-200"
},
{
  icon: Wrench,
  title: "Repair & Diagnostics",
  description: "Fast diagnosis and repair of any water heater issue — no hot water, leaks, strange noises, pilot light problems, and more.",
  highlights: ["90-day warranty", "Honest diagnostics", "Most repairs same day"],
  from: "From $89",
  color: "bg-orange-50 text-orange-600",
  accent: "border-orange-200"
},
{
  icon: Settings,
  title: "Preventive Maintenance",
  description: "Annual tune-ups that extend the life of your water heater, improve efficiency, and prevent costly breakdowns.",
  highlights: ["Flush & inspect", "Anode rod check", "Safety valve test"],
  from: "From $79",
  color: "bg-green-50 text-green-600",
  accent: "border-green-200"
},
{
  icon: Shield,
  title: "Emergency Service",
  description: "Water heater failure can't wait. Our emergency team is on call 24/7 to restore your hot water as fast as possible.",
  highlights: ["24/7 availability", "Arrive in 2 hours", "Weekend & holiday"],
  from: "Call for pricing",
  color: "bg-red-50 text-red-600",
  accent: "border-red-200",
  isEmergency: true
}];


export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-green-700 font-semibold text-sm tracking-widest uppercase mb-3 block">OUR SERVICES</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5">
            Complete Water Heater Services
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">From first install to emergency repairs, our technicians handle it all with speed and professionalism.

          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) =>
          <div
            key={service.title}
            className={`bg-white rounded-2xl p-7 shadow-sm border-2 ${service.accent} hover:shadow-lg transition-all duration-300 group flex flex-col`}>

              <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-5`}>
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1">{service.description}</p>
              <ul className="space-y-1.5 mb-6">
                {service.highlights.map((h) =>
              <li key={h} className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600 flex-shrink-0" />
                    {h}
                  </li>
              )}
              </ul>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="font-bold text-slate-800">{service.from}</span>
                {service.isEmergency ?
              <a
                href="tel:+18005551234"
                className="flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700">

                    Call Now <ChevronRight className="w-4 h-4" />
                  </a> :

              <Link
                to={createPageUrl("Booking")}
                className="flex items-center gap-1 text-sm font-semibold text-green-700 hover:text-green-800">

                    Book <ChevronRight className="w-4 h-4" />
                  </Link>
              }
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}