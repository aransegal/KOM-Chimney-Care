import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X, User } from "lucide-react";
import { base44 } from "@/api/base44Client";

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
  const [user, setUser] = useState(null);
  const isHome = currentPageName === "Home";
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']") || document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    link.href = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c9ea61bf0c459e3994bae/eb90a4e88_faviconlogo.png";
    document.head.appendChild(link);
  }, []);

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
  { label: "Products", id: "pricing" },
  { label: "Financing", id: "financing" },
  { label: "About Us", id: "about" },
  { label: "Contact Us", id: "contact" }];


  return (
    <div className="min-h-screen bg-white">
      <style>{greenTheme}</style>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome ?
        "bg-white/95 backdrop-blur-sm shadow-md" :
        "bg-transparent"}`
        }>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-4">
              <button
                onClick={() => scrollToSection("hero")}
                className="flex items-center">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c9ea61bf0c459e3994bae/3c3926438_logo_-_gradient_-_no_bckground-removebg-preview.png"
                  alt="KOM Water Heaters"
                  className="h-12 w-auto" />
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) =>
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)} className="text-gray-900 text-sm font-medium transition-colors hover:text-green-600">




                  {link.label}
                </button>
              )}

              <a href="https://www.kom.construction/" target="_blank" rel="noopener noreferrer" className="text-gray-900 text-sm font-medium transition-colors hover:text-green-600">KOM USA</a>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              {isAdmin && (
                <Link to={createPageUrl("AdminDashboard")}>
                  <Button variant="outline" size="sm" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                    Admin
                  </Button>
                </Link>
              )}
              <a
                href="tel:+13138040844" className="text-gray-900 text-sm font-semibold flex items-center gap-1.5 hover:text-green-600 transition-colors"><Phone className="w-4 h-4" /> (313) 804-0844






              </a>
              <Link to={createPageUrl("Booking")}>
                <Button className="bg-green-700 hover:bg-green-800 text-white px-5 shadow-md">
                  Book Installation
                </Button>
              </Link>
              <Link to={createPageUrl("Account")} className="flex items-center justify-center w-9 h-9 rounded-full bg-green-100 hover:bg-green-200 text-green-700 transition-colors" title="My Account">
                <User className="w-5 h-5" />
              </Link>
            </div>

            <button
              className={`lg:hidden p-2 rounded-md ${scrolled || !isHome ? "text-slate-800" : "text-gray-800"}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>

              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen &&
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl">
            <div className="px-5 py-5 space-y-1">
              <a href="https://www.kom.construction/" target="_blank" rel="noopener noreferrer" className="block w-full text-left py-3 px-3 rounded-lg text-slate-700 font-medium hover:bg-green-50 hover:text-green-700 transition-colors">KOM USA</a>
              {navLinks.map((link) =>
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="block w-full text-left py-3 px-3 rounded-lg text-slate-700 font-medium hover:bg-green-50 hover:text-green-700 transition-colors">

                  {link.label}
                </button>
            )}
              <Link to={createPageUrl("Account")} onClick={() => setMobileMenuOpen(false)} className="block w-full text-left py-3 px-3 rounded-lg text-slate-700 font-medium hover:bg-green-50 hover:text-green-700 transition-colors">My Orders</Link>
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <a
                href="tel:+13138040844"
                className="flex items-center gap-2 py-3 px-3 text-slate-700 font-semibold">

                  <Phone className="w-4 h-4 text-green-600" />
                  (313) 804-0844
                </a>
                <Link to={createPageUrl("Booking")} onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-green-700 hover:bg-green-800 text-white">
                    Book Installation
                  </Button>
                </Link>
                {isAdmin && (
                  <Link to={createPageUrl("AdminDashboard")} onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-orange-300 text-orange-600 hover:bg-orange-50">
                      Admin Dashboard
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        }
      </nav>

      <main>{children}</main>

      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-slate-800">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c9ea61bf0c459e3994bae/3c3926438_logo_-_gradient_-_no_bckground-removebg-preview.png"
                  alt="KOM Water Heaters"
                  className="h-10 w-auto brightness-0 invert" />

              </div>
              <p className="text-slate-400 text-sm leading-relaxed">Professional water heater installation and repairs. Licensed & insured.

              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">Services</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                {["Water Heaters Installation", "24/7 Emergency Services"].map((s) =>
                <li key={s} className="hover:text-green-400 cursor-pointer transition-colors">{s}</li>
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                {["About Us", "KOM USA"].map((s) =>
                <li key={s} className="hover:text-green-400 cursor-pointer transition-colors">{s}</li>
                )}
                <li>
                  <Link to="/OwnerSupport" className="hover:text-green-400 transition-colors">Owner Support</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">Contact</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
                  (313) 804-0844
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 flex-shrink-0 text-orange-500 text-center">@</span>
                  <a href="mailto:Kom.construction.llc@gmail.com" className="hover:text-green-400 transition-colors">
                    Kom.construction.llc@gmail.com
                  </a>
                </li>
                <li className="text-green-400 font-medium">Available 24/7 for emergencies</li>
              </ul>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
            <p>© 2026 KOM Water Heaters. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/OwnerSupport" className="hover:text-white transition-colors">Owner Support</Link>
              <button onClick={() => scrollToSection("financing")} className="hover:text-white transition-colors text-slate-500">Financing</button>
              <Link to={createPageUrl("PrivacyPolicy")} className="hover:text-white transition-colors">Privacy Policy</Link>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              {isAdmin && (
                <Link to={createPageUrl("AdminDashboard")} className="hover:text-white transition-colors">Admin</Link>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>);

}