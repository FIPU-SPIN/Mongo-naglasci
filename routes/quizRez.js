const express = require("express");
const router = express.Router();
const QuizResult = require("../quiz_result");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id; 
    
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

router.post("/", auth, async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    const result = await QuizResult.create({
      userId: req.userId,
      quizId,
      answers,
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;