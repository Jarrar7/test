import React, { useState, useEffect } from 'react'; // Import necessary React hooks
import Header from './Header'; // Import the Header component

// Base URL for the API, sourced from environment variables
const API_URL = process.env.REACT_APP_API_URL;

const CryptoNews = () => {
    // State to store the list of news articles
    const [news, setNews] = useState([]);
    // State to store the filtered list of news articles based on the search term
    const [filteredNews, setFilteredNews] = useState([]);
    // State to store the search term input by the user
    const [searchTerm, setSearchTerm] = useState('');
    // State to manage the current page number for pagination
    const [currentPage, setCurrentPage] = useState(1);
    // State to store the total number of pages available
    const [totalPages, setTotalPages] = useState(1);
    // State to manage the loading status
    const [loading, setLoading] = useState(true);
    // State to handle any errors that occur during data fetching
    const [error, setError] = useState(null);

    // Function to fetch news articles from the API based on the current page
    const fetchNews = async (page) => {
        setLoading(true); // Start the loading process
        setError(null); // Clear any previous errors
        try {
            // Send a GET request to fetch news articles for the specified page
            const response = await fetch(`${API_URL}/api/news/crypto-news?page=${page}`);
            // Parse the response data as JSON
            const data = await response.json();
            // Update the news and filtered news states with the fetched articles
            setNews(data.articles);
            setFilteredNews(data.articles);
            // Update the total pages and current page states with the data from the API
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
            setLoading(false); // Stop the loading process
        } catch (error) {
            // Log the error and update the error state
            console.error('Error fetching news:', error);
            setError('Failed to fetch news. Please try again later.');
            setLoading(false); // Stop the loading process
        }
    };

    // useEffect hook to fetch news when the component mounts or when currentPage changes
    useEffect(() => {
        fetchNews(currentPage);
    }, [currentPage]);

    // useEffect hook to filter news articles based on the search term
    useEffect(() => {
        if (searchTerm) {
            // Filter news articles by checking if the title or description includes the search term
            const filtered = news.filter((article) =>
                article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredNews(filtered);
        } else {
            // If no search term is entered, show all news articles
            setFilteredNews(news);
        }
    }, [searchTerm, news]);

    // Function to handle the "Next Page" button click
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1); // Go to the next page
        }
    };

    // Function to handle the "Previous Page" button click
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1); // Go to the previous page
        }
    };

    return (
        <div>
            <Header /> {/* Render the Header component */}
            <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
                <h2 className="text-5xl font-bold mb-8 text-center text-gray-800 dark:text-white">
                    Latest Crypto News
                </h2>
                <div className="max-w-6xl mx-auto">
                    {/* Search Input Field */}
                    <div className="mb-8 flex justify-center">
                        <input
                            type="text"
                            placeholder="🔍 Search news..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
                            className="w-full sm:w-1/2 p-3 text-lg rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-500 dark:focus:ring-blue-500 transition duration-300"
                        />
                    </div>
                    {/* Display loader, error, or news articles based on the current state */}
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-500 dark:border-blue-300 h-16 w-16 mb-4"></div>
                        </div>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p> // Display error message if any
                    ) : (
                        <>
                            <ul className="space-y-8">
                                {/* Map through the filtered news articles and render each one */}
                                {filteredNews.map((article, index) => (
                                    <li
                                        key={index}
                                        className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
                                    >
                                        {/* Link to the full article */}
                                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                                            <h3 className="text-3xl font-bold mb-4">{article.title}</h3>
                                            {article.urlToImage && (
                                                <img
                                                    src={article.urlToImage}
                                                    alt={article.title}
                                                    className="w-full h-64 object-cover rounded-lg mb-4"
                                                />
                                            )}
                                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                                                {article.description}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Source: {article.source.name}
                                            </p>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex justify-between items-center mt-12">
                                {/* Button to navigate to the previous page */}
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1} // Disable if on the first page
                                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
                                >
                                    Previous
                                </button>
                                {/* Display current page and total pages */}
                                <span className="text-lg text-gray-800 dark:text-gray-100">
                                    Page {currentPage} of {totalPages}
                                </span>
                                {/* Button to navigate to the next page */}
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages} // Disable if on the last page
                                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CryptoNews; // Export the component for use in other parts of the application
