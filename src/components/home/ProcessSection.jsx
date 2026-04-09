import { CheckCircle } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Choose Your Water Heater",
    description: "Browse our selection and pick the water heater that fits your needs and budget.",
  },
  {
    number: "2",
    title: "Schedule a Diagnostics Appointment",
    description: "Book a diagnostics visit to verify your selection can be installed properly. A $79 booking fee is applied toward your service total.",
  },
  {
    number: "3",
    title: "Installation Within 48 Hours",
    description: "Once diagnostics are approved, we complete your installation within 48 hours.",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-center mb-12">
          Fast and Easy Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
              <div className="w-14 h-14 rounded-full bg-green-700 text-white flex items-center justify-center text-2xl font-extrabold mb-5 shadow-md">
                {step.number}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}