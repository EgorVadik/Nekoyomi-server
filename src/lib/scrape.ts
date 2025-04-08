import axios from 'axios'
import * as cheerio from 'cheerio'
import {
    COMPLETE_MANGA_URL,
    FILTER,
    GENRE_URL,
    LATEST_URL,
    MANGA_URL,
    NEW_MANGA_URL,
    POPULAR_URL,
    SCRAPER_URL,
    SEARCH_URL,
} from './constants'
import {
    type FilteredMangaSchema,
    type MangaChapterSchema,
    type MangaSchema,
    type SearchSchema,
} from './schema'
import { api, parseNumber, parseString } from './utils'

export async function getChapter(args: MangaChapterSchema) {
    try {
        const { chapter, title } = args
        const url = `${MANGA_URL}/${title}/${chapter}`
        const { data } = await api.get(url)
        const $ = cheerio.load(data)
        const chapterContainer = $('.container-chapter-reader')
        const chapterImages = chapterContainer.find('img')
        const images = chapterImages.map((_, img) => $(img).attr('src')).get()
        return images
    } catch (error) {
        console.error('Error:', error)
        return null
    }
}

export async function getChapterList(args: MangaSchema) {
    try {
        const { title } = args
        const url = `${MANGA_URL}/${title}`
        const { data } = await api.get(url)
        const $ = cheerio.load(data)
        const chapterList = $('.chapter-list')
        const chapters = chapterList.find('.row')
        const chapterLinks = chapters
            .map((_, chapter) => {
                const _chapter = $(chapter)
                const link = _chapter.find('a')
                const timeUploaded = _chapter.find('span[title]').attr('title')
                return {
                    link: link.attr('href'),
                    timeUploaded: timeUploaded ? new Date(timeUploaded) : null,
                    title: parseString(link.text()),
                }
            })
            .get()
        return {
            totalChapters: chapterLinks.length,
            chapters: chapterLinks,
        }
    } catch (error) {
        console.error('Error:', error)
        return null
    }
}

export async function getMangaDetails(args: MangaSchema) {
    try {
        const parsedData = args
        const url = `${MANGA_URL}/${parsedData.title}`
        const { data } = await api.get(url)
        const $ = cheerio.load(data)

        const chapterList = $('.chapter-list')
        const chapters = chapterList.find('.row')
        const chapterLinks = chapters
            .map((_, chapter) => {
                const _chapter = $(chapter)
                const link = _chapter.find('a')
                const timeUploaded = _chapter.find('span[title]').attr('title')
                return {
                    link: link.attr('href'),
                    timeUploaded: timeUploaded ? new Date(timeUploaded) : null,
                    title: parseString(link.text()),
                    slug: parseString(link.attr('href')?.split('/').at(-1)),
                }
            })
            .get()

        const mangaDetails = $('.manga-info-top')
        const cover = mangaDetails.find('.manga-info-pic > img').attr('src')
        const details = mangaDetails.find('.manga-info-text')
        const title = details.find('h1').text()
        const _author = details.find('li').eq(1).find('a')
        const author = {
            name: parseString(_author.text()),
            link: _author.attr('href'),
        }
        const status = details.find('li').eq(2).text().split(':').at(-1)?.trim()
        const lastUpdated = details
            .find('li')
            .eq(3)
            .text()
            .split(' : ')
            .at(-1)
            ?.trim()
        const genres = details.find('.genres > a').map((_, genre) => {
            const _genre = $(genre)
            return {
                name: parseString(_genre.text()),
                link: _genre.attr('href'),
            }
        })
        const description =
            parseString($('#contentBox').text())
                .split('summary:')
                .at(-1)
                ?.trim() ?? ''
        return {
            cover,
            title,
            author,
            status,
            lastUpdated: lastUpdated ? new Date(lastUpdated) : null,
            genres: genres.get(),
            description,
            chapters: {
                totalChapters: chapterLinks.length,
                chapters: chapterLinks,
            },
        }
    } catch (error) {
        console.error('Error:', error)
        return null
    }
}

export async function searchManga(args: SearchSchema) {
    try {
        const { query, page } = args
        const url = `${SEARCH_URL}/${query}`
        const { data } = await axios.get(url, {
            baseURL: SCRAPER_URL,
        })
        const $ = cheerio.load(data)
        const lastPage = parseNumber($('a.page_last').text())
        const searchResults = $('.panel_story_list')
            .find('.story_item')
            .map((_, story) => {
                const _story = $(story)
                const link = _story.find('a').attr('href')
                const cover = _story.find('a > img').attr('src')
                const details = _story.find('.story_item_right')
                const title = parseString(details.find('h3.story_name').text())

                return {
                    slug: parseString(link?.split('/').at(-1)),
                    cover,
                    title,
                    link,
                }
            })
            .get()
        return {
            data: searchResults,
            lastPage,
            hasNextPage: page < lastPage,
            nextPage: page + 1,
        }
    } catch (error) {
        console.error('Error:', error)
        return null
    }
}

export async function getFilteredMangaList(args: FilteredMangaSchema) {
    try {
        const { type, page, genre, filter } = args
        let url = ''

        switch (type) {
            case 'latest':
                url = LATEST_URL
                break
            case 'popular':
                url = POPULAR_URL
                break
            case 'new':
                url = NEW_MANGA_URL
                break
            case 'completed':
                url = COMPLETE_MANGA_URL
                break
            case 'genre':
                url = `${GENRE_URL}/${genre}`
                break
        }

        let filterKey: string | undefined

        if (filter != null) {
            filterKey = Object.entries(FILTER).find(
                ([_, value]) => value === filter
            )?.[0]
            url = `${GENRE_URL}/${genre ?? 'all'}`
        }

        const { data } = await api.get(url, {
            params: {
                page,
                filter: filterKey,
            },
        })

        const $ = cheerio.load(data)
        const lastPage = parseNumber($('a.page_last').text())
        const mangaList = $('.truyen-list')
            .find('.list-truyen-item-wrap')
            .map((_, manga) => {
                const _manga = $(manga)
                const link = _manga.find('a.cover').attr('href')
                const coverImg = _manga.find('a.cover > img')
                const cover = coverImg.attr('src')
                const title = parseString(_manga.find('h3 > a').text())
                return {
                    slug: parseString(link?.split('/').at(-1)),
                    cover,
                    title,
                    link,
                }
            })
            .get()
        return {
            data: mangaList,
            lastPage,
            hasNextPage: page < lastPage,
            nextPage: page + 1,
        }
    } catch (error) {
        console.error('Error:', error)
        return null
    }
}
