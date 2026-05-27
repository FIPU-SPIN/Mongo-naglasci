require("dotenv").config();

const mongoose = require("mongoose");
const QuizQuestion = require("../quiz_models");

async function run() {
  try {
    console.log("Spajanje na Mongo...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Mongo spojen ✔");

    await QuizQuestion.deleteMany({ quizId: "kviz1" });

    console.log("Stari kviz obrisan");

    const result = await QuizQuestion.insertMany([
      /* ---------------- INTRO ---------------- */
      {
        quizId: "kviz1",
        order: 1,
        type: "intro",
        title: "Koji je moj naglasni sustav?",
        image: "/assets/images/karta-narjecja.png",
        text:
          "Odredite narječje koje je obilježilo Vaš govor. Pronađite na karti mjesto Vašega najdužega boravka i školovanja. Uzmite u obzir i podrijetlo roditelja/staratelja.",
        note: "Plava = čakavsko | Zelena = kajkavsko | Žuta = štokavsko",
      },

      /* ---------------- Q1a ---------------- */
      {
        quizId: "kviz1",
        order: 2,
        type: "select",
        id: "q1a",
        question:
          "Mjesto u kojemu sam najduže boravio/boravila pripada ______ narječju.",
        options: ["kajkavskom", "čakavskom", "štokavskom"],
      },

      /* ---------------- Q1b ---------------- */
      {
        quizId: "kviz1",
        order: 3,
        type: "select",
        id: "q1b",
        question:
          "Govor mojih roditelja/staratelja pripada ______ narječju.",
        options: ["istom", "različitom"],
      },

      /* ---------------- Q2 ---------------- */
      {
        quizId: "kviz1",
        order: 4,
        type: "select",
        id: "q2",
        title: "Odredi regiju koja je obilježila Vaš govor.",
        question:
          "Moje mjesto najdužega boravka pripada _________________ regiji.",
        options: ["zapadnoj", "sjevernoj", "južnoj", "istočnoj"],
        lamp:
          "Ovisno o podrijetlu roditelja/staratelja, migracijama i obrazovanju, Vaš se naglasni sustav može razlikovati od regionalnog.",
      },

      /* ---------------- AUDIO Q3 ---------------- */
      {
        quizId: "kviz1",
        order: 5,
        type: "audio",
        title:
          "Poslušajte rečenice: Ponovo je zasjalo sunce. Nakon kiše pojavi se duga.",
        voices: [
          { label: "govornik 1", audio: "/audio/govornik1.wav" },
          { label: "govornik 2", audio: "/audio/govornik2.wav" },
          { label: "govornica 3", audio: "/audio/govornica3.wav" },
          { label: "govornica 4", audio: "/audio/govornica4.wav" },
        ],
      },

      /* ---------------- Q3 ---------------- */
      {
        quizId: "kviz1",
        order: 6,
        type: "select",
        id: "q3",
        question:
          "Možete li prepoznati iz koje regije dolaze govornici?",
        options: ["sjeverna", "zapadna", "južna", "istočna"],
      },

      /* ---------------- AUDIO Q4 ---------------- */
      {
        quizId: "kviz1",
        order: 7,
        type: "audio",
        title:
          "Poslušajte izgovor riječi kiša, sunce, trava, rosa...",
        voices: [
          { label: "govornik 1", audio: "/audio/govornik1.wav" },
          { label: "govornik 2", audio: "/audio/govornik2.wav" },
        ],
      },

      /* ---------------- Q4 ---------------- */
      {
        quizId: "kviz1",
        order: 8,
        type: "select",
        id: "q4",
        question:
          "Moj je naglasni sustav sličniji ____________.",
        options: ["govorniku 1", "govorniku 2"],
      },

      /* ---------------- Q5 ---------------- */
      {
        quizId: "kviz1",
        order: 9,
        type: "select",
        id: "q5",
        question: "Moj je naglasni sustav __________.",
        options: ["udarni", "visinski", "miješani", "prijelazni"],
        zvukovi: [
          { label: "Primjer 1", audio: "/audio/1-1-2a.wav" },
          { label: "Primjer 2", audio: "/audio/1-1-2b.wav" },
          { label: "Primjer 3", audio: "/audio/1-1-2c.wav" },
          { label: "Primjer 4", audio: "/audio/1-1-2d.wav" },
        ],
      },

      /* ---------------- Q6 ---------------- */
      {
        quizId: "kviz1",
        order: 10,
        type: "select",
        id: "q6",
        question:
          "Koji izgovor pripada visinskom naglasnom sustavu?",
        options: ["Osijek", "Split", "Rijeka", "Pula"],
      },

      /* ---------------- Q7 ---------------- */
      {
        quizId: "kviz1",
        order: 11,
        type: "select",
        id: "q7_1",
        question:
          "Koji od triju izgovora smatrate „običnim”? ",
        options: ["1", "2", "3"],
        correct: "2",
      },

      {
        quizId: "kviz1",
        order: 12,
        type: "select",
        id: "q7_2",
        question:
          "Koji izgovor je „visoki stil”?",
        options: ["1", "2", "3"],
      },

      {
        quizId: "kviz1",
        order: 13,
        type: "select",
        id: "q7_3",
        question:
          "Koji izgovor je razgovorni stil?",
        options: ["1", "2", "3"],
        correct: "3",
      },

      {
        quizId: "kviz1",
        order: 14,
        type: "select",
        id: "q7_4",
        question:
          "Je li Vaš govor sličniji 1, 2 ili 3?",
        options: ["1", "2", "3"],
      },

      /* ---------------- FEEDBACK ---------------- */
      {
        quizId: "kviz1",
        order: 15,
        type: "feedback",
        title: "🎉 Čestitamo!",
        message: "Uspješno ste riješili kviz!",
        details:
          "Vaši odgovori su pohranjeni.",
        buttonText: "Pogledaj rezultate",
      },
    ]);

    console.log("✔ KVIZ UBACEN:", result.length, "pitanja");

  } catch (err) {
    console.error("Greška:", err);
  } finally {
    await mongoose.connection.close();
    console.log("Mongo connection closed");
  }
}

run();