const express = require("express");
const router = express.Router();
const QuizResult = require("../models/QuizResult");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

router.post("/", auth, async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    const result = await QuizResult.create({
      userId: req.user.id,
      quizId,
      answers,
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;