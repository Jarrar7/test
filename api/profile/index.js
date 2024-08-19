import User from '../../src/models/User';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const email = req.query.email;
            const user = await User.findOne({ email: email }).select('-password');

            if (!user) return res.status(404).json({ message: 'User not found' });

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching user profile' });
        }
    } else if (req.method === 'PUT') {
        try {
            const { email, newPassword } = req.body;
            const user = await User.findOne({ email: email });

            if (!user) return res.status(404).json({ message: 'User not found' });

            user.password = newPassword;
            await user.save();

            res.json({ message: 'Password updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error updating password' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
