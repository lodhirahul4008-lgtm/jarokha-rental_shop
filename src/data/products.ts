export type ProductCategory =
  | "Bridal Lehengas"
  | "Reception & Wedding Lehengas"
  | "Partywear Outfits & Dresses"
  | "Silk & Banarasi Sarees"
  | "Mehendi & Festive Gowns"
  | "Indo-western Dhoti Sets"
  | "Accessories";

export interface BookingRecord {
  id: string;
  customerName: string;
  mobile: string;
  whatsapp: string;
  email: string;
  address: string;
  pickupOption: string;
  outfitName: string;
  outfitId: string;
  size: string;
  date: string;
  duration: number;
  message: string;
  price: number;
  deposit: number;
  createdAt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number; // Rental price for default duration (usually 3 days)
  deposit: number; // Security deposit
  sizes: ("XS" | "S" | "M" | "L" | "XL" | "XXL" | "Custom")[];
  images: string[];
  color: string;
  occasion: ("Wedding" | "Haldi" | "Mehendi" | "Sangeet" | "Reception" | "Party" | "Festival")[];
  fabric: string;
  work: string;
  description: string;
  stockBySize: { [size: string]: number };
  bookedDates: string[]; // Dates in YYYY-MM-DD
  featured: boolean;
}

export const PRODUCTS: Product[] = [
  // --- BRIDAL LEHENGAS ---
  {
    id: "prod-1",
    slug: "royal-crimson-bridal-lehenga",
    name: "Royal Crimson Bridal Lehenga",
    category: "Bridal Lehengas",
    price: 4999,
    deposit: 5000,
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&q=80&w=800"
    ],
    color: "Deep Red / Crimson",
    occasion: ["Wedding", "Reception"],
    fabric: "Premium Velvet",
    work: "Intricate Antique Gold Zari, Dabka work, and Hand-stitched Stones",
    description: "Make your dream day timeless in this magnificent deep crimson red bridal lehenga. Tailored in luxurious soft velvet, it features highly intricate hand-crafted gold zari embroidery across the paneling. Accompanied by a heavy matching blouse and double dupatta (one sheer tulle, one silk satin) for that beautiful royal volume and majestic drape.",
    stockBySize: { "S": 1, "M": 2, "L": 1, "XL": 1 },
    bookedDates: ["2026-06-20", "2026-06-21", "2026-06-22", "2026-11-14", "2026-11-15"],
    featured: true
  },
  {
    id: "prod-9",
    slug: "maharani-velvet-bridal-lehenga-maroon",
    name: "Maharani Velvet Bridal Lehenga (Maroon)",
    category: "Bridal Lehengas",
    price: 3499,
    deposit: 3500,
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800"
    ],
    color: "Maharani Maroon",
    occasion: ["Wedding", "Reception"],
    fabric: "Premium Velvet",
    work: "Intricate Antique Gold Zardosi & Gota Patti",
    description: "Crafted for absolute royalty, this exquisite Jharokha signature maroon velvet bridal lehenga is beautifully hand-embroidered with classic zardozi work and gold floral panels. Designed with high flare volume, it provides a majestic drape for Indian brides.",
    stockBySize: { "S": 1, "M": 2, "L": 1, "XL": 1 },
    bookedDates: [],
    featured: true
  },
  {
    id: "prod-13",
    slug: "ivory-rose-gold-bridal-lehenga",
    name: "Ivory & Rose Gold Premium Bridal Lehenga",
    category: "Bridal Lehengas",
    price: 5499,
    deposit: 5500,
    sizes: ["S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&q=80&w=800"
    ],
    color: "Ivory & Rose Gold",
    occasion: ["Wedding", "Reception"],
    fabric: "Royal Raw Silk",
    work: "Heavy Pitambari and Resham Threadwork with Cut-glass beads",
    description: "A breathtaking contemporary choice for the modern bride. Ivory silk base adorned with exquisite rose-gold work, creating a shining metallic hue. Stitched with triple layer can-can for ultimate shape flare.",
    stockBySize: { "S": 1, "M": 1, "L": 1 },
    bookedDates: [],
    featured: false
  },

  // --- RECEPTION & WEDDING LEHENGAS ---
  {
    id: "prod-6",
    slug: "maroon-reception-velvet-lehenga",
    name: "Majestic Wine Real Mirror Lehenga",
    category: "Reception & Wedding Lehengas",
    price: 3499,
    deposit: 3500,
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&q=80&w=800"
    ],
    color: "Wine Maroon / Plum",
    occasion: ["Wedding", "Reception", "Sangeet"],
    fabric: "Raw Silk & Velvet Patch Accent",
    work: "Geometric Real Mirror Work and intricate resham tilla borders",
    description: "Turn heads with this designer wine maroon lehenga that blends luxury with modern design. Hand-embedded real mirrors create a dazzling reflective pattern as you move. Crafted in heavy-grade raw silk, it features deep crimson velvet panel details and matches with a fully embroidered designer sweetheart-neck blouse and sheer net dupatta.",
    stockBySize: { "S": 1, "M": 2, "L": 1, "XL": 1 },
    bookedDates: ["2026-06-14", "2026-06-15", "2026-06-16"],
    featured: true
  },
  {
    id: "prod-14",
    slug: "emerald-queen-banarasi-lehenga",
    name: "Emerald Banarasi Silk Heritage Lehenga",
    category: "Reception & Wedding Lehengas",
    price: 2999,
    deposit: 3000,
    sizes: ["M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800"
    ],
    color: "Emerald Green",
    occasion: ["Wedding", "Reception", "Sangeet"],
    fabric: "Pure Banarasi Brocade Silk",
    work: "Authentic Zari Weaving, Kadwa weave borders, and hand-tasseling",
    description: "Embody pure Indian tradition in this magnificent heavy Banarasi silk lehenga. Woven with intricate pure gold thread patterns, paired with an elegant silk choli and a traditional contrasting dupatta.",
    stockBySize: { "M": 2, "L": 1, "XL": 1 },
    bookedDates: [],
    featured: false
  },

  // --- PARTYWEAR OUTFITS & DRESSES ---
  {
    id: "prod-2",
    slug: "blushing-rose-partywear-lehenga",
    name: "Blushing Rose Sequined Lehenga",
    category: "Partywear Outfits & Dresses",
    price: 1999,
    deposit: 2000,
    sizes: ["S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1610030470217-1a48c41f71df?auto=format&fit=crop&q=80&w=800"
    ],
    color: "Pastel Rose Pink",
    occasion: ["Sangeet", "Party", "Reception"],
    fabric: "Soft Georgette",
    work: "Multi-colored Pastel Resham and shimmering Baby Sequins",
    description: "An elegant, lightweight blushing rose pink lehenga designed for dancing the night away. The flowy georgette skirt features sparkling mirror-illusion sequins that catch the light gorgeously. Complete with a padded sleeveless designer sports-neck blouse and a coordinating net dupatta finished with delicate scalloped edges.",
    stockBySize: { "S": 2, "M": 2, "L": 1 },
    bookedDates: ["2026-06-25", "2026-06-26"],
    featured: true
  },
  {
    id: "prod-10",
    slug: "jharokha-blossom-pink-lehenga",
    name: "Jharokha Blossom Pink Georgette Lehenga",
    category: "Partywear Outfits & Dresses",
    price: 1699,
    deposit: 1500,
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800"
    ],
    color: "Blossom Rose Pink",
    occasion: ["Sangeet", "Party", "Reception", "Festival"],
    fabric: "Soft Georgette",
    work: "Glittering Mirror-silk embroidery with lace borders",
    description: "Extremely lightweight and flowy georgette fabric in a beautiful soft rose pink, embellished with resham tilla and mirror outline borders. Perfect for wedding sangeets, festival looks, or bridesmaid styling.",
    stockBySize: { "S": 2, "M": 2, "L": 1, "XL": 1 },
    bookedDates: [],
    featured: true
  },
  {
    id: "prod-3",
    slug: "mustard-haldi-kurta-set",
    name: "Sunshine Gota-Patti Kurta Set",
    category: "Partywear Outfits & Dresses",
    price: 899,
    deposit: 1000,
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1608748010899-18f300247112?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800"
    ],
    color: "Mustard Yellow",
    occasion: ["Haldi", "Mehendi", "Festival"],
    fabric: "Chanderi Silk Blend",
    work: "Traditional Rajasthani Gota Patti and delicate Zardozi work",
    description: "Radiate cheerful festive vibes in this deep mustard yellow Chanderi silk kurta set. Ideal for Haldi rituals and day functions, the straight-cut calf-length kurta features heavy Gota Patti floral motifs around the neckline and sleeve cuffs. Paired with comfortable silk-blend straight trousers and a dual-shade organza dupatta.",
    stockBySize: { "S": 2, "M": 3, "L": 3, "XL": 2, "XXL": 1 },
    bookedDates: ["2026-06-18", "2026-06-19"],
    featured: true
  },
  {
    id: "prod-12",
    slug: "chanderi-rani-pink-anarkali-suit",
    name: "Chanderi Rani Pink Festive Anarkali Suit",
    category: "Partywear Outfits & Dresses",
    price: 799,
    deposit: 800,
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&q=80&w=800"
    ],
    color: "Rani Pink",
    occasion: ["Haldi", "Mehendi", "Festival", "Party"],
    fabric: "Chanderi Cotton Silk Blend",
    work: "Elegantly framed neck zari, heavy gota-patti border dupatta",
    description: "Feel comfortable and look endlessly charming in this classic Rani pink Indian suit. Set includes a full flared calf-length Chanderi silk Anarkali dress, comfortable slim pants, and a matching organza dupatta with gold laces.",
    stockBySize: { "S": 2, "M": 2, "L": 3, "XL": 2, "XXL": 1 },
    bookedDates: [],
    featured: true
  },

  // --- SILK & BANARASI SAREES ---
  {
    id: "prod-5",
    slug: "royal-blue-banarasi-saree",
    name: "Vintage Banarasi Katan Silk Saree",
    category: "Silk & Banarasi Sarees",
    price: 1299,
    deposit: 1500,
    sizes: ["M", "L", "XL", "Custom"],
    images: [
      "https://images.unsplash.com/photo-1610030470282-3e284da7ded7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800"
    ],
    color: "Midnight Royal Blue",
    occasion: ["Wedding", "Reception", "Festival"],
    fabric: "Pure Banarasi Katan Silk",
    work: "Gold Brocade Zari Weaving and heavy pallu tasseling",
    description: "Exude unmatched regal charm in this majestic dark royal blue Banarasi silk saree. Woven on traditional handlooms in Varanasi, it features classic gold zari floral butis scattered elegantly across the body, with an opulent handwoven designer brocade border and pallu. Comes with a semi-stitched matching blouse piece and a pre-stitched, size-adjustable modern blouse for your absolute ease.",
    stockBySize: { "M": 1, "L": 1, "XL": 1, "Custom": 1 },
    bookedDates: ["2026-07-02", "2026-07-03"],
    featured: false
  },
  {
    id: "prod-15",
    slug: "crimson-kanjeevaram-silk-saree",
    name: "Classic Crimson Ruby Kanjeevaram Saree",
    category: "Silk & Banarasi Sarees",
    price: 1499,
    deposit: 1500,
    sizes: ["M", "L", "Custom"],
    images: [
      "https://images.unsplash.com/photo-1610030470217-1a48c41f71df?auto=format&fit=crop&q=80&w=800"
    ],
    color: "Ruby Red & Gold",
    occasion: ["Wedding", "Festival", "Reception"],
    fabric: "Pure Kanchipuram Silk",
    work: "Authentic Copper-Gold Zari Brocade with temple borders",
    description: "Directly sourced from Tamil Nadu's legacy weaving circles, this saree is made of thick, shimmering pure silk thread featuring intricate traditional peacocks and coin motifs. Complete with a customizable blouse piece.",
    stockBySize: { "M": 1, "L": 1, "Custom": 1 },
    bookedDates: [],
    featured: true
  },
  {
    id: "prod-16",
    slug: "pearl-mint-organza-saree",
    name: "Pastel Mint Organza Designer Saree",
    category: "Silk & Banarasi Sarees",
    price: 999,
    deposit: 1000,
    sizes: ["S", "M", "L", "Custom"],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800"
    ],
    color: "Mint Green / Sage",
    occasion: ["Sangeet", "Party", "Festival"],
    fabric: "Sheer Organza Silk",
    work: "Intricate hand-painted pastel floral trails with pearl borders",
    description: "An absolute dream of lightweight grace. The translucent mint green organza fabric drapes like mist, detailed with beautiful hand-drawn floral trails and finished with tiny pearl-work borders.",
    stockBySize: { "S": 1, "M": 1, "L": 1, "Custom": 1 },
    bookedDates: [],
    featured: false
  },

  // --- MEHENDI & FESTIVE GOWNS ---
  {
    id: "prod-4",
    slug: "emerald-mehendi-gown",
    name: "Emerald Forest Fusion Gown",
    category: "Mehendi & Festive Gowns",
    price: 1599,
    deposit: 1500,
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&q=80&w=800"
    ],
    color: "Emerald Green",
    occasion: ["Mehendi", "Reception", "Party"],
    fabric: "Fluid Chiffon & Satin Lining",
    work: "Handwoven Cutdana, Thread-work and Zari belts",
    description: "Make a striking entry with this flowing emerald green ethnic gown. Crafted in lightweight micro-chiffon with a full flared umbrella skirt, the pleated bodice is offset with hand-embroidered floral cutdana work. Includes a removable matching embroidered waist belt for an elegant cinch and modern silhouette.",
    stockBySize: { "S": 1, "M": 2, "L": 1, "XL": 1 },
    bookedDates: [],
    featured: true
  },
  {
    id: "prod-17",
    slug: "lilac-dawn-silk-gown",
    name: "Lilac Dawn Silk Flowy Gown",
    category: "Mehendi & Festive Gowns",
    price: 1399,
    deposit: 1500,
    sizes: ["S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800"
    ],
    color: "Lavender Lilac",
    occasion: ["Sangeet", "Party", "Reception"],
    fabric: "Premium Georgette Silk",
    work: "Sequin lace borders and deep v-neck embroidered backless loop",
    description: "Drape yourself in lavender elegance. This luxury fluid georgette gown catches the wind instantly, decorated with fine thread-work layers and shimmering crystal cuts on the neck and wrist cuffs.",
    stockBySize: { "S": 1, "M": 1, "L": 1 },
    bookedDates: [],
    featured: false
  },

  // --- INDO-WESTERN DHOTI SETS ---
  {
    id: "prod-7",
    slug: "mint-fusion-dhoti-set",
    name: "Mint Peplum Dhoti & Shrug Set",
    category: "Indo-western Dhoti Sets",
    price: 1499,
    deposit: 1500,
    sizes: ["S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800"
    ],
    color: "Mint Green / Sage",
    occasion: ["Mehendi", "Sangeet", "Party"],
    fabric: "Crepe Silk & Organza Caps",
    work: "Modern Thread Embroidery, French knots, and Bead tasseling",
    description: "A gorgeous modern fusion choice, perfect for pre-wedding celebrations. This set includes dynamic draped mint crepe dhoti trousers, coupled with a heavily embroidered sleeveless peplum short top and an airy sheer organza long shrug featuring floral pastel embroidery on the shoulders.",
    stockBySize: { "S": 1, "M": 2, "L": 1 },
    bookedDates: [],
    featured: false
  },
  {
    id: "prod-11",
    slug: "indigo-floral-palazzo-shrug-set",
    name: "Indigo Floral Palazzo & Shrug Co-ord Set",
    category: "Indo-western Dhoti Sets",
    price: 1199,
    deposit: 1000,
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1608748010899-18f300247112?auto=format&fit=crop&q=80&w=800"
    ],
    color: "Peacock Indigo Blue",
    occasion: ["Mehendi", "Party", "Festival"],
    fabric: "Modal Silk & Organza",
    work: "Traditional Rajasthani block print layout with sequined lace",
    description: "A gorgeous modern fusion choice consisting of flowy floral-printed silk palazzo trousers, an matching crop tank top, and an airy organza shrug bordered with delicate gold lace trims.",
    stockBySize: { "S": 2, "M": 3, "L": 2, "XL": 1, "XXL": 1 },
    bookedDates: [],
    featured: true
  },

  // --- ACCESSORIES ---
  {
    id: "prod-8",
    slug: "premium-kundan-jewellery-set",
    name: "Royal Jadau Kundan Choker Set",
    category: "Accessories",
    price: 699,
    deposit: 1000,
    sizes: ["Custom"],
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800"
    ],
    color: "Gold & Emerald Green beads",
    occasion: ["Wedding", "Reception", "Sangeet"],
    fabric: "Gold Plated Brass Alloy",
    work: "Uncut Kundan setting, Jadau craft, and premium pearl hanging drops",
    description: "The ultimate finishing touch for your royal ensemble. This premium jewelry set includes a heavy adjustable Kundan choker, matching chandelier earrings, and a dainty maang-tika. Styled with semi-precious emerald green bead drops, it beautifully complements crimson, pastel pink, and maroon outfits.",
    stockBySize: { "Custom": 3 },
    bookedDates: ["2026-06-20", "2026-06-21"],
    featured: false
  }
];

// Helper functions for stock & availability
export function checkAvailability(
  product: Product,
  selectedSize: string,
  selectedDate: string
): { available: boolean; reason: string } {
  // Check if size is valid
  if (!product.sizes.includes(selectedSize as any)) {
    return { available: false, reason: `Size '${selectedSize}' is not designer-tailored for this outfit.` };
  }

  // Check if stock for this size is greater than 0
  const stock = product.stockBySize[selectedSize] || 0;
  if (stock <= 0) {
    return { available: false, reason: `We currently have 0 standard stock in size ${selectedSize}.` };
  }

  // Check if date is booked
  if (selectedDate && product.bookedDates?.includes(selectedDate)) {
    return { 
      available: false, 
      reason: "Sorry, this gorgeous outfit is already booked for this specific date by another client." 
    };
  }

  return { available: true, reason: "This outfit is available for your selected date!" };
}
