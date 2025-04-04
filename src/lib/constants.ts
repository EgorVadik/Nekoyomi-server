export const BASE_URL = 'https://www.mangakakalot.gg'
export const SCRAPER_URL = (env: string) =>
    `https://api.scraperapi.com/?api_key=${env}&url=${BASE_URL}` as const
export const MANGA_URL = '/manga'
export const SEARCH_URL = '/search/story'
export const LATEST_URL = '/manga-list/latest-manga'
export const POPULAR_URL = '/manga-list/hot-manga'
export const NEW_MANGA_URL = '/manga-list/new-manga'
export const COMPLETE_MANGA_URL = '/manga-list/completed-manga'
export const GENRE_URL = '/genre'

export const GENRES = [
    'All',
    'Comedy',
    'Supernatural',
    'Drama',
    'Fantasy',
    'Action',
    'Josei',
    'Adventure',
    'Romance',
    'Smut',
    'Manhwa',
    'Tragedy',
    'Slice of life',
    'School life',
    'Seinen',
    'Historical',
    'Harem',
    'Horror',
    'Psychological',
    'Mystery',
    'Shounen',
    'Martial arts',
    'Manhua',
    'Shoujo',
    'Isekai',
    'Erotica',
    'Gender bender',
    'Mature',
    'Webtoons',
    'Shoujo ai',
    'Yaoi',
    'Yuri',
    'Medical',
    'Mecha',
    'Shounen ai',
    'Sports',
    'Cooking',
    'Sci fi',
    'One shot',
    'Ecchi',
    'Adult',
    'Pornographic',
    'Doujinshi',
    'Long Strip',
    'Survival',
    'Adaptation',
    'Official Colored',
    'Wuxia',
    'Thriller',
    'Web Comic',
    'Full Color',
    'Reincarnation',
    'Monsters',
    'Military',
    'Philosophical',
    'Gyaru',
    'Bloody',
    'Demons',
    'System',
    'Loli',
    'Ninja',
    'Incest',
    'Crime',
    'Office Workers',
    'Sexual Violence',
    'Crossdressing',
    'Gore',
    'Delinquents',
    'Shota',
    'Police',
    'Manga',
    'Time Travel',
    'Monster Girls',
    'Anthology',
    '4-Koma',
    'Oneshot',
    'Animals',
    'Heartwarming',
    'Superhero',
    'Magic',
    'Genderswap',
    'Post-Apocalyptic',
    'Music',
    'Sci-Fi',
    'Self-Published',
    'Aliens',
    'Villainess',
    'Virtual Reality',
    'Ghosts',
    'Award Winning',
    'Video Games',
    'Magical Girls',
    'Reverse Harem',
    'Fan Colored',
    'Zombies',
    'Mafia',
    'Webtoon',
    'Royal family',
    'Manhwa Hot',
    'Traditional Games',
    'Magical',
    'Vampires',
    'Revenge',
    'ecchi 2',
    'Post apocalyptic',
    'Samurai',
    'Yaoi(BL)',
    'Monster',
    'Super Power',
    'Animal',
    'Game',
    'Comic',
    'Science fiction',
    'Office',
    'School',
    'Parody',
    'Iyashikei',
    'Girls Love',
    'Boys Love',
    'Mahou Shoujo',
    'Suspense',
    'Vampire',
    'Kids',
    'Space',
    'Gourmet',
] as const

export const FILTER = {
    1: 'newest-all',
    2: 'newest-completed',
    3: 'newest-ongoing',
    4: 'latest-all',
    5: 'latest-completed',
    6: 'latest-ongoing',
    7: 'top-all',
    8: 'top-completed',
    9: 'top-ongoing',
} as const
