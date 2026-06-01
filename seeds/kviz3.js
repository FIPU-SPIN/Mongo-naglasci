// seeds/kviz3.js

require("dotenv").config();

const mongoose = require("mongoose");
const QuizQuestion = require("../quiz_models");

async function run() {
  try {
    console.log("Spajanje na Mongo...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Mongo spojen ✔");

    await QuizQuestion.deleteMany({ quizId: "kviz3" });

    console.log("Stari kviz obrisan");

    const kviz = [

      /* ================= INTRO ================= */
      {
        quizId: "kviz3",
        order: 1,
        type: "intro",
        title: "Distribucijska pravila",
        image: "/assets/images/Distribucijska_pravila.png",
        text: "U ovom kvizu provjeravamo znanje o raspodjelnim pravilima naglasaka u hrvatskome standardnom jeziku.",
      },

      /* ================= Q1a ================= */
      {
        quizId: "kviz3",
        order: 2,
        type: "select",
        id: "q1a",
        question: "Koji naglasak može biti na podcrtanom slogu u riječima: <u>slon</u>, <u>krov</u>, <u>vrat</u>?",
        options: ["samo silazni", "samo uzlazni", "sva četiri naglaska"],
        correct: "0",
        lamp: "Jednosložne riječi mogu imati samo silazne naglaske.",
      },

      /* ================= Q1b ================= */
      {
        quizId: "kviz3",
        order: 3,
        type: "select",
        id: "q1b",
        question: "Koji naglasak može biti na podcrtanom slogu u riječima: <u>ju</u>tro, <u>slo</u>ga, <u>ze</u>bra?",
        options: ["samo silazni", "samo uzlazni", "sva četiri naglaska"],
        correct: "2",
        lamp: "Na prvom slogu dvosložnih i višesložnih riječi mogu se naći sva četiri naglaska.",
      },

      /* ================= Q1c ================= */
      {
        quizId: "kviz3",
        order: 4,
        type: "select",
        id: "q1c",
        question: "Koji naglasak može biti na podcrtanom slogu u riječima: slo<u>bo</u>da, ti<u>ši</u>na, ja<u>či</u>na?",
        options: ["samo silazni", "samo uzlazni", "sva četiri naglaska"],
        correct: "1",
        lamp: "Na unutarnjem slogu (koji nije ni prvi ni zadnji) mogu biti samo uzlazni naglasci.",
      },

      /* ================= Q1d ================= */
      {
        quizId: "kviz3",
        order: 5,
        type: "select",
        id: "q1d",
        question: "Koji naglasak može biti na podcrtanom slogu u riječima: inter<u>vju</u>, doku<u>ment</u>?",
        options: ["samo silazni", "samo uzlazni", "sva četiri naglaska"],
        correct: "0",
        lamp: "Na zadnjem slogu mogu biti samo silazni naglasci.",
      },

      /* ================= Q2 ================= */
      {
        quizId: "kviz3",
        order: 6,
        type: "audio_select",
        id: "q2",
        question: "Poslušajte izgovor sljedećih riječi s različitim mjestima istoga naglaska. Koji se naglasci ne nalaze ni na zadnjem slogu?",
        voices: [
          { label: "Klikni za izgovor", audio: "/audio/1-3-2.wav" }
        ],
        options: ["uzlazni", "silazni"],
        correct: "0",
        lamp: "Uzlazni naglasci (kratkouzlazni i dugouzlazni) ne mogu biti na zadnjem slogu u riječi.",
      },

      /* ================= Q3 ================= */
      {
        quizId: "kviz3",
        order: 7,
        type: "multi-select",
        id: "q3",
        question: "Odaberite riječi u kojima se silazni naglasak pojavljuje na nepočetnom slogu, a pripadaju standardnom jeziku (priručnici ih bilježe kao razgovorne).",
        options: ["dijamȁnt", "dirigȅnt", "poglȅdaj", "akvȃrij", "poljoprȉvreda", "prespȃvam"],
        correct: [0, 1, 3, 4],
        lamp: "Priručnici bilježe dijamant, dirigent, akvarij i poljoprivreda kao razgovorne likove standardnoga jezika sa silaznim naglaskom na nepočetnom slogu.",
      },

      /* ================= Q4 ================= */
      {
        quizId: "kviz3",
        order: 8,
        type: "multi-select",
        id: "q4",
        question: "Hrvatski standardni naglasni sustav ima nekoliko temeljnih raspodjelnih (distribucijskih) pravila. Odaberite točne tvrdnje.",
        options: [
          "Uzlazni naglasci ne mogu biti na zadnjem slogu u riječi.",
          "Silazni naglasci ne mogu biti na zadnjem slogu u riječi.",
          "Slog ispred naglaska može imati prednaglasnu dužinu.",
          "Jednosložne riječi imaju samo uzlazne naglaske.",
          "Slog iza naglaska može imati zanaglasnu dužinu.",
        ],
        correct: [0, 4],
        lamp: "Točne su tvrdnje: Uzlazni naglasci ne mogu biti na zadnjem slogu, i slog iza naglaska može imati zanaglasnu dužinu.",
      },

    ];

    const result = await QuizQuestion.insertMany(kviz);

    console.log("✔ KVIZ 3 UBACEN:", result.length, "pitanja");
  } catch (err) {
    console.error("Greška:", err);
  } finally {
    await mongoose.connection.close();
    console.log("Mongo connection closed");
  }
}

run();