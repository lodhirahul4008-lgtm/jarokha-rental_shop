import React from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, MessageCircle, ArrowRight } from "lucide-react";
import { Product } from "../data/products";
import { CONFIG } from "../config";

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export default function ProductCard({
  product,
  onQuickView,
  onToggleWishlist,
  isWishlisted,
}: ProductCardProps) {
  const getWhatsAppLink = () => {
    const message = `Hi, I am interested in renting this ethnic outfit:\n*Product:* ${product.name}\n*Price:* ${CONFIG.currencySymbol}${product.price} / 3 Days\nPlease help me check sizing and availability.`;
    return `https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
  };

  // Determine availability status label
  // Let's assume if booked dates includes today or next week, we can write 'Limited'
  // Or check custom stock values
  const totalStock = Object.values(product.stockBySize).reduce((a, b) => a + b, 0);
  let statusBadge: { text: string; bg: string; textCol: string } = {
    text: "Available",
    bg: "bg-emerald-50 border-emerald-200",
    textCol: "text-emerald-700",
  };

  if (totalStock === 0) {
    statusBadge = {
      text: "Booked Out",
      bg: "bg-rose-50 border-rose-200",
      textCol: "text-rose-700",
    };
  } else if (product.bookedDates.length > 3) {
    statusBadge = {
      text: "High Demand",
      bg: "bg-amber-50 border-amber-200",
      textCol: "text-amber-700",
    };
  }

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-luxury border border-[#D4AF37]/15 flex flex-col h-full">
      {/* Product Image Panel */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
        <Link to={`/collection/${product.slug}`} className="block h-full w-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-center z-10 pointer-events-none">
          {product.featured ? (
            <span className="pointer-events-auto bg-maroon text-amber-50 text-[10px] uppercase tracking-wider font-semibold py-1 px-2.5 rounded-full shadow-md">
              New Arrival
            </span>
          ) : (
            <div />
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleWishlist(product);
            }}
            className="pointer-events-auto p-2 rounded-full bg-[#FAF7F2]/90 backdrop-blur-xs text-neutral-400 hover:text-red-500 shadow-md transition-colors"
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? "text-red-500 fill-current" : ""}`} />
          </button>
        </div>

        {/* Availability custom label */}
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <span className={`inline-flex items-center text-[10px] font-semibold tracking-wider font-sans uppercase px-2 py-0.5 rounded-md border shadow-xs ${statusBadge.bg} ${statusBadge.textCol}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current mr-1 animate-pulse" />
            {statusBadge.text}
          </span>
        </div>

        {/* Action icons Hover overlay (only visible on desktop hover) */}
        <div className="absolute inset-0 bg-neutral-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none">
          <button
            onClick={() => onQuickView(product)}
            className="pointer-events-auto p-3 rounded-full bg-white hover:bg-maroon hover:text-white text-neutral-800 shadow-lg transition-transform translate-y-3 group-hover:translate-y-0 duration-300"
            title="Quick View"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white text-left">
        <div>
          {/* Category */}
          <span className="text-[10px] uppercase font-bold text-gold tracking-widest block mb-1">
            {product.category}
          </span>

          {/* Name & Title */}
          <Link to={`/collection/${product.slug}`} className="block">
            <h3 className="font-display font-bold text-neutral-800 text-sm md:text-base hover:text-maroon transition duration-200 line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Sizing tags */}
          <div className="flex gap-1 mt-1.5 items-center flex-wrap">
            <span className="text-[10px] text-neutral-400 font-sans mr-1">Sizes:</span>
            {product.sizes.map((sz) => (
              <span key={sz} className="text-[9px] font-semibold text-neutral-600 bg-neutral-100 border border-neutral-200 px-1 rounded-sm">
                {sz}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing Block */}
        <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-neutral-400 uppercase">3 Days Rent</span>
            <span className="text-base font-bold text-maroon font-display leading-tight">
              {CONFIG.currencySymbol}{product.price.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex flex-col text-right">
            <span className="text-[10px] text-neutral-400 uppercase">Refundable Dep.</span>
            <span className="text-xs font-semibold text-neutral-600">
              {CONFIG.currencySymbol}{product.deposit.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Rent & Inquiry buttons */}
        <div className="grid grid-cols-2 gap-1.5 mt-4">
          <Link
            to={`/collection/${product.slug}`}
            className="text-[10px] font-semibold uppercase text-center border border-maroon hover:bg-maroon hover:text-white text-maroon py-2 rounded-md transition duration-200 flex items-center justify-center gap-1"
          >
            Details <ArrowRight className="w-3 h-3" />
          </Link>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-semibold uppercase text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md transition duration-200 flex items-center justify-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
