
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import routing components
import Header from './components/Header'; // Import the Header component
// import ThemeToggle from './components/ThemeToggle'; // הסר את הייבוא של ThemeToggle (Commented out import of ThemeToggle)
import Login from './components/Login'; // Import the Login component
import Signup from './components/Signup'; // Import the Signup component
import CryptoList from './components/CryptoList'; // Import the CryptoList component
import CryptoDetail from './components/CryptoDetail'; // Import the CryptoDetail component
import TrendsAnalysis from './components/TrendsAnalysis'; // Import the TrendsAnalysis component
import CustomAlerts from './components/CustomAlerts'; // Import the CustomAlerts component
import './index.css'; // Import global styles
import { ToastContainer } from 'react-toastify'; // Import ToastContainer for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS for styling notifications
import CryptoNews from './components/CryptoNews'; // Import the CryptoNews component
import Profile from './components/Profile'; // Import the Profile component

function App() {
  return (
    <Router> {/* Wrap the application in a Router component */}
      <div className="App bg-gray-100 dark:bg-gray-900 min-h-screen">
        <Routes>
          {/* Define the application routes */}
          <Route path="/" element={<Login />} /> {/* Route for the Login page */}
          <Route path="/register" element={<Signup />} /> {/* Route for the Signup page */}
          <Route
            path="/home"
            element={
              <>
                <Header /> {/* Render Header and CryptoList for the home page */}
                <CryptoList />
              </>
            }
          />
          <Route path="/crypto/:id" element={<CryptoDetail />} /> {/* Route for CryptoDetail page with dynamic ID */}
          <Route path="/trends" element={<TrendsAnalysis />} /> {/* Route for TrendsAnalysis page */}
          <Route path="/alerts" element={<CustomAlerts />} /> {/* Route for CustomAlerts page */}
          <Route path="/crypto-news" element={<CryptoNews />} /> {/* Route for CryptoNews page */}
          <Route path="/profile" element={<Profile />} /> {/* Route for Profile page */}
          <Route path="*" element={<Navigate to="/" />} /> {/* Redirect any unknown routes to the Login page */}
        </Routes>
        <ToastContainer /> {/* Container for displaying toast notifications */}
      </div>
    </Router>
  );
}

export default App; // Export the App component for use in other parts of the application