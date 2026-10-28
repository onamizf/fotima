/* Scene presentation data; learning rules and canonical IDs remain unchanged. */
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
  "hotspots": [
    {
      "id": "goggles",
      "zone": "goggles",
      "label": "gogglesLabel"
    },
    {
      "id": "tube",
      "zone": "tube",
      "label": "tubeLabel"
    }
  ],
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
    },
    "presentation": "frog-bubble"
  },
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
      "skip": "Пропустить анимацию",
      "sound": "Звук",
      "timeline": "Этапы сцены",
      "danger": "⚠ ОПАСНО",
      "safe": "✔ ПРАВИЛЬНО",
      "stop": "Ой! А где твои очки? 😱",
      "praise": "Глаза в безопасности! 👍",
      "hint": "Проверь, где очки Тимура и как он держит пробирку…",
      "hotspot": "Опасная зона: волосы и первый стакан",
      "q1": "Нажми на сцене, что здесь не так",
      "q2": "Чем это опасно?",
      "q3": "Как нужно нагревать пробирку?",
      "check": "Проверить",
      "correct": "✓ Верно!",
      "wrong": "Не совсем. Прочитай объяснение и попробуй ещё раз.",
      "multiHint": "Выбери все безопасные действия.",
      "replay": "↺ Посмотреть ещё раз",
      "reward": "+20 XP",
      "alts": [
        "Тимур без очков нагревает пробирку, держа её пальцами; очки лежат на столе",
        "Жидкость в пробирке бурно кипит, над отверстием пар",
        "Капли горячей жидкости летят к незащищённым глазам и лицу Тимура",
        "Тимур в очках нагревает наклонённую пробирку с держателем, отверстием от людей"
      ],
      "risks": [
        "Кипящая жидкость может брызнуть в глаза и на лицо — возможны ожог и травма глаз",
        "Пробирка остынет слишком быстро",
        "Опыт займёт больше времени"
      ],
      "riskFeedback": [
        "От горячей жидкости и реактива нужно защищать глаза и лицо.",
        "Проблема не в охлаждении: кипящая жидкость может выплеснуться.",
        "Длительность опыта не объясняет риск ожога и травмы глаз."
      ],
      "actions": [
        "Надеть защитные очки до начала опыта",
        "Держать пробирку держателем, а не пальцами",
        "Наклонить пробирку и направить отверстие от себя и соседей",
        "Сначала равномерно прогреть всю пробирку, затем нагревать жидкость у дна, плавно перемещая её",
        "Заглянуть в пробирку сверху, чтобы увидеть кипение",
        "Держать пробирку над пламенем неподвижно"
      ],
      "actionFeedback": [
        "Очки нужны с начала работы до её окончания.",
        "Стекло нагревается — используй держатель.",
        "Отверстие всегда должно быть направлено от людей.",
        "Равномерное прогревание и плавное движение снижают риск перегрева.",
        "Из отверстия могут вылететь горячая жидкость и пар. Не заглядывай внутрь.",
        "Неподвижное нагревание одного места повышает риск перегрева и выброса жидкости."
      ],
      "heading": "Практическая работа 1.1 · Ситуация B из 4",
      "situation": "СИТУАЦИЯ B",
      "next": "Ситуация C →",
      "found": "Найдено {n} / {total}",
      "gogglesLabel": "Очки не надеты",
      "tubeLabel": "Пробирка без держателя и направлена на себя",
      "inspect": "Внимательно осмотри сцену. Нужно отметить две ошибки.",
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
      "skip": "Animatsiyani o‘tkazib yuborish",
      "sound": "Ovoz",
      "timeline": "Sahna bosqichlari",
      "danger": "⚠ XAVFLI",
      "safe": "✔ TO‘G‘RI",
      "stop": "Voy! Ko‘zoynaging qani? 😱",
      "praise": "Ko‘zlar himoyalangan! 👍",
      "hint": "Temurning ko‘zoynagi qayerda va u probirkani qanday ushlab turibdi?",
      "hotspot": "Xavfli joy: soch va birinchi stakan",
      "q1": "Sahnada nima noto‘g‘ri ekanini tanla",
      "q2": "Bu nimasi bilan xavfli?",
      "q3": "Probirkani qanday isitish kerak?",
      "check": "Tekshirish",
      "correct": "✓ To‘g‘ri!",
      "wrong": "Hali to‘g‘ri emas. Izohni o‘qib, qayta urin.",
      "multiHint": "Barcha xavfsiz harakatlarni tanla.",
      "replay": "↺ Yana ko‘rish",
      "reward": "+20 XP",
      "alts": [
        "Temur ko‘zoynaksiz probirkani barmoqlari bilan qizdiryapti; ko‘zoynak stolda",
        "Probirkadagi suyuqlik kuchli qaynayapti, og‘zidan bug‘ chiqyapti",
        "Issiq tomchilar Temurning himoyalanmagan yuzi va ko‘zlariga sachrayapti",
        "Temur ko‘zoynakda, probirkani tutqich bilan qiya ushlab, og‘zini odamlardan nariga qaratgan"
      ],
      "risks": [
        "Qaynagan suyuqlik ko‘z va yuzga sachrab, kuyish va ko‘z jarohatiga sabab bo‘lishi mumkin",
        "Probirka juda tez soviydi",
        "Tajriba uzoqroq davom etadi"
      ],
      "riskFeedback": [
        "Ko‘z va yuzni issiq suyuqlik hamda reaktivdan himoya qilish kerak.",
        "Xavf sovishda emas: qaynagan suyuqlik sachrashi mumkin.",
        "Vaqt kuyish va ko‘z jarohati xavfini tushuntirmaydi."
      ],
      "actions": [
        "Tajriba boshlanishidan oldin himoya ko‘zoynagini taqish",
        "Probirkani barmoqlar bilan emas, tutqich bilan ushlash",
        "Probirkani qiyalatib, og‘zini o‘zidan va boshqalardan nariga qaratish",
        "Avval butun probirkani bir tekis isitib, keyin uni sekin harakatlantirib tub yaqinidagi suyuqlikni qizdirish",
        "Qaynashini ko‘rish uchun probirkaga tepadan qarash",
        "Probirkani olov ustida qimirlatmay ushlash"
      ],
      "actionFeedback": [
        "Ko‘zoynak ish boshidan oxirigacha taqilgan bo‘lsin.",
        "Shisha qiziydi. Tutqich ishlat.",
        "Probirka og‘zini doim odamlardan nariga qarat.",
        "Bir tekis isitish va sekin harakat ortiqcha qizishni kamaytiradi.",
        "Og‘zidan issiq suyuqlik va bug‘ otilishi mumkin. Ichiga qarama.",
        "Bir joyni qimirlatmay isitish ortiqcha qizish va sachrash xavfini oshiradi."
      ],
      "heading": "1.1-amaliy ish · 4 vaziyatdan B vaziyat",
      "situation": "B VAZIYAT",
      "next": "D vaziyat →",
      "found": "Topildi: {n} / {total}",
      "gogglesLabel": "Ko‘zoynak taqilmagan",
      "tubeLabel": "Probirka tutqichsiz, og‘zi o‘ziga qaratilgan",
      "inspect": "Sahnani diqqat bilan ko‘r. Ikkita xatoni belgilash kerak.",
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
      "skip": "Animatsiyani o‘tkazib yuborish",
      "sound": "Ovoz",
      "timeline": "Sahna bosqichlari",
      "danger": "⚠ XAVFLI",
      "safe": "✔ TO‘G‘RI",
      "stop": "Вой! Кўзойнагинг қани? 😱",
      "praise": "Кўзлар ҳимояланган! 👍",
      "hint": "Темурнинг кўзойнаги қаерда ва у пробиркани қандай ушлаб турибди?",
      "hotspot": "Xavfli joy: soch va birinchi stakan",
      "q1": "Саҳнада нима нотўғри эканини танла",
      "q2": "Бу нимаси билан хавфли?",
      "q3": "Пробиркани қандай иситиш керак?",
      "check": "Tekshirish",
      "correct": "✓ To‘g‘ri!",
      "wrong": "Hali to‘g‘ri emas. Izohni o‘qib, qayta urin.",
      "multiHint": "Barcha xavfsiz harakatlarni tanla.",
      "replay": "↺ Yana ko‘rish",
      "reward": "+20 XP",
      "alts": [
        "Темур кўзойнаксиз пробиркани бармоқлари билан қиздиряпти; кўзойнак столда",
        "Пробиркадаги суюқлик кучли қайнаяпти, оғзидан буғ чиқяпти",
        "Иссиқ томчилар Темурнинг ҳимояланмаган юзи ва кўзларига сачраяпти",
        "Темур кўзойнакда, пробиркани тутқич билан қия ушлаб, оғзини одамлардан нарига қаратган"
      ],
      "risks": [
        "Қайнаган суюқлик кўз ва юзга сачраб, куйиш ва кўз жароҳатига сабаб бўлиши мумкин",
        "Пробирка жуда тез совийди",
        "Тажриба узоқроқ давом этади"
      ],
      "riskFeedback": [
        "Кўз ва юзни иссиқ суюқлик ҳамда реактивдан ҳимоя қилиш керак.",
        "Хавф совишда эмас: қайнаган суюқлик сачраши мумкин.",
        "Вақт куйиш ва кўз жароҳати хавфини тушунтирмайди."
      ],
      "actions": [
        "Тажриба бошланишидан олдин ҳимоя кўзойнагини тақиш",
        "Пробиркани бармоқлар билан эмас, тутқич билан ушлаш",
        "Пробиркани қиялатиб, оғзини ўзидан ва бошқалардан нарига қаратиш",
        "Аввал бутун пробиркани бир текис иситиб, кейин уни секин ҳаракатлантириб туб яқинидаги суюқликни қиздириш",
        "Қайнашини кўриш учун пробиркага тепадан қараш",
        "Пробиркани олов устида қимирлатмай ушлаш"
      ],
      "actionFeedback": [
        "Кўзойнак иш бошидан охиригача тақилган бўлсин.",
        "Шиша қизийди. Тутқич ишлат.",
        "Пробирка оғзини доим одамлардан нарига қарат.",
        "Бир текис иситиш ва секин ҳаракат ортиқча қизишни камайтиради.",
        "Оғзидан иссиқ суюқлик ва буғ отилиши мумкин. Ичига қарама.",
        "Бир жойни қимирлатмай иситиш ортиқча қизиш ва сачраш хавфини оширади."
      ],
      "heading": "1.1-амалий иш · 4 вазиятдан B вазият",
      "situation": "B ВАЗИЯТ",
      "next": "D вазият →",
      "found": "Топилди: {n} / {total}",
      "gogglesLabel": "Кўзойнак тақилмаган",
      "tubeLabel": "Пробирка тутқичсиз, оғзи ўзига қаратилган",
      "inspect": "Саҳнани диққат билан кўр. Иккита хатони белгилаш керак.",
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
      "skip": "Skip animation",
      "sound": "Sound",
      "timeline": "Scene stages",
      "danger": "⚠ DANGER",
      "safe": "✔ SAFE",
      "stop": "Oops! Where are your goggles? 😱",
      "praise": "Eyes protected! 👍",
      "hint": "Check where Timur’s goggles are and how he holds the tube…",
      "hotspot": "Danger zone: hair and first beaker",
      "q1": "Select what is wrong in the scene",
      "q2": "Why is this dangerous?",
      "q3": "How should a test tube be heated?",
      "check": "Check",
      "correct": "✓ Correct!",
      "wrong": "Not quite. Read the explanation and try again.",
      "multiHint": "Select all safe actions.",
      "replay": "↺ Watch again",
      "reward": "+20 XP",
      "alts": [
        "Timur heats a test tube with his fingers; his goggles are on the bench",
        "Liquid boils vigorously in the tube, with vapour above its opening",
        "Hot droplets fly towards Timur’s unprotected face and eyes",
        "Timur wears goggles and uses a holder to heat a tilted tube, pointed away from people"
      ],
      "risks": [
        "Boiling liquid can splash into the eyes and onto the face, causing burns and eye injuries",
        "The tube will cool too quickly",
        "The experiment will take longer"
      ],
      "riskFeedback": [
        "Eyes and face need protection from hot liquid and chemicals.",
        "Cooling is not the danger: boiling liquid can splash out.",
        "Duration does not explain the danger of burns and eye injuries."
      ],
      "actions": [
        "Put on safety goggles before the experiment",
        "Use a test-tube holder, not fingers",
        "Tilt the tube and point its opening away from yourself and others",
        "Warm the entire tube evenly first, then heat the liquid near the bottom while moving the tube gently",
        "Look into the tube from above to check boiling",
        "Hold the tube still above the flame"
      ],
      "actionFeedback": [
        "Wear goggles from start to finish.",
        "Glass gets hot. Use a holder.",
        "Always point the opening away from people.",
        "Even warming and gentle movement reduce local overheating.",
        "Hot liquid and vapour can escape from the opening. Never look inside.",
        "Heating one spot without moving the tube can overheat the liquid and make it splash out."
      ],
      "heading": "Practical work 1.1 · Situation B of 4",
      "situation": "SITUATION B",
      "next": "Situation C →",
      "found": "Found {n} / {total}",
      "gogglesLabel": "Goggles are not being worn",
      "tubeLabel": "No holder; the tube points towards the learner",
      "inspect": "Look closely at the scene. Mark both mistakes.",
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
      "Нажми на сцене, что здесь не так",
      "Глаза в безопасности! 👍"
    ],
    "uz-Latn": [
      "Temur eritmani probirkada qizdiryapti… Nima bo‘lishini diqqat bilan kuzat…",
      "Suyuqlik tobora kuchliroq qaynayapti…",
      "Suyuqlik yuz tomon sachradi. Isitishni to‘xtat! Suyuqlik ortiqcha qizib, yuz tomon sachradi. Temurning ko‘zlari ko‘zoynak bilan himoyalanmagan edi.",
      "Sahnada nima noto‘g‘ri ekanini tanla",
      "Ko‘zlar himoyalangan! 👍"
    ],
    "uz-Cyrl": [
      "Темур эритмани пробиркада қиздиряпти… Nima bo‘lishini diqqat bilan kuzat…",
      "Суюқлик тобора кучлироқ қайнаяпти…",
      "Суюқлик юз томон сачради. Иситишни тўхтат! Суюқлик ортиқча қизиб, юз томон сачради. Темурнинг кўзлари кўзойнак билан ҳимояланмаган эди.",
      "Саҳнада нима нотўғри эканини танла",
      "Кўзлар ҳимояланган! 👍"
    ],
    "en": [
      "Timur is heating a solution in a test tube… Watch carefully to see what happens…",
      "The liquid boils more and more vigorously…",
      "Liquid splashes towards his face. Stop heating! The liquid overheated and splashed towards Timur’s face. His eyes were not protected by goggles.",
      "Select what is wrong in the scene",
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
        "kind": "bad",
        "title": "③ ❌ Так делать нельзя",
        "body": [
          "Нагревать без защитных очков.",
          "Держать нагреваемую пробирку пальцами.",
          "Направлять отверстие на себя или соседа.",
          "Наклоняться над нагреваемой посудой."
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
      },
      {
        "kind": "help",
        "title": "⑤ Если всё-таки попало в глаза",
        "body": "Сразу скажи учителю. Немедленно промывай глаза проточной водой не меньше 15 минут; нужна медицинская помощь. Не три глаза."
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
        "kind": "bad",
        "title": "③ ❌ Bunday qilma",
        "body": [
          "Himoya ko‘zoynagisiz isitish.",
          "Qizdirilayotgan probirkani barmoqlar bilan ushlash.",
          "Probirka og‘zini o‘ziga yoki yonidagiga qaratish.",
          "Qizdirilayotgan idish ustiga egilish."
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
      },
      {
        "kind": "help",
        "title": "⑤ Ko‘zga sachrasa",
        "body": "Darhol o‘qituvchiga ayt. Ko‘zni darhol kamida 15 daqiqa oqar suvda yuv va tibbiy yordam ol. Ko‘zni ishqalama."
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
        "kind": "bad",
        "title": "③ ❌ Bunday qilma",
        "body": [
          "Ҳимоя кўзойнагисиз иситиш.",
          "Қиздирилаётган пробиркани бармоқлар билан ушлаш.",
          "Пробирка оғзини ўзига ёки ёнидагига қаратиш.",
          "Қиздирилаётган идиш устига эгилиш."
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
      },
      {
        "kind": "help",
        "title": "⑤ Кўзга сачраса",
        "body": "Дарҳол ўқитувчига айт. Кўзни дарҳол камида 15 дақиқа оқар сувда юв ва тиббий ёрдам ол. Кўзни ишқалама."
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
        "kind": "bad",
        "title": "③ ❌ Never do this",
        "body": [
          "Heat without safety goggles.",
          "Hold a heated tube with bare fingers.",
          "Point the opening at yourself or a neighbour.",
          "Lean over glassware being heated."
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
      },
      {
        "kind": "help",
        "title": "⑤ If a splash reaches the eyes",
        "body": "Tell your teacher immediately. Start rinsing with running water at once for at least 15 minutes and get medical help. Do not rub your eyes."
      }
    ]
  }
};
SafetySituations.decorate(SituationB);
{const title=Object.fromEntries(Object.entries(SituationB.copy).map(([lang,c])=>[lang,c.title]));IntroData.tasks.find(t=>t.id===SituationB.id).title=title;IntroData.dangers.find(d=>d.id===SituationB.id).title=title;CourseData.topics.find(t=>t.id==='intro').steps.experiments.find(e=>e.key===SituationB.id).title=title;}
{const d=IntroData.dangers.find(d=>d.id===SituationB.id);d.danger=[1,0,2].map(i=>Object.fromEntries(Object.entries(SituationB.copy).map(([lang,t])=>[lang,t.risks[i]])));d.actions=[4,5,0].map(i=>Object.fromEntries(Object.entries(SituationB.copy).map(([lang,t])=>[lang,t.actions[i]])));}
