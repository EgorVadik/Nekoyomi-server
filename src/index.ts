import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import {
    filteredMangaSchema,
    mangaChapterSchema,
    mangaSchema,
    searchSchema,
} from './lib/schema'
import {
    getChapter,
    getChapterList,
    getFilteredMangaList,
    getMangaDetails,
    searchManga,
} from './lib/scrape'

const app = new Hono<{
    Bindings: {
        SCRAPER_API_KEY: string
    }
}>()

app.use('*', logger())

app.get('/', async (c) => {
    return c.json({ message: 'Welcome to Manga API' })
})

app.get('/chapter', zValidator('query', mangaChapterSchema), async (c) => {
    const data = c.req.valid('query')
    const result = await getChapter(data)
    if (!result) return c.json({ error: 'Failed to fetch chapter' }, 500)
    return c.json(result)
})

app.get('/chapters', zValidator('query', mangaSchema), async (c) => {
    const data = c.req.valid('query')
    const result = await getChapterList(data)
    if (!result) return c.json({ error: 'Failed to fetch chapter list' }, 500)
    return c.json(result)
})

app.get('/manga', zValidator('query', mangaSchema), async (c) => {
    const data = c.req.valid('query')
    const result = await getMangaDetails(data)
    if (!result) return c.json({ error: 'Failed to fetch manga details' }, 500)
    return c.json(result)
})

app.get('/search', zValidator('query', searchSchema), async (c) => {
    const data = c.req.valid('query')
    const result = await searchManga(data, c.env.SCRAPER_API_KEY)
    if (!result) return c.json({ error: 'Failed to search manga' }, 500)
    return c.json(result)
})

app.get('/list', zValidator('query', filteredMangaSchema), async (c) => {
    const data = c.req.valid('query')
    const result = await getFilteredMangaList(data)
    if (!result) return c.json({ error: 'Failed to fetch manga list' }, 500)
    return c.json(result)
})

export default app
