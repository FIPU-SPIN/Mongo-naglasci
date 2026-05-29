const mongoose = require("mongoose");

const voiceSchema = new mongoose.Schema({
  label: String,
  audio: String,
});

const quizQuestionSchema = new mongoose.Schema({
  quizId: String,
  order: Number,
  type: String,
  id: String,
  title: String,
  question: String,
  text: String,
  note: String,
  image: String,
  options: [String],
  voices: [voiceSchema],
  zvukovi: [voiceSchema],
  lamp: String,
  correct: mongoose.Schema.Types.Mixed,
  sentences: [{
    prompt: String,
    parts: Number,
  }],
  items: [String],
  groups: {
  a: String,
  b: String,
  c: String
},

});

module.exports = mongoose.model("quizquestion", quizQuestionSchema);