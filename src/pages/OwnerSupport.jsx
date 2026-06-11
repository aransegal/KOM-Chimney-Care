import { useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { CheckCircle, Flame, Droplets, Wind, ShieldAlert, CalendarCheck } from "lucide-react";
import { Bug as BugIcon } from "lucide-react";

const infoCards = [
  {
    title: "Annual Chimney Care Checklist",
    color: "green",
    items: [
      "Schedule a professional cleaning and inspection once per year — more often if you use your fireplace frequently.",
      "Inspect and test your damper before each burning season to ensure it opens and closes fully.",
      "Check the chimney cap and crown visually from the ground for visible cracks or missing pieces.",
      "Look at the flashing (where the chimney meets the roofline) for lifted, cracked, or missing sections.",
      "Check the firebox interior for loose bricks, mortar deterioration, or visible cracks.",
      "Confirm your carbon monoxide and smoke detectors are working and batteries are fresh.",
    ],
  },
  {
    title: "Fireplace Safety Tips",
    color: "orange",
    items: [
      "Only burn seasoned (dry) hardwood — never burn treated wood, cardboard, trash, or wet/green wood.",
      "Allow adequate airflow: keep the damper fully open while a fire is burning.",
      "Never leave a fire unattended or allow children or pets near an open firebox.",
      "Use a fireplace screen or glass door to contain sparks.",
      "Wait until ash cools completely (at least 24 hours) before removing and disposing of it.",
      "Never use flammable liquids (gasoline, lighter fluid) to start or accelerate a fire.",
    ],
  },
  {
    title: "Creosote Warning Signs",
    color: "red",
    items: [
      "A strong campfire or tar-like odor coming from the fireplace — especially on warm or humid days.",
      "Black, shiny, or glazed deposits visible inside the firebox or smoke chamber.",
      "Reduced draw or difficulty starting a fire (creosote restricts the flue opening).",
      "Increased smoke entering the room during a fire.",
      "If you haven't had a professional cleaning in over a year and use your fireplace regularly, assume creosote is present.",
    ],
  },
  {
    title: "Smoke / Backdraft Troubleshooting",
    color: "blue",
    items: [
      "Confirm the damper is fully open before lighting a fire.",
      "If the flue is cold, warm it first: hold a lit rolled newspaper near the open damper for 30–60 seconds before lighting a fire.",
      "Check that no exhaust fans (kitchen, bathroom, dryer) are running simultaneously — they can create negative pressure that pulls air down the chimney.",
      "If smoke enters the home repeatedly, stop using the fireplace and schedule a professional inspection.",
      "A damaged or missing chimney cap can cause wind-induced backdraft — have it inspected.",
    ],
  },
  {
    title: "Water / Leak Warning Signs",
    color: "cyan",
    items: [
      "Water stains on the ceiling or wall near or around the chimney.",
      "Rust stains inside the firebox or on the damper.",
      "White staining (efflorescence) on the exterior masonry of the chimney.",
      "Cracked, spalling, or flaking bricks on the chimney exterior.",
      "Musty or damp odor from the fireplace — especially noticeable during or after rain.",
      "Water pooling inside the firebox after a rainstorm.",
    ],
  },
  {
    title: "Animal / Blockage Warning Signs",
    color: "amber",
    items: [
      "Chirping, rustling, or scratching sounds coming from the chimney.",
      "A strong odor — especially if musty, damp, or decomposing.",
      "Debris (sticks, leaves, nesting material) falling into the firebox.",
      "Reduced draw or complete blockage when attempting to start a fire.",
      "Do NOT light a fire if you suspect an animal or blockage — this is dangerous.",
      "Chimney swifts are federally protected birds. If present, do not disturb the nest. Call us after they leave.",
    ],
  },
];

const ICONS = [CalendarCheck, Flame, Flame, Wind, Droplets, BugIcon];

const COLOR_MAP = {
  green: { bg: "bg-green-50", border: "border-green-200", icon: "bg-green-100 text-green-700", heading: "text-green-800" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", icon: "bg-orange-100 text-orange-700", heading: "text-orange-800" },
  red: { bg: "bg-red-50", border: "border-red-200", icon: "bg-red-100 text-red-700", heading: "text-red-800" },
  blue: { bg: "bg-blue-50", border: "border-blue-200", icon: "bg-blue-100 text-blue-700", heading: "text-blue-800" },
  cyan: { bg: "bg-cyan-50", border: "border-cyan-200", icon: "bg-cyan-100 text-cyan-700", heading: "text-cyan-800" },
  amber: { bg: "bg-amber-50", border: "border-amber-200", icon: "bg-amber-100 text-amber-700", heading: "text-amber-800" },
};

export default function OwnerSupport() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Chimney Owner Support</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Helpful guidance for keeping your chimney safe, clean, and performing properly year-round.</p>
        </div>

        {/* Stop Using Fireplace Banner */}
        <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-5 mb-10 flex gap-4 items-start">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-bold text-red-800 mb-1 text-base">When to Stop Using Your Fireplace Immediately</h3>
            <ul className="text-red-700 text-sm space-y-1">
              <li className="flex items-start gap-2"><span className="mt-0.5 text-red-500">•</span> You see or smell smoke entering the room during or after a fire.</li>
              <li className="flex items-start gap-2"><span className="mt-0.5 text-red-500">•</span> You hear unusual rumbling or roaring during a fire (possible chimney fire).</li>
              <li className="flex items-start gap-2"><span className="mt-0.5 text-red-500">•</span> Your carbon monoxide alarm activates.</li>
              <li className="flex items-start gap-2"><span className="mt-0.5 text-red-500">•</span> You notice dense smoke, unusual flames, or visible debris falling in the firebox.</li>
              <li className="flex items-start gap-2"><span className="mt-0.5 text-red-500">•</span> Water is entering the firebox or visible cracks have appeared in the flue or firebox.</li>
            </ul>
            <p className="text-red-700 text-sm font-semibold mt-2">Do not use the fireplace again until it has been professionally inspected.</p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="space-y-6">
          {infoCards.map((card, idx) => {
            const Icon = ICONS[idx];
            const c = COLOR_MAP[card.color];
            return (
              <div key={card.title} className={`rounded-2xl border ${c.border} ${c.bg} p-6`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${c.icon}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className={`font-bold text-base ${c.heading}`}>{card.title}</h2>
                </div>
                <ul className="space-y-2">
                  {card.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Help Banner */}
        <div className="mt-10 bg-green-50 border border-green-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-green-800 mb-1">Need a professional inspection or cleaning?</h3>
            <p className="text-green-700 text-sm">Our licensed technicians serve the metro Detroit area. Book online or call us directly.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
            <Link to={createPageUrl("Booking")}>
              <button className="bg-green-700 hover:bg-green-800 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap">
                Book Online
              </button>
            </Link>
            <a
              href="tel:+17346662338"
              className="bg-white border border-green-300 hover:bg-green-50 text-green-800 font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap text-center">
              Call (734) 666-2338
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}