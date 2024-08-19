import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const CryptoList = () => {
    // State to store the list of cryptocurrencies
    const [cryptos, setCryptos] = useState([]);
    // State to manage the loading state
    const [loading, setLoading] = useState(true);
    // State to handle any errors that occur during data fetching
    const [error, setError] = useState(null);
    // Base URL for the API, sourced from environment variables
    const API_URL = process.env.REACT_APP_API_URL;
    // React Router's hook to navigate programmatically
    const navigate = useNavigate();

    // useEffect hook to fetch cryptocurrency data when the component mounts
    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                // Send a GET request to fetch all cryptocurrencies
                const response = await fetch(`${API_URL}/api/crypto/all`);
                // Check if the response is not OK, and throw an error if so
                if (!response.ok) {
                    throw new Error(`Error fetching crypto data: ${response.statusText}`);
                }
                // Parse the response data as JSON
                const data = await response.json();
                // Update the cryptos state with the fetched data
                setCryptos(data);
                // Set loading to false after data is fetched
                setLoading(false);
            } catch (error) {
                // Log any errors that occur and update the error state
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        // Call the fetchCryptos function
        fetchCryptos();
    }, [API_URL]); // Dependency array includes API_URL to refetch data if it changes

    // If the data is still loading, display a loading spinner
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    // If there was an error during data fetching, display an error message
    if (error) {
        return (
            <div className="flex items-center justify-center h-screen px-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md w-full" role="alert">
                    <strong className="font-bold">Error:</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full min-h-screen pb-16 pt-8 px-4 sm:px-6 lg:px-8">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-gray-200 to-blue-200 opacity-60"></div>
            <div className="relative text-center mb-12">
                <h2 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Discover Top Cryptocurrencies
                </h2>
                <p className="mt-4 text-xl leading-7 text-gray-600 dark:text-gray-300">
                    Stay ahead of the market with the latest data on the most popular digital assets.
                </p>
            </div>
            {/* List of cryptocurrencies */}
            <ul className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10">
                {cryptos.map(crypto => (
                    <li
                        key={crypto.id}
                        className="bg-gradient-to-b from-blue-100 via-gray-100 to-blue-100 dark:bg-gradient-to-b dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 text-gray-900 dark:text-white overflow-hidden shadow-md rounded-lg transform hover:scale-105 transition-transform duration-200"
                    >
                        <div className="px-6 py-6 sm:p-8">
                            <div className="flex items-center">
                                {crypto.logo ? (
                                    // Display the cryptocurrency logo if available
                                    <img
                                        src={crypto.logo}
                                        alt={`${crypto.name} logo`}
                                        className="w-16 h-16 mr-4 rounded-full object-cover border-2 border-gray-300 dark:border-gray-500"
                                    />
                                ) : (
                                    // If no logo is available, display the first letter of the crypto name
                                    <div className="w-16 h-16 mr-4 bg-gray-400 dark:bg-gray-500 rounded-full flex items-center justify-center text-gray-200">
                                        <span className="text-2xl font-bold">{crypto.name.charAt(0)}</span>
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-2xl leading-tight font-semibold dark:text-gray-100">
                                        {crypto.name}
                                    </h3>
                                    <p className="mt-1 text-lg leading-6 dark:text-gray-300">
                                        Price: ${Number(crypto.price).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            {/* Display the cryptocurrency summary or a fallback message */}
                            <p className="mt-4 text-md leading-7 h-20 overflow-hidden dark:text-gray-400">
                                {crypto.summary ? crypto.summary : 'No description available.'}
                            </p>
                            <div className="mt-6">
                                {/* Button to view more details about the cryptocurrency */}
                                <button
                                    onClick={() => navigate(`/crypto/${crypto.id}?showGraph=true`)}
                                    className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-lg leading-6 font-medium rounded-md bg-gray-700 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 text-white focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                                >
                                    View Details
                                    {/* Icon that animates slightly on hover */}
                                    <FiArrowRight className="ml-2 transition-transform duration-150 ease-in-out transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CryptoList;
