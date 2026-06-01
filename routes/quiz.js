const express = require("express");
const router = express.Router();

const QuizQuestion = require("../quiz_models");

router.get("/kviz1", async (req, res) => {
  try {
    const quiz = await QuizQuestion.find({ quizId: "kviz1" }).sort({ order: 1 });
    res.json(quiz);
  } catch (err) {
    console.error("Greška u dohvaćanju kviza:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/kviz2", async (req, res) => {
  try {
    const quiz = await QuizQuestion.find({ quizId: "kviz2" }).sort({ order: 1 });
    res.json(quiz);
  } catch (err) {
    console.error("Greška u dohvaćanju kviza:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/kviz3", async (req, res) => {
  try {
    const quiz = await QuizQuestion.find({ quizId: "kviz3" }).sort({ order: 1 });
    res.json(quiz);
  } catch (err) {
    console.error("Greška u dohvaćanju kviza:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/kviz4", async (req, res) => {
  try {
    const quiz = await QuizQuestion.find({ quizId: "kviz4" }).sort({ order: 1 });
    res.json(quiz);
  } catch (err) {
    console.error("Greška u dohvaćanju kviza:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
