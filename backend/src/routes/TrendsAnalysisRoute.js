const express = require('express'); // Import the express package to create the router
const router = express.Router(); // Create a new router instance
const { getCryptoData } = require('../websocket'); // Import the getCryptoData function from the websocket module

// Endpoint to get the trends analysis data
router.get('/', (req, res) => {
    const cryptoData = getCryptoData(); // Retrieve the latest cryptocurrency data

    // Process the data to extract relevant information for trends analysis
    const processedData = Object.entries(cryptoData).map(([symbol, info]) => ({
        symbol, // The cryptocurrency symbol (e.g., BTC, ETH)
        change: parseFloat(info.c), // Parse and include the price change percentage
        price: parseFloat(info.p), // Parse and include the current price
    })).sort((a, b) => b.change - a.change); // Sort the data by change percentage in descending order

    res.json(processedData); // Send the processed trends analysis data as a JSON response
});

module.exports = router; // Export the router for use in the main application
