import axios from 'axios';

const coinNameMap = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    BNB: 'binancecoin',
    DOGE: 'dogecoin',
    SHIB: 'shiba-inu',
    ADA: 'cardano',
    LINK: 'chainlink',
};

export default async function handler(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust this as necessary
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end(); // Handle preflight requests
        return;
    }

    const { symbol, interval } = req.query;
    const coinName = coinNameMap[symbol.toUpperCase()];
    const validIntervals = ['1', '30', '365'];

    if (!coinName) {
        return res.status(400).json({ error: `Unsupported symbol: ${symbol}` });
    }

    if (!validIntervals.includes(interval)) {
        return res.status(400).json({ error: `Unsupported interval: ${interval}` });
    }

    try {
        const response = await axios.get(`https://mdata.mtw-testnet.com/item/${coinName}/${interval}`);

        if (Array.isArray(response.data)) {
            const historicalData = response.data.map(item => ({
                timestamp: item[0],
                open: item[1],
                high: item[2],
                low: item[3],
                close: item[4]
            }));

            res.json({ historicalData });
        } else {
            res.status(500).json({ error: 'Unexpected response structure', data: response.data });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch historical data', details: error.response ? error.response.data : error.message });
    }
}
