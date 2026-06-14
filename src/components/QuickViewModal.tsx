import React, { useState } from "react";
import { X, ShoppingBag, Eye, Calendar, ShieldCheck, Heart, Info, MessageCircle } from "lucide-react";
import { Product, checkAvailability } from "../data/products";
import { CONFIG } from "../config";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onBook: (product: Product, size: string, date: string, duration: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export default function QuickViewModal({
  product,
  onClose,
  onBook,
  onToggleWishlist,
  isWishlisted,
}: QuickViewModalProps) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "M");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<number>(3);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [availabilityMsg, setAvailabilityMsg] = useState<{ status: "idle" | "available" | "unavailable"; text: string }>({
    status: "idle",
    text: "",
  });

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    if (!date) {
      setAvailabilityMsg({ status: "idle", text: "" });
      return;
    }
    const check = checkAvailability(product, selectedSize, date);
    if (check.available) {
      setAvailabilityMsg({ status: "available", text: check.reason });
    } else {
      setAvailabilityMsg({ status: "unavailable", text: check.reason });
    }
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    if (selectedDate) {
      const check = checkAvailability(product, size, selectedDate);
      if (check.available) {
        setAvailabilityMsg({ status: "available", text: check.reason });
      } else {
        setAvailabilityMsg({ status: "unavailable", text: check.reason });
      }
    }
  };

  const getWhatsAppLink = () => {
    const message = `Hi, I want to rent this outfit:\n*Product:* ${product.name}\n*Price:* ${CONFIG.currencySymbol}${product.price}\n*Size:* ${selectedSize}\n*Event Date:* ${selectedDate || "Not Selected"}\n*Rental Duration:* ${selectedDuration} Days\nPlease confirm availability.`;
    return `https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
  };

  const handleBookNow = () => {
    onBook(product, selectedSize, selectedDate, selectedDuration);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-xl overflow-hidden shadow-2xl border border-[#D4AF37]/20 flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 text-neutral-500 hover:text-maroon hover:bg-cream-dark rounded-full transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Images (Left side) */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-cream-dark/30 md:border-r border-[#D4AF37]/10 overflow-y-auto">
          <div className="relative aspect-[3/4] w-full bg-neutral-200 rounded-lg overflow-hidden group">
            <img
              src={product.images[activeImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {product.featured && (
              <span className="absolute top-3 left-3 bg-maroon text-amber-100 text-xs px-2.5 py-1 font-semibold rounded-full shadow-md uppercase tracking-wider">
                Featured
              </span>
            )}
          </div>

          {/* Image Selectors */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-20 rounded-md overflow-hidden border-2 transition ${
                    idx === activeImageIndex ? "border-maroon opacity-100" : "border-transparent opacity-60 hover:opacity-90"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details (Right side) */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex justify-between items-start gap-4 mb-1">
              <div>
                <span className="text-xs font-semibold uppercase text-gold tracking-widest">{product.category}</span>
                <h2 className="text-xl md:text-2xl font-bold font-display text-neutral-800 leading-tight mt-0.5">{product.name}</h2>
              </div>
              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-2.5 rounded-full border transition-colors ${
                  isWishlisted
                    ? "bg-rose-50 text-red-500 border-red-200"
                    : "bg-white text-neutral-400 hover:text-neutral-600 border-neutral-200"
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Price Line */}
            <div className="flex items-baseline gap-4 mt-2 py-2 border-b border-[#D4AF37]/10">
              <span className="text-2xl font-bold text-maroon font-display">
                {CONFIG.currencySymbol}{product.price}
                <span className="text-xs text-neutral-500 font-sans font-normal ml-1">/ {CONFIG.rental.defaultDurationDays} Days Rent</span>
              </span>
              <span className="text-xs text-neutral-500 border-l border-[#D4AF37]/30 pl-3">
                Deposit: <strong className="text-neutral-700">{CONFIG.currencySymbol}{product.deposit}</strong>
              </span>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 text-xs my-3 text-neutral-600 bg-neutral-50 p-2.5 rounded-md border border-neutral-100">
              <div><strong>Fabric:</strong> {product.fabric}</div>
              <div><strong>Color:</strong> {product.color}</div>
              <div className="col-span-2"><strong>Work Details:</strong> {product.work}</div>
            </div>

            {/* Size selection */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-neutral-700">Select Size:</span>
                <a
                  href={`https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi, I need help with sizing for outfit: ${product.name}. My measurements are...`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-maroon hover:underline flex items-center gap-1 font-medium"
                >
                  <Info className="w-3.5 h-3.5" /> Ask Size help
                </a>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => handleSizeChange(sz)}
                    className={`min-w-10 h-10 px-3 text-xs font-semibold rounded-md border transition flex items-center justify-center ${
                      selectedSize === sz
                        ? "bg-maroon text-amber-50 border-maroon shadow-md"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-maroon"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Picker Check */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Event Date:</label>
                <div className="relative">
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={selectedDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full text-xs px-3 py-2 border rounded-md border-neutral-200 focus:outline-none focus:ring-1 focus:ring-maroon bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Rental Duration:</label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(parseInt(e.target.value))}
                  className="w-full text-xs px-3 py-2 border rounded-md border-neutral-200 focus:outline-none focus:ring-1 focus:ring-maroon bg-white"
                >
                  <option value={1}>1 Day (Express)</option>
                  <option value={2}>2 Days</option>
                  <option value={3}>3 Days (Standard)</option>
                  <option value={7}>7 Days (Extended)</option>
                </select>
              </div>
            </div>

            {/* Availability message */}
            {selectedDate && (
              <div
                className={`p-2.5 rounded-lg text-xs leading-relaxed mb-4 flex items-start gap-2 ${
                  availabilityMsg.status === "available"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-100"
                    : "bg-red-50 text-red-800 border border-red-100"
                }`}
              >
                <div className="mt-0.5 font-bold">●</div>
                <div>{availabilityMsg.text}</div>
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2 border-t border-[#D4AF37]/10">
            {/* Book & WhatsApp buttons */}
            <div className="flex gap-2">
              <button
                disabled={selectedDate && availabilityMsg.status === "unavailable"}
                onClick={handleBookNow}
                className="flex-1 bg-maroon hover:bg-[#6c0217] text-white py-2.5 px-4 rounded-lg font-medium text-xs transition flex items-center justify-center gap-1.5 shadow-md disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-4 h-4" /> Book This Outfit
              </button>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-4 rounded-lg font-medium text-xs transition flex items-center justify-center gap-1.5 shadow-md text-center"
              >
                <MessageCircle className="w-4 h-4 fill-current" /> WhatsApp Order
              </a>
            </div>
            <p className="text-[10px] text-center text-neutral-500">
              ⚠️ Returns are expected clean within {selectedDuration} days. See policies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
