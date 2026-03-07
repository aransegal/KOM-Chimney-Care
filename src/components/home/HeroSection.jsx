import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Phone, Shield, Clock, Star, ChevronRight, AlertTriangle, CalendarCheck } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c9ea61bf0c459e3994bae/0fafbd559_herobackgroundlight.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          




          <div className="mb-6">
            <h1 className="text-zinc-900 font-extrabold leading-none" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>Water Heater</h1>
            <h1 className="text-green-700 font-extrabold leading-none" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>Experts</h1>
            <h1 className="text-zinc-900 font-extrabold leading-none" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>You Can Trust</h1>
          </div>
          <p className="text-gray-900 mb-10 text-xl leading-relaxed max-w-2xl">Fast, professional water heater installation, repair, and maintenance. Licensed technicians, transparent pricing, and same-day service available.


          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14 sm:justify-center">
            <Link to={createPageUrl("Booking")} className="w-full sm:w-auto">
              <Button size="lg" className="bg-green-700 hover:bg-green-800 text-white text-base px-8 h-14 shadow-lg shadow-green-900/40 w-full sm:min-w-[275px]">
                <CalendarCheck className="mr-2 w-5 h-5" />
                Book Installation
              </Button>
            </Link>
            <a href="tel:+18005551234" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="border-2 border-red-500 text-red-400 hover:bg-red-300 hover:text-red-600 text-base px-8 h-14 w-full sm:min-w-[275px]">
                <AlertTriangle className="mr-2 w-5 h-5" />
                24/7 Emergency Service
              </Button>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6">
            {[{ icon: Shield, text: "Licensed Vendor" },
            { icon: Clock, text: "Same-Day Available" },
            { icon: Star, text: "5-Star Rated" },
            { icon: Phone, text: "24/7 Support" }].
            map(({ icon: Icon, text }) =>
            <div key={text} className="flex items-center gap-2 text-slate-300">
                <div className="bg-green-700 opacity-100 rounded-full w-8 h-8 border border-green-500/30 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-zinc-900 text-sm font-medium">{text}</span>
              </div>
            )}
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