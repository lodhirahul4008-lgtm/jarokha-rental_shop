import React, { useState } from "react";
import { Lock, LogIn, LogOut, Plus, Edit2, Trash2, Check, X, ShieldAlert, Award, FileText, Sparkles, Sliders, IndianRupee, Mail, CheckCircle, Trash, RefreshCw, Calendar, ClipboardList } from "lucide-react";
import { Product, ProductCategory, BookingRecord } from "../data/products";

interface AdminProps {
  products: Product[];
  onUpdateProducts: (newProducts: Product[]) => void;
  bookings: BookingRecord[];
  onUpdateBookings: (newBookings: BookingRecord[]) => void;
}

export default function Admin({ products, onUpdateProducts, bookings, onUpdateBookings }: AdminProps) {
  // EmailJS form custom variables
  const [mailServiceId, setMailServiceId] = useState(() => {
    try {
      const saved = localStorage.getItem("jharokha_emailjs_config");
      if (saved) return JSON.parse(saved).serviceId || "service_rentmyoutfit";
    } catch (e) {}
    return "service_rentmyoutfit";
  });

  const [mailTemplateId, setMailTemplateId] = useState(() => {
    try {
      const saved = localStorage.getItem("jharokha_emailjs_config");
      if (saved) return JSON.parse(saved).templateId || "template_booking_req";
    } catch (e) {}
    return "template_booking_req";
  });

  const [mailPublicKey, setMailPublicKey] = useState(() => {
    try {
      const saved = localStorage.getItem("jharokha_emailjs_config");
      if (saved) return JSON.parse(saved).publicKey || "user_public_key_here";
    } catch (e) {}
    return "user_public_key_here";
  });

  const handleSaveEmailKeys = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const obj = {
        serviceId: mailServiceId.trim(),
        templateId: mailTemplateId.trim(),
        publicKey: mailPublicKey.trim()
      };
      localStorage.setItem("jharokha_emailjs_config", JSON.stringify(obj));
      triggerAdminToast("EmailJS keys saved! Incoming bookings will now route immediately to your designated inbox.");
    } catch (err) {
      alert("Error saving configuration keys.");
    }
  };

  // Login form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("jharokha_admin_logged") === "true";
  });
  const [loginError, setLoginError] = useState("");

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState(0);
  const [editDeposit, setEditDeposit] = useState(0);
  const [editCategory, setEditCategory] = useState<ProductCategory>("Bridal Lehengas");

  // Create new product form states
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState<ProductCategory>("Bridal Lehengas");
  const [newPrice, setNewPrice] = useState<number>(1499);
  const [newDeposit, setNewDeposit] = useState<number>(1500);
  const [newColor, setNewColor] = useState("");
  const [newFabric, setNewFabric] = useState("");
  const [newWork, setNewWork] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newSizes, setNewSizes] = useState<("XS" | "S" | "M" | "L" | "XL" | "XXL" | "Custom")[]>(["S", "M", "L"]);
  const [selectedOccasions, setSelectedOccasions] = useState<("Wedding" | "Haldi" | "Mehendi" | "Sangeet" | "Reception" | "Party" | "Festival")[]>(["Wedding"]);
  const [imageUrl, setImageUrl] = useState("");

  // Notification Toast state
  const [adminToast, setAdminToast] = useState("");

  const categoriesList: ProductCategory[] = [
    "Bridal Lehengas",
    "Reception & Wedding Lehengas",
    "Partywear Outfits & Dresses",
    "Silk & Banarasi Sarees",
    "Mehendi & Festive Gowns",
    "Indo-western Dhoti Sets",
    "Accessories"
  ];

  const standardSizes: ("XS" | "S" | "M" | "L" | "XL" | "XXL" | "Custom")[] = [
    "XS", "S", "M", "L", "XL", "XXL", "Custom"
  ];

  const standardOccasions: ("Wedding" | "Haldi" | "Mehendi" | "Sangeet" | "Reception" | "Party" | "Festival")[] = [
    "Wedding", "Haldi", "Mehendi", "Sangeet", "Reception", "Party", "Festival"
  ];

  const triggerAdminToast = (msg: string) => {
    setAdminToast(msg);
    setTimeout(() => setAdminToast(""), 4000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "Admin@gmail.com" && password === "12345678") {
      setIsLoggedIn(true);
      sessionStorage.setItem("jharokha_admin_logged", "true");
      setLoginError("");
      triggerAdminToast("Welcome Back, Amit & Saloni! Admin session authorized.");
    } else {
      setLoginError("Invalid Admin credentials. Check template ID & Pass.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("jharokha_admin_logged");
    triggerAdminToast("Admin logged out successfully.");
  };

  // Start Quick Inline Editing
  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditName(product.name);
    setEditPrice(product.price);
    setEditDeposit(product.deposit);
    setEditCategory(product.category);
  };

  // Save Quick Inline Editing
  const saveEdit = (id: string) => {
    if (!editName.trim()) {
      alert("Name cannot be empty");
      return;
    }
    const updated = products.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          name: editName,
          price: Number(editPrice),
          deposit: Number(editDeposit),
          category: editCategory,
          slug: editName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
        };
      }
      return p;
    });
    onUpdateProducts(updated);
    setEditingId(null);
    triggerAdminToast("Title and Price updated successfully!");
  };

  // Delete product entry
  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Are you absolutely sure you want to remove "${name}" from the Jharokha catalog?`)) {
      const updated = products.filter((p) => p.id !== id);
      onUpdateProducts(updated);
      triggerAdminToast(`"${name}" deleted successfully.`);
    }
  };

  // Toggle size selection
  const handleToggleSize = (size: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "Custom") => {
    if (newSizes.includes(size)) {
      setNewSizes(newSizes.filter((s) => s !== size));
    } else {
      setNewSizes([...newSizes, size]);
    }
  };

  // Toggle occasion selection
  const handleToggleOccasion = (occ: "Wedding" | "Haldi" | "Mehendi" | "Sangeet" | "Reception" | "Party" | "Festival") => {
    if (selectedOccasions.includes(occ)) {
      setSelectedOccasions(selectedOccasions.filter((o) => o !== occ));
    } else {
      setSelectedOccasions([...selectedOccasions, occ]);
    }
  };

  // Form submit for new product
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newName.trim()) {
      alert("Please provide a valid Title for the garment.");
      return;
    }

    // Default image if blank
    const fallbackImages = {
      "Bridal Lehengas": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
      "Reception & Wedding Lehengas": "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&q=80&w=800",
      "Partywear Outfits & Dresses": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
      "Silk & Banarasi Sarees": "https://images.unsplash.com/photo-1610030470282-3e284da7ded7?auto=format&fit=crop&q=80&w=800",
      "Mehendi & Festive Gowns": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800",
      "Indo-western Dhoti Sets": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
      "Accessories": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800"
    };

    const finalImage = imageUrl.trim() || fallbackImages[newCategory];

    // Create correct stock counts
    const stockMap: { [size: string]: number } = {};
    newSizes.forEach((sz) => {
      stockMap[sz] = sz === "Custom" ? 1 : 2; // general default stock assignment
    });

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      slug: newName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      name: newName,
      category: newCategory,
      price: Number(newPrice),
      deposit: Number(newDeposit),
      sizes: newSizes.length > 0 ? newSizes : ["M"],
      images: [finalImage],
      color: newColor || "Multi-colored",
      occasion: selectedOccasions.length > 0 ? selectedOccasions : ["Party"],
      fabric: newFabric || "Exclusive Poly Fabric Blend",
      work: newWork || "Elegant hand embroidery work",
      description: newDescription || `A beautiful signature addition with absolute royal cuts personally curated under Jharokha advisory.`,
      stockBySize: stockMap,
      bookedDates: [],
      featured: true
    };

    onUpdateProducts([newProduct, ...products]);
    triggerAdminToast(`Successfully added "${newName}" to ${newCategory}!`);

    // Reset Creation form
    setNewName("");
    setNewPrice(1499);
    setNewDeposit(1500);
    setNewColor("");
    setNewFabric("");
    setNewWork("");
    setNewDescription("");
    setImageUrl("");
  };

  // RENDER LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-neutral-800">
        <div className="bg-white border-2 border-gold/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* Top aesthetic touch */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-gold via-maroon to-gold" />
          
          <div className="text-center space-y-3 mb-8">
            <div className="w-14 h-14 bg-maroon/5 border border-gold/40 rounded-full flex items-center justify-center mx-auto text-maroon shadow-md">
              <Lock className="w-6 h-6 text-maroon" />
            </div>
            <h1 className="text-2xl font-bold font-display tracking-tight text-neutral-900">Jharokha Admin Login</h1>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto">
              Please enter official credentials to add demo sarees, traditional bridal lehengas, or update catalog pricing.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                Admin Email ID
              </label>
              <input
                type="email"
                required
                className="w-full border border-neutral-200 rounded-lg p-2.5 text-xs bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-maroon focus:bg-white"
                placeholder="Admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-[10px] text-neutral-400 mt-1 leading-normal">
                Demo ID: <strong className="text-neutral-600">Admin@gmail.com</strong>
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                Secret Password
              </label>
              <input
                type="password"
                required
                className="w-full border border-neutral-200 rounded-lg p-2.5 text-xs bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-maroon focus:bg-white"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-[10px] text-neutral-400 mt-1 leading-normal">
                Demo Password: <strong className="text-neutral-600">12345678</strong>
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[11px] leading-relaxed flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-500" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-maroon hover:bg-[#6c0217] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition shadow-md flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" /> Authenticate Admin Access
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-dashed border-neutral-100 flex items-center justify-center text-[10px] text-neutral-400 gap-1.5">
            <Award className="w-4 h-4 text-gold" />
            <span>Amit & Saloni Signature Boutique Portal</span>
          </div>
        </div>
      </div>
    );
  }

  // RENDER ADMIN PANEL INTERFACE
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-neutral-800 space-y-10">
      
      {/* Toast Notification */}
      {adminToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white rounded-xl shadow-2xl p-4 text-xs max-w-sm flex items-center gap-2.5 animate-slideIn border border-gold/45">
          <Sparkles className="w-5 h-5 text-gold shrink-0" />
          <span>{adminToast}</span>
        </div>
      )}

      {/* Admin Panel Header Banner */}
      <div className="bg-neutral-950 text-white rounded-2xl border border-gold/30 p-6 md:p-8 relative overflow-hidden shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
        <div className="space-y-2 text-left relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold/15 text-gold border border-gold/40 text-[10px] rounded-full uppercase tracking-wider font-bold">
            <Award className="w-3.5 h-3.5" /> Jharokha Authorized Control
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-display text-white">Amit & Saloni Store Manager</h1>
          <p className="text-xs text-neutral-300 max-w-xl leading-relaxed">
            Manage the boutique catalog in real-time. Add demo sarees & designer lehengas, edit titles, modify rental rates & safety deposits. Changes display instantly in the browser collection.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="border border-red-500/40 text-red-400 hover:text-white hover:bg-red-500 py-2.5 px-5 text-xs font-bold uppercase tracking-wider rounded-lg transition relative z-10 flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> End Session
        </button>
      </div>

      {/* PRIMARY ADMIN LAYOUT: ADD PRODUCT + MANAGE PRODUCT CATALOG */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: LIST NEW ITEM FORM (COLS: 5) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm h-fit space-y-6">
          <div className="border-b pb-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-maroon/5 flex items-center justify-center text-maroon border border-gold/30">
              <Plus className="w-4.5 h-4.5" />
            </div>
            <div className="text-left">
              <h2 className="font-display font-semibold text-neutral-950 text-sm uppercase tracking-wider">List New Garment</h2>
              <p className="text-[10px] text-neutral-400">Fill details to deploy new rental in catalog</p>
            </div>
          </div>

          <form onSubmit={handleCreateProduct} className="space-y-4 text-left">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Outfit Title / Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vintage Pink Organza Silk Saree"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full border rounded-lg p-2 text-xs bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-maroon"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Boutique Category *
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as ProductCategory)}
                className="w-full border rounded-lg p-2 text-xs bg-neutral-50 focus:outline-none"
              >
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price & Deposit */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Rent (3 Days) *
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs">₹</span>
                  <input
                    type="number"
                    required
                    min={200}
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full border rounded-lg pl-6 pr-2 py-2 text-xs bg-neutral-50 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Security Deposit *
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs">₹</span>
                  <input
                    type="number"
                    required
                    min={200}
                    value={newDeposit}
                    onChange={(e) => setNewDeposit(Number(e.target.value))}
                    className="w-full border rounded-lg pl-6 pr-2 py-2 text-xs bg-neutral-50 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Colors & Fabric */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Color Profile
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ruby Red / Lavender"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="w-full border rounded-lg p-2 text-xs bg-neutral-50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Fabric Type
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pure Georgette Silk"
                  value={newFabric}
                  onChange={(e) => setNewFabric(e.target.value)}
                  className="w-full border rounded-lg p-2 text-xs bg-neutral-50"
                />
              </div>
            </div>

            {/* Work */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Embroidery / Zari / Craft Work Detail
              </label>
              <input
                type="text"
                placeholder="e.g. Heavy zardozi pattern, cutdana, mirror work"
                value={newWork}
                onChange={(e) => setNewWork(e.target.value)}
                className="w-full border rounded-lg p-2 text-xs bg-neutral-50"
              />
            </div>

            {/* Sizes Select Checkboxes */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                Tailorable Sizes
              </label>
              <div className="flex flex-wrap gap-1.5Packed">
                {standardSizes.map((size) => {
                  const active = newSizes.includes(size);
                  return (
                    <button
                      type="button"
                      key={size}
                      onClick={() => handleToggleSize(size)}
                      className={`h-7 px-2.5 rounded-md text-[10px] font-bold border transition ${
                        active
                          ? "bg-maroon text-amber-50 border-maroon"
                          : "bg-white text-neutral-700 border-neutral-200 hover:border-maroon/50"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Occasions suited */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                Occasions Filter suitables
              </label>
              <div className="flex flex-wrap gap-1">
                {standardOccasions.map((occ) => {
                  const active = selectedOccasions.includes(occ);
                  return (
                    <button
                      type="button"
                      key={occ}
                      onClick={() => handleToggleOccasion(occ)}
                      className={`px-2 py-1 rounded text-[9px] font-semibold border transition ${
                        active
                          ? "bg-amber-100 text-neutral-900 border-[#D4AF37]"
                          : "bg-neutral-50 text-neutral-600 border-neutral-200"
                      }`}
                    >
                      {occ}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Image URL custom path */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Image URL
              </label>
              <input
                type="text"
                placeholder="Leave blank for automatic high-res placeholder image"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full border rounded-lg p-2 text-xs bg-neutral-50"
              />
              <span className="text-[10px] text-neutral-400 mt-1 block">
                Custom web links can be inserted. High-quality default model covers are used otherwise.
              </span>
            </div>

            {/* Description area */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Brief Description / Fitting Guidelines
              </label>
              <textarea
                rows={2}
                placeholder="Details of patterns, premium cancan stitched layer details..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full border rounded-lg p-2 text-xs bg-neutral-50"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold hover:bg-[#AA7C11] text-neutral-950 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-md"
            >
              Deploy & List on Catalog
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: MANAGE & UPDATE CATALOG LIST (COLS: 7) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm h-fit space-y-6">
          <div className="border-b pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-maroon/5 flex items-center justify-center text-maroon border border-gold/30">
                <Sliders className="w-4.5 h-4.5" />
              </div>
              <div className="text-left">
                <h2 className="font-display font-semibold text-neutral-950 text-sm uppercase tracking-wider">Garments Catalog Manager</h2>
                <p className="text-[10px] text-neutral-400">Inline edit name titles, rental pricing or remove garments</p>
              </div>
            </div>
            <span className="bg-amber-50 text-neutral-800 border border-gold/25 font-semibold text-[10px] px-2.5 py-1 rounded-full">
              Count: {products.length} Outfits
            </span>
          </div>

          {/* Catalog Listing Table list view */}
          <div className="overflow-x-auto border rounded-xl divide-y">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-neutral-50 text-neutral-500 font-bold uppercase text-[9px] border-b">
                  <th className="p-3">Garment Preview & Details</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Rental / Deposit Rates</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-xs font-medium">
                {products.map((prod) => {
                  const isEditing = editingId === prod.id;
                  return (
                    <tr key={prod.id} className="hover:bg-neutral-50/50 transition">
                      <td className="p-3">
                        <div className="flex gap-3 items-center">
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-16 object-cover rounded-lg border shadow-xs shrink-0 bg-neutral-100"
                          />
                          <div className="text-left space-y-1">
                            {isEditing ? (
                              <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="border rounded px-2 py-1 text-xs font-semibold w-full focus:ring-1 focus:ring-maroon focus:outline-none"
                              />
                            ) : (
                              <h4 className="font-semibold text-neutral-950 font-display line-clamp-1">
                                {prod.name}
                              </h4>
                            )}
                            <p className="text-[10px] text-neutral-400 font-mono">
                              ID: {prod.id} • Color: {prod.color}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        {isEditing ? (
                          <select
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value as ProductCategory)}
                            className="border rounded p-1 text-[11px]"
                          >
                            {categoriesList.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-neutral-100 border text-[10px] text-neutral-600 whitespace-nowrap">
                            {prod.category}
                          </span>
                        )}
                      </td>
                      <td className="p-3 space-y-1">
                        {isEditing ? (
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] text-neutral-400">Rent:</span>
                              <input
                                type="number"
                                value={editPrice}
                                onChange={(e) => setEditPrice(Number(e.target.value))}
                                className="border rounded p-0.5 text-xs w-16"
                              />
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] text-neutral-400">Dep:</span>
                              <input
                                type="number"
                                value={editDeposit}
                                onChange={(e) => setEditDeposit(Number(e.target.value))}
                                className="border rounded p-0.5 text-xs w-16"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-0.5 font-semibold text-neutral-800">
                            <div>Rent: <span className="text-maroon">₹{prod.price}</span></div>
                            <div className="text-[10px] text-neutral-400">Deposit: ₹{prod.deposit}</div>
                          </div>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        {isEditing ? (
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => saveEdit(prod.id)}
                              className="p-1.5 bg-emerald-100 text-emerald-800 rounded hover:bg-emerald-200 transition"
                              title="Save Changes"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1.5 bg-neutral-100 text-neutral-700 rounded hover:bg-neutral-200 transition"
                              title="Cancel"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => startEdit(prod)}
                              className="p-1.5 bg-neutral-50 hover:bg-amber-50 text-neutral-600 hover:text-amber-800 hover:border-gold/30 border rounded transition"
                              title="Quick-Edit Title & Price"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id, prod.name)}
                              className="p-1.5 bg-neutral-50 hover:bg-red-50 text-neutral-400 hover:text-red-700 border hover:border-red-200 rounded transition"
                              title="Delete Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* EMAILJS & DIRECT EMAIL OUTGOING GATEWAY CONTROLLER */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm text-left grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form inputs to specify the keys */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 border-b pb-3.5">
            <div className="w-8 h-8 rounded-full bg-maroon/5 flex items-center justify-center text-maroon border border-gold/30">
              <Mail className="w-4.5 h-4.5 text-maroon" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-neutral-950 text-sm uppercase tracking-wider">Email Delivery Gateway</h2>
              <p className="text-[10px] text-neutral-400">Configure real-time email triggers for client reservations</p>
            </div>
          </div>

          <form onSubmit={handleSaveEmailKeys} className="space-y-3.5">
            <div>
              <label className="block text-[10px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                EmailJS Service ID *
              </label>
              <input
                type="text"
                required
                className="w-full border rounded-lg p-2 text-xs bg-neutral-50 font-mono focus:outline-none focus:ring-1 focus:ring-maroon"
                placeholder="e.g. service_xxxxxxx"
                value={mailServiceId}
                onChange={(e) => setMailServiceId(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                EmailJS Template ID *
              </label>
              <input
                type="text"
                required
                className="w-full border rounded-lg p-2 text-xs bg-neutral-50 font-mono focus:outline-none focus:ring-1 focus:ring-maroon"
                placeholder="e.g. template_xxxxxxx"
                value={mailTemplateId}
                onChange={(e) => setMailTemplateId(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                EmailJS Public Key *
              </label>
              <input
                type="text"
                required
                className="w-full border rounded-lg p-2 text-xs bg-neutral-50 font-mono focus:outline-none focus:ring-1 focus:ring-maroon"
                placeholder="e.g. user_xxxxxxxxxxxxxxxx"
                value={mailPublicKey}
                onChange={(e) => setMailPublicKey(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-maroon hover:bg-[#6c0217] text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Save active gateway configurations
            </button>
          </form>
        </div>

        {/* Right Column: High quality visual guidelines in Hindi and English */}
        <div className="lg:col-span-7 bg-amber-50/50 border border-[#D4AF37]/20 rounded-xl p-5 space-y-4 text-xs font-medium text-neutral-700 leading-relaxed">
          <div className="flex items-center gap-1.5 text-maroon font-bold uppercase text-[10px] tracking-wider">
            <Sparkles className="w-4 h-4 text-gold" /> Email Alert Setup Guide (Gmail Inbox Active Guide)
          </div>
          
          <div className="space-y-3 font-normal text-[11px] text-neutral-600">
            <p>
              By default, since active API keys require an EmailJS.com registration, we save all customer bookings locally on your database below. If you want a real email to trigger dynamically at <strong className="text-neutral-800">jharokhaethnicware05@gmail.com</strong>, do these easy steps:
            </p>
            <ol className="list-decimal pl-4 space-y-2">
              <li>
                Visit <strong>https://www.emailjs.com</strong> and create a FREE account.
              </li>
              <li>
                Click on <strong>Email Services</strong> &rarr; <strong>Add New Service</strong> &rarr; Connect your Gmail (e.g., <span className="font-semibold text-neutral-800">jharokhaethnicware05@gmail.com</span>). Note the generated <strong>Service ID</strong>.
              </li>
              <li>
                Click on <strong>Email Templates</strong> &rarr; <strong>Create New Template</strong>. Modify the template subject/content using these keys: <code className="font-mono bg-neutral-100 px-1.5 py-0.5 rounded text-maroon">&#123;&#123;customer_name&#125;&#125;</code>, <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-neutral-800">&#123;&#123;phone&#125;&#125;</code>, <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-neutral-800">&#123;&#123;outfit_name&#125;&#125;</code>, <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-neutral-800">&#123;&#123;size&#125;&#125;</code>, <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-neutral-800">&#123;&#123;date&#125;&#125;</code>. Save your template and copy the <strong>Template ID</strong>.
              </li>
              <li>
                Go to <strong>Account Pin</strong> / <strong>API Keys</strong> &rarr; copy the <strong>Public Key</strong>.
              </li>
              <li>
                Paste these three values on the left form and click save. From that moment, any client booking a dress will immediately trigger a mail that lands in your inbox and points directly to their WhatsApp reservation!
              </li>
            </ol>
            <p className="text-[10px] text-amber-800 font-semibold bg-amber-100/60 p-2.5 rounded-lg border border-gold/15">
              💡 <strong>Instant Success Guard</strong>: Booking requests also trigger an automatic WhatsApp Chat immediately so you never miss an ethnic reservation.
            </p>
          </div>
        </div>

      </div>

      {/* BOOKINGS MANAGER DATABASE PANEL */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm text-left space-y-6">
        <div className="border-b pb-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-maroon/5 flex items-center justify-center text-maroon border border-gold/30">
              <ClipboardList className="w-4.5 h-4.5 text-maroon" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-neutral-950 text-sm uppercase tracking-wider">Bookings Received Logs</h2>
              <p className="text-[10px] text-neutral-400">View customer requests, dates, fitted tailoring sizes & initiate contact</p>
            </div>
          </div>
          <span className="bg-maroon text-white font-sans font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
            Total Recieved: {bookings.length} reservations
          </span>
        </div>

        {bookings.length === 0 ? (
          <div className="border border-dashed border-neutral-200 rounded-xl p-12 text-center text-neutral-400 max-w-lg mx-auto space-y-3">
            <FileText className="w-12 h-12 text-neutral-300 mx-auto" />
            <h4 className="font-semibold text-neutral-800 text-xs uppercase tracking-wider">No Active Booking Records yet</h4>
            <p className="text-[11px] text-neutral-400">
              When a boutique customer checkouts or requests a dress booking from the catalog, the reservation details will compile and save down here in real-time.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border rounded-xl divide-y">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-neutral-50 text-neutral-500 font-bold uppercase text-[9px] border-b">
                  <th className="p-3">Customer Profile</th>
                  <th className="p-3">Outfit Detail</th>
                  <th className="p-3">Scheduled Dates / Size</th>
                  <th className="p-3">Address & Delivery</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-xs font-medium">
                {bookings.map((book) => {
                  return (
                    <tr key={book.id} className="hover:bg-neutral-50/50 transition">
                      <td className="p-3 space-y-1 text-left">
                        <div className="font-bold text-neutral-950 leading-snug">{book.customerName}</div>
                        <div className="text-[10px] text-neutral-500 font-semibold font-mono">
                          Mobile: <a href={`tel:${book.mobile}`} className="hover:underline text-blue-600">{book.mobile}</a>
                        </div>
                        {book.email && (
                          <div className="text-[10px] text-neutral-400 font-mono line-clamp-1">
                            {book.email}
                          </div>
                        )}
                        <span className="inline-block mt-1 font-mono text-[9px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-400 font-normal">
                          Created: {new Date(book.createdAt).toLocaleDateString()} at {new Date(book.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </td>
                      <td className="p-3 text-left space-y-1 text-nowrap">
                        <div className="font-bold text-neutral-800 font-display line-clamp-1">{book.outfitName}</div>
                        <div className="text-[10px] text-neutral-400 font-mono">ID: {book.outfitId}</div>
                        <div className="text-[11px] font-semibold">
                          Price: <span className="text-maroon">₹{book.price}</span> • Deposit: <span className="text-neutral-500">₹{book.deposit}</span>
                        </div>
                      </td>
                      <td className="p-3 text-left space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-amber-50 text-neutral-800 border border-[#D4AF37]/20 font-bold text-[10px]">
                          <Calendar className="w-3.5 h-3.5 text-neutral-700 font-semibold" />
                          <span>{book.date}</span>
                        </div>
                        <div className="text-[10px] text-neutral-600 mt-1">
                          Duration: <strong className="text-neutral-800">{book.duration} Days</strong>
                        </div>
                        <div>
                          Tailor Outfit Size: <span className="font-bold bg-maroon text-white text-[9px] px-1.5 py-0.5 rounded">{book.size}</span>
                        </div>
                      </td>
                      <td className="p-3 text-left space-y-1">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-neutral-800 border border-[#D4AF37]/35">
                          {book.pickupOption === "delivery" ? "Doorstep Delivery" : "Self Boutique Pickup"}
                        </span>
                        <p className="text-[10px] text-neutral-500 leading-normal max-w-xs mt-1">
                          <strong>Address:</strong> {book.address}
                        </p>
                        {book.message && book.message !== "No special requests" && (
                          <div className="text-[9px] italic text-[#800020] bg-neutral-50 p-1.5 rounded border border-neutral-100 max-w-xs leading-normal">
                            &ldquo;{book.message}&rdquo;
                          </div>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex flex-col sm:flex-row justify-end items-stretch gap-1.5">
                          <a
                            href={`https://wa.me/${book.whatsapp.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1 shrink-0 px-2.5 py-1.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-[10px] font-bold uppercase rounded-lg shadow-xs transition"
                          >
                            WhatsApp Chat
                          </a>
                          <button
                            onClick={() => {
                              if (window.confirm(`Do you want to permanently delete the reservation of "${book.customerName}"?`)) {
                                const updated = bookings.filter((b) => b.id !== book.id);
                                onUpdateBookings(updated);
                                triggerAdminToast(`Booking of customer "${book.customerName}" has been removed.`);
                              }
                            }}
                            className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border hover:border-red-200 rounded-lg text-[10px] font-bold uppercase transition"
                            title="Remove booking record"
                          >
                            <Trash className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
