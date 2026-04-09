import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, X, AlertTriangle, Clock } from "lucide-react";

export default function EmergencyPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={dismiss} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        {/* Red header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-lg">Water Heater Emergency?</div>
              <div className="text-red-200 text-sm">We're available right now</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 text-green-700 bg-green-50 rounded-lg px-4 py-2.5 mb-5">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium">Technicians available 24/7 — typically arrive within 2 hours</span>
          </div>

          <ul className="space-y-2 mb-6 text-sm text-slate-600">
            {["No hot water", "Leaking water heater", "Strange noises or smells", "Pilot light issues"].map((issue) => (
              <li key={issue} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                {issue}
              </li>
            ))}
          </ul>

          <a href="tel:+13138040844" className="block mb-3">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white h-13 text-base font-bold gap-2">
              <Phone className="w-5 h-5" />
              Call (313) 804-0844 Now
            </Button>
          </a>
          <button
            onClick={dismiss}
            className="w-full text-slate-400 text-sm hover:text-slate-600 transition-colors py-2"
          >
            Not an emergency right now
          </button>
        </div>
      </div>
    </div>
  );
}