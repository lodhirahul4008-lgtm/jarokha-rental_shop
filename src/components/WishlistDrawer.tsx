import React from "react";
import { X, Heart, Trash2, ArrowRight, MessageCircle } from "lucide-react";
import { Product } from "../data/products";
import { CONFIG } from "../config";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemove: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  onRemove,
  onSelectProduct,
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  const handleWhatsAppQuote = (product: Product) => {
    const text = `Hi Jharokha Ethnic Wear, I have added "${product.name}" to my wishlist and would like to check availability for an upcoming event!`;
    window.open(`https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden text-left">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
            <h3 className="font-display font-semibold text-neutral-800 text-lg flex items-center gap-1.5 leading-none">
              <Heart className="w-5 h-5 text-red-500 fill-current" /> My Wishlist ({wishlist.length})
            </h3>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-neutral-50 text-neutral-400 hover:text-maroon transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* List items */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {wishlist.length > 0 ? (
              wishlist.map((item) => (
                <div key={item.id} className="group relative bg-[#FAF7F2] p-3 rounded-xl border border-[#D4AF37]/15 flex gap-3 hover:border-maroon/25 transition">
                  <div className="w-16 h-20 bg-neutral-200 rounded-md overflow-hidden shrink-0">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  
                  <div className="flex-1 min-w-0 flex flex-col justify-between text-xs">
                    <div>
                      <h4 className="font-display font-medium text-neutral-800 truncate leading-snug">{item.name}</h4>
                      <p className="text-[10px] text-neutral-400 mt-0.5">{item.category}</p>
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-maroon font-bold font-sans">{CONFIG.currencySymbol}{item.price}</span>
                      <span className="text-[9px] text-neutral-400">/ 3d lease</span>
                    </div>
                  </div>

                  {/* Actions Trash & Book */}
                  <div className="flex flex-col justify-between items-end shrink-0 pl-1">
                    <button
                      onClick={() => onRemove(item)}
                      className="p-1 text-neutral-400 hover:text-red-500 transition rounded-full hover:bg-white"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => {
                        onSelectProduct(item);
                        onClose();
                      }}
                      className="text-[9px] font-bold text-maroon hover:underline flex items-center gap-0.5"
                    >
                      Rent <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 space-y-3">
                <span className="text-4xl">❤️</span>
                <h4 className="font-display font-semibold text-neutral-800 text-sm">Your Wishlist is Empty</h4>
                <p className="text-[11px] text-neutral-400 max-w-xs mx-auto">Click the heart button on outfits to preserve your design preferences here!</p>
                <div className="pt-2">
                  <button onClick={onClose} className="bg-maroon hover:bg-[#6c0217] text-[#FAF7F2] text-[10px] font-bold py-2 px-4 rounded-md uppercase tracking-wider">
                    Browse Outfits
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Section */}
          <div className="p-6 border-t border-neutral-100 bg-[#FAF7F2]/50 space-y-3 text-xs">
            <p className="text-[11px] text-neutral-500 text-center leading-normal">
              Wishlist preferences are secured locally within your browser! Feel free to checkout wishlist items at any time.
            </p>
            {wishlist.length > 0 && (
              <button
                onClick={() => {
                  wishlist.forEach(w => handleWhatsAppQuote(w));
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold tracking-wider py-2.5 rounded-lg flex items-center justify-center gap-1.5 shadow-md transition"
              >
                <MessageCircle className="w-4.5 h-4.5 fill-current" /> Consult Wishlist on WhatsApp
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
export type { WishlistDrawerProps };
