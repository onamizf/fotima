/* Autonomous scene: animation, safe frame and three explanation cards. */
const SituationB={
  "id": "danger-b",
  "previous": "danger-a",
  "frames": [
    "assets/lab/1-1/b-1-start.webp",
    "assets/lab/1-1/b-2-boil.webp",
    "assets/lab/1-1/b-3-splash.webp",
    "assets/lab/1-1/b-4-safe.webp"
  ],
  "stages": [
    {
      "at": 0,
      "frame": 0,
      "zoom": 1.06,
      "effect": "hint"
    },
    {
      "at": 3,
      "frame": 1,
      "zoom": 1.3,
      "effect": "boiling",
      "points": {
        "rim": {
          "x": 54,
          "y": 42
        },
        "tubeBottom": {
          "x": 57,
          "y": 53
        }
      }
    },
    {
      "at": 6,
      "frame": 2,
      "zoom": 1.3,
      "effect": "tube-splash"
    },
    {
      "at": 9,
      "frame": 2,
      "zoom": 1,
      "effect": "explain"
    },
    {
      "at": 12,
      "frame": 3,
      "zoom": 1,
      "effect": "safe"
    }
  ],
  "zones": {
    "goggles": {
      "x": 62,
      "y": 63,
      "w": 12,
      "h": 9
    },
    "tube": {
      "x": 51,
      "y": 40,
      "w": 7,
      "h": 19
    },
    "flame": {
      "x": 55.5,
      "y": 54,
      "w": 4,
      "h": 15
    },
    "face": {
      "x": 45,
      "y": 20,
      "w": 12,
      "h": 25
    }
  },
  "hintZone": "goggles",
  "cameraZone": "tube",
  "effectPoints": {
    "rim": {
      "x": 56,
      "y": 42
    },
    "tubeBottom": {
      "x": 52.5,
      "y": 57
    },
    "face": {
      "x": 51,
      "y": 34
    },
    "flame": {
      "x": 57.4,
      "y": 59
    }
  },
  "successEffect": "goggles-flight",
  "copy": {
    "ru": {
      "title": "Нагревание без защитных очков",
      "watch": "Смотри внимательно, что произойдёт…",
      "loading": "Загружаем сцену…",
      "loadError": "Кадры сцены недоступны. Проверь подключение и попробуй ещё раз.",
      "retry": "Повторить загрузку",
      "play": "Продолжить",
      "pause": "Пауза",
      "restart": "Сначала",
      "sound": "Звук",
      "timeline": "Этапы сцены",
      "danger": "⚠ ОПАСНО",
      "safe": "✔ ПРАВИЛЬНО",
      "stop": "Ой! А где твои очки? 😱",
      "praise": "Глаза в безопасности! 👍",
      "replay": "↺ Посмотреть ещё раз",
      "alts": [
        "Тимур без очков нагревает пробирку, держа её пальцами; очки лежат на столе",
        "Жидкость в пробирке бурно кипит, над отверстием пар",
        "Капли горячей жидкости летят к незащищённым глазам и лицу Тимура",
        "Тимур в очках нагревает наклонённую пробирку с держателем, отверстием от людей"
      ],
      "heading": "Практическая работа 1.1 · Ситуация B из 4",
      "situation": "СИТУАЦИЯ B",
      "next": "Ситуация C →",
      "gogglesLabel": "Очки не надеты",
      "tubeLabel": "Пробирка без держателя и направлена на себя",
      "previous": "← Ситуация A"
    },
    "uz-Latn": {
      "title": "Himoya ko‘zoynagisiz isitish",
      "watch": "Nima bo‘lishini diqqat bilan kuzat…",
      "loading": "Sahna yuklanmoqda…",
      "loadError": "Sahna rasmlari ochilmadi. Ulanishni tekshirib, qayta urinib ko‘r.",
      "retry": "Qayta yuklash",
      "play": "Davom ettirish",
      "pause": "Pauza",
      "restart": "Boshidan",
      "sound": "Ovoz",
      "timeline": "Sahna bosqichlari",
      "danger": "⚠ XAVFLI",
      "safe": "✔ TO‘G‘RI",
      "stop": "Voy! Ko‘zoynaging qani? 😱",
      "praise": "Ko‘zlar himoyalangan! 👍",
      "replay": "↺ Yana ko‘rish",
      "alts": [
        "Temur ko‘zoynaksiz probirkani barmoqlari bilan qizdiryapti; ko‘zoynak stolda",
        "Probirkadagi suyuqlik kuchli qaynayapti, og‘zidan bug‘ chiqyapti",
        "Issiq tomchilar Temurning himoyalanmagan yuzi va ko‘zlariga sachrayapti",
        "Temur ko‘zoynakda, probirkani tutqich bilan qiya ushlab, og‘zini odamlardan nariga qaratgan"
      ],
      "heading": "1.1-amaliy ish · 4 vaziyatdan B vaziyat",
      "situation": "B VAZIYAT",
      "next": "D vaziyat →",
      "gogglesLabel": "Ko‘zoynak taqilmagan",
      "tubeLabel": "Probirka tutqichsiz, og‘zi o‘ziga qaratilgan",
      "previous": "← A vaziyat"
    },
    "uz-Cyrl": {
      "title": "Ҳимоя кўзойнагисиз иситиш",
      "watch": "Nima bo‘lishini diqqat bilan kuzat…",
      "loading": "Sahna yuklanmoqda…",
      "loadError": "Sahna rasmlari ochilmadi. Ulanishni tekshirib, qayta urinib ko‘r.",
      "retry": "Qayta yuklash",
      "play": "Davom ettirish",
      "pause": "Pauza",
      "restart": "Boshidan",
      "sound": "Ovoz",
      "timeline": "Sahna bosqichlari",
      "danger": "⚠ XAVFLI",
      "safe": "✔ TO‘G‘RI",
      "stop": "Вой! Кўзойнагинг қани? 😱",
      "praise": "Кўзлар ҳимояланган! 👍",
      "replay": "↺ Yana ko‘rish",
      "alts": [
        "Темур кўзойнаксиз пробиркани бармоқлари билан қиздиряпти; кўзойнак столда",
        "Пробиркадаги суюқлик кучли қайнаяпти, оғзидан буғ чиқяпти",
        "Иссиқ томчилар Темурнинг ҳимояланмаган юзи ва кўзларига сачраяпти",
        "Темур кўзойнакда, пробиркани тутқич билан қия ушлаб, оғзини одамлардан нарига қаратган"
      ],
      "heading": "1.1-амалий иш · 4 вазиятдан B вазият",
      "situation": "B ВАЗИЯТ",
      "next": "D вазият →",
      "gogglesLabel": "Кўзойнак тақилмаган",
      "tubeLabel": "Пробирка тутқичсиз, оғзи ўзига қаратилган",
      "previous": "← A вазият"
    },
    "en": {
      "title": "Heating without safety goggles",
      "watch": "Watch carefully to see what happens…",
      "loading": "Loading the scene…",
      "loadError": "Scene images are unavailable. Check your connection and try again.",
      "retry": "Try again",
      "play": "Play",
      "pause": "Pause",
      "restart": "Restart",
      "sound": "Sound",
      "timeline": "Scene stages",
      "danger": "⚠ DANGER",
      "safe": "✔ SAFE",
      "stop": "Oops! Where are your goggles? 😱",
      "praise": "Eyes protected! 👍",
      "replay": "↺ Watch again",
      "alts": [
        "Timur heats a test tube with his fingers; his goggles are on the bench",
        "Liquid boils vigorously in the tube, with vapour above its opening",
        "Hot droplets fly towards Timur’s unprotected face and eyes",
        "Timur wears goggles and uses a holder to heat a tilted tube, pointed away from people"
      ],
      "heading": "Practical work 1.1 · Situation B of 4",
      "situation": "SITUATION B",
      "next": "Situation C →",
      "gogglesLabel": "Goggles are not being worn",
      "tubeLabel": "No holder; the tube points towards the learner",
      "previous": "← Situation A"
    }
  },
  "helperPlacement": "top-right",
  "dangerZone": {
    "x": 45,
    "y": 20,
    "w": 29,
    "h": 52
  },
  "focusZone": {
    "x": 44,
    "y": 18,
    "w": 31,
    "h": 55
  },
  "frogLines": {
    "ru": [
      "Тимур нагревает пробирку с раствором… Смотри внимательно, что произойдёт…",
      "Жидкость закипает всё сильнее…",
      "Жидкость выплеснулась к лицу. Останови нагревание! Жидкость перегрелась и выплеснулась к лицу. Глаза Тимура не были защищены очками.",
      "Жидкость перегрелась и выплеснулась к лицу. Глаза Тимура не были защищены очками.",
      "Глаза в безопасности! 👍"
    ],
    "uz-Latn": [
      "Temur eritmani probirkada qizdiryapti… Nima bo‘lishini diqqat bilan kuzat…",
      "Suyuqlik tobora kuchliroq qaynayapti…",
      "Suyuqlik yuz tomon sachradi. Isitishni to‘xtat! Suyuqlik ortiqcha qizib, yuz tomon sachradi. Temurning ko‘zlari ko‘zoynak bilan himoyalanmagan edi.",
      "Suyuqlik ortiqcha qizib, yuz tomon sachradi. Temurning ko‘zlari ko‘zoynak bilan himoyalanmagan edi.",
      "Ko‘zlar himoyalangan! 👍"
    ],
    "uz-Cyrl": [
      "Темур эритмани пробиркада қиздиряпти… Nima bo‘lishini diqqat bilan kuzat…",
      "Суюқлик тобора кучлироқ қайнаяпти…",
      "Суюқлик юз томон сачради. Иситишни тўхтат! Суюқлик ортиқча қизиб, юз томон сачради. Темурнинг кўзлари кўзойнак билан ҳимояланмаган эди.",
      "Суюқлик ортиқча қизиб, юз томон сачради. Темурнинг кўзлари кўзойнак билан ҳимояланмаган эди.",
      "Кўзлар ҳимояланган! 👍"
    ],
    "en": [
      "Timur is heating a solution in a test tube… Watch carefully to see what happens…",
      "The liquid boils more and more vigorously…",
      "Liquid splashes towards his face. Stop heating! The liquid overheated and splashed towards Timur’s face. His eyes were not protected by goggles.",
      "The liquid overheated and splashed towards Timur’s face. His eyes were not protected by goggles.",
      "Eyes protected! 👍"
    ]
  },
  "explanation": {
    "ru": [
      {
        "kind": "what",
        "title": "① Что случилось",
        "body": "Жидкость перегрелась и выплеснулась к лицу. Глаза Тимура не были защищены очками."
      },
      {
        "kind": "why",
        "title": "② Почему это опасно",
        "body": [
          "Горячая жидкость и пар могут обжечь лицо.",
          "Капли реактива могут повредить глаза и зрение.",
          "Горячее стекло обжигает пальцы."
        ]
      },
      {
        "kind": "good",
        "title": "④ ✅ Как надо",
        "body": [
          "Надеть очки до начала работы и не снимать до конца.",
          "Закрепить держатель на верхней трети пробирки.",
          "Наклонить примерно на 45°, отверстие направить от людей.",
          "Сначала равномерно прогреть всю пробирку, затем нагревать жидкость, плавно перемещая пробирку."
        ]
      }
    ],
    "uz-Latn": [
      {
        "kind": "what",
        "title": "① Nima bo‘ldi",
        "body": "Suyuqlik ortiqcha qizib, yuz tomon sachradi. Temurning ko‘zlari ko‘zoynak bilan himoyalanmagan edi."
      },
      {
        "kind": "why",
        "title": "② Nega xavfli",
        "body": [
          "Issiq suyuqlik va bug‘ yuzni kuydirishi mumkin.",
          "Reaktiv tomchilari ko‘zga zarar yetkazib, ko‘rishni buzishi mumkin.",
          "Issiq shisha barmoqlarni kuydiradi."
        ]
      },
      {
        "kind": "good",
        "title": "④ ✅ To‘g‘ri yo‘l",
        "body": [
          "Ko‘zoynakni ish boshida taqib, oxirigacha yechma.",
          "Tutqichni probirkaning yuqori uchdan bir qismiga mahkamla.",
          "Taxminan 45° qiyalat, og‘zini odamlardan nariga qarat.",
          "Avval butun probirkani bir tekis isit, keyin uni sekin harakatlantirib suyuqlikni qizdir."
        ]
      }
    ],
    "uz-Cyrl": [
      {
        "kind": "what",
        "title": "① Nima bo‘ldi",
        "body": "Суюқлик ортиқча қизиб, юз томон сачради. Темурнинг кўзлари кўзойнак билан ҳимояланмаган эди."
      },
      {
        "kind": "why",
        "title": "② Nega xavfli",
        "body": [
          "Иссиқ суюқлик ва буғ юзни куйдириши мумкин.",
          "Реактив томчилари кўзга зарар етказиб, кўришни бузиши мумкин.",
          "Иссиқ шиша бармоқларни куйдиради."
        ]
      },
      {
        "kind": "good",
        "title": "④ ✅ To‘g‘ri yo‘l",
        "body": [
          "Кўзойнакни иш бошида тақиб, охиригача ечма.",
          "Тутқични пробирканинг юқори учдан бир қисмига маҳкамла.",
          "Тахминан 45° қиялат, оғзини одамлардан нарига қарат.",
          "Аввал бутун пробиркани бир текис исит, кейин уни секин ҳаракатлантириб суюқликни қиздир."
        ]
      }
    ],
    "en": [
      {
        "kind": "what",
        "title": "① What happened",
        "body": "The liquid overheated and splashed towards Timur’s face. His eyes were not protected by goggles."
      },
      {
        "kind": "why",
        "title": "② Why it is dangerous",
        "body": [
          "Hot liquid and vapour can burn the face.",
          "Chemical splashes can injure the eyes and damage sight.",
          "Hot glass can burn fingers."
        ]
      },
      {
        "kind": "good",
        "title": "④ ✅ Work safely",
        "body": [
          "Put goggles on before starting and keep them on throughout.",
          "Attach the holder to the upper third of the tube.",
          "Tilt the tube about 45° and point its opening away from people.",
          "Warm the whole tube evenly first, then heat the liquid while moving the tube gently."
        ]
      }
    ]
  }
};
SafetySituations.decorate(SituationB);
