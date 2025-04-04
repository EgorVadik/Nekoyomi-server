import { FILTER, GENRES } from './constants'
import kebabCase from 'just-kebab-case'
import snakeCase from 'just-snake-case'
import { z } from 'zod'

export const mangaChapterSchema = z
    .object({
        title: z.string(),
        chapter: z.string(),
    })
    .transform((data) => ({
        title: kebabCase(data.title),
        chapter: kebabCase(data.chapter).replace(/\./g, '-'),
    }))

export const mangaSchema = z
    .object({
        title: z.string(),
    })
    .transform((data) => ({
        title: kebabCase(data.title),
    }))

export const searchSchema = z
    .object({
        query: z.string().trim().min(1),
        page: z
        .string()
        .or(z.number())
        .default(1)
        .transform((val) =>
            typeof val === 'string' ? parseInt(val) : val
        ),
    })
    .transform(({ query, page }) => ({
        query: snakeCase(query),
        page,
    }))

export const filteredMangaSchema = z
    .object({
        type: z.enum(['latest', 'popular', 'new', 'completed', 'genre']),
        page: z
            .string()
            .or(z.number())
            .default(1)
            .transform((val) =>
                typeof val === 'string' ? parseInt(val) : val
            ),
        genre: z.enum(GENRES).optional().nullable().default(null),
        filter: z.nativeEnum(FILTER).optional().nullable(),
    })
    .refine((data) => {
        if (data.type === 'genre' && data.genre == null) {
            return false
        }
        return true
    })
    .transform((data) => ({
        ...data,
        genre:
            data.genre != null
                ? (kebabCase(data.genre) as (typeof GENRES)[number])
                : null,
    }))

export type MangaSchema = z.infer<typeof mangaSchema>
export type MangaChapterSchema = z.infer<typeof mangaChapterSchema>
export type SearchSchema = z.infer<typeof searchSchema>
export type FilteredMangaSchema = z.infer<typeof filteredMangaSchema>
