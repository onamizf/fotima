/* Water-bath learning data, completion criteria and saved study evidence. */
const Setup12Data=(()=>{const content={
 "copy": {
  "ru": {
   "instruction": "Разбери установку и изучи не менее шести деталей.",
   "welcome": "Перетаскивай установку для поворота. Колесо и + / − приближают приборы.",
   "explode": "🔧 Разобрать",
   "assemble": "🔩 Собрать",
   "scrub": "Разборка",
   "reset": "↺ Сбросить вид",
   "viewLabel": "Водяная баня: интерактивная установка",
   "loading": "Загружаем 3D-установку…",
   "fallback": "Просмотр без WebGL: разбери установку кнопкой и изучи детали по подписям.",
   "parts": "Детали установки",
   "studied": "Изучено деталей: {n} / 9",
   "studyHint": "Нажми на деталь, чтобы выдвинуть её вперёд и узнать о ней.",
   "back": "↩ Вернуть на место",
   "what": "Что это",
   "why": "Зачем в этой установке",
   "safe": "Как правильно",
   "next": "Дальше →",
   "understood": "Понятно ✓",
   "success": "Установка изучена!",
   "progressHint": "Разбери установку и прочитай три карточки о каждой из шести деталей.",
   "completed": "Задание 2 выполнено · +15 XP",
   "zoomIn": "Приблизить",
   "zoomOut": "Отдалить",
   "fullscreen": "На весь экран",
   "exitFullscreen": "Выйти из полного экрана"
  },
  "en": {
   "instruction": "Explode the apparatus and study at least six parts.",
   "welcome": "Drag to rotate the apparatus. Use the wheel or + / − to move it closer.",
   "explode": "🔧 Separate parts",
   "assemble": "🔩 Assemble",
   "scrub": "Separation",
   "reset": "↺ Reset view",
   "viewLabel": "Water bath: interactive apparatus",
   "loading": "Loading the 3D apparatus…",
   "fallback": "View without WebGL: use the button to separate the apparatus and explore its labelled parts.",
   "parts": "Apparatus parts",
   "studied": "Parts explored: {n} / 9",
   "studyHint": "Select a part to bring it forward and learn about it.",
   "back": "↩ Return part",
   "what": "What it is",
   "why": "Its role in this apparatus",
   "safe": "Safe use",
   "next": "Next →",
   "understood": "Understood ✓",
   "success": "Apparatus studied!",
   "progressHint": "Explode the apparatus and read three cards for each of six parts.",
   "completed": "Task 2 completed · +15 XP",
   "zoomIn": "Move closer",
   "zoomOut": "Move away",
   "fullscreen": "Fullscreen",
   "exitFullscreen": "Exit fullscreen"
  },
  "uz-Latn": {
   "instruction": "Qurilmani ajratib, kamida oltita qismini o‘rgan.",
   "welcome": "Burish uchun qurilmani sur. Yaqinlashtirish uchun g‘ildirak yoki + / − ishlat.",
   "explode": "🔧 Qismlarga ajratish",
   "assemble": "🔩 Yig‘ish",
   "scrub": "Ajratish",
   "reset": "↺ Ko‘rinishni tiklash",
   "viewLabel": "Suv hammomi: interaktiv qurilma",
   "loading": "3D qurilma yuklanmoqda…",
   "fallback": "WebGLsiz ko‘rinish: tugma bilan qurilmani ajrat va yozuvlar orqali qismlarini o‘rgan.",
   "parts": "Qurilma qismlari",
   "studied": "O‘rganilgan qismlar: {n} / 9",
   "studyHint": "Qismni oldinga chiqarib o‘rganish uchun bos.",
   "back": "↩ Joyiga qaytarish",
   "what": "Bu nima",
   "why": "Qurilmadagi vazifasi",
   "safe": "To‘g‘ri foydalanish",
   "next": "Keyingi →",
   "understood": "Tushunarli ✓",
   "success": "Qurilma o‘rganildi!",
   "progressHint": "Qurilmani ajrat va oltita qismning uchta kartasini o‘qi.",
   "completed": "2-topshiriq bajarildi · +15 XP",
   "zoomIn": "Yaqinlashtirish",
   "zoomOut": "Uzoqlashtirish",
   "fullscreen": "To‘liq ekran",
   "exitFullscreen": "To‘liq ekrandan chiqish"
  },
  "uz-Cyrl": {
   "instruction": "Қурилмани ажратиб, камида олтита қисмини ўрган.",
   "welcome": "Буриш учун қурилмани сур. Яқинлаштириш учун ғилдирак ёки + / − ишлат.",
   "explode": "🔧 Қисмларга ажратиш",
   "assemble": "🔩 Йиғиш",
   "scrub": "Ажратиш",
   "reset": "↺ Кўринишни тиклаш",
   "viewLabel": "Сув ҳаммоми: интерактив қурилма",
   "loading": "3Д қурилма юкланмоқда…",
   "fallback": "WебГЛсиз кўриниш: тугма билан қурилмани ажрат ва ёзувлар орқали қисмларини ўрган.",
   "parts": "Қурилма қисмлари",
   "studied": "Ўрганилган қисмлар: {н} / 9",
   "studyHint": "Қисмни олдинга чиқариб ўрганиш учун бос.",
   "back": "↩ Жойига қайтариш",
   "what": "Бу нима",
   "why": "Қурилмадаги вазифаси",
   "safe": "Тўғри фойдаланиш",
   "next": "Кейинги →",
   "understood": "Тушунарли ✓",
   "success": "Қурилма ўрганилди!",
   "progressHint": "Қурилмани ажрат ва олтита қисмнинг учта картасини ўқи.",
   "completed": "2-топшириқ бажарилди · +15 ХП",
   "zoomIn": "Яқинлаштириш",
   "zoomOut": "Узоқлаштириш",
   "fullscreen": "Тўлиқ экран",
   "exitFullscreen": "Тўлиқ экрандан чиқиш"
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

 const ids=content.parts.map(p=>p.id);
 const blank=()=>({version:2,progress:0,explodedOnce:false,visited:[],proof:null});
 const proofValid=p=>[1,2].includes(p?.version)&&p.exploded===true&&Array.isArray(p.visited)&&new Set(p.visited.filter(id=>ids.includes(id))).size>=6;
 const proof=v=>({version:2,exploded:v.explodedOnce,visited:[...v.visited]});
 function sanitize(v){const out=blank();if(![1,2].includes(v?.version))return out;out.progress=Number.isFinite(v.progress)?Math.max(0,Math.min(1,v.progress)):0;out.explodedOnce=v.explodedOnce===true;out.visited=Array.isArray(v.visited)?[...new Set(v.visited.filter(id=>ids.includes(id)))]:[];if(proofValid(v.proof))out.proof={version:2,exploded:true,visited:[...new Set(v.proof.visited.filter(id=>ids.includes(id)))]};return out;}
 return {...content,ids,blank,proofValid,proof,sanitize};
})();
