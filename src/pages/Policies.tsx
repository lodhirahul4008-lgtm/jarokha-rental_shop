import React, { useState, useEffect } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import { FileText, ShieldAlert, Ban, Eye, Sparkles } from "lucide-react";

export default function Policies() {
  const { docId } = useParams<{ docId: string }>();
  const [activeTab, setActiveTab] = useState<string>("terms");

  // Sync state with URL parameter if navigated
  useEffect(() => {
    if (docId) {
      setActiveTab(docId);
    }
  }, [docId]);

  const tabs = [
    { id: "terms", label: "Rental Terms", icon: FileText },
    { id: "damage", label: "Damage Policy", icon: ShieldAlert },
    { id: "cancellation", label: "Cancellation & Returns", icon: Ban },
    { id: "privacy", label: "Privacy Policy", icon: Eye },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left">
      {/* Title */}
      <div className="text-center mb-10 text-neutral-800">
        <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs">Agreement Store</span>
        <h1 className="text-3xl font-extrabold font-display leading-tight mt-1">Our Policies & Agreements</h1>
        <p className="text-neutral-500 text-xs mt-1">Transparent budget guidelines helping you dress with confidence</p>
        <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-3" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: ACTIVE SELECT TABS (COLS: 4) */}
        <div className="md:col-span-4 bg-white rounded-xl border border-gold/15 p-4.5 shadow-xs space-y-1.5 self-stretch md:self-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-3 transition-all text-left ${
                  isActive
                    ? "bg-maroon text-[#FAF7F2] shadow-md border-transparent"
                    : "text-neutral-600 hover:bg-neutral-50 border border-transparent"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}

          <div className="border-t border-neutral-100 pt-3.5 mt-3.5 text-[10px] text-neutral-400 leading-normal px-2 space-y-1">
            <span className="font-bold text-neutral-600">Need specific customized terms?</span>
            <p>Our leasing agreements conform to Indian rental regulations regarding clothing sanitation.</p>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE TERMS RICH DISPLAY TYPE (COLS: 8) */}
        <div className="md:col-span-8 bg-white rounded-2xl border border-neutral-150 p-6 md:p-8 shadow-xs text-xs text-neutral-600 leading-relaxed space-y-6">
          
          {activeTab === "terms" && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-xl text-neutral-800 flex items-center gap-2 border-b border-neutral-100 pb-3">
                <FileText className="w-5.5 h-5.5 text-maroon" /> Rental Standard Terms & Conditions
              </h2>
              
              <p className="font-semibold text-neutral-700">1. Rent Ownership Bounds</p>
              <p>
                All designer outfits, kurtas, lehengas, accessories, and sarees listed on Jharokha Ethnic Wear remain the sole property of our parent label. Renting grants the temporary right to wear the specified piece for your confirmed event dates only.
              </p>

              <p className="font-semibold text-neutral-700">2. Dry Cleaning & Stain Hygiene</p>
              <p>
                We handle 100% of the dry cleaning, hygiene sanitization, and fabric pressing before and after your booking lease. Renters are strictly forbidden from hand washing, subverting to domestic machine cleaners, or taking the fabrics to unauthorized local laundries.
              </p>

              <p className="font-semibold text-neutral-700">3. Custom Sizing & Alterations</p>
              <p>
                Minor size adjustments (length, bust, sleeve alignments) are provided complimentary by our boutique tailors. Making individual unannounced sewing modifications, cuts, or safety safety staple insertions violates our agreement terms.
              </p>

              <div className="p-3 bg-amber-50 rounded-lg flex items-start gap-2.5 text-neutral-700 border-l-4 border-gold">
                <Sparkles className="w-4.5 h-4.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <p className="text-[11px]">
                  <strong>Flawless return:</strong> Outfits must be packed securely in our customized courier cases and ready for dispatch within the confirmed duration limits.
                </p>
              </div>
            </div>
          )}

          {activeTab === "damage" && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-xl text-[#2A2A2A] flex items-center gap-2 border-b border-neutral-100 pb-3">
                <ShieldAlert className="w-5.5 h-5.5 text-maroon" /> Security Deposit & Damage Policy
              </h2>
              
              <p className="font-semibold text-neutral-700">1. Raw Refundable Security Deposits</p>
              <p>
                A raw security deposit (specified for each outfit catalog card) is charged separately post-date approvals before dispatches occur. This serves as insurance to protect our luxury fabrics.
              </p>

              <p className="font-semibold text-neutral-700">2. Covered Minor Dirt Wear</p>
              <p>
                We fully expect minor dust, light makeup stains along inner collars, or tiny bead displacement from wedding dancing loops. These are completely covered by our standard maintenance policies and carry zero penalty fees.
              </p>

              <p className="font-semibold text-neutral-700">3. Excluded Major Severe Damages</p>
              <p>
                Severe damages including deep fabric tear cuts, burn marks (e.g. from fireworks or hot ironings), permanent grease stains, or loss of accessory items (necklaces, belts, matching dupattas) are excluded. Repair or replacement cost brackets will be deducted from your security deposit post expert assessment.
              </p>

              <div className="p-3 bg-rose-50 rounded-lg text-rose-800 border-l-4 border-red-500 leading-normal">
                <p className="font-bold text-[11px]">Loss Arrangement Note:</p>
                <p className="text-[10px] text-neutral-600 mt-1">In rare cases where an outfit is returned completely ruined or lost, the renter is liable to cover recovery fees up to the full market price valuation of the dress design.</p>
              </div>
            </div>
          )}

          {activeTab === "cancellation" && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-xl text-neutral-800 flex items-center gap-2 border-b border-neutral-100 pb-3">
                <Ban className="w-5.5 h-5.5 text-maroon" /> Cancellation & Return Guidelines
              </h2>
              
              <p className="font-semibold text-neutral-700">1. Date Cancel Windows</p>
              <p>
                We understand festive dates or family functions change unexpectedly. Enjoy full 100% catalog credit refunds for cancellations filed at least 15 days before your scheduled dispatch block. Cancellations filed within 14-7 days of dispatch attract a 25% scheduling fee.
              </p>

              <p className="font-semibold text-neutral-700">2. Free Date Rescheduling</p>
              <p>
                If your event is postponed, we permit shifting the booking date for free (subject to outfit catalog slot availability on your new requested dates).
              </p>

              <p className="font-semibold text-neutral-700">3. Return Delay Charges</p>
              <p>
                Late returns hold consequences for other waiting clients. A late fee equivalent to 35% of the daily rent fee is charged for each delayed day beyond the booked duration limits, unless dry-runs are extended beforehand on WhatsApp.
              </p>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-xl text-neutral-800 flex items-center gap-2 border-b border-neutral-100 pb-3">
                <Eye className="w-5.5 h-5.5 text-maroon" /> Personal Privacy Policy
              </h2>
              
              <p className="font-semibold text-neutral-700">1. Data Collection Bounds</p>
              <p>
                We capture your full name, location address, contact mobile, and email exclusively to process fit tailoring and arrange doorstep transport couriers.
              </p>

              <p className="font-semibold text-neutral-700">2. Security Handling Guidelines</p>
              <p>
                We respect your personal privacy. We never share or sell physical fit records, transaction values, or contact details to third-party ad networks. All database records are strictly persistent internally inside your local device or our secure administration cloud.
              </p>

              <p className="font-semibold text-neutral-700">3. WhatsApp Sharing & Consents</p>
              <p>
                Inquiries and order confirmations are routed using standard WhatsApp wa.me secure end-to-end lines. Your mobile coordinates are only referenced during the checkout process flow.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
export type { Policies };
