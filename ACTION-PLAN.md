# SoyGarfield — SEO Action Plan
**Generated:** April 20, 2026 | **Overall Score: 44/100** | See FULL-AUDIT-REPORT.md for details

---

## CRITICAL — Fix Immediately (blocks indexing, destroys trust)

### 1. Wire all three forms to real submission backends
**Impact:** Trust / E-E-A-T / GDPR | **Effort:** 2–4h

All three forms use fake `setTimeout` or `alert()` instead of transmitting data:
- `pages/Home.tsx` line 208 — newsletter (+ sidebar forms in ArticleDetail, CategoryPage)
- `pages/Contact.tsx` lines 22–31 — main contact form
- `pages/Write.tsx` lines 25–29 — contributor form

Options: [EmailJS](https://www.emailjs.com/) (free tier, no backend), [Formspree](https://formspree.io/), Firebase Cloud Function → email to `marketing@manyadigital.com.ar`.

For newsletters: integrate Brevo (Sendinblue), Mailchimp, or MailerLite API. Remove unverifiable "+75,000 lectores" claim from `pages/ArticleDetail.tsx` line 481 until you can verify it.

### 2. Plan SSR/SSG migration (architecture decision)
**Impact:** All indexing, all GEO scores | **Effort:** 1–3 weeks

Current CSR SPA means Googlebot and all AI crawlers (ChatGPT, Perplexity, Claude, Bing) receive an empty `<div id="root"></div>`. This is the root cause behind the 38/100 technical score and 38/100 GEO score.

**Decision matrix:**

| Option | Effort | Result |
|---|---|---|
| Next.js App Router migration | High (1–2 weeks) | Best — ISR, built-in Head, Image optimization |
| `vite-plugin-prerender` | Medium (2–3 days) | Good — SSG for static routes + article slugs from Sanity at build time |
| Prerender.io proxy | Low (4–8h) | Stopgap — bot traffic gets pre-rendered HTML via Firebase rewrite |

Prerender.io is the fastest path to unblock indexing while Next.js migration is planned.

### 3. Remove Tailwind CDN, switch to PostCSS build pipeline
**Impact:** LCP -1.5s, INP -300ms | **Effort:** 2–3h

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
1. Copy `tailwind.config` from `index.html` inline `<script>` to `tailwind.config.js`
2. Create `index.css` with `@tailwind base; @tailwind components; @tailwind utilities;`
3. Import `index.css` in `index.tsx`
4. Remove both `<script>` tags (CDN src + inline config) from `index.html`

CSS output after purge: ~15–30KB vs ~350KB CDN runtime.

### 4. Fix Article schema: invalid JSON-LD array + wrong publisher
**Impact:** Rich results, Top Stories eligibility | **Effort:** 30min

`pages/ArticleDetail.tsx` line 257:
```ts
// BEFORE (invalid):
const combinedSchema = [articleSchema, breadcrumbSchema];

// AFTER (valid @graph):
const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",  // or "NewsArticle"
      "headline": articleData.seoTitle || articleData.title,
      "image": { "@type": "ImageObject", "url": articleData.imageUrl, "width": 1200, "height": 675 },
      "author": { "@type": "Person", "name": articleData.author, "url": `${baseUrl}${authorLink}` },
      "publisher": {
        "@type": "Organization",
        "@id": "https://soygarfield.com/#organization",
        "name": "Soy Garfield",
        "logo": { "@type": "ImageObject", "url": "https://soygarfield.com/logo-soygarfield.png", "width": 600, "height": 60 }
      },
      "datePublished": isoDate,
      "dateModified": articleData.updatedAt || isoDate,
      "description": articleData.seoDescription || articleData.excerpt,
      "isAccessibleForFree": "True",
      "inLanguage": "es",
      "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", "h2"] },
      "mainEntityOfPage": { "@type": "WebPage", "@id": `${baseUrl}/article/${articleData.slug}` }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": baseUrl },
        { "@type": "ListItem", "position": 2, "name": articleData.category, "item": `${baseUrl}/category/${categorySlugMap[articleData.category]}` },
        { "@type": "ListItem", "position": 3, "name": articleData.title, "item": `${baseUrl}/article/${articleData.slug}` }
      ]
    }
  ]
};
```

### 5. Create a real publication logo asset
**Impact:** Google News, Top Stories, Knowledge Panel | **Effort:** 30min

Create `public/logo-soygarfield.png` at 600×60px (horizontal lockup). Update all three schema locations:
- `pages/Home.tsx` line 78
- `pages/ArticleDetail.tsx` line 244
- `components/SEO.tsx` line 122

---

## HIGH — Fix Within 1 Week

### 6. Add security headers to `firebase.json`
**Effort:** 15min

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

### 7. Add 404 catch-all route
**Effort:** 30min

```tsx
// App.tsx — add inside <Routes>
import NotFound from './pages/NotFound';
<Route path="*" element={<NotFound />} />
```

Create `pages/NotFound.tsx` with `<meta name="robots" content="noindex">` in its SEO component.

### 8. Self-host Inter font (eliminate render-blocking Google Fonts)
**Effort:** 15min

```bash
npm install @fontsource-variable/inter
```
```ts
// index.tsx — add at top
import '@fontsource-variable/inter';
```
Remove `<link>` to `fonts.googleapis.com` from `index.html`. Move `preconnect` hints to static `index.html` if keeping CDN.

### 9. Code splitting — reduce homepage bundle from 465KB to ~100KB
**Effort:** 1–2h

`vite.config.ts` + lazy imports in `App.tsx`:
```ts
// vite.config.ts
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
// App.tsx
const ArticleDetail = React.lazy(() => import('./pages/ArticleDetail'));
const About = React.lazy(() => import('./pages/About'));
// wrap Routes in <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>}>
```

### 10. Hero image performance fixes
**Effort:** 30min

`pages/Home.tsx` line 103 and `pages/ArticleDetail.tsx` line 388:
```tsx
<img
  src={mainStory.imageUrl}
  alt={mainStory.title}
  width={1200}
  height={675}
  fetchpriority="high"
  decoding="async"
  className="h-full w-full object-cover ..."
/>
```
Enable Sanity CDN: `services/sanity.ts` → `useCdn: true`.
Remove bogus preload from `components/SEO.tsx` line 102 or refactor to only fire when `image` is the actual LCP element.

### 11. Fix sitemap: mixed-case slug + stale dates
**Effort:** 15min (manual fix) | Long-term: generate from Sanity at build time

**Immediate:** Change `public/sitemap.xml` line 82:
```xml
<!-- BEFORE: -->
<loc>https://soygarfield.com/article/Ia-obliga-seo-a-pasar-del-ranking-a-la-demanda</loc>
<!-- AFTER: -->
<loc>https://soygarfield.com/article/ia-obliga-seo-a-pasar-del-ranking-a-la-demanda</loc>
```
Update all `<lastmod>` dates.

**Long-term:** Generate `public/sitemap.xml` from Sanity at build time using `scripts/generate-sitemap.js` (already referenced in `package.json` prebuild).

### 12. Quick SEO fixes (batch together, ~30min total)

| Fix | File | Change |
|---|---|---|
| `og:locale` es_ES → es_AR | `components/SEO.tsx` line 73 | `content="es_AR"` |
| Remove duplicate `og:type` | `components/SEO.tsx` line 93 | Delete the article-specific `og:type` line |
| Fix `window.location.href` in schema | `pages/About.tsx` line 103 | `"url": "https://soygarfield.com/about"` |
| Fix `/write` link label | `pages/Contact.tsx` line 170 | Change label to match destination |
| Fix `sameAs` LinkedIn URL | `pages/Home.tsx` line 80 | `https://www.linkedin.com/in/pietrofiorillo` |
| Pass tags as keywords | `pages/ArticleDetail.tsx` | Add `keywords={articleData.tags?.join(', ')}` to SEO component |
| Rename route param :id → :slug | `App.tsx` line 42, `ArticleDetail.tsx` line 149 | Update useParams key |

---

## MEDIUM — Fix Within 1 Month

### 13. Create `public/llms.txt`
**Effort:** 30min | **Impact:** High for GEO/AI visibility

See template in FULL-AUDIT-REPORT.md Section 5 H-1.

### 14. Add `_updatedAt` to Sanity article schema → `dateModified`
**Effort:** 1h

1. Add `_updatedAt` to GROQ query in `services/articleService.ts` `getArticleBySlug`
2. Add `updatedAt?: string` to `Article` type in `types.ts`
3. Use in schema: `"dateModified": articleData.updatedAt || isoDate`

### 15. Fix Organization schema + enrich Person schema
**Effort:** 1h

`pages/Home.tsx` Organization node — add:
```json
"description": "Publicación especializada en SEO e Inteligencia Artificial en español",
"foundingDate": "2024",
"inLanguage": "es"
```

`pages/About.tsx` Person schema — add:
```json
"knowsAbout": [
  "Search Engine Optimization", "Generative Engine Optimization",
  "SEO Técnico", "SEO Local", "Marketing Digital con IA"
],
"inLanguage": "es"
```

### 16. Add editorial intro text to category pages
**Effort:** 2h (copywriting + code)

`pages/CategoryPage.tsx` — add a per-category description paragraph above article grid. Prevents thin-content classification for these pages.

### 17. Make the reading progress bar functional
**Effort:** 20min

`pages/ArticleDetail.tsx` line 295 — see fix code in FULL-AUDIT-REPORT.md Section 2 M-2.

### 18. Compress `pietro.png` (896KB → WebP <100KB)
**Effort:** 5min

```bash
cwebp -q 80 assets/pietro.png -o public/assets/pietro.webp
```
Update all references.

### 19. Add `loading="lazy"` to all below-fold images
**Effort:** 30min

`components/ArticleCard.tsx`, sidebar images in `pages/ArticleDetail.tsx` — add `loading="lazy"` to all `<img>` tags that are not the hero LCP element.

### 20. Populate ExternalPublications in Sanity for Pietro Fiorillo
**Effort:** Content task

Any verified third-party publications (Semrush Blog, Ahrefs, Search Engine Journal, etc.) added to this Sanity field produce the highest-leverage E-E-A-T signal available without code changes.

### 21. Fix mobile nav `href="#"` placeholder links
**Effort:** 10min

`components/Navbar.tsx` — replace `href="#"` social links with real URLs or remove.

---

## LOW — Backlog

| # | Task | File | Effort |
|---|---|---|---|
| 22 | Add `<Route>` for NotFound with noindex | `App.tsx` | 20min |
| 23 | Add `NewsArticle` to article `@type` | `pages/ArticleDetail.tsx` | 5min |
| 24 | Add default author fallback "Equipo Editorial" | `components/SEO.tsx` line 23 | 5min |
| 25 | Strip `console.log` from prod builds | `vite.config.ts` | 5min |
| 26 | Add `ItemList` schema to Home + Category pages | Multiple | 1h |
| 27 | Add `SearchAction` to WebSite schema | `components/SEO.tsx` | 20min |
| 28 | Implement IndexNow via Sanity webhook | Sanity + Firebase | 2h |
| 29 | Add `BreakingNewsTicker` height reservation | `components/BreakingNewsTicker.tsx` | 30min |
| 30 | Disallow `/write` in `robots.txt` or add noindex | `public/robots.txt` | 5min |
| 31 | Add `/author/:slug` pages to sitemap | `scripts/generate-sitemap.js` | 30min |
| 32 | Responsive `srcset` via Sanity URL transforms | `services/articleService.ts` | 1h |
| 33 | Add FAQ schema to key articles | `pages/ArticleDetail.tsx` + Sanity | 2h |
| 34 | Verify `/pietro-og.png` exists in `public/` | `public/` | 5min |

---

## Effort/Impact Summary

```
Week 1:  Fix fake forms · Plan SSR · Remove Tailwind CDN · Fix schema · Logo asset · Security headers · 404 route
Week 2:  Self-host fonts · Code splitting · Hero image perf · Sitemap fix · Quick fixes batch
Month 2: SSR/SSG migration · Dynamic sitemap · llms.txt · Sanity _updatedAt · Category editorial copy
Backlog: IndexNow · FAQ schema · ItemList · srcset pipeline
```

**Single biggest ROI action:** SSR/prerendering. Until implemented, all other SEO improvements operate under a structural ceiling of ~45/100.

**Single fastest action:** Batch fix #12 — 8 quick changes in 30 minutes that collectively improve schema validity, social targeting, and canonical correctness with zero architecture changes.
