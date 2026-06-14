import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart, ShoppingBag, MessageCircle, Phone, Sparkles } from "lucide-react";
import { CONFIG } from "../config";
import JharokhaLogo from "./JharokhaLogo";

interface NavbarProps {
  wishlistCount: number;
  cartCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
}

export default function Navbar({
  wishlistCount,
  cartCount,
  onOpenCart,
  onOpenWishlist,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Collection", path: "/collection" },
    { name: "Bridal Lehengas", path: "/collection?category=Bridal%20Lehengas" },
    { name: "Partywear Outfits & Dresses", path: "/collection?category=Partywear%20Outfits%20%26%20Dresses" },
    { name: "Store Manager", path: "/admin" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  const handleWhatsAppContact = () => {
    const text = "Hi, I am visiting the Jharokha Ethnic Wear website. I would like to inquire about booking details.";
    window.open(`https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      {/* Top Golden Announcement Bar */}
      <div className="w-full bg-maroon text-amber-100 py-2.5 px-4 text-xs font-medium text-center flex flex-col sm:flex-row items-center justify-between gap-2 z-50 sticky top-0 sm:static border-b border-gold/20">
        <div className="flex items-center gap-1.5 justify-center w-full sm:w-auto">
          <Sparkles className="w-3.5 h-3.5 text-gold animate-bounce" />
          <span>Budget-friendly bridal & partywear outfits on rent starting at ₹499!</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-amber-200/90 divide-x divide-amber-200/20">
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3 text-gold" /> {CONFIG.contact.phone}
          </span>
          <span className="pl-4">Follow Us: @jharokha_ethnic_wear05</span>
        </div>
      </div>

      {/* Main Header / Navigation Area */}
      <header className="sticky top-0 sm:top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-[#D4AF37]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand Name - Elegantly Styled */}
          <Link to="/" className="flex items-center gap-2 group">
            <JharokhaLogo variant="horizontal" size={160} />
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const currentActive = isActive(link.path.split("?")[0]) && 
                (!link.path.includes("?") || location.search === link.path.substring(link.path.indexOf("?")));
              
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs uppercase tracking-wider font-semibold transition ${
                    currentActive 
                      ? "text-maroon border-b-2 border-maroon pb-1"
                      : "text-neutral-600 hover:text-maroon pb-0"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Practical Actions Counter Bag */}
          <div className="flex items-center gap-2.5">
            {/* Wishlist Trigger */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-neutral-600 hover:text-red-500 hover:bg-neutral-50 rounded-full relative transition"
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5.5 h-5.5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white font-sans font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="p-2 text-neutral-600 hover:text-maroon hover:bg-neutral-50 rounded-full relative transition"
              title="View Booking Drawer"
              aria-label="Booking List"
            >
              <ShoppingBag className="w-5.5 h-5.5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-maroon text-amber-50 font-sans font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Help Button */}
            <button
              onClick={handleWhatsAppContact}
              className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 py-1.5 px-3 rounded-lg font-semibold transition"
            >
              <MessageCircle className="w-4 h-4 fill-current text-emerald-600" />
              <span>WhatsApp</span>
            </button>

            <Link
              to="/collection"
              className="hidden md:block text-xs text-amber-50 bg-maroon hover:bg-[#6c0217] py-2 px-4 rounded-lg font-semibold shadow-md transition"
            >
              Book Now
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-600 hover:text-maroon rounded-lg hover:bg-neutral-50 transition"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 border-b border-cream-dark shadow-xl absolute top-full left-0 w-full animate-fadeIn transition-luxury">
            <div className="py-4 px-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-semibold tracking-wide text-neutral-700 hover:text-maroon py-1 border-b border-neutral-50"
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-2 grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleWhatsAppContact();
                  }}
                  className="flex items-center justify-center gap-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 py-2.5 rounded-lg text-xs font-semibold"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Us</span>
                </button>
                <Link
                  to="/collection"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-maroon hover:bg-[#6c0217] text-white py-2.5 rounded-lg text-xs font-semibold text-center shadow-md shadow-maroon/10"
                >
                  Browse Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
