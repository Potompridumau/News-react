import axios from "axios"

const BASE_URL = import.meta.env.VITE_NEWS_BASE_API_URL
const API_KEY = import.meta.env.VITE_NEWS_API_KEY

export const getNews = async ({ page_number = 1, page_size = 10, category, keywords }) => {
    try {
        const res = await axios.get(`${BASE_URL}search`, {
            params: {
                apiKey: API_KEY,
                page_number,
                page_size,
                category,
                keywords
            }
        })
        return res.data
    } catch (error) {
        throw new Error(error)
    }
}

export const getCategories = async () => {
    try {
        const res = await axios.get(`${BASE_URL}available/categories`, {
            params: {
                apiKey: API_KEY
            }
        })
        return res.data
    } catch (error) {
        throw new Error(error)
    }
}