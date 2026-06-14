import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, MessageSquare, ShieldCheck, Sparkles, Star, CheckCircle, Store, Heart, User, Clock, HelpCircle, CalendarRange, ChevronRight } from "lucide-react";
import { PRODUCTS, Product } from "../data/products";
import { CONFIG } from "../config";
import ProductCard from "../components/ProductCard";
import JharokhaLogo from "../components/JharokhaLogo";

interface HomeProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: Product[];
}

export default function Home({ products, onQuickView, onToggleWishlist, wishlist }: HomeProps) {
  const navigate = useNavigate();
  const featuredScrollRef = useRef<HTMLDivElement>(null);

  const featuredProducts = products.filter((item) => item.featured).slice(0, 6);

  const heroOutfits = [
    {
      id: "prod-1",
      name: "Crimson Royal Bridal Lehenga",
      price: "₹4,999",
      category: "Bridal Lehengas",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
      colorTag: "#800020",
      accent: "Deep Crimson Velvet with Intricate Antique Gold Zari & Hand Cut Stones"
    },
    {
      id: "prod-9",
      name: "Maharani Velvet Bridal Lehenga",
      price: "₹3,499",
      category: "Bridal Lehengas",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
      colorTag: "#6c0217",
      accent: "Royal Maroon Velvet with Gota Patti and Heritage Zardosi Work"
    },
    {
      id: "prod-6",
      name: "Majestic Wine Real Mirror Lehenga",
      price: "₹3,499",
      category: "Reception & Wedding",
      image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&q=80&w=800",
      colorTag: "#4A0019",
      accent: "Geometric Real Mirror Embellishments on Premium Plum Raw Silk"
    },
    {
      id: "prod-5",
      name: "Vintage Banarasi Katan Silk Saree",
      price: "₹1,299",
      category: "Silk & Banarasi Sarees",
      image: "https://images.unsplash.com/photo-1610030470282-3e284da7ded7?auto=format&fit=crop&q=80&w=800",
      colorTag: "#141B34",
      accent: "Midnight Royal Blue with intricate pure gold zari brocade weaving"
    },
    {
      id: "prod-15",
      name: "Classic Crimson Kanjeevaram Saree",
      price: "₹1,499",
      category: "Silk & Banarasi Sarees",
      image: "https://images.unsplash.com/photo-1610030470217-1a48c41f71df?auto=format&fit=crop&q=80&w=800",
      colorTag: "#931621",
      accent: "Ruby red pure Kanchipuram silk thread with temple borders"
    },
    {
      id: "prod-2",
      name: "Blushing Rose Sequined Lehenga",
      price: "₹1,999",
      category: "Partywear Outfits & Dresses",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
      colorTag: "#E2AAAF",
      accent: "Lightweight Georgette beautifully hand-placed with baby sequins"
    },
    {
      id: "prod-4",
      name: "Emerald Forest Fusion Gown",
      price: "₹1,599",
      category: "Mehendi & Festive Gowns",
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800",
      colorTag: "#0B6623",
      accent: "Fluid green micro-chiffon styled with custom cutdana work belts"
    },
    {
      id: "prod-12",
      name: "Chanderi Rani Pink Anarkali Suit",
      price: "₹799",
      category: "Partywear Outfits & Dresses",
      image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&q=80&w=800",
      colorTag: "#C71585",
      accent: "Pure Cotton-Silk blend with classic gold borders and neck zari"
    }
  ];

  const [activeHeroIdx, setActiveHeroIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroIdx((prev) => (prev + 1) % heroOutfits.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { name: "Bridal Lehengas", count: "Starts ₹1999", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400", path: "/collection?category=Bridal%20Lehengas" },
    { name: "Reception & Wedding Lehengas", count: "Starts ₹2999", img: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&q=80&w=400", path: "/collection?category=Reception%20%26%20Wedding%20Lehengas" },
    { name: "Partywear Outfits & Dresses", count: "Starts ₹799", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=400", path: "/collection?category=Partywear%20Outfits%20%26%20Dresses" },
    { name: "Silk & Banarasi Sarees", count: "Starts ₹999", img: "https://images.unsplash.com/photo-1610030470282-3e284da7ded7?auto=format&fit=crop&q=80&w=400", path: "/collection?category=Silk%20%26%20Banarasi%20Sarees" },
    { name: "Mehendi & Festive Gowns", count: "Starts ₹1299", img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=400", path: "/collection?category=Mehendi%20%26%20Festive%20Gowns" },
    { name: "Indo-western Dhoti Sets", count: "Starts ₹1199", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=400", path: "/collection?category=Indo-western%20Dhoti%20Sets" },
  ];

  const rentalSteps = [
    { step: "Step 1", title: "Select Outfit", desc: "Choose your favorite traditional outfit from our virtual catalog of premium designer pieces." },
    { step: "Step 2", title: "Check Availability", desc: "Check stock and date blockings for your upcoming wedding or celebration event date." },
    { step: "Step 3", title: "Book or Order", desc: "Instantly submit your size and dates online or write to us directly on WhatsApp." },
    { step: "Step 4", title: "Delivery / Pickup", desc: "Get doorstep home delivery with clean garment boxes or pick it up at our boutique." },
    { step: "Step 5", title: "Return After Event", desc: "Return the outfit hassle-free within the booking duration. Fabric dry cleaning is on us!" },
  ];

  const handleWhatsAppOrder = () => {
    const text = "Hi, I saw your homepage and want to order/rent an ethnic bridal partywear outfit on a budget. Please confirm how to proceed.";
    window.open(`https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleBookAppt = () => {
    const text = "Hi, I want to book a designer in-store trial appointment to check fittings of physical lehengas. Please block a time.";
    window.open(`https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="bg-[#FAF7F2]">
      
      {/* 1. New Elegant & Interactive Jharokha Hero Area */}
      <section id="hero-section" className="relative overflow-hidden pt-12 md:pt-20 pb-16 md:pb-24 border-b border-[#D4AF37]/15 bg-gradient-to-b from-[#FAF7F2] via-[#FDFBF7] to-[#FAF7F2]">
        
        {/* Soft Royal Amber Glow */}
        <div className="absolute right-0 top-10 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-10 bottom-0 w-[300px] h-[300px] bg-maroon/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center text-left">
          
          {/* Hero Left Content Panel */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 relative z-10">
            <div id="hero-tagline-badge" className="inline-flex items-center gap-2 px-3 py-1 bg-maroon/5 border border-maroon/25 text-maroon text-[11px] rounded-full font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold animate-bounce" />
              <span>Bhopal's Premier Luxury Rental Destination</span>
            </div>
            
            <h1 id="hero-title" className="text-3.5xl sm:text-4.5xl md:text-5xl lg:text-5.5xl font-extrabold text-neutral-800 font-display tracking-tight leading-[1.12]">
              Drape Yourself in <br />
              <span className="text-maroon relative inline-block font-display">
                Royalty,
                <span className="absolute bottom-1.5 left-0 w-full h-[3px] bg-gradient-to-r from-[#D4AF37] to-transparent" />
              </span>{" "}
              On Budget.
              <span className="font-serif italic font-normal text-[#D4AF37] text-2xl sm:text-3xl md:text-[34px] block mt-2.5">
                Luxury Indian designer outfits starting ₹799
              </span>
            </h1>

            <p id="hero-description" className="text-neutral-600 text-sm md:text-base leading-relaxed max-w-xl font-medium">
              Why spend fortunes on custom traditional outfits you wear only once? Jharokha curates authentic heavy bridal lehengas, reception gowns, and premium heritage banarasi silk sarees with customized tailoring fittings for your special events.
            </p>

            {/* Simpler and more attractive horizontal key benefits */}
            <div id="hero-benefit-list" className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2 border-t border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] font-bold text-neutral-700 tracking-wide">Steam Sterilized</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] font-bold text-neutral-700 tracking-wide">Custom Tailoring</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] font-bold text-neutral-700 tracking-wide">Rent till 5-Days</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] font-bold text-neutral-700 tracking-wide">Bhopal Boutique</span>
              </div>
            </div>

            {/* Call to action panel buttons styled like premium designer boutique */}
            <div id="hero-actions" className="flex flex-col sm:flex-row gap-3.5 pt-2">
              <Link
                id="hero-browse-cta"
                to="/collection"
                className="bg-maroon hover:bg-[#6c0217] text-white py-4 px-8 rounded-xl text-xs font-bold uppercase tracking-widest text-center shadow-lg shadow-maroon/20 hover:shadow-maroon/30 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Explore Virtual Catalog
              </Link>
              <button
                id="hero-whatsapp-cta"
                onClick={handleWhatsAppOrder}
                className="border-2 border-emerald-500/30 hover:border-emerald-500 bg-white hover:bg-emerald-50/40 text-neutral-800 font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xs"
              >
                <MessageSquare className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                <span>Order on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* New Interactive Jharokha Window Image Frame */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            
            {/* Background frame circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gold/10 blur-2xl -z-1" />
            
            {/* Jharokha Shape Cutting Edge Picture Frame Box */}
            <div
              id="hero-jharokha-frame"
              className="relative w-full max-w-[340px] aspect-[4/5.5] border-[3px] border-[#D4AF37]/60 rounded-t-[140px] rounded-b-2xl overflow-hidden shadow-2xl bg-neutral-900 group"
              style={{
                boxShadow: "0 25px 50px -12px rgba(128, 0, 32, 0.25)"
              }}
            >
              {/* Overlay with subtle gold glint */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-black/15 to-transparent z-10" />

              {/* Transitioning image */}
              <img
                src={heroOutfits[activeHeroIdx].image}
                alt={heroOutfits[activeHeroIdx].name}
                className="w-full h-full object-cover transform scale-102 group-hover:scale-106 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Traditional Arch Frame Border Overlay */}
              <div className="absolute inset-[6px] border border-[#D4AF37]/35 rounded-t-[133px] rounded-b-xl pointer-events-none z-10" />

              {/* Quick Spec Tags */}
              <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-center">
                <span className="bg-maroon/90 text-amber-50 backdrop-blur-xs text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-gold/30 shadow-xs">
                  {heroOutfits[activeHeroIdx].category}
                </span>
                <span className="bg-emerald-600/90 text-white backdrop-blur-xs text-[10px] font-bold px-2.5 py-1 rounded-md">
                  Rent: {heroOutfits[activeHeroIdx].price}
                </span>
              </div>

              {/* Dynamic bottom detail overlays */}
              <div className="absolute bottom-6 left-6 right-6 z-20 text-white text-left space-y-1.5">
                <span className="text-[9px] uppercase tracking-widest font-extrabold text-[#D4AF37] block">🎯 Trending Selection</span>
                <h3 className="font-display font-bold text-base md:text-lg text-amber-55 line-clamp-1">
                  {heroOutfits[activeHeroIdx].name}
                </h3>
                <p className="text-[10px] text-neutral-300 leading-normal line-clamp-2 italic">
                  &ldquo;{heroOutfits[activeHeroIdx].accent}&rdquo;
                </p>
              </div>
            </div>

            {/* Custom Interactive Thumbnail Navigation bar under Jharokha window */}
            <div id="hero-slider-nav" className="flex items-center flex-wrap justify-center gap-2 md:gap-3 mt-5 bg-white px-3 md:px-4 py-2 md:py-2.5 rounded-2xl md:rounded-full border border-neutral-200/80 shadow-sm z-10 max-w-full">
              <span className="text-[9px] font-extrabold text-[#800020] uppercase tracking-wider mr-1 block w-full text-center md:inline md:w-auto">Trending Collection:</span>
              
              <div className="flex items-center justify-center gap-1.5 md:gap-2.5 flex-wrap">
                {heroOutfits.map((outfit, index) => {
                  const isActive = activeHeroIdx === index;
                  return (
                    <button
                      key={outfit.id + "-" + index}
                      onClick={() => setActiveHeroIdx(index)}
                      className={`w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden border-2 transition-all duration-300 relative shrink-0 ${
                        isActive ? "border-maroon scale-110 shadow-md" : "border-neutral-200 opacity-60 hover:opacity-100 hover:scale-105"
                      }`}
                      title={outfit.name}
                    >
                      <img
                        src={outfit.image}
                        alt={outfit.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-maroon/10 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            
            <p className="text-[10px] text-neutral-400 font-medium mt-2">
              💡 Tap preview circles above to browse the spotlight designer line!
            </p>

          </div>

        </div>
      </section>

      {/* Brand Heritage / Signature Section showcasing the gorgeous full brand logo */}
      <section className="py-16 bg-neutral-950 text-amber-50 border-b border-[#D4AF37]/30 relative overflow-hidden">
        {/* Background motifs */}
        <div className="absolute inset-0 bg-silk-pattern opacity-5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-maroon/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          {/* Logo Column */}
          <div className="md:col-span-5 flex justify-center">
            <JharokhaLogo variant="full" size={285} className="hover:scale-105 transition duration-500" />
          </div>
          {/* Story Column */}
          <div className="md:col-span-7 text-left space-y-5">
            <span className="text-gold font-bold tracking-widest uppercase text-xs">A Label of Royalty</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white leading-tight">
              Bhopal's Premier Destination <br />
              <span className="text-gold italic font-display font-medium">For Luxury Traditional Rentals</span>
            </h2>
            <div className="w-16 h-0.5 bg-gold" />
            
            <p className="text-[#FAF7F2]/85 text-xs md:text-sm leading-relaxed">
              Founded by <strong className="text-gold">Amit & Saloni</strong>, <strong className="text-white">Jharokha Ethnic Wear & Rental Dress</strong> brings the rich heritage of handcrafted traditional wear to Bhopal. From magnificent velvet bridal lehengas with antique zardosi embroidery to sangeet suits, partywear gowns, and accessories, we deliver sheer elegance without the premium price tag.
            </p>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Every garment undergoes high-temperature steam cleaning and sterilizing processes before customized pre-alterations to fit you perfectly. Welcome to the modern, budget-friendly luxury wave.
            </p>
            <div className="pt-3 flex flex-wrap gap-4">
              <button 
                onClick={handleBookAppt}
                className="bg-gold hover:bg-[#AA7C11] text-neutral-900 py-3 px-6 text-xs font-bold uppercase tracking-widest rounded-lg transition-all"
              >
                Schedule Store Trial
              </button>
              <button 
                onClick={handleWhatsAppOrder}
                className="border border-gold/40 hover:border-gold hover:bg-white/5 text-gold py-3 px-6 text-xs font-bold uppercase tracking-widest rounded-lg transition-all"
              >
                Inquire on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shop By Category Grid */}
      <section className="py-16 bg-white border-b border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-xl mx-auto mb-10">
            <span className="text-gold font-bold tracking-widest uppercase text-xs">Elegant Curation</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-neutral-800 mt-1">Shop By Category</h2>
            <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                to={cat.path}
                className="group flex flex-col bg-[#FAF7F2]/50 hover:bg-white rounded-xl overflow-hidden border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 shadow-xs hover:shadow-md transition-luxury"
              >
                <div className="aspect-[1/1] overflow-hidden bg-neutral-200 relative">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/10 duration-300 group-hover:bg-black/0" />
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-display font-bold text-xs md:text-sm text-neutral-800 group-hover:text-maroon transition line-clamp-1">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] text-amber-800 font-medium tracking-wide">
                    {cat.count}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How Renting Works Step Process */}
      <section id="how-it-works" className="py-16 md:py-20 border-b border-[#D4AF37]/10 bg-silk-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-xl mx-auto mb-12">
            <span className="text-maroon font-bold tracking-widest uppercase text-xs">Smooth Flow</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-neutral-800 mt-1">How Renting Works</h2>
            <p className="text-neutral-500 text-xs mt-1">Rent luxurious designer traditional wear in 5 simple steps</p>
            <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-2.5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {/* Visual dashed connector line between steps for horizontal desktop layouts */}
            <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] border-t border-dashed border-[#D4AF37]/45 -z-0" />

            {rentalSteps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center max-w-xs mx-auto text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-white border border-[#D4AF37]/35 flex items-center justify-center font-display font-semibold text-xs text-maroon shadow-md relative group hover:bg-maroon hover:text-white hover:border-transparent transition">
                  {step.step}
                </div>
                <h3 className="font-display font-bold text-sm text-neutral-800">{step.title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed px-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Outfits Grid */}
      <section className="py-16 bg-white border-b border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
            <div className="text-left">
              <span className="text-gold font-bold tracking-widest uppercase text-xs">Handpicked Design</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-neutral-800 mt-1">Featured Outfits</h2>
              <div className="w-12 h-0.5 bg-[#D4AF37] mt-2.5" />
            </div>
            
            <Link
              to="/collection"
              className="text-xs font-bold text-maroon hover:text-[#5c0618] flex items-center gap-1 mt-4 md:mt-0 uppercase tracking-widest"
            >
              See All Outfits <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Grid Layout of Featured items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlist.some((item) => item.id === product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us benefits */}
      <section className="py-16 bg-[#5c0618] text-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-xl mx-auto mb-10">
            <span className="text-gold font-bold tracking-widest uppercase text-xs">Our Commitment</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">Why Choose Us</h2>
            <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-2">
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-2 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto mb-1">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <h4 className="font-display font-bold text-sm text-amber-100">Budget Friendly</h4>
              <p className="text-[11px] text-neutral-300 leading-relaxed">Save up to 85% compared to purchasing brand new retail prices.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-2 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto mb-1">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-sm text-amber-100">Clean & Hygienic</h4>
              <p className="text-[11px] text-neutral-300 leading-relaxed">Every piece is steam sterilized and dry-cleaned post utilization.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-2 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto mb-1">
                <User className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-sm text-amber-100">Size Guidance</h4>
              <p className="text-[11px] text-neutral-300 leading-relaxed">Expert alterations dynamically adjusted to your custom waist & height measurements.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-2 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto mb-1">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-sm text-amber-100">Latest Trends</h4>
              <p className="text-[11px] text-neutral-300 leading-relaxed">Access fresh handpicked patterns and colors of the current fashion runway wave.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-2 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto mb-1">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-sm text-amber-100">WhatsApp Support</h4>
              <p className="text-[11px] text-neutral-300 leading-relaxed">Dedicated staff live to chat & clarify fittings or schedule physical trial times.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-2 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto mb-1">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-sm text-amber-100">Simple Booking</h4>
              <p className="text-[11px] text-neutral-300 leading-relaxed">Fast check availability, secure booking dates and receive automated notifications.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Trial Salon Appointment booking banner section */}
      <section className="py-16 bg-[#FAF7F2] border-b border-[#D4AF37]/10 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-5">
          <div className="flex justify-center mb-2">
            <JharokhaLogo variant="icon" size={80} className="drop-shadow-md" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-neutral-800">
            Check the Fit In Person first?
          </h2>
          <p className="text-xs md:text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
            Visit our physical trial salon boutique in Karond, Bhopal! Book your complimentary in-person fitting session to test drape fabrics, view colors under real light, and try on different outfits.
          </p>
          <div className="pt-2">
            <button
              onClick={handleBookAppt}
              className="bg-maroon hover:bg-[#6c0217] text-white py-3 px-8 text-xs font-bold uppercase tracking-widest rounded-lg shadow-lg hover:shadow-maroon/20 transition-all inline-flex items-center gap-2"
            >
              <CalendarRange className="w-4 h-4 text-gold" />
              <span>Book Trial Appointment</span>
            </button>
          </div>
        </div>
        
        {/* Subtle background flowers styling vector nodes */}
        <div className="absolute top-1/2 left-4 -translate-y-1/2 opacity-5 pointer-events-none hidden md:block">
          <Sparkles className="w-40 h-40 text-gold" />
        </div>
        <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-5 pointer-events-none hidden md:block">
          <Sparkles className="w-40 h-40 text-gold" />
        </div>
      </section>

      {/* 7. Beautiful Testimonials Carousel */}
      <section className="py-16 bg-white border-b border-[#D4AF37]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-xl mx-auto mb-10">
            <span className="text-gold font-bold tracking-widest uppercase text-xs">Happy Brides & Clients</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-neutral-800 mt-1">What Our Customers Say</h2>
            <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#FAF7F2] p-6 rounded-xl border border-[#D4AF37]/15 text-left flex flex-col justify-between relative shadow-xs">
              <div className="text-gold flex gap-1 mb-3">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4 italic">
                "Amazing collection of bridal lehengas at very affordable prices. I rented the Royal Crimson Bridal Lehenga for my wedding day. The outfit was clean and steam sterilized, and fits was exactly like shown in pictures. High recommendation!"
              </p>
              <div>
                <h4 className="font-display font-semibold text-xs text-neutral-800">Neha Sharma</h4>
                <span className="text-[9px] text-gold uppercase tracking-wider font-semibold">Bridal Client (Bhopal)</span>
              </div>
              <span className="absolute right-4 bottom-4 text-7xl font-serif text-[#D4AF37]/10 pointer-events-none leading-none">“</span>
            </div>

            <div className="bg-[#FAF7F2] p-6 rounded-xl border border-[#D4AF37]/15 text-left flex flex-col justify-between relative shadow-xs">
              <div className="text-gold flex gap-1 mb-3">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4 italic">
                "The peplum dhoti and emerald green gown on rent was so clean and beautiful for my cousin's Sangeet! Easy size checks on WhatsApp. On-time delivery. Will rent again next month!"
              </p>
              <div>
                <h4 className="font-display font-semibold text-xs text-neutral-800">Priya Mehta</h4>
                <span className="text-[9px] text-gold uppercase tracking-wider font-semibold">Sangeet Client (Bangalore)</span>
              </div>
              <span className="absolute right-4 bottom-4 text-7xl font-serif text-[#D4AF37]/10 pointer-events-none leading-none">“</span>
            </div>

            <div className="bg-[#FAF7F2] p-6 rounded-xl border border-[#D4AF37]/15 text-left flex flex-col justify-between relative shadow-xs">
              <div className="text-gold flex gap-1 mb-3">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4 italic">
                "Simple, very fast communication on WhatsApp and easy booking flow. Best clothing rental options for weddings in Bhopal. Saved me lots of money. Highly recommend to everyone."
              </p>
              <div>
                <h4 className="font-display font-semibold text-xs text-neutral-800">Aarti Verma</h4>
                <span className="text-[9px] text-gold uppercase tracking-wider font-semibold">Partywear Client (Secunderabad)</span>
              </div>
              <span className="absolute right-4 bottom-4 text-7xl font-serif text-[#D4AF37]/10 pointer-events-none leading-none">“</span>
            </div>

          </div>
        </div>
      </section>

      {/* 8. FAQ Mini Preview Accordion */}
      <section className="py-16 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div>
            <span className="text-maroon font-bold tracking-widest uppercase text-xs">Got Questions?</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-neutral-800">Frequently Asked Questions</h2>
            <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-2" />
          </div>

          <div className="text-left space-y-4 max-w-2xl mx-auto">
            <div className="p-4 bg-white border border-[#D4AF37]/15 rounded-lg">
              <h4 className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-maroon shrink-0" />
                <span>How many days can I rent an outfit at this price?</span>
              </h4>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed pl-5">
                Our standard rental pricing is for 3 days of booking. Need more? We offer 1, 2, and extended 7 days duration schemes which can be selected inside the active product pages.
              </p>
            </div>

            <div className="p-4 bg-white border border-[#D4AF37]/15 rounded-lg">
              <h4 className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-maroon shrink-0" />
                <span>Is security deposit really refundable?</span>
              </h4>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed pl-5">
                Yes absolutely! The security deposit is fully refunded back to your bank account or GPay immediately once we receive the outfit back and verify there are no major damages.
              </p>
            </div>
          </div>

          <div>
            <Link
              to="/faq"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#5c0618] hover:underline uppercase tracking-wide"
            >
              View All Questions ({8}+) <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
export type { HomeProps };
