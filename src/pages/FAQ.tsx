import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, Sparkles } from "lucide-react";
import { CONFIG } from "../config";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: "Rental Process" | "Deposit & Sizing" | "Damages & Cleanup";
}

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  const faqs: FAQItem[] = [
    {
      id: 1,
      category: "Rental Process",
      question: "How many days can I rent an outfit?",
      answer: "Our standard rental catalog duration is 3 days (Pick up Day 1, Wear Day 2, Return Day 3). If your event travel or wedding tour requires more time, you can choose our flexible 7-day extended plan inside any product detail page, or write to our team directly on WhatsApp for custom-extended leases."
    },
    {
      id: 2,
      category: "Deposit & Sizing",
      question: "Is raw security deposit required? Is it fully refundable?",
      answer: "Yes, we charge a refundable security deposit separately for each designer outfit to safeguard our premium fabrics. The deposit is 100% returned immediately back to your GPay, PhonePe, or bank account once the outfit is received back and checked by our local boutique staff."
    },
    {
      id: 3,
      category: "Deposit & Sizing",
      question: "How do I check and verify my size? Do you do alterations?",
      answer: "For your ideal fitting look, we provide free basic customizations (sleeve adjustments, shoulder lines, height framing, and bust alterations). Once you request an outfit, our designer will contact you over WhatsApp to guide you on measurements and tailor the outfit accordingly!"
    },
    {
      id: 4,
      category: "Rental Process",
      question: "What if the outfit is not available for my selected date?",
      answer: "Since our premium designer catalog has high seasonal sangeet and wedding demand, some days book out months in advance. If your favorite lehenga or saree is locked on your date, please contact us on WhatsApp so we can suggest similar gorgeous matching alternatives or verify cancel queues."
    },
    {
      id: 5,
      category: "Rental Process",
      question: "Do you provide doorstep delivery or shipping?",
      answer: "Yes, we ship across Bhopal and neighboring sectors! We provide a convenient premium doorstep delivery and return-pickup service for a minimal fee of ₹150. Alternatively, you can drop by our Karond physical outlet for direct collection."
    },
    {
      id: 6,
      category: "Damages & Cleanup",
      question: "What happens if there are minor stains or damages?",
      answer: "Don't fret! Minor stains, small bead displacements, or light thread loosenings from dancing are fully covered by us and expect zero penalty. However, in the rare case of major fabric burn holes, deep cuts/rips, or permanent structure losses, we may deduct a repair charge from your deposit corresponding to the damage."
    },
    {
      id: 7,
      category: "Rental Process",
      question: "Can I book the outfit directly through WhatsApp?",
      answer: "Absolutely! WhatsApp is our most convenient and preferred booking channel. Simply click on the 'WhatsApp Order' on any product page, and a prefilled message containing size, event dates, and product links will automatically build to let our desk advisor assist you instantly!"
    },
    {
      id: 8,
      category: "Rental Process",
      question: "Do you provide bridal lehenga on rent?",
      answer: "Yes, we house some of the finest premium bridal velvet and raw silk lehengas in Bhopal starting at just ₹1,999! Browse our dedicated 'Bridal Lehenga' menu on the collection screen, and book an in-store trial salon appointment with us to try them on in person before making your decision."
    }
  ];

  const handleWhatsAppContact = () => {
    const text = "Hi, I have a custom question about renting terms not answered in the FAQ. Please help.";
    window.open(`https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-left">
      
      {/* FAQ Header Banner */}
      <div className="text-center mb-12">
        <span className="text-gold font-bold tracking-widest uppercase text-xs">Help Desk</span>
        <h1 className="text-3xl md:text-4xl font-extrabold font-display leading-tight text-neutral-800 mt-1">Frequently Asked Questions</h1>
        <p className="text-neutral-500 text-xs md:text-sm max-w-md mx-auto leading-relaxed mt-2">
          Everything you need to know about standard rental durations, measurements fitting guides, and security refunds.
        </p>
        <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
      </div>

      <div className="space-y-8">
        
        {/* Visual Accordion lists */}
        <div className="space-y-3.5 max-w-3xl mx-auto">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-neutral-100 hover:border-gold/30 transition shadow-xs overflow-hidden"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex gap-3 items-center">
                    <HelpCircle className="w-4.5 h-4.5 text-maroon shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-bold text-neutral-800 font-sans tracking-wide">
                      {faq.question}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4.5 h-4.5 text-neutral-400" />
                  ) : (
                    <ChevronDown className="w-4.5 h-4.5 text-neutral-400" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 pl-12 border-t border-neutral-50 bg-[#FAF7F2]/40 text-xs text-neutral-600 leading-relaxed font-sans">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp help desk redirect */}
        <div className="max-w-2xl mx-auto bg-emerald-50/50 rounded-2xl border border-emerald-250 p-6 text-center space-y-4">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-700">
            <MessageSquare className="w-5 h-5 fill-current" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-semibold text-neutral-800 text-sm">Still have customized sizing or booking doubts?</h4>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
              Our styling advisors are online 10:00 AM – 8:00 PM to help with height, custom blouse cuttings, or fast-track shipments.
            </p>
          </div>
          <div>
            <button
              onClick={handleWhatsAppContact}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-6 rounded-lg shadow-md transition"
            >
              Ask on WhatsApp
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
