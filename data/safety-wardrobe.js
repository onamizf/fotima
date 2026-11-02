/* Модели сохранены; регистрация и зоны перекрытия привязывают одежду к телу. */
const SafetyWardrobeData = {
  "categories": [
    {
      "id": "head",
      "name": {
        "ru": "Голова"
      },
      "emoji": "🪖"
    },
    {
      "id": "eyes",
      "name": {
        "ru": "Глаза"
      },
      "emoji": "🥽"
    },
    {
      "id": "face",
      "name": {
        "ru": "Лицо"
      },
      "emoji": "😷"
    },
    {
      "id": "body",
      "name": {
        "ru": "Тело"
      },
      "emoji": "🥼"
    },
    {
      "id": "hands",
      "name": {
        "ru": "Руки"
      },
      "emoji": "🧤"
    },
    {
      "id": "feet",
      "name": {
        "ru": "Обувь"
      },
      "emoji": "🥾"
    }
  ],
  "items": [
    {
      "id": "cap",
      "category": "head",
      "slot": "head",
      "name": {
        "ru": "Шапочка для волос"
      },
      "tip": {
        "ru": "Убирает волосы под защитную шапочку."
      },
      "layer": "assets/game/wear/cap.webp",
      "z": 80
    },
    {
      "id": "hard-hat",
      "category": "head",
      "slot": "head",
      "name": {
        "ru": "Строительная каска"
      },
      "tip": {
        "ru": "Защищает голову от падающих предметов."
      },
      "layer": "assets/game/wear/hard-hat.webp",
      "z": 80
    },
    {
      "id": "fire-helmet",
      "category": "head",
      "slot": "head",
      "name": {
        "ru": "Пожарная каска"
      },
      "tip": {
        "ru": "Защищает голову пожарного от жара и ударов."
      },
      "layer": "assets/game/wear/fire-helmet.webp",
      "z": 80
    },
    {
      "id": "miner-helmet",
      "category": "head",
      "slot": "head",
      "name": {
        "ru": "Каска шахтёра"
      },
      "tip": {
        "ru": "Защищает голову и освещает путь фонарём."
      },
      "layer": "assets/game/wear/miner-helmet.webp",
      "z": 80
    },
    {
      "id": "chef-hat",
      "category": "head",
      "slot": "head",
      "name": {
        "ru": "Поварской колпак"
      },
      "tip": {
        "ru": "Не даёт волосам попасть в пищу."
      },
      "layer": "assets/game/wear/chef-hat.webp",
      "z": 80,
      "registration": {
        "source": [
          228,
          0,
          699,
          187
        ],
        "body": [
          250,
          6,
          650,
          152
        ]
      }
    },
    {
      "id": "bee-hat",
      "category": "head",
      "slot": "head",
      "name": {
        "ru": "Шляпа пчеловода"
      },
      "tip": {
        "ru": "Сетка защищает лицо от пчёл."
      },
      "layer": "assets/game/wear/bee-hat.webp",
      "z": 85
    },
    {
      "id": "space-helmet",
      "category": "head",
      "slot": "head",
      "name": {
        "ru": "Шлем скафандра"
      },
      "tip": {
        "ru": "Герметичный шлем помогает дышать в космосе."
      },
      "layer": "assets/game/wear/space-helmet.webp",
      "z": 90,
      "hides": [
        "eyes",
        "face"
      ]
    },
    {
      "id": "goggles",
      "category": "eyes",
      "slot": "eyes",
      "name": {
        "ru": "Защитные очки"
      },
      "tip": {
        "ru": "Защищают глаза от частиц и случайных брызг."
      },
      "layer": "assets/game/wear/goggles.webp",
      "z": 70
    },
    {
      "id": "sealed-goggles",
      "category": "eyes",
      "slot": "eyes",
      "name": {
        "ru": "Закрытые очки-маска"
      },
      "tip": {
        "ru": "Закрывают глаза от брызг со всех сторон."
      },
      "layer": "assets/game/wear/sealed-goggles.webp",
      "z": 70,
      "registration": {
        "source": [
          229,
          146,
          669,
          331
        ],
        "body": [
          255,
          105,
          645,
          252
        ]
      }
    },
    {
      "id": "medical-mask",
      "category": "face",
      "slot": "face",
      "name": {
        "ru": "Медицинская маска"
      },
      "tip": {
        "ru": "Помогает сохранять чистоту операционного поля."
      },
      "layer": "assets/game/wear/medical-mask.webp",
      "z": 60
    },
    {
      "id": "respirator",
      "category": "face",
      "slot": "face",
      "name": {
        "ru": "Респиратор"
      },
      "tip": {
        "ru": "Защищает дыхание с подходящим для опасности фильтром."
      },
      "layer": "assets/game/wear/respirator.webp",
      "z": 60
    },
    {
      "id": "face-shield",
      "category": "face",
      "slot": "face",
      "name": {
        "ru": "Защитный щиток"
      },
      "tip": {
        "ru": "Дополняет очки и защищает лицо от брызг."
      },
      "layer": "assets/game/wear/face-shield.webp",
      "z": 75
    },
    {
      "id": "welding-mask",
      "category": "face",
      "slot": "face",
      "name": {
        "ru": "Сварочная маска"
      },
      "tip": {
        "ru": "Защищает глаза и лицо от яркой сварочной дуги."
      },
      "layer": "assets/game/wear/welding-mask.webp",
      "z": 90,
      "hides": [
        "eyes",
        "face"
      ]
    },
    {
      "id": "fire-breathing",
      "category": "face",
      "slot": "face",
      "name": {
        "ru": "Дыхательный аппарат"
      },
      "tip": {
        "ru": "Подаёт пожарному воздух независимо от дыма."
      },
      "layer": "assets/game/wear/fire-breathing.webp",
      "z": 60
    },
    {
      "id": "lab-coat",
      "category": "body",
      "slot": "body",
      "name": {
        "ru": "Лабораторный халат"
      },
      "tip": {
        "ru": "Защищает одежду и кожу при работе в лаборатории."
      },
      "layer": "assets/game/wear/lab-coat.webp",
      "z": 30,
      "coverage": {
        "hideShirtSleeves": true
      }
    },
    {
      "id": "surgical-gown",
      "category": "body",
      "slot": "body",
      "name": {
        "ru": "Хирургический халат"
      },
      "tip": {
        "ru": "Создаёт защитный барьер в операционной."
      },
      "layer": "assets/game/wear/surgical-gown.webp",
      "z": 30,
      "coverage": {
        "hideShirtSleeves": true
      }
    },
    {
      "id": "apron",
      "category": "body",
      "slot": "body",
      "name": {
        "ru": "Защитный фартук"
      },
      "tip": {
        "ru": "Дополняет халат или китель защитным слоем."
      },
      "layer": "assets/game/wear/apron.webp",
      "z": 30
    },
    {
      "id": "coverall",
      "category": "body",
      "slot": "body",
      "name": {
        "ru": "Защитный комбинезон"
      },
      "tip": {
        "ru": "Закрывает тело при работе с опасными веществами."
      },
      "layer": "assets/game/wear/coverall.webp",
      "z": 45,
      "coverage": {
        "hideShirtSleeves": true,
        "trousersOverBoots": true
      }
    },
    {
      "id": "fire-suit",
      "category": "body",
      "slot": "body",
      "name": {
        "ru": "Пожарный костюм"
      },
      "tip": {
        "ru": "Защищает тело от жара."
      },
      "layer": "assets/game/wear/fire-suit.webp",
      "z": 45,
      "registration": {
        "source": [
          161,
          357,
          737,
          1069
        ],
        "body": [
          176,
          410,
          720,
          1065
        ]
      },
      "coverage": {
        "hideShirtSleeves": true,
        "trousersOverBoots": true
      }
    },
    {
      "id": "hi-vis-vest",
      "category": "body",
      "slot": "body",
      "name": {
        "ru": "Светоотражающий жилет"
      },
      "tip": {
        "ru": "Помогает быть заметным на стройке."
      },
      "layer": "assets/game/wear/hi-vis-vest.webp",
      "z": 30
    },
    {
      "id": "welder-jacket",
      "category": "body",
      "slot": "body",
      "name": {
        "ru": "Куртка сварщика"
      },
      "tip": {
        "ru": "Защищает от искр и горячих частиц."
      },
      "layer": "assets/game/wear/welder-jacket.webp",
      "z": 30,
      "registration": {
        "source": [
          144,
          397,
          752,
          791
        ],
        "body": [
          168,
          412,
          728,
          772
        ]
      },
      "coverage": {
        "hideShirtSleeves": true
      }
    },
    {
      "id": "bee-suit",
      "category": "body",
      "slot": "body",
      "name": {
        "ru": "Костюм пчеловода"
      },
      "tip": {
        "ru": "Закрывает тело от укусов пчёл."
      },
      "layer": "assets/game/wear/bee-suit.webp",
      "z": 45,
      "coverage": {
        "hideShirtSleeves": true,
        "trousersOverBoots": true
      }
    },
    {
      "id": "chef-jacket",
      "category": "body",
      "slot": "body",
      "name": {
        "ru": "Поварской китель"
      },
      "tip": {
        "ru": "Защищает тело при работе на кухне."
      },
      "layer": "assets/game/wear/chef-jacket.webp",
      "z": 30,
      "registration": {
        "source": [
          206,
          376,
          690,
          720
        ],
        "body": [
          206,
          410,
          690,
          730
        ]
      },
      "coverage": {
        "hideShirtSleeves": true
      }
    },
    {
      "id": "work-overall",
      "category": "body",
      "slot": "body",
      "name": {
        "ru": "Рабочая спецовка"
      },
      "tip": {
        "ru": "Защищает одежду и кожу при работе."
      },
      "layer": "assets/game/wear/work-overall.webp",
      "z": 45,
      "registration": {
        "source": [
          175,
          374,
          722,
          1046
        ],
        "body": [
          174,
          414,
          722,
          1046
        ]
      },
      "coverage": {
        "hideShirtSleeves": true,
        "trousersOverBoots": true
      }
    },
    {
      "id": "space-suit",
      "category": "body",
      "slot": "body",
      "name": {
        "ru": "Скафандр"
      },
      "tip": {
        "ru": "Поддерживает безопасную среду в космосе."
      },
      "layer": "assets/game/wear/space-suit.webp",
      "z": 45,
      "registration": {
        "source": [
          177,
          346,
          720,
          1035
        ],
        "body": [
          174,
          410,
          722,
          1040
        ]
      },
      "coverage": {
        "hideShirtSleeves": true,
        "trousersOverBoots": true
      }
    },
    {
      "id": "nitrile-gloves",
      "category": "hands",
      "slot": "hands",
      "name": {
        "ru": "Нитриловые перчатки"
      },
      "tip": {
        "ru": "Создают защитный барьер для рук."
      },
      "layer": "assets/game/wear/nitrile-gloves.webp",
      "z": 50
    },
    {
      "id": "rubber-gloves",
      "category": "hands",
      "slot": "hands",
      "name": {
        "ru": "Резиновые перчатки"
      },
      "tip": {
        "ru": "Защищают руки при работе с подходящими химикатами."
      },
      "layer": "assets/game/wear/rubber-gloves.webp",
      "z": 50
    },
    {
      "id": "heat-gloves",
      "category": "hands",
      "slot": "hands",
      "name": {
        "ru": "Термостойкие перчатки"
      },
      "tip": {
        "ru": "Защищают руки от горячих предметов."
      },
      "layer": "assets/game/wear/heat-gloves.webp",
      "z": 50
    },
    {
      "id": "work-gloves",
      "category": "hands",
      "slot": "hands",
      "name": {
        "ru": "Рабочие перчатки"
      },
      "tip": {
        "ru": "Защищают руки от механических повреждений."
      },
      "layer": "assets/game/wear/work-gloves.webp",
      "z": 50
    },
    {
      "id": "welding-gauntlets",
      "category": "hands",
      "slot": "hands",
      "name": {
        "ru": "Сварочные краги"
      },
      "tip": {
        "ru": "Защищают кисти и запястья от искр."
      },
      "layer": "assets/game/wear/welding-gauntlets.webp",
      "z": 50
    },
    {
      "id": "dielectric-gloves",
      "category": "hands",
      "slot": "hands",
      "name": {
        "ru": "Диэлектрические перчатки"
      },
      "tip": {
        "ru": "Проверены на защиту от электрического тока."
      },
      "layer": "assets/game/wear/dielectric-gloves.webp",
      "z": 50
    },
    {
      "id": "bee-gloves",
      "category": "hands",
      "slot": "hands",
      "name": {
        "ru": "Перчатки пчеловода"
      },
      "tip": {
        "ru": "Длинные манжеты закрывают руки от пчёл."
      },
      "layer": "assets/game/wear/bee-gloves.webp",
      "z": 50
    },
    {
      "id": "space-gloves",
      "category": "hands",
      "slot": "hands",
      "name": {
        "ru": "Перчатки скафандра"
      },
      "tip": {
        "ru": "Сохраняют герметичность защиты рук в космосе."
      },
      "layer": "assets/game/wear/space-gloves.webp",
      "z": 50
    },
    {
      "id": "closed-shoes",
      "category": "feet",
      "slot": "feet",
      "name": {
        "ru": "Закрытая обувь"
      },
      "tip": {
        "ru": "Закрывает стопы в лаборатории."
      },
      "layer": "assets/game/wear/closed-shoes.webp",
      "z": 40,
      "coverage": {
        "footBlend": {
          "from": 77.5,
          "to": 79.5
        },
        "baseFeet": {
          "opaque": 79.5,
          "hidden": 80
        }
      }
    },
    {
      "id": "rubber-boots",
      "category": "feet",
      "slot": "feet",
      "name": {
        "ru": "Резиновые сапоги"
      },
      "tip": {
        "ru": "Защищают ноги от влаги и подходящих химикатов."
      },
      "layer": "assets/game/wear/rubber-boots.webp",
      "z": 40,
      "registration": {
        "source": [
          221,
          875,
          678,
          1134
        ],
        "body": [
          225,
          930,
          675,
          1145
        ]
      },
      "coverage": {
        "clipAbove": 77.5
      }
    },
    {
      "id": "shoe-covers",
      "category": "feet",
      "slot": "feet",
      "name": {
        "ru": "Бахилы"
      },
      "tip": {
        "ru": "Помогают сохранять чистоту операционной."
      },
      "layer": "assets/game/wear/shoe-covers.webp",
      "z": 40,
      "coverage": {
        "footBlend": {
          "from": 77.5,
          "to": 79.5
        },
        "baseFeet": {
          "opaque": 79.5,
          "hidden": 80
        }
      }
    },
    {
      "id": "steel-boots",
      "category": "feet",
      "slot": "feet",
      "name": {
        "ru": "Ботинки со стальным носком"
      },
      "tip": {
        "ru": "Защищают пальцы ног от тяжёлых предметов."
      },
      "layer": "assets/game/wear/steel-boots.webp",
      "z": 40
    },
    {
      "id": "fire-boots",
      "category": "feet",
      "slot": "feet",
      "name": {
        "ru": "Пожарные сапоги"
      },
      "tip": {
        "ru": "Защищают ноги от жара и опасных поверхностей."
      },
      "layer": "assets/game/wear/fire-boots.webp",
      "z": 40
    },
    {
      "id": "dielectric-boots",
      "category": "feet",
      "slot": "feet",
      "name": {
        "ru": "Диэлектрические боты"
      },
      "tip": {
        "ru": "Обеспечивают дополнительную защиту от тока."
      },
      "layer": "assets/game/wear/dielectric-boots.webp",
      "z": 40
    },
    {
      "id": "chef-shoes",
      "category": "feet",
      "slot": "feet",
      "name": {
        "ru": "Нескользящая обувь"
      },
      "tip": {
        "ru": "Помогает не поскользнуться на кухне."
      },
      "layer": "assets/game/wear/chef-shoes.webp",
      "z": 40,
      "coverage": {
        "footBlend": {
          "from": 77.5,
          "to": 79.5
        },
        "baseFeet": {
          "opaque": 79.5,
          "hidden": 80
        }
      }
    },
    {
      "id": "space-boots",
      "category": "feet",
      "slot": "feet",
      "name": {
        "ru": "Ботинки скафандра"
      },
      "tip": {
        "ru": "Защищают ноги в составе скафандра."
      },
      "layer": "assets/game/wear/space-boots.webp",
      "z": 40
    }
  ],
  "professions": [
    {
      "id": "chemist",
      "group": {
        "ru": "ХИМИЯ"
      },
      "name": {
        "ru": "Химик-лаборант"
      },
      "emoji": "🧪",
      "description": {
        "ru": "Безопасные опыты в лаборатории"
      },
      "greeting": {
        "ru": "Защитим глаза, руки и одежду перед опытом!"
      },
      "required": [
        "lab-coat",
        "goggles",
        "nitrile-gloves",
        "closed-shoes"
      ]
    },
    {
      "id": "acids",
      "group": {
        "ru": "ХИМИЯ"
      },
      "name": {
        "ru": "Работа с кислотами"
      },
      "emoji": "⚗️",
      "description": {
        "ru": "Защита от опасных брызг"
      },
      "greeting": {
        "ru": "Кислоты могут брызнуть! Подберём двойную защиту лица и одежды!"
      },
      "required": [
        "apron",
        "sealed-goggles",
        "face-shield",
        "rubber-gloves",
        "rubber-boots"
      ]
    },
    {
      "id": "fire",
      "group": {
        "ru": "ХИМИЯ"
      },
      "name": {
        "ru": "Опыты с огнём"
      },
      "emoji": "🔥",
      "description": {
        "ru": "Защита при нагревании"
      },
      "greeting": {
        "ru": "Будет горячо! Уберём волосы и защитим руки!"
      },
      "required": [
        "lab-coat",
        "goggles",
        "heat-gloves",
        "cap",
        "closed-shoes"
      ]
    },
    {
      "id": "gases",
      "group": {
        "ru": "ХИМИЯ"
      },
      "name": {
        "ru": "Работа с ядовитыми газами"
      },
      "emoji": "🌫️",
      "description": {
        "ru": "Защита дыхания и тела"
      },
      "greeting": {
        "ru": "Опасные газы невидимы! Подберём защиту дыхания и тела!"
      },
      "required": [
        "respirator",
        "sealed-goggles",
        "coverall",
        "rubber-gloves",
        "rubber-boots"
      ]
    },
    {
      "id": "surgeon",
      "group": {
        "ru": "МЕДИЦИНА"
      },
      "name": {
        "ru": "Хирург"
      },
      "emoji": "🩺",
      "description": {
        "ru": "Чистота в операционной"
      },
      "greeting": {
        "ru": "В операционной всё должно быть стерильно!"
      },
      "required": [
        "cap",
        "medical-mask",
        "surgical-gown",
        "nitrile-gloves",
        "shoe-covers"
      ]
    },
    {
      "id": "firefighter",
      "group": {
        "ru": "СПАСАТЕЛИ"
      },
      "name": {
        "ru": "Пожарный"
      },
      "emoji": "🚒",
      "description": {
        "ru": "Защита от жара и дыма"
      },
      "greeting": {
        "ru": "Огонь горячий! Защити меня с головы до ног!"
      },
      "required": [
        "fire-helmet",
        "fire-breathing",
        "fire-suit",
        "heat-gloves",
        "fire-boots"
      ]
    },
    {
      "id": "builder",
      "group": {
        "ru": "РАБОЧИЕ"
      },
      "name": {
        "ru": "Строитель"
      },
      "emoji": "🏗️",
      "description": {
        "ru": "Безопасность на стройке"
      },
      "greeting": {
        "ru": "На стройке важно быть заметной и защищённой!"
      },
      "required": [
        "hard-hat",
        "goggles",
        "hi-vis-vest",
        "work-gloves",
        "steel-boots"
      ]
    },
    {
      "id": "welder",
      "group": {
        "ru": "РАБОЧИЕ"
      },
      "name": {
        "ru": "Сварщик"
      },
      "emoji": "✨",
      "description": {
        "ru": "Защита от дуги и искр"
      },
      "greeting": {
        "ru": "Искры летят! Защитим лицо, руки и одежду!"
      },
      "required": [
        "welding-mask",
        "welder-jacket",
        "welding-gauntlets",
        "steel-boots"
      ]
    },
    {
      "id": "electrician",
      "group": {
        "ru": "РАБОЧИЕ"
      },
      "name": {
        "ru": "Электрик"
      },
      "emoji": "⚡",
      "description": {
        "ru": "Специальная защита от тока"
      },
      "greeting": {
        "ru": "Ток опасен! Нужна проверенная диэлектрическая защита!"
      },
      "required": [
        "hard-hat",
        "goggles",
        "work-overall",
        "dielectric-gloves",
        "dielectric-boots"
      ]
    },
    {
      "id": "miner",
      "group": {
        "ru": "РАБОЧИЕ"
      },
      "name": {
        "ru": "Шахтёр"
      },
      "emoji": "⛏️",
      "description": {
        "ru": "Защита под землёй"
      },
      "greeting": {
        "ru": "Под землёй темно и пыльно. Подберём надёжную защиту!"
      },
      "required": [
        "miner-helmet",
        "respirator",
        "work-overall",
        "work-gloves",
        "rubber-boots"
      ]
    },
    {
      "id": "cook",
      "group": {
        "ru": "РАБОЧИЕ"
      },
      "name": {
        "ru": "Повар"
      },
      "emoji": "👩‍🍳",
      "description": {
        "ru": "Чистота и защита от жара"
      },
      "greeting": {
        "ru": "Приготовим вкусный обед! Защитимся от жара и скользкого пола!"
      },
      "required": [
        "chef-hat",
        "chef-jacket",
        "heat-gloves",
        "chef-shoes"
      ]
    },
    {
      "id": "beekeeper",
      "group": {
        "ru": "ОСОБЫЕ"
      },
      "name": {
        "ru": "Пчеловод"
      },
      "emoji": "🐝",
      "description": {
        "ru": "Защита от укусов"
      },
      "greeting": {
        "ru": "Пчёлы любят мёд! Закроем все щёлочки в костюме!"
      },
      "required": [
        "bee-hat",
        "bee-suit",
        "bee-gloves",
        "rubber-boots"
      ]
    },
    {
      "id": "astronaut",
      "group": {
        "ru": "ОСОБЫЕ"
      },
      "name": {
        "ru": "Космонавт"
      },
      "emoji": "🚀",
      "description": {
        "ru": "Полный комплект для космоса"
      },
      "greeting": {
        "ru": "В космосе нет воздуха, нужен полный скафандр!"
      },
      "required": [
        "space-helmet",
        "space-suit",
        "space-gloves",
        "space-boots"
      ]
    }
  ],
  "copy": {
    "title": {
      "ru": "Гардероб безопасности"
    },
    "wardrobe": {
      "ru": "Гардероб"
    },
    "play": {
      "ru": "Играть"
    },
    "professions": {
      "ru": "Профессии"
    },
    "progress": {
      "ru": "Пройдено профессий: {n} / 13"
    },
    "worn": {
      "ru": "Надето"
    },
    "choose": {
      "ru": "Выбери: {name}"
    },
    "done": {
      "ru": "Готово"
    },
    "hint": {
      "ru": "Подсказка 💡"
    },
    "exit": {
      "ru": "Выйти"
    },
    "close": {
      "ru": "Закрыть"
    },
    "left": {
      "ru": "Повернуть влево"
    },
    "right": {
      "ru": "Повернуть вправо"
    },
    "reset": {
      "ru": "Сбросить всё"
    },
    "help": {
      "ru": "Выбирай защиту по категориям. В каждой категории можно надеть один предмет: новый заменит прежний. Повторный клик снимает предмет. Q / E переключают категории. В профессии собери весь комплект и нажми «Готово»."
    },
    "free": {
      "ru": "Классный образ! А теперь попробуй профессию!"
    },
    "freeIntro": {
      "ru": "Собери свой образ или выбери профессию!"
    },
    "great": {
      "ru": "Ты супер! 🎉"
    },
    "ready": {
      "ru": "Я готова к работе! Я полностью защищена! 💚"
    },
    "another": {
      "ru": "Другая профессия"
    },
    "master": {
      "ru": "Мастер безопасности 🏆"
    },
    "change": {
      "ru": "Сменить профессию? Текущий комплект будет сброшен."
    },
    "yes": {
      "ru": "Сменить"
    },
    "cancel": {
      "ru": "Отмена"
    },
    "missing": {
      "ru": "Ещё немного! Подбери защиту для категории «{name}»."
    },
    "wrong": {
      "ru": "Для этой работы нужна другая защита. Посмотри категорию «{name}»."
    },
    "already": {
      "ru": "Награда за эту профессию уже получена"
    },
    "praise": {
      "ru": "Отлично!|Верно!|Молодец!|Так держать!"
    },
    "reward": {
      "ru": "+{n} XP"
    },
    "stars": {
      "ru": "Звёзды: {n} из 3"
    },
    "instructions": {
      "ru": "Как играть"
    },
    "complete": {
      "ru": "Надето {n} / {total}"
    },
    "chooseProfession": {
      "ru": "Выбери профессию"
    },
    "back": {
      "ru": "На старт"
    },
    "bonus": {
      "ru": "Бонус за все 13 профессий: +100 XP"
    },
    "fallback": {
      "ru": "Защита готова!"
    },
    "acids:goggles": {
      "ru": "Брызги кислоты могут попасть сбоку, нужны закрытые очки-маска!"
    },
    "gases:medical-mask": {
      "ru": "Медицинская маска не защитит от ядовитых газов, нужен респиратор!"
    },
    "welder:goggles": {
      "ru": "Сварка слишком яркая, нужна сварочная маска!"
    },
    "beekeeper:work-gloves": {
      "ru": "Пчёлы найдут щёлочку, нужны длинные перчатки пчеловода!"
    },
    "electrician:rubber-gloves": {
      "ru": "Нужны специальные диэлектрические перчатки, они проверены на защиту от тока!"
    },
    "electrician:nitrile-gloves": {
      "ru": "Нужны специальные диэлектрические перчатки, они проверены на защиту от тока!"
    },
    "firefighter:medical-mask": {
      "ru": "Маска не спасёт от дыма, нужен дыхательный аппарат!"
    },
    "firefighter:respirator": {
      "ru": "Маска не спасёт от дыма, нужен дыхательный аппарат!"
    },
    "calibration": {
      "ru": "Калибровка",
      "uz-Latn": "Kalibrlash",
      "en": "Calibration"
    },
    "calibrationHint": {
      "ru": "Настраиваются только запасные иконки без готового слоя. Перетаскивай, колёсиком меняй размер, [ и ] — поворот.",
      "uz-Latn": "Kiyilgan buyumni tanlang. Sudrang, g‘ildirak bilan o‘lchamini, [ va ] bilan burchagini o‘zgartiring.",
      "en": "Select a worn item. Drag to move, wheel to resize, [ and ] to rotate."
    },
    "copySettings": {
      "ru": "Скопировать настройки",
      "uz-Latn": "Sozlamalarni nusxalash",
      "en": "Copy settings"
    },
    "copied": {
      "ru": "JSON скопирован",
      "uz-Latn": "JSON nusxalandi",
      "en": "JSON copied"
    },
    "copyFallback": {
      "ru": "Выдели JSON и скопируй вручную",
      "uz-Latn": "JSON matnini qo‘lda nusxalang",
      "en": "Select and copy the JSON manually"
    },
    "calibrationSelect": {
      "ru": "Надень предмет без готового слоя и выбери его на лягушке",
      "uz-Latn": "Buyumni kiydiring va qurbaqada tanlang",
      "en": "Equip an item and select it on the frog"
    },
    "frogAlt": {
      "ru": "Лягушонок в футболке, без защитной одежды",
      "uz-Latn": "Futbolkali qurbaqa, himoya kiyimisiz",
      "en": "Frog in a T-shirt without protective equipment"
    },
    "collapseCalibration": {
      "ru": "Свернуть калибровку",
      "uz-Latn": "Kalibrlashni yig‘ish",
      "en": "Collapse calibration"
    },
    "expandCalibration": {
      "ru": "Настроить запасные иконки",
      "uz-Latn": "Zaxira belgilarini sozlash",
      "en": "Adjust fallback icons"
    },
    "showFrames": {
      "ru": "Показать рамки",
      "uz-Latn": "Chegaralarni ko‘rsatish",
      "en": "Show outlines"
    },
    "hideFrames": {
      "ru": "Скрыть рамки",
      "uz-Latn": "Chegaralarni yashirish",
      "en": "Hide outlines"
    },
    "professionProgress": {
      "ru": "Пройдено: {n} / 13",
      "uz-Latn": "Bajarildi: {n} / 13",
      "en": "Completed: {n} / 13"
    },
    "professionCompleted": {
      "ru": "Профессия пройдена",
      "uz-Latn": "Kasb bajarildi",
      "en": "Profession completed"
    }
  },
  "scene": {
    "background": "assets/game/wardrobe-bg.jpg",
    "base": "assets/game/frog-base.webp",
    "width": 1376,
    "height": 768,
    "rug": {
      "x": 36,
      "y": 88,
      "width": 37
    },
    "character": {
      "x": 36,
      "footY": 88,
      "footInCanvas": 95,
      "height": 62,
      "width": 896,
      "canvasHeight": 1200
    },
    "order": [
      "base",
      "body",
      "feet",
      "hands",
      "face",
      "eyes",
      "head"
    ],
    "flightPoints": {
      "head": [
        {
          "x": 50,
          "y": 10
        }
      ],
      "eyes": [
        {
          "x": 50,
          "y": 15
        }
      ],
      "face": [
        {
          "x": 50,
          "y": 22
        }
      ],
      "body": [
        {
          "x": 50,
          "y": 45
        }
      ],
      "hands": [
        {
          "x": 20,
          "y": 68
        },
        {
          "x": 80,
          "y": 68
        }
      ],
      "feet": [
        {
          "x": 37,
          "y": 92
        },
        {
          "x": 63,
          "y": 92
        }
      ]
    },
    "fallbacks": {
      "feet": {
        "y": 92,
        "w": 26,
        "left": 37,
        "right": 63
      }
    },
    "fallbackAdjustments": {}
  }
};
