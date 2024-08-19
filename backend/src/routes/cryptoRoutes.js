const express = require('express'); // Import express to create the router
const router = express.Router(); // Create a new router instance
const axios = require('axios'); // Import axios for making HTTP requests
const { getCryptoData } = require('../websocket'); // Import the getCryptoData function from the websocket module

// Map of cryptocurrency symbols to their names (for external API requests)
const coinNameMap = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    BNB: 'binancecoin',
    DOGE: 'dogecoin',
    SHIB: 'shiba-inu',
    ADA: 'cardano',
    LINK: 'chainlink'
};

// Endpoint to get all cryptocurrency data with additional logo and summary info
router.get('/all', async (req, res) => {
    try {
        const cryptoData = getCryptoData(); // Retrieve the latest cryptocurrency data
        const fetch = (await import('node-fetch')).default; // Dynamically import node-fetch for making requests

        // Fetch general cryptocurrency data from an external API
        const response = await fetch('https://mtickers.mtw-testnet.com/tickers/all');
        const data = await response.json();

        // Fetch additional logo and summary information from another API
        const logoResponse = await fetch('https://api.mtw-testnet.com/assets/all');
        const logos = await logoResponse.json();

        // Extend the logos data with specific information for SHIB and LINK
        const logoMap = {
            ...logos,
            SHIB: {
                image: 'https://res.coinpaper.com/coinpaper/shiba_inu_shib_logo_a8ec09a691.png',
                name: 'Shiba Inu',
                website: 'https://shibatoken.com/',
                summary: 'Shiba Inu is a decentralized meme token that grew into a vibrant ecosystem.',
            },
            LINK: {
                image: 'https://res.coinpaper.com/coinpaper/chainlink_link_logo_26ead02910.png',
                name: 'Chainlink',
                website: 'https://chain.link/',
                summary: 'Chainlink is a decentralized oracle network that enables smart contracts to securely connect to external data sources, APIs, and payment systems.',
            },
        };

        // Merge the data from both sources to create a comprehensive dataset
        const mergedData = Object.keys(data).map(key => ({
            id: key,
            price: data[key].p,
            logo: logoMap[key]?.image || null,
            name: logoMap[key]?.name || 'N/A',
            website: logoMap[key]?.website || 'N/A',
            summary: logoMap[key]?.summary || 'No summary available',
        }));

        res.json(mergedData); // Send the merged data as a JSON response
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error); // Log any errors that occur
        res.status(500).json({ error: 'Failed to fetch cryptocurrency data' }); // Send an error response
    }
});

// Endpoint to get detailed data for a specific cryptocurrency by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters
    console.log(`Fetching data for ${id}`);
    try {
        const fetch = (await import('node-fetch')).default; // Dynamically import node-fetch

        // Fetch general cryptocurrency data
        const response = await fetch('https://mtickers.mtw-testnet.com/tickers/all');
        if (!response.ok) {
            console.error('Error fetching data from external API');
            throw new Error('Error fetching data from external API');
        }
        const data = await response.json();

        // Fetch additional logo and summary information
        const logoResponse = await fetch('https://api.mtw-testnet.com/assets/all');
        if (!logoResponse.ok) {
            console.error('Error fetching logos from external API');
            throw new Error('Error fetching logos from external API');
        }
        const logos = await logoResponse.json();

        // Extend the logos data with specific information for SHIB and LINK
        const logoMap = {
            ...logos,
            SHIB: {
                image: 'https://res.coinpaper.com/coinpaper/shiba_inu_shib_logo_a8ec09a691.png',
                name: 'Shiba Inu',
                website: 'https://shibatoken.com/',
                summary: 'Shiba Inu is a decentralized meme token that grew into a vibrant ecosystem.',
            },
            LINK: {
                image: 'https://res.coinpaper.com/coinpaper/chainlink_link_logo_26ead02910.png',
                name: 'Chainlink',
                website: 'https://chain.link/',
                summary: 'Chainlink is a decentralized oracle network that enables smart contracts to securely connect to external data sources, APIs, and payment systems.',
            },
        };

        // Construct the detailed information for the requested cryptocurrency
        const cryptoInfo = {
            id,
            price: data[id]?.p,
            logo: logoMap[id]?.image || null,
            name: logoMap[id]?.name || 'N/A',
            website: logoMap[id]?.website || 'N/A',
            summary: logoMap[id]?.summary || 'No summary available',
        };

        res.json(cryptoInfo); // Send the detailed data as a JSON response
    } catch (error) {
        console.error(`Error fetching data for ${id}:`, error); // Log any errors that occur
        res.status(500).json({ error: `Failed to fetch data for ${id}` }); // Send an error response
    }
});

// Endpoint to get historical data for a specific cryptocurrency based on symbol and interval
router.get('/historical/:symbol/:interval', async (req, res) => {
    const { symbol, interval } = req.params; // Extract the symbol and interval from the request parameters
    const coinName = coinNameMap[symbol.toUpperCase()]; // Map the symbol to a coin name
    const validIntervals = ['1', '30', '365']; // Define valid intervals

    // Validate the symbol and interval
    if (!coinName) {
        return res.status(400).json({ error: `Unsupported symbol: ${symbol}` });
    }

    if (!validIntervals.includes(interval)) {
        return res.status(400).json({ error: `Unsupported interval: ${interval}` });
    }

    try {
        // Fetch historical data for the specified coin and interval
        const response = await axios.get(`https://mdata.mtw-testnet.com/item/${coinName}/${interval}`);
        console.log(`Response for ${symbol} with interval ${interval}:`, response.data);

        // Log the full response to understand its structure
        console.log('Full API response:', JSON.stringify(response.data, null, 2));

        // If the response data is an array, map it to a more readable format
        if (Array.isArray(response.data)) {
            const historicalData = response.data.map(item => ({
                timestamp: item[0],
                open: item[1],
                high: item[2],
                low: item[3],
                close: item[4]
            }));

            res.json({ historicalData }); // Send the historical data as a JSON response
        } else {
            console.error(`Unexpected response structure for ${symbol}:`, response.data);
            res.status(500).json({ error: 'Unexpected response structure', data: response.data }); // Send an error response if the structure is unexpected
        }
    } catch (error) {
        console.error(`Error fetching historical data for ${symbol}:`, error.response ? error.response.data : error.message); // Log any errors that occur
        res.status(500).json({ error: 'Failed to fetch historical data', details: error.response ? error.response.data : error.message }); // Send an error response
    }
});

module.exports = router; // Export the router for use in the main application