const express = require('express');
const router = express.Router();

// Privremene rute samo da server radi
router.post('/register', (req, res) => {
  res.json({ message: 'Register radi (privremeno)' });
});

router.post('/login', (req, res) => {
  res.json({ message: 'Login radi (privremeno)' });
});

module.exports = router;