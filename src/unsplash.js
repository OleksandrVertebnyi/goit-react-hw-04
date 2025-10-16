import axios from "axios";

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const api = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

export const fetchImages = async ( {query, page = 1, perPage = 12} ) => {
    const params = {
        query,
        page,
        per_page: perPage,
        orientation: 'portrait',
    };

    const response = await api.get("/search/photos", { params });
    return {
        results: response.data.results,
        total: response.data.total,
        totalpages: response.data.total_pages,
    }
};