import React from 'react'; // Import React
import { Line } from 'react-chartjs-2'; // Import the Line chart component from react-chartjs-2
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'; // Import necessary components from Chart.js

// Register the Chart.js components needed for rendering the line chart
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const CryptoCard = ({ data }) => {
    // Prepare the data for the line chart
    const chartData = {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'], // Sample labels for 5 days
        datasets: [
            {
                label: `${data.name} (${data.symbol}) Price`, // Label for the dataset
                data: [data.price - 1000, data.price - 500, data.price, data.price + 500, data.price - 200], // Sample price data over 5 days
                fill: false, // Do not fill the area under the line
                backgroundColor: 'rgba(75,192,192,0.2)', // Background color for points (optional)
                borderColor: 'rgba(75,192,192,1)', // Border color for the line
            },
        ],
    };

    return (
        // Render the crypto card with the name, symbol, price, change, and line chart
        <div className="crypto-card p-4 border rounded shadow-lg bg-white dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {data.name} ({data.symbol}) {/* Display the cryptocurrency name and symbol */}
            </h3>
            <p className="text-lg mb-2 text-gray-700 dark:text-gray-300">
                Price: ${data.price} {/* Display the current price */}
            </p>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
                Change: {data.change}% {/* Display the percentage change */}
            </p>
            <Line data={chartData} /> {/* Render the line chart with the prepared data */}
        </div>
    );
};

export default CryptoCard; // Export the component for use in other parts of the application
