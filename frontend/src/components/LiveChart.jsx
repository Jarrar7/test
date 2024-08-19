import React, { useEffect, useState, useCallback } from 'react'; // Import necessary React hooks
import { Line } from 'react-chartjs-2'; // Import the Line chart component from react-chartjs-2
import 'chart.js/auto'; // Auto-import Chart.js components
import 'chartjs-adapter-date-fns'; // Import date adapter for Chart.js to handle dates

const API_URL = process.env.REACT_APP_API_URL; // Get the base API URL from environment variables

const LiveChart = ({ symbol }) => {
    // State to store the chart data, including labels and dataset configuration
    const [chartData, setChartData] = useState({
        labels: [], // Labels for the x-axis (dates)
        datasets: [{
            label: `${symbol} Price`, // Dataset label for the legend
            data: [], // Data points for the chart
            fill: true, // Fill the area under the line
            borderColor: '#2563EB', // Color of the line (blue)
            borderWidth: 3, // Thickness of the line
            tension: 0.4, // Smooth the line curve
            pointRadius: 0, // No visible points on the line
            backgroundColor: 'rgba(37, 99, 235, 0.3)', // Background color under the line
        }]
    });

    // State to track the selected time interval for the chart (e.g., 1 day, 30 days, 1 year)
    const [interval, setInterval] = useState('1');
    // State to handle and display errors
    const [error, setError] = useState(null);

    // Function to fetch historical data from the API based on the selected symbol and interval
    const fetchHistoricalData = useCallback(async () => {
        try {
            // Make a GET request to the API to fetch historical data
            const response = await fetch(`${API_URL}/api/crypto/historical/${symbol}/${interval}`);
            const data = await response.json();

            // Check if the expected data structure is returned
            if (!data.historicalData) {
                throw new Error('Unexpected response structure');
            }

            // Map the fetched data to extract timestamps (labels) and prices (data points)
            const labels = data.historicalData.map(point => new Date(point.timestamp));
            const prices = data.historicalData.map(point => point.close);

            // Update the chart data state with the new labels and data points
            setChartData({
                labels,
                datasets: [{
                    label: `${symbol} Price`,
                    data: prices,
                    fill: true, // Fill the area under the line
                    borderColor: '#2563EB', // Blue for the line
                    borderWidth: 3, // Thicker line
                    tension: 0.4, // Smooth curve
                    pointRadius: 0, // No points on the line
                    backgroundColor: 'rgba(37, 99, 235, 0.3)', // Light blue background under the line
                }]
            });
        } catch (error) {
            console.error('Error fetching historical data:', error);
            setError(error.message); // Set the error state if fetching fails
        }
    }, [symbol, interval]); // Dependencies for the useCallback hook

    // useEffect hook to fetch historical data when the symbol or interval changes
    useEffect(() => {
        if (symbol) {
            fetchHistoricalData(); // Fetch data when the component mounts or dependencies change
        }
    }, [symbol, fetchHistoricalData]); // Dependencies for the useEffect hook

    // Configuration options for the chart
    const chartOptions = {
        responsive: true, // Make the chart responsive
        maintainAspectRatio: false, // Allow the chart to fill the container's aspect ratio
        scales: {
            x: {
                type: 'time', // x-axis is a time scale
                time: {
                    unit: interval === '1' ? 'day' : interval === '30' ? 'day' : 'month', // Unit depends on selected interval
                    tooltipFormat: 'MM/dd/yyyy', // Format for the tooltip displaying dates
                },
                grid: {
                    display: true,
                    color: 'rgba(37, 99, 235, 0.2)', // Grid line color (lighter blue)
                },
                ticks: {
                    color: '#93C5FD', // Color for the tick marks (lighter blue)
                },
            },
            y: {
                beginAtZero: false, // Do not start the y-axis at zero
                grid: {
                    display: true,
                    color: 'rgba(37, 99, 235, 0.2)', // Grid line color (lighter blue)
                },
                ticks: {
                    color: '#93C5FD', // Color for the tick marks (lighter blue)
                },
            },
        },
        plugins: {
            legend: {
                display: true, // Display the legend
                labels: {
                    color: '#2563EB', // Color of the legend labels (blue)
                    font: {
                        size: 14, // Font size for the legend labels
                        weight: 'bold', // Font weight for the legend labels
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return ` ${context.dataset.label}: ${context.formattedValue}`; // Tooltip format for data points
                    }
                },
                backgroundColor: '#1E40AF', // Background color for the tooltip (dark blue)
                titleColor: '#93C5FD', // Color for the tooltip title (light blue)
                bodyColor: '#FFFFFF', // Color for the tooltip body (white)
                borderColor: '#3B82F6', // Border color for the tooltip (blue)
                borderWidth: 1, // Border width for the tooltip
            }
        },
    };

    return (
        // Container for the chart with padding, background color, and responsive styling
        <div className="bg-gray-900 shadow-lg rounded-lg p-4 sm:p-6 lg:p-8 max-w-full mx-auto mt-10" style={{ height: '400px' }}>
            {/* Header section with the chart title and interval selector */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-white">{symbol} Price Chart</h3>
                {/* Dropdown for selecting the time interval */}
                <select
                    value={interval}
                    onChange={e => setInterval(e.target.value)}
                    className="border border-gray-600 p-2 rounded bg-gray-800 text-gray-200"
                >
                    <option value="1">1 Day</option>
                    <option value="30">30 Days</option>
                    <option value="365">1 Year</option>
                </select>
            </div>
            {/* Display error message if there's an error fetching data */}
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                // Render the Line chart with the data and options
                <div className="relative h-full">
                    <Line data={chartData} options={chartOptions} />
                </div>
            )}
        </div>
    );
};

export default LiveChart; // Export the LiveChart component for use in other parts of the application
