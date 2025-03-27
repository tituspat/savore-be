const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const menuRoutes = require('./routes/menuRoutes');

dotenv.config();
const app = express();


// Middleware to parse JSON requests
app.use(express.json()); // ✅ This ensures req.body is not undefined
app.use(express.urlencoded({ extended: true })); // If using form-data
// Middleware
app.use(cors());

// Routes
app.use('/api/menu', menuRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Welcome to Restaurant Backend API!");
});

module.exports = app;
