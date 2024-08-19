import axios from 'axios';

const NEWS_API_KEY = '6d883caba4e842a180b26d10a55bdb40';
const PAGE_SIZE = 5;

export default async function handler(req, res) {
    const page = parseInt(req.query.page) || 1;

    try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=${NEWS_API_KEY}&pageSize=${PAGE_SIZE}&page=${page}`);

        const totalResults = response.data.totalResults;
        const totalPages = Math.ceil(totalResults / PAGE_SIZE);

        res.json({
            articles: response.data.articles,
            totalPages,
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news' });
    }
}
