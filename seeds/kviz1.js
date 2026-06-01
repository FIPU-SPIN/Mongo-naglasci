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
          scoring: {
          kajkavskom: { visinski: 1 },
          čakavskom: { udarni: 1 },
          štokavskom: { miješani: 1 }
    },
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
          scoring: {
          istom: { visinski: 0.5, udarni: 0.5 },
          različitom: { miješani: 1 }
        },
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
          scoring: {
          zapadnoj: { visinski: 1 },
          sjevernoj: { visinski: 1 },
          južnoj: { udarni: 1 },
          istočnoj: { miješani: 1 }
        }
      },

      /* ================= Q3 AUDIO ================= */
      {
          quizId: "kviz1",
          order: 5,
          type: "audio_select",
          id: "q3",
          title:
            "Poslušajte rečenice: Ponovo je zasjalo sunce. Nakon kiše pojavi se duga.",

          voices: [
            { label: "govornik 1", audio: "/audio/1-1-2a.wav" }, //1-1-2a
            { label: "govornik 2", audio: "/audio/1-1-2b.wav" }, //1-1-2b
            { label: "govornica 3", audio: "/audio/1-1-2c.wav" }, //1-1-2c
            { label: "govornica 4", audio: "/audio/1-1-2d.wav" }, //1-1-2d
          ],
      },

        /* ================= Q3.1 ================= */
      {
          quizId: "kviz1",
          order: 6,
          type: "select",
          id: "q3_1",
          question: "Možete li prepoznati iz koje regije dolaze govornici?",
          options: ["sjeverna", "zapadna", "južna", "istočna"],
          lamp: "Govornici predstavljaju različite regije i naglasne sustave.",
          scoring: {
          sjeverna: { visinski: 1 },
          zapadna: { visinski: 1 },
          južna: { udarni: 1 },
          istočna: { miješani: 1 }
        },
      },

      /* ================= Q4 AUDIO ================= */
      {
          quizId: "kviz1",
          order: 7,
          type: "audio_select",
          id: "q4",
          title: "Poslušajte izgovor riječi kiša, sunce, trava, rosa, pamtiti, napisati, mjesec, slikar, mornar, seljak kod dvaju govornika hrvatskoga jezika. Razmislite i odgovorite: je li Vaš govor, kada se trudite izgovarati standardno, sličniji govoru prvoga ili drugoga govornika?",
          voices: [
            { label: "govornik 1", audio: "/audio/1-1-4a.wav.wav" }, //1-1-4a
            { label: "govornik 2", audio: "/audio/1-1-4b_dio_mono_prvih_6_fale4.wav" }, //1-1-4b
          ],
      },

        /* ================= Q4.1 ================= */
      {
          quizId: "kviz1",
          order: 8,
          type: "select",
          id: "q4_1",
          question: "Moj je naglasni sustav sličniji __________.",
          options: ["govorniku 1", "govorniku 2"],
          lamp: "Prvi govornik, spiker, riječi je izgovorio standardno, s četiri naglaska i gdje je potrebno sa zanaglasnom dužinom. Drugi govornik, porijeklom iz Pule, riječi je izgovorio s jednim udarnim naglaskom, bez razlike u trajanju dugih i kratkih naglasaka, bez razlike u tonu uzlaznih i silaznih naglasaka te bez zanaglasne dužine. U nekim se riječima drugi govornik razlikuje od prvoga i po izgovoru mjesta naglaska",
          scoring: {
          "govorniku 1": { visinski: 2 },
          "govorniku 2": { udarni: 2 }
          },
        },

      /* ================= Q5 AUDIO ================= */
        {
          quizId: "kviz1",
          order: 9,
          type: "audio_select",
          id: "q5",
          title: "Ako je Vaš izgovor sličniji prvome govorniku, vjerojatno je Vaš naglasni sustav VISINSKI, a ako je sličniji drugome, onda je UDARNI.",
          voices: [
            { label: "Primjer 1", audio: "/audio/1-1-2a.wav" },
            { label: "Primjer 2", audio: "/audio/1-1-2b.wav" },
            { label: "Primjer 3", audio: "/audio/1-1-2c.wav" },
            { label: "Primjer 4", audio: "/audio/1-1-2d.wav" },
          ],
        },

        /* ================= Q5.1 ================= */
        {
          quizId: "kviz1",
          order: 10,
          type: "select",
          id: "q5_1",
          question: "Moj je naglasni sustav __________.",
          options: ["udarni", "visinski", "miješani", "prijelazni"],
          lamp: "Naglasni sustavi se razlikuju po visini i trajanju.",
          scoring: {
          udarni: { udarni: 2 },
          visinski: { visinski: 2 },
          miješani: { miješani: 2 },
          prijelazni: { visinski: 1, udarni: 1 }
        },
        },


        /* ================= Q6 ================= */
        {
          quizId: "kviz1",
          order: 11,
          type: "audio_select",
          id: "q6",
          title:
            "Poslušajte izgovor rečenica Ovo je naglasni priručnik. Nakon kiše pojavi se duga. dviju govornica iz visinskoga naglasnog sustava i dviju govornica iz udarnoga sustava. Koji izgovor pripada visinskom naglasnom sustavu, tj. čuje se uzlazni ton (obratite pozornost na riječi priručnik i duga)?",

          voices: [
            { label: "Osijek", audio: "/audio/1-1-5a.wav" }, //1-1-5a
            { label: "Split", audio: "/audio/1-1-5b.wav" }, //1-1-5b
            { label: "Rijeka", audio: "/audio/1-1-5c.wav" }, //1-1-5c
            { label: "Pula", audio: "/audio/1-1-5d.wav" }, //1-1-5d
          ],
        },

        /* ================= Q6.1 ================= */

        {
            quizId: "kviz1",
            order: 12,
            type: "select",
            id: "q6_1",
            question: "Koji izgovor pripada visinskom naglasnom sustavu?",
            options: ["Osijek", "Split", "Rijeka", "Pula"],
            correct: "Split",
            lamp: "Visinski sustav karakteriziraju uzlazni naglasci.",
            scoring: {
            Split: { visinski: 2 },
            Osijek: { visinski: 1 },
            Rijeka: { miješani: 1 },
            Pula: { udarni: 2 }
          },
          },


        /* ================= Q7 ================= */
        {
            quizId: "kviz1",
            order: 13,
            type: "audio_select",
            id: "q7",
            title:"Poslušajte rečenicu Na Hrvatskoj televiziji govornik na dijalektu objašnjava recept kako napraviti dobar kolač. u tri različita izgovora. ",
            voices: [
              { label: "izgovor 1", audio: "/audio/1-1-6a.wav.wav" }, //1-1-6a
              { label: "izgovor 2", audio: "/audio/1-1-6b.wav.wav" }, //1-1-6b
              { label: "izgovor 3", audio: "/audio/1-1-6c.wav.wav" }, //1-1-6c
            ],
            lamp: "Sve rečenice u prethodnoj vježbi izgovorio je spiker. Izgovor 1 oprimjeruje govor s naglascima i dužinama koji su propisani u normativnim priručnicima te ilustrira visoki varijetet. Izgovor 2 oprimjeruje govor s ponešto izmijenjenim raspodjelnim pravilima i gotovo dokinutom zanaglasnom dužinom te ilustrira neutralni (prihvatljiv i prihvaćen) varijetet. Izgovor 3 oprimjeruje govor s udarnim naglaskom i mjestima naglaska kojima ilustriramo niski varijetet.",
          },

          /* ================= Q7.1 ================= */

          {
            quizId: "kviz1",
            order: 14,
            type: "select",
            id: "q7_1",
            question: "Koji od triju izgovora smatrate „običnim”, „češćim”?",
            options: ["1", "2", "3"],
            lamp: "Ovi primjeri ilustriraju varijetetnost standarda. I Vaš će se izgovor vjerojatno razlikovati ovisno o komunikacijskoj situaciji, mjestu na kojemu govorite. Izgovor 2 smatra se neutralnijim, običnijim standardom, s obzirom na mjesto naglaska, u sociofonetskim istraživanjima.",
            scoring: {
            "1": { visinski: 2 },
            "2": { miješani: 2 },
            "3": { udarni: 2 }
          },
          },

          /* ================= Q7.2 ================= */

          {
            quizId: "kviz1",
            order: 15,
            type: "select",
            id: "q7_2",
            question: "Koji izgovor percipirate kao „visoki stil”, „naučen”, „akademski”, „biraniji stil”?",
            options: ["1", "2", "3"],
            lamp: "Iako se Izgovor 1 smatra visokim i biranijim stilom, mnogi ga danas doživljaju zastarjelim ili regionalno obilježenim (ovisno o podrijetlu i dobi onoga tko procjenjuje izgovore). Ovaj bi izgovor mogao biti najbliži onima iz južne regije (zbog izgovora posuđenice televizija).",
           scoring: {
            "1": { visinski: 2 },
            "2": { miješani: 1 },
            "3": { udarni: 1 }
          },
          },

          /* ================= Q7.3 ================= */

          {
            quizId: "kviz1",
            order: 16,
            type: "select",
            id: "q7_3",
            question: "Koji izgovor smatrate „razgovornim”, „zagrebačkim” ili specifičnim za neki drugi lokalni govor, ali ne biste očekivali, primjerice, od nastavnika hrvatskoga jezika ili spikera na Hrvatskoj radioteleviziji da tako govore? ",
            options: ["1", "2", "3"],
            lamp: "Ako ste takvim procijenili izgovor 3, to znači da ste tijekom školovanja stekli temeljna znanja o značajkama standardnoga izgovora te da ih možete prepoznavati.",
            scoring: {
            "1": { visinski: 1 },
            "2": { miješani: 2 },
            "3": { udarni: 2 }
          },
          },
  
          /* ================= Q7.4 ================= */

          {
            quizId: "kviz1",
            order: 17,
            type: "select",
            id: "q7_4",
            question: "Je li Vaš govor sličniji prvom, drugom ili trećem izgovoru?",
            options: ["1", "2", "3"],
            lamp: "Ako je Vaš govor najsličniji izgovoru 3, ponovno ste potvrdili da je Vaš naglasni sustav udarni, a ako je Vaš odgovor izgovor 1 ili 2, potvrdili ste da je Vaš naglasni sustav visinski ili miješani/prijelazni. Za detaljniju analizu Vašega naglasnog sutava potrebno je testirati i percepciju (izgovor), a to činimo naknadno, u aplikaciji Izgovaram.",
            scoring: {
            "1": { visinski: 1 },
            "2": { miješani: 1 },
            "3": { udarni: 1 }
          },
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