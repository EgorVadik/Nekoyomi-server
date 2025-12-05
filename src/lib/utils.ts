import axios from 'axios'
import { BASE_URL } from './constants'

export const api = axios.create({
    baseURL: BASE_URL,
})

export const parseString = (str?: string) =>
    str?.replace(/\n/g, '').trim() ?? ''

export const parseNumber = (str?: string) => {
    const match = str?.match(/\d+/g)
    return match ? parseInt(match[0]) : 0
}
