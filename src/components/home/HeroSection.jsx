import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Phone, Shield, Clock, Star, ChevronRight, AlertTriangle } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
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
          <div className="bg-green-600 mb-6 px-4 py-1.5 opacity-100 rounded-full inline-flex items-center gap-2 border border-green-500/30">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-slate-50 text-sm font-medium">24/7 Emergency Service Available</span>
          </div>

          <h1 className="text-zinc-900 mb-6 text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">Water Heater
<span className="text-green-900">Experts</span> You
Can Trust



          </h1>

          <p className="text-gray-900 mb-10 text-xl leading-relaxed max-w-2xl">Fast, professional water heater installation, repair, and maintenance. Licensed technicians, transparent pricing, and same-day service available.


          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <Link to={createPageUrl("Booking")}>
              <Button size="lg" className="bg-green-700 hover:bg-green-800 text-white text-base px-8 h-14 shadow-lg shadow-green-900/40 w-full sm:w-auto">
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
            { icon: Phone, text: "24/7 Support" }].
            map(({ icon: Icon, text }) =>
            <div key={text} className="flex items-center gap-2 text-slate-300">
                <div className="w-8 h-8 rounded-full bg-green-600/20 border border-green-500/30 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-zinc-900 text-sm font-medium">{text}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-white/20" />
      </div>
    </section>);

}