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
        text: "Odredite narječje koje je obilježilo Vaš govor. Pronađite na karti mjesto Vašega najdužega boravka i školovanja. Uzmite u obzir i podrijetlo roditelja/staratelja.",
        note: "Plava = čakavsko | Zelena = kajkavsko | Žuta = štokavsko",
      },

      /* ================= Q1A ================= */
      {
        quizId: "kviz1",
        order: 2,
        type: "select",
        id: "q1a",
        question: "Mjesto u kojemu sam najduže boravio/boravila pripada ______ narječju.",
        options: ["kajkavskom", "čakavskom", "štokavskom"],
        correct: null,
        lamp: "Kajkavsko - sjever, čakavsko - zapad i jug, štokavsko - istok.",
      },

      /* ================= Q1B ================= */
      {
        quizId: "kviz1",
        order: 3,
        type: "select",
        id: "q1b",
        question: "Govor mojih roditelja/staratelja pripada ______ narječju.",
        options: ["istom", "različitom"],
        correct: null,
        lamp: "Ako je različito, Vaš naglasni sustav može biti mješovit.",
      },

      /* ================= Q2 ================= */
      {
        quizId: "kviz1",
        order: 4,
        type: "select",
        id: "q2",
        question: "Moje mjesto najdužega boravka pripada _________________ regiji.",
        options: ["zapadnoj", "sjevernoj", "južnoj", "istočnoj"],
        correct: null,
        lamp: "Ovisno o podrijetlu roditelja, Vaš naglasni sustav može biti drugačiji.",
      },

      /* ================= Q3a ================= */
      {
        quizId: "kviz1",
        order: 5,
        type: "audio_select",
        id: "q3a",
        question: "Iz koje regije dolazi govornik 1?",
        voices: [{ label: "Poslušaj govornika 1", audio: "/audio/1-1-2a.wav" }],
        options: ["sjeverna Hrvatska", "zapadna Hrvatska", "južna Hrvatska", "istočna Hrvatska"],
        correct: "3",
        lamp: "Govornik 1 dolazi iz istočne Hrvatske (Osijek).",
      },

      /* ================= Q3b ================= */
      {
        quizId: "kviz1",
        order: 6,
        type: "audio_select",
        id: "q3b",
        question: "Iz koje regije dolazi govornik 2?",
        voices: [{ label: "Poslušaj govornika 2", audio: "/audio/1-1-2b.wav" }],
        options: ["sjeverna Hrvatska", "zapadna Hrvatska", "južna Hrvatska", "istočna Hrvatska"],
        correct: "1",
        lamp: "Govornik 2 dolazi iz zapadne Hrvatske (Rijeka).",
      },

      /* ================= Q3c ================= */
      {
        quizId: "kviz1",
        order: 7,
        type: "audio_select",
        id: "q3c",
        question: "Iz koje regije dolazi govornica 3?",
        voices: [{ label: "Poslušaj govornicu 3", audio: "/audio/1-1-2c.wav" }],
        options: ["sjeverna Hrvatska", "zapadna Hrvatska", "južna Hrvatska", "istočna Hrvatska"],
        correct: "0",
        lamp: "Govornica 3 dolazi iz sjeverne Hrvatske (Zagreb).",
      },

      /* ================= Q3d ================= */
      {
        quizId: "kviz1",
        order: 8,
        type: "audio_select",
        id: "q3d",
        question: "Iz koje regije dolazi govornica 4?",
        voices: [{ label: "Poslušaj govornicu 4", audio: "/audio/1-1-2d.wav" }],
        options: ["sjeverna Hrvatska", "zapadna Hrvatska", "južna Hrvatska", "istočna Hrvatska"],
        correct: "2",
        lamp: "Govornica 4 dolazi iz južne Hrvatske (Split).",
      },

      /* ================= Q4 ================= */
      {
        quizId: "kviz1",
        order: 9,
        type: "audio_select",
        id: "q4",
        question: "Je li Vaš govor, kada se trudite izgovarati standardno, sličniji govorniku 1 ili govorniku 2?",
        voices: [
          { label: "Govornik 1", audio: "/audio/1-1-4a.wav.wav" },
          { label: "Govornik 2", audio: "/audio/1-1-4b_dio_mono_prvih_6_fale4.wav" },
        ],
        options: ["Govorniku 1", "Govorniku 2"],
        correct: "0",
        lamp: "Govornik 1 govori standardno (visinski sustav), govornik 2 govori udarno.",
      },

      /* ================= Q5 ================= */
      {
        quizId: "kviz1",
        order: 10,
        type: "audio_select",
        id: "q5",
        question: "Poslušajte primjere i odredite svoj naglasni sustav.",
        voices: [
          { label: "Primjer 1", audio: "/audio/1-1-2a.wav" },
          { label: "Primjer 2", audio: "/audio/1-1-2b.wav" },
          { label: "Primjer 3", audio: "/audio/1-1-2c.wav" },
          { label: "Primjer 4", audio: "/audio/1-1-2d.wav" },
        ],
        options: [],
      },

      /* ================= Q5.1 ================= */
      {
        quizId: "kviz1",
        order: 11,
        type: "select",
        id: "q5_1",
        question: "Moj je naglasni sustav __________.",
        options: ["udarni", "visinski", "miješani", "prijelazni"],
        correct: null,
        lamp: "Visinski - razlikuje ton i duljinu, udarni - samo mjesto naglaska.",
      },

      /* ================= Q6 ================= */
      {
        quizId: "kviz1",
        order: 12,
        type: "audio_select",
        id: "q6",
        question: "Koji izgovor pripada visinskom naglasnom sustavu (čuje se uzlazni ton na riječima priručnik i duga)?",
        voices: [
          { label: "Osijek", audio: "/audio/1-1-5a.wav" },
          { label: "Split", audio: "/audio/1-1-5b.wav" },
          { label: "Rijeka", audio: "/audio/1-1-5c.wav" },
          { label: "Pula", audio: "/audio/1-1-5d.wav" },
        ],
        options: [],
      },

      /* ================= Q6.1 ================= */
      {
        quizId: "kviz1",
        order: 13,
        type: "select",
        id: "q6_1",
        question: "Koji izgovor pripada visinskom naglasnom sustavu?",
        options: ["Osijek", "Split", "Rijeka", "Pula"],
        correct: "1",
        lamp: "Split ima visinski naglasni sustav (uzlazni ton).",
      },

      /* ================= Q7 ================= */
      {
        quizId: "kviz1",
        order: 14,
        type: "audio_select",
        id: "q7",
        question: "Poslušajte tri izgovora iste rečenice.",
        voices: [
          { label: "Izgovor 1", audio: "/audio/1-1-6a.wav.wav" },
          { label: "Izgovor 2", audio: "/audio/1-1-6b.wav.wav" },
          { label: "Izgovor 3", audio: "/audio/1-1-6c.wav.wav" },
        ],
        options: [],
      },

      /* ================= Q7.1 ================= */
      {
        quizId: "kviz1",
        order: 15,
        type: "select",
        id: "q7_1",
        question: "Koji od triju izgovora smatrate 'običnim', 'češćim'?",
        options: ["1", "2", "3"],
        correct: null,
        lamp: "Izgovor 2 smatra se neutralnijim standardom.",
      },

      /* ================= Q7.2 ================= */
      {
        quizId: "kviz1",
        order: 16,
        type: "select",
        id: "q7_2",
        question: "Koji izgovor percipirate kao 'visoki stil', 'naučen', 'akademski'?",
        options: ["1", "2", "3"],
        correct: null,
        lamp: "Izgovor 1 smatra se visokim stilom.",
      },

      /* ================= Q7.3 ================= */
      {
        quizId: "kviz1",
        order: 17,
        type: "select",
        id: "q7_3",
        question: "Koji izgovor smatrate 'razgovornim', 'zagrebačkim'?",
        options: ["1", "2", "3"],
        correct: null,
        lamp: "Izgovor 3 smatra se razgovornim stilom.",
      },

      /* ================= Q7.4 ================= */
      {
        quizId: "kviz1",
        order: 18,
        type: "select",
        id: "q7_4",
        question: "Je li Vaš govor sličniji prvom, drugom ili trećem izgovoru?",
        options: ["1", "2", "3"],
        correct: null,
        lamp: "Ako je sličniji izgovoru 3 - Vaš je naglasni sustav udarni.",
      },

    ];

    const result = await QuizQuestion.insertMany(kviz);

    console.log("✔ KVIZ 1 UBACEN:", result.length, "pitanja");
  } catch (err) {
    console.error("Greška:", err);
  } finally {
    await mongoose.connection.close();
    console.log("Mongo connection closed");
  }
}

run();