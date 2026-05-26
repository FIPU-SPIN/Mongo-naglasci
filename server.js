const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { connectDB } = require('./mongoose-models');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const adminRoutes = require('./routes/admin');

const app = express();

// ✅ OVDJE ide tvoj public (premješteno s vrha)
app.use('/audio', express.static(path.join(__dirname, 'public/audio')));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Server radi');
});

// Ne gasi server ako MongoDB pukne
connectDB(process.env.MONGO_URI).catch(err => {
  console.log('MongoDB greška (ignoriramo za audio test):', err.message);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
  console.log(`Audio dostupno na: http://localhost:${PORT}/audio/`);
});