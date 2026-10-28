/* Situation D and Task 1 summary copy. E is displayed in Uzbek through the shared labels. */
const SituationD={
  "id": "danger-d",
  "previous": "danger-c",
  "showSummary": true,
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
  "hotspots": [
    {
      "id": "face-near-beaker",
      "zone": "hotspot",
      "label": "hotspotLabel"
    }
  ],
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
  "questions": {
    "risk": {
      "correct": [
        0
      ]
    },
    "actions": {
      "correct": [
        0,
        1,
        2,
        3
      ]
    }
  },
  "copy": {
    "ru": {
      "title": "Лицо над кипящей жидкостью",
      "q1": "Азиз в очках. Что тогда здесь опасно? Нажми на сцене",
      "hotspotLabel": "Лицо слишком близко к кипящей воде",
      "hint": "Посмотри на лицо Азиза и горячий пар над стаканом…",
      "inspect": "Очки надеты, но нужно найти другую опасность.",
      "q2": "Чем это опасно?",
      "q3": "Как правильно наблюдать за нагреванием?",
      "riskExplanation": "Очки защищают глаза. Лицо, шея и руки остаются открытыми — держи их подальше от пара и брызг.",
      "stop": "Горячо! Не наклоняйся над кипящим! 🥵",
      "praise": "Наблюдаем сбоку и на расстоянии! 👀",
      "next": "Итоги →",
      "summaryNav": "Итоги",
      "distanceLabel": "≈ 50 см",
      "distanceNote": "Учебная схема: безопасное расстояние уточняй у учителя.",
      "what": "Азиз наклонился слишком близко к стакану. Горячий пар и брызги попали ему в лицо, а очки запотели.",
      "why": [
        "У открытого стакана пар обычно около 100 °C. Конденсируясь на коже, он отдаёт много тепла и может сильно обжечь.",
        "При бурном кипении горячая вода может выплеснуться.",
        "Запотевшие очки мешают видеть: можно задеть горелку или горячую посуду."
      ],
      "bad": [
        "Наклоняться над нагреваемой посудой.",
        "Смотреть в стакан сверху.",
        "Трогать горячий стакан или треножник руками."
      ],
      "good": [
        "Стоять прямо и держать безопасное расстояние.",
        "Наблюдать сбоку, а не сверху.",
        "Дождаться остывания посуды; перемещать её только подходящим держателем или прихваткой по указанию учителя."
      ],
      "helpTitle": "⑤ Если обжёгся",
      "help": "Сразу скажи учителю. Охлаждай место ожога прохладной проточной водой 10–15 минут. Не прикладывай лёд и не мажь ожог; дальнейшую помощь организует взрослый.",
      "subtitles": [
        "Азиз хочет рассмотреть пузырьки поближе…",
        "Вода закипает, пар идёт прямо в лицо!",
        "Горячий пар и брызги! Отойди от стакана!",
        "Даже в очках нельзя наклоняться над кипящей водой",
        "Наблюдай сбоку и держись подальше от горячего"
      ],
      "alts": [
        "Азиз в очках наклонился лицом к стакану на треножнике над горелкой",
        "Вода бурно кипит, пар идёт к лицу Азиза, очки запотевают",
        "Азиз отшатнулся от пара и брызг, очки покрылись влагой",
        "Азиз стоит прямо в стороне от стакана и наблюдает сбоку"
      ],
      "risks": [
        "Горячий пар и брызги обжигают лицо, а запотевшие очки мешают видеть",
        "Вода остынет из-за его дыхания",
        "Опасности нет — очки ведь надеты"
      ],
      "riskFeedback": [
        "Очки не закрывают всё лицо, шею и руки. Горячий пар опасен и в очках.",
        "Дыхание не убирает риск ожога от кипящей воды.",
        "Очки защищают глаза, но не всё лицо и тело."
      ],
      "actions": [
        "Стоять прямо, не наклоняться над посудой",
        "Наблюдать сбоку, а не сверху",
        "Держать лицо и руки подальше от горячей посуды",
        "Не трогать стакан и треножник, пока они не остынут",
        "Подуть на пар, чтобы он ушёл",
        "Наклониться ниже, чтобы лучше видеть пузырьки"
      ],
      "actionFeedback": [
        "Держи лицо вне потока горячего пара.",
        "Сбоку видно опыт, а лицо не оказывается над паром.",
        "Открытые участки кожи нужно беречь от тепла и брызг.",
        "Горячее стекло и металл обжигают. Дай им остыть.",
        "Так ты приблизишь лицо к пару. Отойди и позови учителя.",
        "Чем ближе лицо к кипящей воде, тем выше риск ожога."
      ],
      "summaryTitle": "Задание 1 пройдено!",
      "summaryFound": "Найдено ошибок: {n} из {total}",
      "summaryAccuracy": "Правильных ответов: {n}%",
      "summaryXP": "XP за ситуации",
      "summaryBadge": "Безопасность прежде всего",
      "summaryFrog": "Отлично! Теперь ты знаешь главные правила лаборатории 🧪",
      "summaryNext": "Задание 2: Знаки опасности →",
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
      "summaryProgress": "Все четыре ситуации завершены"
    },
    "uz-Latn": {
      "title": "Qaynayotgan suyuqlik ustiga egilish",
      "q1": "Aziz ko‘zoynakda. Yana nima xavfli? Sahnada tanla",
      "hotspotLabel": "Yuz qaynayotgan suvga juda yaqin",
      "hint": "Azizning yuzi va stakan ustidagi issiq bug‘ga qara…",
      "inspect": "Ko‘zoynak taqilgan, lekin yana bir xavf bor.",
      "q2": "Bu nimasi bilan xavfli?",
      "q3": "Isitishni qanday kuzatish kerak?",
      "riskExplanation": "Ko‘zoynak ko‘zlarni himoya qiladi. Yuz, bo‘yin va qo‘llar ochiq: ularni bug‘ va tomchilardan uzoq tut.",
      "stop": "Issiq! Qaynayotgan idish ustiga egilma! 🥵",
      "praise": "Yon tomondan va uzoqroqdan kuzatamiz! 👀",
      "next": "Yakunlar →",
      "summaryNav": "Yakunlar",
      "distanceLabel": "≈ 50 sm",
      "distanceNote": "O‘quv chizmasi: xavfsiz masofani o‘qituvchidan so‘ra.",
      "what": "Aziz stakanga juda yaqin egildi. Issiq bug‘ va tomchilar uning yuziga tegdi, ko‘zoynagi terlab qoldi.",
      "why": [
        "Ochiq stakan ustida bug‘ odatda 100 °C atrofida bo‘ladi. Terida kondensatsiyalanib, ko‘p issiqlik ajratadi va kuchli kuydirishi mumkin.",
        "Kuchli qaynaganda issiq suv sachrashi mumkin.",
        "Terlagan ko‘zoynak ko‘rishga xalaqit beradi: gorelka yoki issiq idishni turtib yuborish mumkin."
      ],
      "bad": [
        "Qizdirilayotgan idish ustiga egilish.",
        "Qaynayotgan stakanga tepadan qarash.",
        "Issiq stakan yoki uchoyoqni qo‘l bilan ushlash."
      ],
      "good": [
        "Tik tur va xavfsiz masofani saqla.",
        "Tepadan emas, yon tomondan kuzat.",
        "Idish sovishini kut; uni faqat o‘qituvchi ko‘rsatmasi bilan mos tutqich yoki issiqqa chidamli ushlagichda ko‘chir."
      ],
      "helpTitle": "⑤ Kuyib qolsang",
      "help": "Darhol o‘qituvchiga ayt. Kuygan joyni 10–15 daqiqa salqin oqar suvda sovit. Muz qo‘yma va krem surma; keyingi yordamni kattalar tashkil etadi.",
      "subtitles": [
        "Aziz pufakchalarni yaqinroqdan ko‘rmoqchi…",
        "Suv qaynadi, bug‘ to‘g‘ri yuzga kelyapti!",
        "Issiq bug‘ va tomchilar! Stakandan uzoqlash!",
        "Ko‘zoynakda ham qaynayotgan suv ustiga egilma",
        "Yon tomondan kuzat va issiq idishdan uzoq tur"
      ],
      "alts": [
        "Aziz ko‘zoynakda, lekin gorelka ustidagi uchoyoqda turgan stakanga egilgan",
        "Suv kuchli qaynayapti, bug‘ Azizning yuziga tegib, ko‘zoynagi terlayapti",
        "Aziz bug‘ va tomchilardan orqaga tisarildi, ko‘zoynagi namlangan",
        "Aziz stakandan uzoqroqda tik turib, yon tomondan kuzatyapti"
      ],
      "risks": [
        "Issiq bug‘ va tomchilar yuzni kuydiradi, terlagan ko‘zoynak ko‘rishga xalaqit beradi",
        "Uning nafasidan suv soviydi",
        "Xavf yo‘q, u ko‘zoynak taqqan"
      ],
      "riskFeedback": [
        "Ko‘zoynak yuz, bo‘yin va qo‘llarni to‘liq yopmaydi. Bug‘ hali ham xavfli.",
        "Nafas qaynayotgan suvdan kuyish xavfini yo‘qotmaydi.",
        "Ko‘zoynak ko‘zlarni himoya qiladi, butun yuz va tanani emas."
      ],
      "actions": [
        "Tik turish, idish ustiga egilmaslik",
        "Tepadan emas, yon tomondan kuzatish",
        "Yuz va qo‘llarni issiq idishdan uzoqda tutish",
        "Stakan va uchoyoq sovimaguncha ularga tegmaslik",
        "Bug‘ ketishi uchun uni puflash",
        "Pufakchalarni yaxshi ko‘rish uchun pastroq egilish"
      ],
      "actionFeedback": [
        "Yuzni issiq bug‘dan uzoq tut.",
        "Yon tomondan kuzatsang, yuz ko‘tarilayotgan bug‘ ustida bo‘lmaydi.",
        "Ochiq terini issiqlik va tomchilardan himoya qil.",
        "Issiq shisha va metall kuydiradi. Sovishini kut.",
        "Puflaganda yuz bug‘ga yaqinlashadi. Uzoqlash va o‘qituvchiga ayt.",
        "Yuz qaynayotgan suvga qanchalik yaqin bo‘lsa, kuyish xavfi shunchalik katta."
      ],
      "summaryTitle": "1-topshiriq bajarildi!",
      "summaryFound": "Topilgan xavflar: {n} / {total}",
      "summaryAccuracy": "To‘g‘ri javoblar: {n}%",
      "summaryXP": "Vaziyatlar uchun XP",
      "summaryBadge": "Avvalo xavfsizlik",
      "summaryFrog": "Ajoyib! Endi laboratoriyaning asosiy xavfsizlik qoidalarini bilasan 🧪",
      "summaryNext": "2-topshiriq: Xavf belgilari →",
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
      "summaryProgress": "To‘rtta vaziyat bajarildi"
    },
    "uz-Cyrl": {
      "title": "Қайнаётган суюқлик устига эгилиш",
      "q1": "Азиз кўзойнакда. Яна нима хавфли? Саҳнада танла",
      "hotspotLabel": "Юз қайнаётган сувга жуда яқин",
      "hint": "Азизнинг юзи ва стакан устидаги иссиқ буғга қара…",
      "inspect": "Кўзойнак тақилган, лекин яна бир хавф бор.",
      "q2": "Бу нимаси билан хавфли?",
      "q3": "Иситишни қандай кузатиш керак?",
      "riskExplanation": "Кўзойнак кўзларни ҳимоя қилади. Юз, бўйин ва қўллар очиқ: уларни буғ ва томчилардан узоқ тут.",
      "stop": "Иссиқ! Қайнаётган идиш устига эгилма! 🥵",
      "praise": "Ён томондан ва узоқроқдан кузатамиз! 👀",
      "next": "Якунлар →",
      "summaryNav": "Якунлар",
      "distanceLabel": "≈ 50 см",
      "distanceNote": "Ўқув чизмаси: хавфсиз масофани ўқитувчидан сўра.",
      "what": "Азиз стаканга жуда яқин эгилди. Иссиқ буғ ва томчилар унинг юзига тегди, кўзойнаги терлаб қолди.",
      "why": [
        "Очиқ стакан устида буғ одатда 100 °C атрофида бўлади. Терида конденсацияланиб, кўп иссиқлик ажратади ва кучли куйдириши мумкин.",
        "Кучли қайнаганда иссиқ сув сачраши мумкин.",
        "Терлаган кўзойнак кўришга халақит беради: горелка ёки иссиқ идишни туртиб юбориш мумкин."
      ],
      "bad": [
        "Қиздирилаётган идиш устига эгилиш.",
        "Қайнаётган стаканга тепадан қараш.",
        "Иссиқ стакан ёки учоёқни қўл билан ушлаш."
      ],
      "good": [
        "Тик тур ва хавфсиз масофани сақла.",
        "Тепадан эмас, ён томондан кузат.",
        "Идиш совишини кут; уни фақат ўқитувчи кўрсатмаси билан мос тутқич ёки иссиққа чидамли ушлагичда кўчир."
      ],
      "helpTitle": "⑤ Куйиб қолсанг",
      "help": "Дарҳол ўқитувчига айт. Куйган жойни 10–15 дақиқа салқин оқар сувда совит. Муз қўйма ва крем сурма; кейинги ёрдамни катталар ташкил этади.",
      "subtitles": [
        "Азиз пуфакчаларни яқинроқдан кўрмоқчи…",
        "Сув қайнади, буғ тўғри юзга келяпти!",
        "Иссиқ буғ ва томчилар! Стакандан узоқлаш!",
        "Кўзойнакда ҳам қайнаётган сув устига эгилма",
        "Ён томондан кузат ва иссиқ идишдан узоқ тур"
      ],
      "alts": [
        "Азиз кўзойнакда, лекин горелка устидаги учоёқда турган стаканга эгилган",
        "Сув кучли қайнаяпти, буғ Азизнинг юзига тегиб, кўзойнаги терлаяпти",
        "Азиз буғ ва томчилардан орқага тисарилди, кўзойнаги намланган",
        "Азиз стакандан узоқроқда тик туриб, ён томондан кузатяпти"
      ],
      "risks": [
        "Иссиқ буғ ва томчилар юзни куйдиради, терлаган кўзойнак кўришга халақит беради",
        "Унинг нафасидан сув совийди",
        "Хавф йўқ, у кўзойнак таққан"
      ],
      "riskFeedback": [
        "Кўзойнак юз, бўйин ва қўлларни тўлиқ ёпмайди. Буғ ҳали ҳам хавфли.",
        "Нафас қайнаётган сувдан куйиш хавфини йўқотмайди.",
        "Кўзойнак кўзларни ҳимоя қилади, бутун юз ва танани эмас."
      ],
      "actions": [
        "Тик туриш, идиш устига эгилмаслик",
        "Тепадан эмас, ён томондан кузатиш",
        "Юз ва қўлларни иссиқ идишдан узоқда тутиш",
        "Стакан ва учоёқ совимагунча уларга тегмаслик",
        "Буғ кетиши учун уни пуфлаш",
        "Пуфакчаларни яхши кўриш учун пастроқ эгилиш"
      ],
      "actionFeedback": [
        "Юзни иссиқ буғдан узоқ тут.",
        "Ён томондан кузатсанг, юз кўтарилаётган буғ устида бўлмайди.",
        "Очиқ терини иссиқлик ва томчилардан ҳимоя қил.",
        "Иссиқ шиша ва металл куйдиради. Совишини кут.",
        "Пуфлаганда юз буғга яқинлашади. Узоқлаш ва ўқитувчига айт.",
        "Юз қайнаётган сувга қанчалик яқин бўлса, куйиш хавфи шунчалик катта."
      ],
      "summaryTitle": "1-топшириқ бажарилди!",
      "summaryFound": "Топилган хавфлар: {n} / {total}",
      "summaryAccuracy": "Тўғри жавоблар: {n}%",
      "summaryXP": "Вазиятлар учун XP",
      "summaryBadge": "Аввало хавфсизлик",
      "summaryFrog": "Ажойиб! Энди лабораториянинг асосий хавфсизлик қоидаларини биласан 🧪",
      "summaryNext": "2-топшириқ: Хавф белгилари →",
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
      "summaryProgress": "Тўртта вазият бажарилди"
    },
    "en": {
      "title": "Leaning over boiling liquid",
      "q1": "Aziz is wearing goggles. What is still dangerous? Select it in the scene",
      "hotspotLabel": "Face too close to boiling water",
      "hint": "Look at Aziz’s face and the hot steam above the beaker…",
      "inspect": "He has goggles on, but there is another danger.",
      "q2": "Why is this dangerous?",
      "q3": "How should heating be observed?",
      "riskExplanation": "Goggles protect the eyes. The face, neck and hands are still exposed: keep them away from steam and splashes.",
      "stop": "Hot! Never lean over boiling liquid! 🥵",
      "praise": "Watch from the side and keep your distance! 👀",
      "next": "Results →",
      "summaryNav": "Results",
      "distanceLabel": "≈ 50 cm",
      "distanceNote": "Learning diagram: ask your teacher about a safe working distance.",
      "what": "Aziz leaned too close to the beaker. Hot steam and splashes reached his face, and his goggles fogged up.",
      "why": [
        "Above an open beaker, steam is usually around 100 °C. When it condenses on skin it releases a lot of heat and can cause serious burns.",
        "Vigorous boiling can make hot water splash out.",
        "Fogged goggles make it hard to see: you could knock the burner or hot glassware."
      ],
      "bad": [
        "Lean over glassware being heated.",
        "Look down into a boiling beaker.",
        "Touch a hot beaker or tripod with bare hands."
      ],
      "good": [
        "Stand upright at a safe distance.",
        "Observe from the side, not from above.",
        "Let glassware cool; move it only with a suitable holder or heatproof grip as your teacher directs."
      ],
      "helpTitle": "⑤ If you get a burn",
      "help": "Tell your teacher immediately. Cool the burn under cool running water for 10–15 minutes. Do not use ice or apply creams; an adult should arrange further help.",
      "subtitles": [
        "Aziz wants a closer look at the bubbles…",
        "The water boils and steam goes straight towards his face!",
        "Hot steam and splashes! Move away from the beaker!",
        "Even with goggles, never lean over boiling water",
        "Observe from the side and stay away from hot glassware"
      ],
      "alts": [
        "Aziz wears goggles but leans towards a beaker on a tripod above a burner",
        "Water boils vigorously; steam reaches Aziz’s face and fogs his goggles",
        "Aziz recoils from steam and splashes, his goggles covered in moisture",
        "Aziz stands upright away from the beaker and watches from the side"
      ],
      "risks": [
        "Hot steam and splashes burn the face, and fogged goggles make it hard to see",
        "His breath will cool the water",
        "There is no danger because he is wearing goggles"
      ],
      "riskFeedback": [
        "Goggles do not cover the entire face, neck and hands. Steam is still dangerous.",
        "Breathing does not remove the risk of a boiling-water burn.",
        "Goggles protect eyes, not the whole face and body."
      ],
      "actions": [
        "Stand upright without leaning over the glassware",
        "Observe from the side, not from above",
        "Keep face and hands away from hot glassware",
        "Do not touch the beaker or tripod until they cool",
        "Blow on the steam to make it go away",
        "Lean closer to see the bubbles better"
      ],
      "actionFeedback": [
        "Keep your face out of the hot steam.",
        "Watching from the side keeps your face away from the rising steam.",
        "Protect exposed skin from heat and splashes.",
        "Hot glass and metal burn skin. Let them cool.",
        "Blowing brings your face nearer to the steam. Move away and tell your teacher.",
        "A face closer to boiling water is at greater risk of burns."
      ],
      "summaryTitle": "Task 1 completed!",
      "summaryFound": "Hazards found: {n} of {total}",
      "summaryAccuracy": "Correct answers: {n}%",
      "summaryXP": "XP for the situations",
      "summaryBadge": "Safety comes first",
      "summaryFrog": "Great! Now you know the main laboratory safety rules 🧪",
      "summaryNext": "Task 2: Hazard signs →",
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
      "summaryProgress": "All four situations completed"
    }
  }
};
for(const lang of Object.keys(SituationD.copy))SituationD.copy[lang]={...SituationA.copy[lang],...SituationD.copy[lang]};
SafetySituations.decorate(SituationD);
{
 const title=Object.fromEntries(Object.entries(SituationD.copy).map(([lang,c])=>[lang,c.title]));
 IntroData.tasks.find(t=>t.id===SituationD.id).title=title;
 IntroData.dangers.find(d=>d.id===SituationD.id).title=title;
 CourseData.topics.find(t=>t.id==='intro').steps.experiments.find(e=>e.key===SituationD.id).title=title;
}
