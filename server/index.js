// app.js
const express = require('express');
const session = require("express-session");
const flash = require("connect-flash");
const cors = require('cors');
const passport = require("./config/passport");

const bodyParser = require('body-parser');
const { pool } = require("./config/dbConfig");
const app = express();
const port = process.env.PORT || 1100;

const authRoutes = require("./routes/Auth")
const userRoutes = require("./routes/Users")
const agentRoutes = require("./routes/Agents")
const alimentRoutes = require("./routes/Aliments")
const condimentRoutes = require("./routes/Condiments")
const accompagnementRoutes = require("./routes/Accompagnements")

// Middlewares
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: '*', // Replace with your actual origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 86400000 } // session expires after 24h
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Route
app.get('/', (req, res) => {
  res.send('Hello, welcome to your Node.js app!');
});

app.use("/auth", authRoutes);
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

