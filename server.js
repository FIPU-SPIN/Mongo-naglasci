const express = require('express');
const { connectDB } = require('./mongoose-models');

require('dotenv').config();

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Server radi');
});

connectDB(process.env.MONGO_URI);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
});