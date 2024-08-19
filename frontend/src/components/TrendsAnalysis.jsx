import React, { useState, useEffect } from 'react';
import Header from './Header'; // Importing the Header component

const API_URL = process.env.REACT_APP_API_URL; // Getting the API URL from environment variables

// Mapping cryptocurrency symbols to their corresponding logo images
const logoMap = {
    BTC: require('../assets/BTCLogo.png'),
    ETH: require('../assets/ETHLogo.png'),
    DOGE: require('../assets/DogeLogo.png'),
    BNB: require('../assets/BNBLogo.png'),
    ADA: require('../assets/CardanoLogo.png'),
    SHIB: require('../assets/ShibaLogo.png'),
    LINK: require('../assets/LinkLogo.png'),
    // Add more mappings here as needed
};

const TrendsAnalysis = () => {
    const [cryptoData, setCryptoData] = useState({ gainers: [], losers: [] }); // State to hold gainers and losers data

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetching cryptocurrency trends data from the API
                const response = await fetch(`${API_URL}/api/TrendsAnalysis`);
                const data = await response.json();

                // Separating the cryptocurrencies into gainers and losers based on their change in value
                const gainers = data.filter(crypto => crypto.change > 0);
                const losers = data.filter(crypto => crypto.change < 0);

                // Updating the state with the fetched data
                setCryptoData({ gainers, losers });
            } catch (error) {
                console.error('Error fetching data:', error); // Log any errors that occur during the fetch
            }
        };

        fetchData(); // Fetch the data when the component mounts
        const interval = setInterval(fetchData, 1000); // Re-fetch the data every second

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);

    return (
        <div>
            <Header /> {/* Render the Header component */}
            <div className="p-6 bg-gradient-to-b from-blue-50 to-blue-200 dark:from-gray-900 dark:to-gray-800 min-h-screen">
                <h2 className="text-5xl font-extrabold mb-10 text-center text-blue-800 dark:text-gray-100">
                    Trends Analysis
                </h2>
                <div className="max-w-6xl mx-auto">
                    {/* Section for top gainers */}
                    <h3 className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-6">
                        Top Gainers
                    </h3>
                    <div className="overflow-x-auto shadow-lg rounded-lg mb-10">
                        <table className="min-w-full bg-white dark:bg-gray-900 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr className="bg-teal-100 dark:bg-teal-900">
                                    <th className="px-6 py-4 text-left text-sm font-medium text-teal-800 dark:text-teal-300 uppercase tracking-wider">
                                        Symbol
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-medium text-teal-800 dark:text-teal-300 uppercase tracking-wider">
                                        Change
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-medium text-teal-800 dark:text-teal-300 uppercase tracking-wider">
                                        Last Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {/* Mapping over the gainers array to display each gaining cryptocurrency */}
                                {cryptoData.gainers.map((crypto, index) => (
                                    <tr key={index} className="hover:bg-teal-50 dark:hover:bg-teal-800 transition duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                                            {/* Displaying the cryptocurrency logo if available */}
                                            {logoMap[crypto.symbol] && (
                                                <img src={logoMap[crypto.symbol]} alt={`${crypto.symbol} logo`} className="w-8 h-8 mr-4" />
                                            )}
                                            <span className="text-gray-900 dark:text-gray-100">{crypto.symbol}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-teal-700 dark:text-teal-400">
                                            {crypto.change}%
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600 dark:text-gray-400">
                                            ${crypto.price}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Section for top losers */}
                    <h3 className="text-3xl font-bold text-rose-600 dark:text-rose-400 mb-6">
                        Top Losers
                    </h3>
                    <div className="overflow-x-auto shadow-lg rounded-lg">
                        <table className="min-w-full bg-white dark:bg-gray-900 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr className="bg-rose-100 dark:bg-rose-900">
                                    <th className="px-6 py-4 text-left text-sm font-medium text-rose-800 dark:text-rose-300 uppercase tracking-wider">
                                        Symbol
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-medium text-rose-800 dark:text-rose-300 uppercase tracking-wider">
                                        Change
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-medium text-rose-800 dark:text-rose-300 uppercase tracking-wider">
                                        Last Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {/* Mapping over the losers array to display each losing cryptocurrency */}
                                {cryptoData.losers.map((crypto, index) => (
                                    <tr key={index} className="hover:bg-rose-50 dark:hover:bg-rose-800 transition duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                                            {/* Displaying the cryptocurrency logo if available */}
                                            {logoMap[crypto.symbol] && (
                                                <img src={logoMap[crypto.symbol]} alt={`${crypto.symbol} logo`} className="w-8 h-8 mr-4" />
                                            )}
                                            <span className="text-gray-900 dark:text-gray-100">{crypto.symbol}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-rose-700 dark:text-rose-400">
                                            {crypto.change}%
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600 dark:text-gray-400">
                                            ${crypto.price}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrendsAnalysis; // Export the component for use in other parts of the application
