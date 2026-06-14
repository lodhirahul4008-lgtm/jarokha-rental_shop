import React from "react";
import { Link } from "react-router-dom";
import { X, Trash2, Calendar, ClipboardCheck, Info, MessageCircle, AlertCircle } from "lucide-react";
import { Product } from "../data/products";
import { CONFIG } from "../config";

export interface CartBookItem {
  product: Product;
  size: string;
  date: string;
  duration: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartBookItem[];
  onRemove: (idx: number) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onRemove,
}: CartDrawerProps) {
  if (!isOpen) return null;

  // Compute pricing totals
  const computeSubtotal = () => {
    return cart.reduce((total, item) => {
      let scalePrice = item.product.price;
      if (item.duration === 1) scalePrice = Math.floor(item.product.price * 0.85);
      if (item.duration === 2) scalePrice = Math.floor(item.product.price * 0.92);
      if (item.duration === 7) scalePrice = Math.floor(item.product.price * 1.55);
      return total + scalePrice;
    }, 0);
  };

  const computeDepositTotal = () => {
    return cart.reduce((total, item) => total + item.product.deposit, 0);
  };

  const subtotal = computeSubtotal();
  const refundableDeposit = computeDepositTotal();

  const handleWhatsAppInstantQuote = () => {
    if (cart.length === 0) return;
    
    let text = "Hi, I have selected outfits in my Jharokha Ethnic Wear cart and want to check instant date availability:\n\n";
    cart.forEach((item, idx) => {
      text += `*Outfit ${idx + 1}:* ${item.product.name}\n` +
              `*Size:* ${item.size}\n` +
              `*Event Date:* ${item.date || "Not set yet"}\n` +
              `*Duration:* ${item.duration} Days\n` +
              `*Rental:* ${CONFIG.currencySymbol}${item.product.price}\n\n`;
    });
    text += `*Summary Subtotal:* ${CONFIG.currencySymbol}${subtotal}\n*Refundable Deposit:* ${CONFIG.currencySymbol}${refundableDeposit}\nPlease confirm availability for these slots.`;
    
    window.open(`https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden text-left bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between h-full">
        {/* Header */}
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <h3 className="font-display font-semibold text-neutral-800 text-lg flex items-center gap-2 leading-none">
            <ClipboardCheck className="w-5 h-5 text-maroon" /> Booking Bag ({cart.length})
          </h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-neutral-50 text-neutral-400 hover:text-maroon transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Selected List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {cart.length > 0 ? (
            cart.map((item, idx) => {
              let adjustedPrice = item.product.price;
              if (item.duration === 1) adjustedPrice = Math.floor(item.product.price * 0.85);
              if (item.duration === 2) adjustedPrice = Math.floor(item.product.price * 0.92);
              if (item.duration === 7) adjustedPrice = Math.floor(item.product.price * 1.55);

              return (
                <div key={idx} className="group bg-[#FAF7F2] p-3 border border-[#D4AF37]/15 rounded-xl flex gap-3 relative transition hover:border-[#D4AF37]/40">
                  <div className="w-16 h-20 bg-neutral-200 rounded-md overflow-hidden shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between text-xs">
                    <div>
                      <h4 className="font-display font-bold text-neutral-800 truncate leading-snug">{item.product.name}</h4>
                      <div className="flex gap-1.5 flex-wrap text-[10px] text-neutral-500 mt-1">
                        <span className="bg-white px-1.5 py-0.5 rounded-sm border border-neutral-200"><strong>Size:</strong> {item.size}</span>
                        <span className="bg-white px-1.5 py-0.5 rounded-sm border border-neutral-200"><strong>Lease:</strong> {item.duration}d</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-maroon font-semibold mt-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Date: {item.date || "Not selected yet"}</span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end shrink-0 pl-1 text-xs">
                    <button
                      onClick={() => onRemove(idx)}
                      className="p-1 text-neutral-400 hover:text-red-500 transition rounded-full hover:bg-white"
                      title="Remove checkout item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <span className="font-sans font-bold text-maroon">
                      {CONFIG.currencySymbol}{adjustedPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 space-y-3">
              <span className="text-4xl">👜</span>
              <h4 className="font-display font-semibold text-neutral-800 text-sm">Your Booking bag is empty</h4>
              <p className="text-[11px] text-neutral-400 max-w-xs mx-auto">Selected fits, custom event dates and duration options live here.</p>
              <div className="pt-3">
                <button onClick={onClose} className="bg-maroon hover:bg-[#6c0217] text-[#FAF7F2] text-[10px] font-bold py-2 px-4 rounded-md uppercase tracking-wider">
                  Browse Outfit Catalog
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pricing Subtotals & checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-neutral-100 bg-[#FAF7F2] space-y-4 text-xs text-neutral-700">
            <div className="space-y-1.5">
              <div className="flex justify-between font-medium">
                <span>Rental Subtotal:</span>
                <span className="font-sans font-bold text-neutral-900">{CONFIG.currencySymbol}{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between font-medium text-neutral-500">
                <span className="flex items-center gap-1">
                  Refundable Security Deposit: 
                  <span title="Returned immediately post return verification" className="cursor-help text-neutral-400">❓</span>
                </span>
                <span className="font-sans font-semibold text-neutral-700">{CONFIG.currencySymbol}{refundableDeposit.toLocaleString("en-IN")}</span>
              </div>
              <div className="border-t border-neutral-200/50 pt-2.5 flex justify-between font-bold text-[#800020] text-sm">
                <span>Estimated Intake Total:</span>
                <span className="font-sans font-black text-maroon">{CONFIG.currencySymbol}{(subtotal + refundableDeposit).toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50/50 rounded-lg flex items-start gap-2 text-[10px] text-neutral-500 leading-normal border border-gold/15">
              <AlertCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <p>Security deposits are returned immediately once we inspect the dress dry-run return condition.</p>
            </div>

            <div className="space-y-2">
              <Link
                to="/booking"
                onClick={onClose}
                className="w-full bg-maroon hover:bg-[#6c0217] text-[#FAF7F2] py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-center block shadow-md transition"
              >
                Proceed To Booking Setup
              </Link>
              
              <button
                onClick={handleWhatsAppInstantQuote}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition shadow-sm"
              >
                <MessageCircle className="w-4.5 h-4.5 fill-current" /> Ask Availability on WhatsApp
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
export type { CartDrawerProps };
