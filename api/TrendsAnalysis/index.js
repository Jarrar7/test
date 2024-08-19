import { getCryptoData } from '../../src/websocket';

export default function handler(req, res) {
    const cryptoData = getCryptoData();

    const processedData = Object.entries(cryptoData).map(([symbol, info]) => ({
        symbol,
        change: parseFloat(info.c),
        price: parseFloat(info.p),
    })).sort((a, b) => b.change - a.change);

    res.json(processedData);
}
