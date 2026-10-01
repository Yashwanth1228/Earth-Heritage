# Structured Data & Schema Audit Report: Earth Heritage
**Target**: `lib/schema.js`, Page Routes, Layouts, and `/projects/nairuthya-whispering-wood`  
**Date**: October 2026  
**Status**: Completed (Audit Only — Zero Code Modifications)

---

## 1. Executive Summary

This audit evaluates the implementation and usage of Schema.org structured data across Earth Heritage, focusing on the dynamic project page for **Nairuthya Whispering Wood** (`/projects/nairuthya-whispering-wood`).

### Core Findings
- **Site-Wide Schemas (Global)**: `Organization` and `WebSite` are injected at the root level via `app/layout.js`, appearing on every page.
- **Nairuthya Project Page Output**: Renders exactly 3 schemas: `Organization`, `WebSite`, and `Place`.
- **Zero Schema Duplication**: Local routes do not duplicate the site-level schemas.
- **Accuracy against Verified Facts**: The `Place` schema on Nairuthya Whispering Wood reflects the verified facts: **8 acres** and **25 premium plots**.
- **Unused Schema Functions**: `getBreadcrumbSchema()` and `getEventDetailSchema()` exist in `lib/schema.js` but are not called anywhere in the active application.

---

## 2. Files Inspected

### Schema Definition
- [`lib/schema.js`](file:///c:/Users/Admin/Desktop/Earth%20Heritage/lib/schema.js) — Central repository of all Schema.org generators.

### Layouts & Page Routes
- [`app/layout.js`](file:///c:/Users/Admin/Desktop/Earth%20Heritage/app/layout.js) — Root layout (renders global `Organization` and `WebSite` JSON-LD).
- [`app/page.js`](file:///c:/Users/Admin/Desktop/Earth%20Heritage/app/page.js) — Homepage (`/`).
- [`app/about/page.js`](file:///c:/Users/Admin/Desktop/Earth%20Heritage/app/about/page.js) — About page (`/about`).
- [`app/projects/page.js`](file:///c:/Users/Admin/Desktop/Earth%20Heritage/app/projects/page.js) — Projects catalog (`/projects`).
- [`app/projects/[slug]/page.js`](file:///c:/Users/Admin/Desktop/Earth%20Heritage/app/projects/%5Bslug%5D/page.js) — Dynamic project detail page (`/projects/nairuthya-whispering-wood`).
- [`app/blogs/page.js`](file:///c:/Users/Admin/Desktop/Earth%20Heritage/app/blogs/page.js) — Blogs catalog (`/blogs`).
- [`app/blogs/[slug]/page.js`](file:///c:/Users/Admin/Desktop/Earth%20Heritage/app/blogs/%5Bslug%5D/page.js) — Dynamic blog post page (`/blogs/[slug]`).
- [`app/events/page.js`](file:///c:/Users/Admin/Desktop/Earth%20Heritage/app/events/page.js) — Events hub (`/events`).
- [`app/lp/layout.js`](file:///c:/Users/Admin/Desktop/Earth%20Heritage/app/lp/layout.js) — Campaign landing page layout.

### Data Sources
- [`data/projects.js`](file:///c:/Users/Admin/Desktop/Earth%20Heritage/data/projects.js) — Single source of truth for project specifications.
- [`data/blogs.js`](file:///c:/Users/Admin/Desktop/Earth%20Heritage/data/blogs.js) — Blog articles and author profiles.
- [`data/events.js`](file:///c:/Users/Admin/Desktop/Earth%20Heritage/data/events.js) — Event schedules.

### Compiled Output
- `.next/server/app/projects/nairuthya-whispering-wood.html` — Production SSG HTML.

---

## 3. Usage Matrix of Schema Functions

| Function in `lib/schema.js` | Status | Where Called | Injected Schema Type |
| :--- | :--- | :--- | :--- |
| `getOrganizationSchema()` | **Active** | `app/layout.js` | `Organization` (Global site-wide) |
| `getWebSiteSchema()` | **Active** | `app/layout.js` | `WebSite` (Global site-wide) |
| `getProjectsCollectionSchema()` | **Active** | `app/projects/page.js` | `CollectionPage` with `ItemList` |
| `getProjectDetailSchema()` | **Active** | `app/projects/[slug]/page.js` | `Place` |
| `getBlogCollectionSchema()` | **Active** | `app/blogs/page.js` | `CollectionPage` with `ItemList` |
| `getBlogPostSchema()` | **Active** | `app/blogs/[slug]/page.js` | `BlogPosting` |
| `getEventsCollectionSchema()` | **Active** | `app/events/page.js` | `CollectionPage` with `ItemList` |
| `getBreadcrumbSchema()` | **Unused** | *None* | `BreadcrumbList` |
| `getEventDetailSchema()` | **Unused** | *None* (no `/events/[slug]` route exists) | `Event` |

---

## 4. Schemas Rendered by Route

### Route Breakdown

#### `/` (Home)
- `Organization` (Global via `app/layout.js`)
- `WebSite` (Global via `app/layout.js`)

#### `/about`
- `Organization` (Global via `app/layout.js`)
- `WebSite` (Global via `app/layout.js`)

#### `/projects`
- `Organization` (Global via `app/layout.js`)
- `WebSite` (Global via `app/layout.js`)
- `CollectionPage` (Local via `app/projects/page.js`) with confirmed project `ItemList`

#### `/projects/nairuthya-whispering-wood`
- `Organization` (Global via `app/layout.js`)
- `WebSite` (Global via `app/layout.js`)
- `Place` (Local via `app/projects/[slug]/page.js`)

#### `/blogs`
- `Organization` (Global via `app/layout.js`)
- `WebSite` (Global via `app/layout.js`)
- `CollectionPage` (Local via `app/blogs/page.js`) with blog `ItemList`

#### `/events`
- `Organization` (Global via `app/layout.js`)
- `WebSite` (Global via `app/layout.js`)
- `CollectionPage` (Local via `app/events/page.js`) with event `ItemList`

---

## 5. Detailed Audit for `/projects/nairuthya-whispering-wood`

### 5.1 JSON-LD Objects Output
Inspection of the production HTML reveals exactly 3 JSON-LD scripts:

#### 1. `Organization`
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://earthheritage.in/#organization",
  "name": "Earth Heritage Private Limited",
  "legalName": "Earth Heritage Private Limited",
  "alternateName": "Earth Heritage",
  "url": "https://earthheritage.in",
  "foundingDate": "2026-08-01",
  "slogan": "Own a piece of earth. Build a living legacy.",
  "description": "Earth Heritage brings together land ownership, professional farm management, nature, responsible stewardship, meaningful experiences, and long-term legacy. You own the land. We manage the farm."
}
```

#### 2. `WebSite`
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://earthheritage.in/#website",
  "url": "https://earthheritage.in",
  "name": "Earth Heritage Pvt. Ltd.",
  "description": "Earth Heritage brings together land ownership, professional farm management, nature, responsible stewardship, meaningful experiences, and long-term legacy. You own the land. We manage the farm.",
  "publisher": {
    "@id": "https://earthheritage.in/#organization"
  }
}
```

#### 3. `Place`
```json
{
  "@context": "https://schema.org",
  "@type": "Place",
  "@id": "https://earthheritage.in/projects/nairuthya-whispering-wood/#place",
  "name": "Nairuthya Whispering Wood",
  "url": "https://earthheritage.in/projects/nairuthya-whispering-wood",
  "description": "Explore Nairuthya Whispering Wood, an 8-acre managed farmland project in Honnasandra, Nelamangala, with 25 premium plots, plantations and farm-focused amenities.",
  "image": "https://earthheritage.in/images/projects/nairuthya-whispering-wood-hero.jpg",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Honnasandra · Nelamangala · Bengaluru",
    "addressCountry": "IN"
  }
}
```

### 5.2 Schema Type Verification Checklist for Nairuthya Page
- **Organization**: YES (rendered globally in root layout)
- **WebSite**: YES (rendered globally in root layout)
- **Place**: YES (rendered in project detail page)
- **BreadcrumbList**: NO (not called or rendered)
- **CollectionPage**: NO (only on listing hubs)
- **FAQPage / FAQ schema**: NO (cleanly absent)
- **Product / Offer**: NO (no e-commerce or commercial pricing schema)
- **Review / AggregateRating**: NO (no fake reviews or testimonials)
- **LocalBusiness**: NO

---

## 6. Duplicate Schema Findings

- **No Duplicate Schema Found**: 
  - `Organization` and `WebSite` exist exclusively in `app/layout.js`.
  - `Place` exists exclusively in `app/projects/[slug]/page.js`.
  - No script is rendered twice, either directly or through child components.

---

## 7. Breadcrumb Findings

- The function `getBreadcrumbSchema()` in `lib/schema.js` is currently **orphaned/unused**.
- Neither visible breadcrumbs nor `BreadcrumbList` structured data are output on `/projects/nairuthya-whispering-wood`.
- Google currently relies on the URL hierarchy: `https://earthheritage.in/projects/nairuthya-whispering-wood`.

---

## 8. Place Schema Findings & Factual Verification

- **8 Acres**: Confirmed present in `Place.description`.
- **25 Premium Plots**: Confirmed present in `Place.description`.
- **Honnasandra, Nelamangala**: Confirmed present in `Place.description` and `Place.address.addressLocality`.
- **Zero Hallucinated or Unrepresented Claims**:
  - The image points to the real hero photo.
  - The URL matches the canonical route.
  - No investment yields, returns, completion dates, or legal approvals are asserted in the schema.

---

## 9. Observations & Technical Considerations

1. **Unused Helpers in `lib/schema.js`**:
   - `getBreadcrumbSchema()`: Available if breadcrumb rich results are desired.
   - `getEventDetailSchema()`: Unused because no `/events/[slug]` dynamic routes exist.
2. **Address Locality Formatting**:
   - `addressLocality` in `Place.address` is currently `"Honnasandra · Nelamangala · Bengaluru"`. Schema.org allows splitting this into discrete `addressLocality: "Honnasandra, Nelamangala"` and `addressRegion: "Karnataka"` for formal postal taxonomy.
