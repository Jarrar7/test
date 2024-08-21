import { login } from '../../backend/src/controllers/authController';

export default function handler(req, res) {

    console.log(`Request method: ${req.method}`);



    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    // comment
    if (req.method === 'POST') {
        console.log("Handling POST request");
        return login(req, res);
    } else {
        console.log("Method not allowed");
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
