import React, { useState } from 'react'; // Import React and useState hook for managing component state
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import specific icons for showing/hiding password
import logo from '../assets/logo.png'; // Import the logo image
import bitcoinLogo from '../assets/BTCLogo.png'; // Import Bitcoin logo image
import ethereumLogo from '../assets/ETHLogo.png'; // Import Ethereum logo image
import dogecoinLogo from '../assets/DogeLogo.png'; // Import Dogecoin logo image
import shibaLogo from '../assets/ShibaLogo.png'; // Import Shiba Inu logo image
import cardanoLogo from '../assets/CardanoLogo.png'; // Import Cardano logo image
import bnbLogo from '../assets/BNBLogo.png'; // Import Binance Coin logo image
import { toast } from 'react-toastify'; // Import toast for notifications
import Cookies from 'js-cookie'; // Import js-cookie for handling cookies

const API_URL = process.env.REACT_APP_API_URL; // Get the base API URL from environment variables

const Login = () => {
    const [email, setEmail] = useState(''); // State to manage the email input field
    const [password, setPassword] = useState(''); // State to manage the password input field
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate(); // React Router's hook to navigate programmatically

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            // Send a login request to the server
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify the content type as JSON
                },
                body: JSON.stringify({ email, password }), // Include email and password in the request body
            });

            // Handle unsuccessful login attempts
            if (!response.ok) {
                const errorData = await response.json(); // Parse the error response
                toast.error(`Login failed: ${errorData.error}`); // Show error message if login fails
                throw new Error(`Login failed: ${errorData.error}`); // Throw an error to be caught in the catch block
            }

            const data = await response.json(); // Parse the successful response data

            // Store authentication tokens in cookies for later use
            Cookies.set('token', data.token, { expires: 1 }); // Set a token cookie with 1-day expiration
            Cookies.set('userEmail', email, { expires: 1 }); // Set a userEmail cookie with 1-day expiration

            // Navigate to the home page upon successful login
            navigate('/home');
        } catch (error) {
            console.error('Login failed:', error.message); // Log any errors that occur
        }
    };

    // Toggle password visibility
    const toggleShowPassword = () => {
        setShowPassword(!showPassword); // Toggle the showPassword state
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

            {/* Login form container */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md relative z-10">
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Market Analysis Logo" className="w-32 h-32" /> {/* Display the app logo */}
                </div>
                <h2 className="text-3xl font-extrabold mb-6 text-center text-white">
                    Welcome Back!
                </h2>
                <p className="text-center text-gray-300 mb-6">
                    Log in to access your personalized crypto market analysis.
                </p>
                <form onSubmit={handleSubmit}>
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
                            required // Ensure the input is required
                        />
                    </div>
                    <div className="mb-6 relative">
                        <label className="block text-gray-300 font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'} // Conditionally render input type based on showPassword state
                            id="password"
                            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                            placeholder="Enter your password"
                            required // Ensure the input is required
                        />
                        <span
                            onClick={toggleShowPassword} // Toggle password visibility on click
                            className="absolute right-4 top-10 cursor-pointer text-gray-400"
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} /> {/* Conditionally render eye icon based on showPassword state */}
                        </span>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-gray-400 mt-6">
                    Don't have an account?{' '}
                    <a href="/register" className="text-blue-400 font-semibold hover:underline">
                        Sign up
                    </a> {/* Link to the registration page */}
                </p>
            </div>
        </div>
    );
};

export default Login; // Export the Login component for use in other parts of the application
