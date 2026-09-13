# ATMALINK Design System Specification
**Platform Digital Alumni Universitas Katolik Indonesia Atma Jaya (PERLUNI UAJ)**  
*Tagline: "Menjalin Akar, Membangun Karya Global"*  
*Version: 1.0.0 (Production Mobile App & Mobile Web)*

---

## 1. Brand Philosophy & Identity Architecture

ATMALINK is designed as an exclusive, high-trust digital ecosystem connecting over 65,000+ Atma Jaya Catholic University alumni spanning C-Suite, senior management, active tech professionals, and new graduates across 8 faculties.

### 1.1 Brand Symbolism
- **The Letter "A" (Akar / Local Roots)**: Rendered in solid institutional Atma Jaya Forest Green (`#006837`), representing foundational values, university legacy since 1960, and ethical grounding.
- **The Soaring Dove / Burung Merpati (Karya Global / Global Impact)**: Rendered in energetic Tangerine Orange (`#F15A24`), taking flight diagonally upward and outward through the arch of the "A". Symbolizes peace, spirit, alumni launching into global leadership, innovation, and active connectivity.
- **Wordmark Typography**:
  - **`ATMA`**: Heavy geometric uppercase in Forest Green (`#006633`), expressing gravitas and stability.
  - **`LINK`**: Heavy geometric uppercase in Tangerine Orange (`#EF5B2A`), expressing collaboration, speed, and digital connectivity.

---

## 2. Logo Suite & Assets Specification

All logos are supplied as resolution-independent, pixel-aligned SVGs located in:
- Web: `/apps/mobile-web/public/`
- Flutter / Mobile: `/apps/flutter-app/assets/images/`
- Core Package: `/packages/ui-core/assets/`

| Variant | File Name | Primary Usage | Aspect Ratio |
|---|---|---|---|
| **Master Official Logo** | `atmalink-logo.svg` | Master Vector Logo with Mark & Custom Typographic Wordmark | 1 : 1.14 |
| **Primary Horizontal** | `atmalink-logo-horizontal.svg` | App Bar, Top Header, Web Navigation | 5.0 : 1 |
| **Stacked / Vertical** | `atmalink-logo-vertical.svg` | Splash Screen, Welcome / Auth Modal (Transparent) | 1 : 1.14 |
| **Emblem Mark Only** | `atmalink-mark.svg` | Watermarks, Avatars, Micro-branding | 1.06 : 1 |
| **Monochrome Inverted** | `atmalink-logo-white.svg` | Dark Mode, Forest Green Hero Banners | 4.2 : 1 |
| **App Icon Launcher** | `atmalink-app-icon.svg` | iOS / Android Squircle (512×512) | 1 : 1 |

### Clear Space & Minimum Sizing
- **Horizontal Logo Minimum Height**: Mobile Web: 28px; Mobile App: 24dp.
- **Mark Only Minimum Sizing**: Mobile App: 20dp; Favicon: 16×16px.
- **Clear Space**: Minimum clearance equal to the height of the letter "A" in the wordmark on all four sides.

---

## 3. Color Token System & Accessibility

Every color combination in ATMALINK has been audited against WCAG 2.1 standards to achieve minimum AA contrast (4.5:1 for body, 3.0:1 for large display text and UI components).

### 3.1 Primary Brand: Atma Jaya Forest & Action Green
| Token Name | Hex Code | Purpose / Application | Contrast on White |
|---|---|---|---|
| `atma-50` | `#ECFDF5` | Surface background, light pill badges | N/A (Background) |
| `atma-100` | `#D1FAE5` | Card hover tint, subtle borders | N/A |
| `atma-200` | `#A7F3D0` | Decorative ring borders | N/A |
| `atma-500` | `#00A859` | **Action Green**: Primary CTA button ("Daftar"), active badge | 3.1:1 (Large text / UI) |
| `atma-600` | `#008040` | Hover / Pressed button state | 4.6:1 (AA Body) |
| `atma-700` | `#006633` | **Official Brand Base**: Mark "A", "ATMA" wordmark, header | **7.5:1 (AAA Pass)** |
| `atma-800` | `#004D26` | High-contrast subheadings | **9.6:1 (AAA Pass)** |
| `atma-900` | `#00331A` | Dark header backgrounds | **12.1:1 (AAA Pass)** |

### 3.2 Secondary Brand: PERLUNI Link Orange
| Token Name | Hex Code | Purpose / Application | Contrast on White |
|---|---|---|---|
| `link-50` | `#FFF7ED` | Promo card tint, date badge background | N/A (Background) |
| `link-100` | `#FFEDD5` | Notification banner highlight | N/A |
| `link-400` | `#FA7343` | Dove highlight gradient accent | 2.5:1 |
| `link-500` | `#EF5B2A` | **Official Accent Base**: "LINK" text, "Reservasi", "Apply ->" | 3.4:1 (Large text / UI) |
| `link-600` | `#D84A1B` | Button active state, text links | 4.5:1 (AA Body) |
| `link-800` | `#9A2F0D` | Dark text on orange tinted surfaces | **7.2:1 (AAA Pass)** |

### 3.3 Semantic & Functional Tokens
| Category | Token | Hex | Usage |
|---|---|---|---|
| **Verification** | `semantic-verified` | `#10B981` | Official Alumni Verified checkmark badge |
| **Featured / VIP** | `semantic-featured` | `#F59E0B` | Featured Jobs, Sponsor badges |
| **Education / Records** | `semantic-info` | `#2563EB` | University degree records, external links |
| **Critical / Alert** | `semantic-error` | `#EF4444` | Form errors, cancellation alerts |

### 3.4 Neutral & Surface Hierarchy
- `bg-app`: `#F8FAF8` (Clean, warm organic canvas)
- `bg-card`: `#FFFFFF` (Pure white cards for high crispness)
- `text-primary`: `#0F172A` (Slate 900 for optimal readability)
- `text-secondary`: `#64748B` (Slate 500 for secondary descriptors)
- `text-muted`: `#94A3B8` (Slate 400 for timestamps & borders)

---

## 4. Typography System (Mobile-First)

The primary font family is **Plus Jakarta Sans**, with standard fallbacks to **Inter** and system sans-serif (`-apple-system`, `Roboto`).

| Style Role | Font Size | Line Height | Weight | Letter Spacing |
|---|---|---|---|---|
| **Display** | 32px (2.0rem) | 40px (2.5rem) | 800 (ExtraBold) | -0.02em |
| **Heading 1 (H1)** | 24px (1.5rem) | 32px (2.0rem) | 700 (Bold) | -0.015em |
| **Heading 2 (H2)** | 20px (1.25rem) | 28px (1.75rem) | 700 (Bold) | -0.01em |
| **Heading 3 (H3)** | 18px (1.125rem) | 24px (1.5rem) | 600 (SemiBold) | 0.0em |
| **Body Large** | 16px (1.0rem) | 24px (1.5rem) | 400 (Regular) / 500 (Medium) | 0.0em |
| **Body Medium** | 14px (0.875rem) | 20px (1.25rem) | 400 (Regular) / 500 (Medium) | 0.0em |
| **Body Small** | 12px (0.75rem) | 16px (1.0rem) | 400 (Regular) / 500 (Medium) | 0.01em |
| **Caption / Overline** | 11px (0.6875rem) | 14px (0.875rem) | 600 (SemiBold) / 700 (Bold) | +0.06em (Uppercase) |
| **Button Text** | 15px (0.9375rem) | 20px (1.25rem) | 700 (Bold) | +0.01em |

---

## 5. Spacing, Radii, and Elevation Tokens

### 5.1 Spacing (8pt Grid)
- `2xs`: 4px
- `xs`: 8px
- `sm`: 12px
- `md`: 16px (Standard screen horizontal padding)
- `lg`: 20px
- `xl`: 24px
- `2xl`: 32px
- `3xl`: 48px

### 5.2 Border Radii
- `rounded-input`: `8px`
- `rounded-card`: `12px` (Standard cards)
- `rounded-card-lg`: `16px` (Promos & event carousels)
- `rounded-card-xl`: `24px` (Alumni Digital ID card & Bottom sheets)
- `rounded-pill`: `9999px` (Primary action buttons and status chips)

### 5.3 Elevation & Shadows
- `shadow-card`: `0 2px 10px rgba(0, 0, 0, 0.05)`
- `shadow-card-elevated`: `0 10px 25px -5px rgba(0, 104, 55, 0.12), 0 8px 10px -6px rgba(241, 90, 36, 0.08)`
- `shadow-orange-glow`: `0 8px 20px -4px rgba(241, 90, 36, 0.35)`
- `shadow-green-glow`: `0 8px 20px -4px rgba(0, 168, 89, 0.35)`
- `shadow-bottom-nav`: `0 -4px 16px 0 rgba(0, 0, 0, 0.05)`

---

## 6. Core Component Patterns & Usage

### 6.1 Digital Alumni ID Card (`<AlumniIdCard />`)
- **Visuals**: Organic mesh gradient (`#FFFFFF` to `#F4FBF7` to `#FFF7ED`), subtle watermarked dove mark in lower right.
- **Elements**: Member photo avatar, verified status badge ("Aktif"), Faculty + Grad Year, "Masa Berlaku: Seumur Hidup", formatted 16-digit card number, Barcode toggle action.

### 6.2 Buttons & Touch Ergonomics
- **Minimum Target**: All interactive controls maintain ≥48×48px physical touch target.
- **Primary Action ("Daftar")**: Full-width or inline pill with solid Action Green (`#00A859`), white bold text, slight spring press effect.
- **Secondary Action ("Masuk")**: White background, neutral-200 stroke, Slate 800 text.
- **Accent Action ("Reservasi Now", "Apply ->")**: Tangerine Orange (`#F15A24`) pill with right chevron or arrow.

### 6.3 Event Card (`<EventCard />`)
- Prominent two-tier date badge (e.g. `12` in bold orange above `OKT`), event name, venue location with map pin, direct RSVP CTA.

### 6.4 Job Vacancy Card (`<JobCard />`)
- Company emblem, verified alumni poster tag, position title, location, metadata pills (Remote, Tech, Full-time), "Apply ->" CTA.

### 6.5 Promotion & Sponsorship (`<PromoCard />`)
- High-visibility discount chip (e.g. `25%` or `Cashback Rp 500rb`), partner name, short value proposition, and tap-through details.

### 6.6 Bottom Navigation (`<BottomNavigation />`)
- Sticky frosted glass bar (`bg-white/95 backdrop-blur-md`) with 5 primary destinations:
  1. **Beranda** (Home)
  2. **Direktori** (Networking / Alumni Directory)
  3. **Event** (Kalender Kegiatan PERLUNI)
  4. **Karir** (Bursa Lowongan Kerja)
  5. **Promo** (Direktori Bisnis & Diskon Sponsor)

---

## 7. Cross-Platform Implementation Guide

### React / Vite / Tailwind Web
```tsx
import { AtmaLinkLogo, AlumniIdCard, AtmaButton, EventCard } from "@atmajaya/ui-core";

export function ExampleView() {
  return (
    <div className="p-4 bg-background">
      <AtmaLinkLogo variant="horizontal" size={160} />
      <AlumniIdCard name="Budi Santoso" memberId="0000 0000 0000 0000" />
      <AtmaButton variant="primary" fullWidth>Daftar Sekarang</AtmaButton>
    </div>
  );
}
```

### Flutter App (Dart)
```dart
import 'package:flutter/material.dart';
import 'package:atmajaya_alumni/core/theme.dart';
import 'package:atmajaya_alumni/core/logo.dart';

class ExamplePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const AtmaLinkLogoWidget(variant: AtmaLogoVariant.horizontal, size: 36),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {},
          child: const Text('Daftar'),
        ),
      ),
    );
  }
}
```
