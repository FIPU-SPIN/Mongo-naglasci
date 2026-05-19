const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Admin, User } = require('../mongoose-models');
const isAdmin = require('../middleware/isAdmin');

router.post('/kreiraj-admina', async (req, res) => {
  try {

    const postoji = await Admin.findOne({
      username: "super_admin"
    });

    if (postoji) {
      return res.json({
        message: "Admin već postoji!"
      });
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new Admin({
      username: "super_admin",
      email: "admin@naglasci.com",
      password: hashedPassword,
      role: "super_admin"
    });

    await admin.save();

    res.json({
      message: "Admin kreiran!",
      username: "super_admin",
      lozinka: "admin123"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

router.post('/login', async (req, res) => {
    console.log("BODY:", req.body);

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
      {
        expiresIn: "7d"
      }
    );

    res.json({
      token,
      tip: "admin",
      role: admin.role,
      username: admin.username
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

router.get('/korisnici', isAdmin, async (req, res) => {

  try {

    const korisnici = await User.find({}, '-password');

    res.json(korisnici);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

module.exports = router;