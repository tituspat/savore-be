const express = require('express');
const cors = require('cors');
const menuRoutes = require('./routes/menuRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/menu', menuRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Welcome to Restaurant Backend API!");
});

module.exports = app;
