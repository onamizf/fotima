/* Equipment reference cards: original concise content for four locales. */
const EquipmentCardData={
 "copy": {
  "what": {
   "ru": "Что это",
   "en": "What it is",
   "uz-Latn": "Bu nima",
   "uz-Cyrl": "Бу нима"
  },
  "uses": {
   "ru": "Для чего нужен",
   "en": "What it is used for",
   "uz-Latn": "Nima uchun kerak",
   "uz-Cyrl": "Нима учун керак"
  },
  "why": {
   "ru": "Почему используют именно его",
   "en": "Why this design works",
   "uz-Latn": "Nega aynan shu jihoz",
   "uz-Cyrl": "Нега айнан шу жиҳоз"
  },
  "safe": {
   "ru": "Как правильно пользоваться",
   "en": "How to use it safely",
   "uz-Latn": "To‘g‘ri foydalanish",
   "uz-Cyrl": "Тўғри фойдаланиш"
  },
  "never": {
   "ru": "Нельзя",
   "en": "Never",
   "uz-Latn": "Mumkin emas",
   "uz-Cyrl": "Мумкин эмас"
  },
  "fact": {
   "ru": "Интересный факт",
   "en": "Did you know?",
   "uz-Latn": "Qiziqarli ma’lumot",
   "uz-Cyrl": "Қизиқарли маълумот"
  },
  "next": {
   "ru": "Следующий прибор →",
   "en": "Next item →",
   "uz-Latn": "Keyingi jihoz →",
   "uz-Cyrl": "Кейинги жиҳоз →"
  },
  "previous": {
   "ru": "Предыдущий прибор",
   "en": "Previous item",
   "uz-Latn": "Oldingi jihoz",
   "uz-Cyrl": "Олдинги жиҳоз"
  },
  "close": {
   "ru": "Закрыть карточку",
   "en": "Close card",
   "uz-Latn": "Kartani yopish",
   "uz-Cyrl": "Картани ёпиш"
  },
  "loading": {
   "ru": "Загружаем 3D-модель…",
   "en": "Loading 3D model…",
   "uz-Latn": "3D model yuklanmoqda…",
   "uz-Cyrl": "3D модел юкланмоқда…"
  },
  "fallback": {
   "ru": "Просмотр изображения: WebGL недоступен.",
   "en": "Image view: WebGL is unavailable.",
   "uz-Latn": "Rasm ko‘rinishi: WebGL mavjud emas.",
   "uz-Cyrl": "Расм кўриниши: WebGL мавжуд эмас."
  },
  "studied": {
   "ru": "Изучено ✓",
   "en": "Studied ✓",
   "uz-Latn": "O‘rganildi ✓",
   "uz-Cyrl": "Ўрганилди ✓"
  },
  "xp": {
   "ru": "+3 XP за первое изучение",
   "en": "+3 XP for first study",
   "uz-Latn": "Ilk o‘rganish uchun +3 XP",
   "uz-Cyrl": "Илк ўрганиш учун +3 ХП"
  },
  "xpDone": {
   "ru": "Изучено · награда уже учтена",
   "en": "Studied · reward already recorded",
   "uz-Latn": "O‘rganildi · mukofot hisoblangan",
   "uz-Cyrl": "Ўрганилди · мукофот ҳисобланган"
  },
  "toSetup": {
   "ru": "К установке ↓",
   "en": "Explore the apparatus ↓",
   "uz-Latn": "Qurilmaga o‘tish ↓",
   "uz-Cyrl": "Қурилмага ўтиш ↓"
  },
  "allDone": {
   "ru": "Ты знаешь всё оборудование! Переходим к установке 👇",
   "en": "You know all six items! Let’s explore the apparatus 👇",
   "uz-Latn": "Barcha jihozlarni bilasan! Qurilmaga o‘tamiz 👇",
   "uz-Cyrl": "Барча жиҳозларни биласан! Қурилмага ўтамиз 👇"
  },
  "glass": {
   "ru": "Стекло",
   "en": "Glass",
   "uz-Latn": "Shisha",
   "uz-Cyrl": "Шиша"
  },
  "porcelain": {
   "ru": "Фарфор",
   "en": "Porcelain",
   "uz-Latn": "Chinni",
   "uz-Cyrl": "Чинни"
  },
  "heatYes": {
   "ru": "Для нагревания: да",
   "en": "Heating: yes",
   "uz-Latn": "Isitish: mumkin",
   "uz-Cyrl": "Иситиш: мумкин"
  },
  "heatNo": {
   "ru": "Для нагревания: нет",
   "en": "Heating: no",
   "uz-Latn": "Isitish: mumkin emas",
   "uz-Cyrl": "Иситиш: мумкин эмас"
  },
  "approx": {
   "ru": "Точность: приблизительная",
   "en": "Volume: approximate",
   "uz-Latn": "Hajm: taxminiy",
   "uz-Cyrl": "Ҳажм: тахминий"
  },
  "high": {
   "ru": "Точность: высокая для учебных измерений",
   "en": "Precision: good for classroom measurements",
   "uz-Latn": "Aniqlik: o‘quv o‘lchovlari uchun yuqori",
   "uz-Cyrl": "Аниқлик: ўқув ўлчовлари учун юқори"
  },
  "none": {
   "ru": "Не для измерения объёма",
   "en": "Not a volume-measuring tool",
   "uz-Latn": "Hajm o‘lchash uchun emas",
   "uz-Cyrl": "Ҳажм ўлчаш учун эмас"
  },
  "controls": {
   "ru": "Перетаскивай, чтобы вращать прибор. Колесо приближает модель.",
   "en": "Drag to rotate the item. Scroll to bring the model closer.",
   "uz-Latn": "Jihozni burish uchun sur. G‘ildirak modelni yaqinlashtiradi.",
   "uz-Cyrl": "Жиҳозни буриш учун сур. Ғилдирак моделни яқинлаштиради."
  },
  "parts": {
   "ru": "Части прибора",
   "en": "Parts of the item",
   "uz-Latn": "Jihoz qismlari",
   "uz-Cyrl": "Жиҳоз қисмлари"
  },
  "touchControls": {
   "ru": "Проведи по модели для вращения. По панели — для смены прибора.",
   "en": "Drag the model to rotate. Swipe the panel to change item.",
   "uz-Latn": "Modelni surib bur. Jihozni almashtirish uchun panelni sur.",
   "uz-Cyrl": "Моделни суриб бур. Жиҳозни алмаштириш учун панелни сур."
  }
 },
 "items": [
  {
   "id": "test-tube",
   "material": "glass",
   "heat": true,
   "precision": "none",
   "definition": {
    "ru": "Тонкая стеклянная трубка с закруглённым дном. Для нагревания берут термостойкую пробирку.",
    "en": "A thin glass tube with a rounded bottom. Use a heat-resistant tube for heating.",
    "uz-Latn": "Tubi yumaloq ingichka shisha nay. Isitish uchun issiqqa chidamli probirka olinadi.",
    "uz-Cyrl": "Туби юмалоқ ингичка шиша най. Иситиш учун иссиққа чидамли пробирка олинади."
   },
   "uses": [
    {
     "ru": "🧪 Опыты с небольшим количеством веществ",
     "en": "🧪 Small-scale experiments",
     "uz-Latn": "🧪 Oz miqdordagi moddalar bilan tajribalar",
     "uz-Cyrl": "🧪 Оз миқдордаги моддалар билан тажрибалар"
    },
    {
     "ru": "🔥 Нагревание и наблюдение реакций",
     "en": "🔥 Heating and observing reactions",
     "uz-Latn": "🔥 Isitish va reaksiyalarni kuzatish",
     "uz-Cyrl": "🔥 Иситиш ва реакцияларни кузатиш"
    },
    {
     "ru": "🪵 Хранение во время работы — в штативе",
     "en": "🪵 Keeping tubes upright in a rack during work",
     "uz-Latn": "🪵 Ish vaqtida shtativda tik saqlash",
     "uz-Cyrl": "🪵 Иш вақтида штативда тик сақлаш"
    }
   ],
   "why": {
    "ru": "Прозрачное стекло позволяет видеть реакцию. Маленький объём помогает экономить реактивы.",
    "en": "Clear glass makes the reaction visible. A small volume saves reagents.",
    "uz-Latn": "Shaffof shisha reaksiyani ko‘rishga imkon beradi. Kichik hajm reaktivni tejaydi.",
    "uz-Cyrl": "Шаффоф шиша реакцияни кўришга имкон беради. Кичик ҳажм реактивни тежайди."
   },
   "safe": {
    "ru": "При нагревании заполняй не больше трети. Пользуйся держателем, направляй отверстие от людей и плавно перемещай пробирку над пламенем. После работы ставь её в штатив.",
    "en": "For heating, fill at most one third. Use a holder, point the opening away from people and move the tube gently through the flame. Keep it in a rack afterwards.",
    "uz-Latn": "Isitishda uchdan biridan ko‘p to‘ldirma. Tutqichdan foydalan, og‘zini odamlardan chetga qarat va alanga ustida ohista siljit. So‘ng shtativga qo‘y.",
    "uz-Cyrl": "Иситишда учдан биридан кўп тўлдирма. Тутқичдан фойдалан, оғзини одамлардан четга қарат ва аланга устида оҳиста силжит. Сўнг штативга қўй."
   },
   "never": {
    "ru": "Не грей неподвижно одно место. Не направляй отверстие на себя или соседа. Не нагревай пробирку в деревянном штативе.",
    "en": "Do not keep heating one spot. Never point the opening at yourself or others. Do not heat a tube in the wooden rack.",
    "uz-Latn": "Bir joyini qimirlatmay isitma. Og‘zini o‘zingga yoki boshqalarga qaratma. Yog‘och shtativdagi probirkani isitma.",
    "uz-Cyrl": "Бир жойини қимирлатмай иситма. Оғзини ўзингга ёки бошқаларга қаратма. Ёғоч штативдаги пробиркани иситма."
   },
   "fact": {
    "ru": "Круглое дно не даёт пробирке стоять самой — поэтому ей нужен штатив.",
    "en": "A rounded bottom cannot stand on its own — that is why a tube needs a rack.",
    "uz-Latn": "Yumaloq tubi sabab probirka o‘zi tik turmaydi — unga shtativ kerak.",
    "uz-Cyrl": "Юмалоқ туби сабаб пробирка ўзи тик турмайди — унга штатив керак."
   },
   "parts": [
    {
     "key": "0",
     "name": {
      "ru": "Отверстие с бортиком",
      "en": "Rimmed opening",
      "uz-Latn": "Gardishli og‘iz",
      "uz-Cyrl": "Гардишли оғиз"
     }
    },
    {
     "key": "1",
     "name": {
      "ru": "Закруглённое дно",
      "en": "Rounded bottom",
      "uz-Latn": "Yumaloq tub",
      "uz-Cyrl": "Юмалоқ туб"
     }
    },
    {
     "key": "2",
     "name": {
      "ru": "Штатив для пробирок",
      "en": "Test-tube rack",
      "uz-Latn": "Probirka shtativi",
      "uz-Cyrl": "Пробирка штативи"
     }
    }
   ]
  },
  {
   "id": "beaker",
   "material": "glass",
   "heat": true,
   "precision": "approx",
   "definition": {
    "ru": "Цилиндрический стеклянный сосуд с носиком и делениями. В лаборатории используют термостойкие стаканы.",
    "en": "A cylindrical glass vessel with a spout and graduations. Laboratory beakers are made from heat-resistant glass.",
    "uz-Latn": "Tumshuqcha va bo‘linmalari bor silindrsimon shisha idish. Laboratoriyada issiqqa chidamli stakan ishlatiladi.",
    "uz-Cyrl": "Тумшуқча ва бўлинмалари бор цилиндрсимон шиша идиш. Лабораторияда иссиққа чидамли стакан ишлатилади."
   },
   "uses": [
    {
     "ru": "💧 Растворение веществ",
     "en": "💧 Dissolving substances",
     "uz-Latn": "💧 Moddalarni eritish",
     "uz-Cyrl": "💧 Моддаларни эритиш"
    },
    {
     "ru": "🥄 Смешивание растворов",
     "en": "🥄 Mixing solutions",
     "uz-Latn": "🥄 Eritmalarni aralashtirish",
     "uz-Cyrl": "🥄 Эритмаларни аралаштириш"
    },
    {
     "ru": "🔥 Нагревание жидкостей",
     "en": "🔥 Heating liquids",
     "uz-Latn": "🔥 Suyuqliklarni isitish",
     "uz-Cyrl": "🔥 Суюқликларни иситиш"
    }
   ],
   "why": {
    "ru": "Через широкое горло удобно перемешивать, через носик — переливать. Деления показывают только примерный объём.",
    "en": "The wide mouth is convenient for stirring, and the spout for pouring. Graduations show only an approximate volume.",
    "uz-Latn": "Keng og‘izdan aralashtirish, tumshuqchadan quyish qulay. Bo‘linmalar faqat taxminiy hajmni ko‘rsatadi.",
    "uz-Cyrl": "Кенг оғиздан аралаштириш, тумшуқчадан қуйиш қулай. Бўлинмалар фақат тахминий ҳажмни кўрсатади."
   },
   "safe": {
    "ru": "При нагревании на горелке ставь термостойкий стакан на проволочную сетку. Горячий сосуд бери подходящими щипцами.",
    "en": "When heating with a burner, place a heat-resistant beaker on wire gauze. Use suitable tongs for hot glassware.",
    "uz-Latn": "Gorelkada isitishda issiqqa chidamli stakanni sim to‘rga qo‘y. Issiq idishni mos qisqich bilan ol.",
    "uz-Cyrl": "Горелкада иситишда иссиққа чидамли стаканни сим тўрга қўй. Иссиқ идишни мос қисқич билан ол."
   },
   "never": {
    "ru": "Не отмеряй им точный объём. Не ставь прямо в открытое пламя без сетки и не охлаждай горячее стекло резко.",
    "en": "Do not use it for precise volume measurements. Do not place it directly in a flame without gauze or cool hot glass suddenly.",
    "uz-Latn": "Unda hajmni aniq o‘lchama. To‘rsiz ochiq alangaga qo‘yma, issiq shishani keskin sovitma.",
    "uz-Cyrl": "Унда ҳажмни аниқ ўлчама. Тўрсиз очиқ алангага қўйма, иссиқ шишани кескин совитма."
   },
   "fact": {
    "ru": "Носик помогает направить струю и аккуратнее перелить жидкость.",
    "en": "The spout guides the stream and helps you pour neatly.",
    "uz-Latn": "Tumshuqcha oqimni yo‘naltirib, suyuqlikni tartibli quyishga yordam beradi.",
    "uz-Cyrl": "Тумшуқча оқимни йўналтириб, суюқликни тартибли қуйишга ёрдам беради."
   },
   "parts": [
    {
     "key": "0",
     "name": {
      "ru": "Носик",
      "en": "Spout",
      "uz-Latn": "Tumshuqcha",
      "uz-Cyrl": "Тумшуқча"
     }
    },
    {
     "key": "1",
     "name": {
      "ru": "Деления",
      "en": "Graduations",
      "uz-Latn": "Bo‘linmalar",
      "uz-Cyrl": "Бўлинмалар"
     }
    },
    {
     "key": "2",
     "name": {
      "ru": "Плоское дно",
      "en": "Flat base",
      "uz-Latn": "Yassi tub",
      "uz-Cyrl": "Ясси туб"
     }
    }
   ]
  },
  {
   "id": "evaporating-dish",
   "material": "porcelain",
   "heat": true,
   "precision": "none",
   "definition": {
    "ru": "Широкая неглубокая чашка из фарфора, обычно с небольшим носиком.",
    "en": "A broad, shallow porcelain dish, usually with a small spout.",
    "uz-Latn": "Odatda kichik tumshuqchasi bo‘lgan keng, sayoz chinni kosacha.",
    "uz-Cyrl": "Одатда кичик тумшуқчаси бўлган кенг, саёз чинни косача."
   },
   "uses": [
    {
     "ru": "☁️ Выпаривание растворителя",
     "en": "☁️ Evaporating a solvent",
     "uz-Latn": "☁️ Erituvchini bug‘latish",
     "uz-Cyrl": "☁️ Эритувчини буғлатиш"
    },
    {
     "ru": "💎 Получение кристаллов из раствора",
     "en": "💎 Obtaining crystals from a solution",
     "uz-Latn": "💎 Eritmadan kristallar olish",
     "uz-Cyrl": "💎 Эритмадан кристаллар олиш"
    }
   ],
   "why": {
    "ru": "Фарфор выдерживает нагрев. С широкой поверхности растворитель испаряется быстрее, чем из узкого сосуда.",
    "en": "Porcelain tolerates heating. A broad surface lets the solvent evaporate faster than in a narrow vessel.",
    "uz-Latn": "Chinni isitishga chidamli. Keng yuzadan erituvchi tor idishdagiga qaraganda tezroq bug‘lanadi.",
    "uz-Cyrl": "Чинни иситишга чидамли. Кенг юзадан эритувчи тор идишдагига қараганда тезроқ буғланади."
   },
   "safe": {
    "ru": "Устойчиво ставь чашку на сетку или подходящее кольцо. Нагревай по указанию учителя; горячую чашку бери щипцами.",
    "en": "Support it securely on gauze or a suitable ring. Heat as directed by your teacher; use tongs when it is hot.",
    "uz-Latn": "Kosachani to‘r yoki mos halqaga mustahkam qo‘y. O‘qituvchi ko‘rsatmasi bilan isit; issig‘ini qisqichda ol.",
    "uz-Cyrl": "Косачани тўр ёки мос ҳалқага мустаҳкам қўй. Ўқитувчи кўрсатмаси билан исит; иссиғини қисқичда ол."
   },
   "never": {
    "ru": "Не охлаждай горячий фарфор водой: от резкого перепада температуры он может треснуть. Не трогай чашку руками после нагревания.",
    "en": "Do not cool hot porcelain with water: a sudden temperature change can crack it. Do not touch it after heating.",
    "uz-Latn": "Issiq chinnini suv bilan sovitma: keskin harorat farqi uni yorishi mumkin. Isitgandan keyin qo‘l bilan tegma.",
    "uz-Cyrl": "Иссиқ чиннини сув билан совитма: кескин ҳарорат фарқи уни ёриши мумкин. Иситгандан кейин қўл билан тегма."
   },
   "fact": {
    "ru": "Раствор можно немного упарить, а затем остудить: при подходящих условиях вырастут кристаллы.",
    "en": "A solution can be partly evaporated and then cooled: under suitable conditions, crystals will grow.",
    "uz-Latn": "Eritmani biroz bug‘latib, keyin sovitish mumkin: mos sharoitda kristallar o‘sadi.",
    "uz-Cyrl": "Эритмани бироз буғлатиб, кейин совитиш мумкин: мос шароитда кристаллар ўсади."
   },
   "parts": [
    {
     "key": "0",
     "name": {
      "ru": "Носик",
      "en": "Spout",
      "uz-Latn": "Tumshuqcha",
      "uz-Cyrl": "Тумшуқча"
     }
    },
    {
     "key": "1",
     "name": {
      "ru": "Фарфор",
      "en": "Porcelain",
      "uz-Latn": "Chinni",
      "uz-Cyrl": "Чинни"
     }
    },
    {
     "key": "2",
     "name": {
      "ru": "Широкая чаша",
      "en": "Broad bowl",
      "uz-Latn": "Keng kosa",
      "uz-Cyrl": "Кенг коса"
     }
    }
   ]
  },
  {
   "id": "conical-flask",
   "material": "glass",
   "heat": true,
   "precision": "approx",
   "definition": {
    "ru": "Колба Эрленмейера — стеклянный сосуд с коническим корпусом, широким плоским дном и узким горлом.",
    "en": "An Erlenmeyer flask is a glass vessel with a conical body, a broad flat base and a narrow neck.",
    "uz-Latn": "Erlenmeyer kolbasi — konussimon korpusli, keng yassi tubli va tor bo‘yinli shisha idish.",
    "uz-Cyrl": "Эрленмейер колбаси — конуссимон корпусли, кенг ясси тубли ва тор бўйинли шиша идиш."
   },
   "uses": [
    {
     "ru": "🌀 Смешивание круговыми движениями",
     "en": "🌀 Mixing by swirling",
     "uz-Latn": "🌀 Aylantirib aralashtirish",
     "uz-Cyrl": "🌀 Айлантириб аралаштириш"
    },
    {
     "ru": "🔥 Нагревание в подходящей установке",
     "en": "🔥 Heating with suitable equipment",
     "uz-Latn": "🔥 Mos qurilmada isitish",
     "uz-Cyrl": "🔥 Мос қурилмада иситиш"
    },
    {
     "ru": "💧 Временное хранение раствора во время работы",
     "en": "💧 Holding a solution during an experiment",
     "uz-Latn": "💧 Ish vaqtida eritmani vaqtincha saqlash",
     "uz-Cyrl": "💧 Иш вақтида эритмани вақтинча сақлаш"
    }
   ],
   "why": {
    "ru": "Узкое горло уменьшает разбрызгивание и испарение. Широкое дно делает колбу устойчивой. Деления, если есть, приблизительные.",
    "en": "A narrow neck reduces splashing and evaporation. A broad base adds stability. Any volume marks are approximate.",
    "uz-Latn": "Tor bo‘yin sachrash va bug‘lanishni kamaytiradi. Keng tub kolbani barqaror qiladi. Bo‘linmalari bo‘lsa, ular taxminiy.",
    "uz-Cyrl": "Тор бўйин сачраш ва буғланишни камайтиради. Кенг туб колбани барқарор қилади. Бўлинмалари бўлса, улар тахминий."
   },
   "safe": {
    "ru": "Перемешивай плавным вращением. Для нагревания используй только термостойкую колбу и подходящую опору по указанию учителя.",
    "en": "Swirl gently to mix. For heating, use only a heat-resistant flask with suitable support, following your teacher’s instructions.",
    "uz-Latn": "Ohista aylantirib aralashtir. Isitish uchun faqat issiqqa chidamli kolba va mos tayanchdan o‘qituvchi ko‘rsatmasi bilan foydalan.",
    "uz-Cyrl": "Оҳиста айлантириб аралаштир. Иситиш учун фақат иссиққа чидамли колба ва мос таянчдан ўқитувчи кўрсатмаси билан фойдалан."
   },
   "never": {
    "ru": "Не заполняй доверху. Не нагревай закрытую пробкой колбу: давление внутри может опасно вырасти.",
    "en": "Do not fill to the brim. Never heat a stoppered flask: pressure can build up dangerously.",
    "uz-Latn": "Labigacha to‘ldirma. Tiqin bilan yopilgan kolbani isitma: ichki bosim xavfli oshishi mumkin.",
    "uz-Cyrl": "Лабигача тўлдирма. Тиқин билан ёпилган колбани иситма: ички босим хавфли ошиши мумкин."
   },
   "fact": {
    "ru": "Колба названа в честь химика Эмиля Эрленмейера.",
    "en": "The flask is named after the chemist Emil Erlenmeyer.",
    "uz-Latn": "Kolba kimyogar Emil Erlenmeyer nomi bilan atalgan.",
    "uz-Cyrl": "Колба кимёгар Эмил Эрленмейер номи билан аталган."
   },
   "parts": [
    {
     "key": "0",
     "name": {
      "ru": "Узкое горло",
      "en": "Narrow neck",
      "uz-Latn": "Tor bo‘yin",
      "uz-Cyrl": "Тор бўйин"
     }
    },
    {
     "key": "1",
     "name": {
      "ru": "Конический корпус",
      "en": "Conical body",
      "uz-Latn": "Konussimon korpus",
      "uz-Cyrl": "Конуссимон корпус"
     }
    },
    {
     "key": "2",
     "name": {
      "ru": "Плоское дно",
      "en": "Flat base",
      "uz-Latn": "Yassi tub",
      "uz-Cyrl": "Ясси туб"
     }
    }
   ]
  },
  {
   "id": "funnel",
   "material": "glass",
   "heat": false,
   "precision": "none",
   "definition": {
    "ru": "Стеклянный конус с узкой трубкой-носиком. При фильтровании внутрь помещают фильтровальную бумагу.",
    "en": "A glass cone with a narrow stem. Filter paper is placed inside it for filtration.",
    "uz-Latn": "Ingichka nayli shisha konus. Filtrlashda ichiga filtr qog‘ozi qo‘yiladi.",
    "uz-Cyrl": "Ингичка найли шиша конус. Фильтрлашда ичига фильтр қоғози қўйилади."
   },
   "uses": [
    {
     "ru": "💧 Переливание в сосуд с узким горлом",
     "en": "💧 Pouring into a narrow-necked vessel",
     "uz-Latn": "💧 Tor og‘izli idishga quyish",
     "uz-Cyrl": "💧 Тор оғизли идишга қуйиш"
    },
    {
     "ru": "📄 Фильтрование смеси через бумагу",
     "en": "📄 Filtering a mixture through paper",
     "uz-Latn": "📄 Aralashmani qog‘oz orqali filtrlash",
     "uz-Cyrl": "📄 Аралашмани қоғоз орқали фильтрлаш"
    }
   ],
   "why": {
    "ru": "Конус поддерживает бумажный фильтр, а трубка направляет жидкость. Кольцо штатива держит воронку устойчиво.",
    "en": "The cone supports filter paper and the stem guides the liquid. A stand ring holds the funnel securely.",
    "uz-Latn": "Konus filtr qog‘ozini ushlab, nay suyuqlikni yo‘naltiradi. Shtativ halqasi voronkani barqaror tutadi.",
    "uz-Cyrl": "Конус фильтр қоғозини ушлаб, най суюқликни йўналтиради. Штатив ҳалқаси воронкани барқарор тутади."
   },
   "safe": {
    "ru": "Закрепи воронку в кольце. Пусть кончик носика касается внутренней стенки приёмного сосуда. Наливай медленно.",
    "en": "Support the funnel in a ring. Let the stem tip touch the inside wall of the receiving vessel. Pour slowly.",
    "uz-Latn": "Voronkani halqaga o‘rnat. Nay uchini qabul qiluvchi idishning ichki devoriga tekkiz. Sekin quy.",
    "uz-Cyrl": "Воронкани ҳалқага ўрнат. Най учини қабул қилувчи идишнинг ички деворига теккиз. Секин қуй."
   },
   "never": {
    "ru": "Не наливай выше края фильтровальной бумаги: смесь обойдёт фильтр. Не нагревай воронку на пламени.",
    "en": "Do not fill above the filter-paper edge: the mixture could bypass the filter. Do not heat the funnel in a flame.",
    "uz-Latn": "Filtr qog‘ozi chetidan yuqori quyma: aralashma filtrni chetlab o‘tadi. Voronkani alangada isitma.",
    "uz-Cyrl": "Фильтр қоғози четидан юқори қуйма: аралашма фильтрни четлаб ўтади. Воронкани алангада иситма."
   },
   "fact": {
    "ru": "При фильтровании твёрдые частицы остаются на бумаге, а прошедшая жидкость называется фильтратом.",
    "en": "During filtration, solid particles stay on the paper. The liquid that passes through is called the filtrate.",
    "uz-Latn": "Filtrlashda qattiq zarrachalar qog‘ozda qoladi. O‘tgan suyuqlik filtrat deyiladi.",
    "uz-Cyrl": "Фильтрлашда қаттиқ заррачалар қоғозда қолади. Ўтган суюқлик фильтрат дейилади."
   },
   "parts": [
    {
     "key": "0",
     "name": {
      "ru": "Конус",
      "en": "Cone",
      "uz-Latn": "Konus",
      "uz-Cyrl": "Конус"
     }
    },
    {
     "key": "1",
     "name": {
      "ru": "Трубка-носик",
      "en": "Stem",
      "uz-Latn": "Nay-tumshuqcha",
      "uz-Cyrl": "Най-тумшуқча"
     }
    },
    {
     "key": "2",
     "name": {
      "ru": "Кольцо штатива",
      "en": "Support ring",
      "uz-Latn": "Shtativ halqasi",
      "uz-Cyrl": "Штатив ҳалқаси"
     }
    }
   ]
  },
  {
   "id": "measuring-cylinder",
   "material": "glass",
   "heat": false,
   "precision": "high",
   "definition": {
    "ru": "Высокий узкий сосуд со шкалой для измерения объёма жидкости.",
    "en": "A tall, narrow graduated vessel for measuring liquid volume.",
    "uz-Latn": "Suyuqlik hajmini o‘lchash uchun shkalali baland, tor idish.",
    "uz-Cyrl": "Суюқлик ҳажмини ўлчаш учун шкалали баланд, тор идиш."
   },
   "uses": [
    {
     "ru": "📏 Измерение объёма жидкости",
     "en": "📏 Measuring liquid volume",
     "uz-Latn": "📏 Suyuqlik hajmini o‘lchash",
     "uz-Cyrl": "📏 Суюқлик ҳажмини ўлчаш"
    },
    {
     "ru": "💧 Отмеривание порции для учебного опыта",
     "en": "💧 Measuring a portion for an experiment",
     "uz-Latn": "💧 O‘quv tajribasi uchun miqdor o‘lchash",
     "uz-Cyrl": "💧 Ўқув тажрибаси учун миқдор ўлчаш"
    }
   ],
   "why": {
    "ru": "В узком сосуде небольшое изменение объёма заметно меняет уровень. Частая шкала даёт более точное измерение, чем деления стакана.",
    "en": "In a narrow vessel, a small volume change noticeably changes the level. Fine graduations are more accurate than beaker marks.",
    "uz-Latn": "Tor idishda hajmning oz o‘zgarishi sathni sezilarli o‘zgartiradi. Mayda bo‘linmalar stakannikidan aniqroq o‘lchaydi.",
    "uz-Cyrl": "Тор идишда ҳажмнинг оз ўзгариши сатҳни сезиларли ўзгартиради. Майда бўлинмалар стаканникидан аниқроқ ўлчайди."
   },
   "safe": {
    "ru": "Поставь на ровную поверхность. Для воды и прозрачных водных растворов читай нижний край мениска на уровне глаз.",
    "en": "Place it on a level surface. For water and clear aqueous solutions, read the bottom of the meniscus at eye level.",
    "uz-Latn": "Tekis yuzaga qo‘y. Suv va shaffof suvli eritmalarda meniskning pastki chetini ko‘z balandligida o‘qi.",
    "uz-Cyrl": "Текис юзага қўй. Сув ва шаффоф сувли эритмаларда менискнинг пастки четини кўз баландлигида ўқи."
   },
   "never": {
    "ru": "Не нагревай цилиндр и не растворяй в нём вещества. Не держи его в руке при чтении шкалы.",
    "en": "Do not heat it or dissolve substances in it. Do not hold it in your hand while reading the scale.",
    "uz-Latn": "Silindrni isitma va unda moddalarni eritma. Shkalani o‘qishda qo‘lda ushlab turma.",
    "uz-Cyrl": "Цилиндрни иситма ва унда моддаларни эритма. Шкалани ўқишда қўлда ушлаб турма."
   },
   "fact": {
    "ru": "Мениск — изогнутая поверхность жидкости. Водный мениск в чистом стекле обычно вогнутый.",
    "en": "The meniscus is the curved liquid surface. Water in clean glass usually forms a concave meniscus.",
    "uz-Latn": "Menisk — suyuqlikning egilgan yuzasi. Toza shishadagi suv meniski odatda botiq bo‘ladi.",
    "uz-Cyrl": "Мениск — суюқликнинг эгилган юзаси. Тоза шишадаги сув мениски одатда ботиқ бўлади."
   },
   "parts": [
    {
     "key": "0",
     "name": {
      "ru": "Шкала",
      "en": "Scale",
      "uz-Latn": "Shkala",
      "uz-Cyrl": "Шкала"
     }
    },
    {
     "key": "1",
     "name": {
      "ru": "Мениск",
      "en": "Meniscus",
      "uz-Latn": "Menisk",
      "uz-Cyrl": "Мениск"
     }
    },
    {
     "key": "2",
     "name": {
      "ru": "Шестигранное основание",
      "en": "Hexagonal base",
      "uz-Latn": "Olti qirrali asos",
      "uz-Cyrl": "Олти қиррали асос"
     }
    }
   ]
  }
 ]
};
