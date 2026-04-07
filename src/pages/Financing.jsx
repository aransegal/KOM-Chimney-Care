import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, Wallet, CreditCard, CheckCircle, Phone } from "lucide-react";

const options = [
{
  icon: Clock,
  title: "Instant Approval",
  description: "Get approved in seconds via QuickBooks Affirm.",
  highlight: true
},
{
  icon: DollarSign,
  title: "No Hidden Fees",
  description: "You'll see exactly what you owe upfront. No late fees, no service fees, and no surprises."
},
{
  icon: Wallet,
  title: "Budget-Friendly",
  description: "Split your total into monthly payments over 3 to 36 months."
},
{
  icon: CreditCard,
  title: "No Credit Impact",
  description: 'Checking your eligibility is a "soft pull" and will not affect your credit score.'
}];


export default function Financing() {
  return (
    <div className="min-h-screen bg-green-50 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-slate-900 text-4xl sm:text-5xl font-extrabold mb-4">Upgrade Your Comfort Today
Pay Over Time</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">At KOM Water Heaters, we know that a reliable water heater is essential for your home, but an unexpected replacement doesn't always fit the monthly budget. That’s why we’re using QuickBooks Affirm to offer flexible payment plans that let you pay for your service in manageable monthly installments.

          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {options.map(({ icon: Icon, title, description, highlight }) => <div
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

        <div className="bg-white border border-green-200 rounded-2xl p-8">
          <h3 className="text-2xl font-extrabold text-slate-900 mb-4">What's included</h3>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3 text-slate-600 text-sm">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <div><span className="font-semibold text-slate-800">Receive Your Invoice</span> — Once our technician completes your quote or service, we will email you a digital invoice via QuickBooks. Open the invoice on your phone or computer.</div>
            </li>
            <li className="flex items-start gap-3 text-slate-600 text-sm">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <div><span className="font-semibold text-slate-800">Select "Affirm" at Checkout</span> — Click the "Pay Now" button on your invoice. When the payment options appear, select Affirm as your payment method.</div>
            </li>
            <li className="flex items-start gap-3 text-slate-600 text-sm">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <div><span className="font-semibold text-slate-800">Pick Your Plan</span> — Follow the brief prompts to enter your details. You'll receive an instant decision and can choose the monthly payment plan that works best for you (including 0% APR options for qualifying customers).</div>
            </li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to={createPageUrl("Booking")}>
              

              
            </Link>
            <a href="tel:+13138040844">
              


              
            </a>
          </div>
        </div>
      </div>
    </div>);

}