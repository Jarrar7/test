const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log('Register request:', { name, email, password });

        // Save user with plain text password
        const user = new User({ name, email, password });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'User registration failed' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login request:', { email, password });

        // Find user by email (case-insensitive)
        const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
        console.log('User found:', user); // Log the user found or null

        if (!user) {
            console.log('User not found for email:', email);
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Compare plain text passwords
        console.log('Comparing passwords:', password, user.password);
        if (password !== user.password) {
            console.log('Password does not match for user:', email);
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });

        console.log('Login successful for user:', email);

        // Set the token as a secure, HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true, // Prevents JavaScript from accessing the token
            secure: process.env.NODE_ENV === 'production', // Secure cookie in production (HTTPS)
            sameSite: 'Strict', // Protects against CSRF attacks
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        // Set the user email as a non-httpOnly cookie if needed
        res.cookie('userEmail', user.email, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        // Send a response back to the client
        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};

module.exports = { register, login };
