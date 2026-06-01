// seeds/kviz4.js

require("dotenv").config();

const mongoose = require("mongoose");
const QuizQuestion = require("../quiz_models");

async function run() {
  try {
    console.log("Spajanje na Mongo...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Mongo spojen ✔");

    await QuizQuestion.deleteMany({ quizId: "kviz4" });

    console.log("Stari kviz obrisan");

    const kviz = [

      /* ================= INTRO ================= */
      {
        quizId: "kviz4",
        order: 1,
        type: "intro",
        title: "Naglasni inventar",
        image: "/assets/images/inventar_kviz1.png",
        text: "U ovom kvizu provjeravamo znanje o naglasnom inventaru hrvatskoga standardnog jezika.",
      },

      /* ================= Q1 ================= */
      {
        quizId: "kviz4",
        order: 2,
        type: "select",
        id: "q1",
        question: "Koliko naglasaka ima hrvatski standardni jezik?",
        options: ["2", "3", "4", "5"],
        correct: "2",
        lamp: "Hrvatski standardni jezik ima 4 naglaska: kratkosilazni, dugosilazni, kratkouzlazni i dugouzlazni.",
      },

      /* ================= Q2 ================= */
      {
        quizId: "kviz4",
        order: 3,
        type: "select",
        id: "q2",
        question: "Koji naglasak je označen znakom ȁ?",
        options: ["kratkosilazni", "dugosilazni", "kratkouzlazni", "dugouzlazni"],
        correct: "0",
        lamp: "Znak ȁ označava kratkosilazni naglasak.",
      },

      /* ================= Q3 ================= */
      {
        quizId: "kviz4",
        order: 4,
        type: "select",
        id: "q3",
        question: "Koji naglasak je označen znakom á?",
        options: ["kratkosilazni", "dugosilazni", "kratkouzlazni", "dugouzlazni"],
        correct: "3",
        lamp: "Znak á označava dugouzlazni naglasak.",
      },

      /* ================= Q4 ================= */
      {
        quizId: "kviz4",
        order: 5,
        type: "select",
        id: "q4",
        question: "Koji naglasak je označen znakom à?",
        options: ["kratkosilazni", "dugosilazni", "kratkouzlazni", "dugouzlazni"],
        correct: "2",
        lamp: "Znak à označava kratkouzlazni naglasak.",
      },

      /* ================= Q5 ================= */
      {
        quizId: "kviz4",
        order: 6,
        type: "select",
        id: "q5",
        question: "Koji naglasak je označen znakom ȃ?",
        image: "/assets/images/inventar_kviz2.png",
        options: ["kratkosilazni", "dugosilazni", "kratkouzlazni", "dugouzlazni"],
        correct: "1",
        lamp: "Znak ȃ označava dugosilazni naglasak.",
      },

      /* ================= Q6 ================= */
      {
        quizId: "kviz4",
        order: 7,
        type: "select",
        id: "q6",
        question: "Što je zanaglasna dužina?",
        image: "/assets/images/inventar_kviz3.png",
        options: [
          "dužina ispred naglaska",
          "dužina iza naglaska",
          "kratki vokal iza naglaska",
          "naglasak na zadnjem slogu",
        ],
        correct: "1",
        lamp: "Zanaglasna dužina je dužina koja se ostvaruje iza naglaska.",
      },

      /* ================= Q7 ================= */
      {
        quizId: "kviz4",
        order: 8,
        type: "select",
        id: "q7",
        question: "Koji znak označava zanaglasnu dužinu?",
        options: ["ă", "ā", "ȁ", "à"],
        correct: "1",
        lamp: "Zanaglasna dužina se označava znakom ā.",
      },

      /* ================= Q8 ================= */
      {
        quizId: "kviz4",
        order: 9,
        type: "select",
        id: "q8",
        question: "Što je akut?",
        options: [
          "standardni naglasak",
          "specifičan naglasak u dijalektima",
          "zanaglasna dužina",
          "kračina",
        ],
        correct: "1",
        lamp: "Akut je specifičan naglasak koji se pojavljuje u dijalektima, a nije dio standarda.",
      },

      /* ================= Q9 ================= */
      {
        quizId: "kviz4",
        order: 10,
        type: "select",
        id: "q9",
        question: "Kako se označava akut?",
        options: ["ã", "ā", "ȃ", "á"],
        correct: "0",
        lamp: "Akut se označava znakom ã.",
      },

      /* ================= Q10 ================= */
      {
        quizId: "kviz4",
        order: 11,
        type: "select",
        id: "q10",
        question: "Što je kračina?",
        options: [
          "dugi nenaglašeni vokal",
          "kratki nenaglašeni vokal",
          "naglašeni vokal",
          "zanaglasna dužina",
        ],
        correct: "1",
        lamp: "Kračina je kratki nenaglašeni vokal, označava se znakom ă.",
      },

      /* ================= Q11 ================= */
      {
        quizId: "kviz4",
        order: 12,
        type: "multi-select",
        id: "q11",
        question: "Koje su sastavnice naglaska?",
        options: ["jačina (silina)", "trajanje (kvantiteta)", "boja glasa", "ton (tonska visina)"],
        correct: [0, 1, 3],
        lamp: "Naglasak se sastoji od jačine, trajanja i tona.",
      },

      /* ================= Q12 ================= */
      {
        quizId: "kviz4",
        order: 13,
        type: "select",
        id: "q12",
        question: "Koji naglasak se ne može ostvariti na zadnjem slogu?",
        options: ["kratkosilazni", "dugosilazni", "kratkouzlazni", "svi se mogu"],
        correct: "2",
        lamp: "Uzlazni naglasci (kratkouzlazni i dugouzlazni) ne mogu se ostvariti na zadnjem slogu.",
      },
    ];

    const result = await QuizQuestion.insertMany(kviz);

    console.log("✔ KVIZ 4 UBACEN:", result.length, "pitanja");
  } catch (err) {
    console.error("Greška:", err);
  } finally {
    await mongoose.connection.close();
    console.log("Mongo connection closed");
  }
}

run();