import React, { useState } from "react";
import { MessageSquare, Calendar, ChevronRight, Phone, Send, MapPin, Watch, ClipboardList } from "lucide-react";
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
    return `Hi Jharokha Ethnic Wear, I want to submit a rental booking request:\n\n` +
           `*--- CUSTOMER DETAILS ---*\n` +
           `*Name:* ${formData.fullName}\n` +
           `*Mobile:* ${formData.mobile}\n` +
           `*WhatsApp:* ${formData.whatsapp}\n` +
           `*Delivery Option:* ${formData.pickupOption === "delivery" ? "Home Delivery" : "Self Store Pickup"}\n` +
           `*Address:* ${formData.address || "N/A"}\n\n` +
           `*--- OUTFIT DETAILS ---*\n` +
           `*Outfit:* ${selectedProduct.name}\n` +
           `*Price:* ${CONFIG.currencySymbol}${selectedProduct.price}\n` +
           `*Size:* ${selectedSize || "Default"}\n` +
           `*Event Date:* ${selectedDate || "Not Specified"}\n` +
           `*Duration:* ${selectedDuration} Days\n` +
           `*Message:* ${formData.message || "None"}`;
  };

  const handleWhatsAppRedirect = () => {
    const text = getWhatsAppBookingText();
    if (!text) return;
    window.open(`https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`, "_blank");
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
        // Handle gracefully: alert the owner that they have placeholder keys set
        console.warn("EmailJS key is a placeholder. Booking is saved locally and WhatsApp integration is ready.");
        setSubmitStatus({
          type: "success",
          message: "Aura Booking Recorded! Since default EmailJS keys are placeholders, please configure your real EmailJS account keys in the 'Store Manager' (Admin Panel) to receive direct email mailouts.",
        });
        onSuccess();
        setTimeout(() => {
          handleWhatsAppRedirect();
        }, 3000);
        setIsSubmitting(false);
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
          message: "Congratulations! Booking request was dispatch-emailed. Our design advisor Saloni will confirm size tailoring over WhatsApp shortly.",
        });
        onSuccess();
        
        // Auto double-prompt with WhatsApp integration
        setTimeout(() => {
          handleWhatsAppRedirect();
        }, 1500);
      } else {
        const errorText = await response.text();
        console.error("EmailJS Service rejected submission:", errorText);
        setSubmitStatus({
          type: "success",
          message: "Booking request saved to Store Manager database! (Email key error: " + errorText + "). Please configure verified EmailJS keys in the Store Manager so alerts deliver properly.",
        });
        onSuccess();
        setTimeout(() => {
          handleWhatsAppRedirect();
        }, 3000);
      }
    } catch (err) {
      console.error("Booking transmission error:", err);
      setSubmitStatus({
        type: "success",
        message: "Details recorded in the Store Manager! Let's finalize your tailored size over WhatsApp instantly.",
      });
      onSuccess();
      setTimeout(() => {
        handleWhatsAppRedirect();
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

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
