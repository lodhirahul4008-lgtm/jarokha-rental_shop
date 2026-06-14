import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Search, RotateCcw, X, Grid, List, Tag, Eye } from "lucide-react";
import { PRODUCTS, Product } from "../data/products";
import { CONFIG } from "../config";
import ProductCard from "../components/ProductCard";

interface CollectionProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: Product[];
}

export default function Collection({
  products,
  onQuickView,
  onToggleWishlist,
  wishlist,
}: CollectionProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSize, setSelectedSize] = useState<string>("All");
  const [selectedBudget, setSelectedBudget] = useState<string>("All");
  const [selectedOccasion, setSelectedOccasion] = useState<string>("All");
  const [selectedColor, setSelectedColor] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("featured");

  // Read URL params initially
  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) {
      setSelectedCategory(catParam);
    } else {
      setSelectedCategory("All");
    }
  }, [searchParams]);

  // Unique Colors list from our database
  const colorsList = ["All", "Deep Red / Crimson", "Pastel Rose Pink", "Mustard Yellow", "Emerald Green", "Midnight Royal Blue", "Wine Maroon / Plum", "Mint Green / Sage", "Gold & Emerald Green beads"];

  // Unique Occasions list from our DB
  const occasionsList = ["All", "Wedding", "Haldi", "Mehendi", "Sangeet", "Reception", "Party", "Festival"];

  // Categories list from our DB exactly matching the catalog
  const categoriesList = [
    "All",
    "Bridal Lehengas",
    "Reception & Wedding Lehengas",
    "Partywear Outfits & Dresses",
    "Silk & Banarasi Sarees",
    "Mehendi & Festive Gowns",
    "Indo-western Dhoti Sets",
    "Accessories"
  ];

  // Budget Options
  const budgetOptions = [
    { value: "All", label: "All Prices" },
    { value: "under-1000", label: "Under ₹999" },
    { value: "1000-1999", label: "₹1,000 - ₹1,999" },
    { value: "2000-4999", label: "₹2,000 - ₹4,999" },
    { value: "5000-plus", label: "₹5,000+" },
  ];

  // Reset Filters trigger
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedSize("All");
    setSelectedBudget("All");
    setSelectedOccasion("All");
    setSelectedColor("All");
    setSortBy("featured");
    setSearchParams({});
  };

  // Filter Logic execution
  const filteredProducts = products.filter((product) => {
    // 1. Search Query Check (Name, Fabric, Work, Color)
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.work.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.color.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Category Check
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

    // 3. Size Check
    const matchesSize = selectedSize === "All" || product.sizes.includes(selectedSize as any);

    // 4. Occasion Check
    const matchesOccasion =
      selectedOccasion === "All" || product.occasion.includes(selectedOccasion as any);

    // 5. Color Check
    const matchesColor = selectedColor === "All" || product.color === selectedColor;

    // 6. Budget Check
    let matchesBudget = true;
    if (selectedBudget !== "All") {
      const price = product.price;
      if (selectedBudget === "under-1000") {
        matchesBudget = price <= 999;
      } else if (selectedBudget === "1000-1999") {
        matchesBudget = price >= 1000 && price <= 1999;
      } else if (selectedBudget === "2000-4999") {
        matchesBudget = price >= 2000 && price <= 4999;
      } else if (selectedBudget === "5000-plus") {
        matchesBudget = price >= 5000;
      }
    }

    return matchesSearch && matchesCategory && matchesSize && matchesOccasion && matchesColor && matchesBudget;
  });

  // Sort Logic execution
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low-high") {
      return a.price - b.price;
    }
    if (sortBy === "price-high-low") {
      return b.price - a.price;
    }
    if (sortBy === "newest") {
      return b.featured ? 1 : -1; // emulate latest arrival
    }
    // Default featured first
    return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Title & Banner */}
      <div className="text-center mb-10 text-neutral-800">
        <span className="text-gold font-bold tracking-widest uppercase text-xs">Exquisite Showcase</span>
        <h1 className="text-3xl md:text-4xl font-extrabold font-display leading-tight mt-1">Browse Our Collection</h1>
        <p className="text-neutral-500 text-xs md:text-sm max-w-lg mx-auto leading-relaxed mt-2">
          Glow at every wedding, Sangeet and Haldi ritual with our handpicked designer Indian ethnic outfit rental catalog! Sized to perfection.
        </p>
        <div className="w-12 h-0.5 bg-gold mx-auto mt-3.5" />
      </div>

      {/* SEARCH AND SORT TOP CONTROL BAR */}
      <div className="bg-white rounded-xl p-4 border border-[#D4AF37]/15 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between mb-8 text-xs font-medium">
        
        {/* Search Bar */}
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search matching lehengas, silk sarees, kurtis by work, fabrics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-maroon bg-neutral-50 text-xs"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-maroon">
              <X className="w-4.5 h-4.5" />
            </button>
          )}
        </div>

        {/* Action button triggers for Mobile and Desktop sort */}
        <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3 self-stretch">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden flex items-center gap-1.5 px-4 py-2.5 bg-[#FAF7F2] border border-[#D4AF37]/35 rounded-lg text-neutral-700 hover:text-maroon transition self-stretch text-xs uppercase tracking-wider font-semibold"
          >
            <SlidersHorizontal className="w-4 h-4 text-maroon" /> Filters
            {filteredProducts.length !== products.length && (
              <span className="bg-maroon text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-sans">
                !
              </span>
            )}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-neutral-500 whitespace-nowrap">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 border rounded-lg border-neutral-200 focus:outline-none focus:ring-1 focus:ring-maroon py-2 bg-neutral-50"
            >
              <option value="featured">Featured Designer</option>
              <option value="price-low-high">Rent: Low to High</option>
              <option value="price-high-low">Rent: High to Low</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>
        </div>

      </div>

      {/* MAIN LAYOUT: SIDENAV + PRODUCTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* DESKTOP FILTER BAR (COLS: 3) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-white rounded-xl border border-[#D4AF37]/15 p-5 shadow-xs divide-y divide-neutral-100">
            
            <div className="flex items-center justify-between pb-4">
              <h2 className="font-display font-semibold text-neutral-800 flex items-center gap-2 text-sm uppercase tracking-wider">
                <SlidersHorizontal className="w-4.5 h-4.5 text-maroon" /> Catalog Filters
              </h2>
              {(selectedCategory !== "All" ||
                selectedSize !== "All" ||
                selectedBudget !== "All" ||
                selectedOccasion !== "All" ||
                selectedColor !== "All" ||
                searchQuery !== "") && (
                <button
                  onClick={handleResetFilters}
                  className="font-sans text-[10px] text-maroon hover:underline flex items-center gap-1 font-semibold group"
                >
                  <RotateCcw className="w-3.5 h-3.5 transition group-hover:rotate-180 duration-500" /> Reset
                </button>
              )}
            </div>

            {/* Category selection list */}
            <div className="py-4">
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2.5">Category</label>
              <div className="space-y-1.5">
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left text-xs px-2.5 py-1.5 rounded-md transition-colors font-medium flex items-center justify-between ${
                      selectedCategory === cat
                        ? "bg-maroon/5 text-maroon font-bold"
                        : "text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <span className="text-gold">●</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Size standard sizing filters */}
            <div className="py-4">
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2.5">Select Size</label>
              <div className="grid grid-cols-4 gap-1.5">
                {["XS", "S", "M", "L", "XL", "XXL", "Custom"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? "All" : size)}
                    className={`h-8 rounded-md text-xs font-semibold border flex items-center justify-center transition-colors ${
                      selectedSize === size
                        ? "bg-maroon text-amber-50 border-maroon shadow-xs"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-maroon"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {selectedSize !== "All" && (
                <span className="text-[10px] text-[#D4AF37] font-semibold mt-1.5 block">
                  * Filtering outfits tailorable to {selectedSize}.
                </span>
              )}
            </div>

            {/* Budget options range group */}
            <div className="py-4">
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2.5">Budget Class</label>
              <div className="space-y-2">
                {budgetOptions.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 text-xs text-neutral-600 select-none cursor-pointer">
                    <input
                      type="radio"
                      name="budgetRange"
                      checked={selectedBudget === opt.value}
                      onChange={() => setSelectedBudget(opt.value)}
                      className="accent-maroon"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Occasion custom selection filters */}
            <div className="py-4">
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2.5">Occasion Theme</label>
              <div className="space-y-1.5">
                {occasionsList.map((occ) => (
                  <button
                    key={occ}
                    onClick={() => setSelectedOccasion(occ)}
                    className={`w-full text-left text-xs px-2.5 py-1.5 rounded-md transition-colors font-medium flex items-center justify-between ${
                      selectedOccasion === occ
                        ? "bg-maroon/5 text-maroon font-bold"
                        : "text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    <span>{occ === "All" ? "All Occasions" : occ}</span>
                    {selectedOccasion === occ && <span className="text-gold">●</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Color filtration options */}
            <div className="py-4">
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2.5">Color Palette</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full border rounded-lg border-neutral-200 p-2 text-xs bg-neutral-50 focus:outline-none"
              >
                {colorsList.map((col) => (
                  <option key={col} value={col}>
                    {col === "All" ? "All Color Profiles" : col}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </aside>

        {/* PRODUCTS LIST PANEL (COLS: 9) */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Active filter badges display */}
          {(selectedCategory !== "All" ||
            selectedSize !== "All" ||
            selectedBudget !== "All" ||
            selectedOccasion !== "All" ||
            selectedColor !== "All" ||
            searchQuery !== "") && (
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-600 bg-[#FAF7F2] p-3 rounded-xl border border-[#D4AF37]/15">
              <span className="font-semibold text-neutral-700 uppercase text-[9px] tracking-wider mr-1.5">Active Filter Tags:</span>
              
              {selectedCategory !== "All" && (
                <span className="bg-white border rounded-full px-2.5 py-0.5 flex items-center gap-1">
                  <strong>Cat:</strong> {selectedCategory}
                  <X className="w-3 h-3 text-neutral-400 hover:text-maroon cursor-pointer" onClick={() => setSelectedCategory("All")} />
                </span>
              )}
              {selectedSize !== "All" && (
                <span className="bg-white border rounded-full px-2.5 py-0.5 flex items-center gap-1">
                  <strong>Size:</strong> {selectedSize}
                  <X className="w-3 h-3 text-neutral-400 hover:text-maroon cursor-pointer" onClick={() => setSelectedSize("All")} />
                </span>
              )}
              {selectedBudget !== "All" && (
                <span className="bg-white border rounded-full px-2.5 py-0.5 flex items-center gap-1">
                  <strong>Budget:</strong> {budgetOptions.find(b => b.value === selectedBudget)?.label}
                  <X className="w-3 h-3 text-neutral-400 hover:text-maroon cursor-pointer" onClick={() => setSelectedBudget("All")} />
                </span>
              )}
              {selectedOccasion !== "All" && (
                <span className="bg-white border rounded-full px-2.5 py-0.5 flex items-center gap-1">
                  <strong>Occasion:</strong> {selectedOccasion}
                  <X className="w-3 h-3 text-neutral-400 hover:text-maroon cursor-pointer" onClick={() => setSelectedOccasion("All")} />
                </span>
              )}
              {selectedColor !== "All" && (
                <span className="bg-white border rounded-full px-2.5 py-0.5 flex items-center gap-1">
                  <strong>Color:</strong> {selectedColor}
                  <X className="w-3 h-3 text-neutral-400 hover:text-maroon cursor-pointer" onClick={() => setSelectedColor("All")} />
                </span>
              )}
              {searchQuery !== "" && (
                <span className="bg-white border rounded-full px-2.5 py-0.5 flex items-center gap-1">
                  <strong>Query:</strong> {searchQuery}
                  <X className="w-3 h-3 text-neutral-400 hover:text-maroon cursor-pointer" onClick={() => setSearchQuery("")} />
                </span>
              )}
            </div>
          )}

          {/* Core products layout list view */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={wishlist.some((item) => item.id === product.id)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-neutral-100 p-12 text-center space-y-4">
              <span className="text-4xl text-neutral-300 block">🛍️</span>
              <h3 className="font-display font-semibold text-lg text-neutral-800">
                No matching outfits found
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                We couldn't locate any custom traditional outfits matching your active filter choices. Try widening your criteria bounds or reset filter settings.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-maroon hover:bg-[#6c0217] text-white py-2 px-5 text-xs font-semibold rounded-lg uppercase tracking-wider transition"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* MOBILE FLOATING FILTER DRAWER POPUP */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end bg-black/50 backdrop-blur-xs">
          <div className="w-80 max-w-full bg-white h-full flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              <div className="flex justify-between items-center pb-4 border-b">
                <h3 className="font-display font-bold text-sm text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                  <SlidersHorizontal className="w-4.5 h-4.5 text-maroon" /> Catalog Filters
                </h3>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X className="w-5 h-5 text-neutral-500 hover:text-maroon" />
                </button>
              </div>

              {/* Mobile Categories selection */}
              <div className="py-4 border-b">
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                  }}
                  className="w-full border rounded-lg border-neutral-200 p-2 text-xs bg-neutral-50 focus:outline-none"
                >
                  {categoriesList.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mobile Sizes selection */}
              <div className="py-4 border-b">
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">Sizes Available</label>
                <div className="flex flex-wrap gap-1.5">
                  {["XS", "S", "M", "L", "XL", "XXL", "Custom"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(selectedSize === size ? "All" : size)}
                      className={`h-8 px-3 rounded-md text-xs font-semibold border flex items-center justify-center transition-colors ${
                        selectedSize === size
                          ? "bg-maroon text-amber-50 border-maroon font-bold"
                          : "bg-white text-neutral-700 border-neutral-200 hover:border-maroon"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Budget selection */}
              <div className="py-4 border-b">
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">Budget Target</label>
                <div className="space-y-1.5">
                  {budgetOptions.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 text-xs text-neutral-600 select-none cursor-pointer">
                      <input
                        type="radio"
                        name="mobileBudget"
                        checked={selectedBudget === opt.value}
                        onChange={() => setSelectedBudget(opt.value)}
                        className="accent-maroon"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile Occasions selection */}
              <div className="py-4 border-b">
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">Occasions suitable</label>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="w-full border rounded-lg border-[#D4AF37]/20 p-2 text-xs bg-neutral-50"
                >
                  {occasionsList.map((oc) => (
                    <option key={oc} value={oc}>
                      {oc === "All" ? "All Occasions" : oc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mobile colors selector */}
              <div className="py-4">
                <label className="block text-xs font-bold text-[#2A2A2A] uppercase tracking-wider mb-2">Color selection</label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full border rounded-lg border-neutral-200 p-2 text-xs bg-neutral-50"
                >
                  {colorsList.map((col) => (
                    <option key={col} value={col}>
                      {col === "All" ? "All Colors" : col}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            <div className="pt-4 border-t space-y-2">
              <button
                onClick={handleResetFilters}
                className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold py-2.5 rounded-lg uppercase tracking-wider transition"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full bg-maroon hover:bg-[#6c0217] text-[#FAF7F2] text-xs font-bold py-2.5 rounded-lg uppercase tracking-wider transition shadow-md"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
