import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How much does a new water heater cost?",
    answer: `The average cost to replace a residential water heater in the United States ranges from $1,500 to $3,500 installed, depending on:

• Tank size (40 vs 50 gallon)
• Gas vs electric
• Power vent requirements
• Plumbing modifications
• Permit and code upgrades
• Emergency installation timing

At KOM Water Heaters, most standard installations fall within this range and include professional installation, removal of the old unit, and code-compliant connections.

Power vent systems and tankless upgrades typically cost more due to venting and electrical requirements.`
  },
  {
    question: "How long does a water heater last?",
    answer: `Most traditional tank water heaters last:

• 8–12 years for standard gas models
• 10–15 years for electric models
• 15–20+ years for tankless systems

Lifespan depends heavily on:

• Water quality
• Maintenance frequency
• Sediment buildup
• Usage patterns
• Installation quality

Annual flushing and anode rod inspections can significantly extend the life of a water heater.`
  },
  {
    question: "What are signs that my water heater is failing?",
    answer: `Common warning signs include:

• Water not getting hot enough
• Running out of hot water quickly
• Rust-colored water
• Water leaking around the tank
• Rumbling or popping noises
• Higher utility bills
• Pilot light issues (gas units)
• Water taking longer to heat

If your water heater is over 10 years old and showing multiple symptoms, replacement is often more cost-effective than repeated repairs.`
  },
  {
    question: "Should I repair or replace my water heater?",
    answer: `A good rule of thumb:

• If the repair costs less than 30–40% of replacement cost and the unit is under 8 years old, repair may make sense.
• If the tank is leaking, replacement is usually required.
• If the unit is over 10 years old and experiencing repeated issues, replacement is typically the smarter long-term investment.

Modern water heaters are also significantly more energy efficient than older models, which can reduce monthly utility costs.`
  },
  {
    question: "How do I know what size water heater I need?",
    answer: `The correct size depends on the number of people in the home and simultaneous hot water usage.

Typical recommendations:

• Homes with large tubs, multiple bathrooms, or heavy appliance use may require larger systems or tankless upgrades.

Our diagnostics appointment helps verify the correct sizing before installation.`
  },
  {
    question: "What is the difference between gas and electric water heaters?",
    answer: `Gas Water Heaters:
• Heat water faster
• Lower operating cost in many areas
• Continue working during some power outages
• Require venting

Electric Water Heaters:
• Lower upfront equipment cost
• Simpler installation
• More energy efficient at point-of-use
• Slower recovery rate

Gas models are often preferred for larger households with higher hot water demand.`
  },
  {
    question: "What is a power vent water heater?",
    answer: `A power vent water heater uses an electric fan to push exhaust gases outside through PVC venting.

Advantages include:
• More flexible venting options
• Better installation flexibility
• Higher efficiency in some homes

Power vent systems are commonly required when traditional chimney venting is unavailable.

They are typically more expensive than standard atmospheric vent systems due to electrical and venting requirements.`
  },
  {
    question: "How often should a water heater be flushed?",
    answer: `Most manufacturers recommend flushing a tank water heater once per year.

Flushing helps remove sediment buildup that can:
• Reduce efficiency
• Increase energy bills
• Cause overheating
• Create rumbling noises
• Shorten tank lifespan

Homes with hard water may require more frequent maintenance.`
  },
  {
    question: "Why is my water heater making rumbling or popping noises?",
    answer: `These noises are usually caused by sediment buildup at the bottom of the tank.

As water becomes trapped beneath hardened sediment, steam bubbles form and create popping or rumbling sounds.

This can:
• Reduce efficiency by 10–20%
• Increase heating time
• Damage the tank over time

Professional flushing may help if the unit is not too old.`
  },
  {
    question: "Why is my hot water running out quickly?",
    answer: `Possible causes include:
• Sediment buildup
• Broken dip tube
• Failed heating element
• Thermostat issues
• Undersized tank
• Aging water heater

In many cases, homes outgrow their original water heater size over time due to additional occupants or increased hot water usage.`
  },
  {
    question: "Why is my water heater leaking?",
    answer: `Leaks can come from:
• Loose fittings
• Drain valves
• Temperature & pressure relief valve
• Internal tank corrosion

If the actual tank body is leaking, replacement is usually necessary because the steel tank itself cannot be permanently repaired.

Water heater leaks should be addressed immediately to avoid water damage and mold issues.`
  },
  {
    question: "What temperature should a water heater be set to?",
    answer: `The U.S. Department of Energy recommends setting residential water heaters to 120°F (49°C).

This temperature:
• Reduces energy consumption
• Lowers scalding risk
• Provides sufficient hot water for most homes

Higher temperatures increase energy usage and can create burn hazards.`
  },
  {
    question: "Are tankless water heaters worth it?",
    answer: `Tankless water heaters can be a good investment for some homeowners.

Benefits include:
• Endless hot water
• Longer lifespan (often 20+ years)
• Lower standby energy loss
• Space savings

However:
• Installation costs are higher
• Gas and electrical upgrades may be needed
• Simultaneous high-demand usage can still create limitations

Tankless systems work best for homes planning long-term occupancy and energy-efficiency upgrades.`
  },
  {
    question: "How energy efficient are modern water heaters?",
    answer: `Modern water heaters are significantly more efficient than systems installed 10–15 years ago.

High-efficiency models can reduce water heating energy usage by:
• 10–20% for standard tank systems
• 20–35% for tankless systems
• Up to 60% for hybrid heat pump models

Water heating typically accounts for around 18–20% of a home's energy bill, making efficiency an important consideration.`
  },
  {
    question: "Do you remove the old water heater?",
    answer: `Yes. KOM Water Heaters removes and disposes of old water heaters as part of the installation process.

Old tanks are typically recycled according to local regulations.`
  },
  {
    question: "How fast can a water heater be installed?",
    answer: `In many standard replacement cases, installation can be completed within 2–4 hours once diagnostics are approved.

More complex installations involving:
• Venting upgrades
• Gas line modifications
• Electrical upgrades
• Relocation of the unit

may require additional time.

KOM Water Heaters aims to complete approved installations within 48 hours whenever possible.`
  },
  {
    question: "Is a leaking water heater dangerous?",
    answer: `Yes, it can be.

A leaking water heater may create:
• Water damage
• Mold growth
• Electrical hazards
• Gas safety concerns
• Pressure-related risks

If you notice significant leaking:
• Shut off power or gas to the unit
• Shut off the water supply if possible
• Contact a licensed professional immediately`
  },
  {
    question: "How can I make my water heater last longer?",
    answer: `Best practices include:
• Annual tank flushing
• Replacing the anode rod every 3–5 years
• Keeping temperature at 120°F
• Addressing leaks early
• Installing a water softener in hard water areas
• Scheduling periodic inspections

Proper maintenance can extend tank lifespan by several years.`
  },
  {
    question: "Why does my hot water smell bad?",
    answer: `A rotten egg or sulfur smell is commonly caused by bacteria reacting with the anode rod inside the tank.

Possible solutions include:
• Flushing the system
• Replacing the anode rod
• Disinfecting the tank

This issue is more common in homes with well water.`
  },
  {
    question: "Do I need a permit to replace a water heater?",
    answer: `In many Michigan municipalities, yes.

Permits and inspections help ensure:
• Proper venting
• Safe gas connections
• Electrical compliance
• Plumbing code compliance

Professional installation also helps maintain manufacturer warranty coverage and insurance compliance.`
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
          <p className="text-slate-600 text-xl max-w-2xl mx-auto">Everything you need to know about water heater installation, repair, and maintenance.</p>
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