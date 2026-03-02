# Specification

## Summary
**Goal:** Build SnapCut AI, a full-stack background removal platform with a dark AI-tech aesthetic, client-side canvas-based background removal, and a Motoko backend usage counter.

**Planned changes:**
- Apply a global dark theme (#0D0D0D/#141414 backgrounds, #00FF87 electric-green accents, glassmorphism cards) across all pages
- Build a responsive landing page with hero section (headline, sub-headline, CTA, live processed-images counter), "How It Works" (3 steps), Features (6 cards), Target Audience section, and footer
- Build a background removal tool section with drag-and-drop/click-to-browse upload (JPG, PNG, WEBP, max 10MB), canvas-based white/near-white pixel removal, animated processing state, before/after preview, and Download PNG button
- Build a Pricing page with Free, Pro ($9.99/mo, "Most Popular"), and Business ($29.99/mo) plan cards plus pay-per-use note
- Build a FAQ page with at least 6 accordion-style Q&A items
- Add a sticky top navbar with logo, nav links (Home, Tool, Pricing, FAQ), "Get Started" CTA, and mobile hamburger menu
- Implement Motoko backend actor with `getTotalProcessed() : async Nat` and `recordProcessed() : async ()` methods
- Display live total-processed counter on the hero section via React Query; call `recordProcessed` after each successful removal
- Serve static image assets (hero background, logo mark, step icons) from `/assets/generated`

**User-visible outcome:** Users can visit the landing page, upload an image to have its background removed client-side, preview and download the transparent PNG result, view pricing and FAQ, and see a live count of total images processed on the platform.
