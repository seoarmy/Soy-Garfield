import { defineType, defineField } from 'sanity'

export const breakingNews = defineType({
    name: 'breakingNews',
    title: 'Última Hora',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Titular',
            type: 'string',
            description: 'Titular corto y directo (máx 100 caracteres)',
            validation: (Rule) => Rule.required().max(100),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'summary',
            title: 'Resumen Breve',
            type: 'text',
            rows: 2,
            description: 'Resumen de 1-2 líneas para el ticker',
            validation: (Rule) => Rule.required().max(150),
        }),
        defineField({
            name: 'category',
            title: 'Categoría',
            type: 'string',
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
            name: 'publishedAt',
            title: 'Fecha y Hora de Publicación',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'expiresAt',
            title: 'Fecha de Expiración',
            type: 'datetime',
            description: 'Cuándo dejar de mostrar esta noticia como "última hora"',
        }),
        defineField({
            name: 'isActive',
            title: 'Activa',
            type: 'boolean',
            initialValue: true,
            description: 'Desactivar para ocultar sin eliminar',
        }),
        defineField({
            name: 'priority',
            title: 'Prioridad',
            type: 'number',
            description: 'Mayor número = mayor prioridad en el ticker',
            initialValue: 1,
            validation: (Rule) => Rule.min(1).max(10),
        }),
        defineField({
            name: 'relatedArticle',
            title: 'Artículo Relacionado',
            type: 'reference',
            to: [{ type: 'article' }],
            description: 'Opcional: enlazar a un artículo completo',
        }),
        defineField({
            name: 'externalLink',
            title: 'Enlace Externo',
            type: 'url',
            description: 'Opcional: enlazar a fuente externa',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            category: 'category',
            isActive: 'isActive',
            publishedAt: 'publishedAt',
        },
        prepare({ title, category, isActive, publishedAt }) {
            return {
                title: title,
                subtitle: `${category} • ${isActive ? '🟢 Activa' : '🔴 Inactiva'} • ${new Date(publishedAt).toLocaleDateString()}`,
            }
        },
    },
})
