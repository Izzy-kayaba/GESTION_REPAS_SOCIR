// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { pool } = require("./config/dbConfig");
const app = express();
const port = 1100;
const cors = require('cors');
const userRoutes = require("./routes/Users")
const agentRoutes = require("./routes/Agents")
const alimentRoutes = require("./routes/Aliments")
const condimentRoutes = require("./routes/Condiments")
const accompagnementRoutes = require("./routes/Accompagnements")

// Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: '*', // Replace with your actual origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Hello, welcome to your Node.js app!');
});

app.use("/api/users", userRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/aliments", alimentRoutes);
app.use("/api/condiments", condimentRoutes);
app.use("/api/accompagnements", accompagnementRoutes);

// Route to fetch data from the 'agents' table
app.get('/api/repas-agents', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM repas_agents WHERE date_efface IS NULL');
    const agents = result.rows;
    res.json(agents);
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

