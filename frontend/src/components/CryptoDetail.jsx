
import React, { useEffect, useState } from 'react'; // Import necessary React hooks
import { useParams, useLocation } from 'react-router-dom'; // Import hooks to handle route parameters and location
import LiveChart from './LiveChart'; // Import the LiveChart component
import Header from './Header'; // Import the Header component

// Define the base URL for the API, coming from environment variables
const API_URL = process.env.REACT_APP_API_URL;

const CryptoDetail = () => {
    // Extract the 'id' parameter from the URL
    const { id } = useParams();
    // Get the current location object, which includes the search query parameters
    const location = useLocation();

    // State to manage loading status
    const [loading, setLoading] = useState(true);
    // State to handle errors during data fetching
    const [error, setError] = useState(null);
    // State to store the fetched cryptocurrency information
    const [cryptoInfo, setCryptoInfo] = useState(null);
    // State to determine whether to show the graph based on query parameters
    const [showGraph, setShowGraph] = useState(false);

    useEffect(() => {
        // Parse the search query parameters from the URL to decide if the graph should be shown
        const queryParams = new URLSearchParams(location.search);
        setShowGraph(queryParams.get('showGraph') === 'true');

        // Function to fetch the cryptocurrency data from the API
        const fetchCryptoInfo = async () => {
            try {
                // Fetch data from the API using the provided cryptocurrency ID
                const response = await fetch(`${API_URL}/api/crypto/${id}`);
                // Check if the response is okay (status in the range 200-299)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the response data as JSON
                const data = await response.json();
                // Store the fetched data in the state
                setCryptoInfo(data);
                // Set loading to false as data has been successfully fetched
                setLoading(false);
            } catch (error) {
                // In case of an error, store it in the state and stop the loading
                setError(error);
                setLoading(false);
            }
        };

        // Invoke the function to fetch data
        fetchCryptoInfo();
    }, [id, location.search]); // Re-run the effect if the 'id' or 'location.search' changes

    // If data is still loading, show a loading message
    if (loading) return <p>Loading...</p>;
    // If there was an error during fetching, display the error message
    if (error) return <p>{error.message}</p>;

    return (
        <div>
            <Header /> {/* Render the Header component */}
            <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-8">
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-3xl mx-auto">
                    {/* Display the name of the cryptocurrency */}
                    <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
                        {cryptoInfo.name}
                    </h1>
                    <div className="flex justify-center items-center mb-6">
                        {/* Display the logo of the cryptocurrency */}
                        <img src={cryptoInfo.logo} alt={`${cryptoInfo.name} logo`} className="w-16 h-16 mr-4" />
                        {/* Provide a link to the official website of the cryptocurrency */}
                        <a href={cryptoInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline text-lg">
                            Official Website
                        </a>
                    </div>
                    {/* Conditionally render the LiveChart component if showGraph is true */}
                    {showGraph && <LiveChart symbol={id} />}
                </div>
            </div>
        </div>
    );
};

export default CryptoDetail; // Export the component for use in other parts of the application