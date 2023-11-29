// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
const port = 1100;
const cors = require('cors');

// PostgreSQL configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'GestionSocirDB',
  password: 'icui4cu',
  port: 5432,
});

// Middlewares
app.use(cors({
  origin: '*', // Replace with your actual origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Hello, welcome to your Node.js app!');
});

// Route to fetch data from the 'agents' table
app.get('/api/agents', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM agents');
    const agents = result.rows;
    res.json(agents);
    client.release();
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to add a new agent
app.post('/api/agents', async (req, res) => {
  const {
    matr_agent,
    nom_agent,
    postnom_agent,
    prenom_agent,
    contact,
    email_agent,
    image,
    sexe,
    lieu_naiss,
    date_naiss,
  } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO agents (matr_agent, nom_agent, postnom_agent, prenom_agent, contact, email_agent, image, sexe, lieu_naiss, date_naiss) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [
        matr_agent,
        nom_agent,
        postnom_agent,
        prenom_agent,
        contact,
        email_agent,
        image,
        sexe,
        lieu_naiss,
        date_naiss,
      ]
    );
    const newAgent = result.rows[0];
    res.json(newAgent);
    client.release();
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

