/* Темы, учебные опыты и переводы новых игровых элементов. */
const CourseData={
 "topics": [
  {
   "id": "safety",
   "number": 0,
   "title": {
    "ru": "Техника безопасности и оборудование",
    "uz-Latn": "Xavfsizlik va jihozlar",
    "en": "Safety and equipment"
   },
   "icon": "topic-01-intro",
   "color": "#1c8873",
   "description": {
    "ru": "Узнай назначение приборов и подготовь безопасное рабочее место.",
    "uz-Latn": "Jihozlar vazifasini o‘rgan va xavfsiz ish joyini tayyorla.",
    "en": "Discover lab equipment and prepare a safe workspace."
   },
   "ready": true,
   "steps": {
    "theory": [
     {
      "ru": "Надень защитные очки. Реальные опыты выполняют с преподавателем.",
      "uz-Latn": "Himoya ko‘zoynagi taq. Haqiqiy tajribani o‘qituvchi bilan bajar.",
      "en": "Wear goggles. Perform real experiments with your teacher."
     },
     {
      "ru": "Не пробуй вещества и не вдыхай их прямо из сосуда.",
      "uz-Latn": "Moddalarni tatib ko‘rma va idishdan to‘g‘ridan-to‘g‘ri hidlama.",
      "en": "Never taste substances or inhale directly from a vessel."
     },
     {
      "ru": "Пробирка, мерный цилиндр и штатив выполняют разные задачи.",
      "uz-Latn": "Probirka, o‘lchov silindri va shtativning vazifalari turlicha.",
      "en": "A test tube, measuring cylinder and stand have different roles."
     },
     {
      "ru": "Выключи нагрев и дождись охлаждения перед сменой опыта.",
      "uz-Latn": "Tajribani almashtirishdan oldin isitishni o‘chir va sovishini kut.",
      "en": "Switch off heating and let equipment cool before changing experiments."
     }
    ],
    "experiments": [
     {
      "id": "safety-audit",
      "kind": "safety",
      "key": "safety",
      "title": {
       "ru": "Найди нарушение",
       "uz-Latn": "Qoidabuzarlikni top",
       "en": "Spot the hazard"
      },
      "minutes": 3,
      "difficulty": 1,
      "substance": "water"
     }
    ],
    "quiz": [
     {
      "prompt": {
       "ru": "Что защищает глаза?",
       "uz-Latn": "Ko‘zni nima himoya qiladi?",
       "en": "What protects your eyes?"
      },
      "options": [
       {
        "ru": "Защитные очки",
        "uz-Latn": "Himoya ko‘zoynagi",
        "en": "Safety goggles"
       },
       {
        "ru": "Перчатки",
        "uz-Latn": "Qo‘lqop",
        "en": "Gloves"
       },
       {
        "ru": "Тетрадь",
        "uz-Latn": "Daftar",
        "en": "Notebook"
       }
      ],
      "correct": 0
     },
     {
      "prompt": {
       "ru": "Можно ли пробовать реактив на вкус?",
       "uz-Latn": "Reaktivni tatib ko‘rish mumkinmi?",
       "en": "May you taste a reagent?"
      },
      "options": [
       {
        "ru": "Нет",
        "uz-Latn": "Yo‘q",
        "en": "No"
       },
       {
        "ru": "Да, если он белый",
        "uz-Latn": "Oq bo‘lsa, ha",
        "en": "Yes, if it is white"
       },
       {
        "ru": "Только соль из лаборатории",
        "uz-Latn": "Faqat laboratoriya tuzini",
        "en": "Only laboratory salt"
       }
      ],
      "correct": 0
     },
     {
      "prompt": {
       "ru": "Для чего нужен штатив?",
       "uz-Latn": "Shtativ nima uchun kerak?",
       "en": "What is a stand used for?"
      },
      "options": [
       {
        "ru": "Удерживать оборудование",
        "uz-Latn": "Jihozlarni ushlab turish",
        "en": "Holding equipment"
       },
       {
        "ru": "Пробовать вещество",
        "uz-Latn": "Moddani tatish",
        "en": "Tasting substances"
       },
       {
        "ru": "Измерять массу",
        "uz-Latn": "Massani o‘lchash",
        "en": "Measuring mass"
       }
      ],
      "correct": 0
     },
     {
      "prompt": {
       "ru": "Что сделать перед сменой нагреваемого опыта?",
       "uz-Latn": "Isitilayotgan tajribani almashtirishdan oldin nima qilish kerak?",
       "en": "Before changing a heated experiment, what should you do?"
      },
      "options": [
       {
        "ru": "Выключить нагрев и дождаться охлаждения",
        "uz-Latn": "Isitishni o‘chirib, sovishini kutish",
        "en": "Switch off heat and wait for cooling"
       },
       {
        "ru": "Сразу взять горячую посуду",
        "uz-Latn": "Issiq idishni darhol olish",
        "en": "Pick up hot glassware immediately"
       },
       {
        "ru": "Оставить огонь",
        "uz-Latn": "Olovni qoldirish",
        "en": "Leave the flame on"
       }
      ],
      "correct": 0
     },
     {
      "prompt": {
       "ru": "Как измеряют объём жидкости?",
       "uz-Latn": "Suyuqlik hajmi qanday o‘lchanadi?",
       "en": "What measures liquid volume?"
      },
      "options": [
       {
        "ru": "Мерным цилиндром",
        "uz-Latn": "O‘lchov silindri bilan",
        "en": "A measuring cylinder"
       },
       {
        "ru": "Штативом",
        "uz-Latn": "Shtativ bilan",
        "en": "A stand"
       },
       {
        "ru": "Держателем",
        "uz-Latn": "Tutqich bilan",
        "en": "A holder"
       }
      ],
      "correct": 0
     }
    ]
   },
   "upcoming": []
  },
  {
   "id": "properties",
   "number": 1,
   "title": {
    "ru": "Вещества и их свойства",
    "uz-Latn": "Moddalar va ularning xossalari",
    "en": "Substances and their properties"
   },
   "icon": "topic-03-substances",
   "color": "#df7624",
   "description": {
    "ru": "Сравни цвет, состояние и другие физические свойства образцов.",
    "uz-Latn": "Namunalarning rangi, holati va boshqa fizik xossalarini solishtir.",
    "en": "Compare the colour, state and other physical properties of samples."
   },
   "ready": true,
   "steps": {
    "theory": "legacy:properties",
    "experiments": [
     {
      "id": "properties-salt",
      "kind": "properties",
      "key": "salt",
      "minutes": 5,
      "difficulty": 1,
      "substance": "salt"
     },
     {
      "id": "properties-sugar",
      "kind": "properties",
      "key": "sugar",
      "minutes": 5,
      "difficulty": 1,
      "substance": "sugar"
     },
     {
      "id": "properties-soda",
      "kind": "properties",
      "key": "soda",
      "minutes": 5,
      "difficulty": 1,
      "substance": "soda"
     },
     {
      "id": "properties-copper-sulfate",
      "kind": "properties",
      "key": "copper-sulfate",
      "minutes": 5,
      "difficulty": 1,
      "substance": "copper-sulfate"
     },
     {
      "id": "properties-aluminium",
      "kind": "properties",
      "key": "aluminium",
      "minutes": 5,
      "difficulty": 1,
      "substance": "aluminium"
     },
     {
      "id": "properties-zinc",
      "kind": "properties",
      "key": "zinc",
      "minutes": 5,
      "difficulty": 1,
      "substance": "zinc"
     },
     {
      "id": "properties-iron",
      "kind": "properties",
      "key": "iron",
      "minutes": 5,
      "difficulty": 1,
      "substance": "iron"
     },
     {
      "id": "properties-copper",
      "kind": "properties",
      "key": "copper",
      "minutes": 5,
      "difficulty": 1,
      "substance": "copper"
     },
     {
      "id": "properties-water",
      "kind": "properties",
      "key": "water",
      "minutes": 5,
      "difficulty": 1,
      "substance": "water"
     },
     {
      "id": "properties-ethanol",
      "kind": "properties",
      "key": "ethanol",
      "minutes": 5,
      "difficulty": 1,
      "substance": "ethanol"
     },
     {
      "id": "properties-sulfur",
      "kind": "properties",
      "key": "sulfur",
      "minutes": 5,
      "difficulty": 1,
      "substance": "sulfur"
     },
     {
      "id": "properties-iodine",
      "kind": "properties",
      "key": "iodine",
      "minutes": 5,
      "difficulty": 1,
      "substance": "iodine"
     },
     {
      "id": "properties-comparison",
      "kind": "comparison",
      "key": "comparison",
      "title": {
       "ru": "Сравнение соли и серы",
       "uz-Latn": "Tuz va oltingugurtni solishtirish",
       "en": "Compare salt and sulfur"
      },
      "minutes": 5,
      "difficulty": 2,
      "substance": "sulfur"
     }
    ],
    "quiz": [
     {
      "prompt": {
       "ru": "Какое состояние у воды при обычных условиях?",
       "uz-Latn": "Oddiy sharoitda suvning holati qanday?",
       "en": "What is the state of water under ordinary conditions?"
      },
      "options": [
       {
        "ru": "Жидкое",
        "uz-Latn": "Suyuq",
        "en": "Liquid"
       },
       {
        "ru": "Твёрдое",
        "uz-Latn": "Qattiq",
        "en": "Solid"
       },
       {
        "ru": "Газообразное",
        "uz-Latn": "Gazsimon",
        "en": "Gas"
       }
      ],
      "correct": 0
     },
     {
      "prompt": {
       "ru": "Какого цвета сера?",
       "uz-Latn": "Oltingugurt qanday rangda?",
       "en": "What colour is sulfur?"
      },
      "options": [
       {
        "ru": "Жёлтая",
        "uz-Latn": "Sariq",
        "en": "Yellow"
       },
       {
        "ru": "Синяя",
        "uz-Latn": "Ko‘k",
        "en": "Blue"
       },
       {
        "ru": "Красная",
        "uz-Latn": "Qizil",
        "en": "Red"
       }
      ],
      "correct": 0
     },
     {
      "prompt": {
       "ru": "Что происходит с солью при растворении?",
       "uz-Latn": "Tuz eriganda nima bo‘ladi?",
       "en": "What happens when salt dissolves?"
      },
      "options": [
       {
        "ru": "Распределяется в воде",
        "uz-Latn": "Suvda tarqaladi",
        "en": "It disperses in the water"
       },
       {
        "ru": "Исчезает как вещество",
        "uz-Latn": "Modda sifatida yo‘qoladi",
        "en": "It ceases to exist"
       },
       {
        "ru": "Превращается в медь",
        "uz-Latn": "Misga aylanadi",
        "en": "It becomes copper"
       }
      ],
      "correct": 0
     },
     {
      "prompt": {
       "ru": "Одинаковый цвет доказывает одинаковое вещество?",
       "uz-Latn": "Bir xil rang moddalar bir xilligini isbotlaydimi?",
       "en": "Does the same colour prove two substances are identical?"
      },
      "options": [
       {
        "ru": "Нет, нужны другие свойства",
        "uz-Latn": "Yo‘q, boshqa xossalar ham kerak",
        "en": "No, compare other properties"
       },
       {
        "ru": "Да, всегда",
        "uz-Latn": "Ha, doim",
        "en": "Yes, always"
       },
       {
        "ru": "Только у жидкостей",
        "uz-Latn": "Faqat suyuqliklarda",
        "en": "Only for liquids"
       }
      ],
      "correct": 0
     },
     {
      "prompt": {
       "ru": "Какая пара — два металла?",
       "uz-Latn": "Qaysi juftlik ikki metall?",
       "en": "Which pair contains two metals?"
      },
      "options": [
       {
        "ru": "Медь и железо",
        "uz-Latn": "Mis va temir",
        "en": "Copper and iron"
       },
       {
        "ru": "Соль и сахар",
        "uz-Latn": "Tuz va shakar",
        "en": "Salt and sugar"
       },
       {
        "ru": "Вода и спирт",
        "uz-Latn": "Suv va spirt",
        "en": "Water and alcohol"
       }
      ],
      "correct": 0
     }
    ]
   },
   "upcoming": []
  },
  {
   "id": "mixtures",
   "number": 2,
   "title": {
    "ru": "Чистые вещества и смеси",
    "uz-Latn": "Sof moddalar va aralashmalar",
    "en": "Pure substances and mixtures"
   },
   "icon": "topic-04-mixtures",
   "color": "#c68417",
   "description": {
    "ru": "Узнай, как устроены смеси и как разделять их компоненты.",
    "uz-Latn": "Aralashmalar tuzilishi va ularni ajratish usullarini o‘rgan.",
    "en": "Explore mixtures and ways to separate their components."
   },
   "ready": false,
   "steps": {
    "theory": "legacy:mixtures",
    "experiments": [],
    "quiz": []
   },
   "upcoming": [
    {
     "ru": "Фильтрование",
     "uz-Latn": "Filtrlash",
     "en": "Filtration"
    },
    {
     "ru": "Отстаивание",
     "uz-Latn": "Tindirish",
     "en": "Settling"
    },
    {
     "ru": "Выпаривание",
     "uz-Latn": "Bug‘latish",
     "en": "Evaporation"
    },
    {
     "ru": "Магнитное разделение",
     "uz-Latn": "Magnit bilan ajratish",
     "en": "Magnetic separation"
    }
   ]
  },
  {
   "id": "physical",
   "number": 3,
   "title": {
    "ru": "Физические явления",
    "uz-Latn": "Fizik hodisalar",
    "en": "Physical changes"
   },
   "icon": "topic-05-physical",
   "color": "#c74851",
   "description": {
    "ru": "Наблюдай плавление, испарение и растворение без образования новых веществ.",
    "uz-Latn": "Yangi moddalar hosil bo‘lmasdan erish, bug‘lanish va eruvchanlikni kuzat.",
    "en": "Observe melting, evaporation and dissolving without forming new substances."
   },
   "ready": true,
   "steps": {
    "theory": "legacy:physical",
    "experiments": [
     {
      "id": "physical-wax",
      "kind": "physical",
      "key": "wax",
      "titleKey": "physical1",
      "minutes": 5,
      "difficulty": 2,
      "substance": "paraffin"
     },
     {
      "id": "physical-salt",
      "kind": "physical",
      "key": "salt",
      "titleKey": "physical2",
      "minutes": 5,
      "difficulty": 2,
      "substance": "salt"
     },
     {
      "id": "physical-reference",
      "kind": "physical",
      "key": "reference",
      "titleKey": "physical3",
      "minutes": 5,
      "difficulty": 2,
      "substance": "ethanol"
     }
    ],
    "quiz": [
     {
      "prompt": {
       "ru": "При плавлении парафина меняется…",
       "uz-Latn": "Parafin eriganda nima o‘zgaradi?",
       "en": "When paraffin melts, what changes?"
      },
      "options": [
       {
        "ru": "Агрегатное состояние",
        "uz-Latn": "Agregat holati",
        "en": "Its physical state"
       },
       {
        "ru": "Химический состав",
        "uz-Latn": "Kimyoviy tarkibi",
        "en": "Its chemical composition"
       },
       {
        "ru": "Название элемента",
        "uz-Latn": "Element nomi",
        "en": "The element name"
       }
      ],
      "correct": 0
     },
     {
      "prompt": {
       "ru": "Что остаётся после выпаривания раствора соли?",
       "uz-Latn": "Tuz eritmasi bug‘latilganda nima qoladi?",
       "en": "What remains after evaporating salt solution?"
      },
      "options": [
       {
        "ru": "Соль",
        "uz-Latn": "Tuz",
        "en": "Salt"
       },
       {
        "ru": "Медь",
        "uz-Latn": "Mis",
        "en": "Copper"
       },
       {
        "ru": "Уголь",
        "uz-Latn": "Ko‘mir",
        "en": "Charcoal"
       }
      ],
      "correct": 0
     },
     {
      "prompt": {
       "ru": "Какое явление физическое?",
       "uz-Latn": "Qaysi hodisa fizik?",
       "en": "Which change is physical?"
      },
      "options": [
       {
        "ru": "Таяние льда",
        "uz-Latn": "Muzning erishi",
        "en": "Melting ice"
       },
       {
        "ru": "Горение бумаги",
        "uz-Latn": "Qog‘ozning yonishi",
        "en": "Burning paper"
       },
       {
        "ru": "Ржавление железа",
        "uz-Latn": "Temirning zanglashi",
        "en": "Rusting iron"
       }
      ],
      "correct": 0
     },
     {
      "prompt": {
       "ru": "Охлаждённый расплав парафина…",
       "uz-Latn": "Sovitilgan suyuq parafin…",
       "en": "When molten paraffin cools, it…"
      },
      "options": [
       {
        "ru": "Снова затвердевает",
        "uz-Latn": "Yana qotadi",
        "en": "Solidifies again"
       },
       {
        "ru": "Становится медью",
        "uz-Latn": "Misga aylanadi",
        "en": "Becomes copper"
       },
       {
        "ru": "Обязательно горит",
        "uz-Latn": "Albatta yonadi",
        "en": "Must burn"
       }
      ],
      "correct": 0
     },
     {
      "prompt": {
       "ru": "Как представлен запах в виртуальном опыте?",
       "uz-Latn": "Virtual tajribada hid qanday berilgan?",
       "en": "How is smell represented in this virtual lab?"
      },
      "options": [
       {
        "ru": "Справочным описанием",
        "uz-Latn": "Ma’lumot tavsifi bilan",
        "en": "By a reference description"
       },
       {
        "ru": "Браузер выделяет газ",
        "uz-Latn": "Brauzer gaz chiqaradi",
        "en": "The browser releases a gas"
       },
       {
        "ru": "Нужно нюхать экран",
        "uz-Latn": "Ekranni hidlash kerak",
        "en": "You must sniff the screen"
       }
      ],
      "correct": 0
     }
    ]
   },
   "upcoming": []
  },
  {
   "id": "chemical",
   "number": 4,
   "title": {
    "ru": "Химические явления и признаки реакций",
    "uz-Latn": "Kimyoviy hodisalar va reaksiya belgilari",
    "en": "Chemical changes and signs of reactions"
   },
   "icon": "topic-06-chemical",
   "color": "#b83c83",
   "description": {
    "ru": "Исследуй признаки реакций: изменение цвета, выделение газа и тепла.",
    "uz-Latn": "Reaksiya belgilarini o‘rgan: rang o‘zgarishi, gaz va issiqlik ajralishi.",
    "en": "Explore reaction signs: colour changes, gas and heat."
   },
   "ready": true,
   "steps": {
    "theory": "legacy:chemical",
    "experiments": [
     {
      "id": "chemical-paper",
      "kind": "chemical",
      "key": "paper",
      "minutes": 5,
      "difficulty": 3,
      "substance": "water"
     },
     {
      "id": "chemical-alcohol",
      "kind": "chemical",
      "key": "alcohol",
      "minutes": 5,
      "difficulty": 3,
      "substance": "ethanol"
     },
     {
      "id": "chemical-gas",
      "kind": "chemical",
      "key": "gas",
      "minutes": 5,
      "difficulty": 3,
      "substance": "water"
     },
     {
      "id": "chemical-match",
      "kind": "chemical",
      "key": "match",
      "minutes": 5,
      "difficulty": 3,
      "substance": "water"
     },
     {
      "id": "chemical-copper",
      "kind": "chemical",
      "key": "copper",
      "minutes": 5,
      "difficulty": 3,
      "substance": "copper"
     },
     {
      "id": "chemical-chalk",
      "kind": "chemical",
      "key": "chalk",
      "minutes": 5,
      "difficulty": 3,
      "substance": "calcium-carbonate"
     },
     {
      "id": "chemical-marble",
      "kind": "chemical",
      "key": "marble",
      "minutes": 5,
      "difficulty": 3,
      "substance": "calcium-carbonate"
     },
     {
      "id": "chemical-limestone",
      "kind": "chemical",
      "key": "limestone",
      "minutes": 5,
      "difficulty": 3,
      "substance": "calcium-carbonate"
     }
    ],
    "quiz": [
     {
      "prompt": {
       "ru": "При нагревании меди на воздухе появляется…",
       "uz-Latn": "Mis havoda isitilganda nima hosil bo‘ladi?",
       "en": "Heating copper in air produces…"
      },
      "options": [
       {
        "ru": "Чёрный оксид меди(II)",
        "uz-Latn": "Qora mis(II) oksidi",
        "en": "Black copper(II) oxide"
       },
       {
        "ru": "Поваренная соль",
        "uz-Latn": "Osh tuzi",
        "en": "Table salt"
       },
       {
        "ru": "Сахар",
        "uz-Latn": "Shakar",
        "en": "Sugar"
       }
      ],
      "correct": 0
     },
     {
      "prompt": {
       "ru": "Кислота и карбонат кальция выделяют…",
       "uz-Latn": "Kislota va kalsiy karbonat nima ajratadi?",
       "en": "An acid and calcium carbonate release…"
      },
      "options": [
       {
        "ru": "Углекислый газ",
        "uz-Latn": "Karbonat angidrid",
        "en": "Carbon dioxide"
       },
       {
        "ru": "Металл",
        "uz-Latn": "Metall",
        "en": "Metal"
       },
       {
        "ru": "Поваренную соль",
        "uz-Latn": "Osh tuzi",
        "en": "Table salt"
       }
      ],
      "correct": 0
     },
     {
      "prompt": {
       "ru": "Главное отличие химического явления?",
       "uz-Latn": "Kimyoviy hodisaning asosiy farqi nima?",
       "en": "What distinguishes a chemical change?"
      },
      "options": [
       {
        "ru": "Образуются новые вещества",
        "uz-Latn": "Yangi moddalar hosil bo‘ladi",
        "en": "New substances form"
       },
       {
        "ru": "Меняется только форма",
        "uz-Latn": "Faqat shakl o‘zgaradi",
        "en": "Only shape changes"
       },
       {
        "ru": "Любое движение",
        "uz-Latn": "Har qanday harakat",
        "en": "Any movement"
       }
      ],
      "correct": 0
     },
     {
      "prompt": {
       "ru": "Горение бумаги — это…",
       "uz-Latn": "Qog‘oz yonishi qanday hodisa?",
       "en": "Burning paper is…"
      },
      "options": [
       {
        "ru": "Химическое явление",
        "uz-Latn": "Kimyoviy hodisa",
        "en": "A chemical change"
       },
       {
        "ru": "Только изменение формы",
        "uz-Latn": "Faqat shakl o‘zgarishi",
        "en": "Only a change in shape"
       },
       {
        "ru": "Замерзание",
        "uz-Latn": "Muzlash",
        "en": "Freezing"
       }
      ],
      "correct": 0
     },
     {
      "prompt": {
       "ru": "Что помогает подтвердить реакцию?",
       "uz-Latn": "Reaksiyani tasdiqlashga nima yordam beradi?",
       "en": "What helps confirm a reaction?"
      },
      "options": [
       {
        "ru": "Признаки вместе со знанием процесса",
        "uz-Latn": "Belgilar va jarayon haqidagi bilim",
        "en": "Signs interpreted with knowledge of the process"
       },
       {
        "ru": "Только красивый цвет",
        "uz-Latn": "Faqat chiroyli rang",
        "en": "Only an attractive colour"
       },
       {
        "ru": "Только размер сосуда",
        "uz-Latn": "Faqat idish kattaligi",
        "en": "Only the vessel size"
       }
      ],
      "correct": 0
     }
    ]
   },
   "upcoming": []
  },
  {
   "id": "atoms",
   "number": 5,
   "title": {
    "ru": "Атомы, молекулы и химические элементы",
    "uz-Latn": "Atomlar, molekulalar va kimyoviy elementlar",
    "en": "Atoms, molecules and chemical elements"
   },
   "icon": "topic-07-atoms",
   "color": "#6d50bc",
   "description": {
    "ru": "Познакомься с атомами, молекулами и химическими элементами.",
    "uz-Latn": "Atomlar, molekulalar va kimyoviy elementlar bilan tanish.",
    "en": "Meet atoms, molecules and chemical elements."
   },
   "ready": false,
   "steps": {
    "theory": "legacy:atoms",
    "experiments": [],
    "quiz": []
   },
   "upcoming": []
  }
 ],
 "ui": {
  "topics": {
   "ru": "Темы",
   "uz-Latn": "Mavzular",
   "en": "Topics"
  },
  "route": {
   "ru": "Маршрут обучения",
   "uz-Latn": "O‘quv yo‘li",
   "en": "Learning journey"
  },
  "theory": {
   "ru": "Теория",
   "uz-Latn": "Nazariya",
   "en": "Theory"
  },
  "experiments": {
   "ru": "Опыты",
   "uz-Latn": "Tajribalar",
   "en": "Experiments"
  },
  "quiz": {
   "ru": "Мини-тест",
   "uz-Latn": "Mini-test",
   "en": "Mini quiz"
  },
  "soon": {
   "ru": "Скоро",
   "uz-Latn": "Tez kunda",
   "en": "Coming soon"
  },
  "locked": {
   "ru": "Пройди тему {n}, чтобы открыть",
   "uz-Latn": "Ochish uchun {n}-mavzuni yakunla",
   "en": "Complete topic {n} to unlock"
  },
  "read": {
   "ru": "Прочитано",
   "uz-Latn": "O‘qidim",
   "en": "Read"
  },
  "next": {
   "ru": "Далее",
   "uz-Latn": "Keyingi",
   "en": "Next"
  },
  "back": {
   "ru": "Назад",
   "uz-Latn": "Orqaga",
   "en": "Back"
  },
  "check": {
   "ru": "Проверить",
   "uz-Latn": "Tekshirish",
   "en": "Check"
  },
  "continue": {
   "ru": "Продолжить",
   "uz-Latn": "Davom etish",
   "en": "Continue"
  },
  "home": {
   "ru": "Главная",
   "uz-Latn": "Bosh sahifa",
   "en": "Home"
  },
  "steps": {
   "ru": "шагов",
   "uz-Latn": "qadam",
   "en": "steps"
  },
  "of": {
   "ru": "из",
   "uz-Latn": "/",
   "en": "of"
  },
  "passed": {
   "ru": "Пройдено",
   "uz-Latn": "Bajarildi",
   "en": "Completed"
  },
  "retry": {
   "ru": "Попробовать ещё раз",
   "uz-Latn": "Yana urinish",
   "en": "Try again"
  },
  "result": {
   "ru": "Результат",
   "uz-Latn": "Natija",
   "en": "Result"
  },
  "passNote": {
   "ru": "4 из 5 — тема пройдена",
   "uz-Latn": "5 tadan 4 — mavzu bajarildi",
   "en": "4 out of 5 completes this topic"
  },
  "equipment": {
   "ru": "Оборудование",
   "uz-Latn": "Jihozlar",
   "en": "Equipment"
  },
  "all": {
   "ru": "Все темы",
   "uz-Latn": "Barcha mavzular",
   "en": "All topics"
  },
  "inProgress": {
   "ru": "В процессе",
   "uz-Latn": "Jarayonda",
   "en": "In progress"
  },
  "new": {
   "ru": "Новое",
   "uz-Latn": "Yangi",
   "en": "New"
  },
  "resume": {
   "ru": "Продолжить обучение",
   "uz-Latn": "O‘qishni davom ettirish",
   "en": "Continue learning"
  },
  "nextExperience": {
   "ru": "Следующий опыт",
   "uz-Latn": "Keyingi tajriba",
   "en": "Next experiment"
  },
  "nextTopic": {
   "ru": "Следующая тема",
   "uz-Latn": "Keyingi mavzu",
   "en": "Next topic"
  },
  "more": {
   "ru": "Все разделы",
   "uz-Latn": "Barcha bo‘limlar",
   "en": "All sections"
  },
  "today": {
   "ru": "Сегодня в лаборатории",
   "uz-Latn": "Bugun laboratoriyada",
   "en": "Today in the laboratory"
  },
  "dailyExperiment": {
   "ru": "Опыт дня",
   "uz-Latn": "Kun tajribasi",
   "en": "Experiment of the day"
  },
  "dailyFact": {
   "ru": "Факт дня",
   "uz-Latn": "Kun fakti",
   "en": "Fact of the day"
  },
  "challenge": {
   "ru": "Быстрый вызов",
   "uz-Latn": "Tezkor sinov",
   "en": "Quick challenge"
  },
  "games": {
   "ru": "Игры",
   "uz-Latn": "O‘yinlar",
   "en": "Games"
  },
  "collection": {
   "ru": "Моя коллекция веществ",
   "uz-Latn": "Moddalar to‘plamim",
   "en": "My substance collection"
  },
  "awards": {
   "ru": "Мои достижения",
   "uz-Latn": "Yutuqlarim",
   "en": "My achievements"
  },
  "progress": {
   "ru": "Прогресс",
   "uz-Latn": "Natijalar",
   "en": "Progress"
  },
  "rank": {
   "ru": "Звание",
   "uz-Latn": "Unvon",
   "en": "Rank"
  },
  "streak": {
   "ru": "дней подряд",
   "uz-Latn": "kun ketma-ket",
   "en": "days in a row"
  },
  "activity": {
   "ru": "Активность",
   "uz-Latn": "Faollik",
   "en": "Activity"
  },
  "tests": {
   "ru": "Результаты тестов",
   "uz-Latn": "Test natijalari",
   "en": "Quiz results"
  },
  "helper": {
   "ru": "Лягушонок-помощник",
   "uz-Latn": "Qurbaqa-yordamchi",
   "en": "Frog helper"
  },
  "large": {
   "ru": "Крупный шрифт",
   "uz-Latn": "Yirik shrift",
   "en": "Large text"
  },
  "sound": {
   "ru": "Звук",
   "uz-Latn": "Ovoz",
   "en": "Sound"
  },
  "reset": {
   "ru": "Сбросить прогресс",
   "uz-Latn": "Natijalarni tozalash",
   "en": "Reset progress"
  },
  "emptyFilter": {
   "ru": "Здесь пока нет тем",
   "uz-Latn": "Hozircha mavzu yo‘q",
   "en": "No topics here yet"
  },
  "collectionHint": {
   "ru": "Выполни опыт с этим веществом",
   "uz-Latn": "Shu modda bilan tajriba bajar",
   "en": "Complete an experiment with this substance"
  },
  "helpWelcome": {
   "ru": "Привет! Начнём с безопасности?",
   "uz-Latn": "Salom! Xavfsizlikdan boshlaymizmi?",
   "en": "Hello! Shall we start with safety?"
  },
  "helpTopics": {
   "ru": "Выбери открытую тему. Мини-тест открывает следующую.",
   "uz-Latn": "Ochiq mavzuni tanla. Mini-test keyingisini ochadi.",
   "en": "Choose an open topic. Pass its quiz to unlock the next one."
  },
  "helpLab": {
   "ru": "Выполняй шаги по порядку и проверь наблюдение.",
   "uz-Latn": "Qadamlarni tartib bilan bajar va kuzatuvni tekshir.",
   "en": "Follow the steps in order, then check your observation."
  },
  "helpPraise": {
   "ru": "Отличный опыт! Так держать!",
   "uz-Latn": "Ajoyib tajriba! Davom et!",
   "en": "Great experiment! Keep going!"
  },
  "helpError": {
   "ru": "Почти! Попробуй ещё раз 💪",
   "uz-Latn": "Deyarli! Yana urinib ko‘r 💪",
   "en": "Almost! Try again 💪"
  },
  "helpOther": {
   "ru": "Я рядом. Нажми на меня, если нужна подсказка.",
   "uz-Latn": "Men yoningdaman. Yordam uchun meni bos.",
   "en": "I am here. Click me for a hint."
  },
  "hide": {
   "ru": "Скрыть",
   "uz-Latn": "Yashirish",
   "en": "Hide"
  },
  "earned": {
   "ru": "Получено",
   "uz-Latn": "Olindi",
   "en": "Earned"
  },
  "unearned": {
   "ru": "Ещё не получено",
   "uz-Latn": "Hali olinmagan",
   "en": "Not earned yet"
  },
  "pure": {
   "ru": "Чистое вещество",
   "uz-Latn": "Sof modda",
   "en": "Pure substance"
  },
  "mixture": {
   "ru": "Смесь",
   "uz-Latn": "Aralashma",
   "en": "Mixture"
  },
  "physical": {
   "ru": "Физическое",
   "uz-Latn": "Fizik",
   "en": "Physical"
  },
  "chemical": {
   "ru": "Химическое",
   "uz-Latn": "Kimyoviy",
   "en": "Chemical"
  },
  "safetyGame": {
   "ru": "Найди нарушение",
   "uz-Latn": "Qoidabuzarlikni top",
   "en": "Spot the hazard"
  },
  "mixtureGame": {
   "ru": "Смесь или чистое вещество?",
   "uz-Latn": "Aralashmami yoki sof modda?",
   "en": "Mixture or pure substance?"
  },
  "sortGame": {
   "ru": "Физическое или химическое явление?",
   "uz-Latn": "Fizikmi yoki kimyoviy hodisa?",
   "en": "Physical or chemical change?"
  },
  "gameHint": {
   "ru": "Выбери ответ кнопкой или смахни карточку",
   "uz-Latn": "Tugmani tanla yoki kartani sur",
   "en": "Choose a button or swipe the card"
  },
  "sortHint": {
   "ru": "Перетащи карточку или выбери корзину касанием",
   "uz-Latn": "Kartani sur yoki savatni bos",
   "en": "Drag the card or tap a category"
  },
  "findHint": {
   "ru": "Найди 3 нарушения. Их можно выбрать и клавишей Tab.",
   "uz-Latn": "3 qoidabuzarlikni top. Tab tugmasidan ham foydalan.",
   "en": "Find 3 hazards. You can also use the Tab key."
  },
  "correct": {
   "ru": "Верно!",
   "uz-Latn": "To‘g‘ri!",
   "en": "Correct!"
  },
  "wrong": {
   "ru": "Попробуй ещё раз",
   "uz-Latn": "Yana urinib ko‘r",
   "en": "Try again"
  },
  "done": {
   "ru": "Готово!",
   "uz-Latn": "Tayyor!",
   "en": "Done!"
  },
  "timeUp": {
   "ru": "Время вышло",
   "uz-Latn": "Vaqt tugadi",
   "en": "Time is up"
  },
  "start": {
   "ru": "Начать",
   "uz-Latn": "Boshlash",
   "en": "Start"
  },
  "close": {
   "ru": "Закрыть",
   "uz-Latn": "Yopish",
   "en": "Close"
  },
  "review": {
   "ru": "Повторить",
   "uz-Latn": "Takrorlash",
   "en": "Review"
  },
  "sourceSoon": {
   "ru": "Эта тема готовится. Пока доступны другие станции маршрута.",
   "uz-Latn": "Bu mavzu tayyorlanmoqda. Boshqa ochiq mavzularni tanla.",
   "en": "This topic is being prepared. Explore another open station."
  },
  "firstRead": {
   "ru": "Сначала изучи карточки теории",
   "uz-Latn": "Avval nazariya kartalarini o‘rgan",
   "en": "Read the theory cards first"
  },
  "exp": {
   "ru": "Опыт",
   "uz-Latn": "Tajriba",
   "en": "Experiment"
  },
  "min": {
   "ru": "мин",
   "uz-Latn": "daq",
   "en": "min"
  },
  "openTopics": {
   "ru": "Доступные темы",
   "uz-Latn": "Ochiq mavzular",
   "en": "Available topics"
  },
  "allComplete": {
   "ru": "Все доступные темы пройдены",
   "uz-Latn": "Barcha ochiq mavzular bajarildi",
   "en": "All available topics completed"
  },
  "about": {
   "ru": "О сайте",
   "uz-Latn": "Sayt haqida",
   "en": "About the site"
  },
  "dayOne": {
   "ru": "день подряд",
   "uz-Latn": "kun ketma-ket",
   "en": "day in a row"
  },
  "dayFew": {
   "ru": "дня подряд",
   "uz-Latn": "kun ketma-ket",
   "en": "days in a row"
  },
  "dayMany": {
   "ru": "дней подряд",
   "uz-Latn": "kun ketma-ket",
   "en": "days in a row"
  }
 },
 "facts": [
  {
   "ru": "Медь хорошо проводит электрический ток.",
   "uz-Latn": "Mis elektr tokini yaxshi o‘tkazadi.",
   "en": "Copper conducts electricity well."
  },
  {
   "ru": "При обычных условиях вода — жидкость.",
   "uz-Latn": "Oddiy sharoitda suv suyuqlikdir.",
   "en": "Water is a liquid under ordinary conditions."
  },
  {
   "ru": "Сера имеет характерный жёлтый цвет.",
   "uz-Latn": "Oltingugurtning rangi sariq.",
   "en": "Sulfur has a characteristic yellow colour."
  },
  {
   "ru": "Магнит помогает отделить железные опилки от песка.",
   "uz-Latn": "Magnit temir qirindisini qumdan ajratadi.",
   "en": "A magnet can separate iron filings from sand."
  },
  {
   "ru": "Воздух — смесь газов.",
   "uz-Latn": "Havo gazlar aralashmasidir.",
   "en": "Air is a mixture of gases."
  },
  {
   "ru": "При плавлении льда новые вещества не образуются.",
   "uz-Latn": "Muz eriganda yangi modda hosil bo‘lmaydi.",
   "en": "Melting ice does not form a new substance."
  },
  {
   "ru": "Поваренная соль состоит главным образом из хлорида натрия.",
   "uz-Latn": "Osh tuzi asosan natriy xloriddan iborat.",
   "en": "Table salt consists mainly of sodium chloride."
  },
  {
   "ru": "Сахар и соль могут выглядеть похоже, но имеют разный состав.",
   "uz-Latn": "Shakar va tuz o‘xshash ko‘rinsa ham tarkibi turlicha.",
   "en": "Sugar and salt may look similar but have different compositions."
  },
  {
   "ru": "Дистиллированную воду получают испарением и конденсацией.",
   "uz-Latn": "Distillangan suv bug‘latish va kondensatsiya bilan olinadi.",
   "en": "Distilled water is obtained through evaporation and condensation."
  },
  {
   "ru": "Фильтр задерживает многие нерастворимые частицы.",
   "uz-Latn": "Filtr ko‘plab erimaydigan zarrachalarni tutadi.",
   "en": "A filter traps many insoluble particles."
  },
  {
   "ru": "Растворённая соль проходит через обычный бумажный фильтр.",
   "uz-Latn": "Erigan tuz oddiy qog‘oz filtrdan o‘tadi.",
   "en": "Dissolved salt passes through an ordinary paper filter."
  },
  {
   "ru": "Железо может ржаветь во влажном воздухе.",
   "uz-Latn": "Temir nam havoda zanglashi mumkin.",
   "en": "Iron can rust in moist air."
  },
  {
   "ru": "Бронза — сплав на основе меди и олова.",
   "uz-Latn": "Bronza asosan mis va qalay qotishmasidir.",
   "en": "Bronze is an alloy based on copper and tin."
  },
  {
   "ru": "Алюминий покрыт тонкой защитной оксидной плёнкой.",
   "uz-Latn": "Aluminiy yupqa himoya oksid pardasi bilan qoplangan.",
   "en": "Aluminium has a thin protective oxide layer."
  },
  {
   "ru": "При нагревании меди на воздухе может образоваться чёрный CuO.",
   "uz-Latn": "Mis havoda isitilganda qora CuO hosil bo‘lishi mumkin.",
   "en": "Heating copper in air can form black CuO."
  },
  {
   "ru": "Углекислый газ обычно не поддерживает горение.",
   "uz-Latn": "Karbonat angidrid odatda yonishni qo‘llab-quvvatlamaydi.",
   "en": "Carbon dioxide normally does not support combustion."
  },
  {
   "ru": "При химической реакции атомы перегруппировываются.",
   "uz-Latn": "Kimyoviy reaksiyada atomlar qayta guruhlanadi.",
   "en": "Atoms rearrange during a chemical reaction."
  },
  {
   "ru": "Молекула воды содержит два атома водорода и один кислорода.",
   "uz-Latn": "Suv molekulasida ikki vodorod va bir kislorod atomi bor.",
   "en": "A water molecule contains two hydrogen atoms and one oxygen atom."
  },
  {
   "ru": "Символ химического элемента начинается с заглавной буквы.",
   "uz-Latn": "Kimyoviy element belgisi bosh harf bilan boshlanadi.",
   "en": "A chemical element symbol starts with a capital letter."
  },
  {
   "ru": "Кислород обозначают символом O.",
   "uz-Latn": "Kislorod O belgisi bilan yoziladi.",
   "en": "Oxygen has the symbol O."
  },
  {
   "ru": "Порядковый номер элемента равен числу протонов в его ядре.",
   "uz-Latn": "Element tartib raqami yadrodagi protonlar soniga teng.",
   "en": "An element’s atomic number equals the number of protons in its nucleus."
  },
  {
   "ru": "Испарение происходит и без кипения.",
   "uz-Latn": "Bug‘lanish qaynashsiz ham sodir bo‘ladi.",
   "en": "Evaporation can occur without boiling."
  },
  {
   "ru": "Конденсация — переход газа в жидкость.",
   "uz-Latn": "Kondensatsiya gazning suyuqlikka o‘tishidir.",
   "en": "Condensation is a change from gas to liquid."
  },
  {
   "ru": "Плотность связывает массу и объём вещества.",
   "uz-Latn": "Zichlik moddaning massasi va hajmini bog‘laydi.",
   "en": "Density relates mass and volume."
  },
  {
   "ru": "Изменение цвета само по себе не всегда доказывает химическую реакцию.",
   "uz-Latn": "Rang o‘zgarishi doim ham kimyoviy reaksiyani isbotlamaydi.",
   "en": "A colour change alone does not always prove a chemical reaction."
  },
  {
   "ru": "Пузырьки могут появляться при кипении без химической реакции.",
   "uz-Latn": "Qaynashda kimyoviy reaksiyasiz ham pufakchalar chiqadi.",
   "en": "Boiling can produce bubbles without a chemical reaction."
  },
  {
   "ru": "Медный купорос-пентагидрат образует голубые кристаллы.",
   "uz-Latn": "Mis kuporosi pentagidrati ko‘k kristallar hosil qiladi.",
   "en": "Copper sulfate pentahydrate forms blue crystals."
  },
  {
   "ru": "Йод образует тёмные кристаллы с металлическим блеском.",
   "uz-Latn": "Yod metall yaltiroqli to‘q kristallar hosil qiladi.",
   "en": "Iodine forms dark crystals with a metallic lustre."
  },
  {
   "ru": "Спирт и вода смешиваются друг с другом.",
   "uz-Latn": "Spirt va suv bir-biri bilan aralashadi.",
   "en": "Alcohol and water mix with each other."
  },
  {
   "ru": "Мрамор и известняк содержат карбонат кальция.",
   "uz-Latn": "Marmar va ohaktosh tarkibida kalsiy karbonat bor.",
   "en": "Marble and limestone contain calcium carbonate."
  },
  {
   "ru": "Нагретая стеклянная посуда может выглядеть как холодная.",
   "uz-Latn": "Issiq shisha idish sovuq idishdek ko‘rinishi mumkin.",
   "en": "Hot glassware can look just like cold glassware."
  },
  {
   "ru": "В лаборатории вещества никогда не пробуют на вкус.",
   "uz-Latn": "Laboratoriyada moddalar hech qachon tatib ko‘rilmaydi.",
   "en": "Substances must never be tasted in a laboratory."
  }
 ],
 "ranks": [
  {
   "xp": 0,
   "title": {
    "ru": "Новичок",
    "uz-Latn": "Boshlovchi",
    "en": "Beginner"
   }
  },
  {
   "xp": 100,
   "title": {
    "ru": "Юный лаборант",
    "uz-Latn": "Yosh laborant",
    "en": "Junior lab assistant"
   }
  },
  {
   "xp": 300,
   "title": {
    "ru": "Лаборант",
    "uz-Latn": "Laborant",
    "en": "Lab assistant"
   }
  },
  {
   "xp": 600,
   "title": {
    "ru": "Химик",
    "uz-Latn": "Kimyogar",
    "en": "Chemist"
   }
  },
  {
   "xp": 1000,
   "title": {
    "ru": "Профессор химии",
    "uz-Latn": "Kimyo professori",
    "en": "Chemistry professor"
   }
  }
 ],
 "badges": [
  {
   "id": "first",
   "title": {
    "ru": "Первый опыт",
    "uz-Latn": "Birinchi tajriba",
    "en": "First experiment"
   },
   "hint": {
    "ru": "Выполни один опыт",
    "uz-Latn": "Bitta tajribani bajar",
    "en": "Complete one experiment"
   }
  },
  {
   "id": "safe",
   "title": {
    "ru": "Безопасность прежде всего",
    "uz-Latn": "Avvalo xavfsizlik",
    "en": "Safety first"
   },
   "hint": {
    "ru": "Пройди вводную тему",
    "uz-Latn": "Kirish mavzusini yakunla",
    "en": "Complete the introductory topic"
   }
  },
  {
   "id": "mixtures",
   "title": {
    "ru": "Знаток смесей",
    "uz-Latn": "Aralashmalar bilimdoni",
    "en": "Mixture expert"
   },
   "hint": {
    "ru": "Верно разбери 6 карточек в игре о смесях",
    "uz-Latn": "Aralashmalar o‘yinidagi 6 kartani to‘g‘ri ajrat",
    "en": "Classify all 6 mixture cards correctly"
   }
  },
  {
   "id": "perfect",
   "title": {
    "ru": "5/5 в тесте",
    "uz-Latn": "Testda 5/5",
    "en": "5/5 in a quiz"
   },
   "hint": {
    "ru": "Ответь на все 5 вопросов мини-теста верно",
    "uz-Latn": "Mini-testning barcha 5 savoliga to‘g‘ri javob ber",
    "en": "Answer all five mini-quiz questions correctly"
   }
  },
  {
   "id": "week",
   "title": {
    "ru": "Серия 7 дней",
    "uz-Latn": "7 kunlik seriya",
    "en": "Seven-day streak"
   },
   "hint": {
    "ru": "Заходи 7 дней подряд",
    "uz-Latn": "7 kun ketma-ket kir",
    "en": "Visit seven days in a row"
   }
  },
  {
   "id": "all",
   "title": {
    "ru": "Все темы пройдены",
    "uz-Latn": "Barcha mavzular bajarildi",
    "en": "All topics completed"
   },
   "hint": {
    "ru": "Пройди все 6 тем, включая будущие",
    "uz-Latn": "Kelajakdagi mavzular bilan birga barcha 6 mavzuni yakunla",
    "en": "Complete all six topics, including upcoming ones"
   }
  },
  {
   "id": "sorter",
   "title": {
    "ru": "Знаток явлений",
    "uz-Latn": "Hodisalar bilimdoni",
    "en": "Change expert"
   },
   "hint": {
    "ru": "Верно рассортируй 6 явлений в игре",
    "uz-Latn": "O‘yindagi 6 hodisani to‘g‘ri ajrat",
    "en": "Sort all six changes correctly"
   }
  },
  {
   "id": "collector",
   "title": {
    "ru": "Коллекционер",
    "uz-Latn": "To‘plovchi",
    "en": "Collector"
   },
   "hint": {
    "ru": "Открой 12 карточек веществ",
    "uz-Latn": "12 modda kartasini och",
    "en": "Unlock twelve substance cards"
   }
  }
 ],
 "collection": [
  {
   "id": "salt",
   "formula": "NaCl",
   "color": {
    "ru": "Белый",
    "uz-Latn": "Oq",
    "en": "White"
   },
   "state": {
    "ru": "Твёрдое",
    "uz-Latn": "Qattiq",
    "en": "Solid"
   },
   "fact": {
    "ru": "Поваренная соль состоит главным образом из хлорида натрия.",
    "uz-Latn": "Osh tuzi asosan natriy xloriddan iborat.",
    "en": "Table salt consists mainly of sodium chloride."
   },
   "title": null
  },
  {
   "id": "sugar",
   "formula": "C₁₂H₂₂O₁₁",
   "color": {
    "ru": "Белый",
    "uz-Latn": "Oq",
    "en": "White"
   },
   "state": {
    "ru": "Твёрдое",
    "uz-Latn": "Qattiq",
    "en": "Solid"
   },
   "fact": {
    "ru": "Сахар и соль могут выглядеть похоже, но имеют разный состав.",
    "uz-Latn": "Shakar va tuz o‘xshash ko‘rinsa ham tarkibi turlicha.",
    "en": "Sugar and salt may look similar but have different compositions."
   },
   "title": null
  },
  {
   "id": "soda",
   "formula": "NaHCO₃",
   "color": {
    "ru": "Белый",
    "uz-Latn": "Oq",
    "en": "White"
   },
   "state": {
    "ru": "Твёрдое",
    "uz-Latn": "Qattiq",
    "en": "Solid"
   },
   "fact": {
    "ru": "Пищевая сода с кислотой выделяет углекислый газ.",
    "uz-Latn": "Ichimlik sodasi kislota bilan karbonat angidrid ajratadi.",
    "en": "Baking soda releases carbon dioxide when it reacts with an acid."
   },
   "title": null
  },
  {
   "id": "copper-sulfate",
   "formula": "CuSO₄·5H₂O",
   "color": {
    "ru": "Голубой",
    "uz-Latn": "Ko‘k",
    "en": "Blue"
   },
   "state": {
    "ru": "Твёрдое",
    "uz-Latn": "Qattiq",
    "en": "Solid"
   },
   "fact": {
    "ru": "Медный купорос-пентагидрат образует голубые кристаллы.",
    "uz-Latn": "Mis kuporosi pentagidrati ko‘k kristallar hosil qiladi.",
    "en": "Copper sulfate pentahydrate forms blue crystals."
   },
   "title": null
  },
  {
   "id": "aluminium",
   "formula": "Al",
   "color": {
    "ru": "Серебристый",
    "uz-Latn": "Kumushrang",
    "en": "Silvery"
   },
   "state": {
    "ru": "Твёрдое",
    "uz-Latn": "Qattiq",
    "en": "Solid"
   },
   "fact": {
    "ru": "Алюминий покрыт тонкой защитной оксидной плёнкой.",
    "uz-Latn": "Aluminiy yupqa himoya oksid pardasi bilan qoplangan.",
    "en": "Aluminium has a thin protective oxide layer."
   },
   "title": null
  },
  {
   "id": "zinc",
   "formula": "Zn",
   "color": {
    "ru": "Серебристый",
    "uz-Latn": "Kumushrang",
    "en": "Silvery"
   },
   "state": {
    "ru": "Твёрдое",
    "uz-Latn": "Qattiq",
    "en": "Solid"
   },
   "fact": {
    "ru": "Цинком покрывают сталь для защиты от коррозии.",
    "uz-Latn": "Po‘latni korroziyadan himoyalash uchun rux bilan qoplashadi.",
    "en": "Zinc coatings help protect steel from corrosion."
   },
   "title": null
  },
  {
   "id": "iron",
   "formula": "Fe",
   "color": {
    "ru": "Серый",
    "uz-Latn": "Kulrang",
    "en": "Grey"
   },
   "state": {
    "ru": "Твёрдое",
    "uz-Latn": "Qattiq",
    "en": "Solid"
   },
   "fact": {
    "ru": "Железо может ржаветь во влажном воздухе.",
    "uz-Latn": "Temir nam havoda zanglashi mumkin.",
    "en": "Iron can rust in moist air."
   },
   "title": null
  },
  {
   "id": "copper",
   "formula": "Cu",
   "color": {
    "ru": "Красно-коричневый",
    "uz-Latn": "Qizg‘ish jigarrang",
    "en": "Reddish brown"
   },
   "state": {
    "ru": "Твёрдое",
    "uz-Latn": "Qattiq",
    "en": "Solid"
   },
   "fact": {
    "ru": "Медь хорошо проводит электрический ток.",
    "uz-Latn": "Mis elektr tokini yaxshi o‘tkazadi.",
    "en": "Copper conducts electricity well."
   },
   "title": null
  },
  {
   "id": "water",
   "formula": "H₂O",
   "color": {
    "ru": "Бесцветный",
    "uz-Latn": "Rangsiz",
    "en": "Colourless"
   },
   "state": {
    "ru": "Жидкое",
    "uz-Latn": "Suyuq",
    "en": "Liquid"
   },
   "fact": {
    "ru": "При обычных условиях вода — жидкость.",
    "uz-Latn": "Oddiy sharoitda suv suyuqlikdir.",
    "en": "Water is a liquid under ordinary conditions."
   },
   "title": null
  },
  {
   "id": "ethanol",
   "formula": "C₂H₅OH",
   "color": {
    "ru": "Бесцветный",
    "uz-Latn": "Rangsiz",
    "en": "Colourless"
   },
   "state": {
    "ru": "Жидкое",
    "uz-Latn": "Suyuq",
    "en": "Liquid"
   },
   "fact": {
    "ru": "Спирт и вода смешиваются друг с другом.",
    "uz-Latn": "Spirt va suv bir-biri bilan aralashadi.",
    "en": "Alcohol and water mix with each other."
   },
   "title": null
  },
  {
   "id": "sulfur",
   "formula": "S",
   "color": {
    "ru": "Жёлтый",
    "uz-Latn": "Sariq",
    "en": "Yellow"
   },
   "state": {
    "ru": "Твёрдое",
    "uz-Latn": "Qattiq",
    "en": "Solid"
   },
   "fact": {
    "ru": "Сера имеет характерный жёлтый цвет.",
    "uz-Latn": "Oltingugurtning rangi sariq.",
    "en": "Sulfur has a characteristic yellow colour."
   },
   "title": null
  },
  {
   "id": "iodine",
   "formula": "I₂",
   "color": {
    "ru": "Тёмно-серый",
    "uz-Latn": "To‘q kulrang",
    "en": "Dark grey"
   },
   "state": {
    "ru": "Твёрдое",
    "uz-Latn": "Qattiq",
    "en": "Solid"
   },
   "fact": {
    "ru": "Йод образует тёмные кристаллы с металлическим блеском.",
    "uz-Latn": "Yod metall yaltiroqli to‘q kristallar hosil qiladi.",
    "en": "Iodine forms dark crystals with a metallic lustre."
   },
   "title": null
  },
  {
   "id": "paraffin",
   "formula": "CₙH₂ₙ₊₂",
   "color": {
    "ru": "Белый",
    "uz-Latn": "Oq",
    "en": "White"
   },
   "state": {
    "ru": "Твёрдое",
    "uz-Latn": "Qattiq",
    "en": "Solid"
   },
   "fact": {
    "ru": "Парафин — смесь углеводородов, которая плавится при нагревании.",
    "uz-Latn": "Parafin isitilganda eriydigan uglevodorodlar aralashmasidir.",
    "en": "Paraffin is a hydrocarbon mixture that melts when heated."
   },
   "title": {
    "ru": "Парафин (смесь)",
    "uz-Latn": "Parafin (aralashma)",
    "en": "Paraffin (mixture)"
   }
  },
  {
   "id": "calcium-carbonate",
   "formula": "CaCO₃",
   "color": {
    "ru": "Белый",
    "uz-Latn": "Oq",
    "en": "White"
   },
   "state": {
    "ru": "Твёрдое",
    "uz-Latn": "Qattiq",
    "en": "Solid"
   },
   "fact": {
    "ru": "Мрамор и известняк содержат карбонат кальция.",
    "uz-Latn": "Marmar va ohaktosh tarkibida kalsiy karbonat bor.",
    "en": "Marble and limestone contain calcium carbonate."
   },
   "title": {
    "ru": "Карбонат кальция",
    "uz-Latn": "Kalsiy karbonat",
    "en": "Calcium carbonate"
   }
  }
 ],
 "games": {
  "mixtures": [
   {
    "title": {
     "ru": "Дистиллированная вода",
     "uz-Latn": "Distillangan suv",
     "en": "Distilled water"
    },
    "answer": "pure"
   },
   {
    "title": {
     "ru": "Воздух",
     "uz-Latn": "Havo",
     "en": "Air"
    },
    "answer": "mixture"
   },
   {
    "title": {
     "ru": "Хлорид натрия NaCl",
     "uz-Latn": "Natriy xlorid NaCl",
     "en": "Sodium chloride NaCl"
    },
    "answer": "pure"
   },
   {
    "title": {
     "ru": "Морская вода",
     "uz-Latn": "Dengiz suvi",
     "en": "Seawater"
    },
    "answer": "mixture"
   },
   {
    "title": {
     "ru": "Кислород O₂",
     "uz-Latn": "Kislorod O₂",
     "en": "Oxygen O₂"
    },
    "answer": "pure"
   },
   {
    "title": {
     "ru": "Бронза",
     "uz-Latn": "Bronza",
     "en": "Bronze"
    },
    "answer": "mixture"
   }
  ],
  "changes": [
   {
    "title": {
     "ru": "Таяние льда",
     "uz-Latn": "Muzning erishi",
     "en": "Melting ice"
    },
    "answer": "physical"
   },
   {
    "title": {
     "ru": "Горение бумаги",
     "uz-Latn": "Qog‘ozning yonishi",
     "en": "Burning paper"
    },
    "answer": "chemical"
   },
   {
    "title": {
     "ru": "Ржавление железа",
     "uz-Latn": "Temirning zanglashi",
     "en": "Rusting iron"
    },
    "answer": "chemical"
   },
   {
    "title": {
     "ru": "Растворение соли",
     "uz-Latn": "Tuzning erishi",
     "en": "Dissolving salt"
    },
    "answer": "physical"
   },
   {
    "title": {
     "ru": "Испарение воды",
     "uz-Latn": "Suvning bug‘lanishi",
     "en": "Evaporation of water"
    },
    "answer": "physical"
   },
   {
    "title": {
     "ru": "Нагревание меди на воздухе",
     "uz-Latn": "Misni havoda isitish",
     "en": "Heating copper in air"
    },
    "answer": "chemical"
   }
  ],
  "safety": [
   {
    "ru": "Прямое вдыхание неизвестного вещества",
    "uz-Latn": "Noma’lum moddani bevosita hidlash",
    "en": "Directly sniffing an unknown substance"
   },
   {
    "ru": "Очки лежат на столе, глаза не защищены",
    "uz-Latn": "Ko‘zoynak stolda, ko‘zlar himoyasiz",
    "en": "Goggles are on the bench instead of protecting the eyes"
   },
   {
    "ru": "Бумага рядом с открытым пламенем",
    "uz-Latn": "Ochiq olov yonida qog‘oz bor",
    "en": "Paper is too close to an open flame"
   }
  ]
 }
};
