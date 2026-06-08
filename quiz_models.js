const mongoose = require("mongoose");

const voiceSchema = new mongoose.Schema({
  label: String,
  audio: String,
});

const quizQuestionSchema = new mongoose.Schema({
  quizId: String,
  order: Number,
  type: String,
  id: {
  type: String,
  required: true,
  unique: false,
  },
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
scoring: {
  type: Map,
  of: new mongoose.Schema(
    {
      visinski: { type: Number, default: 0 },
      udarni: { type: Number, default: 0 },
      miješani: { type: Number, default: 0 },
    },
    { _id: false }
  ),
  default: {}
}, 

});

module.exports = mongoose.model("quizquestion", quizQuestionSchema);