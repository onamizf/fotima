/* Water-bath learning data, completion criteria and bounded persisted diagram. */
const Setup12Data=(()=>{const content={
 "copy": {
  "ru": {
   "instruction": "Рассмотри установку для проведения опыта. Нажми на неё, чтобы разобрать на части, изучи каждую деталь и нарисуй схему установки в поле ниже.",
   "welcome": "Это водяная баня. Нажми на установку — она разберётся на детали!",
   "explode": "🔧 Разобрать",
   "assemble": "🔩 Собрать",
   "scrub": "Разборка",
   "reset": "Вернуть камеру",
   "viewLabel": "Интерактивная установка: водяная баня",
   "loading": "Загружаем 3D-установку…",
   "fallback": "Просмотр без WebGL: разбери установку кнопкой и изучи детали по подписям.",
   "parts": "Детали установки",
   "studied": "Изучено деталей: {n} / 9",
   "studyHint": "Нажми на деталь или её название, чтобы изучить её.",
   "back": "← Ко всем деталям",
   "what": "Что это",
   "why": "Зачем в этой установке",
   "safe": "Как правильно",
   "next": "Дальше →",
   "understood": "Понятно ✓",
   "diagram": "Нарисуй схему установки",
   "diagramHint": "Нарисуй линии или добавь не меньше 5 штампов. Размести не меньше 5 разных подписей и сравни с эталоном.",
   "pen": "Карандаш",
   "line": "Прямая линия",
   "eraser": "Ластик",
   "undo": "Отменить",
   "clear": "Очистить",
   "outline": "Подсказка-контур",
   "stamps": "Детали схемы",
   "labels": "Подписи",
   "dropHint": "Перетащи на поле или нажми на штамп/подпись, затем на нужное место. Выделенный элемент можно двигать и менять его размер.",
   "compare": "Сравнить с эталоном",
   "reference": "Эталонная схема",
   "download": "Скачать мою схему (PNG)",
   "incomplete": "Добавь рисунок не короче 30 точек линии или 5 штампов, а также 5 разных подписей.",
   "compared": "Схема сравнена с эталоном ✓",
   "success": "Отличная схема! 👍 Ты разобрал установку и изучил её детали.",
   "progressHint": "Для выполнения: разбери установку, изучи 6 деталей и сравни подписанную схему.",
   "completed": "Задание 2 выполнено · +15 XP",
   "scale": "Размер штампа",
   "remove": "Удалить выделенное",
   "drawingLabel": "Поле для схемы водяной бани",
   "waterline": "Уровень жидкости",
   "stand": "Штатив с лапкой"
  },
  "en": {
   "instruction": "Look at the apparatus. Tap it to separate the parts, explore each part and draw a diagram below.",
   "welcome": "This is a water bath. Tap the apparatus to separate it into parts!",
   "explode": "🔧 Separate parts",
   "assemble": "🔩 Assemble",
   "scrub": "Separation",
   "reset": "Reset camera",
   "viewLabel": "Interactive water-bath apparatus",
   "loading": "Loading the 3D apparatus…",
   "fallback": "View without WebGL: use the button to separate the apparatus and explore its labelled parts.",
   "parts": "Apparatus parts",
   "studied": "Parts explored: {n} / 9",
   "studyHint": "Tap a part or its label to explore it.",
   "back": "← All parts",
   "what": "What it is",
   "why": "Its role in this apparatus",
   "safe": "Safe use",
   "next": "Next →",
   "understood": "Understood ✓",
   "diagram": "Draw the apparatus diagram",
   "diagramHint": "Draw lines or add at least 5 stamps. Place at least 5 different labels, then compare with the reference.",
   "pen": "Pencil",
   "line": "Straight line",
   "eraser": "Eraser",
   "undo": "Undo",
   "clear": "Clear",
   "outline": "Outline hint",
   "stamps": "Diagram stamps",
   "labels": "Labels",
   "dropHint": "Drag onto the board, or select a stamp or label and tap where to place it. Move selected elements and resize stamps.",
   "compare": "Compare with reference",
   "reference": "Reference diagram",
   "download": "Download my diagram (PNG)",
   "incomplete": "Add a drawing with at least 30 line points or 5 stamps, plus 5 different labels.",
   "compared": "Diagram compared with the reference ✓",
   "success": "Great diagram! 👍 You separated the apparatus and explored its parts.",
   "progressHint": "To finish: separate the apparatus, explore 6 parts and compare a labelled diagram.",
   "completed": "Task 2 completed · +15 XP",
   "scale": "Stamp size",
   "remove": "Delete selected element",
   "drawingLabel": "Water-bath diagram board",
   "waterline": "Liquid level",
   "stand": "Stand and clamp"
  },
  "uz-Latn": {
   "instruction": "Tajriba qurilmasini ko‘r. Uni qismlarga ajratish uchun bos, har bir qismini o‘rgan va pastda sxemasini chiz.",
   "welcome": "Bu suv hammomi. Qurilmani bos — u qismlarga ajraladi!",
   "explode": "🔧 Qismlarga ajratish",
   "assemble": "🔩 Yig‘ish",
   "scrub": "Ajratish",
   "reset": "Kamerani tiklash",
   "viewLabel": "Interaktiv suv hammomi qurilmasi",
   "loading": "3D qurilma yuklanmoqda…",
   "fallback": "WebGLsiz ko‘rinish: tugma bilan qurilmani ajrat va yozuvlar orqali qismlarini o‘rgan.",
   "parts": "Qurilma qismlari",
   "studied": "O‘rganilgan qismlar: {n} / 9",
   "studyHint": "Qismni o‘rganish uchun uning o‘zini yoki nomini bos.",
   "back": "← Barcha qismlar",
   "what": "Bu nima",
   "why": "Qurilmadagi vazifasi",
   "safe": "To‘g‘ri foydalanish",
   "next": "Keyingi →",
   "understood": "Tushunarli ✓",
   "diagram": "Qurilma sxemasini chiz",
   "diagramHint": "Chiziqlar chiz yoki kamida 5 ta shtamp qo‘sh. Kamida 5 xil yozuv joylashtirib, namuna bilan taqqosla.",
   "pen": "Qalam",
   "line": "To‘g‘ri chiziq",
   "eraser": "O‘chirg‘ich",
   "undo": "Bekor qilish",
   "clear": "Tozalash",
   "outline": "Kontur yordami",
   "stamps": "Sxema qismlari",
   "labels": "Yozuvlar",
   "dropHint": "Maydonga tortib qo‘y yoki shtamp/yozuvni tanlab, kerakli joyni bos. Tanlangan qismni surish va kattalashtirish mumkin.",
   "compare": "Namuna bilan taqqoslash",
   "reference": "Namuna sxema",
   "download": "Sxemamni yuklab olish (PNG)",
   "incomplete": "Kamida 30 nuqtali chiziq yoki 5 shtamp va 5 xil yozuv qo‘sh.",
   "compared": "Sxema namuna bilan taqqoslandi ✓",
   "success": "Ajoyib sxema! 👍 Qurilmani ajratib, qismlarini o‘rganding.",
   "progressHint": "Bajarish uchun qurilmani ajrat, 6 qismni o‘rgan va yozuvli sxemani taqqosla.",
   "completed": "2-topshiriq bajarildi · +15 XP",
   "scale": "Shtamp o‘lchami",
   "remove": "Tanlangan qismni o‘chirish",
   "drawingLabel": "Suv hammomi sxemasini chizish maydoni",
   "waterline": "Suyuqlik sathi",
   "stand": "Qisqichli shtativ"
  },
  "uz-Cyrl": {
   "instruction": "Тажриба қурилмасини кўр. Уни қисмларга ажратиш учун бос, ҳар бир қисмини ўрган ва пастда схемасини чиз.",
   "welcome": "Бу сув ҳаммоми. Қурилмани бос — у қисмларга ажралади!",
   "explode": "🔧 Қисмларга ажратиш",
   "assemble": "🔩 Йиғиш",
   "scrub": "Ажратиш",
   "reset": "Камерани тиклаш",
   "viewLabel": "Интерактив сув ҳаммоми қурилмаси",
   "loading": "3Д қурилма юкланмоқда…",
   "fallback": "WебГЛсиз кўриниш: тугма билан қурилмани ажрат ва ёзувлар орқали қисмларини ўрган.",
   "parts": "Қурилма қисмлари",
   "studied": "Ўрганилган қисмлар: {н} / 9",
   "studyHint": "Қисмни ўрганиш учун унинг ўзини ёки номини бос.",
   "back": "← Барча қисмлар",
   "what": "Бу нима",
   "why": "Қурилмадаги вазифаси",
   "safe": "Тўғри фойдаланиш",
   "next": "Кейинги →",
   "understood": "Тушунарли ✓",
   "diagram": "Қурилма схемасини чиз",
   "diagramHint": "Чизиқлар чиз ёки камида 5 та штамп қўш. Камида 5 хил ёзув жойлаштириб, намуна билан таққосла.",
   "pen": "Қалам",
   "line": "Тўғри чизиқ",
   "eraser": "Ўчирғич",
   "undo": "Бекор қилиш",
   "clear": "Тозалаш",
   "outline": "Контур ёрдами",
   "stamps": "Схема қисмлари",
   "labels": "Ёзувлар",
   "dropHint": "Майдонга тортиб қўй ёки штамп/ёзувни танлаб, керакли жойни бос. Танланган қисмни суриш ва катталаштириш мумкин.",
   "compare": "Намуна билан таққослаш",
   "reference": "Намуна схема",
   "download": "Схемамни юклаб олиш (ПНГ)",
   "incomplete": "Камида 30 нуқтали чизиқ ёки 5 штамп ва 5 хил ёзув қўш.",
   "compared": "Схема намуна билан таққосланди ✓",
   "success": "Ажойиб схема! 👍 Қурилмани ажратиб, қисмларини ўргандинг.",
   "progressHint": "Бажариш учун қурилмани ажрат, 6 қисмни ўрган ва ёзувли схемани таққосла.",
   "completed": "2-топшириқ бажарилди · +15 ХП",
   "scale": "Штамп ўлчами",
   "remove": "Танланган қисмни ўчириш",
   "drawingLabel": "Сув ҳаммоми схемасини чизиш майдони",
   "waterline": "Суюқлик сатҳи",
   "stand": "Қисқичли штатив"
  }
 },
 "parts": [
  {
   "id": "thermometer",
   "name": {
    "ru": "Термометр",
    "en": "Thermometer",
    "uz-Latn": "Termometr",
    "uz-Cyrl": "Термометр"
   },
   "facts": [
    {
     "ru": "Прибор для измерения температуры.",
     "en": "An instrument for measuring temperature.",
     "uz-Latn": "Haroratni o‘lchaydigan asbob.",
     "uz-Cyrl": "Ҳароратни ўлчайдиган асбоб."
    },
    {
     "ru": "Показывает температуру спирта внутри пробирки.",
     "en": "Measures the temperature of the alcohol inside the tube.",
     "uz-Latn": "Probirkadagi spirt haroratini ko‘rsatadi.",
     "uz-Cyrl": "Пробиркадаги спирт ҳароратини кўрсатади."
    },
    {
     "ru": "Резервуар должен быть в жидкости и не касаться стенок и дна пробирки.",
     "en": "Keep the bulb in the liquid, away from the tube walls and bottom.",
     "uz-Latn": "Rezervuar suyuqlik ichida bo‘lsin, devor va tubga tegmasin.",
     "uz-Cyrl": "Резервуар суюқлик ичида бўлсин, девор ва тубга тегмасин."
    }
   ]
  },
  {
   "id": "tube",
   "name": {
    "ru": "Термостойкая пробирка",
    "en": "Heat-resistant test tube",
    "uz-Latn": "Issiqqa chidamli probirka",
    "uz-Cyrl": "Иссиққа чидамли пробирка"
   },
   "facts": [
    {
     "ru": "Стеклянная пробирка, выдерживающая нагрев.",
     "en": "A glass test tube designed for heating.",
     "uz-Latn": "Isitishga chidamli shisha probirka.",
     "uz-Cyrl": "Иситишга чидамли шиша пробирка."
    },
    {
     "ru": "Содержит спирт и стоит в водяной бане, не касаясь дна стакана.",
     "en": "Holds alcohol in the water bath without touching the beaker bottom.",
     "uz-Latn": "Spirtni tutadi; suv hammomida stakan tubiga tegmay turadi.",
     "uz-Cyrl": "Спиртни тутади; сув ҳаммомида стакан тубига тегмай туради."
    },
    {
     "ru": "Лапка держит верхнюю треть. Отверстие направлено от людей.",
     "en": "Clamp the upper third and point the opening away from people.",
     "uz-Latn": "Yuqori uchdan bir qismini qisqich ushlasin; og‘zi odamlardan chetga qarasin.",
     "uz-Cyrl": "Юқори учдан бир қисмини қисқич ушласин; оғзи одамлардан четга қарасин."
    }
   ]
  },
  {
   "id": "alcohol",
   "name": {
    "ru": "Спирт",
    "en": "Alcohol",
    "uz-Latn": "Spirt",
    "uz-Cyrl": "Спирт"
   },
   "facts": [
    {
     "ru": "Легковоспламеняющаяся жидкость в пробирке.",
     "en": "A flammable liquid inside the test tube.",
     "uz-Latn": "Probirkadagi oson yonuvchi suyuqlik.",
     "uz-Cyrl": "Пробиркадаги осон ёнувчи суюқлик."
    },
    {
     "ru": "Нагревается постепенно за счёт горячей воды вокруг пробирки.",
     "en": "Warms gradually through the hot water surrounding the tube.",
     "uz-Latn": "Probirka atrofidagi issiq suv orqali asta isiydi.",
     "uz-Cyrl": "Пробирка атрофидаги иссиқ сув орқали аста исийди."
    },
    {
     "ru": "Спирт нельзя нагревать прямо на открытом пламени.",
     "en": "Never heat alcohol directly over an open flame.",
     "uz-Latn": "Spirtni ochiq alangada bevosita isitma.",
     "uz-Cyrl": "Спиртни очиқ алангада бевосита иситма."
    }
   ]
  },
  {
   "id": "beaker",
   "name": {
    "ru": "Стакан",
    "en": "Beaker",
    "uz-Latn": "Stakan",
    "uz-Cyrl": "Стакан"
   },
   "facts": [
    {
     "ru": "Термостойкий химический стакан.",
     "en": "A heat-resistant laboratory beaker.",
     "uz-Latn": "Issiqqa chidamli kimyoviy stakan.",
     "uz-Cyrl": "Иссиққа чидамли кимёвий стакан."
    },
    {
     "ru": "Вместе с водой образует водяную баню для равномерного нагревания.",
     "en": "With water, forms a bath for even heating.",
     "uz-Latn": "Suv bilan birga bir tekis isitadigan suv hammomini hosil qiladi.",
     "uz-Cyrl": "Сув билан бирга бир текис иситадиган сув ҳаммомини ҳосил қилади."
    },
    {
     "ru": "Ставь на сетку. Не трогай горячее стекло руками.",
     "en": "Place it on the gauze. Never touch hot glass with bare hands.",
     "uz-Latn": "To‘r ustiga qo‘y; issiq shishaga qo‘l tekkizma.",
     "uz-Cyrl": "Тўр устига қўй; иссиқ шишага қўл теккизма."
    }
   ]
  },
  {
   "id": "water",
   "name": {
    "ru": "Вода",
    "en": "Water",
    "uz-Latn": "Suv",
    "uz-Cyrl": "Сув"
   },
   "facts": [
    {
     "ru": "Жидкость, заполняющая часть стакана.",
     "en": "The liquid partly filling the beaker.",
     "uz-Latn": "Stakanning bir qismini to‘ldirgan suyuqlik.",
     "uz-Cyrl": "Стаканнинг бир қисмини тўлдирган суюқлик."
    },
    {
     "ru": "Передаёт тепло спирту равномерно, без прямого контакта с огнём.",
     "en": "Transfers heat evenly to the alcohol, without direct flame contact.",
     "uz-Latn": "Issiqlikni spirtga olovsiz bir tekis uzatadi.",
     "uz-Cyrl": "Иссиқликни спиртга оловсиз бир текис узатади."
    },
    {
     "ru": "Следи за уровнем воды; не допускай полного выкипания.",
     "en": "Watch the level and never allow the bath to boil dry.",
     "uz-Latn": "Suv sathini kuzat; butunlay qaynab tugashiga yo‘l qo‘yma.",
     "uz-Cyrl": "Сув сатҳини кузат; бутунлай қайнаб тугашига йўл қўйма."
    }
   ]
  },
  {
   "id": "gauze",
   "name": {
    "ru": "Проволочная сетка",
    "en": "Wire gauze",
    "uz-Latn": "Sim to‘r",
    "uz-Cyrl": "Сим тўр"
   },
   "facts": [
    {
     "ru": "Металлическая сетка с керамической серединой.",
     "en": "A metal mesh with a ceramic centre.",
     "uz-Latn": "O‘rtasi keramikali metall to‘r.",
     "uz-Cyrl": "Ўртаси керамикали металл тўр."
    },
    {
     "ru": "Распределяет тепло, чтобы стакан не лопнул от пламени.",
     "en": "Spreads heat to protect the beaker from uneven heating.",
     "uz-Latn": "Issiqlikni tarqatib, stakan yorilishining oldini oladi.",
     "uz-Cyrl": "Иссиқликни тарқатиб, стакан ёрилишининг олдини олади."
    },
    {
     "ru": "Положи ровно на треножник и дождись остывания после опыта.",
     "en": "Lay it flat on the tripod and let it cool after the experiment.",
     "uz-Latn": "Uchoyoqqa tekis qo‘y; tajribadan so‘ng sovishini kut.",
     "uz-Cyrl": "Учоёққа текис қўй; тажрибадан сўнг совишини кут."
    }
   ]
  },
  {
   "id": "tripod",
   "name": {
    "ru": "Треножник",
    "en": "Tripod",
    "uz-Latn": "Uchoyoq",
    "uz-Cyrl": "Учоёқ"
   },
   "facts": [
    {
     "ru": "Металлическая подставка на трёх ножках.",
     "en": "A metal support with three legs.",
     "uz-Latn": "Uch oyoqli metall taglik.",
     "uz-Cyrl": "Уч оёқли металл таглик."
    },
    {
     "ru": "Держит сетку и стакан над горелкой.",
     "en": "Supports the gauze and beaker above the burner.",
     "uz-Latn": "To‘r va stakanni gorelka ustida ushlab turadi.",
     "uz-Cyrl": "Тўр ва стаканни горелка устида ушлаб туради."
    },
    {
     "ru": "Поставь устойчиво на ровный стол до начала нагревания.",
     "en": "Place it firmly on a level bench before heating.",
     "uz-Latn": "Isitishdan oldin tekis stolga barqaror qo‘y.",
     "uz-Cyrl": "Иситишдан олдин текис столга барқарор қўй."
    }
   ]
  },
  {
   "id": "burner",
   "name": {
    "ru": "Горелка Бунзена (газовая)",
    "en": "Bunsen burner (gas)",
    "uz-Latn": "Bunzen gorelkasi (gazli)",
    "uz-Cyrl": "Бунзен горелкаси (газли)"
   },
   "facts": [
    {
     "ru": "Лабораторная газовая горелка с голубым пламенем.",
     "en": "A laboratory gas burner with a blue flame.",
     "uz-Latn": "Ko‘k alangali laboratoriya gaz gorelkasi.",
     "uz-Cyrl": "Кўк алангали лаборатория газ горелкаси."
    },
    {
     "ru": "Нагревает воду через сетку и дно стакана.",
     "en": "Heats the water through the gauze and beaker base.",
     "uz-Latn": "To‘r va stakan tubi orqali suvni isitadi.",
     "uz-Cyrl": "Тўр ва стакан туби орқали сувни иситади."
    },
    {
     "ru": "Работай только с учителем. Перед разборкой перекрой газ и дай деталям остыть.",
     "en": "Work under teacher supervision. Turn off the gas and let parts cool before dismantling.",
     "uz-Latn": "Faqat o‘qituvchi bilan ishla; ajratishdan oldin gazni yopib, sovishini kut.",
     "uz-Cyrl": "Фақат ўқитувчи билан ишла; ажратишдан олдин газни ёпиб, совишини кут."
    }
   ]
  },
  {
   "id": "stand",
   "name": {
    "ru": "Штатив с лапкой",
    "en": "Stand and clamp",
    "uz-Latn": "Qisqichli shtativ",
    "uz-Cyrl": "Қисқичли штатив"
   },
   "facts": [
    {
     "ru": "Основание, стержень и регулируемая лапка.",
     "en": "A base, upright rod and adjustable clamp.",
     "uz-Latn": "Taglik, tik sterjen va sozlanadigan qisqich.",
     "uz-Cyrl": "Таглик, тик стержен ва созланадиган қисқич."
    },
    {
     "ru": "Надёжно удерживает пробирку на нужной высоте.",
     "en": "Holds the test tube securely at the required height.",
     "uz-Latn": "Probirkani kerakli balandlikda mahkam tutadi.",
     "uz-Cyrl": "Пробиркани керакли баландликда маҳкам тутади."
    },
    {
     "ru": "Затяни винт без лишнего усилия, чтобы не раздавить стекло.",
     "en": "Tighten gently so you do not crush the glass.",
     "uz-Latn": "Shishani sindirmaslik uchun vintni ortiqcha kuchsiz tort.",
     "uz-Cyrl": "Шишани синдирмаслик учун винтни ортиқча кучсиз торт."
    }
   ]
  }
 ]
};

 const ids=content.parts.map(p=>p.id),stampIds=['stand','tube','thermometer','beaker','gauze','tripod','burner','waterline'];
 const blank=()=>({version:1,progress:0,explodedOnce:false,visited:[],diagram:{strokes:[],stamps:[],labels:[],compared:false,png:''},proof:null});
 const points=d=>(d.strokes||[]).filter(s=>s.tool!=='eraser').reduce((n,s)=>n+s.points.length,0);
 const diagramValid=d=>!!d&&(points(d)>=30||d.stamps?.length>=5)&&new Set((d.labels||[]).map(l=>l.part).filter(id=>ids.includes(id))).size>=5;
 const proofValid=p=>p?.version===1&&p.exploded===true&&Array.isArray(p.visited)&&new Set(p.visited.filter(id=>ids.includes(id))).size>=6&&p.compared===true&&((Number.isFinite(p.points)&&p.points>=30)||(Number.isFinite(p.stamps)&&p.stamps>=5))&&Number.isFinite(p.labels)&&p.labels>=5;
 function proof(v){return {version:1,exploded:v.explodedOnce,visited:[...v.visited],compared:v.diagram.compared,points:points(v.diagram),stamps:v.diagram.stamps.length,labels:new Set(v.diagram.labels.map(l=>l.part)).size};}
 function sanitize(v){const out=blank();if(v?.version!==1)return out;const num=(n,a,b,def=0)=>Number.isFinite(n)?Math.max(a,Math.min(b,n)):def;out.progress=num(v.progress,0,1);out.explodedOnce=v.explodedOnce===true;out.visited=Array.isArray(v.visited)?[...new Set(v.visited.filter(id=>ids.includes(id)))]:[];const d=v.diagram||{};let budget=6000;out.diagram.strokes=Array.isArray(d.strokes)?d.strokes.slice(-150).map(s=>({tool:['pen','line','eraser'].includes(s.tool)?s.tool:'pen',points:Array.isArray(s.points)?s.points.slice(0,Math.max(0,budget)).filter(p=>Array.isArray(p)&&p.length===2&&Number.isFinite(p[0])&&Number.isFinite(p[1])).map(p=>{budget--;return[num(p[0],0,1000),num(p[1],0,420)];}):[]})):[];
 out.diagram.stamps=Array.isArray(d.stamps)?d.stamps.filter(s=>stampIds.includes(s.type)).slice(0,30).map((s,i)=>({uid:'s'+i,type:s.type,x:num(s.x,0,1000),y:num(s.y,0,420),scale:num(s.scale,.4,2.5,1)})):[];
 out.diagram.labels=Array.isArray(d.labels)?d.labels.filter(l=>ids.includes(l.part)).slice(0,18).map((l,i)=>({uid:'l'+i,part:l.part,x:num(l.x,0,1000),y:num(l.y,0,420),ax:num(l.ax,0,1000),ay:num(l.ay,0,420)})):[];
 out.diagram.compared=d.compared===true&&diagramValid(out.diagram);out.diagram.png=typeof d.png==='string'&&d.png.length<450000&&/^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(d.png)?d.png:'';out.proof=proofValid(v.proof)?{version:1,exploded:true,visited:[...new Set(v.proof.visited.filter(id=>ids.includes(id)))],compared:true,points:num(v.proof.points,0,6000),stamps:num(v.proof.stamps,0,30),labels:num(v.proof.labels,0,9)}:null;return out;}
 return {...content,ids,stampIds,blank,points,diagramValid,proofValid,proof,sanitize};
})();
