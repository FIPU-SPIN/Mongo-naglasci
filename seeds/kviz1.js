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

    const kviz = [
      /* ================= INTRO ================= */
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

      /* ================= Q1A ================= */
      {
        quizId: "kviz1",
        order: 2,
        type: "select",
        id: "q1a",
        question:
          "Mjesto u kojemu sam najduže boravio/boravila pripada ______ narječju.",
        options: ["kajkavskom", "čakavskom", "štokavskom"],
      },

      /* ================= Q1B ================= */
      {
        quizId: "kviz1",
        order: 3,
        type: "select",
        id: "q1b",
        question:
          "Govor mojih roditelja/staratelja pripada ______ narječju.",
        options: ["istom", "različitom"],
      },

      /* ================= Q2 ================= */
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
          "Ovisno o podrijetlu roditelja/staratelja, Vaš se naglasni sustav može razlikovati od regionalnog.",
      },

      /* ================= Q3 AUDIO + SELECT ================= */
      {
        quizId: "kviz1",
        order: 5,
        type: "audio_select",
        id: "q3",
        title:
          "Poslušajte rečenice: Ponovo je zasjalo sunce. Nakon kiše pojavi se duga.",

        voices: [
          { label: "govornik 1", audio: "/audio/govornik1.wav" },
          { label: "govornik 2", audio: "/audio/govornik2.wav" },
          { label: "govornica 3", audio: "/audio/govornica3.wav" },
          { label: "govornica 4", audio: "/audio/govornica4.wav" },
        ],

        question:
          "Možete li prepoznati iz koje regije dolaze govornici?",

        options: ["sjeverna", "zapadna", "južna", "istočna"],

        lamp:
          "Govornici predstavljaju različite regije i naglasne sustave."
      },

      /* ================= Q4 AUDIO + SELECT ================= */
      {
        quizId: "kviz1",
        order: 6,
        type: "audio_select",
        id: "q4",
        title:
          "Poslušajte izgovor riječi kiša, sunce, trava, rosa...",

        voices: [
          { label: "govornik 1", audio: "/audio/govornik1.wav" },
          { label: "govornik 2", audio: "/audio/govornik2.wav" },
        ],

        question:
          "Moj je naglasni sustav sličniji ____________.",

        options: ["govorniku 1", "govorniku 2"],
      },

      /* ================= Q5 AUDIO + SELECT ================= */
      {
        quizId: "kviz1",
        order: 7,
        type: "audio_select",
        id: "q5",

        title:
          "Ako je Vaš izgovor sličniji prvome govorniku, vjerojatno je Vaš naglasni sustav VISINSKI, a ako je sličniji drugome, onda je UDARNI.",

        voices: [
          { label: "Primjer 1", audio: "/audio/1-1-2a.wav" },
          { label: "Primjer 2", audio: "/audio/1-1-2b.wav" },
          { label: "Primjer 3", audio: "/audio/1-1-2c.wav" },
          { label: "Primjer 4", audio: "/audio/1-1-2d.wav" },
        ],

        question:
          "Moj je naglasni sustav __________.",

        options: ["udarni", "visinski", "miješani", "prijelazni"],

        lamp:
          "Naglasni sustavi se razlikuju po visini i trajanju."
      },

      /* ================= Q6 AUDIO + SELECT ================= */
      {
        quizId: "kviz1",
        order: 8,
        type: "audio_select",
        id: "q6",

        title:
          "Poslušajte izgovor rečenica: Ovo je naglasni priručnik. Nakon kiše pojavi se duga.",

        voices: [
          { label: "Osijek", audio: "/audio/govornica3.wav" },
          { label: "Split", audio: "/audio/govornica4.wav" },
          { label: "Rijeka", audio: "/audio/govornik2.wav" },
          { label: "Pula", audio: "/audio/govornik1.wav" },
        ],

        question:
          "Koji izgovor pripada visinskom naglasnom sustavu?",

        options: ["Osijek", "Split", "Rijeka", "Pula"],

        lamp:
          "Visinski sustav karakteriziraju uzlazni naglasci."
      },

      /* ================= Q7 AUDIO + SUBQUESTIONS ================= */
      {
        quizId: "kviz1",
        order: 9,
        type: "audio_select",
        id: "q7",

        title:
          "Poslušajte rečenicu u tri različita izgovora.",

        voices: [
          { label: "izgovor 1", audio: "/audio/izgovor1.wav" },
          { label: "izgovor 2", audio: "/audio/izgovor2.wav" },
          { label: "izgovor 3", audio: "/audio/izgovor3.wav" },
        ],

        lamp:
          "Različiti izgovori prikazuju varijetete standarda.",

        subquestions: [
          {
            id: "q7_1",
            question: "Koji je običan?",
            options: ["1", "2", "3"],
            correct: "2",
          },
          {
            id: "q7_2",
            question: "Koji je visoki stil?",
            options: ["1", "2", "3"],
          },
          {
            id: "q7_3",
            question: "Koji je razgovorni?",
            options: ["1", "2", "3"],
            correct: "3",
          },
          {
            id: "q7_4",
            question: "Vaš govor?",
            options: ["1", "2", "3"],
          },
        ],
      },

  ];

    const result = await QuizQuestion.insertMany(kviz);

    console.log("✔ KVIZ UBACEN:", result.length, "pitanja");
  } catch (err) {
    console.error("Greška:", err);
  } finally {
    await mongoose.connection.close();
    console.log("Mongo connection closed");
  }
}

run();