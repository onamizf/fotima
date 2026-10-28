/* Scene presentation data; learning rules and canonical IDs remain unchanged. */
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
      "effect": "question"
    },
    {
      "at": 12,
      "frame": 3,
      "zoom": 1,
      "effect": "confetti",
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
  "hotspots": [
    {
      "id": "vapour",
      "zone": "vapour",
      "label": "vapourLabel"
    }
  ],
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
  "questions": {
    "type": "order",
    "risk": {
      "correct": [
        0
      ]
    },
    "order": {
      "correct": [
        0,
        1,
        2,
        3
      ]
    },
    "actions": {
      "correct": [
        0,
        1
      ]
    },
    "presentation": "frog-bubble"
  },
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
      "skip": "Пропустить анимацию",
      "sound": "Звук",
      "timeline": "Этапы сцены",
      "danger": "⚠ ОПАСНО",
      "safe": "✔ ПРАВИЛЬНО",
      "stop": "Кхе-кхе! Так нюхать нельзя! 😵",
      "praise": "Вот так — ладонью к себе! 👋",
      "hint": "Посмотри, как близко пары оказались к носу Мадины…",
      "hotspot": "Опасная зона: волосы и первый стакан",
      "q1": "Нажми на сцене, что здесь опасно",
      "q2": "Чем это опасно?",
      "q3": "Как правильно определить запах?",
      "check": "Проверить",
      "correct": "✓ Верно!",
      "wrong": "Не совсем. Прочитай объяснение и попробуй ещё раз.",
      "multiHint": "Отметь все запрещённые действия.",
      "replay": "↺ Посмотреть ещё раз",
      "reward": "+20 XP",
      "alts": [
        "Мадина подносит пробирку с раствором к лицу, над ней тонкий пар",
        "Мадина вдыхает пары прямо из пробирки",
        "Мадина кашляет и чувствует головокружение, вокруг лица облако пара",
        "Мадина держит пробирку на расстоянии и направляет воздух ладонью к себе"
      ],
      "risks": [
        "Пары некоторых веществ ядовиты: они обжигают нос и горло, вызывают кашель и головокружение",
        "Раствор может пролиться на пол",
        "Очки запотеют"
      ],
      "riskFeedback": [
        "Концентрированные пары могут повредить дыхательные пути.",
        "Пролив тоже опасен, но здесь Мадина вдыхает пары.",
        "Запотевшие очки не объясняют кашель и головокружение от паров."
      ],
      "actions": [
        "Пробовать вещества на вкус",
        "Нюхать прямо из пробирки или колбы",
        "Работать в вытяжном шкафу с пахучими веществами"
      ],
      "actionFeedback": [
        "Пробовать лабораторные вещества нельзя.",
        "Прямой вдох концентрированных паров опасен.",
        "Вытяжной шкаф нужен для такой работы. Это безопасная мера, а не запрет."
      ],
      "heading": "Практическая работа 1.1 · Ситуация C из 4",
      "situation": "СИТУАЦИЯ C",
      "next": "Ситуация D →",
      "vapourLabel": "Пары вещества у лица",
      "inspect": "Найди опасность рядом с лицом Мадины.",
      "orderHelp": "Расставь шаги по порядку. Проверять запах можно только с разрешения учителя.",
      "orderWrong": "Порядок пока неверный. Сначала отодвинь пробирку и направь отверстие от себя.",
      "moveUp": "Выше",
      "moveDown": "Ниже",
      "moveStep": "Переместить шаг",
      "neverQuestion": "Что из этого нельзя никогда?",
      "orderSteps": [
        "Держать пробирку на расстоянии от лица",
        "Направить отверстие от себя",
        "Ладонью сделать несколько движений над пробиркой к себе",
        "Осторожно вдохнуть воздух, а не пары из пробирки"
      ],
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
      "skip": "Animatsiyani o‘tkazib yuborish",
      "sound": "Ovoz",
      "timeline": "Sahna bosqichlari",
      "danger": "⚠ XAVFLI",
      "safe": "✔ TO‘G‘RI",
      "stop": "Yo‘tal! Bunday hidlash mumkin emas! 😵",
      "praise": "Mana shunday — kaft bilan havoni o‘zingga yo‘naltir! 👋",
      "hint": "Bug‘ Madinaning burniga qanchalik yaqin kelganiga qara…",
      "hotspot": "Xavfli joy: soch va birinchi stakan",
      "q1": "Sahnada nima xavfli ekanini tanla",
      "q2": "Bu nimasi bilan xavfli?",
      "q3": "Hidni qanday to‘g‘ri aniqlash kerak?",
      "check": "Tekshirish",
      "correct": "✓ To‘g‘ri!",
      "wrong": "Hali to‘g‘ri emas. Izohni o‘qib, qayta urin.",
      "multiHint": "Barcha taqiqlangan harakatlarni belgilа.",
      "replay": "↺ Yana ko‘rish",
      "reward": "+20 XP",
      "alts": [
        "Madina probirkani yuziga yaqinlashtiryapti, undan ingichka bug‘ ko‘tarilmoqda",
        "Madina bug‘ni bevosita probirkadan nafasiga olyapti",
        "Madina yo‘talyapti va boshi aylanyapti, yuzi atrofida bug‘ buluti",
        "Madina probirkani uzoqda tutib, kafti bilan havoni o‘ziga yo‘naltiryapti"
      ],
      "risks": [
        "Ba’zi moddalarning bug‘i zaharli: burun va tomoqni kuydiradi, yo‘tal va bosh aylanishiga sabab bo‘ladi",
        "Eritma polga to‘kilishi mumkin",
        "Ko‘zoynak terlaydi"
      ],
      "riskFeedback": [
        "To‘plangan bug‘ nafas yo‘llariga zarar yetkazishi mumkin.",
        "To‘kilish ham xavfli, ammo bu yerda Madina bug‘ni nafasiga olyapti.",
        "Ko‘zoynak terlashidan bug‘ sababli yo‘tal va bosh aylanishi kelib chiqmaydi."
      ],
      "actions": [
        "Moddalarni tatib ko‘rish",
        "Bevosita probirka yoki kolbadan hidlash",
        "Hidli moddalar bilan tortma shkafda ishlash"
      ],
      "actionFeedback": [
        "Laboratoriya moddalarini tatib ko‘rish mumkin emas.",
        "To‘plangan bug‘ni to‘g‘ridan-to‘g‘ri nafasga olish xavfli.",
        "Tortma shkaf himoya vositasi. Unda ishlash taqiqlanmaydi."
      ],
      "heading": "1.1-amaliy ish · 4 vaziyatdan D vaziyat",
      "situation": "D VAZIYAT",
      "next": "E vaziyat →",
      "vapourLabel": "Yuz yonidagi modda bug‘i",
      "inspect": "Madinaning yuzi yonidagi xavfni top.",
      "orderHelp": "Qadamlarni tartibga qo‘y. Hidni faqat o‘qituvchi ruxsati bilan tekshirish mumkin.",
      "orderWrong": "Tartib hali to‘g‘ri emas. Avval probirkani uzoqlashtir va og‘zini o‘zingdan nariga qarat.",
      "moveUp": "Yuqoriga",
      "moveDown": "Pastga",
      "moveStep": "Qadamni ko‘chirish",
      "neverQuestion": "Qaysi harakatlar mutlaqo taqiqlangan?",
      "orderSteps": [
        "Probirkani yuzdan uzoqda tutish",
        "Og‘zini o‘zidan nariga qaratish",
        "Probirka ustida kaft bilan o‘ziga tomon bir necha marta yelpish",
        "Ehtiyotkorlik bilan havoni nafasga olish, probirkadagi bug‘ni emas"
      ],
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
      "skip": "Animatsiyani o‘tkazib yuborish",
      "sound": "Ovoz",
      "timeline": "Sahna bosqichlari",
      "danger": "⚠ XAVFLI",
      "safe": "✔ TO‘G‘RI",
      "stop": "Йўтал! Бундай ҳидлаш мумкин эмас! 😵",
      "praise": "Мана шундай — кафт билан ҳавони ўзингга йўналтир! 👋",
      "hint": "Буғ Мадинанинг бурнига қанчалик яқин келганига қара…",
      "hotspot": "Xavfli joy: soch va birinchi stakan",
      "q1": "Саҳнада нима хавфли эканини танла",
      "q2": "Бу нимаси билан хавфли?",
      "q3": "Ҳидни қандай тўғри аниқлаш керак?",
      "check": "Tekshirish",
      "correct": "✓ To‘g‘ri!",
      "wrong": "Hali to‘g‘ri emas. Izohni o‘qib, qayta urin.",
      "multiHint": "Барча тақиқланган ҳаракатларни белгила.",
      "replay": "↺ Yana ko‘rish",
      "reward": "+20 XP",
      "alts": [
        "Мадина пробиркани юзига яқинлаштиряпти, ундан ингичка буғ кўтарилмоқда",
        "Мадина буғни бевосита пробиркадан нафасига оляпти",
        "Мадина йўталяпти ва боши айланяпти, юзи атрофида буғ булути",
        "Мадина пробиркани узоқда тутиб, кафти билан ҳавони ўзига йўналтиряпти"
      ],
      "risks": [
        "Баъзи моддаларнинг буғи заҳарли: бурун ва томоқни куйдиради, йўтал ва бош айланишига сабаб бўлади",
        "Эритма полга тўкилиши мумкин",
        "Кўзойнак терлайди"
      ],
      "riskFeedback": [
        "Тўпланган буғ нафас йўлларига зарар етказиши мумкин.",
        "Тўкилиш ҳам хавфли, аммо бу ерда Мадина буғни нафасига оляпти.",
        "Кўзойнак терлашидан буғ сабабли йўтал ва бош айланиши келиб чиқмайди."
      ],
      "actions": [
        "Моддаларни татиб кўриш",
        "Бевосита пробирка ёки колбадан ҳидлаш",
        "Ҳидли моддалар билан тортма шкафда ишлаш"
      ],
      "actionFeedback": [
        "Лаборатория моддаларини татиб кўриш мумкин эмас.",
        "Тўпланган буғни тўғридан-тўғри нафасга олиш хавфли.",
        "Тортма шкаф ҳимоя воситаси. Унда ишлаш тақиқланмайди."
      ],
      "heading": "1.1-амалий иш · 4 вазиятдан D вазият",
      "situation": "D ВАЗИЯТ",
      "next": "E вазият →",
      "vapourLabel": "Юз ёнидаги модда буғи",
      "inspect": "Мадинанинг юзи ёнидаги хавфни топ.",
      "orderHelp": "Қадамларни тартибга қўй. Ҳидни фақат ўқитувчи рухсати билан текшириш мумкин.",
      "orderWrong": "Тартиб ҳали тўғри эмас. Аввал пробиркани узоқлаштир ва оғзини ўзингдан нарига қарат.",
      "moveUp": "Юқорига",
      "moveDown": "Пастга",
      "moveStep": "Қадамни кўчириш",
      "neverQuestion": "Қайси ҳаракатлар мутлақо тақиқланган?",
      "orderSteps": [
        "Пробиркани юздан узоқда тутиш",
        "Оғзини ўзидан нарига қаратиш",
        "Пробирка устида кафт билан ўзига томон бир неча марта елпиш",
        "Эҳтиёткорлик билан ҳавони нафасга олиш, пробиркадаги буғни эмас"
      ],
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
      "skip": "Skip animation",
      "sound": "Sound",
      "timeline": "Scene stages",
      "danger": "⚠ DANGER",
      "safe": "✔ SAFE",
      "stop": "Cough, cough! Never smell like that! 😵",
      "praise": "That’s it — waft the air with your hand! 👋",
      "hint": "Look at how close the vapour is to Madina’s nose…",
      "hotspot": "Danger zone: hair and first beaker",
      "q1": "Select what is dangerous in the scene",
      "q2": "Why is this dangerous?",
      "q3": "How should a smell be checked?",
      "check": "Check",
      "correct": "✓ Correct!",
      "wrong": "Not quite. Read the explanation and try again.",
      "multiHint": "Select all prohibited actions.",
      "replay": "↺ Watch again",
      "reward": "+20 XP",
      "alts": [
        "Madina brings a test tube near her face; thin vapour rises above it",
        "Madina inhales vapour directly from the test tube",
        "Madina coughs and feels dizzy, with vapour around her face",
        "Madina holds the tube away and wafts air with her hand"
      ],
      "risks": [
        "Some vapours are toxic: they can burn the nose and throat and cause coughing and dizziness",
        "The solution may spill on the floor",
        "The goggles may fog up"
      ],
      "riskFeedback": [
        "Concentrated vapours can injure the airways.",
        "Spills are also hazardous, but Madina is inhaling vapour here.",
        "Foggy goggles do not explain coughing and dizziness from vapour."
      ],
      "actions": [
        "Taste substances",
        "Smell directly from a test tube or flask",
        "Work in a fume hood with strong-smelling substances"
      ],
      "actionFeedback": [
        "Laboratory substances must never be tasted.",
        "Direct inhalation of concentrated vapour is dangerous.",
        "A fume hood is a protective measure, not a prohibited action."
      ],
      "heading": "Practical work 1.1 · Situation C of 4",
      "situation": "SITUATION C",
      "next": "Situation D →",
      "vapourLabel": "Chemical vapour near the face",
      "inspect": "Find the danger near Madina’s face.",
      "orderHelp": "Put the steps in order. Only check a smell if your teacher permits it.",
      "orderWrong": "The order is not correct yet. Move the tube away and point its opening away first.",
      "moveUp": "Move up",
      "moveDown": "Move down",
      "moveStep": "Move step",
      "neverQuestion": "Which actions are never allowed?",
      "orderSteps": [
        "Hold the test tube away from the face",
        "Point its opening away from yourself",
        "Gently wave your hand over the tube towards yourself",
        "Carefully breathe in the air, not vapour directly from the tube"
      ],
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
      "Нажми на сцене, что здесь опасно",
      "Вот так — ладонью к себе! 👋"
    ],
    "uz-Latn": [
      "Madina eritmaning hidi qanday ekaniga qiziqdi… Nima bo‘lishini diqqat bilan kuzat…",
      "U bug‘ni bevosita probirkadan nafasiga olyapti!",
      "Madina yo‘talyapti, boshi aylanyapti. Tajribani to‘xtat! Madina to‘plangan bug‘ni bevosita probirkadan nafasiga oldi. U yo‘tala boshladi va boshi aylandi.",
      "Sahnada nima xavfli ekanini tanla",
      "Mana shunday — kaft bilan havoni o‘zingga yo‘naltir! 👋"
    ],
    "uz-Cyrl": [
      "Мадина эритманинг ҳиди қандай эканига қизиқди… Nima bo‘lishini diqqat bilan kuzat…",
      "У буғни бевосита пробиркадан нафасига оляпти!",
      "Мадина йўталяпти, боши айланяпти. Тажрибани тўхтат! Мадина тўпланган буғни бевосита пробиркадан нафасига олди. У йўтала бошлади ва боши айланди.",
      "Саҳнада нима хавфли эканини танла",
      "Мана шундай — кафт билан ҳавони ўзингга йўналтир! 👋"
    ],
    "en": [
      "Madina wonders what the solution smells like… Watch carefully to see what happens…",
      "She inhales vapour directly from the tube!",
      "Madina is coughing and feels dizzy. Stop the experiment! Madina inhaled concentrated vapour directly from the test tube. She started coughing and felt dizzy.",
      "Select what is dangerous in the scene",
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
        "kind": "bad",
        "title": "③ ❌ Так делать нельзя",
        "body": [
          "Нюхать прямо из пробирки или колбы.",
          "Наклоняться над посудой с веществом.",
          "Пробовать вещества на вкус."
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
      },
      {
        "kind": "help",
        "title": "⑤ Если стало плохо",
        "body": "Сразу прекрати опыт, отойди на свежий воздух и скажи учителю. Если трудно дышать или самочувствие не улучшается, нужна медицинская помощь."
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
        "kind": "bad",
        "title": "③ ❌ Bunday qilma",
        "body": [
          "Bevosita probirka yoki kolbadan hidlash.",
          "Modda solingan idish ustiga egilish.",
          "Laboratoriya moddalarini tatib ko‘rish."
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
      },
      {
        "kind": "help",
        "title": "⑤ O‘zingni yomon his qilsang",
        "body": "Tajribani darhol to‘xtat, toza havoga chiq va o‘qituvchiga ayt. Nafas olish qiyinlashsa yoki ahvol yaxshilanmasa, tibbiy yordam kerak."
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
        "kind": "bad",
        "title": "③ ❌ Bunday qilma",
        "body": [
          "Бевосита пробирка ёки колбадан ҳидлаш.",
          "Модда солинган идиш устига эгилиш.",
          "Лаборатория моддаларини татиб кўриш."
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
      },
      {
        "kind": "help",
        "title": "⑤ Ўзингни ёмон ҳис қилсанг",
        "body": "Тажрибани дарҳол тўхтат, тоза ҳавога чиқ ва ўқитувчига айт. Нафас олиш қийинлашса ёки аҳвол яхшиланмаса, тиббий ёрдам керак."
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
        "kind": "bad",
        "title": "③ ❌ Never do this",
        "body": [
          "Smell directly from a test tube or flask.",
          "Lean over a container holding a substance.",
          "Taste laboratory substances."
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
      },
      {
        "kind": "help",
        "title": "⑤ If you feel unwell",
        "body": "Stop the experiment, move to fresh air and tell your teacher immediately. Seek medical help for breathing difficulty or symptoms that do not improve."
      }
    ]
  }
};
SafetySituations.decorate(SituationC);
{const title=Object.fromEntries(Object.entries(SituationC.copy).map(([lang,c])=>[lang,c.title]));IntroData.tasks.find(t=>t.id===SituationC.id).title=title;IntroData.dangers.find(d=>d.id===SituationC.id).title=title;CourseData.topics.find(t=>t.id==='intro').steps.experiments.find(e=>e.key===SituationC.id).title=title;}
