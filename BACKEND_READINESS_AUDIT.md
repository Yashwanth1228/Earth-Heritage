# Earth Heritage — Frontend Forms & Enquiry Backend Readiness Audit

**Document Date:** September 2026  
**Project:** Earth Heritage Next.js Web Application (`Earth Heritage Private Limited`)  
**Scope:** Frontend Forms, Enquiry Triggers, Contact Actions, API & Data Layer Audit

---

## Executive Summary

A comprehensive audit was performed across all routes, components, contexts, configuration files, and data dictionaries in the Earth Heritage codebase.

**Key Findings:**
1. **Actual Form Implementations:** There are **only two (2) actual form components** in the entire codebase:
   - `EnquiryModal` (`components/ui/EnquiryModal.js`): Mounted globally in `app/layout.js`, opened by 19 distinct CTAs across the site.
   - `HomeContactLocation` (`components/sections/home/HomeContactLocation.js`): Static on-page form embedded in Section 08 of the homepage (`/` and `/home`).
2. **Submission Pipeline:** Both forms share a single submission service adapter: `lib/enquiry.js` (`submitEnquiry`).
3. **Backend Status:** **No backend or database is currently connected.** No API routes (`app/api/*` or `pages/api/*`) and no Next.js Server Actions (`'use server'`) exist. No `.env` file exists.
4. **Data Persistence:** Submissions are **not saved anywhere** (no database, no API endpoint, no `localStorage`, no `sessionStorage`).
5. **Preview Mode Behavior:** When submitted, the client simulates a 600ms latency, logs the payload to `console.info` in development mode, and returns a verified preview confirmation.
6. **WhatsApp Entry Points:** Two UI elements trigger WhatsApp click-to-chat links (`WhatsAppButton` and `HomeContactLocation`). Both route directly to WhatsApp via `data/company.js` (`getWhatsAppUrl()`) and bypass forms completely.

---

## Section 1: Comprehensive Audit of Forms & Entry Points

---

### Form 1: Unified Enquiry Modal (`EnquiryModal`)

1. **File Path:**  
   `components/ui/EnquiryModal.js`

2. **Component Name:**  
   `EnquiryModal`

3. **Route / Page Where It Is Used:**  
   - Mounted globally in root layout (`app/layout.js`).  
   - Accessible from **every route** across the entire website via `useEnquiry()` / `EnquiryProvider` (`context/EnquiryContext.js`).

4. **Fields Currently Collected:**  
   - `fullName`: `string` — Full name of visitor
   - `phoneNumber`: `string` — Phone number with optional country prefix
   - `email`: `string` — Email address (**marked optional**)
   - `interestedIn`: `string` — Select dropdown (`'Managed Farmland'`, `'Farm Management'`, `'Land Ownership'`, `'General Enquiry'`)
   - `message`: `string` — Optional multiline message

5. **Validation Currently Implemented:**  
   - `fullName`: Required; minimum 2 characters after whitespace trimming.
   - `phoneNumber`: Required; sanitized of spaces, dashes, brackets, and periods; validated against regex `/^[\+]?[0-9]{7,16}$/` (accepts 7 to 15 digits).
   - `email`: Optional; if entered, validated against regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
   - `interestedIn`: Required; must have a valid selection.
   - `message`: Optional; no length or format validation.

6. **What Happens When User Submits:**  
   - Executes client-side validation (`validate()`). If errors are found, inline red messages are rendered beneath inputs.
   - Sets `isSubmitting = true` (disables submit button and shows animated spinner).
   - Calls `submitEnquiry(formData)` in `lib/enquiry.js`.
   - On resolution, replaces the form view with an in-modal green checkmark success confirmation card displaying a read-back of the submitted details (`Name`, `Phone`, `Email` if present, and `Interest`).
   - Automatically scrolls the modal view to top so the confirmation card is fully visible.

7. **Whether Submission Currently Reaches a Backend:**  
   - **No.**

8. **Whether It Currently Stores Data Anywhere:**  
   - **No.** Data exists only in React component state and is discarded when the modal is closed or reset.

9. **Duplicate Forms or Duplicated Enquiry Logic:**  
   - Phone regex and email requirement rules differ from `HomeContactLocation` (where email is strictly required).

10. **Existing API / Server Action That Could Be Reused:**  
    - Uses `submitEnquiry()` in `lib/enquiry.js`. This function already checks `process.env.NEXT_PUBLIC_ENQUIRY_API_ENDPOINT` and can directly serve as the bridge to the real backend.

---

### Form 2: Corporate Home Page On-Page Form (`HomeContactLocation`)

1. **File Path:**  
   `components/sections/home/HomeContactLocation.js`

2. **Component Name:**  
   `HomeContactLocation`

3. **Route / Page Where It Is Used:**  
   - Homepage: `app/page.js` (Section 08, anchor `#contact-location`).
   - Also active on `/home` via `app/home/page.js`.
   - Destination of the `/contact` redirect (in `next.config.mjs`, `/contact` redirects to `/#contact-cta`).

4. **Fields Currently Collected:**  
   - `fullName`: `string` — Visitor name
   - `email`: `string` — Visitor email (**marked required**)
   - `phoneNumber`: `string` — Visitor phone number
   - `interestedIn`: `string` — Select dropdown (defaults to `'General Enquiry'`)
   - `message`: `string` — Visitor message (optional)
   - `source`: Appends metadata: `'Corporate Home Page Get In Touch Form'`

5. **Validation Currently Implemented:**  
   - `fullName`: Required (`!formData.fullName.trim()`).
   - `email`: Required (`!formData.email.trim()`) and regex `/^\S+@\S+\.\S+$/`.
   - `phoneNumber`: Required; strips all non-digits (`\D`) and enforces length `>= 10`.
   - `interestedIn`: Defaults to `'General Enquiry'`.

6. **What Happens When User Submits:**  
   - Validates fields locally; displays inline red validation text.
   - Sets `isSubmitting = true` with spinner.
   - Calls `submitEnquiry({ ...formData, source: 'Corporate Home Page Get In Touch Form' })`.
   - Replaces form column with a "Thank you for reaching out" success card containing a "Send another inquiry" button.

7. **Whether Submission Currently Reaches a Backend:**  
   - **No.**

8. **Whether It Currently Stores Data Anywhere:**  
   - **No.**

9. **Duplicate Forms or Duplicated Enquiry Logic:**  
   - Re-implements form state, validation, and submission handling that duplicates `EnquiryModal.js` with slightly different validation constraints.

10. **Existing API / Server Action That Could Be Reused:**  
    - Calls `submitEnquiry()` in `lib/enquiry.js`.

---

### Entry Point 3: Floating "Enquire Now" Conversion Button

1. **File Path:** `components/ui/FloatingEnquiryButton.js`
2. **Component Name:** `FloatingEnquiryButton`
3. **Route / Page Where Used:** Global (`app/layout.js`). Appears fixed bottom-center once user scrolls past the hero section. Auto-hides when entering footer/contact areas, on scroll-down on the home page, or when the mobile menu is open.
4. **Fields Collected:** None directly.
5. **Validation:** None.
6. **Submission Behavior:** Triggers `openEnquiryModal('General Enquiry', e.currentTarget)`. Opens `EnquiryModal` with "General Enquiry" preselected.
7. **Reaches Backend:** N/A (delegated to modal).
8. **Stores Data:** No.
9. **Duplicate Logic:** None.
10. **API Reusability:** N/A.

---

### Entry Point 4: Floating WhatsApp Action Button

1. **File Path:** `components/ui/WhatsAppButton.js`
2. **Component Name:** `WhatsAppButton`
3. **Route / Page Where Used:** Global (`app/layout.js`). Fixed bottom-right pill.
4. **Fields Collected:** None.
5. **Validation:** None.
6. **Submission Behavior:** Direct link via `<a>` tag to `getWhatsAppUrl()` in `data/company.js`. Opens WhatsApp Web or mobile app in a new tab:  
   `https://wa.me/9902096969?text=Hello%20Earth%20Heritage...`  
   Never opens the modal or submits form data.
7. **Reaches Backend:** No.
8. **Stores Data:** No.
9. **Duplicate Logic:** Shared WhatsApp URL logic with `HomeContactLocation`.
10. **API Reusability:** None.

---

### Entry Point 5: Header Navigation "Talk to Us" Buttons

1. **File Paths:**
   - Desktop Header: `components/layout/Header.js` (Line 187)
   - Mobile Menu Drawer: `components/layout/MobileMenu.js` (Line 273)
2. **Component Names:** `Header`, `MobileMenu`
3. **Route / Page Where Used:** All standard pages (hidden on isolated `/lp/*` pages).
4. **Fields Collected:** None directly.
5. **Validation:** None.
6. **Submission Behavior:** Calls `openEnquiryModal('General Enquiry', e.currentTarget)`. (Mobile menu closes drawer before opening modal).
7. **Reaches Backend:** N/A.
8. **Stores Data:** No.
9. **Duplicate Logic:** None.
10. **API Reusability:** N/A.

---

### Entry Point 6: Complete Registry of All 19 CTA Triggers Calling `openEnquiryModal`

| # | File Path | Component | Route / Page | CTA Button Text | Interest Parameter Sent |
|---|-----------|-----------|--------------|-----------------|-------------------------|
| 1 | `components/sections/landing/HeroSection.js` | `HeroSection` | `/` (Homepage) | "CONTACT US" | `'General Enquiry'` |
| 2 | `components/ui/FloatingEnquiryButton.js` | `FloatingEnquiryButton` | Global (`app/layout.js`) | "Enquire Now" | `'General Enquiry'` |
| 3 | `components/layout/Header.js` | `Header` | Global Navbar | "Talk to Us" | `'General Enquiry'` |
| 4 | `components/layout/MobileMenu.js` | `MobileMenu` | Global Drawer | "Talk to Us" | `'General Enquiry'` |
| 5 | `components/sections/landing/FinalCtaSection.js` | `FinalCtaSection` | `/lp/managed-farmland` | "Talk to Earth Heritage" | `'Farm Management'` |
| 6 | `components/sections/landing/ManagedFarmlandHero.js` | `ManagedFarmlandHero` | `/lp/managed-farmland` | "Talk to Us" | `'Managed Farmland'` |
| 7 | `components/sections/managed-farmland/ManagedFarmlandCta.js` | `ManagedFarmlandCta` | `/managed-farmland` | "Talk to Us" | `'Managed Farmland'` |
| 8 | `components/sections/managed-farmland/ManagedFarmlandFaq.js` | `ManagedFarmlandFaq` | `/managed-farmland` | "Talk to Earth Heritage →" (FAQ 8) | `'Managed Farmland'` |
| 9 | `components/sections/about/FaqSection.js` | `FaqSection` | `/about` | "Open Enquiry Form →" (FAQ 6) | `'General Enquiry'` |
| 10 | `components/sections/how-it-works/HowItWorksCta.js` | `HowItWorksCta` | `/how-it-works` | "Talk to Us" | `'How It Works'` |
| 11 | `components/sections/projects/ProjectsCta.js` | `ProjectsCta` | `/projects` | "Talk to Us" | `'Projects Inquiry'` |
| 12 | `components/projects/ProjectDetailCta.js` | `ProjectDetailCta` | `/projects/[slug]` | "Talk to Us" | `project.enquiryInterest` or `'Project Inquiry'` |
| 13 | `components/sections/home/HomeEvents.js` | `HomeEvents` | `/` (Homepage) | "Schedule Attendance / Enquire" | `` `Event Attendance: ${evt.title}` `` |
| 14 | `components/events/EventDetailBody.js` | `EventDetailBody` | `/events/[slug]` | "Schedule Attendance" | `` `Event Attendance: ${event.title}` `` |
| 15 | `components/events/EventsClosingCta.js` | `EventsClosingCta` | `/events` | "Schedule an Estate Visit" | `'Event & Estate Visit Enquiry'` |
| 16 | `components/sections/campaigns/CampaignHeader.js` | `CampaignHeader` | `/lp/*` | "Enquire Now" | `campaignInterest` (default `'Managed Farmland'`) |
| 17 | `components/sections/farm-management/FarmManagementCta.js` | `FarmManagementCta` | Unmounted component | "Talk to Us" | `'Farm Management'` |
| 18 | `components/sections/gallery/GalleryCta.js` | `GalleryCta` | Unmounted component | "Talk to Us" | `'Gallery'` |
| 19 | `components/blogs/BlogDetailCta.js` | `BlogDetailCta` | Unmounted component | "Talk to Us" | `enquirySubject` (default `'Editorial Insight Discussion'`) |

---

### Entry Point 7: Site Visit & Event Inquiries

- **Audit Result:** There is **no separate site visit booking form or dedicated database entity**.
- All estate walkthrough and event attendance actions ("Schedule an Estate Visit", "Schedule Attendance") trigger `openEnquiryModal()` with specific strings such as:
  - `'Event Attendance: <Event Title>'`
  - `'Event & Estate Visit Enquiry'`
- These submissions flow directly through the standard enquiry pipeline.

---

### Entry Point 8: Contact Route Audit

- **Audit Result:** There is **no `/app/contact` route or page file**.
- In `next.config.mjs` (line 15):
  ```javascript
  { source: '/contact', destination: '/#contact-cta', permanent: false }
  ```
- All navigation links targeting `/contact` redirect visitors to the homepage Section 08 anchor directly above `HomeContactLocation`.

---

### Entry Point 9: Central Company Configuration (`data/company.js`)

- **File Path:** `data/company.js`
- **Contact Ground Truth Record:**
  ```javascript
  contact: {
    email: 'earthheritageit@gmail.com',
    phone: '9902096969',
    phoneDisplay: '+91 99020 96969',
    address: '4,5,6, BBMP Khata, SAMRUDDI “ No3, No 565/769, GIDADAKONENAHALLI MAIN ROAD, Nagarbhavi, Bengaluru, Karnataka 560091',
    whatsappNumber: '9902096969',
    whatsappDefaultMessage: 'Hello Earth Heritage, I would like to know more about your managed farmland and farm management services.'
  }
  ```
- **Helper Function:** `getWhatsAppUrl()`
  - Checks `process.env.NEXT_PUBLIC_WHATSAPP_URL` or `process.env.NEXT_PUBLIC_WHATSAPP_NUMBER`.
  - Falls back to `companyData.contact.whatsappNumber` (`9902096969`).
  - Encodes the default message and returns:  
    `https://wa.me/9902096969?text=Hello%20Earth%20Heritage...`

---

### Entry Point 10: Existing API Routes, Server Actions, & Storage

- **API Routes:** None (`app/api` directory does not exist).
- **Server Actions:** None (`'use server'` is not used anywhere in the project).
- **Environment Variables:** No `.env`, `.env.local`, or `.env.production` files exist in the project root.
- **Client Storage:** Neither `localStorage` nor `sessionStorage` is used.
- **Temporary / Mock Logic:** Located in `lib/enquiry.js`:
  ```javascript
  export async function submitEnquiry(payload) {
    const endpoint = process.env.NEXT_PUBLIC_ENQUIRY_API_ENDPOINT;
    if (endpoint) {
      // Live fetch POST implementation ready for endpoint
      ...
    }
    // Preview Mode: No backend endpoint configured yet
    await new Promise((resolve) => setTimeout(resolve, 600));
    if (process.env.NODE_ENV !== 'production') {
      console.info('[Enquiry Service - Preview Ready] Captured payload:', payload);
    }
    return {
      success: true,
      mode: 'preview_ready',
      message: 'Enquiry form verified and ready for backend integration.'
    };
  }
  ```

---

## Section 2: BACKEND READINESS AUDIT SUMMARY

### 1. Forms Found
| Form Component | File Location | Mounting / Route | Nature |
|---|---|---|---|
| `EnquiryModal` | `components/ui/EnquiryModal.js` | Global (`app/layout.js`) | Floating modal triggered from 19 CTAs |
| `HomeContactLocation` | `components/sections/home/HomeContactLocation.js` | Homepage Section 08 (`/`, `/home`) | Static on-page form |

---

### 2. Fields Found Across Forms
| Field Name | Type | `EnquiryModal` | `HomeContactLocation` | Discrepancy / Alignment |
|---|---|---|---|---|
| `fullName` | `text` | Required (min 2 chars) | Required (`!trim()`) | Functionally aligned |
| `phoneNumber` | `tel` | Required (7 to 15 digits) | Required (>= 10 digits) | **Validation discrepancy** |
| `email` | `email` | **Optional** (validated if provided) | **Required** (validated always) | **Requirement discrepancy** |
| `interestedIn` | `select` | Required (4 predefined options) | Required (4 predefined options) | Aligned dropdown values |
| `message` | `textarea` | Optional | Optional | Aligned |
| `source` | `string` | Not included | `'Corporate Home Page Get In Touch Form'` | **Missing in Modal** |

---

### 3. Existing Submission Flow Diagram

```
[User clicks CTA button (Navbar / Hero / Section / Floating Button)]
                     │
                     ▼
        [openEnquiryModal(interest)]
                     │
                     ▼
          [EnquiryModal Opens]               [HomeContactLocation Form]
                     │                                   │
                     └───────────────┬───────────────────┘
                                     │
                                     ▼
                    [Client-side Form Validation]
                                     │
                                     ▼
                       [submitEnquiry(payload)]
                         (in lib/enquiry.js)
                                     │
                     ┌───────────────┴───────────────┐
                     ▼                               ▼
     (If NEXT_PUBLIC_ENQUIRY_API_ENDPOINT)    (Current Status: Unset)
                     │                               │
            [HTTP POST to Endpoint]           [Simulate 600ms latency]
                     │                        [console.info in dev]
                     │                        [Return preview_ready]
                     │                               │
                     └───────────────┬───────────────┘
                                     ▼
                    [Display UI Success Confirmation]
```

---

### 4. Existing Backend / API Status
- **Backend Connection:** Inactive (No backend connected).
- **Database:** None configured.
- **API Endpoints:** None (`/api/*` does not exist).
- **Server Actions:** None.
- **Client Storage:** None (zero usage of `localStorage` / `sessionStorage`).

---

### 5. Duplicate Logic That Should Eventually Be Consolidated
1. **Email Requirement Discrepancy:**  
   `EnquiryModal` treats `email` as optional to facilitate quick mobile phone lead generation. `HomeContactLocation` enforces `email` as strictly required. For the database, `email` must be nullable so modal leads are never rejected.
2. **Phone Number Sanitization Discrepancy:**  
   `EnquiryModal` accepts international formatting with leading `+` and 7-15 digits. `HomeContactLocation` requires at least 10 pure digits. A single shared validation/sanitization utility in `lib/enquiry.js` should normalize phone numbers into E.164 format.
3. **Interest Values vs Dropdown Options:**  
   Predefined options in `ENQUIRY_INTEREST_OPTIONS` are:  
   `['Managed Farmland', 'Farm Management', 'Land Ownership', 'General Enquiry']`.  
   However, various CTA buttons pass dynamic interests such as `'Event Attendance: ...'`, `'Projects Inquiry'`, or `'Event & Estate Visit Enquiry'`. In `EnquiryModal`, passing a custom string sets the internal state, but because the `<select>` element contains only the 4 fixed `<option>` items, the UI dropdown does not display custom option titles unless dynamically added.
4. **Source & Context Tracking:**  
   `HomeContactLocation` sets `source: 'Corporate Home Page Get In Touch Form'`, but `EnquiryModal` sends no source tag or current page URL.

---

### 6. Recommended Single Enquiry Data Structure

Based strictly on existing fields and operational metadata in use across the project, the recommended single consolidated database schema for Earth Heritage is:

```javascript
/**
 * Canonical Earth Heritage Enquiry Schema
 * Table: enquiries
 */
const enquirySchema = {
  // Primary Key
  id: "uuid",                          // PRIMARY KEY, DEFAULT gen_random_uuid()

  // 1. Core Contact Information (Currently collected)
  fullName: "string",                  // text, NOT NULL (Visitor's full name)
  phoneNumber: "string",               // text, NOT NULL (Sanitized phone number)
  email: "string | null",              // text, NULLABLE (Optional to accommodate both forms)

  // 2. Enquiry Classification (Currently collected)
  interestedIn: "string",              // text, NOT NULL (e.g. 'Managed Farmland', 'Farm Management', 'Event Attendance...')
  message: "string | null",            // text, NULLABLE (Visitor message note)

  // 3. Attribution & Tracking Metadata (Recommended)
  source: "string",                    // text, NOT NULL (e.g. 'Enquiry Modal', 'Home Contact Form', 'Floating CTA')
  pageUrl: "string | null",            // text, NULLABLE (Window pathname at time of submission)

  // 4. Operational & Workflow Management
  status: "string",                    // text, DEFAULT 'new' ('new', 'contacted', 'qualified', 'closed')
  createdAt: "timestamp with time zone"// timestamptz, DEFAULT now()
};
```

---

## Conclusion & Architecture Readiness

The Earth Heritage frontend is in an optimal state for backend implementation:
- **Clean Separation:** UI components do not attempt direct HTTP requests or database connections.
- **Single Convergence Point:** Both forms route submissions through `submitEnquiry()` in `lib/enquiry.js`.
- **Zero Breaking Risk:** When Supabase and the backend API route are introduced, backend integration can be achieved cleanly inside `lib/enquiry.js` (or via a dedicated Next.js Route Handler `/api/enquiries`) without modifying any layout, design, or component structure.
