/* Situation A: timings, image coordinates, questions and localized teaching copy. */
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
      "effect": "question"
    },
    {
      "at": 12,
      "frame": 3,
      "zoom": 1,
      "effect": "confetti"
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
  "questions": {
    "risk": {
      "correct": [
        0
      ]
    },
    "actions": {
      "correct": [
        0,
        1
      ]
    }
  },
  "copy": {
    "ru": {
      "title": "Распущенные волосы в лаборатории",
      "heading": "Практическая работа 1.1 · Ситуация A из 4",
      "situation": "СИТУАЦИЯ A",
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
      "stop": "Стоп! Что-то пошло не так 😱",
      "praise": "Вот теперь безопасно! 👍",
      "hint": "Посмотри на волосы Лейлы…",
      "hotspot": "Опасная зона: волосы и первый стакан",
      "q1": "Нажми на сцене, что здесь опасно",
      "q2": "Чем это опасно?",
      "q3": "Как нужно было поступить?",
      "check": "Проверить",
      "correct": "✓ Верно!",
      "wrong": "Не совсем. Прочитай объяснение и попробуй ещё раз.",
      "multiHint": "Выбери все безопасные действия.",
      "replay": "↺ Посмотреть ещё раз",
      "next": "Ситуация B →",
      "reward": "+20 XP",
      "whatTitle": "① Что случилось",
      "what": "Распущенная коса попала в стакан с веществом. Оно осталось на волосах и могло попасть на кожу.",
      "whyTitle": "② Почему это опасно",
      "why": [
        "Возможен ожог кожи головы и лица.",
        "Волосы удерживают вещество: оно может попасть на руки.",
        "Рядом с горелкой волосы могут загореться."
      ],
      "badTitle": "③ ❌ Так делать нельзя",
      "bad": [
        "Работать с распущенными волосами.",
        "Наклоняться низко над посудой.",
        "Трогать волосы руками во время опыта."
      ],
      "goodTitle": "④ ✅ Как надо",
      "good": [
        "Собрать волосы резинкой.",
        "Надеть защитные очки и халат.",
        "Стоять прямо, на безопасном расстоянии."
      ],
      "helpTitle": "⑤ Если всё-таки случилось",
      "help": "Сразу остановись и скажи учителю. Под его руководством промой волосы и кожу большим количеством воды.",
      "subtitles": [
        "Лейла начинает опыт… но косы у неё распущены",
        "Коса опустилась прямо в стакан!",
        "В стакане появились пена и пар. Останови опыт!",
        "Найди опасность и помоги Лейле",
        "Волосы собраны — можно работать безопасно"
      ],
      "alts": [
        "Лейла с распущенными косами начинает опыт",
        "Левая коса Лейлы попала в первый стакан",
        "В первом стакане пена и пар, Лейла испугана",
        "Волосы Лейлы собраны в пучок, она работает в очках"
      ],
      "risks": [
        "Волосы могут попасть в вещество: возможны ожог или отравление, а опыт испортится",
        "Коса помешает видеть доску",
        "Опасности нет, это просто вода"
      ],
      "riskFeedback": [
        "Вещество на волосах может попасть на кожу и руки.",
        "Дело не в доске: коса оказалась в веществе.",
        "Без этикетки и указаний учителя нельзя считать жидкость водой."
      ],
      "actions": [
        "Собрать волосы в пучок или хвост резинкой",
        "Не наклоняться низко над стаканами",
        "Перекинуть косы за спину и продолжать",
        "Работать быстрее, чтобы успеть"
      ],
      "actionFeedback": [
        "Волосы должны быть надёжно закреплены.",
        "Держи лицо и волосы подальше от посуды.",
        "Косы могут снова упасть вперёд. Закрепи их резинкой.",
        "Спешка повышает риск ошибки. Сначала устрани опасность."
      ]
    },
    "uz-Latn": {
      "title": "Laboratoriyada yig‘ilmagan soch",
      "heading": "1.1-amaliy ish · 4 vaziyatdan A vaziyat",
      "situation": "A VAZIYAT",
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
      "stop": "To‘xta! Nimadir noto‘g‘ri ketdi 😱",
      "praise": "Endi xavfsiz! 👍",
      "hint": "Layloning sochiga qara…",
      "hotspot": "Xavfli joy: soch va birinchi stakan",
      "q1": "Sahnadagi xavfni tanla",
      "q2": "Bu nimasi bilan xavfli?",
      "q3": "Qanday yo‘l tutish kerak edi?",
      "check": "Tekshirish",
      "correct": "✓ To‘g‘ri!",
      "wrong": "Hali to‘g‘ri emas. Izohni o‘qib, qayta urin.",
      "multiHint": "Barcha xavfsiz harakatlarni tanla.",
      "replay": "↺ Yana ko‘rish",
      "next": "B vaziyat →",
      "reward": "+20 XP",
      "whatTitle": "① Nima bo‘ldi",
      "what": "Yig‘ilmagan o‘rim stakandagi moddaga tushdi. Modda sochda qolib, teriga tegishi mumkin.",
      "whyTitle": "② Nega xavfli",
      "why": [
        "Bosh terisi va yuz kuyishi mumkin.",
        "Sochdagi modda qo‘llarga o‘tishi mumkin.",
        "Gorelka yonida soch yonishi mumkin."
      ],
      "badTitle": "③ ❌ Bunday qilma",
      "bad": [
        "Sochni yig‘masdan ishlama.",
        "Idishlar ustiga past egilma.",
        "Tajriba vaqtida sochingga tegma."
      ],
      "goodTitle": "④ ✅ To‘g‘ri yo‘l",
      "good": [
        "Sochni rezinka bilan yig‘.",
        "Himoya ko‘zoynagi va xalat kiy.",
        "Tik tur, xavfsiz masofani saqla."
      ],
      "helpTitle": "⑤ Agar shunday bo‘lsa",
      "help": "Darhol to‘xta va o‘qituvchiga ayt. Uning ko‘rsatmasi bilan soch va terini ko‘p suvda yuv.",
      "subtitles": [
        "Laylo tajriba boshlayapti… ammo sochi yig‘ilmagan",
        "O‘rim to‘g‘ri stakanga tushdi!",
        "Stakanda ko‘pik va bug‘ paydo bo‘ldi. To‘xta!",
        "Xavfni top va Layloga yordam ber",
        "Soch yig‘ildi — endi xavfsiz ishlash mumkin"
      ],
      "alts": [
        "Laylo yig‘ilmagan o‘rimlar bilan tajriba boshlayapti",
        "Layloning chap o‘rimi birinchi stakanga tushdi",
        "Birinchi stakandagi ko‘pik va bug‘ Layloni qo‘rqitdi",
        "Layloning sochi yig‘ilgan, ko‘zida himoya ko‘zoynagi"
      ],
      "risks": [
        "Soch moddaga tushib, kuyish yoki zaharlanishga sabab bo‘lishi, tajribani buzishi mumkin",
        "O‘rim doskani ko‘rishga xalaqit beradi",
        "Xavf yo‘q, bu oddiy suv"
      ],
      "riskFeedback": [
        "Sochdagi modda teri va qo‘llarga tegishi mumkin.",
        "Xavf doskada emas, sochning moddaga tegishida.",
        "Yorliq va o‘qituvchi ko‘rsatmasisiz suyuqlikni suv deb bo‘lmaydi."
      ],
      "actions": [
        "Sochni rezinka bilan tugun yoki dum qilib yig‘ish",
        "Stakanlar ustiga past egilmaslik",
        "O‘rimlarni orqaga tashlab davom etish",
        "Ulgurish uchun tezroq ishlash"
      ],
      "actionFeedback": [
        "Soch mahkam yig‘ilgan bo‘lishi kerak.",
        "Yuz va sochni idishlardan uzoq tut.",
        "O‘rim yana oldinga tushishi mumkin. Rezinka ishlat.",
        "Shoshilish xatolarni ko‘paytiradi. Avval xavfni yo‘qot."
      ]
    },
    "uz-Cyrl": {
      "title": "Laboratoriyada yig‘ilmagan soch",
      "heading": "1.1-amaliy ish · 4 vaziyatdan A vaziyat",
      "situation": "A VAZIYAT",
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
      "stop": "To‘xta! Nimadir noto‘g‘ri ketdi 😱",
      "praise": "Endi xavfsiz! 👍",
      "hint": "Layloning sochiga qara…",
      "hotspot": "Xavfli joy: soch va birinchi stakan",
      "q1": "Sahnadagi xavfni tanla",
      "q2": "Bu nimasi bilan xavfli?",
      "q3": "Qanday yo‘l tutish kerak edi?",
      "check": "Tekshirish",
      "correct": "✓ To‘g‘ri!",
      "wrong": "Hali to‘g‘ri emas. Izohni o‘qib, qayta urin.",
      "multiHint": "Barcha xavfsiz harakatlarni tanla.",
      "replay": "↺ Yana ko‘rish",
      "next": "B vaziyat →",
      "reward": "+20 XP",
      "whatTitle": "① Nima bo‘ldi",
      "what": "Yig‘ilmagan o‘rim stakandagi moddaga tushdi. Modda sochda qolib, teriga tegishi mumkin.",
      "whyTitle": "② Nega xavfli",
      "why": [
        "Bosh terisi va yuz kuyishi mumkin.",
        "Sochdagi modda qo‘llarga o‘tishi mumkin.",
        "Gorelka yonida soch yonishi mumkin."
      ],
      "badTitle": "③ ❌ Bunday qilma",
      "bad": [
        "Sochni yig‘masdan ishlama.",
        "Idishlar ustiga past egilma.",
        "Tajriba vaqtida sochingga tegma."
      ],
      "goodTitle": "④ ✅ To‘g‘ri yo‘l",
      "good": [
        "Sochni rezinka bilan yig‘.",
        "Himoya ko‘zoynagi va xalat kiy.",
        "Tik tur, xavfsiz masofani saqla."
      ],
      "helpTitle": "⑤ Agar shunday bo‘lsa",
      "help": "Darhol to‘xta va o‘qituvchiga ayt. Uning ko‘rsatmasi bilan soch va terini ko‘p suvda yuv.",
      "subtitles": [
        "Laylo tajriba boshlayapti… ammo sochi yig‘ilmagan",
        "O‘rim to‘g‘ri stakanga tushdi!",
        "Stakanda ko‘pik va bug‘ paydo bo‘ldi. To‘xta!",
        "Xavfni top va Layloga yordam ber",
        "Soch yig‘ildi — endi xavfsiz ishlash mumkin"
      ],
      "alts": [
        "Laylo yig‘ilmagan o‘rimlar bilan tajriba boshlayapti",
        "Layloning chap o‘rimi birinchi stakanga tushdi",
        "Birinchi stakandagi ko‘pik va bug‘ Layloni qo‘rqitdi",
        "Layloning sochi yig‘ilgan, ko‘zida himoya ko‘zoynagi"
      ],
      "risks": [
        "Soch moddaga tushib, kuyish yoki zaharlanishga sabab bo‘lishi, tajribani buzishi mumkin",
        "O‘rim doskani ko‘rishga xalaqit beradi",
        "Xavf yo‘q, bu oddiy suv"
      ],
      "riskFeedback": [
        "Sochdagi modda teri va qo‘llarga tegishi mumkin.",
        "Xavf doskada emas, sochning moddaga tegishida.",
        "Yorliq va o‘qituvchi ko‘rsatmasisiz suyuqlikni suv deb bo‘lmaydi."
      ],
      "actions": [
        "Sochni rezinka bilan tugun yoki dum qilib yig‘ish",
        "Stakanlar ustiga past egilmaslik",
        "O‘rimlarni orqaga tashlab davom etish",
        "Ulgurish uchun tezroq ishlash"
      ],
      "actionFeedback": [
        "Soch mahkam yig‘ilgan bo‘lishi kerak.",
        "Yuz va sochni idishlardan uzoq tut.",
        "O‘rim yana oldinga tushishi mumkin. Rezinka ishlat.",
        "Shoshilish xatolarni ko‘paytiradi. Avval xavfni yo‘qot."
      ]
    },
    "en": {
      "title": "Loose hair in the laboratory",
      "heading": "Practical work 1.1 · Situation A of 4",
      "situation": "SITUATION A",
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
      "stop": "Stop! Something went wrong 😱",
      "praise": "Now it is safe! 👍",
      "hint": "Look at Leila’s hair…",
      "hotspot": "Danger zone: hair and first beaker",
      "q1": "Select what is dangerous in the scene",
      "q2": "Why is this dangerous?",
      "q3": "What should she have done?",
      "check": "Check",
      "correct": "✓ Correct!",
      "wrong": "Not quite. Read the explanation and try again.",
      "multiHint": "Select all safe actions.",
      "replay": "↺ Watch again",
      "next": "Situation B →",
      "reward": "+20 XP",
      "whatTitle": "① What happened",
      "what": "A loose braid fell into a beaker. The substance stayed on the hair and could reach the skin.",
      "whyTitle": "② Why it is dangerous",
      "why": [
        "It can burn the scalp and face.",
        "Hair holds the substance, which can transfer to hands.",
        "Hair can catch fire near a burner."
      ],
      "badTitle": "③ ❌ Never do this",
      "bad": [
        "Work with loose hair.",
        "Lean low over glassware.",
        "Touch your hair during an experiment."
      ],
      "goodTitle": "④ ✅ Work safely",
      "good": [
        "Secure hair with a hair tie.",
        "Wear goggles and a lab coat.",
        "Stand upright at a safe distance."
      ],
      "helpTitle": "⑤ If it happens",
      "help": "Stop immediately and tell your teacher. With their guidance, rinse hair and skin with plenty of water.",
      "subtitles": [
        "Leila starts an experiment… but her braids are loose",
        "Her braid has fallen into the beaker!",
        "Foam and vapour appear. Stop the experiment!",
        "Find the danger and help Leila",
        "Hair secured — ready to work safely"
      ],
      "alts": [
        "Leila begins an experiment with loose braids",
        "Leila’s left braid falls into the first beaker",
        "Foam and vapour in the first beaker surprise Leila",
        "Leila wears goggles with her hair secured in a bun"
      ],
      "risks": [
        "Hair can enter a substance: it may cause burns or poisoning and spoil the experiment",
        "The braid blocks the view of the board",
        "There is no danger; it is just water"
      ],
      "riskFeedback": [
        "The substance can transfer from hair to skin and hands.",
        "The danger is the braid touching a substance.",
        "Without a label and teacher’s instructions, never assume a liquid is water."
      ],
      "actions": [
        "Secure hair in a bun or ponytail with a hair tie",
        "Avoid leaning low over beakers",
        "Throw the braids behind her back and continue",
        "Work faster to finish in time"
      ],
      "actionFeedback": [
        "Hair must stay securely tied.",
        "Keep your face and hair away from glassware.",
        "Braids can fall forward again. Use a hair tie.",
        "Rushing increases mistakes. Remove the danger first."
      ]
    }
  }
};
// Keep catalog titles and answer descriptions aligned with the new situation.
{
 const localized=key=>Object.fromEntries(Object.entries(SituationA.copy).map(([lang,copy])=>[lang,copy[key]]));
 const danger=IntroData.dangers.find(d=>d.id===SituationA.id);
 IntroData.tasks.find(t=>t.id===SituationA.id).title=localized('title');
 danger.title=localized('title');
 CourseData.topics.find(t=>t.id==='intro').steps.experiments.find(e=>e.key===SituationA.id).title=localized('title');
 danger.danger=[0,1,2].map(i=>Object.fromEntries(Object.entries(SituationA.copy).map(([lang,c])=>[lang,c.risks[i]])));
 danger.actions=[2,0,3].map(i=>Object.fromEntries(Object.entries(SituationA.copy).map(([lang,c])=>[lang,c.actions[i]])));
}
