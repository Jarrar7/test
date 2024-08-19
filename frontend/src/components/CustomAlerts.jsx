import React, { useState, useEffect, useCallback } from 'react'; // Import necessary React hooks
import Header from './Header'; // Import the Header component

// Base URL for the API, sourced from environment variables
const API_URL = process.env.REACT_APP_API_URL;

const CustomAlerts = () => {
    // State to store cryptocurrency data fetched from the API
    const [cryptoData, setCryptoData] = useState({});
    // State to track the selected cryptocurrency for which the alert will be created
    const [selectedCrypto, setSelectedCrypto] = useState('');
    // State to track the alert price entered by the user
    const [alertPrice, setAlertPrice] = useState('');
    // State to track the type of alert (above, under, or reach)
    const [alertType, setAlertType] = useState('above');
    // State to store the list of active alerts
    const [activeAlerts, setActiveAlerts] = useState([]);

    // useEffect hook to fetch cryptocurrency data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Send a GET request to fetch crypto data
                const response = await fetch(`${API_URL}/api/CustomAlerts`);
                const data = await response.json();
                setCryptoData(data); // Store the fetched data in state
            } catch (error) {
                console.error('Error fetching data:', error); // Log any errors
            }
        };

        fetchData(); // Fetch data on component mount
        const interval = setInterval(fetchData, 1000); // Fetch data every second

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);

    // Function to create a new alert
    const createAlert = () => {
        // Check if all required fields are filled
        if (selectedCrypto && alertPrice && alertType) {
            const newAlert = {
                crypto: selectedCrypto, // The selected cryptocurrency
                price: parseFloat(alertPrice), // The alert price
                type: alertType, // The type of alert (above, under, reach)
            };

            // Add the new alert to the list of active alerts
            setActiveAlerts([...activeAlerts, newAlert]);
        }
    };

    // Function to delete an alert, memoized with useCallback to prevent unnecessary re-renders
    const deleteAlert = useCallback((index) => {
        // Remove the alert at the specified index
        setActiveAlerts((alerts) => alerts.filter((_, i) => i !== index));
    }, []);

    // useEffect hook to check alerts each time the cryptoData or activeAlerts change
    useEffect(() => {
        activeAlerts.forEach((alert, index) => {
            // Get the current price of the selected cryptocurrency
            const currentPrice = parseFloat(cryptoData[alert.crypto]?.p);

            // Check if the alert conditions are met
            if (
                (alert.type === 'above' && currentPrice > alert.price) || // Alert for price above the specified value
                (alert.type === 'under' && currentPrice < alert.price) || // Alert for price under the specified value
                (alert.type === 'reach' && currentPrice === alert.price)   // Alert for price reaching the specified value
            ) {
                // Trigger a browser alert and delete the triggered alert
                window.alert(`Alert! ${alert.crypto} has ${alert.type} ${alert.price}`);
                deleteAlert(index);
            }
        });
    }, [cryptoData, activeAlerts, deleteAlert]);

    return (
        <div>
            <Header /> {/* Render the Header component */}
            <div className="p-6 bg-gradient-to-br from-blue-100 via-blue-200 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 min-h-screen flex flex-col items-center">
                <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800 dark:text-gray-100">
                    Create a Price Alert
                </h2>
                <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
                    <div className="mb-4">
                        <label htmlFor="crypto-select" className="block text-lg font-semibold text-gray-700 dark:text-gray-300">
                            Choose a cryptocurrency:
                        </label>
                        <select
                            id="crypto-select"
                            className="w-full h-12 p-2 text-base border rounded-md border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            value={selectedCrypto}
                            onChange={(e) => setSelectedCrypto(e.target.value)} // Update the selected cryptocurrency
                        >
                            <option value="">Select a crypto</option>
                            {/* Map through available cryptocurrencies and create an option for each */}
                            {Object.keys(cryptoData).map((key) => (
                                <option key={key} value={key}>{key}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="alert-price" className="block text-lg font-semibold text-gray-700 dark:text-gray-300">
                            Alert Price ($):
                        </label>
                        <input
                            type="number"
                            id="alert-price"
                            className="w-full h-12 p-2 text-base border rounded-md border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            value={alertPrice}
                            onChange={(e) => setAlertPrice(e.target.value)} // Update the alert price
                            placeholder="Enter price for alert"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="alert-type" className="block text-lg font-semibold text-gray-700 dark:text-gray-300">
                            Alert Type:
                        </label>
                        <select
                            id="alert-type"
                            className="w-full h-12 p-2 text-base border rounded-md border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            value={alertType}
                            onChange={(e) => setAlertType(e.target.value)} // Update the alert type
                        >
                            <option value="above">Above the Price</option>
                            <option value="under">Under the Price</option>
                            <option value="reach">Reach the Price</option>
                        </select>
                    </div>
                    <button
                        className="w-full h-12 p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
                        onClick={createAlert} // Create a new alert on button click
                    >
                        Create Alert
                    </button>
                </div>

                <div className="mt-8 w-full max-w-md">
                    <h3 className="text-3xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
                        Active Alerts
                    </h3>
                    <ul className="space-y-4">
                        {/* Map through active alerts and render each one */}
                        {activeAlerts.map((alert, index) => (
                            <li
                                key={index}
                                className="p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 flex justify-between items-center"
                            >
                                <span>{alert.crypto} - {alert.type} - ${alert.price}</span>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => deleteAlert(index)} // Delete the alert on button click
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CustomAlerts;
