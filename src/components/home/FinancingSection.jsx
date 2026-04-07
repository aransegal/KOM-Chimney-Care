import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { DollarSign, CheckCircle, Clock, CreditCard, BadgePercent } from "lucide-react";

const options = [
{
  icon: BadgePercent,
  title: "0% Interest Financing",
  description: "Pay over 12 months with zero interest on approved credit. No hidden fees.",
  highlight: true
},
{
  icon: DollarSign,
  title: "Low Monthly Payments",
  description: "Split your installation cost into affordable monthly installments starting as low as $59/mo.",
  highlight: false
},
{
  icon: Clock,
  title: "Quick Approval",
  description: "Get approved in minutes — no long waits, no paperwork hassle.",
  highlight: false
},
{
  icon: CreditCard,
  title: "Flexible Plans",
  description: "Choose from 6, 12, or 24-month plans to fit your budget and needs.",
  highlight: false
}];


export default function FinancingSection() {
  return (
    <section id="financing" className="py-24 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          
          <h2 className="text-slate-900 text-4xl sm:text-5xl font-extrabold mb-4">Financing Available!</h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Don't let upfront costs hold you back. We offer flexible financing plans so you can get the hot water you need — today.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {options.map(({ icon: Icon, title, description, highlight }) =>
          <div
            key={title}
            className={`rounded-2xl p-6 border-2 flex flex-col gap-3 transition-all hover:shadow-lg ${
            highlight ?
            "bg-green-700 border-green-700 text-white" :
            "bg-white border-slate-200 text-slate-800"}`
            }>
            
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${highlight ? "bg-green-600" : "bg-green-100"}`}>
                <Icon className={`w-5 h-5 ${highlight ? "text-white" : "text-green-700"}`} />
              </div>
              <h3 className={`font-bold text-lg ${highlight ? "text-white" : "text-slate-900"}`}>{title}</h3>
              <p className={`text-sm leading-relaxed ${highlight ? "text-green-100" : "text-slate-500"}`}>{description}</p>
            </div>
          )}
        </div>

        <div className="bg-white border border-green-200 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Ready to get started?</h3>
            <ul className="space-y-1">
              {["No prepayment penalties", "Available on all installation packages", "Approval does not affect credit score"].map((item) =>
              <li key={item} className="flex items-center gap-2 text-slate-600 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  {item}
                </li>
              )}
            </ul>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <Link to={createPageUrl("Booking")}>
              <Button className="bg-green-700 hover:bg-green-800 text-white px-8 h-12 text-base w-full">
                Book with Financing
              </Button>
            </Link>
            <a href="tel:+13138040844">
              <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50 px-8 h-12 text-base w-full">
                Call to Learn More
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>);

}