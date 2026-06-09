const express = require("express");
const router = express.Router();
const QuizResult = require("../quiz_result");
const QuizQuestion = require("../quiz_models");
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

  const resultTextMap = {
  visinski: {
    text: "Tvoj je naglasni sustav: visinski",
    description: "Opis visinskog sustava..."
  },
  udarni: {
    text: "Tvoj je naglasni sustav: udarni",
    description: "Opis udarnog sustava..."
  },
  miješani: {
    text: "Tvoj je naglasni sustav: miješani",
    description: "Opis miješanog sustava..."
  }
  };

router.post("/", auth, async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    //pitanja iz baze
    const questions = await QuizQuestion.find({ quizId });

    const totals = {
      visinski: 0,
      udarni: 0,
      miješani: 0,
    };

    // računanje bodova
    for (const question of questions) {
      const key = question.id || question._doc?.id;

      const answer = answers?.[key];

      if (answer === undefined || answer === null) continue;

      const score = question.scoring?.[answer];

      if (!score) continue;

      Object.entries(score).forEach(([system, value]) => {
        totals[system] += value;
      });
    } 

    // određivanje naglaska
    let accentSystem = "miješani";

    if (
      totals.visinski > totals.udarni &&
      totals.visinski > totals.miješani
    ) {
      accentSystem = "visinski";
    } else if (
      totals.udarni > totals.visinski &&
      totals.udarni > totals.miješani
    ) {
      accentSystem = "udarni";
    }

    //spremi rezultat
    const result = await QuizResult.create({
      userId: req.userId,
      quizId,
      answers,
      accentSystem,
      totals,
    });

    // vrati frontendu samo finalni rezultat
    res.status(201).json({
    accentSystem,
    resultText: resultTextMap[accentSystem],
  });

  } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;