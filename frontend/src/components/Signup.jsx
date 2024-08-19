import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importing CSS for toast notifications
import bitcoinLogo from '../assets/BTCLogo.png';
import ethereumLogo from '../assets/ETHLogo.png';
import dogecoinLogo from '../assets/DogeLogo.png';
import shibaLogo from '../assets/ShibaLogo.png';
import cardanoLogo from '../assets/CardanoLogo.png';
import bnbLogo from '../assets/BNBLogo.png';
import logo from '../assets/logo.png'; // Importing various logos and the main logo

const API_URL = process.env.REACT_APP_API_URL; // Getting the API URL from environment variables

const Signup = () => {
    const [name, setName] = useState(''); // State for the name input field
    const [email, setEmail] = useState(''); // State for the email input field
    const [password, setPassword] = useState(''); // State for the password input field
    const [confirmPassword, setConfirmPassword] = useState(''); // State for the confirm password input field
    const navigate = useNavigate(); // React Router's hook to navigate programmatically

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Check if the passwords match
        if (password !== confirmPassword) {
            toast.error('Passwords do not match'); // Show error if passwords do not match
            return;
        }

        try {
            // Send a signup request to the server
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify content type as JSON
                },
                body: JSON.stringify({ name, email, password }), // Include name, email, and password in the request body
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(`Signup failed: ${errorData.error}`); // Show error message if signup fails
                throw new Error(`Signup failed: ${errorData.error}`);
            }

            toast.success('Signup successful!'); // Show success message upon successful signup
            navigate('/'); // Navigate to the login page after successful signup
        } catch (error) {
            console.error('Signup failed:', error.message); // Log any errors that occur during the signup process
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-900 relative overflow-hidden">
            {/* Floating Crypto Logos */}
            <img src={bitcoinLogo} alt="Bitcoin" className="absolute w-12 h-12 opacity-75 animate-float-1" style={{ top: '10%', left: '30%' }} />
            <img src={ethereumLogo} alt="Ethereum" className="absolute w-12 h-12 opacity-75 animate-float-2" style={{ top: '10%', left: '50%' }} />
            <img src={dogecoinLogo} alt="Dogecoin" className="absolute w-12 h-12 opacity-75 animate-float-3" style={{ top: '20%', left: '60%' }} />
            <img src={shibaLogo} alt="Shiba Inu" className="absolute w-12 h-12 opacity-75 animate-float-1" style={{ top: '80%', left: '30%' }} />
            <img src={cardanoLogo} alt="Cardano" className="absolute w-12 h-12 opacity-75 animate-float-2" style={{ top: '80%', left: '50%' }} />
            <img src={bnbLogo} alt="Binance Coin" className="absolute w-12 h-12 opacity-75 animate-float-3" style={{ top: '80%', left: '60%' }} />

            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md relative z-10">
                {/* Logo and Heading */}
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Market Analysis Logo" className="w-32 h-32" />
                </div>
                <h2 className="text-3xl font-extrabold mb-6 text-center text-white">
                    Create Your Account
                </h2>

                {/* Signup Form */}
                <form onSubmit={handleSubmit}>
                    {/* Name Input */}
                    <div className="mb-5">
                        <label className="block text-gray-300 font-semibold mb-2" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                            value={name}
                            onChange={(e) => setName(e.target.value)} // Update name state on input change
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div className="mb-5">
                        <label className="block text-gray-300 font-semibold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-5">
                        <label className="block text-gray-300 font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Confirm Password Input */}
                    <div className="mb-6">
                        <label className="block text-gray-300 font-semibold mb-2" htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state on input change
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Link to Login Page */}
                <p className="text-center text-gray-400 mt-6">
                    Already have an account?{' '}
                    <a href="/" className="text-blue-400 font-semibold hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup; // Export the component for use in other parts of the application
