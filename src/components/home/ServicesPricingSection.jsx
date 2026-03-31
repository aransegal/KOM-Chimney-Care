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

        <h2 className="text-slate-900 mb-5 text-4xl font-extrabold text-center sm:text-5xl">Products</h2>

        {/* Service 1: New Installation */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            


            <h3 className="text-slate-800 text-2xl font-semibold text-center w-full">Full water heater installation including haul-away of your old unit.</h3>
          </div>
          



          {/* Features row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-2 mb-8 max-w-2xl mx-auto">
            {installationFeatures.map((f) =>
            <div key={f} className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm text-slate-600">{f}</span>
              </div>
            )}
          </div>

          {/* Product cards grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {products.map((product) =>
            <div
              key={product.name}
              className={`relative rounded-2xl border-2 overflow-hidden flex flex-col transition-all hover:shadow-lg ${
              product.popular ?
              "border-slate-200 shadow-lg" :
              "border-slate-200"}`
              }>

                {product.popular ?
              <div className="text-center pt-2 px-2">
                    <span className="bg-green-900 text-green-50 px-3 py-1 font-bold uppercase tracking-wide rounded-full inline-block whitespace-nowrap">MOST POPULAR!

                </span>
                  </div> :

              <div className="pt-2 px-2">
                    <span className="inline-block text-[10px] px-3 py-1">&nbsp;</span>
                  </div>
              }

                {/* Product title */}
                <div className="text-center pt-2 px-2">
                  <p className="text-slate-800 text-2xl font-bold leading-snug">{product.name}</p>
                </div>

                {/* Product image */}
                <div className="flex items-center justify-center p-4 pt-2 bg-slate-50">
                  <img
                  src={PRODUCT_IMAGE}
                  alt={product.name}
                  className="h-32 object-contain" />
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col flex-1 bg-white justify-end">
                  <p className="text-2xl font-extrabold mb-4 text-slate-900 text-center">
                    {product.price}
                  </p>
                  <Link to={createPageUrl("Booking") + `?product=${encodeURIComponent(product.name)}&price=${encodeURIComponent(product.price)}`} className="mt-auto">
                    <Button
                    size="sm" className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-8 rounded-md px-3 text-xs w-full font-semibold bg-green-700 hover:bg-green-800 text-white">
                    
                      Book Installation
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
          <a href="tel:+13138040844" className="flex-shrink-0">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 h-12">
              <Phone className="mr-2 w-4 h-4" />
              Call Emergency Line
            </Button>
          </a>
        </div>

        {/* Header */}
        <div className="text-center mt-16">
          <span className="text-green-700 font-semibold text-sm tracking-widest uppercase mb-3 block">Transparent Pricing</span>
          <h2 className="text-slate-900 mb-5 text-4xl font-extrabold text-center sm:text-5xl">No Hidden Fees. Ever.

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