require('dotenv').config();
const express = require("express");
const { join } = require("path");
const app = express();

// Middleware.
app.use(express.json());

// CORS.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Static files & homepage.
app.use(express.static(join(__dirname, "public")));
app.get('/', (req, res) => res.sendFile(join(__dirname, 'public/login.html')));

// Routes.
app.use("/user", require("./server/routes/user"));           
app.use("/game-requests", require("./server/routes/gameRequests")); 

// Start server.
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));