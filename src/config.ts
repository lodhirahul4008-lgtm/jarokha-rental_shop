// Brand, Contact, & System Configuration
export const CONFIG = {
  brandName: "Jharokha Ethnic Wear & Rental Dress",
  tagline: "Where tradition meets elegance • Premium ethnic wear & bridal rental in Bhopal",
  currencySymbol: "₹",
  
  // WhatsApp Configuration - Change this to any active business number
  whatsappNumber: "+917987620561", 
  
  // Custom message prefix for general inquiries
  defaultInquiryMessage: "Hi, I want to inquire about renting ethnic wear from Jharokha Ethnic Wear & Rental Dress.",
  
  // EmailJS Constants Placeholder
  emailjs: {
    serviceId: "service_rentmyoutfit",
    templateId: "template_booking_req",
    publicKey: "user_public_key_here"
  },
  
  // Contact details
  contact: {
    email: "jharokhaethnicware05@gmail.com",
    phone: "+91 79876 20561",
    instagram: "https://www.instagram.com/jharokha_ethnic_wear05/",
    facebook: "https://facebook.com/jharokhaethnicwear",
    address: "Pachori Complex, Krishna Nagar Colony, Peepal Chouraha, Karond, Bhopal, Madhya Pradesh 462038",
    hours: "10:00 AM – 8:30 PM (Monday to Sunday)"
  },
  
  // Rental configuration
  rental: {
    defaultDurationDays: 3,
    securityDepositRate: 0.5, // 50% of rental price as deposit default (or explicit per item)
    termsLink: "/policies/terms",
    damageLink: "/policies/damage"
  }
};

// Dynamic helper resolve EmailJS credentials from either localstorage overrides or configuration
export function getEmailJSConfig() {
  try {
    const saved = localStorage.getItem("jharokha_emailjs_config");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.serviceId && parsed.templateId && parsed.publicKey) {
        return {
          serviceId: parsed.serviceId,
          templateId: parsed.templateId,
          publicKey: parsed.publicKey
        };
      }
    }
  } catch (e) {}

  // Defaults fallback matching standard environment configuration
  return {
    serviceId: (import.meta as any).env?.VITE_EMAILJS_SERVICE_ID || CONFIG.emailjs.serviceId,
    templateId: (import.meta as any).env?.VITE_EMAILJS_TEMPLATE_ID || CONFIG.emailjs.templateId,
    publicKey: (import.meta as any).env?.VITE_EMAILJS_PUBLIC_KEY || CONFIG.emailjs.publicKey
  };
}

