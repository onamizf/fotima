/* Autonomous scene: animation, safe frame and three explanation cards. */
const SituationD={
  "id": "danger-d",
  "previous": "danger-c",
  "effectFamily": "beaker-heating",
  "frames": [
    "assets/lab/1-1/d-1-start.webp",
    "assets/lab/1-1/d-2-boil.webp",
    "assets/lab/1-1/d-3-steam.webp",
    "assets/lab/1-1/d-4-safe.webp"
  ],
  "stages": [
    {
      "at": 0,
      "frame": 0,
      "zoom": 1.06,
      "effect": "beaker-bubbles"
    },
    {
      "at": 3,
      "frame": 1,
      "zoom": 1.3,
      "effect": "beaker-boiling"
    },
    {
      "at": 6,
      "frame": 2,
      "zoom": 1.3,
      "effect": "steam-burst",
      "points": {
        "face": {
          "x": 43,
          "y": 38
        }
      }
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
    "face": {
      "x": 37,
      "y": 25,
      "w": 14,
      "h": 24
    },
    "beaker": {
      "x": 55.5,
      "y": 38.5,
      "w": 8.8,
      "h": 18
    },
    "flame": {
      "x": 58.5,
      "y": 57,
      "w": 3,
      "h": 12
    },
    "hotspot": {
      "x": 37,
      "y": 25,
      "w": 24,
      "h": 24
    }
  },
  "hintZone": "hotspot",
  "hintAt": null,
  "cameraZone": "beaker",
  "helperPlacement": "top-right",
  "effectPoints": {
    "rim": {
      "x": 59.5,
      "y": 39
    },
    "liquid": {
      "x": 59.5,
      "y": 53
    },
    "face": {
      "x": 52,
      "y": 40
    },
    "flame": {
      "x": 60,
      "y": 62
    },
    "distanceFrom": {
      "x": 48,
      "y": 47
    },
    "distanceTo": {
      "x": 55.5,
      "y": 47
    }
  },
  "successEffect": "safe-distance",
  "copy": {
    "ru": {
      "title": "Лицо над кипящей жидкостью",
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
      "stop": "Горячо! Не наклоняйся над кипящим! 🥵",
      "praise": "Наблюдаем сбоку и на расстоянии! 👀",
      "replay": "↺ Посмотреть ещё раз",
      "alts": [
        "Азиз в очках наклонился лицом к стакану на треножнике над горелкой",
        "Вода бурно кипит, пар идёт к лицу Азиза, очки запотевают",
        "Азиз отшатнулся от пара и брызг, очки покрылись влагой",
        "Азиз стоит прямо в стороне от стакана и наблюдает сбоку"
      ],
      "heading": "Практическая работа 1.1 · Ситуация D из 4",
      "situation": "СИТУАЦИЯ D",
      "next": "Итоги →",
      "hotspotLabel": "Лицо слишком близко к кипящей воде",
      "summaryNav": "Итоги",
      "distanceLabel": "≈ 50 см",
      "summaryTitle": "Задание 1 пройдено!",
      "summaryFound": "Найдено ошибок: {n} из {total}",
      "summaryAccuracy": "Правильных ответов: {n}%",
      "summaryXP": "XP за ситуации",
      "summaryBadge": "Безопасность прежде всего",
      "summaryFrog": "Отлично! Теперь ты знаешь главные правила лаборатории 🧪",
      "summaryNext": "1.2 →",
      "summaryRetry": "Пройти ошибки ещё раз",
      "summaryReview": "Повторить ситуацию",
      "summaryRules": [
        "Волосы собраны",
        "Очки надеты, пробирка в держателе",
        "Запах — ладонью к себе",
        "Не наклоняйся над горячим"
      ],
      "summaryLegacy": "Для ранних прохождений учтены сохранённые верные ответы.",
      "taskOneComplete": "Задание 1 · Техника безопасности ✓",
      "summaryProgress": "Все четыре ситуации завершены",
      "previous": "← Ситуация C"
    },
    "uz-Latn": {
      "title": "Qaynayotgan suyuqlik ustiga egilish",
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
      "stop": "Issiq! Qaynayotgan idish ustiga egilma! 🥵",
      "praise": "Yon tomondan va uzoqroqdan kuzatamiz! 👀",
      "replay": "↺ Yana ko‘rish",
      "alts": [
        "Aziz ko‘zoynakda, lekin gorelka ustidagi uchoyoqda turgan stakanga egilgan",
        "Suv kuchli qaynayapti, bug‘ Azizning yuziga tegib, ko‘zoynagi terlayapti",
        "Aziz bug‘ va tomchilardan orqaga tisarildi, ko‘zoynagi namlangan",
        "Aziz stakandan uzoqroqda tik turib, yon tomondan kuzatyapti"
      ],
      "heading": "1.1-amaliy ish · 4 vaziyatdan E vaziyat",
      "situation": "E VAZIYAT",
      "next": "Yakunlar →",
      "hotspotLabel": "Yuz qaynayotgan suvga juda yaqin",
      "summaryNav": "Yakunlar",
      "distanceLabel": "≈ 50 sm",
      "summaryTitle": "1-topshiriq bajarildi!",
      "summaryFound": "Topilgan xavflar: {n} / {total}",
      "summaryAccuracy": "To‘g‘ri javoblar: {n}%",
      "summaryXP": "Vaziyatlar uchun XP",
      "summaryBadge": "Avvalo xavfsizlik",
      "summaryFrog": "Ajoyib! Endi laboratoriyaning asosiy xavfsizlik qoidalarini bilasan 🧪",
      "summaryNext": "1.2 →",
      "summaryRetry": "Xatoli vaziyatlarni qayta o‘tish",
      "summaryReview": "Vaziyatni takrorlash",
      "summaryRules": [
        "Soch yig‘ilgan",
        "Ko‘zoynak taqilgan, probirka tutqichda",
        "Havoni kaft bilan yo‘naltir",
        "Issiq idish ustiga egilma"
      ],
      "summaryLegacy": "Avvalgi bajarishlar uchun saqlangan to‘g‘ri javoblar hisobga olindi.",
      "taskOneComplete": "1-topshiriq · Xavfsizlik texnikasi ✓",
      "summaryProgress": "To‘rtta vaziyat bajarildi",
      "previous": "← D vaziyat"
    },
    "uz-Cyrl": {
      "title": "Қайнаётган суюқлик устига эгилиш",
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
      "stop": "Иссиқ! Қайнаётган идиш устига эгилма! 🥵",
      "praise": "Ён томондан ва узоқроқдан кузатамиз! 👀",
      "replay": "↺ Yana ko‘rish",
      "alts": [
        "Азиз кўзойнакда, лекин горелка устидаги учоёқда турган стаканга эгилган",
        "Сув кучли қайнаяпти, буғ Азизнинг юзига тегиб, кўзойнаги терлаяпти",
        "Азиз буғ ва томчилардан орқага тисарилди, кўзойнаги намланган",
        "Азиз стакандан узоқроқда тик туриб, ён томондан кузатяпти"
      ],
      "heading": "1.1-амалий иш · 4 вазиятдан E вазият",
      "situation": "E ВАЗИЯТ",
      "next": "Якунлар →",
      "hotspotLabel": "Юз қайнаётган сувга жуда яқин",
      "summaryNav": "Якунлар",
      "distanceLabel": "≈ 50 см",
      "summaryTitle": "1-топшириқ бажарилди!",
      "summaryFound": "Топилган хавфлар: {n} / {total}",
      "summaryAccuracy": "Тўғри жавоблар: {n}%",
      "summaryXP": "Вазиятлар учун XP",
      "summaryBadge": "Аввало хавфсизлик",
      "summaryFrog": "Ажойиб! Энди лабораториянинг асосий хавфсизлик қоидаларини биласан 🧪",
      "summaryNext": "1.2 →",
      "summaryRetry": "Хатоли вазиятларни қайта ўтиш",
      "summaryReview": "Вазиятни такрорлаш",
      "summaryRules": [
        "Соч йиғилган",
        "Кўзойнак тақилган, пробирка тутқичда",
        "Ҳавони кафт билан йўналтир",
        "Иссиқ идиш устига эгилма"
      ],
      "summaryLegacy": "Аввалги бажаришлар учун сақланган тўғри жавоблар ҳисобга олинди.",
      "taskOneComplete": "1-топшириқ · Хавфсизлик техникаси ✓",
      "summaryProgress": "Тўртта вазият бажарилди",
      "previous": "← D вазият"
    },
    "en": {
      "title": "Leaning over boiling liquid",
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
      "stop": "Hot! Never lean over boiling liquid! 🥵",
      "praise": "Watch from the side and keep your distance! 👀",
      "replay": "↺ Watch again",
      "alts": [
        "Aziz wears goggles but leans towards a beaker on a tripod above a burner",
        "Water boils vigorously; steam reaches Aziz’s face and fogs his goggles",
        "Aziz recoils from steam and splashes, his goggles covered in moisture",
        "Aziz stands upright away from the beaker and watches from the side"
      ],
      "heading": "Practical work 1.1 · Situation D of 4",
      "situation": "SITUATION D",
      "next": "Results →",
      "hotspotLabel": "Face too close to boiling water",
      "summaryNav": "Results",
      "distanceLabel": "≈ 50 cm",
      "summaryTitle": "Task 1 completed!",
      "summaryFound": "Hazards found: {n} of {total}",
      "summaryAccuracy": "Correct answers: {n}%",
      "summaryXP": "XP for the situations",
      "summaryBadge": "Safety comes first",
      "summaryFrog": "Great! Now you know the main laboratory safety rules 🧪",
      "summaryNext": "1.2 →",
      "summaryRetry": "Retry situations with mistakes",
      "summaryReview": "Replay situation",
      "summaryRules": [
        "Hair secured",
        "Goggles on, tube in a holder",
        "Waft air with your hand",
        "Never lean over hot glassware"
      ],
      "summaryLegacy": "Earlier completions use the saved correct answers.",
      "taskOneComplete": "Task 1 · Laboratory safety ✓",
      "summaryProgress": "All four situations completed",
      "previous": "← Situation C"
    }
  },
  "dangerZone": {
    "x": 37,
    "y": 25,
    "w": 27,
    "h": 33
  },
  "focusZone": {
    "x": 37,
    "y": 22,
    "w": 28,
    "h": 48
  },
  "frogLines": {
    "ru": [
      "Азиз хочет рассмотреть пузырьки поближе… Смотри внимательно, что произойдёт…",
      "Вода закипает, пар идёт прямо в лицо!",
      "Горячий пар и брызги! Отойди от стакана! Азиз наклонился слишком близко к стакану. Горячий пар и брызги попали ему в лицо, а очки запотели.",
      "Азиз наклонился слишком близко к стакану. Горячий пар и брызги попали ему в лицо, а очки запотели.",
      "Наблюдаем сбоку и на расстоянии! 👀"
    ],
    "uz-Latn": [
      "Aziz pufakchalarni yaqinroqdan ko‘rmoqchi… Nima bo‘lishini diqqat bilan kuzat…",
      "Suv qaynadi, bug‘ to‘g‘ri yuzga kelyapti!",
      "Issiq bug‘ va tomchilar! Stakandan uzoqlash! Aziz stakanga juda yaqin egildi. Issiq bug‘ va tomchilar uning yuziga tegdi, ko‘zoynagi terlab qoldi.",
      "Aziz stakanga juda yaqin egildi. Issiq bug‘ va tomchilar uning yuziga tegdi, ko‘zoynagi terlab qoldi.",
      "Yon tomondan va uzoqroqdan kuzatamiz! 👀"
    ],
    "uz-Cyrl": [
      "Азиз пуфакчаларни яқинроқдан кўрмоқчи… Nima bo‘lishini diqqat bilan kuzat…",
      "Сув қайнади, буғ тўғри юзга келяпти!",
      "Иссиқ буғ ва томчилар! Стакандан узоқлаш! Азиз стаканга жуда яқин эгилди. Иссиқ буғ ва томчилар унинг юзига тегди, кўзойнаги терлаб қолди.",
      "Азиз стаканга жуда яқин эгилди. Иссиқ буғ ва томчилар унинг юзига тегди, кўзойнаги терлаб қолди.",
      "Ён томондан ва узоқроқдан кузатамиз! 👀"
    ],
    "en": [
      "Aziz wants a closer look at the bubbles… Watch carefully to see what happens…",
      "The water boils and steam goes straight towards his face!",
      "Hot steam and splashes! Move away from the beaker! Aziz leaned too close to the beaker. Hot steam and splashes reached his face, and his goggles fogged up.",
      "Aziz leaned too close to the beaker. Hot steam and splashes reached his face, and his goggles fogged up.",
      "Watch from the side and keep your distance! 👀"
    ]
  },
  "explanation": {
    "ru": [
      {
        "kind": "what",
        "title": "① Что случилось",
        "body": "Азиз наклонился слишком близко к стакану. Горячий пар и брызги попали ему в лицо, а очки запотели."
      },
      {
        "kind": "why",
        "title": "② Почему это опасно",
        "body": [
          "У открытого стакана пар обычно около 100 °C. Конденсируясь на коже, он отдаёт много тепла и может сильно обжечь.",
          "При бурном кипении горячая вода может выплеснуться.",
          "Запотевшие очки мешают видеть: можно задеть горелку или горячую посуду."
        ]
      },
      {
        "kind": "good",
        "title": "④ ✅ Как надо",
        "body": [
          "Стоять прямо и держать безопасное расстояние.",
          "Наблюдать сбоку, а не сверху.",
          "Дождаться остывания посуды; перемещать её только подходящим держателем или прихваткой по указанию учителя."
        ],
        "note": "Учебная схема: безопасное расстояние уточняй у учителя."
      }
    ],
    "uz-Latn": [
      {
        "kind": "what",
        "title": "① Nima bo‘ldi",
        "body": "Aziz stakanga juda yaqin egildi. Issiq bug‘ va tomchilar uning yuziga tegdi, ko‘zoynagi terlab qoldi."
      },
      {
        "kind": "why",
        "title": "② Nega xavfli",
        "body": [
          "Ochiq stakan ustida bug‘ odatda 100 °C atrofida bo‘ladi. Terida kondensatsiyalanib, ko‘p issiqlik ajratadi va kuchli kuydirishi mumkin.",
          "Kuchli qaynaganda issiq suv sachrashi mumkin.",
          "Terlagan ko‘zoynak ko‘rishga xalaqit beradi: gorelka yoki issiq idishni turtib yuborish mumkin."
        ]
      },
      {
        "kind": "good",
        "title": "④ ✅ To‘g‘ri yo‘l",
        "body": [
          "Tik tur va xavfsiz masofani saqla.",
          "Tepadan emas, yon tomondan kuzat.",
          "Idish sovishini kut; uni faqat o‘qituvchi ko‘rsatmasi bilan mos tutqich yoki issiqqa chidamli ushlagichda ko‘chir."
        ],
        "note": "O‘quv chizmasi: xavfsiz masofani o‘qituvchidan so‘ra."
      }
    ],
    "uz-Cyrl": [
      {
        "kind": "what",
        "title": "① Nima bo‘ldi",
        "body": "Азиз стаканга жуда яқин эгилди. Иссиқ буғ ва томчилар унинг юзига тегди, кўзойнаги терлаб қолди."
      },
      {
        "kind": "why",
        "title": "② Nega xavfli",
        "body": [
          "Очиқ стакан устида буғ одатда 100 °C атрофида бўлади. Терида конденсацияланиб, кўп иссиқлик ажратади ва кучли куйдириши мумкин.",
          "Кучли қайнаганда иссиқ сув сачраши мумкин.",
          "Терлаган кўзойнак кўришга халақит беради: горелка ёки иссиқ идишни туртиб юбориш мумкин."
        ]
      },
      {
        "kind": "good",
        "title": "④ ✅ To‘g‘ri yo‘l",
        "body": [
          "Тик тур ва хавфсиз масофани сақла.",
          "Тепадан эмас, ён томондан кузат.",
          "Идиш совишини кут; уни фақат ўқитувчи кўрсатмаси билан мос тутқич ёки иссиққа чидамли ушлагичда кўчир."
        ],
        "note": "Ўқув чизмаси: хавфсиз масофани ўқитувчидан сўра."
      }
    ],
    "en": [
      {
        "kind": "what",
        "title": "① What happened",
        "body": "Aziz leaned too close to the beaker. Hot steam and splashes reached his face, and his goggles fogged up."
      },
      {
        "kind": "why",
        "title": "② Why it is dangerous",
        "body": [
          "Above an open beaker, steam is usually around 100 °C. When it condenses on skin it releases a lot of heat and can cause serious burns.",
          "Vigorous boiling can make hot water splash out.",
          "Fogged goggles make it hard to see: you could knock the burner or hot glassware."
        ]
      },
      {
        "kind": "good",
        "title": "④ ✅ Work safely",
        "body": [
          "Stand upright at a safe distance.",
          "Observe from the side, not from above.",
          "Let glassware cool; move it only with a suitable holder or heatproof grip as your teacher directs."
        ],
        "note": "Learning diagram: ask your teacher about a safe working distance."
      }
    ]
  }
};
SafetySituations.decorate(SituationD);
