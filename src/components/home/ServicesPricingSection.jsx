import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, AlertTriangle } from "lucide-react";

const PRODUCT_IMAGE = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c9ea61bf0c459e3994bae/d217301d4_image.png";

const products = [
{ name: "Electric 40 Gallon", price: "$1,895" },
{ name: "Electric 50 Gallon", price: "$1,995" },
{ name: "Gas 40 Gallon", price: "$2,095" },
{ name: "Gas 50 Gallon", price: "$2,195", popular: true },
{ name: "Electric Power Vent 40 Gallon", price: "$2,695" },
{ name: "Electric Power Vent 50 Gallon", price: "$2,795" },
{ name: "Gas Power Vent 40 Gallon", price: "$2,895" },
{ name: "Gas Power Vent 50 Gallon", price: "$2,995" }];


const installationFeatures = [
"Removal of old unit",
"All brand installs",
"Permit handling",
"Final inspection",
"1-year labor warranty",
"Same-day available"];


export default function ServicesPricingSection() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Service 1: New Installation */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            


            <h3 className="text-2xl font-extrabold text-slate-900 text-center w-full">New Water Heater Tank Installation</h3>
          </div>
          <p className="text-slate-500 mb-2 ml-11 text-center">Full water heater installation including haul-away of your old unit.

          </p>

          {/* Features row */}
          <div className="flex justify-center mb-8">
            <table>
              <tbody>
                {[[installationFeatures[0], installationFeatures[1], installationFeatures[2]],
                  [installationFeatures[3], installationFeatures[4], installationFeatures[5]]].map((row, ri) => (
                  <tr key={ri}>
                    {row.map((f) => (
                      <>
                        <td key={f + "-icon"} className="pr-1.5 py-1.5">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        </td>
                        <td key={f + "-text"} className="pr-6 py-1.5">
                          <span className="text-sm text-slate-600 whitespace-nowrap">{f}</span>
                        </td>
                      </>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Product cards grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {products.map((product) =>
            <div
              key={product.name}
              className={`relative rounded-2xl border-2 overflow-hidden flex flex-col transition-all hover:shadow-lg ${
              product.popular ?
              "border-green-600 shadow-lg shadow-green-100" :
              "border-slate-200"}`
              }>

                {product.popular &&
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wide uppercase whitespace-nowrap z-10">
                    Most Popular
                  </div>
              }

                {/* Product image */}
                <div className={`flex items-center justify-center p-4 pt-8 ${product.popular ? "bg-green-50" : "bg-slate-50"}`}>
                  <img
                  src={PRODUCT_IMAGE}
                  alt={product.name}
                  className="h-32 object-contain" />

                </div>

                {/* Info */}
                <div className={`p-4 flex flex-col flex-1 ${product.popular ? "bg-gradient-to-br from-green-700 to-green-800 text-white" : "bg-white"}`}>
                  <p className={`text-sm font-semibold mb-2 leading-snug ${product.popular ? "text-green-100" : "text-slate-700"}`}>
                    {product.name}
                  </p>
                  <p className={`text-2xl font-extrabold mb-4 ${product.popular ? "text-white" : "text-slate-900"}`}>
                    {product.price}
                  </p>
                  <Link to={createPageUrl("Booking")} className="mt-auto">
                    <Button
                    size="sm"
                    className={`w-full font-semibold ${
                    product.popular ?
                    "bg-white text-green-700 hover:bg-green-50" :
                    "bg-green-700 hover:bg-green-800 text-white"}`
                    }>

                      Book
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Service 2: Emergency */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                


                <h3 className="font-extrabold text-slate-900 text-xl text-center w-full">Emergency Service</h3>
              </div>
              <p className="text-slate-600 text-sm">Our emergency team is available 24/7 including weekends and holidays. Call for immediate pricing and same-day response.</p>
            </div>
          </div>
          <a href="tel:+18005551234" className="flex-shrink-0">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 h-12">
              <Phone className="mr-2 w-4 h-4" />
              Call Emergency Line
            </Button>
          </a>
        </div>

        {/* Header */}
        <div className="text-center mt-16">
          <span className="text-green-700 font-semibold text-sm tracking-widest uppercase mb-3 block">Transparent Pricing</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5">
            No Hidden Fees. Ever.
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            We believe in honest, upfront pricing. A{" "}
            <span className="font-bold text-green-700">$79 booking fee</span> secures your appointment — applied toward your service total.
          </p>
        </div>
        <div></div>

      </div>
    </section>);

}