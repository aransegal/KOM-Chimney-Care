import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Phone, CalendarCheck } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background — brighter, less blur */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("https://media.base44.com/images/public/6a17301a1292b55206aaf2b1/157939ecc_herobackground.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(1.65)",
          transform: "scale(1.02)"
        }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-32">
        <div className="max-w-3xl">
          <div className="mb-6">
            <h1 className="text-zinc-900 font-extrabold leading-none" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>Chimney Care</h1>
            <h1 className="text-green-700 font-extrabold leading-none" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>Experts</h1>
            <h1 className="text-zinc-900 font-extrabold leading-none" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>You Can Trust</h1>
          </div>
          <p className="mb-10 text-xl leading-relaxed max-w-2xl text-[hsl(var(--card))] bg-[hsl(var(--muted-foreground))]">Fast, professional chimney cleaning, cap installation, and inspection. Licensed technicians, transparent pricing, and same-day service available.

          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <Link to={createPageUrl("Booking")} className="w-full sm:w-auto">
              <Button size="lg" className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 rounded-md bg-green-700 hover:bg-green-800 text-white text-base px-8 h-14 shadow-lg shadow-green-900/40 w-full sm:min-w-[275px] min-w-0">
                <CalendarCheck className="mr-2 w-5 h-5" />
                Book Diagnostic
              </Button>
            </Link>
            <a href="tel:+17346662338" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-background shadow-sm rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-900 px-8 h-14 w-full sm:min-w-[275px] min-w-0">
                <Phone className="mr-2 w-5 h-5" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-900">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-zinc-900" />
      </div>
    </section>);
}