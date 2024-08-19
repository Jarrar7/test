
const mongoose = require('mongoose'); // Import mongoose to define the schema and model

// Define the User schema using mongoose.Schema
const UserSchema = new mongoose.Schema({
    name: { 
        type: String, // The name field is of type String
        required: true // This field is required (must be provided)
    },
    email: { 
        type: String, // The email field is of type String
        required: true, // This field is required (must be provided)
        unique: true // Ensure the email is unique in the database
    },
    password: { 
        type: String, // The password field is of type String
        required: true // This field is required (must be provided)
    },
    profilePicture: { 
        type: String, // The profilePicture field is of type String (URL to the profile picture)
        // This field is optional (no 'required' key means it's optional)
    },
    bio: { 
        type: String, // The bio field is of type String (a brief biography of the user)
        // This field is optional
    },
});

// Create a User model using the defined schema
const User = mongoose.model('User', UserSchema);

module.exports = User; // Export the User model for use in other parts of the application
