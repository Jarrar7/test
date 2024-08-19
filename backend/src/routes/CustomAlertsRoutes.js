const express = require('express'); // Import the express package to create the router
const router = express.Router(); // Create a new router instance
const { getCryptoData } = require('../websocket'); // Import the getCryptoData function from the websocket module

// Endpoint to get the custom alerts data
router.get('/', (req, res) => {
    const cryptoData = getCryptoData(); // Call the function to get the latest cryptocurrency data
    res.json(cryptoData); // Send the cryptocurrency data as a JSON response
});

module.exports = router; // Export the router for use in the main application