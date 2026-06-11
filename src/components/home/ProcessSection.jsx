import { CheckCircle } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Choose Your Chimney Service",
    description: "Select cleaning, inspection, leak assessment, draft diagnosis, or book a general diagnostic appointment.",
  },
  {
    number: "2",
    title: "Schedule a Diagnostic Appointment",
    description: "Pick a date and time window so our technician can inspect the chimney or fireplace and confirm the right scope of work.",
  },
  {
    number: "3",
    title: "Get Service Recommendation & Completion",
    description: "After inspection, we explain findings, pricing, and next steps. Approved work is scheduled as quickly as possible.",
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