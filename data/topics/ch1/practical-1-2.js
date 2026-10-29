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
   "goal": "Цель: познакомиться с оборудованием и изучить устройство водяной бани",
   "equipment": "Оборудование и реактивы: стакан, выпарительная чашка, сетка, штатив, горелка Бунзена, раствор сульфата меди (II), вода",
   "skills": "Навыки: коммуникация · наблюдение · идентификация · правильное использование оборудования",
   "welcome": "Добро пожаловать в лабораторию! Нажимай на предметы на столе — я расскажу, что это 🧪",
   "what": "Что это?",
   "later": "Понадобится в задании 2",
   "resetCamera": "Общий вид",
   "roomAlt": "Химическая лаборатория: шесть приборов на переднем столе и установка на боковом",
   "instruction": "Нажми на шесть предметов на переднем столе и узнай, для чего они нужны.",
   "counts": "Изучено: {names} / 6",
   "allDone": "Все шесть предметов изучены!",
   "soon": "Скоро",
   "labels": "Подписать установку",
   "pending": "Это задание появится в следующем обновлении.",
   "nextLocked": "1.3 → После всех заданий работы 1.2",
   "close": "Закрыть",
   "purpose": "Для чего",
   "material": "Из чего",
   "safe": "Как пользоваться",
   "loadError": "Не удалось загрузить лабораторию. Повторить загрузку",
   "saved": "Результаты изучения сохраняются автоматически.",
   "coordinates": "Координаты зоны"
  },
  "en": {
   "heading": "Laboratory equipment",
   "overline": "CHAPTER 1 · PRACTICAL WORK 1.2",
   "goal": "Goal: identify laboratory equipment and explore a water bath",
   "equipment": "Equipment and reagents: beaker, evaporating dish, gauze, stand, Bunsen burner, copper(II) sulfate solution, water",
   "skills": "Skills: communication · observation · identification · safe use of equipment",
   "welcome": "Welcome to the laboratory! Tap objects on the table to learn what they do 🧪",
   "what": "What is this?",
   "later": "You will need this in Task 2",
   "resetCamera": "Room view",
   "roomAlt": "Chemistry laboratory with six instruments on the front bench and apparatus on the side bench",
   "instruction": "Select the six objects on the front bench to learn their uses.",
   "counts": "Studied: {names} / 6",
   "allDone": "All six objects studied!",
   "soon": "Coming soon",
   "labels": "Label the apparatus",
   "pending": "This task will arrive in the next update.",
   "nextLocked": "1.3 → After all tasks in practical work 1.2",
   "close": "Close",
   "purpose": "Purpose",
   "material": "Material",
   "safe": "Safe use",
   "loadError": "Could not load the laboratory. Retry",
   "saved": "Study progress is saved automatically.",
   "coordinates": "Zone coordinates"
  },
  "uz-Latn": {
   "heading": "Laboratoriya jihozlari",
   "overline": "1-BOB · 1.2-AMALIY ISH",
   "goal": "Maqsad: laboratoriya jihozlari va suv hammomini o‘rganish",
   "equipment": "Jihoz va reaktivlar: stakan, bug‘latish idishi, to‘r, shtativ, Bunzen gorelkasi, mis(II) sulfat eritmasi, suv",
   "skills": "Ko‘nikmalar: muloqot · kuzatish · aniqlash · jihozlardan to‘g‘ri foydalanish",
   "welcome": "Laboratoriyaga xush kelibsan! Stoldagi jihozlarni bos — nima uchun kerakligini aytaman 🧪",
   "what": "Bu nima?",
   "later": "2-topshiriqda kerak bo‘ladi",
   "resetCamera": "Umumiy ko‘rinish",
   "roomAlt": "Old stolda oltita jihoz va yon stolda qurilma turgan kimyo laboratoriyasi",
   "instruction": "Oldingi stoldagi oltita jihozni bosib, vazifasini o‘rgan.",
   "counts": "O‘rganildi: {names} / 6",
   "allDone": "Oltita jihoz o‘rganildi!",
   "soon": "Tez kunda",
   "labels": "Qurilma qismlarini nomlash",
   "pending": "Bu topshiriq keyingi yangilanishda paydo bo‘ladi.",
   "nextLocked": "1.3 → 1.2-amaliy ishning barcha topshiriqlaridan so‘ng",
   "close": "Yopish",
   "purpose": "Vazifasi",
   "material": "Nimadan yasalgan",
   "safe": "Foydalanish",
   "loadError": "Laboratoriya yuklanmadi. Qayta yuklash",
   "saved": "O‘rganish natijalari avtomatik saqlanadi.",
   "coordinates": "Zona koordinatalari"
  },
  "uz-Cyrl": {
   "heading": "Лаборатория жиҳозлари",
   "overline": "1-БОБ · 1.2-АМАЛИЙ ИСҲ",
   "goal": "Мақсад: лаборатория жиҳозлари ва сув ҳаммомини ўрганиш",
   "equipment": "Жиҳоз ва реактивлар: стакан, буғлатиш идиши, тўр, штатив, Бунзен горелкаси, мис(ИИ) сулфат еритмаси, сув",
   "skills": "Кўникмалар: мулоқот · кузатиш · аниқлаш · жиҳозлардан тўғри фойдаланиш",
   "welcome": "Лабораторияга хуш келибсан! Столдаги жиҳозларни бос — нима учун кераклигини айтаман 🧪",
   "what": "Бу нима?",
   "later": "2-топшириқда керак бўлади",
   "resetCamera": "Умумий кўриниш",
   "roomAlt": "Олд столда олтита жиҳоз ва ён столда қурилма турган кимё лабораторияси",
   "instruction": "Олдинги столдаги олтита жиҳозни босиб, вазифасини ўрган.",
   "counts": "Ўрганилди: {names} / 6",
   "allDone": "Олтита жиҳоз ўрганилди!",
   "soon": "Тез кунда",
   "labels": "Қурилма қисмларини номлаш",
   "pending": "Бу топшириқ кейинги янгиланишда пайдо бўлади.",
   "nextLocked": "1.3 → 1.2-амалий ишнинг барча топшириқларидан сўнг",
   "close": "Ёпиш",
   "purpose": "Вазифаси",
   "material": "Нимадан ясалган",
   "safe": "Фойдаланиш",
   "loadError": "Лаборатория юкланмади. Қайта юклаш",
   "saved": "Ўрганиш натижалари автоматик сақланади.",
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
   "image": "assets/lab/1-2/measuring-cylinder.webp"
  }
 ]
};

 function cover(width,height,positionY=.5){const scale=Math.max(width/1376,height/768);return {scale,width:1376*scale,height:768*scale,left:(width-1376*scale)*.5,top:(height-768*scale)*positionY};}
 function projectZone(zone,width,height,positionY=.5){const p=cover(width,height,positionY),x=p.left+zone.x/100*p.width,y=p.top+zone.y/100*p.height,w=zone.w/100*p.width,h=zone.h/100*p.height;return {x,y,w,h,cx:x+w/2,cy:y+h/2};}
 const blank=()=>({version:1,rows:{},setup:typeof Setup12Data==='undefined'?null:Setup12Data.blank()});
 function sanitize(v){const out=blank();if(v?.version!==1)return out;if(typeof Setup12Data!=='undefined')out.setup=Setup12Data.sanitize(v.setup);for(const item of content.items){const r=v.rows?.[item.id];if(r)out.rows[item.id]={studied:r.studied===true||r.named===true,earned:r.earned===true};}return out;}
 function proofValid(p){return p?.version===2&&content.items.every(i=>p.studied?.includes(i.id))||p?.version===1&&content.items.every(i=>p.rows?.[i.id]?.named===true&&p.rows[i.id].compared===true&&Number.isFinite(p.rows[i.id].points)&&p.rows[i.id].points>=30);}
 return {...content,hotspots:ROOM_HOTSPOTS,cover,projectZone,blank,sanitize,proofValid};
})();
