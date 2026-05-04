const express = require('express');
const router = express.Router();

const { User } = require('../mongoose-models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User već postoji' });
    }

    const user = new User({ email, password, name });
    await user.save();

    res.json({ message: 'User created' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User ne postoji' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Krivi password' });
    }

    const token = jwt.sign(
      { userId: user._id },
      'tajni_kljuc',
      { expiresIn: '7d' }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;