import React, { useState } from 'react'; // Import React and the useState hook
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import Logout from './Logout'; // Import the Logout component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon for icons
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import specific icons from FontAwesome
import ThemeToggle from './ThemeToggle'; // Import the ThemeToggle component

const Header = () => {
    // State to track if the menu is open or closed
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to toggle the menu open and closed
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        // Header component with a background color, text color, padding, and shadow
        <header className="bg-blue-800 text-white p-4 flex justify-between items-center shadow-lg z-50">
            {/* Logo or title with a link to the home page */}
            <h1 className="text-2xl font-extrabold tracking-wide">
                <Link to="/home" className="text-white">
                    Crypto Market Analysis Tool
                </Link>
            </h1>

            {/* Menu button for mobile view */}
            <div className="lg:hidden">
                <button onClick={toggleMenu} className="text-white">
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
                </button>
            </div>

            {/* Navigation menu */}
            <nav
                className={`fixed top-0 right-0 h-full bg-blue-800 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 ease-in-out z-50 w-64 lg:relative lg:w-auto lg:bg-transparent lg:transform-none lg:transition-none lg:h-auto`}
            >
                {/* Close button for mobile view */}
                <div className="flex justify-end p-2 lg:hidden ">
                    <button onClick={toggleMenu} className="text-white">
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>
                </div>

                {/* List of navigation links */}
                <ul className="flex flex-col lg:flex-row lg:space-x-6 p-6 lg:p-0 text-lg font-semibold">
                    {/* Link to the Home page */}
                    <li className="mb-4 lg:mb-0">
                        <Link to="/home" className="cursor-pointer block py-2 lg:py-0 text-white hover:text-gray-300" onClick={toggleMenu}>
                            Home
                        </Link>
                    </li>
                    {/* Link to the Trends page */}
                    <li className="mb-4 lg:mb-0">
                        <Link to="/trends" className="cursor-pointer block py-2 lg:py-0 text-white hover:text-gray-300" onClick={toggleMenu}>
                            Trends
                        </Link>
                    </li>
                    {/* Link to the News page */}
                    <li className="mb-4 lg:mb-0">
                        <Link to="/crypto-news" className="cursor-pointer block py-2 lg:py-0 text-white hover:text-gray-300" onClick={toggleMenu}>
                            News
                        </Link>
                    </li>
                    {/* Link to the Custom Alerts page */}
                    <li className="mb-4 lg:mb-0">
                        <Link to="/alerts" className="cursor-pointer block py-2 lg:py-0 text-white hover:text-gray-300" onClick={toggleMenu}>
                            Custom Alerts
                        </Link>
                    </li>
                    {/* Link to the Profile page */}
                    <li className="mb-4 lg:mb-0">
                        <Link to="/profile" className="cursor-pointer block py-2 lg:py-0 text-white hover:text-gray-300" onClick={toggleMenu}>
                            Profile
                        </Link>
                    </li>
                    {/* Logout component */}
                    <li className="mb-4 lg:mb-0">
                        <Logout />
                    </li>
                    {/* Theme toggle component */}
                    <li>
                        <ThemeToggle />
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
