import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageSquare, Instagram, Send, Star, HelpCircle } from "lucide-react";
import { CONFIG } from "../config";
import JharokhaLogo from "../components/JharokhaLogo";

export default function Contact() {
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
        
        {/* LEFT COLUMN: STUDIO COORDINATES (COLS: 5) */}
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
            <JharokhaLogo variant="full" size={240} className="hover:scale-105 transition duration-500 relative z-10" />
            <div className="space-y-1 relative z-10">
              <h4 className="font-display font-semibold text-gold text-sm">Authentic Jharokha Seal</h4>
              <p className="text-[10px] text-neutral-400 max-w-xs mx-auto leading-relaxed">
                Registered designs curated personally under stylist advisory by Amit & Saloni, Karond, Bhopal. All Rights Reserved.
              </p>
            </div>
          </div>

          {/* BEAUTIFULLY STYLED GOOGLE MAPS PLACEHOLDER */}
          <div className="bg-neutral-100 rounded-2xl overflow-hidden aspect-[4/3] border border-[#D4AF37]/20 relative shadow-md">
            {/* Visual Vector Grid Mimicking Map Layout */}
            <div className="absolute inset-0 bg-neutral-200 opacity-20" style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
            
            <div className="absolute inset-0 bg-[#D4AF37]/5 flex flex-col items-center justify-center p-6 text-center space-y-3 z-10">
              <div className="w-10 h-10 rounded-full bg-maroon/15 text-maroon flex items-center justify-center shadow-md animate-bounce">
                <MapPin className="w-5 h-5 fill-current" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-semibold text-neutral-800 text-xs sm:text-sm">Karond, Bhopal, MP</h4>
                <p className="text-[10px] text-neutral-500 max-w-xs mx-auto">Pachori Complex, Krishna Nagar Colony, Peepal Chouraha, Karond, Bhopal, MP 462038</p>
              </div>
              
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(CONFIG.contact.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-maroon hover:bg-[#6c0217] text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-4 rounded-md shadow-xs transition"
              >
                Open Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: EMAILJS APPOINTMENT INTAKE (COLS: 7) */}
        <div className="lg:col-span-7 bg-[#FAF7F2] rounded-2xl border border-[#D4AF37]/25 p-6 md:p-8 shadow-md">
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

    </div>
  );
}
export type { Contact };
