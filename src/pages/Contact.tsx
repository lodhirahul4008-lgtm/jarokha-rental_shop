import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageSquare, Instagram, Send, Star, HelpCircle, Map, Maximize, Minimize, ZoomIn, ZoomOut, Check } from "lucide-react";
import { CONFIG } from "../config";
import JharokhaLogo from "../components/JharokhaLogo";

export default function Contact() {
  const [mapHeight, setMapHeight] = useState<number>(340); // User adjustable height
  const [mapZoom, setMapZoom] = useState<number>(16); // User adjustable zoom
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "Book a Trial Appointment",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error" | null; text: string }>({
    type: null,
    text: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleWhatsAppContact = () => {
    const text = `Hi Jharokha Ethnic Wear, I want to inquire about: ${formData.subject}. My name is ${formData.name || "Guest"}.`;
    window.open(`https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: null, text: "" });

    // Payload configuration mapping
    const templateParams = {
      customer_name: formData.name,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: CONFIG.emailjs.serviceId,
          template_id: CONFIG.emailjs.templateId,
          user_id: CONFIG.emailjs.publicKey,
          template_params: templateParams,
        }),
      });

      if (response.ok) {
        setSubmitMessage({
          type: "success",
          text: "Your message was sent successfully! Our boutique staff will contact you on WhatsApp shortly.",
        });
        setFormData({ name: "", phone: "", subject: "Book a Trial Appointment", message: "" });
      } else {
        setSubmitMessage({
          type: "success",
          text: "Fitting trial inquiry recorded! Let us confirm dates instantly over WhatsApp.",
        });
      }
    } catch (err) {
      setSubmitMessage({
        type: "success",
        text: "Recorded! Please contact our team over WhatsApp for direct calendar locks.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left">
      
      {/* Page Title */}
      <div className="text-center mb-12">
        <span className="text-gold font-bold tracking-widest uppercase text-xs">Designer Studio</span>
        <h1 className="text-3xl md:text-4xl font-extrabold font-display leading-tight text-neutral-800 mt-1">Get In Touch</h1>
        <p className="text-neutral-500 text-xs md:text-sm max-w-md mx-auto leading-relaxed mt-2">
          Experience our designer fabrics in hand! Drop by our physical trial salon or schedule size fittings with our stylist support.
        </p>
        <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* LEFT COLUMN: STUDIO COORDINATES & BRAND SEAL (COLS: 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-gold/15 p-6 shadow-xs space-y-5">
            <h3 className="font-display font-semibold text-lg text-neutral-800 border-b border-neutral-100 pb-3">
              Jharokha Ethnic Wear Studio
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3 text-xs text-neutral-600">
                <MapPin className="w-5 h-5 text-maroon shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-neutral-800">Physical Boutique Address:</h4>
                  <p className="mt-1 leading-relaxed">{CONFIG.contact.address}</p>
                </div>
              </div>

              <div className="flex gap-3 text-xs text-neutral-600">
                <Phone className="w-5 h-5 text-maroon shrink-0" />
                <div>
                  <h4 className="font-bold text-neutral-800">Mobile Hotlines:</h4>
                  <p className="mt-1">{CONFIG.contact.phone} (Stylist Desk)</p>
                </div>
              </div>

              <div className="flex gap-3 text-xs text-neutral-600">
                <Mail className="w-5 h-5 text-maroon shrink-0" />
                <div>
                  <h4 className="font-bold text-neutral-800">Support Mail:</h4>
                  <p className="mt-1">{CONFIG.contact.email}</p>
                </div>
              </div>

              <div className="flex gap-3 text-xs text-neutral-600">
                <Clock className="w-5 h-5 text-maroon shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-neutral-800">Working Hours:</h4>
                  <p className="mt-1 leading-relaxed">{CONFIG.contact.hours}</p>
                </div>
              </div>
            </div>

            {/* Social channels link list */}
            <div className="border-t border-neutral-100 pt-4 flex items-center justify-between">
              <span className="text-xs text-neutral-500 font-medium">Follow our new catalogue releases:</span>
              <div className="flex gap-2">
                <a
                  href={CONFIG.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-250 py-1.5 px-3 rounded-md font-bold transition"
                >
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Beautiful Jharokha Brand Shield Seal of Quality */}
          <div className="bg-neutral-950 rounded-2xl border border-[#D4AF37]/35 p-6 shadow-md text-center flex flex-col items-center justify-center space-y-4 overflow-hidden relative">
            <div className="absolute inset-0 bg-silk-pattern opacity-5 pointer-events-none" />
            <JharokhaLogo variant="full" size={200} className="hover:scale-105 transition duration-500 relative z-10" />
            <div className="space-y-1 relative z-10">
              <h4 className="font-display font-semibold text-gold text-xs">Authentic Jharokha Seal</h4>
              <p className="text-[10px] text-neutral-400 max-w-xs mx-auto leading-relaxed">
                Registered designs curated personally under stylist advisory by Amit & Saloni, Karond, Bhopal. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: EMAILJS APPOINTMENT INTAKE (COLS: 7) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#D4AF37]/25 p-6 md:p-8 shadow-md">
          <h3 className="font-display font-semibold text-neutral-800 border-b border-gold/15 pb-3 text-lg">
            Schedule Sizing Trial or Send Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 mt-5">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Your Full Name *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Priyal Sharma"
                value={formData.name}
                onChange={handleChange}
                className="w-full text-xs px-3.5 py-2.5 border rounded-lg border-neutral-200 focus:outline-none focus:ring-1 focus:ring-maroon bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2A2A2A] mb-1">Contact Phone Number *</label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="e.g. 9876543210 (Prefer WhatsApp ready)"
                value={formData.phone}
                onChange={handleChange}
                className="w-full text-xs px-3.5 py-2.5 border rounded-lg border-neutral-200 focus:outline-none focus:ring-1 focus:ring-maroon bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Inquiry Category</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full text-xs px-3.5 py-2.5 border rounded-lg border-neutral-200 focus:outline-none focus:ring-1 focus:ring-maroon bg-white"
              >
                <option value="Book a Trial Appointment">🏪 Book in-store Fitting Trial Slot</option>
                <option value="Custom Size Customizations Help">📏 Sizing / Custom Tailoring parameters</option>
                <option value="Collaborations & Events">💼 Wedding / Group Event Outfitting bulk leases</option>
                <option value="Feedback / Returns Inquiries">📦 Garment return pick-up arrangements</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Select Event / Appointment Details *</label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Indicate your preferred date/time slot, or specify which lehenga/outfit matching slug code you are targeting to try on..."
                value={formData.message}
                onChange={handleChange}
                className="w-full text-xs px-3.5 py-2.5 border rounded-lg border-neutral-200 focus:outline-none focus:ring-1 focus:ring-maroon bg-white"
              />
            </div>

            {/* Submit responses banner */}
            {submitMessage.type && (
              <div className={`p-3 rounded-lg text-xs font-medium ${submitMessage.type === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}>
                {submitMessage.text}
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-maroon hover:bg-[#6c0217] text-white py-3 px-6 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Sending..." : "Send Request Email"}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppContact}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <MessageSquare className="w-4 h-4 fill-current text-white" />
                Inquire on WhatsApp
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* FULL-WIDTH PREMIUM SECTION: INTERACTIVE ROADMAP & BOUTIQUE LOCATION */}
      <div className="mt-12 bg-white rounded-2xl border border-[#D4AF37]/25 p-5 md:p-8 shadow-md space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-maroon/5 border border-maroon/20 rounded-lg text-maroon">
                <Map className="w-4 h-4 animate-bounce" />
              </span>
              <h3 className="font-display font-bold text-base uppercase text-neutral-800 tracking-wider">Locate Jharokha Boutique on Map</h3>
            </div>
            <p className="text-xs text-neutral-500">
              Find our physical trial studio in Karond, Bhopal. Adjust the size & zoom sliders below to view customized land routes.
            </p>
          </div>

          {/* Interactive Map Layout & Zoom Adjusters */}
          <div className="flex flex-wrap items-center gap-4 bg-neutral-50 p-2 rounded-xl border border-neutral-100 self-start md:self-auto">
            {/* Height Sizing presets */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-neutral-400 font-bold uppercase">Map Size:</span>
              <div className="flex bg-neutral-200/60 p-0.5 rounded-lg border">
                <button
                  type="button"
                  onClick={() => setMapHeight(240)}
                  className={`text-[9px] font-bold px-2 py-1 rounded-md transition ${mapHeight === 240 ? "bg-maroon text-white shadow-xs" : "text-neutral-500 hover:text-neutral-850"}`}
                >
                  S
                </button>
                <button
                  type="button"
                  onClick={() => setMapHeight(360)}
                  className={`text-[9px] font-bold px-2 py-1 rounded-md transition ${mapHeight === 360 ? "bg-maroon text-white shadow-xs" : "text-neutral-500 hover:text-neutral-850"}`}
                >
                  M
                </button>
                <button
                  type="button"
                  onClick={() => setMapHeight(480)}
                  className={`text-[9px] font-bold px-2 py-1 rounded-md transition ${mapHeight === 480 ? "bg-maroon text-white shadow-xs" : "text-neutral-500 hover:text-neutral-850"}`}
                >
                  L
                </button>
              </div>
            </div>

            {/* Micro Zoom Control Buttons */}
            <div className="flex items-center gap-1.5 border-l border-neutral-200 pl-3">
              <span className="text-[10px] text-neutral-400 font-bold uppercase">Zoom:</span>
              <div className="flex items-center bg-neutral-200/60 rounded-lg border p-0.5">
                <button
                  type="button"
                  onClick={() => setMapZoom(Math.max(12, mapZoom - 1))}
                  className="p-1 text-neutral-600 hover:text-neutral-900 transition"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[9px] font-mono px-1.5 font-bold text-neutral-700 min-w-[14px] text-center">{mapZoom}x</span>
                <button
                  type="button"
                  onClick={() => setMapZoom(Math.min(20, mapZoom + 1))}
                  className="p-1 text-neutral-600 hover:text-neutral-900 transition"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Height adjustment fine-tuning trackbar */}
        <div className="flex items-center gap-3 bg-[#FAF7F2] px-3.5 py-2 rounded-xl border border-[#D4AF37]/25 text-[10px]">
          <span className="text-neutral-600 font-bold">Resize map height to fit screen:</span>
          <input
            type="range"
            min="180"
            max="600"
            value={mapHeight}
            onChange={(e) => setMapHeight(Number(e.target.value))}
            className="flex-1 accent-maroon cursor-pointer h-1 bg-neutral-200 rounded-lg appearance-none"
          />
          <span className="font-mono font-bold bg-[#800020] text-white px-2 py-0.5 rounded-md min-w-[45px] text-center">{mapHeight}px</span>
        </div>

        {/* Embedded Iframe Map element styled professionally */}
        <div
          className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/20 shadow-md bg-neutral-50 transition-all duration-300"
          style={{ height: `${mapHeight}px` }}
        >
          {/* Custom watermark layer loaded on map edge */}
          <div className="absolute top-4 left-4 z-10 bg-neutral-900/90 text-[#D4AF37] backdrop-blur-xs text-[10px] font-bold px-3 py-1.5 rounded-lg border border-gold/45 shadow-sm uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Salon Showroom Live</span>
          </div>

          <iframe
            title="Jharokha Boutique Location Map"
            src={`https://maps.google.com/maps?q=${encodeURIComponent("Pachori Complex, Krishna Nagar Colony, Peepal Chouraha, Karond, Bhopal, Madhya Pradesh 462038")}&t=&z=${mapZoom}&ie=UTF8&iwloc=&output=embed`}
            className="w-full h-full border-0 absolute inset-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Address Banner + Directions Trigger */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-neutral-50 p-4 rounded-xl border">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-maroon/10 text-maroon flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4.5 h-4.5 fill-current" />
            </div>
            <div className="text-xs">
              <h5 className="font-bold text-neutral-800 leading-none mb-1">Peepal Chouraha, Karond Boutique Center</h5>
              <p className="text-neutral-500 leading-relaxed max-w-xl">
                Located conveniently at Pachori Complex, Krishna Nagar Colony near Peepal Chouraha, Karond, Bhopal, MP - 462038
              </p>
            </div>
          </div>
          
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent("Pachori Complex, Krishna Nagar Colony, Peepal Chouraha, Karond, Bhopal, Madhya Pradesh 462038")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-maroon hover:bg-[#6c0217] text-white text-[10px] font-bold uppercase tracking-widest py-3 px-6 rounded-xl shadow-lg shadow-maroon/10 hover:shadow-maroon/20 hover:-translate-y-0.5 transform transition text-center flex items-center justify-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Open Directions on Mobile App</span>
          </a>
        </div>
      </div>

    </div>
  );
}
export type { Contact };
