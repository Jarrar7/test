import { getCryptoData } from '../../src/websocket';
import fetch from 'node-fetch';

export default async function handler(req, res) {
    try {
        const cryptoData = getCryptoData();

        const response = await fetch('https://mtickers.mtw-testnet.com/tickers/all');
        const data = await response.json();

        const logoResponse = await fetch('https://api.mtw-testnet.com/assets/all');
        const logos = await logoResponse.json();

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

        const mergedData = Object.keys(data).map(key => ({
            id: key,
            price: data[key].p,
            logo: logoMap[key]?.image || null,
            name: logoMap[key]?.name || 'N/A',
            website: logoMap[key]?.website || 'N/A',
            summary: logoMap[key]?.summary || 'No summary available',
        }));

        res.json(mergedData);
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
        res.status(500).json({ error: 'Failed to fetch cryptocurrency data' });
    }
}
