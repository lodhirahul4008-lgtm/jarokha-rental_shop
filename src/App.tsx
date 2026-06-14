import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, ScrollRestoration } from "react-router-dom";
import { MoveUp, Sparkles, MessageSquare } from "lucide-react";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import QuickViewModal from "./components/QuickViewModal";
import WishlistDrawer from "./components/WishlistDrawer";
import CartDrawer, { CartBookItem } from "./components/CartDrawer";

// Pages
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import ProductDetails from "./pages/ProductDetails";
import BookingPage from "./pages/Booking";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Policies from "./pages/Policies";
import Admin from "./pages/Admin";

import { Product, PRODUCTS, BookingRecord } from "./data/products";
import { CONFIG } from "./config";

// Scroll Restoration helper for HashRouter
function ScrollToTop() {
  const { pathname } = window.location;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  // Global States with Iframe/Sandbox secure local storage safeguards
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem("jharokha_products");
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch (e) {
      return PRODUCTS;
    }
  });

  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem("jharokha_bookings");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem("rent_my_outfit_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn("Cookies / LocalStorage access blocked by sandbox security. Falling back to in-memory state.");
      return [];
    }
  });

  const [cart, setCart] = useState<CartBookItem[]>(() => {
    try {
      const saved = localStorage.getItem("rent_my_outfit_cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [bookingSelection, setBookingSelection] = useState<{
    product: Product | null;
    size: string;
    date: string;
    duration: number;
  }>(() => {
    try {
      const saved = localStorage.getItem("rent_my_outfit_booking_sel");
      return saved ? JSON.parse(saved) : { product: null, size: "M", date: "", duration: 3 };
    } catch (e) {
      return { product: null, size: "M", date: "", duration: 3 };
    }
  });

  // UI Control states
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: "", show: false });

  // Sync states to localstorage safely
  useEffect(() => {
    try {
      localStorage.setItem("jharokha_products", JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem("jharokha_bookings", JSON.stringify(bookings));
    } catch (e) {}
  }, [bookings]);

  const handleAddBookingRecord = (newBooking: BookingRecord) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  useEffect(() => {
    try {
      localStorage.setItem("rent_my_outfit_wishlist", JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem("rent_my_outfit_cart", JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("rent_my_outfit_booking_sel", JSON.stringify(bookingSelection));
    } catch (e) {}
  }, [bookingSelection]);

  // Track window scroll coordinates for Scroll-Top button and sticky floaters
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show customized toasts
  const triggerToast = (message: string) => {
    setToast({ message, show: true });
    setTimeout(() => {
      setToast({ message: "", show: false });
    }, 4500);
  };

  // State Triggers
  const handleToggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      triggerToast(`Removed "${product.name}" from your design wishlist.`);
    } else {
      setWishlist((prev) => [...prev, product]);
      triggerToast(`Added "${product.name}" to your wishlist!`);
    }
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlist((prev) => prev.filter((item) => item.id !== product.id));
  };

  const handleBookOutfit = (product: Product, size: string, date: string, duration: number) => {
    // 1. Set as current booking prefill choice
    setBookingSelection({ product, size, date, duration });
    
    // 2. Add as item in checkout booking list bag
    const alreadyInCart = cart.some(
      (item) => item.product.id === product.id && item.size === size && item.date === date
    );

    if (!alreadyInCart) {
      setCart((prev) => [...prev, { product, size, date, duration }]);
    }
    
    triggerToast(`"${product.name}" is locked in size ${size}! Let us finalize your booking request details.`);
  };

  const handleRemoveCartItem = (idx: number) => {
    const item = cart[idx];
    setCart((prev) => prev.filter((_, i) => i !== idx));
    triggerToast(`Removed "${item.product.name}" reservation.`);
  };

  const handleTriggerQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleQuickViewBookNow = (product: Product, size: string, date: string, duration: number) => {
    handleBookOutfit(product, size, date, duration);
    setIsCartOpen(true);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWhatsAppFloating = () => {
    const text = "Hi Jharokha Ethnic Wear, I want to inquire about custom sizes or schedule a designer fitting session!";
    window.open(`https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between bg-[#FAF7F2] font-sans antialiased text-neutral-800">
        
        {/* Scroll Top Helper */}
        <ScrollToTop />

        {/* Global Toast Banner */}
        {toast.show && (
          <div className="fixed top-24 right-5 z-55 max-w-sm w-full bg-white border border-[#D4AF37]/35 rounded-xl shadow-2xl p-4.5 text-xs text-neutral-700 animate-slideIn flex items-start gap-3">
            <span className="p-1 rounded-full bg-amber-50 text-gold shrink-0">
              <Sparkles className="w-4.5 h-4.5 animate-pulse" />
            </span>
            <div className="text-left">
              <h5 className="font-display font-semibold text-neutral-800 uppercase text-[9px] tracking-wider leading-none mb-1">
                Outfit Catalog Status
              </h5>
              <p className="leading-relaxed font-sans">{toast.message}</p>
            </div>
          </div>
        )}

        {/* Floating Actions (WhatsApp + Scroll To Top) */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
          {showScrollTop && (
            <button
              onClick={handleScrollToTop}
              className="p-3.5 bg-maroon text-amber-50 hover:bg-[#6c0217] rounded-full shadow-xl transition border border-gold/15 hover:scale-105"
              title="Scroll to Top"
            >
              <MoveUp className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={handleWhatsAppFloating}
            className="p-4 bg-emerald-600 text-white rounded-full shadow-2xl transition hover:scale-105 flex items-center justify-center animate-bounce-slow"
            title="Instant WhatsApp Support Chat"
          >
            <MessageSquare className="w-6 h-6 fill-current" />
          </button>
        </div>

        {/* Header/Navbar */}
        <Navbar
          wishlistCount={wishlist.length}
          cartCount={cart.length}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
        />

        {/* ROUTER CONTENT GRID BODY */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  products={products}
                  onQuickView={handleTriggerQuickView}
                  onToggleWishlist={handleToggleWishlist}
                  wishlist={wishlist}
                />
              }
            />
            <Route
              path="/collection"
              element={
                <Collection
                  products={products}
                  onQuickView={handleTriggerQuickView}
                  onToggleWishlist={handleToggleWishlist}
                  wishlist={wishlist}
                />
              }
            />
            <Route
              path="/collection/:slug"
              element={
                <ProductDetails
                  products={products}
                  onBook={handleBookOutfit}
                  onToggleWishlist={handleToggleWishlist}
                  wishlist={wishlist}
                />
              }
            />
            <Route
              path="/admin"
              element={
                <Admin
                  products={products}
                  onUpdateProducts={setProducts}
                  bookings={bookings}
                  onUpdateBookings={setBookings}
                />
              }
            />
            <Route
              path="/booking"
              element={
                <BookingPage
                  selectedProduct={bookingSelection.product}
                  selectedSize={bookingSelection.size}
                  selectedDate={bookingSelection.date}
                  selectedDuration={bookingSelection.duration}
                  onAddBooking={handleAddBookingRecord}
                />
              }
            />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/policies/:docId" element={<Policies />} />
          </Routes>
        </main>

        {/* Footer Area */}
        <Footer />

        {/* MODAL & DRAWER SUB-SCROLLS OVERLAYS */}
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onBook={handleQuickViewBookNow}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={quickViewProduct ? wishlist.some((item) => item.id === quickViewProduct.id) : false}
        />

        <WishlistDrawer
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          wishlist={wishlist}
          onRemove={handleRemoveFromWishlist}
          onSelectProduct={handleTriggerQuickView}
        />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onRemove={handleRemoveCartItem}
        />

      </div>
    </Router>
  );
}
export type { CartBookItem };
