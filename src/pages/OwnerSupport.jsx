import { useState } from "react";
import { ChevronDown, ChevronUp, FileText, ExternalLink } from "lucide-react";

const DOC_COLORS = {
  "Energy Guide": "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
  "Installation Instructions": "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
  "Quick Reference Guide": "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
  "Quick Specs": "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
  "Specification Guide": "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100",
  "Use and Care Manual": "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
  "Warranty": "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
  "Service Manual": "bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100",
  "Submittal Sheet": "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
};

const products = [
{
  name: "GE RealMAX Choice 40-Gallon Short Natural Gas Power Vent Water Heater",
  docs: {
    "Energy Guide": "https://media.base44.com/files/public/699c9ea61bf0c459e3994bae/e9e1bbcd9_EnergyGuide.pdf",
    "Installation Instructions": "https://products-salsify.geappliances.com/image/upload/s--TZLqG1lP--/setjxxx26tbk7dnp6ohq.pdf",
    "Quick Reference Guide": "https://media.base44.com/files/public/699c9ea61bf0c459e3994bae/d236b182e_QuickReferenceGuide.pdf",
    "Quick Specs": "https://media.base44.com/files/public/699c9ea61bf0c459e3994bae/91cdb4027_QuickSpecs.pdf",
    "Specification Guide": "https://media.base44.com/files/public/699c9ea61bf0c459e3994bae/e79d3f9cc_SpecificationGuide.pdf",
    "Use and Care Manual": "https://products-salsify.geappliances.com/image/upload/s--TZLqG1lP--/setjxxx26tbk7dnp6ohq.pdf",
    "Warranty": "https://media.base44.com/files/public/699c9ea61bf0c459e3994bae/c03156877_Warranty.pdf"
  }
},
{
  name: "GE RealMAX Choice 40-Gallon Tall Natural Gas Power Vent Water Heater",
  docs: {
    "Energy Guide": "",
    "Installation Instructions": "",
    "Quick Reference Guide": "",
    "Quick Specs": "",
    "Specification Guide": "",
    "Use and Care Manual": "",
    "Warranty": ""
  }
},
{
  name: "GE RealMAX Premium 40-Gallon Tall Natural Gas Atmospheric Water Heater",
  docs: {
    "Energy Guide": "https://products-salsify.geappliances.com/image/upload/s--Wi1F284t--/ozzvl5hkatozdfsinf2z.pdf",
    "Installation Instructions": "https://products-salsify.geappliances.com/image/upload/s--TZLqG1lP--/setjxxx26tbk7dnp6ohq.pdf",
    "Quick Reference Guide": "https://products-salsify.geappliances.com/image/upload/s--oSEZFE34--/nr4j0lvnigntjbsmjwqv.pdf",
    "Quick Specs": "https://products-salsify.geappliances.com/image/upload/s--ks1Y1m9J--/vwl1jpiyourdywvdi4av.pdf",
    "Specification Guide": "https://products-salsify.geappliances.com/image/upload/s--oSEZFE34--/nr4j0lvnigntjbsmjwqv.pdf",
    "Use and Care Manual": "https://products-salsify.geappliances.com/image/upload/s--TZLqG1lP--/setjxxx26tbk7dnp6ohq.pdf",
    "Warranty": "https://products-salsify.geappliances.com/image/upload/s--hoGImRWq--/it6r4ohcmnnvg1furf9t.pdf"
  }
},
{
  name: "GE RealMAX Premium 50-Gallon Tall Natural Gas Atmospheric Water Heater",
  docs: {
    "Energy Guide": "https://products-salsify.geappliances.com/image/upload/s--U45mN9yg--/uqv6vjhuierc9rrxja3e.pdf",
    "Installation Instructions": "https://products-salsify.geappliances.com/image/upload/s--vs_2etUY--/zztiehlizpwjhargenur.pdf",
    "Quick Reference Guide": "https://products-salsify.geappliances.com/image/upload/s--eXi2YMm5--/vcc43pp6sj7w5brj3lar.pdf",
    "Quick Specs": "https://products-salsify.geappliances.com/image/upload/s--8ja00UKB--/vfdkuxdobjbszpyqoj1z.pdf",
    "Specification Guide": "https://products-salsify.geappliances.com/image/upload/s--eXi2YMm5--/vcc43pp6sj7w5brj3lar.pdf",
    "Use and Care Manual": "https://products-salsify.geappliances.com/image/upload/s--vs_2etUY--/zztiehlizpwjhargenur.pdf",
    "Warranty": "https://products-salsify.geappliances.com/image/upload/s--hoGImRWq--/it6r4ohcmnnvg1furf9t.pdf"
  }
},
{
  name: "GE Smart 30 Gallon Short Electric Water Heater",
  docs: {
    "Energy Guide": "https://products-salsify.geappliances.com/image/upload/s--8h4ooQd6--/khrw7b6qwimjnjsaw0oy.pdf",
    "Installation Instructions": "https://products-salsify.geappliances.com/image/upload/s--CmUzolcA--/dsdmkwqqovmaokam82yr.pdf",
    "Quick Reference Guide": "https://products-salsify.geappliances.com/image/upload/s--t-HnlmFh--/byxibfcluwzsib2quvmc.pdf",
    "Quick Specs": "https://products-salsify.geappliances.com/image/upload/s--LVNnlhJe--/8144d8ab5252f8f6299adc075b4ba7e4fc969ed2.pdf",
    "Service Manual": "https://products-salsify.geappliances.com/image/upload/s--FcsjJMHj--/jufhk5pnjwsaczrzmss9.pdf",
    "Specification Guide": "https://products-salsify.geappliances.com/image/upload/s--t-HnlmFh--/byxibfcluwzsib2quvmc.pdf",
    "Use and Care Manual": "https://products-salsify.geappliances.com/image/upload/s--CmUzolcA--/dsdmkwqqovmaokam82yr.pdf",
    "Warranty": "https://products-salsify.geappliances.com/image/upload/s--IHDtgm8r--/b8x7vkhgb3lj0aiqcmpv.pdf"
  }
},
{
  name: "GE Smart 30 Gallon Tall Electric Water Heater",
  docs: {
    "Energy Guide": "https://products-salsify.geappliances.com/image/upload/s--Ab5q5vtk--/okn3uf29xuvmbsazhkcm.pdf",
    "Installation Instructions": "https://products-salsify.geappliances.com/image/upload/s--CmUzolcA--/dsdmkwqqovmaokam82yr.pdf",
    "Quick Reference Guide": "https://products-salsify.geappliances.com/image/upload/s--t-HnlmFh--/byxibfcluwzsib2quvmc.pdf",
    "Quick Specs": "https://products-salsify.geappliances.com/image/upload/s--SMmA316J--/0b73cac116d06c38db933191b59fdae89129d7d6.pdf",
    "Service Manual": "https://products-salsify.geappliances.com/image/upload/s--FcsjJMHj--/jufhk5pnjwsaczrzmss9.pdf",
    "Specification Guide": "https://products-salsify.geappliances.com/image/upload/s--t-HnlmFh--/byxibfcluwzsib2quvmc.pdf",
    "Submittal Sheet": "https://products-salsify.geappliances.com/image/upload/s--kKwzgk61--/dkoswlu2fpexkkreelbn.pdf",
    "Use and Care Manual": "https://products-salsify.geappliances.com/image/upload/s--CmUzolcA--/dsdmkwqqovmaokam82yr.pdf",
    "Warranty": "https://products-salsify.geappliances.com/image/upload/s--IHDtgm8r--/b8x7vkhgb3lj0aiqcmpv.pdf"
  }
},
{
  name: "GE Smart 40 Gallon Short Electric Water Heater",
  docs: {
    "Energy Guide": "https://products-salsify.geappliances.com/image/upload/s--c7ItX9d7--/mer1ccagqsmprgkjcxic.pdf",
    "Installation Instructions": "https://products-salsify.geappliances.com/image/upload/s--CmUzolcA--/dsdmkwqqovmaokam82yr.pdf",
    "Quick Reference Guide": "https://products-salsify.geappliances.com/image/upload/s--t-HnlmFh--/byxibfcluwzsib2quvmc.pdf",
    "Quick Specs": "https://products-salsify.geappliances.com/image/upload/s--fX7kEGaf--/3200af3d3a182bb79ced242cd83f6c0fbe337ef7.pdf",
    "Service Manual": "https://products-salsify.geappliances.com/image/upload/s--FcsjJMHj--/jufhk5pnjwsaczrzmss9.pdf",
    "Specification Guide": "https://products-salsify.geappliances.com/image/upload/s--t-HnlmFh--/byxibfcluwzsib2quvmc.pdf",
    "Submittal Sheet": "https://products-salsify.geappliances.com/image/upload/s--9qnB_QJD--/gzripftk7cysr81zk1wg.pdf",
    "Use and Care Manual": "https://products-salsify.geappliances.com/image/upload/s--CmUzolcA--/dsdmkwqqovmaokam82yr.pdf",
    "Warranty": "https://products-salsify.geappliances.com/image/upload/s--IHDtgm8r--/b8x7vkhgb3lj0aiqcmpv.pdf"
  }
},
{
  name: "GE Smart 40 Gallon Tall Electric Water Heater",
  docs: {
    "Energy Guide": "https://products-salsify.geappliances.com/image/upload/s--UN1vUqlJ--/ppskl7nidutqlrteam1g.pdf",
    "Installation Instructions": "https://products-salsify.geappliances.com/image/upload/s--CmUzolcA--/dsdmkwqqovmaokam82yr.pdf",
    "Quick Reference Guide": "https://products-salsify.geappliances.com/image/upload/s--t-HnlmFh--/byxibfcluwzsib2quvmc.pdf",
    "Quick Specs": "https://products-salsify.geappliances.com/image/upload/s--ZHJ9ewoG--/39302343bcd5e327dcf6af59af56d6445de50e07.pdf",
    "Service Manual": "https://products-salsify.geappliances.com/image/upload/s--FcsjJMHj--/jufhk5pnjwsaczrzmss9.pdf",
    "Specification Guide": "https://products-salsify.geappliances.com/image/upload/s--t-HnlmFh--/byxibfcluwzsib2quvmc.pdf",
    "Submittal Sheet": "https://products-salsify.geappliances.com/image/upload/s--YkRlQZsR--/pxuteas7fmzbxl9a9wjz.pdf",
    "Use and Care Manual": "https://products-salsify.geappliances.com/image/upload/s--CmUzolcA--/dsdmkwqqovmaokam82yr.pdf",
    "Warranty": "https://products-salsify.geappliances.com/image/upload/s--IHDtgm8r--/b8x7vkhgb3lj0aiqcmpv.pdf"
  }
}];


function ProductRow({ product }) {
  const [expanded, setExpanded] = useState(false);
  const docEntries = Object.entries(product.docs);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-slate-50 transition-colors text-left">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <span className="text-sm font-semibold text-slate-800 truncate">{product.name}</span>
        </div>
        <div className="flex items-center gap-3 ml-3 flex-shrink-0">
          <span className="text-xs text-slate-400 hidden sm:inline">{docEntries.length} documents</span>
          {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </button>

      {expanded &&
      <div className="border-t border-slate-100 px-5 py-4 bg-slate-50">
          <div className="flex flex-wrap gap-2">
            {docEntries.map(([docName, url]) =>
          <a
            key={docName}
            href={url || undefined}
            target="_blank"
            rel="noopener noreferrer"
            onClick={!url ? (e) => e.preventDefault() : undefined}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${!url ? "opacity-40 cursor-not-allowed" : ""} ${DOC_COLORS[docName] || "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`}>
              <FileText className="w-3 h-3" />
              {docName}
              {url && <ExternalLink className="w-3 h-3 opacity-50" />}
            </a>
          )}
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Click any document to open the PDF in a new tab.
          </p>
        </div>
      }
    </div>);

}

export default function OwnerSupport() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Owner Support</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Find installation instructions, manuals, warranty documents, and more for your water heater.

          </p>
        </div>

        {/* Product Documents Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Product Documents</h2>
            <span className="text-xs text-slate-400">{products.length} products</span>
          </div>
          <div className="divide-y divide-slate-100">
            {products.map((product) =>
            <div key={product.name} className="px-3 py-2">
                <ProductRow product={product} />
              </div>
            )}
          </div>
        </div>

        {/* Help Banner */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-green-800 mb-1">Need additional help?</h3>
            <p className="text-green-700 text-sm">Our team is available to assist with installation questions and technical support.</p>
          </div>
          <a
            href="tel:+13138040844"
            className="flex-shrink-0 bg-green-700 hover:bg-green-800 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap">
            
            Call (313) 804-0844
          </a>
        </div>
      </div>
    </div>);

}