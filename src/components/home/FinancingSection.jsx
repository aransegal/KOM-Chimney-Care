import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { DollarSign, CheckCircle, Clock, CreditCard, Wallet } from "lucide-react";

const options = [
  {
    icon: Clock,
    title: "Instant Approval",
    description: "Get approved in seconds via QuickBooks Affirm.",
    highlight: false,
  },
  {
    icon: DollarSign,
    title: "No Hidden Fees",
    description: "You'll see exactly what you owe upfront. No late fees, no service fees, and no surprises.",
    highlight: false,
  },
  {
    icon: Wallet,
    title: "Budget-Friendly",
    description: "Split your total into monthly payments over 3 to 36 months.",
    highlight: false,
  },
  {
    icon: CreditCard,
    title: "No Credit Impact",
    description: 'Checking your eligibility is a "soft pull" and will not affect your credit score.',
    highlight: false,
  },
];

export default function FinancingSection() {
  return (
    <section id="financing" className="py-24 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">

          <h2 className="text-slate-900 text-4xl sm:text-5xl font-extrabold mb-4">Financing Available!</h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Don't let upfront costs hold you back. Financing plans are available so you can get the hot water you need — today!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {options.map(({ icon: Icon, title, description, highlight }) => (
            <div
              key={title}
              className={`rounded-2xl p-6 border-2 flex flex-col gap-3 transition-all hover:shadow-lg ${
                highlight
                  ? "bg-green-700 border-green-700 text-white"
                  : "bg-white border-slate-200 text-slate-800"
              }`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${highlight ? "bg-green-600" : "bg-green-100"}`}>
                <Icon className={`w-5 h-5 ${highlight ? "text-white" : "text-green-700"}`} />
              </div>
              <h3 className={`font-bold text-lg ${highlight ? "text-white" : "text-slate-900"}`}>{title}</h3>
              <p className={`text-sm leading-relaxed ${highlight ? "text-green-100" : "text-slate-500"}`}>{description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link to="/Financing">
            <Button className="bg-green-700 hover:bg-green-800 text-white px-10 h-12 text-base">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}