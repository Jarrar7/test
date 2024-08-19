import { register } from '../src/controllers/authController';

export default function handler(req, res) {
    if (req.method === 'POST') {
        return register(req, res);
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
