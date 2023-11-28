// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
const port = 1100;

// PostgreSQL configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'yourdbname',
  password: 'yourpassword',
  port: 5432,
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Hello, welcome to your Node.js app!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

