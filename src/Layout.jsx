import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X, Flame } from "lucide-react";

const greenTheme = `
  :root {
    --primary: 145 63% 32%;
    --primary-foreground: 0 0% 98%;
    --secondary: 138 30% 94%;
    --secondary-foreground: 145 63% 22%;
    --muted: 138 20% 95%;
    --muted-foreground: 145 10% 45%;
    --accent: 138 30% 90%;
    --accent-foreground: 145 63% 22%;
    --border: 138 20% 88%;
    --input: 138 20% 88%;
    --ring: 145 63% 32%;
  }
`;

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = currentPageName === "Home";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (isHome) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/" + "#" + sectionId;
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "Services", id: "services" },
    { label: "Pricing", id: "pricing" },
    { label: "About Us", id: "about" },
    { label: "KOM USA", id: "kom-usa" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>{greenTheme}</style>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isHome
            ? "bg-white/95 backdrop-blur-sm shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to={createPageUrl("Home")} className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-green-700 rounded-lg flex items-center justify-center shadow-md">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div className="leading-none">
                <div className={`text-lg font-extrabold tracking-tight ${scrolled || !isHome ? "text-slate-900" : "text-white"}`}>
                  KOM<span className="text-green-500"> Water Heaters</span>
                </div>
                <div className={`text-[10px] font-medium tracking-widest uppercase ${scrolled || !isHome ? "text-slate-400" : "text-white/60"}`}>
                  Professional Service
                </div>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-sm font-medium transition-colors hover:text-orange-600 ${
                    scrolled || !isHome ? "text-slate-700" : "text-white/90"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+18005551234"
                className={`flex items-center gap-1.5 text-sm font-semibold hover:text-orange-600 transition-colors ${
                  scrolled || !isHome ? "text-slate-800" : "text-white"
                }`}
              >
                <Phone className="w-4 h-4" />
                (800) 555-1234
              </a>
              <Link to={createPageUrl("Booking")}>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white px-5 shadow-md">
                  Book Service
                </Button>
              </Link>
            </div>

            <button
              className={`lg:hidden p-2 rounded-md ${scrolled || !isHome ? "text-slate-800" : "text-white"}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl">
            <div className="px-5 py-5 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left py-3 px-3 rounded-lg text-slate-700 font-medium hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <a
                  href="tel:+18005551234"
                  className="flex items-center gap-2 py-3 px-3 text-slate-700 font-semibold"
                >
                  <Phone className="w-4 h-4 text-orange-600" />
                  (800) 555-1234
                </a>
                <Link to={createPageUrl("Booking")} onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    Book Service
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main>{children}</main>

      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-slate-800">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">KOM Water Heaters</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Professional water heater installation, repair, and maintenance. Licensed, bonded & insured.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">Services</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                {["Installation", "Repair & Diagnostics", "Preventive Maintenance", "Emergency 24/7"].map((s) => (
                  <li key={s} className="hover:text-orange-400 cursor-pointer transition-colors">{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                {["About Us", "KOM USA", "Reviews", "Careers"].map((s) => (
                  <li key={s} className="hover:text-orange-400 cursor-pointer transition-colors">{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">Contact</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  (800) 555-1234
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 flex-shrink-0 text-orange-500 text-center">@</span>
                  info@komwaterheaters.com
                </li>
                <li className="text-orange-400 font-medium">Available 24/7 for emergencies</li>
              </ul>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
            <p>© 2024 KOM Water Heaters. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <Link to={createPageUrl("AdminDashboard")} className="hover:text-white transition-colors">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}