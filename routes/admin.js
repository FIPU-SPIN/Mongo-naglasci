const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Admin, User } = require('../mongoose-models');
const isAdmin = require('../middleware/isAdmin');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "Unesite username i lozinku"
      });
    }

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({
        error: "Admin ne postoji!"
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        error: "Kriva lozinka!"
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        tip: "admin",
        role: admin.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      tip: "admin",
      role: admin.role,
      username: admin.username
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/create', isAdmin, async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        error: "Missing fields"
      });
    }

    const exists = await Admin.findOne({ username });

    if (exists) {
      return res.status(400).json({
        error: "Admin already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      username,
      email,
      password: hashedPassword,
      role: role || "admin"
    });

    await admin.save();

    res.json({
      message: "Admin created successfully",
      username: admin.username
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/user/:id', isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/korisnici', isAdmin, async (req, res) => {
  try {
    const korisnici = await User.find({}, '-password');
    res.json(korisnici);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;