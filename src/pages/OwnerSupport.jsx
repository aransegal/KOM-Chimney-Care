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
  type: "Gas Power Vent",
  gallons: "40 Gal",
  folderId: "1e1KEfDeXz6K2D-_ovLiX_5QzmFetiFpb",
  docs: ["Energy Guide", "Installation Instructions", "Quick Reference Guide", "Quick Specs", "Specification Guide", "Use and Care Manual", "Warranty"]
},
{
  name: "GE RealMAX Choice 40-Gallon Tall Natural Gas Power Vent Water Heater",
  type: "Gas Power Vent",
  gallons: "40 Gal",
  folderId: "1P2Ub_V7mwJn3VVWvUO1aCHKy61gEr8cU",
  docs: ["Energy Guide", "Installation Instructions", "Quick Reference Guide", "Quick Specs", "Specification Guide", "Use and Care Manual", "Warranty"]
},
{
  name: "GE RealMAX Premium 40-Gallon Tall Natural Gas Atmospheric Water Heater",
  type: "Gas Atmospheric",
  gallons: "40 Gal",
  folderId: "1DKvaam8-XBXOTp-NO0GKOOIt-pGYMbfm",
  docs: ["Energy Guide", "Installation Instructions", "Quick Reference Guide", "Quick Specs", "Specification Guide", "Use and Care Manual", "Warranty"]
},
{
  name: "GE RealMAX Premium 50-Gallon Tall Natural Gas Atmospheric Water Heater",
  type: "Gas Atmospheric",
  gallons: "50 Gal",
  folderId: "1BAiIwPT6hNLVzq0vkFOWBioDgUYaJUIj",
  docs: ["Energy Guide", "Installation Instructions", "Quick Reference Guide", "Quick Specs", "Specification Guide", "Use and Care Manual", "Warranty"]
},
{
  name: "GE® Smart 30 Gallon Short Electric Water Heater",
  type: "Electric Smart",
  gallons: "30 Gal",
  folderId: "13VfFodwWebYHHBz0NAjgQwKMuVUU54fL",
  docs: ["Energy Guide", "Installation Instructions", "Quick Reference Guide", "Quick Specs", "Service Manual", "Specification Guide", "Use and Care Manual", "Warranty"]
},
{
  name: "GE® Smart 30 Gallon Tall Electric Water Heater",
  type: "Electric Smart",
  gallons: "30 Gal",
  folderId: "1Q5cUR3a7Kc1pLGpWiGJS2z5JIhYnwVBj",
  docs: ["Energy Guide", "Installation Instructions", "Quick Reference Guide", "Quick Specs", "Service Manual", "Specification Guide", "Submittal Sheet", "Use and Care Manual", "Warranty"]
},
{
  name: "GE® Smart 40 Gallon Short Electric Water Heater",
  type: "Electric Smart",
  gallons: "40 Gal",
  folderId: "1IBXd5SQh5VQeCUqVwgY22ksif7u20Phl",
  docs: ["Energy Guide", "Installation Instructions", "Quick Reference Guide", "Quick Specs", "Service Manual", "Specification Guide", "Submittal Sheet", "Use and Care Manual", "Warranty"]
},
{
  name: "GE® Smart 40 Gallon Tall Electric Water Heater",
  type: "Electric Smart",
  gallons: "40 Gal",
  folderId: "1ajOrsEb6hWPLV3f_K4xik1l8TPHlsu1N",
  docs: ["Energy Guide", "Installation Instructions", "Quick Reference Guide", "Quick Specs", "Service Manual", "Specification Guide", "Submittal Sheet", "Use and Care Manual", "Warranty"]
}];


function ProductRow({ product }) {
  const [expanded, setExpanded] = useState(false);
  const folderUrl = `https://drive.google.com/drive/folders/${product.folderId}`;

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-slate-50 transition-colors text-left">
        
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="flex-shrink-0 flex gap-1.5">
            <span className="bg-green-100 text-green-700 px-2 py-0.5 text-xs font-semibold rounded-full whitespace-nowrap">{product.gallons}</span>
            <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full whitespace-nowrap hidden sm:inline">{product.type}</span>
            {product.name.toLowerCase().includes('tall') && <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full whitespace-nowrap hidden sm:inline">Tall</span>}
            {product.name.toLowerCase().includes('short') && <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full whitespace-nowrap hidden sm:inline">Short</span>}
          </div>
          <span className="text-sm font-semibold text-slate-800 truncate">{product.name}</span>
        </div>
        <div className="flex items-center gap-3 ml-3 flex-shrink-0">
          <span className="text-xs text-slate-400 hidden sm:inline">{product.docs.length} documents</span>
          {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </button>

      {expanded &&
      <div className="border-t border-slate-100 px-5 py-4 bg-slate-50">
          <div className="flex flex-wrap gap-2">
            {product.docs.map((doc) =>
          <a
            key={doc}
            href={folderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${DOC_COLORS[doc] || "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`}>
            
                <FileText className="w-3 h-3" />
                {doc}
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
          )}
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Documents open in Google Drive. Click any document to view or download.
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
            <div key={product.folderId} className="px-3 py-2">
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