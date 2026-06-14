import React from "react";

interface JharokhaLogoProps {
  variant?: "full" | "icon" | "simple-text" | "horizontal";
  size?: number; // width in pixels
  className?: string;
  textColorClass?: string; // e.g. text-neutral-800 or text-white
}

export default function JharokhaLogo({
  variant = "full",
  size = 180,
  className = "",
  textColorClass = "text-neutral-800",
}: JharokhaLogoProps) {
  // Common visual variables
  const primaryGold = "#D4AF37";
  const lightGold = "#F3E5AB";
  const darkGold = "#AA7C11";

  // Streamlined icon variant (perfect for the Navbar and mobile headers)
  if (variant === "icon") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block ${className}`}
        aria-label="Jharokha Logo Icon"
      >
        <defs>
          <linearGradient id="goldGradientIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={lightGold} />
            <stop offset="50%" stopColor={primaryGold} />
            <stop offset="100%" stopColor={darkGold} />
          </linearGradient>
          <radialGradient id="lampGlowIcon" cx="50%" cy="28%" r="15%">
            <stop offset="0%" stopColor="#FFF3CC" stopOpacity="1" />
            <stop offset="50%" stopColor={primaryGold} stopOpacity="0.5" />
            <stop offset="100%" stopColor={primaryGold} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Circular background */}
        <circle cx="50" cy="50" r="48" fill="#111111" stroke="url(#goldGradientIcon)" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="44" fill="none" stroke="url(#goldGradientIcon)" strokeWidth="0.5" strokeDasharray="1.5 1" />

        {/* Lamp Glow */}
        <circle cx="50" cy="28%" r="12" fill="url(#lampGlowIcon)" />

        {/* Jharokha Arch Window Frame */}
        {/* Left Column */}
        <rect x="33" y="32" width="2" height="18" rx="0.5" fill="url(#goldGradientIcon)" />
        <rect x="32" y="50" width="4" height="1.5" fill="url(#goldGradientIcon)" />
        <circle cx="34" cy="31" r="1.2" fill="url(#goldGradientIcon)" />
        {/* Right Column */}
        <rect x="65" y="32" width="2" height="18" rx="0.5" fill="url(#goldGradientIcon)" />
        <rect x="64" y="50" width="4" height="1.5" fill="url(#goldGradientIcon)" />
        <circle cx="66" cy="31" r="1.2" fill="url(#goldGradientIcon)" />

        {/* Balustrade railing at the bottom */}
        <rect x="30" y="51.5" width="40" height="2" fill="url(#goldGradientIcon)" />
        <path d="M 33 53.5 L 33 56.5 M 37 53.5 L 37 56.5 M 41 53.5 L 41 56.5 M 45 53.5 L 45 56.5 M 49 53.5 L 49 56.5 M 53 53.5 L 53 56.5 M 57 53.5 L 57 56.5 M 61 53.5 L 61 56.5 M 65 53.5 L 65 56.5 M 67 53.5 L 67 56.5" stroke="url(#goldGradientIcon)" strokeWidth="0.75" />
        <rect x="32" y="56.5" width="36" height="1.5" fill="url(#goldGradientIcon)" />

        {/* Arch top shape (elegant Mughal double curved arch) */}
        <path
          d="M 33 32 
             C 33 26, 38 24, 43 23 
             C 45 22.5, 47 21, 50 16 
             C 53 21, 55 22.5, 57 23 
             C 62 24, 67 26, 67 32 
             Z"
          fill="none"
          stroke="url(#goldGradientIcon)"
          strokeWidth="1.5"
        />
        {/* Inner arch trim */}
        <path
          d="M 35 32 
             C 35 28, 39 26, 44 25.2 
             C 46 25, 48 23, 50 19 
             C 52 23, 54 25, 56 25.2 
             C 61 26, 65 28, 65 32"
          fill="none"
          stroke="url(#goldGradientIcon)"
          strokeWidth="0.5"
        />

        {/* Hanging Lantern */}
        <line x1="50" y1="18" x2="50" y2="24" stroke="url(#goldGradientIcon)" strokeWidth="0.5" />
        <path d="M 48.5 24 L 51.5 24 L 52 27 L 50 29 M 50 29 L 48 27 L 48.5 24" fill="url(#goldGradientIcon)" />
        <circle cx="50" cy="27" r="1" fill="#FFF3CC" />

        {/* Letter Monogram "J" in center of arch */}
        <text
          x="49"
          y="44"
          fontStyle="italic"
          fontWeight="bold"
          fontSize="14"
          fontFamily="'Playfair Display', serif"
          fill="url(#goldGradientIcon)"
          textAnchor="middle"
        >
          J
        </text>

        {/* Miniature Wedding Gown Hanging on the Right */}
        <g transform="translate(68, 14) scale(0.24)">
          {/* Hanger */}
          <path d="M 15 15 C 15 10, 20 8, 22 13 C 24 16, 27 15, 30 15 L 10 25 Z" stroke="url(#goldGradientIcon)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Gown Bodice */}
          <path d="M 16 23 L 24 23 L 26 35 L 14 35 Z" fill="url(#goldGradientIcon)" />
          {/* Waist / Belt */}
          <rect x="13.5" y="34.5" width="13" height="1.5" fill="#FAF7F2" opacity="0.8" />
          {/* Flowing Skirt */}
          <path d="M 14 36 L 5 75 C 6 78, 15 80, 20 80 C 25 80, 34 78, 35 75 L 26 36 Z" fill="url(#goldGradientIcon)" />
          {/* Gown pleats/details */}
          <path d="M 16 36 L 10 77 M 20 36 L 20 79 M 24 36 L 30 77" stroke="#333" opacity="0.3" strokeWidth="0.75" />
          <path d="M 13 45 C 16 48, 24 48, 27 45 M 10 58 C 15 62, 25 62, 30 58" stroke="#FFF3CC" opacity="0.25" strokeWidth="1" fill="none" />
          {/* Dupatta drape */}
          <path d="M 13 25 C 9 32, 2 45, 1 60 C 0 71, 4 75, 4 75 C 4 75, 8 68, 9 55 C 10 42, 16 30, 16 30" fill="#FFF" opacity="0.4" />
        </g>

        {/* Elegant floral scroll ornament on the left */}
        <path d="M 15 28 C 15 22, 19 18, 24 18 C 21 21, 18 24, 18 28 M 18 28 C 18 34, 25 35, 23 42 C 21 46, 17 44, 16 40" stroke="url(#goldGradientIcon)" strokeWidth="0.5" strokeLinecap="round" fill="none" />
        <circle cx="21" cy="20" r="0.75" fill="url(#goldGradientIcon)" />
        <circle cx="24" cy="18" r="0.75" fill="url(#goldGradientIcon)" />
        <circle cx="23" cy="38" r="0.75" fill="url(#goldGradientIcon)" />
      </svg>
    );
  }

  // Horizontal Compact Logo layout for navbar text headers
  if (variant === "horizontal") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <JharokhaLogo variant="icon" size={size > 140 ? 50 : 40} />
        <div className="flex flex-col text-left">
          <span className={`font-serif text-lg md:text-xl font-extrabold tracking-wider ${textColorClass} leading-none`}>
            JHAROKHA
          </span>
          <span className="font-sans text-[9px] tracking-widest text-[#D4AF37] uppercase font-bold mt-1">
            Ethnic Wear & Rentals
          </span>
        </div>
      </div>
    );
  }

  // Text representation in full luxury elegance
  if (variant === "simple-text") {
    return (
      <div className={`text-center space-y-1 ${className}`}>
        <span className={`block font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-widest ${textColorClass}`}>
          JHAROKHA
        </span>
        <span className="block text-gold font-sans text-xs md:text-sm tracking-[0.25em] font-bold uppercase">
          ✦ Premium Ethnic Dress Rental Boutique ✦
        </span>
      </div>
    );
  }

  // The Masterpiece: Full-scale Circular Luxury Logo (matches exact uploaded style!)
  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center bg-transparent ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        <defs>
          {/* Metallic Gold Gradients */}
          <linearGradient id="goldGradientMain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF3CC" />
            <stop offset="25%" stopColor="#E6C665" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="75%" stopColor="#B38F24" />
            <stop offset="100%" stopColor="#7F600D" />
          </linearGradient>
          
          <linearGradient id="goldLightGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8A640F" />
            <stop offset="50%" stopColor="#F9E8A2" />
            <stop offset="100%" stopColor="#B58F2A" />
          </linearGradient>

          {/* Deep dark Radial background representing a gorgeous premium velvet black */}
          <radialGradient id="darkBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E1E1E" />
            <stop offset="70%" stopColor="#0B0B0B" />
            <stop offset="100%" stopColor="#020202" />
          </radialGradient>

          {/* Glowing lamp filter effect */}
          <radialGradient id="lanternGlow" cx="50%" cy="31%" r="18%">
            <stop offset="0%" stopColor="#FFEEB3" stopOpacity="1" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>

          {/* Gold Shimmer Filter */}
          <filter id="goldShine" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComponentTransfer in="blur" result="glow">
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Main outer solid dark circular badge */}
        <circle cx="250" cy="250" r="240" fill="url(#darkBg)" />

        {/* 2. Double outer golden decorative rings */}
        <circle cx="250" cy="250" r="236" stroke="url(#goldGradientMain)" strokeWidth="3" />
        <circle cx="250" cy="250" r="228" stroke="url(#goldGradientMain)" strokeWidth="0.75" strokeDasharray="3 2" />
        <circle cx="250" cy="250" r="222" stroke="url(#goldGradientMain)" strokeWidth="1.5" />

        {/* Decorative corner florals on left side inside the border */}
        <g filter="url(#goldShine)">
          <path
            d="M 50 250 C 42 165, 100 90, 185 64"
            stroke="url(#goldGradientMain)"
            strokeWidth="1.25"
            fill="none"
          />
          {/* Detailed golden vine flourishes */}
          <path d="M 64 190 C 72 170, 84 150, 104 135 C 91 143, 80 156, 73 172" stroke="url(#goldGradientMain)" strokeWidth="1.0" fill="none" />
          <path d="M 85 145 C 95 125, 120 110, 150 102" stroke="url(#goldGradientMain)" strokeWidth="1.0" fill="none" />
          
          {/* Little flowers & dots */}
          <circle cx="104" cy="135" r="3" fill="url(#goldGradientMain)" />
          <circle cx="150" cy="102" r="3" fill="url(#goldGradientMain)" />
          <circle cx="112" cy="190" r="2" fill="url(#goldGradientMain)" />
          <circle cx="75" cy="115" r="2" fill="url(#goldGradientMain)" />
          
          <path d="M 80 200 C 95 210, 110 200, 120 220" stroke="url(#goldGradientMain)" strokeWidth="0.75" fill="none" />
          {/* Purple flower accent (seen in the image prompt logo) */}
          <path d="M 112 187 L 115 190 L 112 193 L 109 190 Z" fill="#8A2BE2" />
          <path d="M 75 112 L 78 115 L 75 118 L 72 115 Z" fill="#8A2BE2" />
        </g>

        {/* Decorative floral accents bottom right */}
        <g filter="url(#goldShine)">
          <path
            d="M 450 250 C 458 335, 400 410, 315 436"
            stroke="url(#goldGradientMain)"
            strokeWidth="1.25"
            fill="none"
          />
          <circle cx="430" cy="330" r="2.5" fill="url(#goldGradientMain)" />
          <circle cx="390" cy="400" r="2.5" fill="url(#goldGradientMain)" />
        </g>

        {/* 3. Central Jharokha Mughal Arch (Temple/Window structure) */}
        {/* Ambient Lantern Glow */}
        <circle cx="250" cy="155" r="50" fill="url(#lanternGlow)" />

        <g id="JharokhaArch" filter="url(#goldShine)">
          {/* Main Pillars Left & Right */}
          {/* Left Column base */}
          <rect x="180" y="222" width="20" height="8" rx="1" fill="url(#goldGradientMain)" />
          <rect x="183" y="152" width="14" height="70" rx="0.5" fill="url(#goldGradientMain)" />
          <path d="M 180 152 L 200 152 L 197 145 L 183 145 Z" fill="url(#goldGradientMain)" />
          {/* Left pillar design details */}
          <line x1="190" y1="156" x2="190" y2="218" stroke="#333" opacity="0.3" strokeWidth="1" />
          
          {/* Right Column base */}
          <rect x="300" y="222" width="20" height="8" rx="1" fill="url(#goldGradientMain)" />
          <rect x="303" y="152" width="14" height="70" rx="0.5" fill="url(#goldGradientMain)" />
          <path d="M 300 152 L 320 152 L 317 145 L 303 145 Z" fill="url(#goldGradientMain)" />
          {/* Right pillar design details */}
          <line x1="310" y1="156" x2="310" y2="218" stroke="#333" opacity="0.3" strokeWidth="1" />

          {/* Arch Dome Top Frame */}
          <path
            d="M 183 145 
               C 183 110, 203 100, 225 96 
               C 232 95, 238 85, 250 60 
               C 262 85, 268 95, 275 96 
               C 297 100, 317 110, 317 145 
               Z"
            fill="none"
            stroke="url(#goldGradientMain)"
            strokeWidth="5"
          />
          {/* Arch Dome Top inner detail scalloped look */}
          <path
            d="M 191 145 
               C 191 118, 208 110, 226 107
               C 232 106, 240 98, 250 78
               C 260 98, 268 106, 274 107
               C 292 110, 309 118, 309 145"
            fill="none"
            stroke="url(#goldLightGrad)"
            strokeWidth="1.5"
          />

          {/* Little finial spike ornament on very tip of dome */}
          <path d="M 250 60 L 250 48 M 248 52 C 248 50, 252 50, 252 52 Z" stroke="url(#goldGradientMain)" strokeWidth="2.5" />
          <circle cx="250" cy="45" r="3" fill="url(#goldGradientMain)" />

          {/* Grid pattern mesh inside the arch window background */}
          <path
            d="M 200 120 L 300 120 M 200 135 L 300 135 M 200 150 L 300 150 M 200 165 L 300 165 M 200 180 L 300 180 M 200 195 L 300 195 M 200 210 L 300 210
               M 210 110 L 210 220 M 225 106 L 225 220 M 240 102 L 240 220 M 255 102 L 255 220 M 270 106 L 270 220 M 285 110 L 285 220 M 290 110 L 290 220"
            stroke="url(#goldGradientMain)"
            strokeWidth="0.5"
            strokeOpacity="0.15"
          />

          {/* Hanging Oil Lantern Lamp */}
          <line x1="250" y1="80" x2="250" y2="120" stroke="url(#goldGradientMain)" strokeWidth="1.5" />
          <path
            d="M 244 120 H 256 L 259 135 L 250 148 L 241 135 Z"
            fill="url(#goldGradientMain)"
            stroke="url(#goldLightGrad)"
            strokeWidth="1"
          />
          <circle cx="250" cy="135" r="4" fill="#FFFFFF" filter="drop-shadow(0px 0px 5px #FFD700)" />

          {/* Balustrade hand railing deck under columns */}
          <rect x="170" y="230" width="160" height="8" rx="1.5" fill="url(#goldGradientMain)" />
          {/* Deck Spindles */}
          <line x1="180" y1="238" x2="180" y2="254" stroke="url(#goldGradientMain)" strokeWidth="2.5" />
          <line x1="195" y1="238" x2="195" y2="254" stroke="url(#goldGradientMain)" strokeWidth="2.5" />
          <line x1="210" y1="238" x2="210" y2="254" stroke="url(#goldGradientMain)" strokeWidth="2.5" />
          <line x1="225" y1="238" x2="225" y2="254" stroke="url(#goldGradientMain)" strokeWidth="2.5" />
          <line x1="240" y1="238" x2="240" y2="254" stroke="url(#goldGradientMain)" strokeWidth="2.5" />
          <line x1="255" y1="238" x2="255" y2="254" stroke="url(#goldGradientMain)" strokeWidth="2.5" />
          <line x1="270" y1="238" x2="270" y2="254" stroke="url(#goldGradientMain)" strokeWidth="2.5" />
          <line x1="285" y1="238" x2="285" y2="254" stroke="url(#goldGradientMain)" strokeWidth="2.5" />
          <line x1="300" y1="238" x2="300" y2="254" stroke="url(#goldGradientMain)" strokeWidth="2.5" />
          <line x1="320" y1="238" x2="320" y2="254" stroke="url(#goldGradientMain)" strokeWidth="2.5" />
          {/* Hand Rail Bottom block */}
          <rect x="174" y="254" width="152" height="6" rx="1" fill="url(#goldGradientMain)" />
        </g>

        {/* Elegant Monogram Letter J inside Jharokha window */}
        <g id="CenterLetterJ" filter="url(#goldShine)">
          <text
            x="248"
            y="200"
            fontStyle="italic"
            fontWeight="900"
            fontSize="54"
            fontFamily="'Playfair Display', serif"
            fill="url(#goldGradientMain)"
            textAnchor="middle"
          >
            J
          </text>
        </g>

        {/* 4. Elegant Drapery Gown hanging on the Right of temple (Royal Bridal dress) */}
        <g id="HangingRoyalGown" transform="translate(325, 60)" filter="url(#goldShine)">
          {/* Hanger */}
          <path
            d="M 50 45 C 50 30, 65 30, 70 41 C 72 45, 80 43, 90 43 L 10 75 Z"
            stroke="url(#goldGradientMain)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* Off-white/Cream Silk Bridal Gown with royal gold embroidery */}
          {/* Sleeve Cap Left */}
          <path d="M 25 72 L 15 105 L 30 110 L 35 72 Z" fill="#FBF9F4" />
          <path d="M 15 105 L 30 110" stroke="url(#goldGradientMain)" strokeWidth="2" />
          {/* Sleeve Cap Right */}
          <path d="M 65 72 L 75 105 L 60 110 L 55 72 Z" fill="#FBF9F4" />
          <path d="M 75 105 L 60 110" stroke="url(#goldGradientMain)" strokeWidth="2" />

          {/* Main Bodice */}
          <path d="M 33 72 L 57 72 L 62 110 L 28 110 Z" fill="#FAF6ED" />
          {/* Golden bodice embroidery texture design */}
          <path d="M 45 72 L 45 110 M 36 90 Q 45 100, 54 90" stroke="url(#goldGradientMain)" strokeWidth="1.5" fill="none" opacity="0.6" />

          {/* Waist Band */}
          <rect x="25.5" y="108" width="39" height="5" rx="1" fill="url(#goldGradientMain)" />

          {/* Massive Flare Skirt */}
          <path
            d="M 27 113 
               L 5 235 
               C 8 238, 12 245, 30 248
               C 50 250, 60 252, 75 252
               C 90 252, 105 248, 115 244
               C 120 242, 122 238, 110 235
               L 63 113 
               Z"
            fill="#FAF5E8"
          />
          {/* Golden Flare Trim border hem scroll */}
          <path
            d="M 5 235 
               C 8 240, 30 246, 50 247
               C 70 248, 90 248, 110 241"
            stroke="url(#goldGradientMain)"
            strokeWidth="6"
            fill="none"
          />
          {/* Flow pleats vertical curves */}
          <path d="M 34 113 Q 30 180, 20 244" stroke="#D7CABB" strokeWidth="1.5" fill="none" />
          <path d="M 45 113 Q 50 180, 52 248" stroke="#D7CABB" strokeWidth="2.5" fill="none" />
          <path d="M 56 113 Q 66 180, 85 244" stroke="#D7CABB" strokeWidth="1.5" fill="none" />

          {/* Embroidery floral bootas on skirt */}
          <circle cx="30" cy="150" r="1.5" fill="url(#goldGradientMain)" />
          <circle cx="45" cy="165" r="1.5" fill="url(#goldGradientMain)" />
          <circle cx="65" cy="150" r="1.5" fill="url(#goldGradientMain)" />
          <circle cx="20" cy="200" r="1.5" fill="url(#goldGradientMain)" />
          <circle cx="50" cy="210" r="2.5" fill="url(#goldGradientMain)" />
          <circle cx="85" cy="200" r="1.5" fill="url(#goldGradientMain)" />

          {/* Air-flow Organza sheer Dupatta draping around the dress */}
          <path
            d="M 60 80 
               C 85 90, 115 130, 125 180 
               C 135 220, 126 248, 124 246 
               C 114 244, 98 220, 94 170
               C 90 120, 60 90, 60 80"
            fill="url(#goldLightGrad)"
            opacity="0.32"
          />
          <path d="M 60 80 C 85 90, 115 130, 125 180 C 135 220, 126 248, 124 246" stroke="url(#goldGradientMain)" strokeWidth="1" fill="none" opacity="0.5" />
        </g>

        {/* 5. Majestic Typography "Jharokha" in large gold lettering */}
        <g id="TypographyJharokha" filter="url(#goldShine)">
          <text
            x="250"
            y="335"
            fontWeight="bold"
            fontSize="54"
            fontFamily="'Playfair Display', serif"
            fill="url(#goldGradientMain)"
            textAnchor="middle"
            letterSpacing="3"
          >
            Jharokha
          </text>
        </g>

        {/* 6. Subtitle block "ETHNIC WEAR AND RENTAL HOMES" (or "SERVICES") */}
        <g id="TypographySub" filter="url(#goldShine)" transform="translate(0, 350)">
          {/* Subtle floral flourish separators */}
          <path d="M 120 12 L 150 12 M 350 12 L 380 12" stroke="url(#goldGradientMain)" strokeWidth="1" />
          <circle cx="150" cy="12" r="1.5" fill="url(#goldGradientMain)" />
          <circle cx="350" cy="12" r="1.5" fill="url(#goldGradientMain)" />
          <polygon points="250,5 253,12 250,19 247,12" fill="#8A2BE2" />
          <circle cx="235" cy="12" r="1.5" fill="url(#goldGradientMain)" />
          <circle cx="265" cy="12" r="1.5" fill="url(#goldGradientMain)" />

          <text
            x="250"
            y="15"
            fontWeight="bold"
            fontSize="14"
            fontFamily="'Poppins', sans-serif"
            fill="url(#goldGradientMain)"
            textAnchor="middle"
            letterSpacing="5"
          >
            ETHNIC WEAR
          </text>
          <text
            x="250"
            y="33"
            fontWeight="medium"
            fontSize="12"
            fontFamily="'Poppins', sans-serif"
            fill="url(#goldGradientMain)"
            textAnchor="middle"
            letterSpacing="4"
          >
            AND RENTAL SERVICES
          </text>
        </g>

        {/* 7. Beautiful Golden Cartouche Badge for Owners "Amit & Saloni" */}
        <g id="OwnerBadge" filter="url(#goldShine)" transform="translate(0, 400)">
          {/* Frame Cartouche */}
          <rect x="110" y="2" width="280" height="30" rx="6" fill="#141414" stroke="url(#goldGradientMain)" strokeWidth="1" />
          <rect x="114" y="6" width="272" height="22" rx="4" fill="none" stroke="url(#goldGradientMain)" strokeWidth="0.5" strokeDasharray="2 1" />
          
          <text
            x="250"
            y="14"
            fontWeight="semibold"
            fontSize="9"
            fontFamily="'Poppins', sans-serif"
            fill="url(#goldGradientMain)"
            textAnchor="middle"
            letterSpacing="2"
            opacity="0.75"
          >
            OWNERS
          </text>
          
          <text
            x="250"
            y="24"
            fontStyle="italic"
            fontWeight="bold"
            fontSize="11"
            fontFamily="'Playfair Display', serif"
            fill="#FAF7F2"
            textAnchor="middle"
            letterSpacing="1"
          >
            Amit & Saloni
          </text>
          
          {/* Tiny side decorative flowers on cartouche border */}
          <circle cx="110" cy="17" r="3" fill="url(#goldGradientMain)" />
          <circle cx="390" cy="17" r="3" fill="url(#goldGradientMain)" />
        </g>

        {/* 8. Bottom Categories Icons Ribbon block */}
        <g id="BottomCategories" transform="translate(0, 442)" filter="url(#goldShine)">
          {/* Dividing vertical lines and category icons */}
          {/* Icon 1: Lehenga */}
          <g transform="translate(100, 0)">
            <path d="M 12 10 L 2 28 C 4 30, 20 30, 22 28 L 12 10" fill="none" stroke="url(#goldGradientMain)" strokeWidth="1.2" />
            <path d="M 6 18 Q 12 21, 18 18" stroke="url(#goldGradientMain)" strokeWidth="1" fill="none" />
            <text x="12" y="38" fontSize="7" fontFamily="'Poppins', sans-serif" fill="#A89F91" textAnchor="middle" letterSpacing="0.5">LEHENGA</text>
          </g>

          {/* Separator 1 */}
          <line x1="145" y1="12" x2="145" y2="30" stroke="url(#goldGradientMain)" strokeWidth="0.5" opacity="0.4" />

          {/* Icon 2: Salwar Suit */}
          <g transform="translate(162, 0)">
            {/* Suit tunic outline */}
            <path d="M 8 10 H 16 L 20 18 L 17 19 L 15 28 L 9 28 L 7 19 L 4 18 Z" fill="none" stroke="url(#goldGradientMain)" strokeWidth="1.2" />
            <text x="12" y="38" fontSize="7" fontFamily="'Poppins', sans-serif" fill="#A89F91" textAnchor="middle" letterSpacing="0.5">SUITS</text>
          </g>

          {/* Separator 2 */}
          <line x1="208" y1="12" x2="208" y2="30" stroke="url(#goldGradientMain)" strokeWidth="0.5" opacity="0.4" />

          {/* Icon 3: Gown */}
          <g transform="translate(225, 0)">
            {/* Long gown */}
            <path d="M 9 10 H 15 L 18 15 L 13 28 L 11 28 L 6 15 Z" fill="none" stroke="url(#goldGradientMain)" strokeWidth="1.2" />
            <path d="M 11 28 L 5 32 H 19 L 13 28" fill="none" stroke="url(#goldGradientMain)" strokeWidth="1.2" />
            <text x="12" y="38" fontSize="7" fontFamily="'Poppins', sans-serif" fill="#A89F91" textAnchor="middle" letterSpacing="0.5">GOWNS</text>
          </g>

          {/* Separator 3 */}
          <line x1="271" y1="12" x2="271" y2="30" stroke="url(#goldGradientMain)" strokeWidth="0.5" opacity="0.4" />

          {/* Icon 4: Accessories */}
          <g transform="translate(288, 0)">
            {/* Designer handbag/potli */}
            <rect x="5" y="15" width="14" height="11" rx="2" fill="none" stroke="url(#goldGradientMain)" strokeWidth="1.2" />
            <path d="M 8 15 C 8 11, 16 11, 16 15" fill="none" stroke="url(#goldGradientMain)" strokeWidth="1.2" />
            <circle cx="12" cy="20" r="1.5" fill="url(#goldGradientMain)" />
            <text x="12" y="38" fontSize="7" fontFamily="'Poppins', sans-serif" fill="#A89F91" textAnchor="middle" letterSpacing="0.5">JEWELRY</text>
          </g>

          {/* Separator 4 */}
          <line x1="334" y1="12" x2="334" y2="30" stroke="url(#goldGradientMain)" strokeWidth="0.5" opacity="0.4" />

          {/* Icon 5: Rental Hanger */}
          <g transform="translate(351, 0)">
            <path d="M 12 12 C 12 9, 15 9, 16 12 L 2 24 H 22 L 12 12" fill="none" stroke="url(#goldGradientMain)" strokeWidth="1.2" />
            <text x="12" y="38" fontSize="7" fontFamily="'Poppins', sans-serif" fill="#A89F91" textAnchor="middle" letterSpacing="0.5">RENTALS</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
