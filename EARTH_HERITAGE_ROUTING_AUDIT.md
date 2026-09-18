# Earth Heritage Routing & Architecture Audit

**Document Date:** September 18, 2026  
**Project:** Earth Heritage Pvt. Ltd. Web Application  
**Framework:** Next.js 15.5.25 (App Router)  
**Status:** Audit & Safe Architecture Preparation (Pre-Implementation Phase)  

---

## 1. Current / Rendering Structure

### Entry Point & Page Component
- **File**: `app/page.js`
- **Component**: `LandingPage`
- **Redirect Behavior**: `app/page.js` **does not redirect**. It directly renders the full, comprehensive corporate landing experience.
- **Root Layout Context**: Every page, including `/`, is wrapped by `app/layout.js`.
  - **Typography & Font Injection**: Injects Google Fonts `Fraunces` (`--font-serif`, display serif) and `Inter` (`--font-sans`, supporting sans-serif) at the `<html>` root level.
  - **Structured Data (JSON-LD)**: Injects `Organization` schema and `WebSite` schema into `<head>`.
  - **Providers & Contexts**:
    - `EnquiryProvider` (`context/EnquiryContext.js`): Global state for opening/closing the enquiry modal, tracking active enquiry interest tags, and managing form submissions.
    - `GsapProvider` (`components/animations/GsapProvider.js`): Initializes GSAP animations and scroll triggers.
    - `SmoothScroll` (`components/animations/SmoothScroll.js`): Lenis-based smooth scrolling wrapper.
  - **Global Layout Chrome**:
    - `Header` (`components/layout/Header.js`): Primary navigation bar. Detects landing page via `pathname === '/' || pathname === '/home'`, applying transparent-to-solid glassmorphism on scroll and dynamic theme toggling (`data-navbar-theme`).
    - `<main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">{children}</main>`: The main viewport slot.
    - `Footer` (`components/layout/Footer.js`): Rich editorial corporate footer featuring bespoke illustrated landscape background artwork (`FooterLandscapeBackground.js`), top branding banner, 4 navigation columns, operational notice, and copyright bar.
  - **Fixed Viewport Overlays**:
    - `FloatingEnquiryButton` (`components/ui/FloatingEnquiryButton.js`): Floating enquiry pill button appearing upon scrolling past the hero.
    - `WhatsAppButton` (`components/ui/WhatsAppButton.js`): Quick-access WhatsApp conversation launcher.
    - `EnquiryModal` (`components/ui/EnquiryModal.js`): High-converting full-screen multi-field enquiry modal with field validation and context-sensitive interest preselection.

---

## 2. Complete Route → File Map

| Route | Physical File Path | Type | Status / Notes |
| :--- | :--- | :--- | :--- |
| `/` | `app/page.js` | Static | Active. Main corporate home & landing experience. |
| `/home` | `app/home/page.js` | Static | Active. Passthrough duplicate importing and rendering `HomePage` from `@/app/page`. |
| `/about` | `app/about/page.js` | Static | Active. Company story, vision, mission, full founders biographies, FAQs. |
| `/managed-farmland` | `app/managed-farmland/page.js` | Static | Active. In-depth managed farmland model, benefits, target audience, FAQs. |
| `/farm-management` | `app/farm-management/page.js` | Static | Active. Operational services, cultivation cycle, agronomy oversight. |
| `/how-it-works` | `app/how-it-works/page.js` | Static | Active. Step-by-step ownership journey, onboarding stages, FAQs. |
| `/projects` | `app/projects/page.js` | Static | Active. Projects directory & portfolio overview. |
| `/projects/[slug]` | `app/projects/[slug]/page.js` | Dynamic (SSG) | Active. Pre-renders 3 projects: `managed-farmland-concept-i`, `managed-farmland-concept-ii`, `land-and-legacy-concept-iii`. |
| `/gallery` | `app/gallery/page.js` | Static | Active. Visual photo exhibition, lightbox, category filters. |
| `/blogs` | `app/blogs/page.js` | Static | Active. Earth Heritage Journal index. |
| `/blogs/[slug]` | `app/blogs/[slug]/page.js` | Dynamic (SSG) | Active. Pre-renders individual journal articles via `generateStaticParams`. |
| `/events` | `app/events/page.js` | Static | Active. Farm visits, land tours, community gatherings. |
| `/sitemap.xml` | `app/sitemap.js` | Route Handler | Active. Dynamically generates search engine sitemap. |
| `/robots.txt` | `app/robots.js` | Route Handler | Active. Generates crawler rules and links to sitemap. |
| *404 Handler* | `app/not-found.js` | Special | Active. Custom 404 page with return-to-home CTA. |

### Configured Redirects in `next.config.mjs`
The following routes do not have physical folder directories; they are handled via server-side redirect rules in `next.config.mjs`:
- `/sustainability` &rarr; `/#principles` (HTTP 307 temporary redirect)
- `/insights` &rarr; `/#philosophy` (HTTP 307 temporary redirect)
- `/contact` &rarr; `/#contact-cta` (HTTP 307 temporary redirect to anchor / modal trigger)

---

## 3. Current Landing Page Rendering Flow

When a user lands on `/`, the page executes an 11-stage progressive editorial narrative:

```
[ RootLayout: app/layout.js ]
  └── Header (Navbar with scroll detection)
  └── <main id="main-content">
        └── LandingPage (app/page.js)
              ├── 1. HeroSection
              ├── 2. BrandStatement
              ├── 3. ProblemSection
              ├── 4. SolutionSection
              ├── 5. ManagementSection
              ├── 6. HowItWorksSection
              ├── 7. PhilosophySection
              ├── 8. PrinciplesSection
              ├── 9. FoundersSection
              ├── 10. LocationMapSection
              └── 11. FinalCtaSection
  └── Footer (Bespoke landscape artwork, 4 columns, legal notice)
  └── Floating Overlays: FloatingEnquiryButton, WhatsAppButton, EnquiryModal
```

### Section-by-Section Breakdown:

1. **HeroSection** (`components/sections/landing/HeroSection.js`)
   - **Role**: The cinematic opening experience.
   - **Features**: 4-chapter narrative slider driven by `data/landingImages.js` (`heroSlides`). Autoplays on a 6-second interval, Ken-Burns camera scale zoom (1.00 &rarr; 1.07), luxury cubic-bezier word-by-word reveal animations (`AnimatedWords`), category badges, and fluid Fraunces headline typography (`.type-display-hero`).
   - **Controls**: Primary CTA ("Discover Earth Heritage" &rarr; `#statement`), secondary CTA triggering the enquiry modal, scroll-down indicator.

2. **BrandStatement** (`components/sections/landing/BrandStatement.js`)
   - **Role**: Emotional and philosophical bridge.
   - **Features**: Asymmetric 12-column editorial grid. Statement headline: *"Land is more than an asset. It is a living legacy."* Paired with vertical photographic accent and vector topographic contours (`LandContourPattern` variant `biscuit-contours`).

3. **ProblemSection** (`components/sections/landing/ProblemSection.js`)
   - **Role**: Articulates the landowner's dilemma.
   - **Features**: Highlights the reality of owning rural land—remoteness, lack of daily supervision, agricultural complexity, and risk of neglect.

4. **SolutionSection** (`components/sections/landing/SolutionSection.js`)
   - **Role**: Presents the core dual-value proposition.
   - **Features**: Prominently anchors the brand thesis: *"You own the land. We manage the farm."* Split editorial card layout contrasting complete titled ownership with professional on-ground management.

5. **ManagementSection** (`components/sections/landing/ManagementSection.js`)
   - **Role**: Demonstrates operational depth and capability.
   - **Features**: Interactive 6-stage operational sequence:
     - `01. Plan the Farm`
     - `02. Crop Selection`
     - `03. Farm Cultivation`
     - `04. Farm Care`
     - `05. Farm Operations`
     - `06. Harvest Management`
   - Interactive card navigation on desktop; accessible accordion-style cards on mobile.

6. **HowItWorksSection** (`components/sections/landing/HowItWorksSection.js`)
   - **Role**: 4-step process overview.
   - **Features**: Summarizes the client journey: `Own` &rarr; `Manage` &rarr; `Cultivate` &rarr; `Thrive`. Links forward to `/how-it-works` for in-depth reading.

7. **PhilosophySection** (`components/sections/landing/PhilosophySection.js`)
   - **Role**: Visual pause and atmospheric brand grounding.
   - **Features**: Full-bleed panoramic visual backdrop (`philosophy-panorama.jpg`) overlaid with bold manifesto typography: *"BACK TO ROOTS. FORWARD WITH PURPOSE."*

8. **PrinciplesSection** (`components/sections/landing/PrinciplesSection.js`)
   - **Role**: The 5 non-negotiable standards of Earth Heritage.
   - **Features**: Editorial numbered grid (`01` through `05`):
     - `01. Long-Term Stewardship`
     - `02. Ecological Sensitivity`
     - `03. Clear & Transparent Ownership`
     - `04. Agronomic Discipline`
     - `05. Enduring Pride of Place`

9. **FoundersSection** (`components/sections/landing/FoundersSection.js`)
   - **Role**: Human credibility, vision, and leadership.
   - **Features**: Introduces Founders Sathish Agastya and Khushi Jain with concise editorial quotes and leadership philosophies.

10. **LocationMapSection** (`components/sections/landing/LocationMapSection.js`)
    - **Role**: Physical permanence and geographical presence.
    - **Features**: Official responsive Google Maps embed of the Earth Heritage office location (Bangalore) with custom interactive map controls, coordinate badges, and visit booking triggers.

11. **FinalCtaSection** (`components/sections/landing/FinalCtaSection.js`)
    - **Role**: The final conversion moment.
    - **Features**: Editorial headline: *"Have farmland that deserves to be cared for?"* Direct triggers for the interactive consultation modal and phone/WhatsApp inquiry channels.

---

## 4. Landing/Home Components and Assets

### A. Section Components (`components/sections/landing/`)
1. `HeroSection.js` (13.1 KB)
2. `BrandStatement.js` (3.9 KB)
3. `ProblemSection.js` (4.1 KB)
4. `SolutionSection.js` (6.3 KB)
5. `ManagementSection.js` (14.8 KB)
6. `HowItWorksSection.js` (3.2 KB)
7. `PhilosophySection.js` (3.8 KB)
8. `PrinciplesSection.js` (4.2 KB)
9. `FoundersSection.js` (5.0 KB)
10. `LocationMapSection.js` (5.3 KB)
11. `FinalCtaSection.js` (7.8 KB)

### B. Shared UI & Layout Components
- `components/ui/Container.js`: Standard responsive layout constraint (`default`, `wide`, `narrow`, `full`).
- `components/ui/Typography.js`: Primitives (`Display`, `Heading`, `Body`, `Subtitle`, `EditorialNumber`, `Quote`).
- `components/ui/LandContourPattern.js`: Topographic vector contour backgrounds with multiple tone variants.
- `components/ui/Button.js`: Accessible interactive button primitive.
- `components/ui/Logo.js`: Vector and raster brand logo component (`light`, `dark`, `mark`, `cropped`).
- `components/ui/EnquiryModal.js`: Multi-input consultation modal with interest pre-selection and input masking.
- `components/ui/FloatingEnquiryButton.js`: Persistent viewport conversion trigger.
- `components/ui/WhatsAppButton.js`: Direct WhatsApp link with pre-filled greeting.
- `components/sections/SectionWrapper.js`: Standard section container with semantic padding and optional background patterns.

### C. Animation Primitives (`components/animations/`)
- `MotionReveal.js`: Viewport-triggered scroll fade/slide animations powered by `motion/react`.
- `SmoothScroll.js`: Lenis smooth scroll provider.
- `GsapProvider.js`: ScrollTrigger and GSAP engine provider.

### D. Centralized Data Architecture
- `data/landingImages.js`:
  - Contains image specifications (`src`, `alt`, `width`, `height`, `usage`).
  - Contains `heroSlides`: 4-chapter narrative sequence definitions, themes (`light`/`dark`), custom drop-shadows, and slide actions.
- `data/company.js`: Official company name, founding year (2026), core propositions, brand philosophy, and contact data.
- `data/routes.js`: Official navigation architecture, header routes, footer links, and legal link definitions.

### E. Curated Visual Assets (`public/images/landing/`)
1. `hero-landscape.jpg` (611 KB) — Expansive sunrise farmland for hero slide 01.
2. `statement-landscape.jpg` (566 KB) — Sunlit tree canopy for Section 2.
3. `problem-land.jpg` (351 KB) — Misty morning open fields for Section 3.
4. `solution-management.jpg` (865 KB) — Cultivated rows under open sky for Section 4.
5. `manage-01-people.jpg` (138 KB) — Stage 01 operational planning visual.
6. `manage-02-crop.jpg` (125 KB) — Stage 02 crop selection visual.
7. `manage-03-cultivation.jpg` (219 KB) — Stage 03 farm cultivation visual.
8. `manage-04-care.jpg` (755 KB) — Stage 04 grove maintenance and farm care visual.
9. `manage-05-operations.jpg` (77 KB) — Stage 05 irrigation and infrastructure visual.
10. `manage-06-harvest.jpg` (179 KB) — Stage 06 harvest management visual.
11. `philosophy-panorama.jpg` (667 KB) — Full-bleed panoramic valley for Section 7.
12. `principles-land.jpg` (1.13 MB) — Fertile soil and natural light visual for Section 8.
13. `cta-landscape.jpg` (1.44 MB) — Sunset horizon over trees for Section 11 closing CTA.

---

## 5. Duplicate or Unused Files

1. **`app/home/page.js` (Redundant Passthrough)**
   - **Content**:
     ```javascript
     import HomePage from '@/app/page';
     export default function CorporateHomePage() {
       return <HomePage />;
     }
     ```
   - **Finding**: It is an exact duplicate route rendering `HomePage` from `app/page.js`.
   - **Code References**: Referenced in `components/layout/Header.js` (line 31) and `hooks/useFloatingControls.js` (line 23) via `pathname === '/' || pathname === '/home'`.
   - **Recommendation**: Do not delete during audit. When migrating, safely redirect `/home` &rarr; `/` in `next.config.mjs` and clean up the path check.

2. **`components/sections/CtaSection.js` (Unused Legacy Component)**
   - **Finding**: Contains a generic corporate CTA box.
   - **Usages**: **Zero imports across the entire codebase**.
   - **Recommendation**: Leave intact for now to respect non-destructive audit rules; mark as deprecated.

3. **Dual Founders Section Implementations (Intentional)**
   - `components/sections/landing/FoundersSection.js` (used on `/`)
   - `components/sections/about/FoundersSection.js` (used on `/about`)
   - **Finding**: These are not accidental duplicates. The landing page component provides a concise, editorial introduction suited for a homepage; the about page component provides comprehensive biographical narratives, credentials, and vision statements. Both should be preserved.

---

## 6. Existing Routes and Their Status

### Standard Site Routes
- **`/`**: Fully functioning. Main corporate landing page.
- **`/about`**: Fully functioning. Displays Intro, Vision/Mission, Ownership vs. Management breakdown, Goals, Full Founders Section, and FAQs.
- **`/managed-farmland`**: Fully functioning. Displays Intro, Core Proposition, Why Managed Farmland, Management Areas, Who Is It For, Nature Responsibility, Process in Practice, Model Walkthrough, and FAQs.
- **`/farm-management`**: Fully functioning. Displays Farm Management Intro, Activities Grid, Cycle, Flow, People & Land, Responsible Care, Ownership Reminders.
- **`/how-it-works`**: Fully functioning. Displays Intro, Core Proposition, 4-Stage Process Journey, Responsible Care, Ownership Reminder, and FAQs.
- **`/projects`**: Fully functioning. Projects portfolio directory.
- **`/projects/[slug]`**: Fully functioning. Dynamic detail pages for verified projects (`managed-farmland-concept-i`, `managed-farmland-concept-ii`, `land-and-legacy-concept-iii`).
- **`/gallery`**: Fully functioning. Photo exhibition with interactive lightbox and tag filters.
- **`/blogs`**: Fully functioning. Journal archive.
- **`/blogs/[slug]`**: Fully functioning. Reading room layout for individual articles.
- **`/events`**: Fully functioning. Farm tour calendar and event booking.

### Virtual / Redirected Routes
- **`/sustainability`**: Redirects to `/#principles`.
- **`/insights`**: Redirects to `/#philosophy`.
- **`/contact`**: Redirects to `/#contact-cta` (modal trigger on homepage).

### Legal Notice Status
- The site currently handles legal disclosures and operational disclaimers via the dedicated **Ownership & Management Notice** card inside `Footer.js`:
  > *"Ownership & Management Notice: Earth Heritage operates as a professional farm management company. Farmland ownership remains legally registered to the individual landowner. Earth Heritage provides structured agricultural management, maintenance, and operational coordination without offering guaranteed yields or financial returns."*

---

## 7. Git Status

- **Current Branch**: `main`
- **Upstream Status**: Up to date with `origin/main`
- **Working Tree Status**:
  - **Modified Files (15)** from Phase 1 Typography update:
    - `app/events/page.js`
    - `app/globals.css`
    - `app/layout.js`
    - `components/sections/landing/BrandStatement.js`
    - `components/sections/landing/FoundersSection.js`
    - `components/sections/landing/HeroSection.js`
    - `components/sections/landing/HowItWorksSection.js`
    - `components/sections/landing/ManagementSection.js`
    - `components/sections/landing/PhilosophySection.js`
    - `components/sections/landing/PrinciplesSection.js`
    - `components/sections/landing/ProblemSection.js`
    - `components/sections/landing/SolutionSection.js`
    - `components/ui/Typography.js`
    - `data/landingImages.js`
    - `tailwind.config.js`
  - **Untracked Files (1)**:
    - `scratch/verify_typography.js` (Automated browser testing script)
- **Integrity**: Clean working tree. No files were discarded, staged, or overwritten during this audit.

---

## 8. Build and Lint Results

### ESLint Verification
```bash
> earth-heritage@0.1.0 lint
> next lint

✔ No ESLint warnings or errors
```
- **Exit Code**: `0`

### Production Build Verification
```bash
> earth-heritage@0.1.0 build
> next build

   ▲ Next.js 15.5.25

   Creating an optimized production build ...
 ✓ Compiled successfully in 10.1s
   Linting and checking validity of types ...
   Collecting page data ...
   Generating static pages (0/21) ...
   Generating static pages (5/21) 
   Generating static pages (10/21) 
   Generating static pages (15/21) 
 ✓ Generating static pages (21/21)
   Finalizing page optimization ...
   Collecting build traces ...

Route (app)                                     Size  First Load JS
┌ ○ /                                          137 B         224 kB
├ ○ /_not-found                                131 B         103 kB
├ ○ /about                                    9.2 kB         168 kB
├ ○ /apple-icon.png                              0 B            0 B
├ ○ /blogs                                   4.48 kB         167 kB
├ ● /blogs/[slug]                            4.63 kB         167 kB
├   ├ /blogs/field-notes-soil-regeneration (sample)
├ ○ /events                                    488 B         106 kB
├ ○ /farm-management                         8.12 kB         167 kB
├ ○ /gallery                                 6.82 kB         166 kB
├ ○ /home                                      137 B         224 kB
├ ○ /how-it-works                            10.5 kB         170 kB
├ ○ /icon.png                                    0 B            0 B
├ ○ /managed-farmland                        13.3 kB         172 kB
├ ○ /projects                                6.98 kB         169 kB
├ ● /projects/[slug]                         8.98 kB         171 kB
├   ├ /projects/managed-farmland-concept-i
├   ├ /projects/managed-farmland-concept-ii
├   └ /projects/land-and-legacy-concept-iii
├ ○ /robots.txt                                131 B         103 kB
└ ○ /sitemap.xml                               131 B         103 kB
+ First Load JS shared by all                 103 kB
  ├ chunks/255-37e0f0325134c4d7.js           46.4 kB
  ├ chunks/4bd1b696-c023c6e3521b1417.js      54.2 kB
  └ other shared chunks (total)              2.01 kB
```
- **Exit Code**: `0`
- **Total Static Pages Prerendered**: `21`

---

## 9. Routing Risks or Conflicts

1. **Layout Pollution for Advertising Landing Pages (`/lp/...`)**
   - **Risk**: `app/layout.js` currently mounts `Header` (with full navigation: About, Managed Farmland, How It Works, Gallery, Projects, Blogs, Events) and `Footer` across *all* routes.
   - **Campaign Impact**: Advertising traffic sent to `/lp/...` needs to be focused on a single conversion action. Full website navigation on campaign pages causes high bounce and exit rates.
   - **Solution**: Future `/lp/...` pages must utilize a dedicated sub-layout (`app/lp/layout.js`) or Route Group (`app/(campaign)/lp/...`) that suppresses the corporate multi-page header/footer while preserving typography, fonts, brand styling, and enquiry modals.

2. **Navbar and Floating Controls Logic Tied to Pathname**
   - **Risk**: In `Header.js` (line 31) and `useFloatingControls.js` (line 23), logic explicitly checks:
     ```javascript
     const isLanding = pathname === '/' || pathname === '/home';
     ```
   - **Impact**: New `/lp/...` routes will not be recognized as landing experiences unless properly accounted for or isolated by sub-layout.

3. **Duplication of `/home` and `/`**
   - **Risk**: Having two routes rendering identical content (`/` and `/home`) creates duplicate content risks for search engines if both are indexed.
   - **Mitigation**: `app/sitemap.js` only indexes `/` (priority 1.0), correctly omitting `/home`. However, `/home` should eventually be converted to a 301 redirect to `/`.

4. **Anchor Redirects from Sub-Pages**
   - **Risk**: Sub-page redirects (`/sustainability` &rarr; `/#principles`, `/insights` &rarr; `/#philosophy`, `/contact` &rarr; `/#contact-cta`) rely on the anchor IDs existing on the `/` page.
   - **Mitigation**: These anchor IDs (`#principles`, `#philosophy`, `#contact-cta`) must never be removed from the homepage sections.

---

## 10. Recommended Next Structural Step

To cleanly transition into supporting both the **Main Website Home (`/`)** and **Advertising / Campaign Landing Pages (`/lp/...`)**, execute the following sequence:

### Phase A: Git Checkpoint (Immediate Next Step)
Commit the current 15 modified files from the Phase 1 typography update to create a clean reference checkpoint on `main`:
```bash
git add app/ components/ data/ tailwind.config.js
git commit -m "feat(typography): complete Phase 1 editorial typography with Fraunces and Inter"
```

### Phase B: Sub-Layout Architecture for `/lp`
Create the dedicated campaign layout architecture without altering `/`:
```
app/
├── layout.js                 <-- Root layout (Fonts, CSS, EnquiryProvider, Schema)
├── (site)/ OR app/...        <-- Existing corporate pages (Header, Main, Footer)
└── lp/
    ├── layout.js             <-- Minimal/Focused Campaign Layout (No exit links)
    ├── managed-farmland/
    │   └── page.js           <-- Standalone Ad Campaign: Managed Farmland
    └── land-ownership/
        └── page.js           <-- Standalone Ad Campaign: Land Ownership
```
- `app/lp/layout.js` will render:
  - Minimal campaign header (Logo only + "Talk to Us" conversion CTA).
  - Clean children viewport.
  - Streamlined campaign footer (Legal disclaimer + copyright only).
  - Inherits Fraunces & Inter fonts, Tailwind tokens, and `EnquiryModal`.

### Phase C: Compose `/lp` Pages Using Preserved Landing Components
Construct the campaign pages by composing the modular sections already built and tested in `components/sections/landing/` and `components/sections/managed-farmland/`.

---

## 11. Files That Must Be Preserved

The following files represent core assets, components, and configurations that must **never** be deleted, moved, or overwritten during restructuring:

### 1. Section Components
- `components/sections/landing/HeroSection.js`
- `components/sections/landing/BrandStatement.js`
- `components/sections/landing/ProblemSection.js`
- `components/sections/landing/SolutionSection.js`
- `components/sections/landing/ManagementSection.js`
- `components/sections/landing/HowItWorksSection.js`
- `components/sections/landing/PhilosophySection.js`
- `components/sections/landing/PrinciplesSection.js`
- `components/sections/landing/FoundersSection.js`
- `components/sections/landing/LocationMapSection.js`
- `components/sections/landing/FinalCtaSection.js`

### 2. Core UI & Conversion Primitives
- `components/ui/EnquiryModal.js`
- `components/ui/FloatingEnquiryButton.js`
- `components/ui/WhatsAppButton.js`
- `components/ui/LandContourPattern.js`
- `components/ui/Typography.js`
- `components/ui/Container.js`
- `components/ui/Logo.js`
- `components/ui/Button.js`

### 3. Layout & Footer Infrastructure
- `components/layout/Header.js`
- `components/layout/Footer.js`
- `components/layout/FooterLandscapeBackground.js`
- `components/layout/Navigation.js`
- `components/layout/MobileMenu.js`

### 4. Animation Engine
- `components/animations/MotionReveal.js`
- `components/animations/SmoothScroll.js`
- `components/animations/GsapProvider.js`

### 5. Data Architecture
- `data/landingImages.js`
- `data/company.js`
- `data/routes.js`
- `data/projects.js`
- `data/blogs.js`

### 6. Curated Photography Assets
- `public/images/landing/hero-landscape.jpg`
- `public/images/landing/statement-landscape.jpg`
- `public/images/landing/problem-land.jpg`
- `public/images/landing/solution-management.jpg`
- `public/images/landing/manage-01-people.jpg`
- `public/images/landing/manage-02-crop.jpg`
- `public/images/landing/manage-03-cultivation.jpg`
- `public/images/landing/manage-04-care.jpg`
- `public/images/landing/manage-05-operations.jpg`
- `public/images/landing/manage-06-harvest.jpg`
- `public/images/landing/philosophy-panorama.jpg`
- `public/images/landing/principles-land.jpg`
- `public/images/landing/cta-landscape.jpg`

---
*End of Audit Document.*
