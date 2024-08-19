import { getCryptoData } from '../../src/websocket';

export default function handler(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust this as necessary
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end(); // Handle preflight requests
        return;
    }
    const cryptoData = getCryptoData();

    const processedData = Object.entries(cryptoData).map(([symbol, info]) => ({
        symbol,
        change: parseFloat(info.c),
        price: parseFloat(info.p),
    })).sort((a, b) => b.change - a.change);

    res.json(processedData);
}
