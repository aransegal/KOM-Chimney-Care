import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

// ─── Catalog ────────────────────────────────────────────────────────────────
export const CATALOG = [
  {
    id: "cleaning",
    category: "Chimney Cleaning",
    type: "single",
    items: [
      { id: "cleaning_standard", label: "Standard Cleaning", price: 299 },
    ],
  },
  {
    id: "cap",
    category: "Square Cap",
    type: "single",
    items: [
      { id: "cap_regular", label: "Regular Cap", price: 329 },
    ],
  },
  {
    id: "round_cap",
    category: "Round Cap",
    type: "size",
    items: [
      { id: "round_4", label: '4 Inch', price: 289 },
      { id: "round_5", label: '5 Inch', price: 359 },
      { id: "round_6", label: '6 Inch', price: 429 },
      { id: "round_7", label: '7 Inch', price: 489, special: true },
      { id: "round_8", label: '8 Inch', price: 559, special: true },
      { id: "round_9", label: '9 Inch', price: 629, special: true },
      { id: "round_10", label: '10 Inch', price: 689, special: true },
    ],
  },
  {
    id: "cap_liner",
    category: "Liner",
    type: "size",
    items: [
      { id: "liner_4", label: '4 Inch', price: 499 },
      { id: "liner_5", label: '5 Inch', price: 499 },
      { id: "liner_6", label: '6 Inch', price: 499 },
      { id: "liner_7", label: '7 Inch', price: 599, special: true },
      { id: "liner_8", label: '8 Inch', price: 649, special: true },
      { id: "liner_9", label: '9 Inch', price: 699, special: true },
      { id: "liner_10", label: '10 Inch', price: 749, special: true },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function QtyControl({ qty, onChange, min = 1 }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(min, qty - 1))}
        className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors"
      >
        <Minus className="w-3 h-3" />
      </button>
      <span className="w-5 text-center text-sm font-semibold text-slate-800">{qty}</span>
      <button
        onClick={() => onChange(qty + 1)}
        className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
}

// ─── Category Card ────────────────────────────────────────────────────────────
function CategoryCard({ cat, cartItems, onAdd, onRemove, onQtyChange, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen || false);
  const selectedInCat = cartItems.filter((ci) => cat.items.some((i) => i.id === ci.id));
  const hasSelection = selectedInCat.length > 0;

  return (
    <div className={`rounded-xl border-2 transition-all ${hasSelection ? "border-green-600 bg-green-50/40" : "border-slate-200 bg-white"}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          {hasSelection ? (
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex-shrink-0" />
          )}
          <div>
            <span className="font-bold text-slate-900 text-base">{cat.category}</span>
            {hasSelection && (
              <span className="ml-2 text-xs bg-green-700 text-white px-2 py-0.5 rounded-full font-semibold">
                {selectedInCat.reduce((s, ci) => s + ci.qty, 0)} added
              </span>
            )}
          </div>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-2">
          {cat.type === "size" && selectedInCat.length === 0 && (
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-1 font-medium">
              Please select the size you need — our technician will verify the correct fit on site.
            </p>
          )}
          {cat.items.map((item) => {
            const inCart = cartItems.find((ci) => ci.id === item.id);
            return (
              <div
                key={item.id}
                className={`flex items-center justify-between rounded-lg px-4 py-3 border transition-all ${
                  inCart ? "border-green-500 bg-green-50" : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div>
                  <span className="text-sm font-semibold text-slate-800">{item.label}</span>
                  {item.special && (
                    <span className="ml-2 text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                      Special Order
                    </span>
                  )}
                  <div className="text-green-700 font-bold text-sm">${item.price.toLocaleString()}</div>
                </div>
                {inCart ? (
                  <div className="flex items-center gap-3">
                    <QtyControl qty={inCart.qty} onChange={(qty) => onQtyChange(item.id, qty)} />
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-xs text-red-500 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onAdd({ ...item, qty: 1, category: cat.category })}
                    className="border-green-600 text-green-700 hover:bg-green-50 text-xs font-semibold"
                  >
                    + Add
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Request Summary ──────────────────────────────────────────────────────────
function RequestSummary({ cartItems }) {
  const subtotal = cartItems.reduce((s, ci) => s + ci.price * ci.qty, 0);
  if (cartItems.length === 0) return null;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mt-6">
      <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">Request Summary</h3>
      <div className="space-y-2 mb-4">
        {cartItems.map((ci) => (
          <div key={ci.id} className="flex justify-between text-sm">
            <span className="text-slate-700">
              {ci.category} — {ci.label}
              {ci.qty > 1 && <span className="text-slate-400 ml-1">× {ci.qty}</span>}
            </span>
            <span className="font-semibold text-slate-900">${(ci.price * ci.qty).toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200 pt-3 flex justify-between font-bold text-slate-900">
        <span>Estimated Subtotal</span>
        <span>${subtotal.toLocaleString()}</span>
      </div>
      <p className="text-xs text-slate-400 mt-2 italic">Final pricing subject to on-site verification.</p>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function RequestCart({ cartItems, setCartItems, preselectedCategory }) {
  // Auto-open the preselected category on first render
  const handleAdd = (item) => {
    setCartItems((prev) => {
      if (prev.find((ci) => ci.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const handleRemove = (itemId) => {
    setCartItems((prev) => prev.filter((ci) => ci.id !== itemId));
  };

  const handleQtyChange = (itemId, qty) => {
    setCartItems((prev) => prev.map((ci) => ci.id === itemId ? { ...ci, qty } : ci));
  };

  return (
    <div>
      <p className="text-slate-500 text-sm mb-5">
        Select the services or materials you believe you need. Our technician will inspect, verify fit and sizing, and confirm final pricing on site.
      </p>
      <div className="space-y-3">
        {CATALOG.map((cat) => (
          <CategoryCard
            key={cat.id}
            cat={cat}
            cartItems={cartItems}
            onAdd={handleAdd}
            onRemove={handleRemove}
            onQtyChange={handleQtyChange}
            defaultOpen={
              !!preselectedCategory &&
              cat.category.toLowerCase() === preselectedCategory.toLowerCase()
            }
          />
        ))}
      </div>
      <RequestSummary cartItems={cartItems} />
    </div>
  );
}