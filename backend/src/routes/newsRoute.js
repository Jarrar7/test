const express = require('express'); // Import express to create the router
const router = express.Router(); // Create a new router instance
const axios = require('axios'); // Import axios for making HTTP requests

// Replace with your NewsAPI key
const NEWS_API_KEY = '6d883caba4e842a180b26d10a55bdb40';
const PAGE_SIZE = 5; // Number of articles to fetch per page

// Endpoint to fetch cryptocurrency-related news articles
router.get('/crypto-news', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the current page number from the query parameters, default to 1

    try {
        // Make a request to the NewsAPI to fetch articles related to cryptocurrency
        const response = await axios.get(`https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=${NEWS_API_KEY}&pageSize=${PAGE_SIZE}&page=${page}`);
        
        const totalResults = response.data.totalResults; // Total number of results returned by the API
        const totalPages = Math.ceil(totalResults / PAGE_SIZE); // Calculate the total number of pages

        // Send the articles, total number of pages, and current page as a JSON response
        res.json({
            articles: response.data.articles,
            totalPages,
            currentPage: page
        });
    } catch (error) {
        console.error('Error fetching news:', error); // Log any errors that occur
        res.status(500).json({ error: 'Failed to fetch news' }); // Send an error response
    }
});

module.exports = router; // Export the router for use in the main application