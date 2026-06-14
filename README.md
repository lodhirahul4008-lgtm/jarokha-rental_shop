# Rent My Outfit - Developer & Administration Manual

An exquisite, budget-friendly high-end Indian bridal and festive partywear clothing rental web application MVP designed in **React + Vite + Tailwind CSS**. It features a local persistence booking bag, wishlist drawers, a date-selector availability checker, EmailJS template forms, and instant pre-filled WhatsApp routing templates.

---

## 🚀 Setup & Execution Guide

Follow these steps to run the application locally or in containers:

### 1. Install Project Dependencies
Run the package installer from your terminal:
```bash
npm install
```

### 2. Configure Environment Secrets
Ensure EmailJS public keys, service codes, and target templates are mapped inside your `.env` or `.env.example` files:
```env
# EmailJS variables
VITE_EMAILJS_SERVICE_ID="your_emailjs_service_id"
VITE_EMAILJS_TEMPLATE_ID="your_emailjs_template_id"
VITE_EMAILJS_PUBLIC_KEY="your_email_js_public_key"
```

### 3. Spin up Developer Server
Launch the compiler and live hot module parser:
```bash
npm run dev
```
The application will boot on **http://localhost:3000**.

### 4. Build Production Static Assets
Generate fully minified chunks inside the `/dist` directory for Cloud deployment:
```bash
npm run build
```

---

## 👩‍💼 Admin Guide: Managing the Product Catalog

All clothing configurations, descriptions, stock units, and pre-booked dates are maintained inside the **`src/data/products.ts`** file. You do not need to install complex databases to add fresh traditional outfits to your boutique!

### Product Schema Properties
Each garment in the `PRODUCTS` array must follow this exact structure:

```typescript
export interface Product {
  id: string;          // A unique identifier (e.g., "prod-9")
  slug: string;        // URL path key (e.g., "mustard-party-wear-anarkali")
  name: string;        // Product Name shown to clients
  category: string;    // Bridal Lehenga, Wedding Lehenga, Partywear, Kurti Sets, Saree, Gown, Indo-western, Accessories
  price: number;       // Base rental price for standard 3-day lease period
  deposit: number;     // Refundable security deposit
  sizes: string[];     // Array of sizes tailoring fits (e.g., ["S", "M", "L", "XL"])
  images: string[];    // Array of image links (Unsplash or local uploads)
  color: string;       // Primary color details (e.g., "Crimson / Maroon")
  occasion: string[];  // Suitable themes (e.g., ["Wedding", "Reception", "Haldi", "Sangeet"])
  fabric: string;      // Fabric specification (e.g., "Banarasi Katan Silk")
  work: string;        // Handwork detailing (e.g., "Antique Zardozi & Mirror Hand-crafts")
  description: string; // Long narrative of the dress appeal
  stockBySize: {       // Available quantities in separate sizes
    [size: string]: number 
  };
  bookedDates: string[]; // Scheduled blocking dates in "YYYY-MM-DD" format
  featured: boolean;   // Set to true to highlight this outfit on the Home Page
}
```

### Manual Guide: To Add a New Garment manually:
1. Open **`src/data/products.ts`**.
2. Locate the `PRODUCTS` list array.
3. Copy one existing item structure.
4. Insert it at the end of the array inside the square brackets.
5. Personalize properties (use distinct `id` and `slug`) and save! The Vite server automatically reflects this on your collections grid instantly.

---

## 📞 Configuration Modifications (`src/config.ts`)

Want to update the shop phone line, Instagram paths, studio address, or default rental deposit terms? They are all centralized inside **`src/config.ts`**:

```typescript
export const CONFIG = {
  brandName: "Rent My Outfit",
  whatsappNumber: "+919876543210", // Change this to your active business phone number!
  
  contact: {
    email: "info@rentmyoutfit.com",
    phone: "+91 98765 43210",
    address: "Plot 42, Elite Designer Street, Phase 2, Jubilee Hills, Hyderabad",
    hours: "10:00 AM – 8:00 PM (Monday to Sunday)"
  }
};
```
Change any value above, and the website's headers, footers, checkout links, and WhatsApp callbacks instantly sync!
