const jwt = require('jsonwebtoken');
const express = require('express');
const { connectDB, Admin, User } = require('./mongoose-models');
const bcrypt = require('bcrypt');

require('dotenv').config();
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Server radi');
});

// ========== ADMIN MIDDLEWARE ==========
async function isAdmin(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Niste prijavljeni." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "tajni_kljuc");
    if (decoded.tip !== "admin") {
      return res.status(403).json({ error: "Samo admin može ovo!" });
    }
    req.adminId = decoded.id;
    req.adminRole = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token nije valjan." });
  }
}

// ========== ADMIN RUTE (SVE PRIJE app.listen) ==========

// 1. KREIRANJE ADMINA
app.post("/kreiraj-admina", async (req, res) => {
  try {
    const postoji = await Admin.findOne({ username: "super_admin" });
    if (postoji) {
      return res.json({ message: "Admin već postoji!" });
    }
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = new Admin({
      username: "super_admin",
      email: "admin@naglasci.com",
      password: hashedPassword,
      role: "super_admin"
    });
    await admin.save();
    res.json({ message: "Admin kreiran!", username: "super_admin", lozinka: "admin123" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. ADMIN LOGIN
app.post("/login/admin", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Unesite username i lozinku" });
    }
    
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: "Admin ne postoji!" });
    }
    
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Kriva lozinka!" });
    }
    
    const token = jwt.sign(
      { id: admin._id, tip: "admin", role: admin.role },
      process.env.JWT_SECRET || "tajni_kljuc",
      { expiresIn: "7d" }
    );
    
    res.json({ token, tip: "admin", role: admin.role, username: admin.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. TEST ADMIN RUTA - dohvati sve korisnike
app.get("/admin/korisnici", isAdmin, async (req, res) => {
  try {
    const korisnici = await User.find({}, "-password");
    res.json(korisnici);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== POVEZIVANJE NA BAZU ==========
connectDB(process.env.MONGO_URI);

const PORT = process.env.PORT || 5000;

// OVO MORA BITI NA KRAJU - SVE RUTE MORAJU BITI IZNAD!!
app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
});