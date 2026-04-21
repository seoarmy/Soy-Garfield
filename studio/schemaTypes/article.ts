import { defineType, defineField } from 'sanity'

export const article = defineType({
    name: 'article',
    title: 'Artículos',
    type: 'document',
    groups: [
        { name: 'content', title: 'Contenido' },
        { name: 'seo', title: 'SEO / Metadatos' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Título',
            type: 'string',
            group: 'content',
            validation: (Rule) => Rule.required().max(100),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'content',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'author',
            title: 'Autor',
            type: 'reference',
            to: [{ type: 'author' }],
            group: 'content',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Fecha de publicación',
            type: 'date',
            group: 'content',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Categoría',
            type: 'string',
            group: 'content',
            options: {
                list: [
                    { title: 'SEO', value: 'SEO' },
                    { title: 'IA', value: 'IA' },
                    { title: 'Social Media', value: 'Social Media' },
                    { title: 'Analítica', value: 'Analítica' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'readTime',
            title: 'Tiempo de lectura',
            type: 'string',
            group: 'content',
            placeholder: 'ej: 10 min de lectura',
            description: 'Si se deja vacío, se calculará automáticamente.',
        }),
        defineField({
            name: 'tags',
            title: 'Etiquetas / Tags',
            type: 'array',
            group: 'content',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
            validation: (Rule) => Rule.unique(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Imagen principal',
            type: 'image',
            group: 'content',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Texto alternativo',
                    description: 'Importante para SEO y accesibilidad.',
                }
            ],
            validation: (Rule) => Rule.optional(),
        }),
        defineField({
            name: 'isFeatured',
            title: 'Destacado en Home',
            type: 'boolean',
            group: 'content',
            initialValue: false,
        }),
        defineField({
            name: 'excerpt',
            title: 'Extracto / Resumen para tarjetas',
            type: 'text',
            group: 'content',
            rows: 3,
            validation: (Rule) => Rule.required().max(500),
        }),
        defineField({
            name: 'content',
            title: 'Contenido del artículo',
            type: 'array',
            group: 'content',
            of: [
                { type: 'block' },
                { type: 'image', options: { hotspot: true } },
                {
                    type: 'object',
                    name: 'codeBlock',
                    title: 'Bloque de código',
                    fields: [
                        { name: 'code', title: 'Código', type: 'text' },
                        { name: 'language', title: 'Lenguaje', type: 'string' }
                    ]
                },
                {
                    type: 'object',
                    name: 'quote',
                    title: 'Cita',
                    fields: [
                        { name: 'text', title: 'Texto', type: 'text' },
                        { name: 'author', title: 'Autor', type: 'string' }
                    ]
                },
                {
                    type: 'object',
                    name: 'checklist',
                    title: 'Lista de verificación',
                    fields: [
                        { name: 'items', title: 'Elementos', type: 'array', of: [{ type: 'string' }] }
                    ]
                },
                {
                    type: 'object',
                    name: 'faqBlock',
                    title: 'Preguntas Frecuentes (FAQ)',
                    fields: [
                        {
                            name: 'items',
                            title: 'Preguntas',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    name: 'faqItem',
                                    title: 'Pregunta',
                                    fields: [
                                        { name: 'question', title: 'Pregunta', type: 'string', validation: (Rule: any) => Rule.required() },
                                        { name: 'answer', title: 'Respuesta', type: 'text', rows: 4, validation: (Rule: any) => Rule.required() },
                                    ],
                                    preview: { select: { title: 'question', subtitle: 'answer' } },
                                },
                            ],
                        },
                    ],
                    preview: {
                        select: { items: 'items' },
                        prepare({ items }: any) {
                            return { title: `FAQ (${items?.length || 0} preguntas)` };
                        },
                    },
                }
            ],
        }),
        defineField({
            name: 'faq',
            title: 'Preguntas Frecuentes (FAQ)',
            type: 'array',
            group: 'content',
            description: 'Agrega preguntas y respuestas para el acordeón FAQ y el schema FAQPage (E-E-A-T).',
            of: [
                {
                    type: 'object',
                    name: 'faqItem',
                    title: 'Pregunta',
                    fields: [
                        {
                            name: 'question',
                            title: 'Pregunta',
                            type: 'string',
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            name: 'answer',
                            title: 'Respuesta',
                            type: 'text',
                            rows: 4,
                            validation: (Rule: any) => Rule.required(),
                        },
                    ],
                    preview: {
                        select: { title: 'question', subtitle: 'answer' },
                    },
                },
            ],
        }),
        defineField({
            name: 'seoTitle',
            title: 'Título SEO',
            type: 'string',
            group: 'seo',
            description: 'Si se deja vacío, se usará el título principal.',
        }),
        defineField({
            name: 'seoDescription',
            title: 'Meta Descripción',
            type: 'text',
            group: 'seo',
            rows: 3,
            description: 'Idealmente entre 150-160 caracteres.',
        }),
    ],
})
