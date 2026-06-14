import React, { useState } from "react";
import { MessageSquare, Calendar, ChevronRight, Phone, Send, MapPin, Watch, ClipboardList, Check, Copy, AlertTriangle, ShoppingBag } from "lucide-react";
import { Product, BookingRecord } from "../data/products";
import { CONFIG, getEmailJSConfig } from "../config";

interface BookingFormProps {
  selectedProduct: Product | null;
  selectedSize: string;
  selectedDate: string;
  selectedDuration: number;
  onSuccess: () => void;
  onAddBooking?: (booking: BookingRecord) => void;
}

export default function BookingForm({
  selectedProduct,
  selectedSize,
  selectedDate,
  selectedDuration,
  onSuccess,
  onAddBooking,
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    whatsapp: "",
    email: "",
    address: "",
    pickupOption: "delivery", // 'pickup' or 'delivery'
    message: "",
    agreeToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const [isBookedCompleted, setIsBookedCompleted] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getWhatsAppBookingText = () => {
    if (!selectedProduct) return "";
    const deliveryFee = formData.pickupOption === "delivery" ? 150 : 0;
    const finalBillTotal = Number(selectedProduct.price) + deliveryFee;

    return `✨ *NEW RENTAL BOOKING REQUEST - JHAROKHA* ✨\n\n` +
           `👋 *Hello Jharokha Support Support team,* I have just requested a rental booking from your interactive catalog! Here is my detailed summary:\n\n` +
           `👤 *CUSTOMER PROFILE*\n` +
           `• *Full Name:* ${formData.fullName}\n` +
           `• *Contact Mobile:* ${formData.mobile}\n` +
           `• *WhatsApp:* ${formData.whatsapp || formData.mobile}\n` +
           `• *Email:* ${formData.email || "not_provided@gmail.com"}\n\n` +
           `👗 *ETHNIC OUTFIT SELECTION*\n` +
           `• *Design Name:* ${selectedProduct.name}\n` +
           `• *Category:* ${selectedProduct.category}\n` +
           `• *Fitted Dress Size:* *${selectedSize || "M"}*\n\n` +
           `🗓️ *RENTAL TIMELINE & PERIOD*\n` +
           `• *Booking Date:* ${selectedDate || "Not Specified"}\n` +
           `• *Duration Period:* ${selectedDuration} Days\n\n` +
           `🚚 *DELIVERY & ADDRESS PREFERENCE*\n` +
           `• *Type:* ${formData.pickupOption === "delivery" ? "🏡 Premium Home Delivery" : "🏪 Boutique Hand Pickup"}\n` +
           `• *Shipping Address:* ${formData.address || "Bhopal Boutique Local Pickup requested (Peepal Chouraha, Karond, Bhopal)"}\n\n` +
           `💰 *RENTAL PAYMENT BREAKDOWN*\n` +
           `• *Base Rental fee:* ₹${selectedProduct.price}\n` +
           `• *Refundable Security Deposit:* ₹${selectedProduct.deposit}\n` +
           `• *Local Courier Charge:* ₹${deliveryFee}\n` +
           `• *Estimated Bill Total:* *₹${finalBillTotal}* (+ Refundable Deposit)\n\n` +
           `✏️ *SPECIAL ALTERATION / FIT NOTES*\n` +
           `• "${formData.message || "No specific adjustments requested."}"\n\n` +
           `🤝 _I agree to the Jharokha Rental Terms & returning in clean hygiene condition._\n\n` +
           `Please verify the boutique availability and lock my rental slots. Thank you!`;
  };

  const handleWhatsAppRedirect = () => {
    const text = getWhatsAppBookingText();
    if (!text) return;
    window.open(`https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleCopyText = async () => {
    const text = getWhatsAppBookingText();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch (e) {
      console.error("Failed to copy", e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) {
      setSubmitStatus({ type: "error", message: "Please select an ethnic outfit first." });
      return;
    }

    if (!formData.agreeToTerms) {
      setSubmitStatus({ type: "error", message: "You must agree to the Rental Terms to proceed." });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    // 1. Build structured BookingRecord object to persist in our Store Manager
    const newBooking: BookingRecord = {
      id: `book-${Date.now()}`,
      customerName: formData.fullName,
      mobile: formData.mobile,
      whatsapp: formData.whatsapp || formData.mobile,
      email: formData.email || "not_provided@rentmyoutfit.com",
      address: formData.address || "Store Pickup Requested",
      pickupOption: formData.pickupOption,
      outfitName: selectedProduct.name,
      outfitId: selectedProduct.id,
      size: selectedSize || "M",
      date: selectedDate || "Not Specified",
      duration: Number(selectedDuration),
      message: formData.message || "No special requests",
      price: Number(selectedProduct.price),
      deposit: Number(selectedProduct.deposit),
      createdAt: new Date().toISOString()
    };

    // Save to global local database
    if (onAddBooking) {
      onAddBooking(newBooking);
    }

    // Resolve current (potentially customized) EmailJS keys
    const mailConfig = getEmailJSConfig();

    const templateParams = {
      customer_name: formData.fullName,
      phone: formData.mobile,
      whatsapp: formData.whatsapp || formData.mobile,
      email: formData.email || "not_provided@rentmyoutfit.com",
      address: formData.address || "Store Pickup Requested",
      outfit_name: selectedProduct.name,
      size: selectedSize || "M",
      date: selectedDate || "Not Specified",
      duration: `${selectedDuration} Days`,
      delivery_option: formData.pickupOption === "delivery" ? "Home Delivery" : "Store Pick-up",
      message: formData.message || "No special requests",
      rental_price: `${CONFIG.currencySymbol}${selectedProduct.price}`,
      security_deposit: `${CONFIG.currencySymbol}${selectedProduct.deposit}`
    };

    const isPlaceholderKey = mailConfig.publicKey === "user_public_key_here" || mailConfig.serviceId === "service_rentmyoutfit";

    try {
      if (isPlaceholderKey) {
        console.warn("EmailJS key is a placeholder. Booking is saved locally and WhatsApp integration is ready.");
        setSubmitStatus({
          type: "success",
          message: "Booking Recorded! Please click the button below to send this pre-filled summary on WhatsApp to support.",
        });
        onSuccess();
        setIsBookedCompleted(true);
        setIsSubmitting(false);
        // Fallback popup attempt
        try {
          handleWhatsAppRedirect();
        } catch (e) {
          console.log("Auto WhatsApp redirect prevented by browser popup blocker.", e);
        }
        return;
      }

      // Direct REST lookup targeting authenticated EmailJS service endpoint
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: mailConfig.serviceId,
          template_id: mailConfig.templateId,
          user_id: mailConfig.publicKey,
          template_params: templateParams,
        }),
      });

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Congratulations! Booking request was dispatch-emailed. Please dispatch the summary message on WhatsApp as well.",
        });
        onSuccess();
        setIsBookedCompleted(true);
        try {
          handleWhatsAppRedirect();
        } catch (e) {}
      } else {
        const errorText = await response.text();
        console.error("EmailJS Service rejected submission:", errorText);
        setSubmitStatus({
          type: "success",
          message: "Booking saved locally. Email delivery error: " + errorText + ". Please dispatch WhatsApp summary.",
        });
        onSuccess();
        setIsBookedCompleted(true);
        try {
          handleWhatsAppRedirect();
        } catch (e) {}
      }
    } catch (err) {
      console.error("Booking transmission error:", err);
      setSubmitStatus({
        type: "success",
        message: "Details recorded in the database! Ready to send on WhatsApp.",
      });
      onSuccess();
      setIsBookedCompleted(true);
      try {
        handleWhatsAppRedirect();
      } catch (e) {}
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isBookedCompleted && selectedProduct) {
    const deliveryFee = formData.pickupOption === "delivery" ? 150 : 0;
    const finalBillTotal = Number(selectedProduct.price) + deliveryFee;
    
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-emerald-500/35 p-6 md:p-8 relative overflow-hidden text-left space-y-6">
        {/* Visual Silk Gold & Emerald Accent Top Banner */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-gold to-emerald-500" />

        <div className="text-center space-y-2 py-2">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
            <Check className="w-7 h-7" />
          </div>
          <h3 className="font-display font-extrabold text-[#800020] text-xl md:text-2xl tracking-tight">
            Checkout Saved Successfully!
          </h3>
          <p className="text-neutral-500 text-xs max-w-sm mx-auto leading-relaxed">
            Your booking request has been logged in Jharokha's secure database. Let's finish locking your dates on WhatsApp.
          </p>
        </div>

        {/* Informative Alert for EmailJS Sandbox */}
        <div className="bg-amber-50/75 border border-[#D4AF37]/25 rounded-xl p-4 text-xs text-neutral-700 leading-relaxed flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-[#800020] uppercase text-[10px] tracking-wide">📧 Email Confirmation Note</h4>
            <p className="text-neutral-600 leading-normal">
              Noticed that you aren't receiving verification emails? Default email credentials run in demo mode. Please configure your active account credentials under <strong>Email Delivery Gateway</strong> in the <strong className="text-neutral-900 border-b border-dashed border-neutral-500">Store Manager</strong> (Admin section) so they route immediately to your inbox!
            </p>
          </div>
        </div>

        {/* Selected Outfit & Details card */}
        <div className="bg-neutral-50 border rounded-xl p-4 md:p-5 space-y-4">
          <div className="flex items-start gap-4">
            <img
              src={selectedProduct.images[0]}
              alt={selectedProduct.name}
              className="w-16 h-20 object-cover rounded-md border border-neutral-200 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0 text-xs text-left">
              <span className="text-[10px] uppercase font-bold text-gold tracking-widest block">{selectedProduct.category}</span>
              <h4 className="font-display font-bold text-neutral-800 text-sm truncate">{selectedProduct.name}</h4>
              <p className="text-neutral-500 mt-0.5">Flipped Tailor Size: <strong className="text-neutral-800 font-mono font-bold bg-neutral-200/60 px-1.5 py-0.5 rounded">{selectedSize || "M"}</strong></p>
              <p className="text-neutral-500 mt-1 flex items-center gap-1 font-medium text-[11px] text-maroon">
                <Calendar className="w-3.5 h-3.5 text-gold" style={{ display: 'inline-block' }} />
                <span>Date locked: {selectedDate || "Not Specified"} ({selectedDuration} Days)</span>
              </p>
            </div>
          </div>

          <div className="border-t border-neutral-200/60 pt-3 grid grid-cols-2 gap-y-2 text-xs text-neutral-600">
            <div>Customer Name:</div>
            <div className="font-bold text-neutral-900 text-right">{formData.fullName}</div>
            <div>Contact Phone:</div>
            <div className="font-bold font-mono text-neutral-900 text-right">{formData.mobile}</div>
            <div>Preference:</div>
            <div className="font-bold text-neutral-900 text-right">{formData.pickupOption === "delivery" ? "🏡 Home Delivery" : "🏪 Store Pickup"}</div>
            <div className="border-t border-neutral-200/60 pt-2 font-bold text-[#800020] text-[13px]">Total Payable:</div>
            <div className="border-t border-neutral-200/60 pt-2 font-extrabold text-[#800020] text-[13px] text-right">
              ₹{finalBillTotal} <span className="text-[10px] text-neutral-400 font-medium font-sans">(+ ₹{selectedProduct.deposit} Refundable Deposit)</span>
            </div>
          </div>
        </div>

        {/* Automated WhatsApp Message Output */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-neutral-700 uppercase tracking-widest text-[10px]">📟 Pre-filled booking summary</span>
            <button
              onClick={handleCopyText}
              className="text-[#800020] hover:text-maroon font-bold flex items-center gap-1 transition"
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-medium text-[11px]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy text</span>
                </>
              )}
            </button>
          </div>

          <div className="relative bg-neutral-950 text-neutral-100 p-4 rounded-xl max-h-48 overflow-y-auto font-mono text-[11px] leading-relaxed text-left">
            <pre className="whitespace-pre-wrap select-all text-neutral-200 font-mono text-xs" style={{ fontFamily: '"Fira Code", "Courier New", monospace' }}>
              {getWhatsAppBookingText()}
            </pre>
          </div>
          <p className="text-[10px] text-neutral-400">
            💡 The text shown above is generated with live details. Click below to immediately send it pre-filled to our support team on WhatsApp!
          </p>
        </div>

        {/* Main CTA: Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleWhatsAppRedirect}
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/30"
          >
            <MessageSquare className="w-5 h-5 fill-current text-white animate-bounce" />
            Send Pre-filled Summary to WhatsApp Support
          </button>

          <button
            onClick={() => {
              setIsBookedCompleted(false);
              setSubmitStatus({ type: null, message: "" });
            }}
            className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider transition"
          >
            ← Browse Catalog / Rent Another Dress
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-[#D4AF37]/25 p-6 md:p-8 relative overflow-hidden text-left">
      {/* Visual Silk Gold Accent Top Banner */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-maroon via-gold to-maroon" />

      <div className="flex items-center gap-2 mb-6">
        <ClipboardList className="w-5 h-5 text-maroon" />
        <h3 className="font-display font-semibold text-lg md:text-xl text-neutral-800">
          Outfit Booking Intake Request
        </h3>
      </div>

      {selectedProduct ? (
        <div className="bg-[#FAF7F2] border border-[#D4AF37]/20 p-4 rounded-xl flex items-center gap-4 mb-6">
          <img
            src={selectedProduct.images[0]}
            alt={selectedProduct.name}
            className="w-16 h-20 object-cover rounded-md border border-neutral-200 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] uppercase font-bold text-gold tracking-widest block">{selectedProduct.category}</span>
            <h4 className="font-display font-bold text-neutral-800 text-sm md:text-base leading-snug truncate">{selectedProduct.name}</h4>
            <div className="flex flex-wrap gap-[#D4AF37] text-xs text-neutral-600 mt-1 gap-x-3 gap-y-1">
              <span><strong>Size Selected:</strong> {selectedSize || "M"}</span>
              <span><strong>Rent Price:</strong> {CONFIG.currencySymbol}{selectedProduct.price}</span>
              <span><strong>Deposit:</strong> {CONFIG.currencySymbol}{selectedProduct.deposit}</span>
            </div>
            {selectedDate && (
              <p className="text-[11px] text-maroon font-medium flex items-center gap-1 mt-1">
                <Calendar className="w-3 h-3 text-gold" />
                <span>Selected Date: {selectedDate} ({selectedDuration} Days)</span>
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-rose-50 text-rose-700 text-xs p-3 rounded-lg text-center mb-6 border border-rose-100">
          Please choose an outfit to book custom dates from our catalog first.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">Your Full Name *</label>
          <input
            type="text"
            name="fullName"
            required
            placeholder="e.g. Priyal Sharma"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full text-xs px-3.5 py-2.5 border rounded-lg border-neutral-200 focus:outline-none focus:ring-1 focus:ring-maroon focus:border-maroon bg-white"
          />
        </div>

        {/* Contact Numbers Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Mobile Call Number *</label>
            <input
              type="tel"
              name="mobile"
              required
              placeholder="e.g. 9876543210"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full text-xs px-3.5 py-2.5 border rounded-lg border-neutral-200 focus:outline-none focus:ring-1 focus:ring-maroon focus:border-maroon bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">WhatsApp Number *</label>
            <input
              type="tel"
              name="whatsapp"
              required
              placeholder="Same as mobile or write WhatsApp number"
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full text-xs px-3.5 py-2.5 border rounded-lg border-neutral-200 focus:outline-none focus:ring-1 focus:ring-maroon focus:border-maroon bg-white"
            />
          </div>
        </div>

        {/* Optional Email */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">Email Address (Optional)</label>
          <input
            type="email"
            name="email"
            placeholder="e.g. priyal@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full text-xs px-3.5 py-2.5 border rounded-lg border-neutral-200 focus:outline-none focus:ring-1 focus:ring-maroon focus:border-maroon bg-white"
          />
        </div>

        {/* Options Selection pickup or delivery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Pickup or Delivery Preference</label>
            <select
              name="pickupOption"
              value={formData.pickupOption}
              onChange={handleChange}
              className="w-full text-xs px-3.5 py-2.5 border rounded-lg border-neutral-200 focus:outline-none focus:ring-1 focus:ring-maroon focus:border-maroon bg-white"
            >
              <option value="delivery">🏡 Premium Home Delivery (+ ₹150)</option>
              <option value="pickup">🏪 Store Pickup - Karond, Bhopal (Free)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Expected Event Date (if not locked)</label>
            <input
              type="date"
              disabled={!!selectedDate}
              defaultValue={selectedDate}
              className="w-full text-xs px-3.5 py-2.5 border rounded-lg border-neutral-100 bg-neutral-50 cursor-not-allowed text-neutral-500"
            />
          </div>
        </div>

        {/* Address field for Delivery */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            {formData.pickupOption === "delivery" ? "Delivery Full Address *" : "Billing Area / Address (Optional)"}
          </label>
          <textarea
            name="address"
            required={formData.pickupOption === "delivery"}
            rows={2}
            placeholder={
              formData.pickupOption === "delivery" 
                ? "House No, Street name, Area, City landmark, Pin Code" 
                : "Enter your general neighborhood / city for billing record"
            }
            value={formData.address}
            onChange={handleChange}
            className="w-full text-xs px-3.5 py-2.5 border rounded-lg border-neutral-200 focus:outline-none focus:ring-1 focus:ring-maroon focus:border-maroon bg-white"
          />
        </div>

        {/* Special Instructions */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">Special Alteration / Date Customizations Notes</label>
          <textarea
            name="message"
            rows={2}
            placeholder="Describe height or shoulder fit details, if any..."
            value={formData.message}
            onChange={handleChange}
            className="w-full text-xs px-3.5 py-2.5 border rounded-lg border-neutral-200 focus:outline-none focus:ring-1 focus:ring-maroon focus:border-maroon bg-white"
          />
        </div>

        {/* Agree terms check */}
        <div className="flex items-start gap-2.5 mt-2">
          <input
            type="checkbox"
            name="agreeToTerms"
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="mt-0.5 w-4 h-4 text-maroon accent-maroon border-neutral-300 rounded-sm"
          />
          <label htmlFor="agreeToTerms" className="text-xs text-neutral-600 select-none">
            I agree to the <a href={CONFIG.rental.termsLink} target="_blank" rel="noopener noreferrer" className="text-maroon hover:underline font-semibold">Rental Agreement Terms</a>, which include a return in clean condition and paying a refundable security deposit.
          </label>
        </div>

        {/* Submit Status Banner */}
        {submitStatus.type && (
          <div
            className={`p-3.5 rounded-lg text-xs font-medium leading-relaxed ${
              submitStatus.type === "success" 
                ? "bg-emerald-50 text-emerald-800 border-l-4 border-emerald-500" 
                : "bg-red-50 text-red-800 border-l-4 border-red-500"
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        {/* Actions Button Panel */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={isSubmitting || !selectedProduct}
            className="flex-1 bg-maroon hover:bg-[#6c0217] text-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-maroon/20 disabled:bg-neutral-300 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? "Sending Request..." : "Request Booking Email"}
          </button>
          
          <button
            type="button"
            onClick={handleWhatsAppRedirect}
            disabled={!selectedProduct}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-amber-50 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-700/20 disabled:bg-neutral-200"
          >
            <MessageSquare className="w-4 h-4 fill-current text-white" />
            Send Same to WhatsApp
          </button>
        </div>
      </form>
    </div>
  );
}
