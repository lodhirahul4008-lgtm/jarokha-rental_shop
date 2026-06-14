import React from "react";
import { ShieldAlert, CreditCard, Sparkles, Truck, RefreshCw } from "lucide-react";
import { Product, BookingRecord } from "../data/products";
import { CONFIG } from "../config";
import BookingForm from "../components/BookingForm";

interface BookingPageProps {
  selectedProduct: Product | null;
  selectedSize: string;
  selectedDate: string;
  selectedDuration: number;
  onAddBooking: (booking: BookingRecord) => void;
}

export default function BookingPage({
  selectedProduct,
  selectedSize,
  selectedDate,
  selectedDuration,
  onAddBooking,
}: BookingPageProps) {
  const handleBookingCompleted = () => {
    console.log("Details submitted successfully");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page header */}
      <div className="text-center mb-8">
        <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs">Elegant Process</span>
        <h1 className="text-3xl font-extrabold font-display leading-tight text-neutral-800 mt-1">Book Your Outfit Design</h1>
        <p className="text-neutral-500 text-xs mt-1">Just fill key sizing detail requests to initiate double-verification of booking dates</p>
        <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-3" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
        
        {/* LEFT COLUMN: ACTIVE INTAKE FORM (COLS: 8) */}
        <div className="lg:col-span-8">
          <BookingForm
            selectedProduct={selectedProduct}
            selectedSize={selectedSize}
            selectedDate={selectedDate}
            selectedDuration={selectedDuration}
            onSuccess={handleBookingCompleted}
            onAddBooking={onAddBooking}
          />
        </div>

        {/* RIGHT COLUMN: BOOKING GUARANTEES & REFUNDS OUTLINE (COLS: 4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Guarantee container */}
          <div className="bg-white rounded-2xl border border-gold/15 p-6 shadow-xs space-y-5">
            <h3 className="font-display font-semibold text-neutral-800 border-b border-neutral-100 pb-3 text-base">
              Our Renting Guarantees
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3 items-start text-xs text-neutral-600">
                <div className="p-2 rounded-full bg-amber-50 text-[#D4AF37] shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-800 mb-0.5">100% Sanitized & Sterile</h4>
                  <p className="leading-relaxed">Every lehenga, saree and gown is professionally deep-cleansed, steam pressed and dispatched in dust-proof boutique garment covers.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start text-xs text-neutral-600">
                <div className="p-2 rounded-full bg-amber-50 text-[#D4AF37] shrink-0 mt-0.5">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-800 mb-0.5">Complementary Basic Fitting</h4>
                  <p className="leading-relaxed">Need minor size adjustments? Our master tailor drapes outfits following your physical measurements for an flawless look.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start text-xs text-neutral-600">
                <div className="p-2 rounded-full bg-amber-50 text-[#D4AF37] shrink-0 mt-0.5">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-800 mb-0.5">Instant Deposit Refunds</h4>
                  <p className="leading-relaxed">Your security deposit is 100% guarded! We return it directly back via GPay or bank account immediately post inspection of return receipt.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start text-xs text-neutral-600">
                <div className="p-2 rounded-full bg-amber-50 text-[#D4AF37] shrink-0 mt-0.5">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-800 mb-0.5">Bhopal Doorstep Delivery</h4>
                  <p className="leading-relaxed">Choose home delivery (+ ₹150) or schedule free local hand pick-up at our physical design salon in Karond, Bhopal.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Refund Notice Banner */}
          <div className="bg-amber-50/50 border border-[#D4AF37]/30 rounded-2xl p-5 text-xs text-[#D4AF37]-dark leading-relaxed space-y-2 flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#800020]">Security Deposit Guard</p>
              <p className="text-neutral-700">Please note that you'll pay a refundable security deposit separately before dispatched courier boxes leave our boutique. This is returned immediately upon outfit receipt.</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
