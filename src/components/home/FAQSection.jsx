import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How often should I have my chimney cleaned?",
    answer: `The National Fire Protection Association (NFPA 211) recommends that chimneys, fireplaces, and vents be inspected at least once a year and cleaned as needed.

As a general rule:
• If you use your fireplace regularly (weekly during heating season), clean it annually before the season starts.
• If you use it occasionally, clean it every 1–2 years.
• Wood-burning fireplaces require more frequent cleaning than gas fireplaces due to creosote buildup.

At KOM Chimney Care, we recommend scheduling your cleaning in late summer or early fall before you begin using your fireplace for the season.`
  },
  {
    question: "What is a chimney inspection and do I need one?",
    answer: `A chimney inspection is a professional evaluation of your chimney's condition, structure, and safety.

The NFPA recommends three levels of inspection:
• Level 1 — Basic visual check, recommended annually for fireplaces in regular use.
• Level 2 — More detailed examination, required when buying or selling a home, after a chimney fire, or after any changes to the system.
• Level 3 — Invasive inspection for suspected hidden damage.

You need an inspection if:
• You haven't had one in over a year
• You recently moved into a home
• You've had a chimney fire
• You notice smoke, odors, or draft issues

KOM Chimney Care performs all levels of inspection and will advise the appropriate level for your situation.`
  },
  {
    question: "What is creosote and why is it dangerous?",
    answer: `Creosote is a dark, tar-like byproduct of burning wood. It builds up on the interior walls of your chimney flue over time.

There are three stages:
• Stage 1 — Light, flaky deposits. Easiest to remove.
• Stage 2 — Harder, shiny or crunchy buildup. Requires professional tools.
• Stage 3 — Thick, glazed coating. Highly flammable and very difficult to remove.

Creosote is the leading cause of chimney fires. Even a small amount of Stage 3 creosote can ignite and reach temperatures over 2,000°F.

Annual cleaning removes creosote before it reaches dangerous levels.`
  },
  {
    question: "Why is smoke coming back into my house?",
    answer: `Smoke or backdraft into the living space is a common complaint and can have several causes:

• Negative air pressure in the home (tight insulation, exhaust fans pulling air down the chimney)
• Cold chimney flue that hasn't warmed up yet
• Blocked or partially blocked flue (debris, animal nest, creosote buildup)
• Chimney too short relative to the roofline
• Damaged or missing chimney cap
• Improper damper operation

In most cases this is fixable. We diagnose the root cause during inspection and provide a clear repair recommendation.`
  },
  {
    question: "Why does my fireplace or chimney smell bad?",
    answer: `Common chimney odors and their causes:

• Campfire or smoky smell — Creosote buildup reacting with humidity or warm air. Most common in summer.
• Musty or damp smell — Water intrusion, usually from a missing or damaged chimney cap or deteriorated crown.
• Animal smell — Animal nest or, in severe cases, an animal trapped inside the flue.

Odors are often worse during humid weather or when AC is running because negative air pressure pulls air down through the chimney.

A cleaning and inspection will identify the source. A chimney cap is often the most effective long-term fix.`
  },
  {
    question: "Can water leak into a chimney? What causes it?",
    answer: `Yes. Water is one of the most common and damaging chimney problems.

Sources of water intrusion include:
• Missing or damaged chimney cap — allows rain directly into the flue
• Cracked or deteriorated chimney crown (the mortar slab at the top of the chimney)
• Failed or missing flashing (the metal seal where the chimney meets the roof)
• Cracked or spalling masonry — freeze/thaw cycles cause bricks to crack over time
• No waterproof sealant on masonry

Left untreated, water damage can cause rusted dampers, deteriorated flue liners, structural damage to the chimney, and water stains on interior walls or ceilings.

KOM Chimney Care inspects and repairs all water intrusion points.`
  },
  {
    question: "What if an animal is nesting in my chimney?",
    answer: `Animals — especially chimney swifts, squirrels, raccoons, and birds — commonly nest in chimneys.

Important notes:
• Chimney swifts are a federally protected migratory species. If they are nesting, you must wait until they leave before cleaning or capping the chimney. Do not attempt to remove them.
• Squirrels and raccoons can be removed by a licensed wildlife removal service before chimney work begins.
• After removal, we can install a quality chimney cap to prevent future entry.

Never light a fire if you suspect an animal blockage — this is dangerous and can result in a flue fire or carbon monoxide buildup in the home.`
  },
  {
    question: "How long does a chimney cleaning take?",
    answer: `A standard chimney cleaning typically takes 45 minutes to 1.5 hours for a single fireplace.

Factors that can affect duration:
• Severity of creosote buildup
• Number of fireplaces or flues
• Whether an inspection is performed at the same time
• Accessibility of the chimney (roof pitch, height)

We take care to protect your home — using drop cloths and high-efficiency vacuums to contain soot and debris throughout the process.`
  },
  {
    question: "Does the homeowner need to be present during service?",
    answer: `Yes, we require an authorized adult (18+) to be present during the service appointment.

This is necessary to:
• Provide access to the fireplace, attic, or roof as needed
• Review findings and receive any recommendations directly
• Authorize any additional work if needed
• Confirm the work is complete before the technician leaves

If you cannot be present, please contact us in advance to discuss arrangements. We cannot begin work on an unoccupied property without prior authorization.`
  },
  {
    question: "How do I book a chimney cleaning or inspection?",
    answer: `Booking is simple:

1. Click "Book Diagnostic" from anywhere on our site.
2. Select a date and time window that works for you.
3. Provide your contact information and service address.
4. A KOM specialist will call you within 2 hours to confirm your appointment.

A $79 diagnostic fee secures your appointment and is applied toward the cost of your service.

For same-day or emergency service, call us directly at (734) 666-2338 — we're available 24/7.`
  },
  {
    question: "What is your cancellation policy?",
    answer: `We understand that plans change.

• You may reschedule your appointment at any time by calling us or replying to your confirmation email.
• The $79 diagnostic fee is non-refundable once the appointment is confirmed by our team.
• If we need to reschedule due to weather, technician availability, or other operational factors, we will contact you as soon as possible and offer the next available slot at no additional charge.

For questions about your specific booking, contact us at Kom.construction.llc@gmail.com or call (734) 666-2338.`
  }
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-slate-50 transition-colors"
      >
        <span className="text-slate-900 font-semibold text-base pr-4">{question}</span>
        <ChevronDown className={cn("w-5 h-5 text-green-600 flex-shrink-0 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <div className="px-6 py-5 bg-slate-50 border-t border-slate-200">
          <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-green-600 font-semibold text-sm tracking-widest uppercase mb-3 block">FAQ</span>
          <h2 className="text-slate-900 text-4xl font-extrabold sm:text-5xl mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto">Everything you need to know about chimney cleaning, inspection, and care.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}