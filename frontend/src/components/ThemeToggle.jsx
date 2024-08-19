import React, { useState, useEffect } from 'react'; // Import necessary React hooks

const ThemeToggle = () => {
    // State to manage the current theme, initialized to 'light'
    const [theme, setTheme] = useState('light');

    // useEffect hook to apply the theme class to the document's root element
    useEffect(() => {
        if (theme === 'dark') {
            // Add the 'dark' class to the root element when the theme is 'dark'
            document.documentElement.classList.add('dark');
        } else {
            // Remove the 'dark' class from the root element when the theme is 'light'
            document.documentElement.classList.remove('dark');
        }
    }, [theme]); // Depend on the theme to re-run the effect when it changes

    // Function to toggle between 'light' and 'dark' themes
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light'); // Switch the theme state
    };

    return (
        // Button to toggle the theme when clicked
        <button onClick={toggleTheme} className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full focus:outline-none">
            {/* Display the appropriate icon based on the current theme */}
            {theme === 'light' ? '🌙 ' : '☀️ '}
        </button>
    );
};

export default ThemeToggle; // Export the component for use in other parts of the application
