import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, MessageSquare, Instagram, Facebook, Sparkles } from "lucide-react";
import { CONFIG } from "../config";
import JharokhaLogo from "./JharokhaLogo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleJoinWhatsApp = () => {
    const text = "Hi, I would like to join the Jharokha Ethnic Wear updates group for new catalog drops!";
    window.open(`https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <footer className="bg-neutral-900 text-[#FAF7F2] pt-12 pb-6 border-t border-[#D4AF37]/35 relative">
      {/* Decorative Gold Border Line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 text-left">
        {/* Brand Mission Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-1">
            <JharokhaLogo variant="horizontal" size={170} textColorClass="text-white" />
          </div>
          <p className="text-xs text-[#FAF7F2]/75 leading-relaxed">
            Bhopal's premium bridal, partywear, and daily ethnic clothing rental boutique owned by Amit & Saloni. We provide stylish, comfortable, and highly affordable designer traditional garments on rent without compromising on hygiene or fitting.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={CONFIG.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-neutral-800 hover:bg-maroon hover:text-[#FAF7F2] rounded-full text-gold transition"
              aria-label="Instagram Page"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={CONFIG.contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-neutral-800 hover:bg-maroon hover:text-[#FAF7F2] rounded-full text-gold transition"
              aria-label="Facebook Page"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <button
              onClick={handleJoinWhatsApp}
              className="p-2 bg-neutral-800 hover:bg-emerald-600 hover:text-white rounded-full text-gold transition-luxury"
              aria-label="WhatsApp Community Group"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Categories / Quick Links */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-dark border-b border-[#D4AF37]/10 pb-2">
            Collection Categories
          </h4>
          <ul className="space-y-2 text-xs text-[#FAF7F2]/75">
            <li>
              <Link to="/collection?category=Bridal%20Lehenga" className="hover:text-gold hover:underline transition">
                Bridal Lehengas
              </Link>
            </li>
            <li>
              <Link to="/collection?category=Wedding%20Lehenga" className="hover:text-gold hover:underline transition">
                Reception & Wedding Lehengas
              </Link>
            </li>
            <li>
              <Link to="/collection?category=Partywear" className="hover:text-gold hover:underline transition">
                Partywear Outfits & Dresses
              </Link>
            </li>
            <li>
              <Link to="/collection?category=Saree" className="hover:text-gold hover:underline transition">
                Silk & Banarasi Sarees
              </Link>
            </li>
            <li>
              <Link to="/collection?category=Gown" className="hover:text-gold hover:underline transition">
                Mehendi & Festive Gowns
              </Link>
            </li>
            <li>
              <Link to="/collection?category=Indo-western" className="hover:text-gold hover:underline transition">
                Indo-western Dhoti Sets
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Help Policies */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-dark border-b border-[#D4AF37]/10 pb-2">
            Help & Policies
          </h4>
          <ul className="space-y-2 text-xs text-[#FAF7F2]/75">
            <li>
              <Link to="/policies/terms" className="hover:text-gold hover:underline transition">
                Rental Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/policies/damage" className="hover:text-gold hover:underline transition">
                Security Deposit & Damage Policy
              </Link>
            </li>
            <li>
              <Link to="/policies/cancellation" className="hover:text-gold hover:underline transition">
                Cancellation & Return Policy
              </Link>
            </li>
            <li>
              <Link to="/policies/privacy" className="hover:text-gold hover:underline transition">
                Privacy Policy Guidelines
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-gold hover:underline transition">
                Frequently Asked Questions (FAQ)
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold hover:underline transition">
                Book In-Store Trial Appointment
              </Link>
            </li>
          </ul>
        </div>

        {/* Address / Booking Coordinates */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-dark border-b border-[#D4AF37]/10 pb-2">
            Store Contact Coordinates
          </h4>
          <ul className="space-y-3 text-xs text-[#FAF7F2]/75">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span>{CONFIG.contact.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <span>{CONFIG.contact.phone}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-gold shrink-0" />
              <span>{CONFIG.contact.email}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-semibold text-white">Store Hours:</span>
                <span>{CONFIG.contact.hours}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Trust & WhatsApp CTA bar in footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-[#FAF7F2]/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold-dark" />
          <span className="text-xs text-[#FAF7F2]/65">
            For personal custom sizing fitting inquiries, message of design details, please write directly on our WhatsApp channel.
          </span>
        </div>
        <button
          onClick={handleJoinWhatsApp}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2 px-5 rounded-lg flex items-center gap-2 shadow-sm transition"
        >
          <MessageSquare className="w-4 h-4 fill-current" /> Join VIP Catalog updates
        </button>
      </div>

      {/* Copy / Copyright segment */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-neutral-800 text-center text-[10px] text-[#FAF7F2]/45 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {currentYear} {CONFIG.brandName} Private Limited. All Rights Reserved.</p>
        <p>Premium Budget Traditional Outfitters • Karond, Bhopal, India.</p>
      </div>
    </footer>
  );
}
