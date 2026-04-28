const express = require('express');
const { connectDB } = require('./mongoose-models');

require('dotenv').config();

const app = express();

app.use(express.json());

connectDB(); 

app.get('/', (req, res) => {
  res.send('Server radi 🚀');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
});