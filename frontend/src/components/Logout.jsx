import React from 'react'; // Import React
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import { toast } from 'react-toastify'; // Import toast notifications from react-toastify

const Logout = () => {
    // Initialize the navigate function to programmatically navigate after logout
    const navigate = useNavigate();

    // Function to handle the logout process
    const handleLogout = () => {
        // Remove the authentication token from localStorage
        localStorage.removeItem('token');
        // Display a success message using toast notifications
        toast.success('Logged out successfully!');
        // Navigate the user back to the home page or login page
        navigate('/');
    };

    return (
        // Render a button that triggers the handleLogout function when clicked
        <button
            onClick={handleLogout} // Call handleLogout on button click
            className="text-white cursor-pointer" // Style the button (adjust classes as needed)
        >
            Logout
        </button>
    );
};

export default Logout; // Export the component for use in other parts of the application
