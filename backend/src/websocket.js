const WebSocket = require('ws'); // Import the WebSocket package

let cryptoData = {}; // Initialize an empty object to store cryptocurrency data

// Setup WebSocket connection to the specified URL
const socket = new WebSocket('wss://mtickers.mtw-testnet.com/');

socket.onopen = () => {
    console.log('WebSocket connection opened'); // Log when the WebSocket connection is successfully opened
};

socket.onmessage = (e) => {
    try {
        const data = JSON.parse(e.data); // Parse the incoming data from JSON format
        //console.log('Received data:', data); // Optionally log the received data

        // Store the parsed data in the cryptoData object
        cryptoData = data;
    } catch (error) {
        console.error('Error parsing message data:', error); // Log any errors that occur while parsing the data
    }
};

socket.onclose = () => {
    console.log('WebSocket connection closed'); // Log when the WebSocket connection is closed
};

socket.onerror = (error) => {
    console.error('WebSocket error:', error); // Log any errors that occur with the WebSocket connection
};

// Function to retrieve the latest cryptocurrency data
const getCryptoData = () => cryptoData;

module.exports = { getCryptoData }; // Export the getCryptoData function for use in other parts of the application