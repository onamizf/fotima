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
   "success": "Установка изучена!",
   "progressHint": "Разбери установку и открой карточки деталей. Изучение засчитывается сразу.",
   "completed": "Задание 2 выполнено · +15 XP",
   "zoomIn": "Приблизить",
   "zoomOut": "Отдалить",
   "fullscreen": "На весь экран",
   "exitFullscreen": "Выйти из полного экрана",
   "definition": "Что это:",
   "previousPart": "Предыдущая деталь",
   "nextPart": "Следующая деталь"
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
   "success": "Apparatus studied!",
   "progressHint": "Explode the apparatus and open the part cards. Each opened card counts as studied.",
   "completed": "Task 2 completed · +15 XP",
   "zoomIn": "Move closer",
   "zoomOut": "Move away",
   "fullscreen": "Fullscreen",
   "exitFullscreen": "Exit fullscreen",
   "definition": "What it is:",
   "previousPart": "Previous part",
   "nextPart": "Next part"
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
   "success": "Qurilma o‘rganildi!",
   "progressHint": "Qurilmani ajrat va qismlar kartalarini och. Ochilgan qism darhol o‘rganilgan hisoblanadi.",
   "completed": "2-topshiriq bajarildi · +15 XP",
   "zoomIn": "Yaqinlashtirish",
   "zoomOut": "Uzoqlashtirish",
   "fullscreen": "To‘liq ekran",
   "exitFullscreen": "To‘liq ekrandan chiqish",
   "definition": "Bu nima:",
   "previousPart": "Oldingi qism",
   "nextPart": "Keyingi qism"
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
   "success": "Қурилма ўрганилди!",
   "progressHint": "Қурилмани ажрат ва қисмлар карталарини оч. Очилган қисм дарҳол ўрганилган ҳисобланади.",
   "completed": "2-топшириқ бажарилди · +15 ХП",
   "zoomIn": "Яқинлаштириш",
   "zoomOut": "Узоқлаштириш",
   "fullscreen": "Тўлиқ экран",
   "exitFullscreen": "Тўлиқ экрандан чиқиш",
   "definition": "Бу нима:",
   "previousPart": "Олдинги қисм",
   "nextPart": "Кейинги қисм"
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
   "definition": {
    "ru": "прибор для измерения температуры.",
    "en": "an instrument for measuring temperature.",
    "uz-Latn": "haroratni o‘lchash asbobi.",
    "uz-Cyrl": "ҳароратни ўлчаш асбоби."
   },
   "purpose": {
    "ru": "показывает, до какой температуры нагрелся спирт.",
    "en": "shows the temperature reached by the alcohol.",
    "uz-Latn": "spirt qanday haroratgacha qiziganini ko‘rsatadi.",
    "uz-Cyrl": "спирт қандай ҳароратгача қизиганини кўрсатади."
   },
   "purposeLabel": {
    "ru": "Для чего нужен:",
    "en": "Purpose:",
    "uz-Latn": "Nima uchun kerak:",
    "uz-Cyrl": "Нима учун керак:"
   }
  },
  {
   "id": "tube",
   "name": {
    "ru": "Термостойкая пробирка",
    "en": "Heat-resistant test tube",
    "uz-Latn": "Issiqqa chidamli probirka",
    "uz-Cyrl": "Иссиққа чидамли пробирка"
   },
   "definition": {
    "ru": "стеклянная трубка с закруглённым дном из стекла, которое выдерживает нагревание.",
    "en": "a rounded-bottom tube made from glass that withstands heating.",
    "uz-Latn": "isitishga chidamli shishadan yasalgan, tubi yumaloq nay.",
    "uz-Cyrl": "иситишга чидамли шишадан ясалган, туби юмалоқ най."
   },
   "purpose": {
    "ru": "в ней нагревают небольшое количество вещества — здесь спирт.",
    "en": "holds a small amount of substance for heating — alcohol in this experiment.",
    "uz-Latn": "unda oz miqdordagi modda — bu tajribada spirt isitiladi.",
    "uz-Cyrl": "унда оз миқдордаги модда — бу тажрибада спирт иситилади."
   },
   "purposeLabel": {
    "ru": "Для чего нужна:",
    "en": "Purpose:",
    "uz-Latn": "Nima uchun kerak:",
    "uz-Cyrl": "Нима учун керак:"
   }
  },
  {
   "id": "alcohol",
   "name": {
    "ru": "Спирт",
    "en": "Alcohol",
    "uz-Latn": "Spirt",
    "uz-Cyrl": "Спирт"
   },
   "definition": {
    "ru": "бесцветная жидкость, которая легко загорается.",
    "en": "a colourless liquid that catches fire easily.",
    "uz-Latn": "oson yonadigan rangsiz suyuqlik.",
    "uz-Cyrl": "осон ёнадиган рангсиз суюқлик."
   },
   "purpose": {
    "ru": "это вещество, которое нагревают в опыте и за температурой которого наблюдают.",
    "en": "is the substance heated in the experiment while its temperature is observed.",
    "uz-Latn": "tajribada isitilib, harorati kuzatiladigan modda.",
    "uz-Cyrl": "тажрибада иситилиб, ҳарорати кузатиладиган модда."
   },
   "purposeLabel": {
    "ru": "Для чего нужен:",
    "en": "Purpose:",
    "uz-Latn": "Nima uchun kerak:",
    "uz-Cyrl": "Нима учун керак:"
   }
  },
  {
   "id": "beaker",
   "name": {
    "ru": "Стакан",
    "en": "Beaker",
    "uz-Latn": "Stakan",
    "uz-Cyrl": "Стакан"
   },
   "definition": {
    "ru": "стеклянный сосуд цилиндрической формы с носиком.",
    "en": "a cylindrical glass vessel with a spout.",
    "uz-Latn": "tumshuqchali, silindrsimon shisha idish.",
    "uz-Cyrl": "тумшуқчали, цилиндрсимон шиша идиш."
   },
   "purpose": {
    "ru": "в нём находится вода для водяной бани.",
    "en": "holds the water used for the water bath.",
    "uz-Latn": "unda suv hammomi uchun suv turadi.",
    "uz-Cyrl": "унда сув ҳаммоми учун сув туради."
   },
   "purposeLabel": {
    "ru": "Для чего нужен:",
    "en": "Purpose:",
    "uz-Latn": "Nima uchun kerak:",
    "uz-Cyrl": "Нима учун керак:"
   }
  },
  {
   "id": "water",
   "name": {
    "ru": "Вода",
    "en": "Water",
    "uz-Latn": "Suv",
    "uz-Cyrl": "Сув"
   },
   "definition": {
    "ru": "жидкость, которой заполнен стакан.",
    "en": "the liquid filling the beaker.",
    "uz-Latn": "stakanga quyilgan suyuqlik.",
    "uz-Cyrl": "стаканга қуйилган суюқлик."
   },
   "purpose": {
    "ru": "работает как водяная баня — равномерно нагревает пробирку без открытого огня.",
    "en": "acts as a water bath, heating the test tube evenly without exposing it directly to a flame.",
    "uz-Latn": "suv hammomi vazifasini bajaradi — probirkani ochiq alangasiz bir tekis isitadi.",
    "uz-Cyrl": "сув ҳаммоми вазифасини бажаради — пробиркани очиқ алангасиз бир текис иситади."
   },
   "purposeLabel": {
    "ru": "Для чего нужна:",
    "en": "Purpose:",
    "uz-Latn": "Nima uchun kerak:",
    "uz-Cyrl": "Нима учун керак:"
   }
  },
  {
   "id": "gauze",
   "name": {
    "ru": "Проволочная сетка",
    "en": "Wire gauze",
    "uz-Latn": "Sim to‘r",
    "uz-Cyrl": "Сим тўр"
   },
   "definition": {
    "ru": "металлическая сетка с керамическим кругом в центре.",
    "en": "a metal mesh with a ceramic disc in its centre.",
    "uz-Latn": "markazida sopol doirasi bo‘lgan metall to‘r.",
    "uz-Cyrl": "марказида сопол доираси бўлган металл тўр."
   },
   "purpose": {
    "ru": "равномерно распределяет тепло пламени по дну стакана, чтобы стекло не лопнуло.",
    "en": "spreads the flame’s heat evenly across the beaker base to help prevent the glass from cracking.",
    "uz-Latn": "shisha yorilmasligi uchun alanga issiqligini stakan tubiga bir tekis tarqatadi.",
    "uz-Cyrl": "шиша ёрилмаслиги учун аланга иссиқлигини стакан тубига бир текис тарқатади."
   },
   "purposeLabel": {
    "ru": "Для чего нужна:",
    "en": "Purpose:",
    "uz-Latn": "Nima uchun kerak:",
    "uz-Cyrl": "Нима учун керак:"
   }
  },
  {
   "id": "tripod",
   "name": {
    "ru": "Треножник",
    "en": "Tripod",
    "uz-Latn": "Uchoyoq",
    "uz-Cyrl": "Учоёқ"
   },
   "definition": {
    "ru": "металлическая подставка на трёх ножках.",
    "en": "a metal support with three legs.",
    "uz-Latn": "uch oyoqli metall taglik.",
    "uz-Cyrl": "уч оёқли металл таглик."
   },
   "purpose": {
    "ru": "держит сетку со стаканом над пламенем горелки.",
    "en": "holds the gauze and beaker above the burner flame.",
    "uz-Latn": "to‘r va stakanni gorelka alangasi ustida ushlab turadi.",
    "uz-Cyrl": "тўр ва стаканни горелка алангаси устида ушлаб туради."
   },
   "purposeLabel": {
    "ru": "Для чего нужен:",
    "en": "Purpose:",
    "uz-Latn": "Nima uchun kerak:",
    "uz-Cyrl": "Нима учун керак:"
   }
  },
  {
   "id": "burner",
   "name": {
    "ru": "Горелка Бунзена (газовая)",
    "en": "Bunsen burner (gas)",
    "uz-Latn": "Bunzen gorelkasi (gazli)",
    "uz-Cyrl": "Бунзен горелкаси (газли)"
   },
   "definition": {
    "ru": "прибор, в котором сгорает газ и образуется пламя.",
    "en": "a device that burns gas to produce a flame.",
    "uz-Latn": "gaz yonib, alanga hosil bo‘ladigan asbob.",
    "uz-Cyrl": "газ ёниб, аланга ҳосил бўладиган асбоб."
   },
   "purpose": {
    "ru": "нагревает воду в стакане.",
    "en": "heats the water in the beaker.",
    "uz-Latn": "stakandagi suvni isitadi.",
    "uz-Cyrl": "стакандаги сувни иситади."
   },
   "purposeLabel": {
    "ru": "Для чего нужна:",
    "en": "Purpose:",
    "uz-Latn": "Nima uchun kerak:",
    "uz-Cyrl": "Нима учун керак:"
   }
  },
  {
   "id": "stand",
   "name": {
    "ru": "Штатив с лапкой",
    "en": "Stand and clamp",
    "uz-Latn": "Qisqichli shtativ",
    "uz-Cyrl": "Қисқичли штатив"
   },
   "definition": {
    "ru": "металлическая стойка с зажимом-лапкой.",
    "en": "a metal support fitted with a clamp.",
    "uz-Latn": "qisqich-lapkali metall shtativ.",
    "uz-Cyrl": "қисқич-лапкали металл штатив."
   },
   "purpose": {
    "ru": "надёжно закрепляет пробирку в нужном положении.",
    "en": "holds the test tube securely in the required position.",
    "uz-Latn": "probirkani kerakli holatda ishonchli mahkamlaydi.",
    "uz-Cyrl": "пробиркани керакли ҳолатда ишончли маҳкамлайди."
   },
   "purposeLabel": {
    "ru": "Для чего нужен:",
    "en": "Purpose:",
    "uz-Latn": "Nima uchun kerak:",
    "uz-Cyrl": "Нима учун керак:"
   }
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
