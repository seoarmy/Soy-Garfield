# SoyGarfield — Full SEO Audit Report
**Date:** April 20, 2026 | **Domain:** https://soygarfield.com | **Stack:** React + Vite SPA, Sanity CMS, Firebase Hosting

---

## Executive Summary

### Overall SEO Health Score: 44 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 38/100 | 8.4 |
| Content Quality / E-E-A-T | 23% | 61/100 | 14.0 |
| On-Page SEO | 20% | 55/100 | 11.0 |
| Schema / Structured Data | 10% | 30/100 | 3.0 |
| Performance (CWV) | 10% | 20/100 | 2.0 |
| AI Search Readiness (GEO) | 10% | 38/100 | 3.8 |
| Images | 5% | 40/100 | 2.0 |
| **TOTAL** | | | **44.2** |

### Business Type Detected
Personal brand / digital publication — SEO & AI niche, Spanish-language, single primary author (Pietro Fiorillo), consulting monetization via contact form.

### Top 5 Critical Issues
1. **Pure CSR SPA** — Googlebot and all AI crawlers receive empty HTML; no SSR/SSG/prerendering
2. **All contact/newsletter/write forms are fake** — submissions go nowhere; active user deception
3. **Tailwind CDN script in production build** — render-blocking, not production-ready
4. **Article schema emits invalid JSON-LD array** — not a valid JSON-LD document
5. **Organization logo is a person portrait** — blocks Google News and Top Stories eligibility

### Top 5 Quick Wins (< 1 hour each)
1. Add `public/llms.txt` for AI crawler discovery
2. Fix mixed-case slug in `sitemap.xml` line 82
3. Add security headers block to `firebase.json`
4. Fix duplicate `og:type` in `SEO.tsx`
5. Change `og:locale` from `es_ES` to `es_AR`

---

## Section 1: Technical SEO

**Score: 38 / 100**

### C-1 [CRITICAL] Pure CSR SPA — Googlebot Cannot Reliably Index Content

`index.html` delivers an empty `<div id="root"></div>`. Every page title, meta description, canonical tag, Open Graph tag, article body, and JSON-LD schema block is injected by React at runtime via `react-helmet-async`. Sanity content requires a second async API call on top of JS execution.

All AI crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, anthropic-ai) are permitted by `robots.txt` but receive empty HTML and index nothing. Googlebot defers JS rendering to a second wave with quota limits — fresh articles may not be indexed for days or weeks.

Firebase catch-all rewrite (`"source": "**", "destination": "/index.html"`) means every URL returns byte-for-byte identical raw HTML, creating canonical collapse risk.

**Fix:** Migrate to SSR/SSG. Options in priority order:
1. Next.js App Router (ISR for articles, SSG for static pages)
2. `vite-plugin-prerender` — build-time snapshots from Sanity for known routes
3. Prerender.io / Rendertron proxy as stopgap (Firebase rewrite to Cloud Function for bot user agents)

### C-2 [CRITICAL] No 404 Route — All Invalid URLs Return HTTP 200 (Soft 404)

No `<Route path="*">` catch-all exists in `App.tsx`. Firebase rewrite delivers `index.html` with HTTP 200 for nonexistent URLs. React renders nothing. The `ArticleDetail` not-found state displays "Artículo no encontrado" with HTTP 200.

**Fix:**
```tsx
// App.tsx — add inside <Routes>
<Route path="*" element={<NotFound />} />
```
Also add `<meta name="robots" content="noindex">` in the NotFound component as partial mitigation (cannot return HTTP 404 from Firebase SPA rewrite without a Cloud Function).

### H-1 [HIGH] Zero HTTP Security Headers

`firebase.json` has no `headers` block. The site ships with none of: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`.

**Fix — add to `firebase.json`:**
```json
"headers": [
  {
    "source": "**",
    "headers": [
      { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
      { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
      { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains; preload" }
    ]
  }
]
```

### H-2 [HIGH] Sitemap: Mixed-Case Slug + Stale lastmod + Manual Maintenance

- `sitemap.xml` line 82: `Ia-obliga-seo-a-pasar-del-ranking-a-la-demanda` — capital "I" is case-sensitive URL mismatch
- All 18 `<lastmod>` dates are February 2026; today is April 20, 2026
- Sitemap is manually edited and will drift further from Sanity data

**Fix:** Generate `sitemap.xml` programmatically at build time from Sanity. Add to `package.json`:
```json
"build": "node scripts/generate-sitemap.js && vite build"
```
GROQ for sitemap generation: `*[_type == "article"]{ "slug": slug.current, _updatedAt }`

### M-1 [MEDIUM] Canonical Tag Only Exists Post-JS-Render

`SEO.tsx` emits `<link rel="canonical">` via `react-helmet-async`. Raw HTML has none. If Googlebot fails to render, it self-selects the canonical (usually the crawled URL — but can be `/` via Firebase catch-all).

Also: duplicate `og:type` emitted on article pages — `SEO.tsx` line 65 sets it unconditionally, line 93 sets it again inside the article block.

**Fix:** Remove the duplicate `og:type` from the article-specific block (line 93). The conditional on line 65 `{article ? 'article' : 'website'}` already handles it.

### M-2 [MEDIUM] `og:locale` Set to `es_ES` — Should Be `es_AR`

`SEO.tsx` line 73: `content="es_ES"`. Site is Argentinian. Affects social platform geographic targeting.

**Fix:** Change to `es_AR` in `components/SEO.tsx`.

### M-3 [MEDIUM] Sitemap Missing Routes

`/privacy`, `/terms`, `/author/:slug` pages absent. Author profile pages are indexable content.

### M-4 [MEDIUM] No `llms.txt`

No `public/llms.txt`. For an SEO/AI publication, the absence is a credibility and discovery gap.

**Fix:** See GEO section below.

### M-5 [MEDIUM] Route Param Named `:id` Used as Slug

`App.tsx` line 42: `path="/article/:id"`. Used as a slug in `getArticleBySlug(id)`. Misleading naming, commented workaround already in `ArticleDetail.tsx` line 149.

**Fix:** Rename `:id` → `:slug` in `App.tsx` and update `useParams()` in `ArticleDetail.tsx`.

### L-1 [LOW] `/write` and Utility Pages Not Disallowed

`robots.txt` allows all paths including the contributor submission form at `/write`. Minor crawl budget dilution.

### L-2 [LOW] No IndexNow Protocol

No Bing/Yandex instant indexing on article publish. Implement via Sanity webhook → `api.indexnow.org`.

---

## Section 2: Content Quality / E-E-A-T

**Score: 61 / 100**

### C-1 [CRITICAL] Newsletter Forms Are Non-Functional — Active User Deception

`Home.tsx` line 208:
```tsx
onSubmit={(e) => { e.preventDefault(); alert('¡Suscrito!'); }}
```

Three separate newsletter forms (Home, ArticleDetail sidebar, CategoryPage sidebar) display a fake subscription confirmation. Users are told they've been subscribed when no data is transmitted. GDPR exposure: collecting email under false pretenses.

`+75,000 lectores` claim in `ArticleDetail.tsx` line 481 — unverifiable subscriber count displayed next to the fake form is a compounded trust violation.

**Fix:** Integrate a real ESP (Mailchimp, Brevo, Resend, MailerLite) or remove all three forms.

### C-2 [CRITICAL] Contact Form Is Simulated — No Data Transmitted

`Contact.tsx` lines 22–31: `handleSubmit` runs a `setTimeout` then shows "¡Mensaje enviado!" claiming "te responderemos en menos de 24 horas." No data is sent anywhere. Users attempting to reach Pietro for consulting will wait in silence.

**Fix:** Wire to EmailJS, Formspree, or a Firebase Cloud Function sending to `marketing@manyadigital.com.ar`.

### C-3 [CRITICAL] Write/Contributor Form Is Also Simulated

`Write.tsx` lines 25–29: Same `setTimeout` pattern. All three user-facing forms share fake submission logic.

### H-1 [HIGH] Hidden H1 on Homepage

`Home.tsx` line 93: `<h1 className="sr-only">Noticias de SEO & IA</h1>`. Visually hidden from users, visible to crawlers. Pattern risks being flagged as manipulative at scale. Most prominent visual element is a dynamic article card, not a publication identity heading.

**Fix:** Make an editorial mission statement or publication identity H1 visible in the hero area.

### H-2 [HIGH] `dateModified` Always Equals `datePublished`

`ArticleDetail.tsx` lines 247–248: Both set to `articleData.date`. Articles never signal they've been updated. Impacts freshness signals for Google News and Top Stories.

**Fix:** Add `_updatedAt` to Sanity GROQ query → map to `updatedAt` field → use `articleData.updatedAt || isoDate` for `dateModified`.

### H-3 [HIGH] Article Tags Not Passed as `keywords` Meta

`Article` type has `tags` array. `SEO.tsx` accepts `keywords` prop. `ArticleDetail.tsx` renders tags visually but never passes them to SEO component. Missed connection.

**Fix:** In `ArticleDetail.tsx` SEO component call, add:
```tsx
keywords={articleData.tags?.join(', ')}
```

### M-1 [MEDIUM] Category Pages Have No Editorial Introduction

`CategoryPage.tsx` renders article card list with no unique editorial copy per category. Thin content risk. Each category (SEO, IA) needs a 100–150 word editorial description.

### M-2 [MEDIUM] Static Reading Progress Bar at 33%

`ArticleDetail.tsx` line 295: `w-1/3` hardcoded. Never responds to scroll. Looks broken to technical readers.

**Fix:**
```tsx
const [progress, setProgress] = useState(0);
useEffect(() => {
  const handleScroll = () => {
    const el = document.documentElement;
    setProgress((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
// JSX:
<div style={{ width: `${progress}%` }} className="h-full bg-garfield-500 transition-all duration-300" />
```

### M-3 [MEDIUM] `/write` Link in Contact Sidebar Mislabeled

`Contact.tsx` line 170: Link label "Solicitar Auditoría" routes to `/write` (contributor form). Wrong destination.

### M-4 [MEDIUM] `+75,000 lectores` Claim Unverifiable

`ArticleDetail.tsx` line 481. If the number is not real, this is QRG misinformation. Remove or add social proof link.

### L-1 [LOW] Default Author Fallback Is a Real Person's Name

`SEO.tsx` default `author = 'Pietro Fiorillo'`. If guest articles ever lack an author field, they'll be falsely attributed. Change fallback to "Equipo Editorial SoyGarfield".

### L-2 [LOW] `ExternalPublications` Field Is Highest-Priority E-E-A-T Asset

If Pietro has published on Semrush, Ahrefs, Search Engine Journal, or Spanish-language equivalents, populating this Sanity field is the highest-leverage E-E-A-T action available.

---

## Section 3: Schema / Structured Data

**Score: 30 / 100**

### C-1 [CRITICAL] Article Schema Emits Invalid JSON-LD Array

`ArticleDetail.tsx` line 257: `const combinedSchema = [articleSchema, breadcrumbSchema]`. `JSON.stringify([...])` produces a bare JSON array — not a valid JSON-LD document. Google's Rich Results Test will reject it.

**Fix:** Merge into a single `@graph` document:
```ts
const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [articleSchema, breadcrumbSchema]
};
// Remove @context from individual schema objects
```

### C-2 [CRITICAL] Publisher `@type: Organization` Named "Pietro Fiorillo"

`ArticleDetail.tsx` lines 239–244: `@type: Organization`, `name: "Pietro Fiorillo"`. A person name on an Organization type is semantically invalid and contradicts the `"name": "Soy Garfield"` Organization node in Home.tsx.

**Fix:**
```json
"publisher": {
  "@type": "Organization",
  "@id": "https://soygarfield.com/#organization",
  "name": "Soy Garfield",
  "logo": {
    "@type": "ImageObject",
    "url": "https://soygarfield.com/logo-soygarfield.png",
    "width": 600,
    "height": 60
  }
}
```

### C-3 [CRITICAL] Organization Logo Is a Person Portrait

`Home.tsx` line 78 + `ArticleDetail.tsx` line 244: `"url": "https://soygarfield.com/assets/pietro.png"`. Google's logo spec requires a publication logo (up to 600×60px, wide format). A portrait photo fails Google News Publisher Center validation, blocking Top Stories eligibility.

**Fix:** Create a horizontal logo asset `public/logo-soygarfield.png` at 600×60px or similar. Update all three schema locations.

### H-1 [HIGH] Article `image` Is a Bare String, Not an ImageObject

`ArticleDetail.tsx` line 233: `"image": articleData.imageUrl`. Google strongly recommends an `ImageObject` with explicit `width` and `height` for Top Stories.

**Fix:**
```json
"image": {
  "@type": "ImageObject",
  "url": "https://cdn.sanity.io/...",
  "width": 1200,
  "height": 675
}
```

### H-2 [HIGH] BreadcrumbList Category URL Invalid for Some Categories

`ArticleDetail.tsx` line 218: `.toLowerCase()` on categories. `"Social Media"` → `/category/social media` (URL with space). `"Analítica"` → `/category/analítica` (non-ASCII). Both are invalid URLs in schema.

**Fix:**
```ts
const categorySlugMap: Record<string, string> = {
  'SEO': 'seo', 'IA': 'ia',
  'Social Media': 'social-media', 'Analítica': 'analitica',
};
"item": `${baseUrl}/category/${categorySlugMap[articleData.category] || articleData.category.toLowerCase()}`
```

### M-1 [MEDIUM] Default WebSite Schema Uses `@type: Person` as Publisher

`SEO.tsx` lines 117–127: Fallback schema uses `@type: Person`. Home.tsx overrides with Organization. Inconsistency fragments entity signal.

**Fix:** Align default WebSite publisher to `@type: Organization, name: "Soy Garfield"`.

### M-2 [MEDIUM] `window.location.href` in About.tsx Schema

`About.tsx` line 103: SSR-unsafe and may vary with query params.

**Fix:** Hardcode `"url": "https://soygarfield.com/about"`.

### M-3 [MEDIUM] Organization Schema Missing Key Properties

`Home.tsx` Organization node missing: `description`, `foundingDate`, `contactPoint`, `inLanguage`. Reduces Knowledge Panel generation.

### Info-1 Consider `NewsArticle` Type

Site presents as news media. `NewsArticle` (subtype of `Article`) increases Google News eligibility. Fully backward compatible — add to existing `@type`.

### Info-2 No `speakable` Schema

`speakable` directly signals which content sections are suitable for AI Overview extraction. High ROI addition to `ArticleDetail.tsx`.

```json
"speakable": {
  "@type": "SpeakableSpecification",
  "cssSelector": ["h1", "h2"]
}
```

---

## Section 4: Performance

**Score: 20 / 100**

### C-1 [CRITICAL] Tailwind CDN Script in Production Build

`dist/index.html` confirms the CDN tag shipped to Firebase:
```html
<script src="https://cdn.tailwindcss.com"></script>
```

Impact: ~350KB runtime JS, render-blocking, MutationObserver scanning on every React re-render, documented "not for production" by Tailwind team. LCP regression of 1.5s+ on mobile.

**Fix:**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
Move `tailwind.config` from inline `<script>` in `index.html` to `tailwind.config.js`. Import in `index.css`. Remove both `<script>` tags from `index.html`.

### H-1 [HIGH] Google Fonts Render-Blocking

`index.html` line 9: synchronous `<link rel="stylesheet">` for Google Fonts blocks all rendering. `preconnect` hints in `SEO.tsx` fire after React hydration — useless for initial parse.

**Fix (recommended):**
```bash
npm install @fontsource-variable/inter
```
```ts
// index.tsx
import '@fontsource-variable/inter';
```

**Fix (alternative):** Move `preconnect` to static `index.html`, load font non-blocking:
```html
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap">
<link rel="stylesheet" href="..." media="print" onload="this.media='all'">
```
Also remove weights 300 and 500 if unused.

### H-2 [HIGH] 465KB Monolithic JS Bundle — No Code Splitting

All 11 pages bundled into one file. Homepage loads `PortableText`, `CodeBlock`, all social share logic. Estimated 800ms–1.5s parse time on mid-range Android.

**Fix — `vite.config.ts`:**
```ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor-react': ['react', 'react-dom', 'react-router-dom'],
        'vendor-sanity': ['@sanity/client', '@sanity/image-url'],
        'vendor-portabletext': ['@portabletext/react'],
      }
    }
  }
}
```
```tsx
// App.tsx — lazy load non-critical routes
const ArticleDetail = React.lazy(() => import('./pages/ArticleDetail'));
const About = React.lazy(() => import('./pages/About'));
// wrap in <Suspense fallback={<Loader2 />}>
```

### H-3 [HIGH] Hero Image Missing `fetchpriority`, Dimensions, No WebP

- No `fetchpriority="high"` on LCP hero image in `Home.tsx` and `ArticleDetail.tsx`
- Images served as raw Sanity asset URLs — no WebP transform, no resize
- `SEO.tsx` preloads `seoImage` (defaults to `/pietro-og.png` on homepage) — wrong asset, wastes bandwidth

**Fix — `articleService.ts`:** Use `@sanity/image-url` transforms:
```ts
import imageUrlBuilder from '@sanity/image-url';
const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source).format('webp').quality(80);
// In GROQ: return mainImage reference, transform in service layer
```

**Fix — hero `<img>` tag:**
```tsx
<img src={mainStory.imageUrl} alt={mainStory.title}
  width={1200} height={675}
  fetchpriority="high" decoding="async"
  className="h-full w-full object-cover ..." />
```

### M-1 [MEDIUM] `useCdn: false` on Sanity Client

`services/sanity.ts`: Every API request goes to origin, adding 200–600ms TTFB.

**Fix:** `useCdn: true` for published content.

### M-2 [MEDIUM] `BreakingNewsTicker` Has No Height Reservation

Dynamic content injected above fold can push layout down on data load — CLS risk.

### M-3 [MEDIUM] All Images Missing `width`/`height` Attributes

Author avatars, compact sidebar thumbnails, PortableText inline images — none have explicit dimensions. CSS `aspect-ratio` classes cover main hero images but not avatars.

### L-1 [LOW] `console.log` in Production Sanity Client

**Fix — `vite.config.ts`:**
```ts
build: {
  terserOptions: { compress: { drop_console: true } }
}
```

### L-2 [LOW] `pietro-n2BRnsl9.png` Is 896KB in Build Output

**Fix:** Convert to WebP, compress to < 100KB.

### L-3 [LOW] Bogus Hero `<link rel="preload">` in SEO.tsx

`SEO.tsx` line 102 preloads `seoImage` (OG image), not the rendered hero image from Sanity. Wrong asset, wasted bandwidth. Remove or refactor to only fire for exact LCP element.

---

## Section 5: AI Search Readiness (GEO)

**GEO Score: 38 / 100**

| Platform | Estimated Visibility |
|---|---|
| Google AI Overviews | Very Low |
| ChatGPT Browse/Search | Very Low |
| Perplexity | Low |
| Bing Copilot | Very Low |

Root cause: CSR SPA. Every other GEO fix is blocked until pre-rendering exists. Even with fixes 2–5 below, the GEO ceiling is ~45/100 without server-rendered HTML.

### H-1 [HIGH] No `llms.txt`

Create `public/llms.txt`:
```
# SoyGarfield — Publicación de SEO e IA
> Medio especializado en SEO, Inteligencia Artificial y marketing digital en español.
> Fundado y dirigido por Pietro Fiorillo, consultor SEO y arquitecto de IA.

## Autor
Pietro Fiorillo — SEO Architect & AI Consultant
LinkedIn: https://www.linkedin.com/in/pietrofiorillo
Twitter/X: https://twitter.com/pietrofiorillo

## Categorías
- SEO técnico y local
- Inteligencia Artificial aplicada al marketing
- Optimización para motores de respuesta (GEO/AEO)

## Licencia
Contenido puede ser referenciado con atribución a "Pietro Fiorillo / SoyGarfield (soygarfield.com)".

## Sitemap
https://soygarfield.com/sitemap.xml
```

### H-2 [HIGH] No `speakable` Schema

Prevents content from appearing in Google Assistant responses and AI Overviews.

**Fix in `ArticleDetail.tsx` schema:**
```json
"speakable": {
  "@type": "SpeakableSpecification",
  "cssSelector": ["h1", "h2"]
}
```

### H-3 [HIGH] No FAQ / HowTo Schema

FAQ schema has the strongest correlation to Google AI Overview inclusion. The SEO/AI niche is ideal for it.

### M-1 [MEDIUM] Person Schema Missing Expertise Signals

`About.tsx` Person schema lacks `knowsAbout`, `alumniOf`. Add:
```json
"knowsAbout": [
  "Search Engine Optimization", "Generative Engine Optimization",
  "SEO Técnico", "SEO Local", "Inteligencia Artificial aplicada al Marketing"
]
```

### M-2 [MEDIUM] `sameAs` URLs Not Canonical Form

`Home.tsx` line 80: `https://linkedin.com/in/pietrofiorillo` — missing `www`. LinkedIn canonical uses `https://www.linkedin.com/`. Entity resolution fails.

### M-3 [MEDIUM] Mobile Nav Social Links Use `href="#"`

Placeholder dead links in Navbar confuse entity sameAs verification for AI crawlers.

### M-4 [MEDIUM] Article Schema Missing `articleBody`, `wordCount`, `inLanguage`

These fields improve AI passage extraction quality. Add `"inLanguage": "es"` at minimum.

---

## Section 6: Images

**Score: 40 / 100**

| Gap | Location | Fix |
|---|---|---|
| Raw Sanity URLs (no WebP/resize) | `articleService.ts` | `urlFor().format('webp').quality(80).width(1200)` |
| No `loading="lazy"` on below-fold images | `ArticleCard.tsx`, sidebars | Add `loading="lazy"` attribute |
| No responsive `srcset` | All `<img>` tags | Sanity URL params for 400w/800w/1200w |
| `pietro.png` is 896KB | `dist/assets/` | Convert to WebP, compress to <100KB |
| PortableText image alt not enforced | `ArticleDetail.tsx` line 67 | Add fallback: `alt={value.alt || value.caption || ''}` |
| OG fallback image path mismatch | `SEO.tsx` line 37 uses `/pietro-og.png`, schema uses `/assets/pietro.png` | Verify file exists in `public/` |

---

## Appendix: File Reference Map

| Issue | File | Line(s) |
|---|---|---|
| Empty HTML shell | [index.html](index.html) | 58 |
| Tailwind CDN (prod) | [index.html](index.html) | 8 |
| Google Fonts (render-blocking) | [index.html](index.html) | 9 |
| Firebase catch-all + no security headers | [firebase.json](firebase.json) | 9–12 |
| CSR SPA config | [vite.config.ts](vite.config.ts) | — |
| Missing 404 route | [App.tsx](App.tsx) | — |
| Route param named :id (is a slug) | [App.tsx](App.tsx) | 42 |
| Fake newsletter submission | [pages/Home.tsx](pages/Home.tsx) | 208 |
| H1 hidden sr-only | [pages/Home.tsx](pages/Home.tsx) | 93 |
| Hero image no fetchpriority | [pages/Home.tsx](pages/Home.tsx) | 103 |
| Organization logo = portrait | [pages/Home.tsx](pages/Home.tsx) | 78 |
| Fake contact form | [pages/Contact.tsx](pages/Contact.tsx) | 22–31 |
| /write mislabeled link | [pages/Contact.tsx](pages/Contact.tsx) | 170 |
| Fake write form | [pages/Write.tsx](pages/Write.tsx) | 25–29 |
| Array schema (invalid JSON-LD) | [pages/ArticleDetail.tsx](pages/ArticleDetail.tsx) | 257 |
| Publisher name "Pietro Fiorillo" as Org | [pages/ArticleDetail.tsx](pages/ArticleDetail.tsx) | 239–244 |
| dateModified = datePublished | [pages/ArticleDetail.tsx](pages/ArticleDetail.tsx) | 247–248 |
| Static progress bar w-1/3 | [pages/ArticleDetail.tsx](pages/ArticleDetail.tsx) | 295 |
| +75,000 lectores unverified | [pages/ArticleDetail.tsx](pages/ArticleDetail.tsx) | 481 |
| window.location.href in schema | [pages/About.tsx](pages/About.tsx) | 103 |
| Duplicate og:type | [components/SEO.tsx](components/SEO.tsx) | 65, 93 |
| og:locale es_ES → es_AR | [components/SEO.tsx](components/SEO.tsx) | 73 |
| Wrong preload asset | [components/SEO.tsx](components/SEO.tsx) | 102 |
| Default author = person name | [components/SEO.tsx](components/SEO.tsx) | 23 |
| Publisher @type Person (default schema) | [components/SEO.tsx](components/SEO.tsx) | 117–127 |
| useCdn: false | [services/sanity.ts](services/sanity.ts) | — |
| console.log in production | [services/articleService.ts](services/articleService.ts) | 27–29 |
| Mixed-case slug in sitemap | [public/sitemap.xml](public/sitemap.xml) | 82 |
| Stale sitemap (last: Feb 2026) | [public/sitemap.xml](public/sitemap.xml) | — |
