/* Autonomous scene: animation, safe frame and three explanation cards. */
const SituationC={
  "id": "danger-c",
  "previous": "danger-b",
  "frames": [
    "assets/lab/1-1/c-1-start.webp",
    "assets/lab/1-1/c-2-sniff.webp",
    "assets/lab/1-1/c-3-dizzy.webp",
    "assets/lab/1-1/c-4-safe.webp"
  ],
  "stages": [
    {
      "at": 0,
      "frame": 0,
      "zoom": 1.06,
      "effect": "vapour-lines"
    },
    {
      "at": 3,
      "frame": 1,
      "zoom": 1.35,
      "effect": "inhale"
    },
    {
      "at": 6,
      "frame": 2,
      "zoom": 1.35,
      "effect": "dizzy"
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
      "effect": "safe",
      "points": {
        "rim": {
          "x": 61,
          "y": 46
        },
        "nose": {
          "x": 54,
          "y": 41
        }
      }
    }
  ],
  "zones": {
    "tube": {
      "x": 55,
      "y": 40,
      "w": 4,
      "h": 13
    },
    "face": {
      "x": 45,
      "y": 24,
      "w": 13,
      "h": 22
    },
    "vapour": {
      "x": 43,
      "y": 25,
      "w": 20,
      "h": 22
    }
  },
  "hintZone": "vapour",
  "hintAt": null,
  "cameraZone": "face",
  "helperPlacement": "top-right",
  "effectPoints": {
    "rim": {
      "x": 56.7,
      "y": 40.5
    },
    "nose": {
      "x": 54,
      "y": 39
    }
  },
  "successEffect": "waft-fan",
  "copy": {
    "ru": {
      "title": "Нюхать вещество прямо из пробирки",
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
      "stop": "Кхе-кхе! Так нюхать нельзя! 😵",
      "praise": "Вот так — ладонью к себе! 👋",
      "replay": "↺ Посмотреть ещё раз",
      "alts": [
        "Мадина подносит пробирку с раствором к лицу, над ней тонкий пар",
        "Мадина вдыхает пары прямо из пробирки",
        "Мадина кашляет и чувствует головокружение, вокруг лица облако пара",
        "Мадина держит пробирку на расстоянии и направляет воздух ладонью к себе"
      ],
      "heading": "Практическая работа 1.1 · Ситуация C из 4",
      "situation": "СИТУАЦИЯ C",
      "next": "Ситуация D →",
      "vapourLabel": "Пары вещества у лица",
      "previous": "← Ситуация B"
    },
    "uz-Latn": {
      "title": "Moddani to‘g‘ri probirkadan hidlash",
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
      "stop": "Yo‘tal! Bunday hidlash mumkin emas! 😵",
      "praise": "Mana shunday — kaft bilan havoni o‘zingga yo‘naltir! 👋",
      "replay": "↺ Yana ko‘rish",
      "alts": [
        "Madina probirkani yuziga yaqinlashtiryapti, undan ingichka bug‘ ko‘tarilmoqda",
        "Madina bug‘ni bevosita probirkadan nafasiga olyapti",
        "Madina yo‘talyapti va boshi aylanyapti, yuzi atrofida bug‘ buluti",
        "Madina probirkani uzoqda tutib, kafti bilan havoni o‘ziga yo‘naltiryapti"
      ],
      "heading": "1.1-amaliy ish · 4 vaziyatdan D vaziyat",
      "situation": "D VAZIYAT",
      "next": "E vaziyat →",
      "vapourLabel": "Yuz yonidagi modda bug‘i",
      "previous": "← B vaziyat"
    },
    "uz-Cyrl": {
      "title": "Моддани тўғри пробиркадан ҳидлаш",
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
      "stop": "Йўтал! Бундай ҳидлаш мумкин эмас! 😵",
      "praise": "Мана шундай — кафт билан ҳавони ўзингга йўналтир! 👋",
      "replay": "↺ Yana ko‘rish",
      "alts": [
        "Мадина пробиркани юзига яқинлаштиряпти, ундан ингичка буғ кўтарилмоқда",
        "Мадина буғни бевосита пробиркадан нафасига оляпти",
        "Мадина йўталяпти ва боши айланяпти, юзи атрофида буғ булути",
        "Мадина пробиркани узоқда тутиб, кафти билан ҳавони ўзига йўналтиряпти"
      ],
      "heading": "1.1-амалий иш · 4 вазиятдан D вазият",
      "situation": "D ВАЗИЯТ",
      "next": "E вазият →",
      "vapourLabel": "Юз ёнидаги модда буғи",
      "previous": "← B вазият"
    },
    "en": {
      "title": "Smelling directly from a test tube",
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
      "stop": "Cough, cough! Never smell like that! 😵",
      "praise": "That’s it — waft the air with your hand! 👋",
      "replay": "↺ Watch again",
      "alts": [
        "Madina brings a test tube near her face; thin vapour rises above it",
        "Madina inhales vapour directly from the test tube",
        "Madina coughs and feels dizzy, with vapour around her face",
        "Madina holds the tube away and wafts air with her hand"
      ],
      "heading": "Practical work 1.1 · Situation C of 4",
      "situation": "SITUATION C",
      "next": "Situation D →",
      "vapourLabel": "Chemical vapour near the face",
      "previous": "← Situation B"
    }
  },
  "dangerZone": {
    "x": 43,
    "y": 25,
    "w": 20,
    "h": 22
  },
  "focusZone": {
    "x": 42,
    "y": 20,
    "w": 21,
    "h": 46
  },
  "frogLines": {
    "ru": [
      "Мадине интересно, чем пахнет раствор… Смотри внимательно, что произойдёт…",
      "Она вдыхает пары прямо из пробирки!",
      "Мадина кашляет: у неё кружится голова. Останови опыт! Мадина вдохнула концентрированные пары прямо из пробирки. Она закашлялась, и у неё закружилась голова.",
      "Мадина вдохнула концентрированные пары прямо из пробирки. Она закашлялась, и у неё закружилась голова.",
      "Вот так — ладонью к себе! 👋"
    ],
    "uz-Latn": [
      "Madina eritmaning hidi qanday ekaniga qiziqdi… Nima bo‘lishini diqqat bilan kuzat…",
      "U bug‘ni bevosita probirkadan nafasiga olyapti!",
      "Madina yo‘talyapti, boshi aylanyapti. Tajribani to‘xtat! Madina to‘plangan bug‘ni bevosita probirkadan nafasiga oldi. U yo‘tala boshladi va boshi aylandi.",
      "Madina to‘plangan bug‘ni bevosita probirkadan nafasiga oldi. U yo‘tala boshladi va boshi aylandi.",
      "Mana shunday — kaft bilan havoni o‘zingga yo‘naltir! 👋"
    ],
    "uz-Cyrl": [
      "Мадина эритманинг ҳиди қандай эканига қизиқди… Nima bo‘lishini diqqat bilan kuzat…",
      "У буғни бевосита пробиркадан нафасига оляпти!",
      "Мадина йўталяпти, боши айланяпти. Тажрибани тўхтат! Мадина тўпланган буғни бевосита пробиркадан нафасига олди. У йўтала бошлади ва боши айланди.",
      "Мадина тўпланган буғни бевосита пробиркадан нафасига олди. У йўтала бошлади ва боши айланди.",
      "Мана шундай — кафт билан ҳавони ўзингга йўналтир! 👋"
    ],
    "en": [
      "Madina wonders what the solution smells like… Watch carefully to see what happens…",
      "She inhales vapour directly from the tube!",
      "Madina is coughing and feels dizzy. Stop the experiment! Madina inhaled concentrated vapour directly from the test tube. She started coughing and felt dizzy.",
      "Madina inhaled concentrated vapour directly from the test tube. She started coughing and felt dizzy.",
      "That’s it — waft the air with your hand! 👋"
    ]
  },
  "explanation": {
    "ru": [
      {
        "kind": "what",
        "title": "① Что случилось",
        "body": "Мадина вдохнула концентрированные пары прямо из пробирки. Она закашлялась, и у неё закружилась голова."
      },
      {
        "kind": "why",
        "title": "② Почему это опасно",
        "body": [
          "Некоторые пары ядовиты или едки, например у хлора, аммиака и уксусной кислоты.",
          "Они могут обжечь слизистую носа и горла.",
          "Возможны кашель, головокружение и тошнота."
        ]
      },
      {
        "kind": "good",
        "title": "④ ✅ Как надо",
        "body": [
          "Держать пробирку на расстоянии от лица.",
          "Осторожно направлять воздух ладонью к себе.",
          "С пахучими веществами работать в вытяжном шкафу.",
          "Определять запах только с разрешения учителя."
        ],
        "note": "Маска на рисунке не защищает от химических паров и не заменяет вытяжку."
      }
    ],
    "uz-Latn": [
      {
        "kind": "what",
        "title": "① Nima bo‘ldi",
        "body": "Madina to‘plangan bug‘ni bevosita probirkadan nafasiga oldi. U yo‘tala boshladi va boshi aylandi."
      },
      {
        "kind": "why",
        "title": "② Nega xavfli",
        "body": [
          "Ba’zi bug‘lar zaharli yoki o‘yuvchi bo‘ladi, masalan xlor, ammiak va sirka kislotasi bug‘lari.",
          "Ular burun va tomoq shilliq qavatini kuydirishi mumkin.",
          "Yo‘tal, bosh aylanishi va ko‘ngil aynishi yuz beradi."
        ]
      },
      {
        "kind": "good",
        "title": "④ ✅ To‘g‘ri yo‘l",
        "body": [
          "Probirkani yuzdan uzoqda tut.",
          "Kaft bilan havoni sekin o‘zingga yo‘naltir.",
          "Hidli moddalar bilan tortma shkafda ishlа.",
          "Hidni faqat o‘qituvchi ruxsati bilan aniqlа."
        ],
        "note": "Rasmdagi niqob kimyoviy bug‘lardan himoya qilmaydi va tortma shkaf o‘rnini bosmaydi."
      }
    ],
    "uz-Cyrl": [
      {
        "kind": "what",
        "title": "① Nima bo‘ldi",
        "body": "Мадина тўпланган буғни бевосита пробиркадан нафасига олди. У йўтала бошлади ва боши айланди."
      },
      {
        "kind": "why",
        "title": "② Nega xavfli",
        "body": [
          "Баъзи буғлар заҳарли ёки ўювчи бўлади, масалан хлор, аммиак ва сирка кислотаси буғлари.",
          "Улар бурун ва томоқ шиллиқ қаватини куйдириши мумкин.",
          "Йўтал, бош айланиши ва кўнгил айниши юз беради."
        ]
      },
      {
        "kind": "good",
        "title": "④ ✅ To‘g‘ri yo‘l",
        "body": [
          "Пробиркани юздан узоқда тут.",
          "Кафт билан ҳавони секин ўзингга йўналтир.",
          "Ҳидли моддалар билан тортма шкафда ишла.",
          "Ҳидни фақат ўқитувчи рухсати билан аниқла."
        ],
        "note": "Расмдаги ниқоб кимёвий буғлардан ҳимоя қилмайди ва тортма шкаф ўрнини босмайди."
      }
    ],
    "en": [
      {
        "kind": "what",
        "title": "① What happened",
        "body": "Madina inhaled concentrated vapour directly from the test tube. She started coughing and felt dizzy."
      },
      {
        "kind": "why",
        "title": "② Why it is dangerous",
        "body": [
          "Some vapours are toxic or corrosive, including chlorine, ammonia and acetic acid vapours.",
          "They can burn the lining of the nose and throat.",
          "They may cause coughing, dizziness and nausea."
        ]
      },
      {
        "kind": "good",
        "title": "④ ✅ Work safely",
        "body": [
          "Keep the tube away from the face.",
          "Gently waft air towards yourself with your hand.",
          "Use a fume hood when working with strong-smelling substances.",
          "Only check a smell with your teacher’s permission."
        ],
        "note": "The mask in the illustration does not protect against chemical vapours or replace a fume hood."
      }
    ]
  }
};
SafetySituations.decorate(SituationC);
