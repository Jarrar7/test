import { getCryptoData } from '../../src/websocket';

export default function handler(req, res) {
    const cryptoData = getCryptoData();
    res.json(cryptoData);
}
