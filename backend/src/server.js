// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cryptoRoutes = require('./routes/cryptoRoutes'); // Import the new routes
const TrendsAnalysisRoute = require('./routes/TrendsAnalysisRoute');
const CustomAlertsRoutes = require('./routes/CustomAlertsRoutes');
const NewsRoute = require('./routes/newsRoute');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/crypto', cryptoRoutes); // Use the new routes
app.use('/api/TrendsAnalysis', TrendsAnalysisRoute);
app.use('/api/CustomAlerts', CustomAlertsRoutes);
app.use('/api/news', NewsRoute);
app.use('/api/profile', profileRoutes);



// Log the MongoDB URI to check if it is being read correctly
console.log('MongoDB URI:', process.env.MONGO_URI);

// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Use the port provided by Vercel's environment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
