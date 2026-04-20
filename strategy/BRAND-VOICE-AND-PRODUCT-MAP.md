# Soy Garfield — Voz Editorial, Mapa de Producto y Posicionamiento
**Actualizado:** 2026-04-21

---

## 1. Tono y Voz Editorial (Brand Voice)

### Definición de tono

Soy Garfield habla como **un experto que no se toma demasiado en serio el formato, pero sí el contenido**. Es la diferencia entre un paper académico y una conversación de alto nivel entre dos profesionales que ya no necesitan impresionarse.

**Marco NNGroup (4 dimensiones):**

| Dimensión | Posición | Descripción |
|-----------|----------|-------------|
| Divertido ↔ Serio | 65% Serio | Rigor técnico como base. Humor permitido en contexto, nunca forzado. |
| Formal ↔ Casual | 55% Casual | Tuteo directo. Sin "usted". Sin jerga corporativa. |
| Respetuoso ↔ Irreverente | 30% Irreverente | Opiniones directas. Se puede criticar a Google, a competidores, a tendencias vacías. |
| Entusiasta ↔ Neutro | 60% Entusiasta | Hay convicción detrás de cada artículo. No es periodismo fío. |

### Principios de escritura

**1. Directo desde la primera línea**
No hay introducción de calentamiento. La primera frase ya contiene información útil o un gancho fuerte. 
- ❌ "En el mundo del SEO, los cambios son constantes..."
- ✅ "Google acaba de matar el snippet posición 0 para queries de salud. Lo que tienes que hacer ahora."

**2. Credibilidad sin pedantería**
Citas a fuentes primarias (Google Search Central, documentación oficial, papers). Jamás "según expertos" sin nombrarlos.

**3. Opinión explícita cuando corresponde**
Pietro puede decir "creo que esto es una mala idea de Google" o "este tool está sobrevalorado". La voz personal es una ventaja competitiva, no un riesgo.

**4. Estructura visual-first**
- H2 y H3 que son respuestas, no temas ("Cómo configurar X" no "Configuración de X")
- Listas solo cuando los ítems son realmente paralelos (no como relleno)
- Tablas para comparaciones de 3+ variables
- **Negrita** para el concepto central de cada párrafo, no para decorar

**5. Longitud calibrada al tipo de contenido**

| Tipo | Longitud target | Razón |
|------|----------------|-------|
| Breaking news / update | 400–700 palabras | Velocidad > exhaustividad |
| Análisis de actualidad | 800–1.400 palabras | Contexto + implicaciones |
| Guía práctica | 1.800–3.000 palabras | Completitud para rankear |
| Caso de estudio | 1.200–2.500 palabras | Datos + narrativa |
| Pilar temático (hub) | 3.000–5.000 palabras | Autoridad topical |

**6. Vocabulario técnico en español**
- Usar los términos técnicos tal como los usa la industria: "crawl budget", "E-E-A-T", "AI Overviews", "GEO", "hreflang" → no traducir cuando la comunidad SEO usa el inglés
- En contexto educativo (artículos TOFU): definir el término la primera vez que aparece
- Nunca "posicionamiento web" cuando se puede decir SEO

**7. Firma de perspectiva**
Cada artículo que no sea puramente factual debe tener un párrafo de opinión de Pietro. Puede ser al final o integrado. Esto construye la entidad-persona que Google y los LLMs aprenden a reconocer.

### Lo que Soy Garfield NO es

- ❌ Periodismo neutro de agencia de noticias
- ❌ Blog de tutoriales paso a paso sin contexto estratégico
- ❌ Contenido de SEO básico para principiantes absolutos (ese no es el core)
- ❌ Clickbait vacío ("5 secretos que Google no quiere que sepas")

---

## 2. Mapa de Componentes

### Componentes desarrollados

#### UI / Interfaz
| Componente | Archivo | Estado | Notas |
|------------|---------|--------|-------|
| `ArticleCard` | `components/ArticleCard.tsx` | ✅ Completo | Variantes: `default`, `compact`, `featured` |
| `BreakingNewsTicker` | `components/BreakingNewsTicker.tsx` | ✅ Completo | Barra scrollable de noticias urgentes |
| `Navbar` | `components/Navbar.tsx` | ✅ Completo | Navegación principal |
| `Footer` | `components/Footer.tsx` | ✅ Completo | Footer con links y redes |
| `NewsletterForm` | `components/NewsletterForm.tsx` | ✅ Completo | Suscripción email |

#### Páginas / Rutas
| Página | Ruta | Estado |
|--------|------|--------|
| Home | `/` | ✅ |
| Detalle artículo | `/article/[slug]` | ✅ |
| Perfil autor | `/author/[slug]` | ✅ |
| Listado autores | `/authors` | ✅ |
| Categoría | `/category/[slug]` | ✅ |
| Tag | `/tag/[slug]` | ✅ |
| About / Pietro | `/about` | ✅ |
| Contacto | `/contact` | ✅ |
| Política editorial | `/sobre/politica-editorial` | ✅ |
| Privacidad | `/privacy` | ✅ |
| Términos | `/terms` | ✅ |
| Write (redacción) | `/write` | ✅ |
| Sitemap News | `/sitemap-news.xml` | ✅ |
| 404 | `/not-found` | ✅ |

#### Infraestructura / Backend
| Servicio | Archivo | Estado |
|----------|---------|--------|
| `articleService` | `services/articleService.ts` | ✅ |
| `authorService` | `services/authorService.ts` | ✅ |
| `breakingNewsService` | `services/breakingNewsService.ts` | ✅ |
| Sanity CMS integration | `services/sanity.ts` | ✅ |
| Contact API | `app/api/contact/route.ts` | ✅ |
| Write API | `app/api/write/route.ts` | ✅ |
| Sitemap generator | `scripts/generate-sitemap.mjs` | ✅ |
| Firebase hosting | `firebase.json` + `apphosting.yaml` | ✅ |

---

### Componentes potenciales a desarrollar

#### Prioridad Alta (impacto SEO + UX directo)

| Componente | Descripción | Motivo |
|------------|-------------|--------|
| `RelatedArticles` | Bloque de 3 artículos relacionados al final de cada artículo | Internal linking + tiempo en sitio |
| `TableOfContents` | Índice flotante con anchor links para artículos largos | UX en guías + `speakable` schema |
| `AuthorBox` | Caja de autor con bio corta, foto, redes al final de artículo | E-E-A-T, Person schema |
| `SocialShareButtons` | Botones de compartir (X, LinkedIn, WhatsApp) | Amplificación orgánica |
| `AuditCTABanner` | Banner/CTA para ofrecer auditoría SEO gratuita (ver sección 3) | Generación de leads BOFU |
| `BlogSearch` | Búsqueda interna de artículos | Retención + crawl depth |

#### Prioridad Media (crecimiento y monetización)

| Componente | Descripción | Motivo |
|------------|-------------|--------|
| `CategoryHubPage` | Página pilar por categoría con sub-temas y artículos linkados | Topic authority, arquitectura de silos |
| `NewsletterPopup` | Exit-intent o scroll-triggered para captura de email | Crecimiento lista |
| `ProgressBar` | Barra de progreso de lectura en artículo | UX engagement |
| `ArticleRating` | Rating de utilidad al final del artículo (👍/👎 o estrellas) | Feedback + señal UX |
| `SeriesNavigator` | Navegación de serie de artículos (parte 1/3, 2/3...) | Tiempo en sitio, UX |
| `ToolCard` | Card para listados de herramientas SEO/IA con datos estructurados | Contenido MOFU + Software schema |
| `ComparisonTable` | Tabla comparativa de herramientas (con schema) | Keywords de comparativa |

#### Prioridad Baja / Futuro

| Componente | Descripción | Motivo |
|------------|-------------|--------|
| `GlossaryTerm` | Tooltip inline para términos técnicos | UX educativo |
| `DataVisualization` | Charts SVG para estudios originales | GEO, datos propios |
| `LeadMagnetDownload` | Descargable (checklist, plantilla) a cambio de email | Lead gen |
| `PodcastPlayer` | Reproductor si se lanza formato audio | Diversificación |
| `AskPietro` | Widget de preguntas a Pietro (vía email o Discord) | Comunidad |

---

## 3. Servicio de Auditoría SEO Gratuita

### ¿Es buena idea?

**Sí, con condiciones.** La auditoría gratuita es un mecanismo BOFU clásico y efectivo para consultores, pero requiere diseño cuidadoso para que no se convierta en un sumidero de tiempo sin retorno.

### Modelo recomendado: Auditoría de Entrada Limitada

**No ofrecer una auditoría completa gratuita.** Ofrecer un **análisis de diagnóstico gratuito** (15-20 min) que:
1. Identifica 3–5 problemas críticos del sitio
2. Estima el impacto potencial en términos de tráfico
3. Propone un plan de acción que Pietro puede ejecutar como consultor

El diagnóstico se hace con herramientas (Screaming Frog, Semrush, PageSpeed) + un template estandarizado → máximo 1–1.5h de trabajo real por lead.

### Por qué funciona para Soy Garfield

- El sitio ya posiciona a Pietro como experto técnico → la auditoría es la extensión natural de esa credibilidad
- La audiencia (SEOs, marketers) entiende el valor de una auditoría → conversión de intención alta
- Diferenciador: "Consultor que también publica → sabe lo que funciona hoy, no hace 3 años"

### Estructura del CTA

**Texto sugerido para el `AuditCTABanner`:**
> **¿Tu sitio pierde tráfico sin razón aparente?**  
> Te analizo los 5 errores más críticos de tu SEO — gratis, en 48h.  
> [Solicitar diagnóstico gratuito →]

**Lo que el usuario recibe:**
- PDF de 1 página con diagnóstico personalizado
- Videoloom de 5 min explicando los hallazgos (alto valor percibido, bajo esfuerzo)
- Propuesta opcional de auditoría completa si hay fit

### Dónde colocar el CTA

| Ubicación | Variante | Prioridad |
|-----------|---------|-----------|
| About page (`/about`) | Sección "Trabaja conmigo" | Alta |
| Final de artículos BOFU (casos de estudio) | Inline CTA | Alta |
| Footer | Link sutil | Media |
| Artículos técnicos avanzados | Banner lateral o end-of-article | Media |
| Página de categoría `/seo/tecnico` | Sticky CTA | Media |

### Ruta sugerida
Crear `/auditoria` o `/consultoria` como landing page dedicada con:
- Propuesta de valor clara
- Lo que incluye el diagnóstico gratuito
- Formulario simple (nombre, URL, problema principal)
- Social proof (cuando haya: testimonios, logos de clientes)

---

## 4. Posicionamiento en el Mercado Hispanohablante

### El gap que existe hoy

El mercado hispanohablante de SEO tiene un problema estructural: **los referentes existentes son o muy básicos, o muy lentos, o no cubren IA**. Nadie ha ocupado el espacio de "experto SEO+IA con publicación noticiosa de alta frecuencia".

### Estrategia de posicionamiento

**Claim central:**
> Pietro Fiorillo es el consultor SEO en español que más profundamente integra la inteligencia artificial en su práctica — tanto en el contenido que publica como en los servicios que ofrece.

**3 vectores de posicionamiento:**

#### Vector 1: Velocidad + Profundidad (Publisher)
Ser el primero en publicar cuando Google hace un update. Ser el más completo cuando el tema lo amerita. Ningún competidor hace ambas cosas a la vez.
- KPI: publicar análisis de updates de Google en < 4 horas
- Formato: Breaking news → análisis profundo 24–48h después

#### Vector 2: Autoridad Técnica (Practitioner)
No solo comentar lo que otros hacen — publicar lo que Pietro hace, con datos propios.
- Estudios originales ("CTR en AI Overviews en España: datos de 50 sitios")
- Casos de estudio de clientes (con permiso + datos anonimizados)
- Auditorías públicas de sitios conocidos (formato breakdown popular en Twitter/X)

#### Vector 3: Consultoría como prueba de expertise (Practitioner → trusted)
La oferta de consultoría no es solo un servicio — es la demostración de que Pietro implementa lo que predica. Cada cliente es un caso de estudio potencial.

### Mercados prioritarios

| Mercado | Oportunidad | Táctica |
|---------|-------------|---------|
| España | Mayor volumen de búsquedas SEO en español, mejor CPM para ads | Contenido-first, referencias locales (Google ES) |
| México | Segundo mercado digital hispanohablante, alto crecimiento en agencias | Keywords con variante MX ("posicionamiento web") |
| Argentina | Comunidad SEO activa, alta afinidad con contenido técnico | Pietro tiene conexión cultural natural |
| LATAM general | Long-tail de keywords sin competencia | Artículos que responden preguntas específicas sin respuesta en español |

### Acciones de construcción de autoridad (primeros 6 meses)

1. **Twitter/X SEO España** — Hilo semanal sobre un tema técnico. Formato: dato + implicación + CTA a artículo
2. **LinkedIn en español** — Artículos largos de opinión (formato "newsletter" de LinkedIn), 1 por semana
3. **Guest posts** — 1 artículo en sitio de autoridad español por mes (Human Level, Webpositer, Semrush ES blog)
4. **Podcasts de SEO en español** — Aparecer como invitado en los 5 principales (MarketingPodcast, Full Stack SEO, etc.)
5. **Comunidades** — Presencia activa en foros y grupos (SEO Spain Discord, grupos de Facebook de SEO en LATAM)
6. **Wikipedia/Wikidata** — Entry de entidad "Pietro Fiorillo" cuando haya suficiente cobertura de terceros

### Diferenciación sostenible

Lo que los competidores NO pueden copiar fácilmente:
- La velocidad de publicación combinada con profundidad técnica (requiere años de expertise)
- El ángulo IA-first (requiere comprensión técnica real, no solo surface-level)
- La voz editorial propia de Pietro (persona + opiniones = moat personal)
- El historial de clientes y casos reales (se acumula con el tiempo)

---

## Resumen de próximos pasos

### Esta semana
- [ ] Desarrollar `AuthorBox` component — aparece en todos los artículos
- [ ] Desarrollar `RelatedArticles` — 3 artículos relacionados al final
- [ ] Crear ruta `/consultoria` o `/auditoria` con landing page básica
- [ ] Añadir `AuditCTABanner` en `/about` y al final de artículos BOFU

### Este mes
- [ ] `TableOfContents` para artículos de guías largas
- [ ] `SocialShareButtons` en artículos
- [ ] Primer hilo de Twitter/X con datos propios
- [ ] Primer guest post en sitio externo de autoridad

### En 3 meses
- [ ] Primer estudio original con datos propios (citar-able por LLMs)
- [ ] 2–3 casos de estudio publicados
- [ ] `CategoryHubPage` para los pilares principales
- [ ] Página de consultoría con social proof real
