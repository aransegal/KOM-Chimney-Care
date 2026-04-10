import { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, AlertTriangle, X } from "lucide-react";

const PRODUCT_IMAGE = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c9ea61bf0c459e3994bae/d217301d4_image.png";

const DEFAULT_IMAGE = "https://media.base44.com/images/public/699c9ea61bf0c459e3994bae/0e4da4c63_xf3bhqwpy6ogb146wkjg__23999.jpg";

const products = [
{ name: "40 Gal Short Natural Gas Power Vent", price: "$2,950", image: "https://media.base44.com/images/public/699c9ea61bf0c459e3994bae/313d84272_xf3bhqwpy6ogb146wkjg__23999.jpg" },
{ name: "40 Gal Tall Natural Gas Power Vent", price: "$2,850", image: "https://media.base44.com/images/public/699c9ea61bf0c459e3994bae/6689d43e4_f1oomqrcddmuee732i4k__20622.jpg" },
{ name: "40 Gal Tall Natural Gas Atmospheric", price: "$1,850", popular: true, image: "https://media.base44.com/images/public/699c9ea61bf0c459e3994bae/7c156e8bb_lkxn1usngnks9sdai2ut__28189.jpg" },
{ name: "50 Gal Tall Natural Gas Atmospheric", price: "$2,300", image: "https://media.base44.com/images/public/699c9ea61bf0c459e3994bae/069b1d1b6_i7vjydgpc3fwoxk3jhfr__69227.jpg" },
{ name: "30 Gal Short Electric", price: "$1,750", image: "https://media.base44.com/images/public/699c9ea61bf0c459e3994bae/33e57728a_enlo4swfeumewxxc4jko__78942.jpg" },
{ name: "30 Gal Tall Electric", price: "$1,750", image: "https://media.base44.com/images/public/699c9ea61bf0c459e3994bae/339be5113_nqsyyosfufglej4x3sne__989761757215193.jpg" },
{ name: "40 Gal Short Electric", price: "$1,750", image: "https://media.base44.com/images/public/699c9ea61bf0c459e3994bae/14fc469f6_b9oonh88ocq79dknqm5m__97490.jpg" },
{ name: "40 Gal Tall Electric", price: "$1,750", image: "https://media.base44.com/images/public/699c9ea61bf0c459e3994bae/e992cbccc_7a1bb2bdfec02272d5c3e4f178d1e81bb5cd4b58__06280.jpg" }];


const installationFeatures = [
"Removal of old unit",
"All brand installs",
"Permit handling",
"Final inspection",
"3-month labor warranty",
"Same-day available"];


export default function ServicesPricingSection() {
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <>
    {lightboxImage && (
      <div
        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        onClick={() => setLightboxImage(null)}
      >
        <button
          className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
          onClick={() => setLightboxImage(null)}
        >
          <X className="w-6 h-6" />
        </button>
        <img
          src={lightboxImage}
          alt="Product"
          className="max-h-[80vh] max-w-[80vw] object-contain rounded-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    )}
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
              className={`relative rounded-2xl border-2 overflow-hidden flex flex-col transition-all hover:shadow-xl hover:shadow-green-700/30 border-slate-200 hover:border-green-700`
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
                <div className="bg-transparent pt-2 p-4 flex items-center justify-center">
                  <img
                    src={product.image || DEFAULT_IMAGE}
                    alt={product.name}
                    className="h-32 object-contain cursor-zoom-in"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLightboxImage(product.image || DEFAULT_IMAGE); }}
                  />
                
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col flex-1 bg-white justify-end">
                  <p className="text-2xl font-extrabold mb-4 text-slate-900 text-center">
                    {product.price}
                  </p>
                  <Link to={createPageUrl("Booking") + `?product=${encodeURIComponent(product.name)}&price=${encodeURIComponent(product.price)}`} className="mt-auto">
                    <Button
                    size="sm" className="bg-green-700 text-white px-3 text-sm font-semibold rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-8 w-full hover:bg-green-800">
                    
                      Choose Product
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
            <span className="font-bold text-green-700">$79 booking fee</span> secures your diagnostics appointment — applied toward your service total.
          </p>
        </div>
        <div></div>

      </div>
    </section>
    </>);

}