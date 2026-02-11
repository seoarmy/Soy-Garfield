import { defineType, defineField } from 'sanity'

export const author = defineType({
    name: 'author',
    title: 'Autores',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nombre completo',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Título Profesional / Rol',
            type: 'string',
            description: 'ej: Director de Marketing & Consultor de SEO Técnico',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Imagen de perfil',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'description',
            title: 'Descripción Corta (Hero)',
            type: 'text',
            rows: 3,
            description: 'Aparece debajo del nombre en el hero de la página About.',
        }),
        defineField({
            name: 'skills',
            title: 'Especialidades / Skills',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
            description: 'ej: SEO Técnico, Analítica Web, etc.',
        }),
        defineField({
            name: 'biography',
            title: 'Biografía Completa',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'Cuerpo principal de la sección de biografía.',
        }),
        defineField({
            name: 'socials',
            title: 'Redes Sociales',
            type: 'object',
            fields: [
                { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
                { name: 'twitter', title: 'Twitter URL', type: 'url' },
                { name: 'instagram', title: 'Instagram URL', type: 'url' },
                { name: 'email', title: 'Email de contacto', type: 'string' },
            ],
        }),
        defineField({
            name: 'externalPublications',
            title: 'Publicaciones Externas',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Título del artículo', type: 'string' },
                        { name: 'medium', title: 'Medio / Revista', type: 'string' },
                        { name: 'date', title: 'Año / Fecha', type: 'string' },
                        { name: 'link', title: 'Enlace externo', type: 'url' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'seoTitle',
            title: 'Título SEO (Perfil)',
            type: 'string',
            description: 'Título para la pestaña del navegador.',
        }),
        defineField({
            name: 'seoDescription',
            title: 'Meta Descripción (Perfil)',
            type: 'text',
            rows: 2,
        }),
    ],
})
