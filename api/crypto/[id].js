import fetch from 'node-fetch';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust this as necessary
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end(); // Handle preflight requests
        return;
    }


    const { id } = req.query;

    try {
        const response = await fetch('https://mtickers.mtw-testnet.com/tickers/all');
        if (!response.ok) {
            throw new Error('Error fetching data from external API');
        }
        const data = await response.json();

        const logoResponse = await fetch('https://api.mtw-testnet.com/assets/all');
        if (!logoResponse.ok) {
            throw new Error('Error fetching logos from external API');
        }
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

        const cryptoInfo = {
            id,
            price: data[id]?.p,
            logo: logoMap[id]?.image || null,
            name: logoMap[id]?.name || 'N/A',
            website: logoMap[id]?.website || 'N/A',
            summary: logoMap[id]?.summary || 'No summary available',
        };

        res.json(cryptoInfo);
    } catch (error) {
        console.error(`Error fetching data for ${id}:`, error);
        res.status(500).json({ error: `Failed to fetch data for ${id}` });
    }
}
