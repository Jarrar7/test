import { login } from '../../backend/src/controllers/authController';

export default function handler(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust this as necessary
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end(); // Handle preflight requests
        return;
    }

    if (req.method === 'POST') {
        return login(req, res);
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
