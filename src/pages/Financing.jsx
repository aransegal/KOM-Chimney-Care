import { useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, Wallet, CreditCard, CheckCircle, Phone } from "lucide-react";

const options = [
{
  icon: Clock,
  title: "Instant Approval",
  description: "Get approved in seconds via QuickBooks Affirm."
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
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-green-50 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-slate-900 text-4xl sm:text-5xl font-extrabold mb-4">Upgrade Your Comfort Today
          </h1>
          <h1 className="text-slate-900 text-4xl sm:text-5xl font-extrabold mb-4">Pay Over Time</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">At KOM Water Heaters, we know that a reliable water heater is essential for your home, but an unexpected replacement doesn't always fit the monthly budget. That’s why we’re using QuickBooks Affirm to offer flexible payment plans that let you pay for your service in manageable monthly installments.

          </p>
          <div className="mt-6 flex justify-center">
            <img src="https://media.base44.com/images/public/699c9ea61bf0c459e3994bae/803d0aa16_Affirm_Logosvg.png" alt="Affirm" className="h-12" />
          </div>
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

        <div className="bg-white border border-green-200 rounded-2xl p-8 mb-8">
          <h2 className="text-slate-900 mb-6 text-2xl font-extrabold text-center">How It Works (3 Easy Steps)</h2>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-lg">1</div>
              <div>
                <p className="text-xl font-bold text-slate-900">Receive Your Invoice</p>
                <p className="text-base text-slate-600 mt-1">Once our technician completes your quote or service, we will email you a digital invoice via QuickBooks. Open the invoice on your phone or computer.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-lg">2</div>
              <div>
                <p className="text-xl font-bold text-slate-900">Select &ldquo;Affirm&rdquo; at Checkout</p>
                <p className="text-base text-slate-600 mt-1">Click the &ldquo;Pay Now&rdquo; button on your invoice. When the payment options appear, select Affirm as your payment method.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-lg">3</div>
              <div>
                <p className="text-xl font-bold text-slate-900">Pick Your Plan</p>
                <p className="text-base text-slate-600 mt-1">Follow the brief prompts to enter your details. You'll receive an instant decision and can choose the monthly payment plan that works best for you (including 0% APR options for qualifying customers).</p>
              </div>
            </li>
          </ol>
        </div>

        <div className="bg-white border border-green-200 rounded-2xl p-8">
          <h2 className="text-slate-900 mb-6 text-2xl font-extrabold text-center">Frequently Asked Questions</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left font-bold text-slate-900 pb-3 w-2/5">Question</th>
                <th className="text-left font-bold text-slate-900 pb-3">Answer</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="font-bold text-slate-900 py-4 pr-6 align-top">What is the limit?</td>
                <td className="text-slate-600 py-4 align-top">You can finance invoices ranging from <strong>$50 up to $20,000</strong>.</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="font-bold text-slate-900 py-4 pr-6 align-top">Are there late fees?</td>
                <td className="text-slate-600 py-4 align-top"><strong>No.</strong> One of the best parts about Affirm is that they <strong>never charge late fees</strong>, hidden penalties, or service fees. What you see at checkout is exactly what you'll pay.</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="font-bold text-slate-900 py-4 pr-6 align-top">Does missing a payment matter?</td>
                <td className="text-slate-600 py-4 align-top">While there are no late fees, keep in mind that late payments can affect your credit score and your eligibility for future financing through Affirm.</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="font-bold text-slate-900 py-4 pr-6 align-top">When is my first payment?</td>
                <td className="text-slate-600 py-4 align-top">Your first payment is usually due one month after your service is completed and the invoice is finalized.</td>
              </tr>
              <tr>
                <td className="font-bold text-slate-900 py-4 pr-6 align-top">Can I pay it off early?</td>
                <td className="text-slate-600 py-4 align-top">Absolutely! You can pay off your balance at any time with <strong>no prepayment penalties</strong>.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-green-700 rounded-2xl p-8 mt-6 text-center">
          <h3 className="text-2xl font-extrabold text-white mb-2">Still have questions about financing?</h3>
          <p className="text-green-100 mb-5">Our team is happy to walk you through your options.</p>
          <a href="tel:+13138040844">
            <Button className="bg-white text-green-700 hover:bg-green-50 font-bold px-6">
              <Phone className="w-4 h-4 mr-2" /> Give Us a Call
            </Button>
          </a>
        </div>
      </div>
    </div>);

}