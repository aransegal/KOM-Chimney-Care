import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service_type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.entities.ServiceRequest.create({ ...form, source: "contact_form" });
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section id="contact" className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-orange-400 font-semibold text-sm tracking-widest uppercase mb-3 block">Get In Touch</span>
          <h2 className="text-slate-900 mb-5 text-4xl font-extrabold sm:text-5xl">We're Ready to Help

          </h2>
          <p className="text-slate-700 mx-auto text-xl max-w-2xl">Have a question, need a quote, or facing an emergency? Reach out anytime.

          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {[
            {
              icon: Phone,
              title: "Call or Text",
              info: "(313) 804-0844",
              sub: "24/7 for emergencies",
              href: "tel:+13138040844"
            },
            {
              icon: Mail,
              title: "Email Us",
              info: "Kom.construction.llc@gmail.com",
              sub: "Replies within 2 hours",
              href: "mailto:Kom.construction.llc@gmail.com"
            },
            {
              icon: MapPin,
              title: "Service Area",
              info: "Greater Metro Area",
              sub: "Serving 50+ zip codes"
            },
            {
              icon: Clock,
              title: "Business Hours",
              info: "Mon–Sat: 7am – 8pm",
              sub: "Emergency: 24/7"
            }].
            map((item) =>
            <div key={item.title} className="flex items-start gap-4 p-5 bg-slate-800 rounded-xl border border-slate-700">
                <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-slate-400 text-xs font-medium mb-0.5">{item.title}</div>
                  {item.href ?
                <a href={item.href} className="text-white font-semibold hover:text-orange-400 transition-colors">
                      {item.info}
                    </a> :

                <div className="text-white font-semibold">{item.info}</div>
                }
                  <div className="text-slate-400 text-sm mt-0.5">{item.sub}</div>
                </div>
              </div>
            )}
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-8">
            {submitted ?
            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Received!</h3>
                <p className="text-slate-500 max-w-sm">
                  Thanks for reaching out. A KOM technician will contact you within 2 hours during business hours.
                </p>
                <Button
                className="mt-6 bg-orange-600 hover:bg-orange-700"
                onClick={() => {setSubmitted(false);setForm({ name: "", email: "", phone: "", service_type: "", message: "" });}}>

                  Send Another Message
                </Button>
              </div> :

            <>
                <h3 className="text-xl font-bold text-slate-900 mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Full Name *</label>
                      <Input
                      required
                      placeholder="John Smith"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })} />

                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Phone *</label>
                      <Input
                      required
                      placeholder="(555) 000-0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })} />

                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Email</label>
                    <Input
                    type="email"
                    placeholder="john@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />

                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Service Needed</label>
                    <select
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={form.service_type}
                    onChange={(e) => setForm({ ...form, service_type: e.target.value })}>

                      <option value="">Select a service...</option>
                      <option value="installation">Installation</option>
                      <option value="repair">Repair</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Message</label>
                    <Textarea
                    rows={4}
                    placeholder="Describe your issue or question..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })} />

                  </div>
                  <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white h-12 font-semibold">

                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </>
            }
          </div>
        </div>
      </div>
    </section>);

}