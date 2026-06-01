// seeds/kviz5.js

require("dotenv").config();

const mongoose = require("mongoose");
const QuizQuestion = require("../quiz_models");

async function run() {
  try {
    console.log("Spajanje na Mongo...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Mongo spojen ✔");

    await QuizQuestion.deleteMany({ quizId: "kviz5" });

    console.log("Stari kviz obrisan");

    const kviz = [

      /* ================= INTRO ================= */
      {
        quizId: "kviz5",
        order: 1,
        type: "intro",
        title: "Naglasci u paradigmi",
        text: "U ovom kvizu provjeravamo znanje o naglasnim promjenama u paradigmi hrvatskoga standardnog jezika.",
      },

      /* ================= Q1 ================= */
      {
        quizId: "kviz5",
        order: 2,
        type: "select",
        id: "q1",
        question: "Što se promijenilo u naglasku u deklinaciji imenice stȏl – stòla – stòlovi?",
        options: ["ton", "trajanje", "ton i trajanje", "mjesto"],
        correct: "2",
        lamp: "U paradigmi stȏl – stòla – stòlovi mijenja se i ton (silazni → uzlazni) i trajanje (dugi → kratki), dakle ton i trajanje zajedno.",
      },

      /* ================= Q2 ================= */
      {
        quizId: "kviz5",
        order: 3,
        type: "audio_select",
        id: "q2",
        question: "Poslušajte izgovor imenice vrijeme, usporedite znakovlje u oblicima te odredite što se promijenilo u paradigmi.\n\nMislim na vrijéme. Nemam vrȅmena. Druga su vremèna.",
        voices: [
          { label: "Poslušaj: vrijéme / vrȅmena / vremèna", audio: "/audio/1-6-1.wav.wav" },
        ],
        options: ["ton i trajanje", "mjesto i trajanje", "mjesto, ton i trajanje"],
        correct: "2",
        lamp: "U paradigmi imenice vrijeme mijenja se mjesto naglaska, ton i trajanje — dakle sve tri sastavnice naglaska.",
      },

      /* ================= Q3a ================= */
      {
        quizId: "kviz5",
        order: 4,
        type: "audio_select",
        id: "q3a",
        question: "Poslušajte imenicu novac u različitim oblicima. Je li riječ o promjenljivome ili nepromjenljivome naglasnom tipu?",
        voices: [
          { label: "Poslušaj: novac", audio: "/audio/1-6-2.wav.wav" },
        ],
        options: ["promjenljivi tip", "nepromjenljivi tip"],
        correct: "0",
        lamp: "Novac pripada promjenljivome tipu — naglasak se mijenja kroz paradigmu (nòvac – nòvca – novàca).",
      },

      /* ================= Q3b ================= */
      {
        quizId: "kviz5",
        order: 5,
        type: "audio_select",
        id: "q3b",
        question: "Poslušajte imenicu ljubav u različitim oblicima. Je li riječ o promjenljivome ili nepromjenljivome naglasnom tipu?",
        voices: [
          { label: "Poslušaj: ljubav", audio: "/audio/1-6-2.wav.wav" },
        ],
        options: ["promjenljivi tip", "nepromjenljivi tip"],
        correct: "1",
        lamp: "Ljubav pripada nepromjenljivome tipu — naglasak ostaje isti kroz cijelu paradigmu (ljûbav – ljûbavi – ljûbavi...).",
      },

/* ================= Q4 ================= */
{
  quizId: "kviz5",
  order: 6,
  type: "audio_with_input",
  id: "q4",
  question: "Poslušajte izgovor rečenica i ispišite riječi za koje smatrate da su izgovorene s hiperkorektnim naglaskom.",
  voices: [
    { label: "Poslušaj izgovor rečenica", audio: "/audio/1-6-3.wav.wav" },
  ],
  sentences: [
    { prompt: "a) Nemoj mu otvoriti vrata.", parts: 1, correct: "otvoriti" },
    { prompt: "b) Zapuhao je snažan vjetar.", parts: 1, correct: "zapuhao" },
    { prompt: "c) Brod se nasukao na stijene.", parts: 1, correct: "nasukao" },
    { prompt: "d) Nije nas zanimala povijest.", parts: 1, correct: "zanimala" },
  ],
  lamp: "Hiperkorektni naglasci najčešće nastaju na korpusu glagola kod govornika koji nisu potpuno svladali standardnu normu. Točni odgovori: otvoriti, zapuhao, nasukao, zanimala.",
},

      /* ================= Q5 ================= */
      {
        quizId: "kviz5",
        order: 8,
        type: "multi-select",
        id: "q5",
        question: "U kojim se oblicima glagola može ostvariti pomicanje naglaska dodavanjem prefiksa?",
        options: ["pȋšēm", "písati", "píši", "písao", "pȋsan"],
        correct: [0, 4],
        lamp: "Na prefiks se pomiču samo silazni naglasci — dugosilazni (iza kojega ostaje zanaglasna dužina) i kratkosilazni. To su oblici pȋšēm i pȋsan.",
      },

      /* ================= Q6 ================= */
      {
        quizId: "kviz5",
        order: 9,
        type: "select",
        id: "q6",
        question: "Prema pravilu metatonije — koji se naglasak ostvaruje na prethodnom slogu (primjerice u riječima asistȅnt, dekȃn)?",
        options: ["kratkouzlazni", "dugouzlazni"],
        correct: "0",
        lamp: "Prema pravilu metatonije na prethodnom slogu ostvaruje se kratkouzlazni naglasak (asìstent, dèkan).",
      },

      /* ================= Q7 ================= */
      {
        quizId: "kviz5",
        order: 10,
        type: "select",
        id: "q7",
        question: "Prema pravilu metatonije — koji se naglasak ostvaruje pomicanjem na mjesto prednaglasne dužine (primjerice u riječima trāvȁ, rūkȁ)?",
        options: ["kratkouzlazni", "dugouzlazni"],
        correct: "1",
        lamp: "Pomicanjem na mjesto prednaglasne dužine ostvaruje se dugouzlazni naglasak (tráva, rúka).",
      },

      /* ================= Q8 ================= */
      {
        quizId: "kviz5",
        order: 11,
        type: "multi-select",
        id: "q8",
        question: "U kojim riječima ostaje zanaglasna dužina pomicanjem silaznih naglasaka?",
        options: ["asistȅnt", "dekȃn", "kolȃč", "minȉstar", "naprȁviti"],
        correct: [1, 2],
        lamp: "Zanaglasna dužina ostaje pri pomicanju dugosilaznog naglaska — dekȃn → dèkān, kolȃč → kòlāč. Kratkosilazni naglasci ne ostavljaju zanaglasnu dužinu.",
      },

    ];

    const result = await QuizQuestion.insertMany(kviz);

    console.log("✔ KVIZ 5 UBACEN:", result.length, "pitanja");
  } catch (err) {
    console.error("Greška:", err);
  } finally {
    await mongoose.connection.close();
    console.log("Mongo connection closed");
  }
}

run();