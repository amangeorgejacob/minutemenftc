# Impact Page Design Guidelines

## Design Approach
**Reference-Based**: Drawing from Charity: Water's emotional storytelling + Airbnb's card aesthetics + Stripe's data visualization clarity

## Layout Architecture

**Hero Section (90vh)**
- Full-width background image with centered content overlay
- Large impact headline (text-6xl font-bold)
- Subheadline explaining mission (text-xl max-w-2xl)
- Dual CTA buttons with blurred backgrounds (backdrop-blur-md bg-white/20)
- Subtle gradient overlay on image (from-black/40 to transparent)

**Statistics Grid (py-24)**
- Container: max-w-7xl mx-auto
- 4-column grid on desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8)
- Each card elevated with shadow, white background
- Large metric number (text-5xl font-bold)
- Label below (text-lg text-gray-600)
- Icon above number (w-12 h-12)
- Rounded corners (rounded-2xl) with generous padding (p-8)

**Community Stories Section (py-20 bg-gray-50)**
- Centered heading (text-4xl font-bold mb-16)
- 3-column grid (grid-cols-1 md:grid-cols-3 gap-8)
- Story cards: Image top (aspect-video object-cover rounded-t-xl), text content below with quote, name, and location
- Cards with subtle hover lift effect

**Impact Timeline (py-24)**
- max-w-4xl centered
- Vertical timeline with alternating left/right content
- Year markers (text-3xl font-bold)
- Achievement descriptions with supporting images
- Connecting line visual (border-l with dots)

**Call-to-Action Section (py-20)**
- Centered layout max-w-3xl
- Compelling headline (text-4xl font-bold mb-6)
- Description paragraph (text-xl mb-8)
- Primary button (large, px-12 py-4)

## Typography System
- Headlines: Font family "Inter" or "Plus Jakarta Sans" (700-800 weight)
- Body: Same family (400-500 weight)
- Hierarchy: Hero (text-6xl) → Section Headers (text-4xl) → Card Titles (text-2xl) → Body (text-lg)

## Spacing Strategy
- Tailwind units: 4, 8, 12, 16, 20, 24 for consistency
- Section padding: py-20 to py-24
- Card internal: p-8
- Grid gaps: gap-8 to gap-12

## Component Specifications

**Statistic Cards**
- White background with shadow-lg
- Border radius: rounded-2xl
- Padding: p-8
- Icon at top (Heroicons - outline style)
- Number prominent and bold
- Label in muted gray
- Subtle border (border border-gray-100)

**Story Cards**
- Image: rounded-t-xl, aspect-video
- Content padding: p-6
- Quote in italic with quotation marks
- Name in font-semibold
- Location in text-sm text-gray-500

**Buttons**
- On hero image: backdrop-blur-md bg-white/30 border border-white/50
- Standard sections: solid backgrounds
- Large touch targets: px-8 py-4
- Rounded: rounded-full

## Images Section

**Hero Image**: 
Full-width inspirational community image - people collaborating, helping, or celebrating together. Should evoke emotion and connection. Dimensions: 1920x1080, high quality, bright and optimistic tone.

**Story Cards (3 images)**:
Individual community member portraits or action shots showing impact. Dimensions: 800x600 each, authentic photography style, diverse representation.

**Timeline Images (4-5)**:
Milestone moments - events, achievements, community gatherings. Dimensions: 600x400, documentary style, chronologically arranged.

## Layout Principles
- Everything centered (mx-auto, text-center for headers)
- Consistent max-width containers (max-w-7xl for grids, max-w-4xl for text)
- Generous whitespace between sections
- Cards always have breathing room
- Mobile-first: stack everything single-column, expand at md/lg breakpoints