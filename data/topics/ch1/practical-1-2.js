/* Coordinates are percentages of the original 1376 × 768 room photograph. */
const ROOM_HOTSPOTS={
  "test-tube": {
    "x": 21.2,
    "y": 70.3,
    "w": 11.5,
    "h": 20.8
  },
  "beaker": {
    "x": 33.6,
    "y": 72.3,
    "w": 6.8,
    "h": 15.8
  },
  "evaporating-dish": {
    "x": 42.0,
    "y": 76.3,
    "w": 9.3,
    "h": 10.2
  },
  "conical-flask": {
    "x": 52.2,
    "y": 65.8,
    "w": 6.3,
    "h": 19.5
  },
  "funnel": {
    "x": 60.2,
    "y": 60.3,
    "w": 7.3,
    "h": 24.1
  },
  "measuring-cylinder": {
    "x": 68.6,
    "y": 51.4,
    "w": 5.1,
    "h": 31.1
  },
  "tripod-gauze": {
    "x": 78.5,
    "y": 30.7,
    "w": 11.0,
    "h": 37.0
  },
  "retort-stand": {
    "x": 88.7,
    "y": 30.5,
    "w": 5.1,
    "h": 39.3
  },
  "cuso4-solution": {
    "x": 93.0,
    "y": 56.2,
    "w": 5.2,
    "h": 12.0
  }
};
const Practical12Data=(()=>{const content={
 "copy": {
  "ru": {
   "heading": "Лабораторное оборудование",
   "overline": "ГЛАВА 1 · ПРАКТИЧЕСКАЯ РАБОТА 1.2",
   "goal": "Цель: познакомиться с оборудованием, научиться изображать его и собирать установку по схеме",
   "equipment": "Оборудование и реактивы: стакан, выпарительная чашка, сетка, штатив, горелка Бунзена, раствор сульфата меди (II), вода",
   "skills": "Навыки: коммуникация · наблюдение · идентификация · правильное использование оборудования",
   "welcome": "Добро пожаловать в лабораторию! Нажимай на предметы на столе — я расскажу, что это 🧪",
   "what": "Что это?",
   "later": "Понадобится в задании 2",
   "resetCamera": "Общий вид",
   "roomAlt": "Химическая лаборатория: шесть приборов на переднем столе и установка на боковом",
   "instruction": "Изучи оборудование в таблице. Напиши название каждого прибора и нарисуй его схематическое изображение.",
   "counts": "Названия: {names} / 6 · Схемы: {drawings} / 6",
   "object": "Оборудование",
   "scheme": "Схема",
   "name": "Название:",
   "placeholder": "Напиши название…",
   "inspect": "Рассмотреть предмет {n}",
   "pen": "Карандаш",
   "eraser": "Ластик",
   "undo": "Отменить",
   "clear": "Очистить",
   "outline": "Подсказка-контур",
   "compare": "Сравнить",
   "reference": "Эталонная схема",
   "drawLabel": "Нарисуй схему предмета {n}",
   "drawMore": "Нарисуй схему на холсте, затем нажми «Сравнить». Нужна линия не короче 30 точек.",
   "compared": "Схема сравнена ✓",
   "praise": "Хорошая работа! Сравни свой рисунок с образцом: важны форма и основные детали.",
   "correct": "Верно! Название принято ✓",
   "hint": "Подсказка: начинается с «{letter}». {purpose}",
   "show": "Показать ответ",
   "shown": "Ответ показан — без XP. Теперь нарисуй схему.",
   "download": "Скачать мои схемы",
   "allDone": "Ты знаешь всё оборудование! Дальше — соберём установку 👇",
   "soon": "Скоро",
   "assembly": "Собрать установку по схеме",
   "labels": "Подписать установку",
   "pending": "Это задание появится в следующем обновлении.",
   "nextLocked": "1.3 → После всех заданий работы 1.2",
   "close": "Закрыть",
   "purpose": "Для чего",
   "material": "Из чего",
   "safe": "Как пользоваться",
   "loadError": "Не удалось загрузить лабораторию. Повторить загрузку",
   "saved": "Названия и рисунки сохраняются автоматически.",
   "coordinates": "Координаты зоны"
  },
  "en": {
   "heading": "Laboratory equipment",
   "overline": "CHAPTER 1 · PRACTICAL WORK 1.2",
   "goal": "Goal: identify equipment, draw it and build an apparatus from a diagram",
   "equipment": "Equipment and reagents: beaker, evaporating dish, gauze, stand, Bunsen burner, copper(II) sulfate solution, water",
   "skills": "Skills: communication · observation · identification · safe use of equipment",
   "welcome": "Welcome to the laboratory! Tap objects on the table to learn what they do 🧪",
   "what": "What is this?",
   "later": "You will need this in Task 2",
   "resetCamera": "Room view",
   "roomAlt": "Chemistry laboratory with six instruments on the front bench and apparatus on the side bench",
   "instruction": "Study the equipment. Write each instrument’s name and draw a simple diagram.",
   "counts": "Names: {names} / 6 · Diagrams: {drawings} / 6",
   "object": "Equipment",
   "scheme": "Diagram",
   "name": "Name:",
   "placeholder": "Write the name…",
   "inspect": "Inspect instrument {n}",
   "pen": "Pencil",
   "eraser": "Eraser",
   "undo": "Undo",
   "clear": "Clear",
   "outline": "Outline hint",
   "compare": "Compare",
   "reference": "Reference diagram",
   "drawLabel": "Draw a diagram of instrument {n}",
   "drawMore": "Draw on the canvas, then choose Compare. Your line needs at least 30 points.",
   "compared": "Diagram compared ✓",
   "praise": "Good work! Compare your drawing with the reference: look at the shape and main details.",
   "correct": "Correct! Name accepted ✓",
   "hint": "Hint: starts with “{letter}”. {purpose}",
   "show": "Show answer",
   "shown": "Answer shown — no XP. Now draw the diagram.",
   "download": "Download my diagrams",
   "allDone": "You know all the equipment! Next we will assemble an apparatus 👇",
   "soon": "Coming soon",
   "assembly": "Assemble an apparatus from a diagram",
   "labels": "Label the apparatus",
   "pending": "This task will arrive in the next update.",
   "nextLocked": "1.3 → After all tasks in practical work 1.2",
   "close": "Close",
   "purpose": "Purpose",
   "material": "Material",
   "safe": "Safe use",
   "loadError": "Could not load the laboratory. Retry",
   "saved": "Names and drawings are saved automatically.",
   "coordinates": "Zone coordinates"
  },
  "uz-Latn": {
   "heading": "Laboratoriya jihozlari",
   "overline": "1-BOB · 1.2-AMALIY ISH",
   "goal": "Maqsad: jihozlarni tanish, ularning sxemasini chizish va sxema bo‘yicha qurilma yig‘ish",
   "equipment": "Jihoz va reaktivlar: stakan, bug‘latish idishi, to‘r, shtativ, Bunzen gorelkasi, mis(II) sulfat eritmasi, suv",
   "skills": "Ko‘nikmalar: muloqot · kuzatish · aniqlash · jihozlardan to‘g‘ri foydalanish",
   "welcome": "Laboratoriyaga xush kelibsan! Stoldagi jihozlarni bos — nima uchun kerakligini aytaman 🧪",
   "what": "Bu nima?",
   "later": "2-topshiriqda kerak bo‘ladi",
   "resetCamera": "Umumiy ko‘rinish",
   "roomAlt": "Old stolda oltita jihoz va yon stolda qurilma turgan kimyo laboratoriyasi",
   "instruction": "Jadvaldagi jihozlarni o‘rgan. Har birining nomini yoz va sxemasini chiz.",
   "counts": "Nomlar: {names} / 6 · Sxemalar: {drawings} / 6",
   "object": "Jihoz",
   "scheme": "Sxema",
   "name": "Nomi:",
   "placeholder": "Nomini yoz…",
   "inspect": "{n}-jihozni ko‘rish",
   "pen": "Qalam",
   "eraser": "O‘chirg‘ich",
   "undo": "Bekor qilish",
   "clear": "Tozalash",
   "outline": "Kontur yordami",
   "compare": "Taqqoslash",
   "reference": "Namuna sxema",
   "drawLabel": "{n}-jihoz sxemasini chiz",
   "drawMore": "Avval sxemani chiz, so‘ng Taqqoslashni bos. Chiziqda kamida 30 nuqta bo‘lsin.",
   "compared": "Sxema taqqoslandi ✓",
   "praise": "Barakalla! Rasmingni namuna bilan solishtir: shakl va asosiy qismlarga qaragin.",
   "correct": "To‘g‘ri! Nom qabul qilindi ✓",
   "hint": "Yordam: «{letter}» bilan boshlanadi. {purpose}",
   "show": "Javobni ko‘rsatish",
   "shown": "Javob ko‘rsatildi — XP berilmaydi. Endi sxemani chiz.",
   "download": "Sxemalarimni yuklab olish",
   "allDone": "Barcha jihozlarni bilasan! Endi qurilma yig‘amiz 👇",
   "soon": "Tez kunda",
   "assembly": "Sxema bo‘yicha qurilma yig‘ish",
   "labels": "Qurilma qismlarini nomlash",
   "pending": "Bu topshiriq keyingi yangilanishda paydo bo‘ladi.",
   "nextLocked": "1.3 → 1.2-amaliy ishning barcha topshiriqlaridan so‘ng",
   "close": "Yopish",
   "purpose": "Vazifasi",
   "material": "Nimadan yasalgan",
   "safe": "Foydalanish",
   "loadError": "Laboratoriya yuklanmadi. Qayta yuklash",
   "saved": "Nomlar va rasmlar avtomatik saqlanadi.",
   "coordinates": "Zona koordinatalari"
  },
  "uz-Cyrl": {
   "heading": "Лаборатория жиҳозлари",
   "overline": "1-БОБ · 1.2-АМАЛИЙ ИСҲ",
   "goal": "Мақсад: жиҳозларни таниш, уларнинг схемасини чизиш ва схема бўйича қурилма йиғиш",
   "equipment": "Жиҳоз ва реактивлар: стакан, буғлатиш идиши, тўр, штатив, Бунзен горелкаси, мис(ИИ) сулфат еритмаси, сув",
   "skills": "Кўникмалар: мулоқот · кузатиш · аниқлаш · жиҳозлардан тўғри фойдаланиш",
   "welcome": "Лабораторияга хуш келибсан! Столдаги жиҳозларни бос — нима учун кераклигини айтаман 🧪",
   "what": "Бу нима?",
   "later": "2-топшириқда керак бўлади",
   "resetCamera": "Умумий кўриниш",
   "roomAlt": "Олд столда олтита жиҳоз ва ён столда қурилма турган кимё лабораторияси",
   "instruction": "Жадвалдаги жиҳозларни ўрган. Ҳар бирининг номини ёз ва схемасини чиз.",
   "counts": "Номлар: {намес} / 6 · Схемалар: {драwингс} / 6",
   "object": "Жиҳоз",
   "scheme": "Схема",
   "name": "Номи:",
   "placeholder": "Номини ёз…",
   "inspect": "{н}-жиҳозни кўриш",
   "pen": "Қалам",
   "eraser": "Ўчирғич",
   "undo": "Бекор қилиш",
   "clear": "Тозалаш",
   "outline": "Контур ёрдами",
   "compare": "Таққослаш",
   "reference": "Намуна схема",
   "drawLabel": "{н}-жиҳоз схемасини чиз",
   "drawMore": "Аввал схемани чиз, сўнг Таққослашни бос. Чизиқда камида 30 нуқта бўлсин.",
   "compared": "Схема таққосланди ✓",
   "praise": "Баракалла! Расмингни намуна билан солиштир: шакл ва асосий қисмларга қарагин.",
   "correct": "Тўғри! Ном қабул қилинди ✓",
   "hint": "Ёрдам: «{леттер}» билан бошланади. {пурпосе}",
   "show": "Жавобни кўрсатиш",
   "shown": "Жавоб кўрсатилди — ХП берилмайди. Енди схемани чиз.",
   "download": "Схемаларимни юклаб олиш",
   "allDone": "Барча жиҳозларни биласан! Енди қурилма йиғамиз 👇",
   "soon": "Тез кунда",
   "assembly": "Схема бўйича қурилма йиғиш",
   "labels": "Қурилма қисмларини номлаш",
   "pending": "Бу топшириқ кейинги янгиланишда пайдо бўлади.",
   "nextLocked": "1.3 → 1.2-амалий ишнинг барча топшириқларидан сўнг",
   "close": "Ёпиш",
   "purpose": "Вазифаси",
   "material": "Нимадан ясалган",
   "safe": "Фойдаланиш",
   "loadError": "Лаборатория юкланмади. Қайта юклаш",
   "saved": "Номлар ва расмлар автоматик сақланади.",
   "coordinates": "Зона координаталари"
  }
 },
 "items": [
  {
   "id": "test-tube",
   "name": {
    "ru": "Пробирка",
    "en": "Test tube",
    "uz-Latn": "Probirka",
    "uz-Cyrl": "Пробирка"
   },
   "aliases": {
    "ru": [
     "пробирка"
    ],
    "en": [
     "test tube",
     "test-tube"
    ],
    "uz-Latn": [
     "probirka"
    ],
    "uz-Cyrl": [
     "пробирка"
    ]
   },
   "purpose": {
    "ru": "Для опытов с небольшим количеством вещества.",
    "en": "For experiments with small amounts of substances.",
    "uz-Latn": "Oz miqdordagi moddalar bilan tajriba uchun.",
    "uz-Cyrl": "Оз миқдордаги моддалар билан тажриба учун."
   },
   "material": {
    "ru": "Термостойкое стекло.",
    "en": "Heat-resistant glass.",
    "uz-Latn": "Issiqqa chidamli shisha.",
    "uz-Cyrl": "Иссиққа чидамли шиша."
   },
   "safe": {
    "ru": "При нагревании используй держатель и направляй отверстие от людей.",
    "en": "Use a holder when heating and point the opening away from people.",
    "uz-Latn": "Isitishda tutqichdan foydalan, og‘zini odamlardan chetga yo‘naltir.",
    "uz-Cyrl": "Иситишда тутқичдан фойдалан, оғзини одамлардан четга йўналтир."
   },
   "outline": "<path d=\"M82 32h56M90 33v137q20 33 40 0V33\"/>",
   "image": "assets/lab/1-2/test-tube.webp"
  },
  {
   "id": "beaker",
   "name": {
    "ru": "Химический стакан",
    "en": "Beaker",
    "uz-Latn": "Kimyoviy stakan",
    "uz-Cyrl": "Кимёвий стакан"
   },
   "aliases": {
    "ru": [
     "стакан",
     "химический стакан",
     "лабораторный стакан"
    ],
    "en": [
     "beaker",
     "laboratory beaker"
    ],
    "uz-Latn": [
     "stakan",
     "kimyoviy stakan",
     "laboratoriya stakani"
    ],
    "uz-Cyrl": [
     "стакан",
     "кимёвий стакан",
     "лаборатория стакани"
    ]
   },
   "purpose": {
    "ru": "Для смешивания и нагревания жидкостей.",
    "en": "For mixing and heating liquids.",
    "uz-Latn": "Suyuqliklarni aralashtirish va isitish uchun.",
    "uz-Cyrl": "Суюқликларни аралаштириш ва иситиш учун."
   },
   "material": {
    "ru": "Термостойкое стекло.",
    "en": "Heat-resistant glass.",
    "uz-Latn": "Issiqqa chidamli shisha.",
    "uz-Cyrl": "Иссиққа чидамли шиша."
   },
   "safe": {
    "ru": "Не трогай горячий стакан руками; деления дают лишь примерный объём.",
    "en": "Do not touch a hot beaker; its marks give only an approximate volume.",
    "uz-Latn": "Issiq stakanga qo‘l tekkizma; bo‘linmalar taxminiy hajmni ko‘rsatadi.",
    "uz-Cyrl": "Иссиқ стаканга қўл теккизма; бўлинмалар тахминий ҳажмни кўрсатади."
   },
   "outline": "<path d=\"M58 48h110l-14 14v123H64V62l-6-14m27 40h22m-22 23h15m-15 23h22\"/>",
   "image": "assets/lab/1-2/beaker.webp"
  },
  {
   "id": "evaporating-dish",
   "name": {
    "ru": "Выпарительная чашка",
    "en": "Evaporating dish",
    "uz-Latn": "Bug‘latish idishi",
    "uz-Cyrl": "Буғлатиш идиши"
   },
   "aliases": {
    "ru": [
     "выпарительная чашка",
     "фарфоровая чашка",
     "чашка для выпаривания"
    ],
    "en": [
     "evaporating dish",
     "porcelain dish",
     "evaporation dish"
    ],
    "uz-Latn": [
     "chinni idish",
     "bug‘latish idishi",
     "buglatish idishi"
    ],
    "uz-Cyrl": [
     "чинни идиш",
     "буғлатиш идиши",
     "буглатиш идиши"
    ]
   },
   "purpose": {
    "ru": "Для выпаривания раствора и получения твёрдого остатка.",
    "en": "For evaporating a solution to obtain a solid residue.",
    "uz-Latn": "Eritmani bug‘latib, qattiq qoldiq olish uchun.",
    "uz-Cyrl": "Еритмани буғлатиб, қаттиқ қолдиқ олиш учун."
   },
   "material": {
    "ru": "Фарфор.",
    "en": "Porcelain.",
    "uz-Latn": "Chinni.",
    "uz-Cyrl": "Чинни."
   },
   "safe": {
    "ru": "Нагревай постепенно. Горячую чашку бери щипцами.",
    "en": "Heat gently. Use tongs to handle a hot dish.",
    "uz-Latn": "Asta isit. Issiq idishni qisqich bilan ol.",
    "uz-Cyrl": "Аста исит. Иссиқ идишни қисқич билан ол."
   },
   "outline": "<path d=\"M35 90h150q-10 80-75 80T35 90Zm0 0q75-24 150 0\"/>",
   "image": "assets/lab/1-2/evaporating-dish.webp"
  },
  {
   "id": "conical-flask",
   "name": {
    "ru": "Коническая колба",
    "en": "Conical flask",
    "uz-Latn": "Konussimon kolba",
    "uz-Cyrl": "Конуссимон колба"
   },
   "aliases": {
    "ru": [
     "коническая колба",
     "колба эрленмейера",
     "колба"
    ],
    "en": [
     "conical flask",
     "erlenmeyer flask",
     "flask"
    ],
    "uz-Latn": [
     "konussimon kolba",
     "kolba"
    ],
    "uz-Cyrl": [
     "конуссимон колба",
     "колба"
    ]
   },
   "purpose": {
    "ru": "Для смешивания растворов круговыми движениями.",
    "en": "For mixing solutions by swirling.",
    "uz-Latn": "Eritmalarni aylantirib aralashtirish uchun.",
    "uz-Cyrl": "Еритмаларни айлантириб аралаштириш учун."
   },
   "material": {
    "ru": "Термостойкое стекло.",
    "en": "Heat-resistant glass.",
    "uz-Latn": "Issiqqa chidamli shisha.",
    "uz-Cyrl": "Иссиққа чидамли шиша."
   },
   "safe": {
    "ru": "Держи за горлышко. Не нагревай закрытую колбу.",
    "en": "Hold by the neck. Never heat a sealed flask.",
    "uz-Latn": "Bo‘ynidan tut. Yopiq kolbani isitma.",
    "uz-Cyrl": "Бўйнидан тут. Ёпиқ колбани иситма."
   },
   "outline": "<path d=\"M91 30h38m-32 0v57l-48 100h122L123 87V30\"/>",
   "image": "assets/lab/1-2/conical-flask.webp"
  },
  {
   "id": "funnel",
   "name": {
    "ru": "Воронка",
    "en": "Funnel",
    "uz-Latn": "Voronka",
    "uz-Cyrl": "Воронка"
   },
   "aliases": {
    "ru": [
     "воронка",
     "химическая воронка"
    ],
    "en": [
     "funnel",
     "filter funnel"
    ],
    "uz-Latn": [
     "voronka",
     "kimyoviy voronka"
    ],
    "uz-Cyrl": [
     "воронка",
     "кимёвий воронка"
    ]
   },
   "purpose": {
    "ru": "Для переливания жидкостей и фильтрования с бумажным фильтром.",
    "en": "For pouring liquids and filtering with filter paper.",
    "uz-Latn": "Suyuqlik quyish va qog‘oz filtr bilan filtrlash uchun.",
    "uz-Cyrl": "Суюқлик қуйиш ва қоғоз филтр билан филтрлаш учун."
   },
   "material": {
    "ru": "Стекло или химически стойкий пластик.",
    "en": "Glass or chemically resistant plastic.",
    "uz-Latn": "Shisha yoki kimyoviy chidamli plastmassa.",
    "uz-Cyrl": "Шиша ёки кимёвий чидамли пластмасса."
   },
   "safe": {
    "ru": "Закрепи воронку. Наливай медленно, не переполняя фильтр.",
    "en": "Support the funnel. Pour slowly without overfilling the filter.",
    "uz-Latn": "Voronkani mahkamla. Filtrni to‘ldirib yubormay, asta quy.",
    "uz-Cyrl": "Воронкани маҳкамла. Филтрни тўлдириб юбормай, аста қуй."
   },
   "outline": "<path d=\"M40 45h140l-59 78v63H99v-63L40 45Z\"/>",
   "image": "assets/lab/1-2/funnel.webp"
  },
  {
   "id": "measuring-cylinder",
   "name": {
    "ru": "Мерный цилиндр",
    "en": "Measuring cylinder",
    "uz-Latn": "O‘lchov silindri",
    "uz-Cyrl": "Ўлчов силиндри"
   },
   "aliases": {
    "ru": [
     "мерный цилиндр",
     "цилиндр"
    ],
    "en": [
     "measuring cylinder",
     "graduated cylinder",
     "cylinder"
    ],
    "uz-Latn": [
     "o‘lchov silindri",
     "olchov silindri",
     "silindr"
    ],
    "uz-Cyrl": [
     "ўлчов силиндри",
     "олчов силиндри",
     "силиндр"
    ]
   },
   "purpose": {
    "ru": "Для измерения объёма жидкости.",
    "en": "For measuring the volume of a liquid.",
    "uz-Latn": "Suyuqlik hajmini o‘lchash uchun.",
    "uz-Cyrl": "Суюқлик ҳажмини ўлчаш учун."
   },
   "material": {
    "ru": "Стекло или прозрачный пластик.",
    "en": "Glass or transparent plastic.",
    "uz-Latn": "Shisha yoki shaffof plastmassa.",
    "uz-Cyrl": "Шиша ёки шаффоф пластмасса."
   },
   "safe": {
    "ru": "Поставь ровно и читай объём по нижнему краю мениска на уровне глаз. Не нагревай.",
    "en": "Stand it upright. Read the bottom of the meniscus at eye level. Do not heat.",
    "uz-Latn": "Tekis qo‘y. Meniskning pastki chetini ko‘z balandligida o‘qi. Isitma.",
    "uz-Cyrl": "Текис қўй. Менискнинг пастки четини кўз баландлигида ўқи. Иситма."
   },
   "outline": "<path d=\"M89 26h45l-6 9v147H92V35l-3-9M71 189h78m-42-140h20m-14 22h14m-20 22h20m-14 22h14m-20 22h20m-14 22h14\"/>",
   "image": "assets/lab/1-2/measuring-cylinder.webp"
  }
 ]
};

 const normalize=s=>String(s??'').normalize('NFKC').toLowerCase().replace(/ё/g,'е').replace(/[‘’ʻʼ`´]/g,"'").replace(/[–-]/g,' ').replace(/\s+/g,' ').trim();
 const accepts=(id,value,language)=>{const item=content.items.find(i=>i.id===id);return !!item&&(item.aliases[language]||item.aliases.ru).some(v=>normalize(v)===normalize(value));};
 function cover(width,height,positionY=.5){const scale=Math.max(width/1376,height/768);return {scale,width:1376*scale,height:768*scale,left:(width-1376*scale)*.5,top:(height-768*scale)*positionY};}
 function projectZone(zone,width,height,positionY=.5){const p=cover(width,height,positionY),x=p.left+zone.x/100*p.width,y=p.top+zone.y/100*p.height,w=zone.w/100*p.width,h=zone.h/100*p.height;return {x,y,w,h,cx:x+w/2,cy:y+h/2};}
 const blank=()=>({version:1,rows:{},setup:typeof Setup12Data==='undefined'?null:Setup12Data.blank()});
 function sanitize(v){const out=blank();if(v?.version!==1)return out;if(typeof Setup12Data!=='undefined')out.setup=Setup12Data.sanitize(v.setup);for(const item of content.items){const r=v.rows?.[item.id];if(!r)continue;let budget=4000;const strokes=Array.isArray(r.strokes)?r.strokes.slice(-100).map(s=>({tool:s.tool==='eraser'?'eraser':'pen',points:Array.isArray(s.points)?s.points.slice(0,Math.max(0,budget)).filter(p=>Array.isArray(p)&&p.length===2&&p.every(n=>Number.isFinite(n)&&n>=0&&n<=220)).map(p=>{budget--;return p;}):[]})):[];out.rows[item.id]={name:typeof r.name==='string'?r.name.slice(0,100):'',named:r.named===true,revealed:r.revealed===true,earned:r.earned===true,errors:Number.isFinite(r.errors)?Math.min(100,Math.max(0,r.errors)):0,strokes,png:typeof r.png==='string'&&r.png.length<150000&&/^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(r.png)?r.png:'',compared:r.compared===true&&strokes.filter(s=>s.tool==='pen').reduce((n,s)=>n+s.points.length,0)>=30};}return out;}
 function proofValid(p){return p?.version===1&&content.items.every(i=>p.rows?.[i.id]?.named===true&&p.rows[i.id].compared===true&&Number.isFinite(p.rows[i.id].points)&&p.rows[i.id].points>=30);}
 return {...content,hotspots:ROOM_HOTSPOTS,normalize,accepts,cover,projectZone,blank,sanitize,proofValid};
})();
