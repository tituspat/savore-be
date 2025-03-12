// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const { Pool } = require('pg');

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Konfigurasi PostgreSQL
// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false, // Railway membutuhkan ini
//     },
// });

// // Test koneksi database
// pool.connect()
//     .then(() => console.log("Connected to PostgreSQL"))
//     .catch(err => console.error("Database connection error", err));

// // API Route Test
// app.get("/", (req, res) => {
//     res.send("Welcome to Restaurant Backend API!");
// });

// // Ambil daftar menu dari database (contoh)
// app.get("/menu", async (req, res) => {
//     try {
//         const result = await pool.query("SELECT * FROM menu");
//         console.log("Menu Data:", result.rows);
//         res.json(result.rows);
//     } catch (err) {
//         console.error("Query Error:", err.message);
//         res.status(500).send("Server Error");
//     }
// });


// // Jalankan server
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });


require('dotenv').config();
const app = require('./src/app');

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});