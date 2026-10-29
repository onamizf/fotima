/* Autonomous scene: animation, safe frame and three explanation cards. */
const SituationA={
  "id": "danger-a",
  "frames": [
    "assets/lab/1-1/a-1-start.webp",
    "assets/lab/1-1/a-2-braid.webp",
    "assets/lab/1-1/a-3-reaction.webp",
    "assets/lab/1-1/a-4-safe.webp"
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
      "zoom": 1.35,
      "effect": "splash"
    },
    {
      "at": 5.5,
      "frame": 2,
      "zoom": 1.35,
      "effect": "steam"
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
    "braid": {
      "x": 40,
      "y": 39,
      "w": 4,
      "h": 20
    },
    "beaker": {
      "x": 38.5,
      "y": 58,
      "w": 5.5,
      "h": 14
    },
    "hotspot": {
      "x": 38.5,
      "y": 39,
      "w": 5.5,
      "h": 33
    }
  },
  "copy": {
    "ru": {
      "title": "Распущенные волосы в лаборатории",
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
      "stop": "Стоп! Что-то пошло не так 😱",
      "praise": "Вот теперь безопасно! 👍",
      "replay": "↺ Посмотреть ещё раз",
      "alts": [
        "Лейла с распущенными косами начинает опыт",
        "Левая коса Лейлы попала в первый стакан",
        "В первом стакане пена и пар, Лейла испугана",
        "Волосы Лейлы собраны в пучок, она работает в очках"
      ],
      "heading": "Практическая работа 1.1 · Ситуация A из 4",
      "situation": "СИТУАЦИЯ A",
      "next": "Ситуация B →"
    },
    "uz-Latn": {
      "title": "Laboratoriyada yig‘ilmagan soch",
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
      "stop": "To‘xta! Nimadir noto‘g‘ri ketdi 😱",
      "praise": "Endi xavfsiz! 👍",
      "replay": "↺ Yana ko‘rish",
      "alts": [
        "Laylo yig‘ilmagan o‘rimlar bilan tajriba boshlayapti",
        "Layloning chap o‘rimi birinchi stakanga tushdi",
        "Birinchi stakandagi ko‘pik va bug‘ Layloni qo‘rqitdi",
        "Layloning sochi yig‘ilgan, ko‘zida himoya ko‘zoynagi"
      ],
      "heading": "1.1-amaliy ish · 4 vaziyatdan A vaziyat",
      "situation": "A VAZIYAT",
      "next": "B vaziyat →"
    },
    "uz-Cyrl": {
      "title": "Laboratoriyada yig‘ilmagan soch",
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
      "stop": "To‘xta! Nimadir noto‘g‘ri ketdi 😱",
      "praise": "Endi xavfsiz! 👍",
      "replay": "↺ Yana ko‘rish",
      "alts": [
        "Laylo yig‘ilmagan o‘rimlar bilan tajriba boshlayapti",
        "Layloning chap o‘rimi birinchi stakanga tushdi",
        "Birinchi stakandagi ko‘pik va bug‘ Layloni qo‘rqitdi",
        "Layloning sochi yig‘ilgan, ko‘zida himoya ko‘zoynagi"
      ],
      "heading": "1.1-амалий иш · 4 вазиятдан A вазият",
      "situation": "A ВАЗИЯТ",
      "next": "B вазият →"
    },
    "en": {
      "title": "Loose hair in the laboratory",
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
      "stop": "Stop! Something went wrong 😱",
      "praise": "Now it is safe! 👍",
      "replay": "↺ Watch again",
      "alts": [
        "Leila begins an experiment with loose braids",
        "Leila’s left braid falls into the first beaker",
        "Foam and vapour in the first beaker surprise Leila",
        "Leila wears goggles with her hair secured in a bun"
      ],
      "heading": "Practical work 1.1 · Situation A of 4",
      "situation": "SITUATION A",
      "next": "Situation B →"
    }
  },
  "dangerZone": {
    "x": 38.5,
    "y": 39,
    "w": 7,
    "h": 33
  },
  "focusZone": {
    "x": 37,
    "y": 20,
    "w": 21,
    "h": 55
  },
  "frogLines": {
    "ru": [
      "Лейла начинает опыт… но косы у неё распущены Смотри внимательно, что произойдёт…",
      "Коса опустилась прямо в стакан!",
      "В стакане появились пена и пар. Останови опыт! Распущенная коса попала в стакан с веществом. Оно осталось на волосах и могло попасть на кожу.",
      "Распущенная коса попала в стакан с веществом. Оно осталось на волосах и могло попасть на кожу.",
      "Вот теперь безопасно! 👍"
    ],
    "uz-Latn": [
      "Laylo tajriba boshlayapti… ammo sochi yig‘ilmagan Nima bo‘lishini diqqat bilan kuzat…",
      "O‘rim to‘g‘ri stakanga tushdi!",
      "Stakanda ko‘pik va bug‘ paydo bo‘ldi. To‘xta! Yig‘ilmagan o‘rim stakandagi moddaga tushdi. Modda sochda qolib, teriga tegishi mumkin.",
      "Yig‘ilmagan o‘rim stakandagi moddaga tushdi. Modda sochda qolib, teriga tegishi mumkin.",
      "Endi xavfsiz! 👍"
    ],
    "uz-Cyrl": [
      "Laylo tajriba boshlayapti… ammo sochi yig‘ilmagan Nima bo‘lishini diqqat bilan kuzat…",
      "O‘rim to‘g‘ri stakanga tushdi!",
      "Stakanda ko‘pik va bug‘ paydo bo‘ldi. To‘xta! Yig‘ilmagan o‘rim stakandagi moddaga tushdi. Modda sochda qolib, teriga tegishi mumkin.",
      "Yig‘ilmagan o‘rim stakandagi moddaga tushdi. Modda sochda qolib, teriga tegishi mumkin.",
      "Endi xavfsiz! 👍"
    ],
    "en": [
      "Leila starts an experiment… but her braids are loose Watch carefully to see what happens…",
      "Her braid has fallen into the beaker!",
      "Foam and vapour appear. Stop the experiment! A loose braid fell into a beaker. The substance stayed on the hair and could reach the skin.",
      "A loose braid fell into a beaker. The substance stayed on the hair and could reach the skin.",
      "Now it is safe! 👍"
    ]
  },
  "explanation": {
    "ru": [
      {
        "kind": "what",
        "title": "① Что случилось",
        "body": "Распущенная коса попала в стакан с веществом. Оно осталось на волосах и могло попасть на кожу."
      },
      {
        "kind": "why",
        "title": "② Почему это опасно",
        "body": [
          "Возможен ожог кожи головы и лица.",
          "Волосы удерживают вещество: оно может попасть на руки.",
          "Рядом с горелкой волосы могут загореться."
        ]
      },
      {
        "kind": "good",
        "title": "④ ✅ Как надо",
        "body": [
          "Собрать волосы резинкой.",
          "Надеть защитные очки и халат.",
          "Стоять прямо, на безопасном расстоянии."
        ]
      }
    ],
    "uz-Latn": [
      {
        "kind": "what",
        "title": "① Nima bo‘ldi",
        "body": "Yig‘ilmagan o‘rim stakandagi moddaga tushdi. Modda sochda qolib, teriga tegishi mumkin."
      },
      {
        "kind": "why",
        "title": "② Nega xavfli",
        "body": [
          "Bosh terisi va yuz kuyishi mumkin.",
          "Sochdagi modda qo‘llarga o‘tishi mumkin.",
          "Gorelka yonida soch yonishi mumkin."
        ]
      },
      {
        "kind": "good",
        "title": "④ ✅ To‘g‘ri yo‘l",
        "body": [
          "Sochni rezinka bilan yig‘.",
          "Himoya ko‘zoynagi va xalat kiy.",
          "Tik tur, xavfsiz masofani saqla."
        ]
      }
    ],
    "uz-Cyrl": [
      {
        "kind": "what",
        "title": "① Nima bo‘ldi",
        "body": "Yig‘ilmagan o‘rim stakandagi moddaga tushdi. Modda sochda qolib, teriga tegishi mumkin."
      },
      {
        "kind": "why",
        "title": "② Nega xavfli",
        "body": [
          "Bosh terisi va yuz kuyishi mumkin.",
          "Sochdagi modda qo‘llarga o‘tishi mumkin.",
          "Gorelka yonida soch yonishi mumkin."
        ]
      },
      {
        "kind": "good",
        "title": "④ ✅ To‘g‘ri yo‘l",
        "body": [
          "Sochni rezinka bilan yig‘.",
          "Himoya ko‘zoynagi va xalat kiy.",
          "Tik tur, xavfsiz masofani saqla."
        ]
      }
    ],
    "en": [
      {
        "kind": "what",
        "title": "① What happened",
        "body": "A loose braid fell into a beaker. The substance stayed on the hair and could reach the skin."
      },
      {
        "kind": "why",
        "title": "② Why it is dangerous",
        "body": [
          "It can burn the scalp and face.",
          "Hair holds the substance, which can transfer to hands.",
          "Hair can catch fire near a burner."
        ]
      },
      {
        "kind": "good",
        "title": "④ ✅ Work safely",
        "body": [
          "Secure hair with a hair tie.",
          "Wear goggles and a lab coat.",
          "Stand upright at a safe distance."
        ]
      }
    ]
  }
};
SafetySituations.decorate(SituationA);
