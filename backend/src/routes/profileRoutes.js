
const express = require('express'); // Import express to create the router
const router = express.Router(); // Create a new router instance
const User = require('../models/User'); // Import the User model

// Endpoint to get user profile by email
router.get('/', async (req, res) => {
    try {
        const email = req.query.email; // Get the email from query parameters
        const user = await User.findOne({ email: email }).select('-password'); // Find the user by email, excluding the password field

        // If the user is not found, return a 404 status with a relevant message
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user); // Return the user data as a JSON response
    } catch (error) {
        console.error('Error fetching user profile:', error); // Log the error for debugging
        res.status(500).json({ error: 'Error fetching user profile' }); // Return a 500 status with an error message
    }
});

// Endpoint to update user password by email
router.put('/password', async (req, res) => {
    try {
        const { email, newPassword } = req.body; // Destructure email and newPassword from the request body
        const user = await User.findOne({ email: email }); // Find the user by email

        // If the user is not found, return a 404 status with a relevant message
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.password = newPassword; // Update the user's password (Important: Hash the password in a real-world scenario)
        await user.save(); // Save the updated user data to the database

        res.json({ message: 'Password updated successfully' }); // Return a success message as a JSON response
    } catch (error) {
        console.error('Error updating password:', error); // Log the error for debugging
        res.status(500).json({ error: 'Error updating password' }); // Return a 500 status with an error message
    }
});

module.exports = router; // Export the router for use in the main application