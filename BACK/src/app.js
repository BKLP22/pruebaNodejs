// app.js
const express = require('express');
const cors = require("cors");

const ticketRoutes = require('./routes/productRoutes');
const categorieRoutes = require('./routes/categorieRoutes');

const app = express();
app.use(cors());


// Middleware
app.use(express.json());

// Routes
app.use('/api', ticketRoutes);
app.use('/api/',categorieRoutes)

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
