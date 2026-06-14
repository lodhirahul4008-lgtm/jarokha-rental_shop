import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MessageCircle, Heart, Calendar, ShieldCheck, Ruler, ArrowLeft, RefreshCw, Scissors, Sparkles, AlertCircle, ShoppingBag } from "lucide-react";
import { PRODUCTS, Product, checkAvailability } from "../data/products";
import { CONFIG } from "../config";

interface ProductDetailsProps {
  products: Product[];
  onBook: (product: Product, size: string, date: string, duration: number) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: Product[];
}

export default function ProductDetails({
  products,
  onBook,
  onToggleWishlist,
  wishlist,
}: ProductDetailsProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Find product by slug
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4 text-neutral-800">
        <span className="text-4xl">⚠️</span>
        <h1 className="font-display font-semibold text-lg">Outfit Detail Unresolved</h1>
        <p className="text-xs text-neutral-500 max-w-xs mx-auto">
          We couldn't locate any custom traditional outfit matching the requested URL key.
        </p>
        <Link to="/collection" className="inline-block bg-maroon text-white text-xs px-4 py-2 rounded-lg font-semibold uppercase">
          Return To Catalog
        </Link>
      </div>
    );
  }

  // State Management
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "M");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<number>(3);
  const [availabilityMsg, setAvailabilityMsg] = useState<{ status: "idle" | "available" | "unavailable"; text: string }>({
    status: "idle",
    text: "",
  });

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  // Recalculate price based on selection days (Example scale parameters: standard is 3 days. 1/2 days can reduce 10%/20%, 7 days is +50%)
  const getRecalculatedPrice = () => {
    if (selectedDuration === 1) return Math.floor(product.price * 0.85); // 15% discount for 1 day
    if (selectedDuration === 2) return Math.floor(product.price * 0.92); // 8% discount for 2 days
    if (selectedDuration === 7) return Math.floor(product.price * 1.55); // 55% extra for full week
    return product.price; // Standard 3 days
  };

  const currentPrice = getRecalculatedPrice();

  // Reset active image index when product changes
  useEffect(() => {
    setActiveImgIdx(0);
    setSelectedDate("");
    setAvailabilityMsg({ status: "idle", text: "" });
  }, [slug]);

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

  const getWhatsAppOrderLink = () => {
    const text = `Hi Jharokha Ethnic Wear! I want to confirm renting details for:\n` +
                 `*Outfit Name:* ${product.name}\n` +
                 `*Price:* ${CONFIG.currencySymbol}${currentPrice}\n` +
                 `*Size Requested:* ${selectedSize}\n` +
                 `*Date of Event:* ${selectedDate || "Not Selected"}\n` +
                 `*Rental Duration:* ${selectedDuration} Days\n\n` +
                 `Please check if we can ship this. Thank you!`;
    return `https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;
  };

  const getWhatsAppHelpLink = () => {
    const text = `Hi! I need sizing assistance with your catalog item: "${product.name}" (${product.category}).\nCan you guide me on chest & waist customizations?`;
    return `https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;
  };

  const handleBookNow = () => {
    onBook(product, selectedSize, selectedDate, selectedDuration);
    navigate("/booking");
  };

  // Filter Related category list
  const relatedProducts = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-12">
      
      {/* Back button Link */}
      <div className="mb-6 flex justify-between items-center text-xs text-neutral-500 font-sans">
        <Link to="/collection" className="flex items-center gap-1.5 hover:text-maroon transition-colors py-1.5">
          <ArrowLeft className="w-4 h-4" /> Back to Ethnic Catalog
        </Link>
        <span>Category: <strong className="text-neutral-700">{product.category}</strong></span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left">
        
        {/* LEFT COLUMN: VISUAL MEDIA ASSET CONTAINER (COLS: 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-[3/4] w-full bg-neutral-200 rounded-2xl overflow-hidden border border-[#D4AF37]/20 shadow-lg">
            <img
              src={product.images[activeImgIdx]}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.featured && (
              <span className="absolute top-4 left-4 bg-maroon text-amber-50 text-[10px] py-1 px-3 uppercase tracking-wider font-bold rounded-full shadow-md">
                Featured Piece
              </span>
            )}
          </div>

          {/* Thumbnail slider options */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-1.5">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIdx(idx)}
                  className={`relative w-20 h-24 rounded-lg overflow-hidden border-2 shrink-0 transition ${
                    idx === activeImgIdx ? "border-maroon opacity-100" : "border-transparent opacity-65 hover:opacity-90"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}

          {/* Sizing & Alteration notes box */}
          <div className="bg-[#FAF7F2] rounded-xl p-4.5 border border-[#D4AF37]/20 space-y-2.5 text-xs text-neutral-600">
            <div className="flex items-center gap-2 text-neutral-800 font-semibold uppercase text-[10px] tracking-wider">
              <Scissors className="w-4.5 h-4.5 text-maroon" /> Custom Alterations Options
            </div>
            <p className="leading-relaxed">
              We provide complimentary waist, arm-hole, and height alterations on standard sizes. Once booked, our catalog advisor will message you for measurements.
            </p>
            <div className="border-t border-neutral-200/50 pt-2 flex justify-between items-center text-[10px]">
              <span className="font-semibold text-neutral-700">Need specific customized measurements?</span>
              <a
                href={getWhatsAppHelpLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-maroon font-bold uppercase hover:underline"
              >
                Inquire now
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DETAILED INFORMATIONAL CONTROL CONSOLE (COLS: 7) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            
            {/* Header Categories & Wishlist toggle */}
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-gold tracking-widest bg-amber-50 px-2.5 py-1 border border-gold/15 rounded-md">
                  {product.category}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-neutral-800 leading-tight mt-3">
                  {product.name}
                </h1>
              </div>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3 rounded-full border transition-colors shrink-0 ${
                  isWishlisted
                    ? "bg-rose-50 border-rose-200 text-red-500"
                    : "bg-white border-neutral-200 text-neutral-400 hover:text-neutral-600"
                }`}
                title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-5.5 h-5.5 ${isWishlisted ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Custom Interactive Price Board */}
            <div className="bg-[#FAF7F2] rounded-xl p-4 border border-[#D4AF37]/20 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 gap-4">
              <div className="flex-1 space-y-1">
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-semibold">Flexible Rental Price</span>
                <p className="text-3xl font-black font-display text-maroon">
                  {CONFIG.currencySymbol}{currentPrice.toLocaleString("en-IN")}
                  <span className="text-xs font-sans font-normal text-neutral-500 ml-1">
                    for {selectedDuration} Days
                  </span>
                </p>
              </div>
              <div className="flex-1 pt-3 sm:pt-0 sm:pl-5 space-y-1">
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-semibold">Refundable Security Deposit</span>
                <p className="text-xl font-bold font-display text-neutral-700">
                  {CONFIG.currencySymbol}{product.deposit.toLocaleString("en-IN")}
                </p>
                <span className="text-[10px] text-neutral-500 block leading-none">
                  * Heavily guarded 100% returned immediately on return receipt
                </span>
              </div>
            </div>

            {/* Material Specifications */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-white border border-neutral-100 p-4 rounded-xl shadow-xs">
              <div>
                <span className="text-neutral-400 font-medium block">Color:</span>
                <strong className="text-neutral-700">{product.color}</strong>
              </div>
              <div>
                <span className="text-neutral-400 font-medium block">Premium Fabric:</span>
                <strong className="text-neutral-700">{product.fabric}</strong>
              </div>
              <div className="col-span-2 border-t border-neutral-100 pt-3">
                <span className="text-neutral-400 font-medium block">Artisan Embroidery Work:</span>
                <strong className="text-neutral-700">{product.work}</strong>
              </div>
              <div className="col-span-2 border-t border-neutral-100 pt-3">
                <span className="text-neutral-400 font-medium block">Best occasion profile:</span>
                <div className="flex gap-1 flex-wrap mt-1">
                  {product.occasion.map((occ) => (
                    <span key={occ} className="bg-amber-50 text-[#D4AF37] border border-gold/15 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                      {occ}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Outfit Narrative */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Garment Story</span>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">{product.description}</p>
            </div>

            {/* Sizes selector options */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-neutral-800 uppercase tracking-wider text-[10px]">Select Your Size</span>
                <button
                  onClick={() => {
                    window.open(getWhatsAppHelpLink(), "_blank");
                  }}
                  className="text-maroon hover:underline flex items-center gap-1 font-semibold"
                >
                  <Ruler className="w-3.5 h-3.5" /> Dimensions Guidelines help
                </button>
              </div>
              <div className="flex gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => handleSizeChange(sz)}
                    className={`min-w-11 h-11 px-3 text-xs font-semibold rounded-lg border transition-all ${
                      selectedSize === sz
                        ? "bg-maroon text-amber-50 border-maroon shadow-md scale-98"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-maroon"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* DATE & DURATION ACTIVE PICKERS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-maroon" /> Select Event Date
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="w-full text-xs p-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-maroon bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Select Days Term
                </label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(parseInt(e.target.value))}
                  className="w-full text-xs p-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-maroon bg-white"
                >
                  <option value={1}>1 Day Term (Express fitting - Save 15%)</option>
                  <option value={2}>2 Days Term (Standard pickup & return)</option>
                  <option value={3}>3 Days Term (Recommended Bridal period)</option>
                  <option value={7}>7 Days Term (Wedding tour premium - Extra time)</option>
                </select>
              </div>
            </div>

            {/* Availability real-time text */}
            {selectedDate && (
              <div
                className={`p-4 rounded-xl text-xs flex items-start gap-2.5 leading-relaxed bg-white border ${
                  availabilityMsg.status === "available"
                    ? "text-emerald-800 border-emerald-150 bg-emerald-50/40"
                    : "text-red-800 border-red-150 bg-red-50/40"
                }`}
              >
                <AlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${availabilityMsg.status === "available" ? "text-emerald-600" : "text-red-500"}`} />
                <div>{availabilityMsg.text}</div>
              </div>
            )}

            {/* Operational rules snippet */}
            <div className="p-3.5 bg-neutral-50 rounded-xl space-y-1.5 text-[10px] text-neutral-500 border border-neutral-200/50">
              <span className="font-bold text-neutral-700 uppercase tracking-wider block">Care, dry cleaning & return terms</span>
              <p className="leading-relaxed">
                🚨 Free dry cleaning is included in our catalog price! Do not attempt custom domestic hand/machine washing. Fabric drapes must be shipped back in our safe containers within {selectedDuration} days.
              </p>
            </div>

          </div>

          {/* DESKTOP DESK ACTIONS: BOOK + WHATSAPP */}
          <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row gap-3">
            <button
              disabled={selectedDate && availabilityMsg.status === "unavailable"}
              onClick={handleBookNow}
              className="flex-1 bg-maroon hover:bg-[#6c0217] text-[#FAF7F2] py-3 px-6 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg disabled:bg-neutral-300 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-4 h-4" /> Book Trial & Outfit
            </button>
            <a
              href={getWhatsAppOrderLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md text-center"
            >
              <MessageCircle className="w-5 h-5 fill-current text-white" /> WhatsApp Order
            </a>
          </div>

        </div>
      </div>

      {/* 2. RELATED PRODUCTS CAROUSEL ROW */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-neutral-200/50">
          <div className="text-left mb-8">
            <span className="text-gold font-bold uppercase text-[10px] tracking-widest block">More In Category</span>
            <h3 className="font-display font-semibold text-lg md:text-xl text-neutral-800">You Might Also Love</h3>
            <div className="w-8 h-0.5 bg-gold mt-1.5" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => {
              const isRelWish = wishlist.some((item) => item.id === p.id);
              return (
                <div key={p.id} className="group bg-white rounded-xl overflow-hidden border border-neutral-105 shadow-xs flex flex-col justify-between h-full hover:shadow-md transition">
                  <Link to={`/collection/${p.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-neutral-100">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover transition duration-300 group-hover:scale-102" />
                    <span className="absolute bottom-2.5 left-2.5 bg-neutral-900/75 backdrop-blur-xs text-white text-[10px] px-2.5 py-0.5 rounded-sm font-semibold">
                      {p.category}
                    </span>
                  </Link>
                  <div className="p-4 text-left">
                    <h4 className="font-display font-bold text-neutral-800 text-sm truncate hover:text-maroon">
                      <Link to={`/collection/${p.slug}`}>{p.name}</Link>
                    </h4>
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-neutral-50 text-xs">
                      <span className="font-bold text-maroon">{CONFIG.currencySymbol}{p.price}</span>
                      <Link to={`/collection/${p.slug}`} className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider hover:text-maroon">
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. MOBILE STICKY BOTTOM CONTROL CTA PANEL */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-xs shadow-2xl p-3 border-t border-[#D4AF37]/25 z-40 flex items-center justify-between gap-3">
        <div className="flex flex-col text-left">
          <span className="text-[9px] text-neutral-400 uppercase">Selected Price</span>
          <span className="text-sm font-black font-display text-maroon">
            {CONFIG.currencySymbol}{currentPrice} / {selectedDuration}d
          </span>
        </div>

        <div className="flex gap-1.5 flex-1 max-w-[70%]">
          <a
            href={getWhatsAppOrderLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-emerald-600 text-white rounded-md py-2 px-1 text-[10px] font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" /> WhatsApp
          </a>
          <button
            onClick={handleBookNow}
            className="flex-1 bg-maroon text-[#FAF7F2] rounded-md py-2 px-1 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1"
          >
            Book Now
          </button>
        </div>
      </div>

    </div>
  );
}
export type { ProductDetailsProps };
