import RSSParser from 'rss-parser';
import axios from 'axios';
import { createClient } from '@sanity/client';
import { JSDOM } from 'jsdom';
import slugify from 'slugify';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { google } from 'googleapis';

import { randomUUID } from 'crypto';

dotenv.config();

/**
 * Generates a unique key for Sanity blocks and spans.
 */
function generateKey() {
    return Math.random().toString(36).substring(2, 11);
}

function generateId() {
    return randomUUID();
}

// Configuration (Loaded from .env)
const SANITY_CONFIG = {
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2023-01-01',
    dataset: process.env.SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2023-01-01',
    useCdn: false,
};

const GOOGLE_AUTH_CONFIG = {
    keyFile: './service-account.json',
    scopes: ['https://www.googleapis.com/auth/indexing'],
};

// Change this to your actual production URL structure
const SITE_URL = process.env.SITE_URL || 'https://soygarfield.com';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const REWRITE_PROMPT = `
INSTRUCCIONES DEL PROYECTO
IDENTIDAD
Eres un copywriter SEO experto en IA y marketing digital. Transformas noticias en inglés de Search Engine Journal y Search Engine Land en artículos originales en español castellano optimizados para Google Discover.
Tu voz:

Profesional pero cercano
Práctico con ejemplos concretos
Primera persona para opiniones
Crítico sin ser cínico
Sin lenguaje corporativo vacío


PROCESO
1. Análisis inicial

¿Cuál es la noticia principal?
¿Por qué importa a marketers hispanohablantes?
¿Qué ángulo único puedes darle?
¿Con qué artículos previos conecta? (revisa tu memoria)

2. Estructura (1500-2000 palabras)
[TÍTULO GANCHO - 60-70 caracteres]
Subtítulo explicativo 120-150 caracteres

[INTRODUCCIÓN - 100-150 palabras]
Engancha desde línea 1, presenta tema, dato impactante

## Qué está pasando
Explica noticia, datos concretos, cita fuente (SEJ/SEL)

## Por qué importa
Impacto real, consecuencias prácticas, a quién afecta

## Análisis profundo
Tu interpretación, comparaciones, conexión con tendencias
### Subsecciones si necesario

## Qué hacer al respecto
Pasos concretos, recomendaciones, herramientas

[CONCLUSIÓN - 100 palabras]
Resumen, reflexión final, CTA sutil

[ARTÍCULOS RELACIONADOS]
2-3 artículos previos tuyos relacionados

OPTIMIZACIÓN GOOGLE DISCOVER
Títulos

60-70 caracteres máximo
Números cuando sea relevante
Palabras impacto: "Confirmado", "Nuevo", "Cambia"
Formato: [Acción] + [Tema] + [Beneficio]

Ejemplo: "Google confirma 3 factores SEO que cambiarán en 2026"
Imágenes (3-4 por artículo)
📸 IMAGEN 1 (Destacada - 1200x675px)
Descripción: [Qué mostrar exactamente]
Alt text: "[Keyword] estadísticas 2026"
Ubicación: Después primer párrafo

ELEMENTOS VISUALES (mínimo 2)
Tablas:
| Antes | Ahora | Impacto |
|-------|-------|---------|
Bullets: Ventajas, pasos, características
Citas:

"Texto impactante"
— Fuente (SEJ, fecha)

Cajas:
💡 **Dato clave:** [Info destacable]
⚠️ **Importante:** [Advertencia]
✅ **Recomendación:** [Acción práctica]

SEO
Keywords:

Principal: 1-1.5% del texto
Aparece en: título, primer párrafo, un H2, conclusión, URL
Secundarias: naturalmente distribuidas

Enlaces internos:
Como vimos en [artículo anterior], [conexión].

⚙️ BLOQUES OBLIGATORIOS CMS:
- Incluir al menos 1 bloque CTA contextual
- Añadir 1 tabla comparativa
- Incluir bloque newsletter si el tema es estratégico
- Usar bloque cita si hay fuente oficial


ESTILO
HACER:
✅ Segunda persona ("Si tienes un blog...")
✅ Primera persona opiniones ("En mi experiencia...")
✅ Párrafos 2-4 líneas máximo
✅ Ejemplos concretos ("Si vendes zapatos...")
✅ Datos con fuentes ("Según SEJ, 40%...")
✅ Preguntas retóricas ("¿Te suena?")
EVITAR:
❌ "Cierre épico", "panorama digital", "en conclusión"
❌ Listas sin explicación
❌ Frases IA ("es importante mencionar...")
❌ Exageraciones injustificadas
❌ Tecnicismos sin explicar
❌ Traducción literal inglés
❌ Redundancias ("totalmente completo")

METADATA
markdown---
**Título SEO:** [60 caracteres]
**Meta Description:** [150-160 caracteres con keyword y CTA]
**URL:** /keyword-principal-tema-2026/
**Categoría:** [SEO/IA/Marketing/Automatización]
**Etiquetas:** keyword1, keyword2, keyword3

MEMORIA Y CONEXIONES
Usa conversaciones previas para:

Recordar artículos anteriores
Identificar conexiones temáticas
Sugerir enlaces internos
Evitar repeticiones
Construir narrativa consistente


CHECKLIST

 Título 60-70 caracteres
 Subtítulo 120-150 caracteres
 Intro enganchadora
 4-5 H2 descriptivos
 2+ elementos visuales
 3-4 imágenes con alt text
 Keyword en ubicaciones clave
 2-3 enlaces artículos previos
 Conclusión con CTA
 Metadata completa
 1500-2000 palabras
 Tono natural
 Fuente citada


## OBJETIVO

Que el lector:
1. Entienda sin leer el original
2. Comprenda por qué le importa
3. Sepa qué hacer
4. Quiera leer más
5. Comparta porque es útil;

const FEEDS = [
    'https://searchengineland.com/feed',
    'https://www.searchenginejournal.com/feed/',
];

const client = createClient(SANITY_CONFIG);
const parser = new RSSParser();

/**
 * Skill: fetchSEOFeeds
 * Fetches RSS feeds and filters for new articles based on Sanity records.
 */
export async function fetchSEOFeeds(filterDate = null) {
    console.log('Fetching SEO feeds...');
    const allArticles = [];

    for (const url of FEEDS) {
        try {
            const feed = await parser.parseURL(url);
            feed.items.forEach(item => {
                allArticles.push({
                    title: item.title,
                    link: item.link,
                    pubDate: item.pubDate, // RSS format
                    excerpt: item.contentSnippet || item.description,
                    guid: item.guid || item.link,
                    source: feed.title
                });
            });
        } catch (error) {
            console.error(`Error fetching feed ${ url }: `, error.message);
        }
    }

    let candidateArticles = allArticles;

    // 1. Filter by date if requested
    if (filterDate) {
        console.log(`Filtering RSS items for date: ${ filterDate } `);
        candidateArticles = allArticles.filter(article => {
            if (!article.pubDate) return false;
            try {
                const d = new Date(article.pubDate);
                const dateStr = d.toISOString().split('T')[0];
                return dateStr === filterDate;
            } catch (e) { return false; }
        });
        console.log(`Found ${ candidateArticles.length } matching articles in RSS for ${ filterDate }`);
        // If we filter by date, we assume forced import (or at least we return them to let the caller decide)
        // But to be safe, let's just return them. The user wants to import THESE.
        return candidateArticles;
    }

    // 2. Default behavior: Filter for NEW articles only (check Sanity)
    const newArticles = [];
    for (const article of candidateArticles) {
        const query = `* [_type == "article" && (originalUrl == $link || guid == $guid)][0]`;
        const params = { link: article.link, guid: article.guid };
        const existing = await client.fetch(query, params);

        if (!existing) {
            newArticles.push(article);
        }
    }

    console.log(`Found ${ newArticles.length } new articles(not in Sanity).`);
    return newArticles;
}

/**
 * Skill: extractArticleContent
 * Fetches HTML from article link and extracts structured content.
 */
export async function extractArticleContent(article) {
    console.log(`Extracting content for: ${ article.title } `);
    try {
        const response = await axios.get(article.link);
        const dom = new JSDOM(response.data);
        const doc = dom.window.document;

        // Basic extraction (needs tuning per source)
        const container = doc.querySelector('article') || doc.querySelector('.content') || doc.body;

        const headings = Array.from(container.querySelectorAll('h1, h2, h3, h4')).map(h => ({
            level: parseInt(h.tagName[1]),
            text: h.textContent.trim()
        }));

        const paragraphs = Array.from(container.querySelectorAll('p')).map(p => p.textContent.trim()).filter(p => p.length > 0);

        // Extract images
        const images = Array.from(container.querySelectorAll('img')).map(img => ({
            src: img.getAttribute('src'),
            alt: img.getAttribute('alt') || ''
        })).filter(img => img.src && !img.src.includes('data:image'));

        // Extract YouTube embeds
        const youtubeEmbeds = Array.from(doc.querySelectorAll('iframe[src*="youtube.com"], iframe[src*="youtu.be"]')).map(iframe => iframe.getAttribute('src'));

        // Try to find author and featured image
        const author = doc.querySelector('[rel="author"], .author-name, meta[name="author"]')?.textContent?.trim() ||
            doc.querySelector('meta[name="author"]')?.getAttribute('content');

        const featuredImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content');

        return {
            ...article,
            fullContent: container.innerHTML,
            headings,
            paragraphs,
            images,
            youtubeEmbeds,
            author,
            featuredImage,
            extractedAt: new Date().toISOString()
        };
    } catch (error) {
        console.error(`Error extracting content for ${ article.link }: `, error.message);
        return null;
    }
}

/**
 * Skill: rewriteContent
 * Uses OpenAI to rewrite the article based on the expert SEO prompt.
 */
export async function rewriteContent(extractedArticle) {
    console.log(`Rewriting content with AI for: ${ extractedArticle.title } `);
    try {
        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gpt-4o",
            messages: [
                { role: "system", content: REWRITE_PROMPT },
                { role: "user", content: `Noticia original: ${ extractedArticle.title } \nContenido sugerido(resumen): ${ extractedArticle.paragraphs.slice(0, 10).join('\n') } \nFuente: ${ extractedArticle.source } \nUrl: ${ extractedArticle.link } ` }
            ],
            temperature: 0.7,
        });

        const aiText = response.choices[0].message.content;

        // Extraer metadata con regex más robustos
        const catMatch = aiText.match(/(?:Categoria|Categoría):\s*(.*)/i);
        const tagsMatch = aiText.match(/(?:Etiquetas):\s*(.*)/i);
        const seoTitleMatch = aiText.match(/(?:Título SEO|Titulo SEO):\s*(.*)/i);
        const seoDescMatch = aiText.match(/(?:Meta Descripción|Meta Descripcion):\s*(.*)/i);
        const urlMatch = aiText.match(/(?:URL):\s*(.*)/i);

        const wordCount = aiText.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200);

        return {
            ...extractedArticle,
            rewrittenText: aiText,
            aiCategory: catMatch ? catMatch[1].trim() : 'SEO',
            aiTags: tagsMatch ? tagsMatch[1].split(',').map(t => t.trim().toUpperCase()) : [],
            aiSeoTitle: seoTitleMatch ? seoTitleMatch[1].trim() : extractedArticle.title,
            aiSeoDescription: seoDescMatch ? seoDescMatch[1].trim() : extractedArticle.excerpt,
            aiSlug: urlMatch ? urlMatch[1].trim().replace(/^\/|\/$/g, '') : slugify(extractedArticle.title, { lower: true }),
            wordCount,
            readingTime
        };
    } catch (error) {
        console.error(`Error rewriting content: `, error.message);
        return null;
    }
}

/**
 * Skill: transformToSanityBlocks
 * Converts extracted content into Sanity Portable Text blocks.
 */
export function transformToSanityBlocks(extractedArticle) {
    console.log(`Transforming to Sanity blocks: ${ extractedArticle.title } `);

    const blocks = [];
    const text = extractedArticle.rewrittenText;

    // Separamos el contenido de la metadata
    const contentText = text.split(/METADATA FINAL/i)[0].trim();
    const lines = contentText.split('\n');

    let inTable = false;
    let tableRows = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Handle Table
        if (line.includes('|') && !line.startsWith('```')) { // Ensure it's not a code block containing '|'
if (!inTable) inTable = true;
// Parse row
const cells = line.split('|').map(c => c.trim()).filter(c => c !== '');
// Skip separator line |---|---|
if (line.replace(/\|/g, '').replace(/-/g, '').trim() === '') {
    continue;
}
tableRows.push({
    _key: generateKey(),
    _type: 'row',
    cells: cells
});
continue;
        } else if (inTable) {
    // End of table
    blocks.push({
        _key: generateKey(),
        _type: 'table',
        rows: tableRows
    });
    inTable = false;
    tableRows = [];
}

if (line === '') continue;

if (line.startsWith('## ')) {
    blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h2',
        children: parseSpans(line.replace('## ', '').trim())
    });
} else if (line.startsWith('### ')) {
    blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h3',
        children: parseSpans(line.replace('### ', '').trim())
    });
} else if (line.startsWith('- ') || line.startsWith('* ')) {
    blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: parseSpans(line.replace(/^[-*]\s+/, '').trim())
    });
} else if (line.startsWith('1. ')) {
    blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'normal',
        listItem: 'number',
        children: parseSpans(line.replace(/^\d+\.\s+/, '').trim())
    });
} else if (line.toUpperCase().includes('[CITA]') || line.startsWith('> ')) {
    blocks.push({
        _key: generateKey(),
        _type: 'quote',
        text: line.replace(/\[CITA\]|>/gi, '').trim(),
        author: 'Pietro Fiorillo'
    });
} else if (line.toUpperCase().includes('[CTA]')) {
    blocks.push({
        _key: generateKey(),
        _type: 'cta',
        title: 'Consultoría Estratégica',
        url: 'https://soygarfield.com/contacto'
    });
} else if (line.toUpperCase().includes('[SEPARADOR]')) {
    blocks.push({
        _key: generateKey(),
        _type: 'divider',
        style: 'line'
    });
} else if (line.startsWith('```')) {
    blocks.push({
        _key: generateKey(),
        _type: 'code',
        code: line.replace(/```/g, '').trim(),
        language: 'javascript'
    });
} else {
    blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'normal',
        children: parseSpans(line)
    });
}
    }

// If table was at the end
if (inTable && tableRows.length > 0) {
    blocks.push({
        _key: generateKey(),
        _type: 'table',
        rows: tableRows
    });
}

return {
    _id: generateId(),
    _type: 'article',
    title: extractedArticle.aiSeoTitle || extractedArticle.title,
    slug: { _type: 'slug', current: extractedArticle.aiSlug },
    excerpt: extractedArticle.aiSeoDescription,
    content: blocks,
    date: new Date().toISOString().split('T')[0],
    author: {
        _type: 'reference',
        _ref: 'e1958795-dafe-462a-90a9-acda639904da'
    },
    category: extractedArticle.aiCategory,
    tags: extractedArticle.aiTags,
    isFeatured: true,
    isFeatured: true,
    // readingTime removed - calculated on frontend
    seoTitle: extractedArticle.aiSeoTitle,
    seoDescription: extractedArticle.aiSeoDescription,
    originalUrl: extractedArticle.link,
    guid: extractedArticle.guid,
    source: extractedArticle.source,
    mainImageRemoteUrl: extractedArticle.featuredImage
};
}

/**
 * Helper to parse bold and italic from markdown into Sanity Spans.
 */
function parseSpans(text) {
    const children = [];

    // Regex para encontrar **bold**, *italic*, _italic_
    // Buscamos de forma secuencial
    const tokens = [];
    let lastIndex = 0;

    // Regex simplificada para capturar los tres tipos
    const regex = /(\*\*.*?\*\*)|(\*.*?\*)|(_.*?_)/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
        // Texto previo al match
        if (match.index > lastIndex) {
            tokens.push({ text: text.substring(lastIndex, match.index), marks: [] });
        }

        const m = match[0];
        if (m.startsWith('**')) {
            tokens.push({ text: m.slice(2, -2), marks: ['strong'] });
        } else if (m.startsWith('*') || m.startsWith('_')) {
            tokens.push({ text: m.slice(1, -1), marks: ['em'] });
        }

        lastIndex = regex.lastIndex;
    }

    // Texto restante
    if (lastIndex < text.length) {
        tokens.push({ text: text.substring(lastIndex), marks: [] });
    }

    if (tokens.length === 0) {
        tokens.push({ text: text, marks: [] });
    }

    tokens.forEach(token => {
        children.push({
            _key: generateKey(),
            _type: 'span',
            marks: token.marks,
            text: token.text
        });
    });

    return children;
}

/**
 * Skill: publishToSanity
 * Connects to Sanity and creates a new document.
 */
export async function publishToSanity(post) {
    console.log(`Publishing to Sanity: ${post.title}`);
    try {
        // Double check duplicate by link
        const existing = await client.fetch(`*[_type == "article" && (originalUrl == $link || guid == $guid)][0]`, {
            link: post.originalUrl,
            guid: post.guid
        });

        if (existing) {
            console.log(`Article already exists. Skipping.`);
            return null;
        }

        const result = await client.create(post);
        console.log(`Successfully published. ID: ${result._id}`);
        return result;
    } catch (error) {
        console.error(`Error publishing to Sanity:`, error.message);
        throw error;
    }
}

/**
 * Skill: notifyGoogleIndex
 * Uses Google Indexing API to notify about page updates.
 */
export async function notifyGoogleIndex(slug) {
    if (!slug) return;

    // Construct the full URL - Adjust path structure if needed (e.g. /blog/${slug})
    const url = `${SITE_URL}/${slug}`;
    console.log(`Notifying Google Indexing API for: ${url}`);

    try {
        const auth = new google.auth.GoogleAuth(GOOGLE_AUTH_CONFIG);
        const indexing = google.indexing({ version: 'v3', auth });

        const result = await indexing.urlNotifications.publish({
            requestBody: {
                url: url,
                type: 'URL_UPDATED',
            },
        });

        console.log(`Google Indexing API response: ${result.status} ${result.statusText}`);
        return result.data;
    } catch (error) {
        console.error(`Error notifying Google Indexing API:`, error.message);
        // Don't throw, just log error so the job continues
        return null;
    }
}

/**
 * Job: importSEOArticles
 * Main workflow to orchestrate the skills.
 */
export async function importSEOArticles() {
    console.log('--- Starting importSEOArticles job ---');

    const filterDate = process.env.IMPORT_DATE || null;
    if (filterDate) {
        console.log(`Manual mode: Importing articles for date ${filterDate}`);
    }

    const newArticles = await fetchSEOFeeds(filterDate);

    for (const article of newArticles) {
        const extracted = await extractArticleContent(article);
        if (!extracted) continue;

        const rewritten = await rewriteContent(extracted);
        if (!rewritten) continue;

        const postData = transformToSanityBlocks(rewritten);

        // PUBLISH AND INDEX LOGIC
        // Ideally we should publish directly (remove drafts. prefix) if we want to index immediately.
        // For now, let's keep it as draft but add the indexing logic commented out or ready for when you publish directly.

        const result = await publishToSanity(postData);

        if (result && !postData._id.startsWith('drafts.')) {
            // Only index if it's NOT a draft (i.e. public URL exists)
            await notifyGoogleIndex(postData.slug.current);
        } else if (result) {
            console.log(`Article saved as draft (${result._id}). Skipping Google Indexing until published.`);
        }
    }

    console.log('--- Job completed ---');
}

// Auto-run if executed directly
import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    importSEOArticles().catch(err => {
        console.error('Fatal error in job:', err);
        process.exit(1);
    });
}
