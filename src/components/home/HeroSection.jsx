import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Phone, Shield, Clock, Star, ChevronRight, AlertTriangle } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-green-950" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-transparent" />

      {/* Decorative orb */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-600/20 border border-orange-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-orange-300 text-sm font-medium">24/7 Emergency Service Available</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            Water Heater
            <br />
            <span className="text-orange-400">Experts</span> You
            <br />
            Can Trust
          </h1>

          <p className="text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl">
            Fast, professional water heater installation, repair, and maintenance. 
            Licensed technicians, transparent pricing, and same-day service available.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <Link to={createPageUrl("Booking")}>
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white text-base px-8 h-14 shadow-lg shadow-orange-900/40 w-full sm:w-auto">
                Book a Service
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="tel:+18005551234">
              <Button size="lg" variant="outline" className="border-2 border-red-500 text-red-400 hover:bg-red-500/10 text-base px-8 h-14 w-full sm:w-auto">
                <AlertTriangle className="mr-2 w-5 h-5" />
                Emergency Service
              </Button>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6">
            {[
              { icon: Shield, text: "Licensed & Insured" },
              { icon: Clock, text: "Same-Day Available" },
              { icon: Star, text: "5-Star Rated" },
              { icon: Phone, text: "24/7 Support" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-slate-300">
                <div className="w-8 h-8 rounded-full bg-orange-600/20 border border-orange-500/30 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-orange-400" />
                </div>
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-white/20" />
      </div>
    </section>
  );
}