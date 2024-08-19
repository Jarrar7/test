import React, { useEffect, useState } from 'react';
import Header from './Header'; // Importing the Header component
import { toast } from 'react-toastify'; // Importing toast for notifications
import Cookies from 'js-cookie'; // Importing js-cookie for handling cookies
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation

const API_URL = process.env.REACT_APP_API_URL; // Getting the API URL from environment variables

const Profile = () => {
    const [user, setUser] = useState({}); // State to hold user information
    const [newPassword, setNewPassword] = useState(''); // State for the new password input
    const [confirmPassword, setConfirmPassword] = useState(''); // State for the confirm password input
    const [showPasswordChange, setShowPasswordChange] = useState(false); // State to toggle password change form visibility
    const navigate = useNavigate(); // Hook for navigation

    // useEffect hook to fetch user profile data when the component mounts
    useEffect(() => {
        const email = Cookies.get('userEmail'); // Get the user's email from cookies
        const token = Cookies.get('token'); // Get the user's token from cookies

        // If email or token is not found, redirect to the login page
        if (!email || !token) {
            navigate('/login'); // Navigate to the login page if the user is not authenticated
            return;
        }

        // Fetch user profile data
        const url = `${API_URL}/api/profile?email=${email}`;
        fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`, // Include the token in the request headers
            },
        })
            .then(response => response.json()) // Parse the JSON response
            .then(data => setUser(data)) // Set the user data in state
            .catch(error => {
                console.error('Error fetching user profile:', error); // Log any errors that occur during the fetch
                toast.error('Failed to fetch user profile.'); // Show error toast if fetching fails
            });
    }, [navigate]); // Dependencies for useEffect

    // Function to handle password change
    const handlePasswordChange = () => {
        const email = Cookies.get('userEmail'); // Get the user's email from cookies
        const token = Cookies.get('token'); // Get the user's token from cookies

        // Check if new password and confirm password match
        if (newPassword !== confirmPassword) {
            toast.error('New password and confirm password do not match'); // Show an error toast if passwords do not match
            return;
        }

        // Make a PUT request to update the password
        fetch(`${API_URL}/api/profile/password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', // Set the content type as JSON
                'Authorization': `Bearer ${token}`, // Include the token in the request headers
            },
            body: JSON.stringify({ email, newPassword }), // Send email and new password in the request body
        })
            .then(response => response.json()) // Parse the JSON response
            .then(data => toast.success(data.message)) // Show success toast if password is updated
            .catch(error => toast.error('Error updating password:', error.message)); // Show error toast if updating fails
    };

    return (
        <div>
            <Header /> {/* Render the Header component */}
            <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
                <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Profile</h1>
                <div className="mb-6">
                    <label className="block text-lg font-semibold text-gray-600">Name:</label>
                    <p className="text-xl text-gray-900">{user.name}</p> {/* Display the user's name */}
                </div>
                <div className="mb-6">
                    <label className="block text-lg font-semibold text-gray-600">Email:</label>
                    <p className="text-xl text-gray-900">{user.email}</p> {/* Display the user's email */}
                </div>
                {/* Toggle password change form visibility */}
                {!showPasswordChange && (
                    <button
                        onClick={() => setShowPasswordChange(true)} // Show password change form when clicked
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                    >
                        Change Password
                    </button>
                )}
                {showPasswordChange && (
                    <>
                        <div className="mb-4">
                            <label className="block text-lg font-semibold text-gray-600">New Password:</label>
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)} // Update new password state
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-lg font-semibold text-gray-600">Confirm New Password:</label>
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                        </div>
                        <button
                            onClick={handlePasswordChange} // Trigger password change when clicked
                            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                        >
                            Confirm Password
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile; // Export the Profile component for use in other parts of the application
