/* Геометрия бумажной куклы и прозрачные предметы; правила профессий и XP сохранены. */
const SafetyWardrobeData={
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/cap.png",
        "x": 0,
        "y": 0,
        "w": 138,
        "h": 111,
        "atlasW": 138,
        "atlasH": 111
      },
      "wear": {
        "dx": 0,
        "dy": -4,
        "dw": 0,
        "rotate": 0,
        "h": 14
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/hard-hat.png",
        "x": 0,
        "y": 0,
        "w": 150,
        "h": 113,
        "atlasW": 150,
        "atlasH": 113
      },
      "wear": {
        "dx": 0,
        "dy": -4,
        "dw": 0,
        "rotate": 0,
        "h": 14
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/fire-helmet.png",
        "x": 0,
        "y": 0,
        "w": 170,
        "h": 119,
        "atlasW": 170,
        "atlasH": 119
      },
      "wear": {
        "dx": 0,
        "dy": -4,
        "dw": 0,
        "rotate": 0,
        "h": 14
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/miner-helmet.png",
        "x": 0,
        "y": 0,
        "w": 152,
        "h": 109,
        "atlasW": 152,
        "atlasH": 109
      },
      "wear": {
        "dx": 0,
        "dy": -4,
        "dw": 0,
        "rotate": 0,
        "h": 14
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/chef-hat.png",
        "x": 0,
        "y": 0,
        "w": 148,
        "h": 131,
        "atlasW": 148,
        "atlasH": 131
      },
      "wear": {
        "dx": 0,
        "dy": -5,
        "dw": -12,
        "rotate": 0,
        "h": 24
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/bee-hat.png",
        "x": 0,
        "y": 0,
        "w": 156,
        "h": 143,
        "atlasW": 156,
        "atlasH": 143
      },
      "wear": {
        "dx": 0,
        "dy": 6,
        "dw": 12,
        "rotate": 0,
        "h": 31,
        "z": 82
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/space-helmet.png",
        "x": 0,
        "y": 0,
        "w": 138,
        "h": 146,
        "atlasW": 138,
        "atlasH": 146
      },
      "wear": {
        "dx": 0,
        "dy": 10,
        "dw": 13,
        "rotate": 0,
        "h": 37,
        "hides": [
          "eyes",
          "face"
        ],
        "z": 80
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/goggles.png",
        "x": 0,
        "y": 0,
        "w": 168,
        "h": 88,
        "atlasW": 168,
        "atlasH": 88
      },
      "wear": {
        "dx": 0,
        "dy": 0,
        "dw": 0,
        "rotate": 0,
        "h": 13
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/sealed-goggles.png",
        "x": 0,
        "y": 0,
        "w": 162,
        "h": 96,
        "atlasW": 162,
        "atlasH": 96
      },
      "wear": {
        "dx": 0,
        "dy": 0,
        "dw": 0,
        "rotate": 0,
        "h": 13
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/medical-mask.png",
        "x": 0,
        "y": 0,
        "w": 149,
        "h": 113,
        "atlasW": 149,
        "atlasH": 113
      },
      "wear": {
        "dx": 0,
        "dy": 3,
        "dw": 0,
        "rotate": 0
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/respirator.png",
        "x": 0,
        "y": 0,
        "w": 150,
        "h": 126,
        "atlasW": 150,
        "atlasH": 126
      },
      "wear": {
        "dx": 0,
        "dy": 3,
        "dw": 0,
        "rotate": 0
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/face-shield.png",
        "x": 0,
        "y": 0,
        "w": 130,
        "h": 139,
        "atlasW": 130,
        "atlasH": 139
      },
      "wear": {
        "dx": 0,
        "dy": -3,
        "dw": 28,
        "rotate": 0,
        "h": 29,
        "z": 75
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/welding-mask.png",
        "x": 0,
        "y": 0,
        "w": 129,
        "h": 153,
        "atlasW": 129,
        "atlasH": 153
      },
      "wear": {
        "dx": 0,
        "dy": -4,
        "dw": 37,
        "rotate": 0,
        "h": 37,
        "hides": [
          "eyes",
          "face"
        ],
        "z": 80
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/fire-breathing.png",
        "x": 0,
        "y": 0,
        "w": 153,
        "h": 162,
        "atlasW": 153,
        "atlasH": 162
      },
      "wear": {
        "dx": 0,
        "dy": 4,
        "dw": -4,
        "rotate": 0,
        "splitAir": true,
        "h": 15,
        "z": 60,
        "parts": {
          "mask": {
            "cropTop": 0.27
          },
          "tank": {
            "x": 82,
            "y": 40,
            "cropTop": 0
          }
        }
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/lab-coat.png",
        "x": 0,
        "y": 0,
        "w": 165,
        "h": 172,
        "atlasW": 165,
        "atlasH": 172
      },
      "wear": {
        "dx": 0,
        "dy": 4,
        "dw": 0,
        "rotate": 0
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/surgical-gown.png",
        "x": 0,
        "y": 0,
        "w": 163,
        "h": 165,
        "atlasW": 163,
        "atlasH": 165
      },
      "wear": {
        "dx": 0,
        "dy": 4,
        "dw": 0,
        "rotate": 0
      }
    },
    {
      "id": "apron",
      "category": "body",
      "slot": "apron",
      "name": {
        "ru": "Защитный фартук"
      },
      "tip": {
        "ru": "Дополняет халат или китель защитным слоем."
      },
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/apron.png",
        "x": 0,
        "y": 0,
        "w": 146,
        "h": 170,
        "atlasW": 146,
        "atlasH": 170
      },
      "wear": {
        "dx": 0,
        "dy": 5,
        "dw": -10,
        "rotate": 0,
        "z": 42
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/coverall.png",
        "x": 0,
        "y": 0,
        "w": 168,
        "h": 176,
        "atlasW": 168,
        "atlasH": 176
      },
      "wear": {
        "dx": 0,
        "dy": 0,
        "dw": 0,
        "rotate": 0,
        "fullSuit": true
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/fire-suit.png",
        "x": 0,
        "y": 0,
        "w": 158,
        "h": 175,
        "atlasW": 158,
        "atlasH": 175
      },
      "wear": {
        "dx": 0,
        "dy": 0,
        "dw": 0,
        "rotate": 0,
        "fullSuit": true
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/hi-vis-vest.png",
        "x": 0,
        "y": 0,
        "w": 166,
        "h": 149,
        "atlasW": 166,
        "atlasH": 149
      },
      "wear": {
        "dx": 0,
        "dy": 4,
        "dw": 0,
        "rotate": 0
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/welder-jacket.png",
        "x": 0,
        "y": 0,
        "w": 183,
        "h": 165,
        "atlasW": 183,
        "atlasH": 165
      },
      "wear": {
        "dx": 0,
        "dy": 4,
        "dw": 0,
        "rotate": 0
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/bee-suit.png",
        "x": 0,
        "y": 0,
        "w": 167,
        "h": 178,
        "atlasW": 167,
        "atlasH": 178
      },
      "wear": {
        "dx": 0,
        "dy": 0,
        "dw": 0,
        "rotate": 0,
        "fullSuit": true,
        "cropTop": 0.33
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/chef-jacket.png",
        "x": 0,
        "y": 0,
        "w": 180,
        "h": 150,
        "atlasW": 180,
        "atlasH": 150
      },
      "wear": {
        "dx": 0,
        "dy": 4,
        "dw": 0,
        "rotate": 0
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/work-overall.png",
        "x": 0,
        "y": 0,
        "w": 169,
        "h": 173,
        "atlasW": 169,
        "atlasH": 173
      },
      "wear": {
        "dx": 0,
        "dy": 0,
        "dw": 0,
        "rotate": 0,
        "fullSuit": true
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/space-suit.png",
        "x": 0,
        "y": 0,
        "w": 156,
        "h": 167,
        "atlasW": 156,
        "atlasH": 167
      },
      "wear": {
        "dx": 0,
        "dy": 0,
        "dw": 0,
        "rotate": 0,
        "fullSuit": true
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/nitrile-gloves.png",
        "x": 0,
        "y": 0,
        "w": 165,
        "h": 131,
        "atlasW": 165,
        "atlasH": 131
      },
      "wear": {
        "dx": 0,
        "dy": -2,
        "dw": 3,
        "rotate": 180,
        "parts": {
          "left": {
            "x": 13
          },
          "right": {
            "x": 87
          }
        }
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/rubber-gloves.png",
        "x": 0,
        "y": 0,
        "w": 171,
        "h": 137,
        "atlasW": 171,
        "atlasH": 137
      },
      "wear": {
        "dx": 0,
        "dy": -2,
        "dw": 3,
        "rotate": 180,
        "parts": {
          "left": {
            "x": 13
          },
          "right": {
            "x": 87
          }
        }
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/heat-gloves.png",
        "x": 0,
        "y": 0,
        "w": 162,
        "h": 131,
        "atlasW": 162,
        "atlasH": 131
      },
      "wear": {
        "dx": 0,
        "dy": -2,
        "dw": 3,
        "rotate": 180,
        "parts": {
          "left": {
            "x": 13
          },
          "right": {
            "x": 87
          }
        }
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/work-gloves.png",
        "x": 0,
        "y": 0,
        "w": 159,
        "h": 162,
        "atlasW": 159,
        "atlasH": 162
      },
      "wear": {
        "dx": 0,
        "dy": -2,
        "dw": 3,
        "rotate": 180,
        "parts": {
          "left": {
            "x": 13
          },
          "right": {
            "x": 87
          }
        }
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/welding-gauntlets.png",
        "x": 0,
        "y": 0,
        "w": 154,
        "h": 136,
        "atlasW": 154,
        "atlasH": 136
      },
      "wear": {
        "dx": 0,
        "dy": -2,
        "dw": 3,
        "rotate": 180,
        "parts": {
          "left": {
            "x": 13
          },
          "right": {
            "x": 87
          }
        }
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/dielectric-gloves.png",
        "x": 0,
        "y": 0,
        "w": 149,
        "h": 132,
        "atlasW": 149,
        "atlasH": 132
      },
      "wear": {
        "dx": 0,
        "dy": -2,
        "dw": 3,
        "rotate": 180,
        "parts": {
          "left": {
            "x": 13
          },
          "right": {
            "x": 87
          }
        }
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/bee-gloves.png",
        "x": 0,
        "y": 0,
        "w": 171,
        "h": 140,
        "atlasW": 171,
        "atlasH": 140
      },
      "wear": {
        "dx": 0,
        "dy": -2,
        "dw": 3,
        "rotate": 180,
        "parts": {
          "left": {
            "x": 13
          },
          "right": {
            "x": 87
          }
        }
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/space-gloves.png",
        "x": 0,
        "y": 0,
        "w": 152,
        "h": 138,
        "atlasW": 152,
        "atlasH": 138
      },
      "wear": {
        "dx": 0,
        "dy": -2,
        "dw": 3,
        "rotate": 180,
        "parts": {
          "left": {
            "x": 13
          },
          "right": {
            "x": 87
          }
        }
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/closed-shoes.png",
        "x": 0,
        "y": 0,
        "w": 165,
        "h": 103,
        "atlasW": 165,
        "atlasH": 103
      },
      "wear": {
        "dx": 0,
        "dy": -1,
        "dw": 4,
        "rotate": 0
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/rubber-boots.png",
        "x": 0,
        "y": 0,
        "w": 152,
        "h": 147,
        "atlasW": 152,
        "atlasH": 147
      },
      "wear": {
        "dx": 0,
        "dy": -5,
        "dw": 4,
        "rotate": 0,
        "h": 21
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/shoe-covers.png",
        "x": 0,
        "y": 0,
        "w": 171,
        "h": 100,
        "atlasW": 171,
        "atlasH": 100
      },
      "wear": {
        "dx": 0,
        "dy": -1,
        "dw": 4,
        "rotate": 0
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/steel-boots.png",
        "x": 0,
        "y": 0,
        "w": 178,
        "h": 134,
        "atlasW": 178,
        "atlasH": 134
      },
      "wear": {
        "dx": 0,
        "dy": -5,
        "dw": 4,
        "rotate": 0,
        "h": 21
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/fire-boots.png",
        "x": 0,
        "y": 0,
        "w": 153,
        "h": 150,
        "atlasW": 153,
        "atlasH": 150
      },
      "wear": {
        "dx": 0,
        "dy": -5,
        "dw": 4,
        "rotate": 0,
        "h": 21
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/dielectric-boots.png",
        "x": 0,
        "y": 0,
        "w": 155,
        "h": 149,
        "atlasW": 155,
        "atlasH": 149
      },
      "wear": {
        "dx": 0,
        "dy": -5,
        "dw": 4,
        "rotate": 0,
        "h": 21
      }
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/chef-shoes.png",
        "x": 0,
        "y": 0,
        "w": 161,
        "h": 108,
        "atlasW": 161,
        "atlasH": 108
      },
      "wear": {
        "dx": 0,
        "dy": -1,
        "dw": 4,
        "rotate": 0
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
      "art": {
        "width": 100,
        "height": 100,
        "left": 0,
        "top": 0
      },
      "sprite": {
        "src": "assets/game/items/space-boots.png",
        "x": 0,
        "y": 0,
        "w": 157,
        "h": 141,
        "atlasW": 157,
        "atlasH": 141
      },
      "wear": {
        "dx": 0,
        "dy": -5,
        "dw": 4,
        "rotate": 0,
        "h": 21
      }
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
        "lab-coat",
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
        "apron",
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
      "ru": "Выбирай защиту по категориям. Повторный клик снимает предмет. Q / E переключают категории. Фартук надевается поверх халата или кителя. В профессии собери весь комплект и нажми «Готово»."
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
      "ru": "Выбери надетый предмет. Перетаскивай, колёсиком меняй размер, [ и ] — поворот.",
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
      "ru": "Надень предмет и выбери его на лягушке",
      "uz-Latn": "Buyumni kiydiring va qurbaqada tanlang",
      "en": "Equip an item and select it on the frog"
    },
    "frogAlt": {
      "ru": "Лягушонок в футболке, без защитной одежды",
      "uz-Latn": "Futbolkali qurbaqa, himoya kiyimisiz",
      "en": "Frog in a T-shirt without protective equipment"
    }
  },
  "scene": {
    "background": "assets/game/wardrobe-bg.jpg",
    "base": "assets/game/frog-base.png",
    "width": 1376,
    "height": 768,
    "rug": {
      "x": 36,
      "y": 88,
      "width": 37
    },
    "character": {
      "x": 36,
      "bottom": 91,
      "height": 74,
      "width": 589,
      "canvasHeight": 1072
    },
    "slots": {
      "head": {
        "x": 50,
        "y": 6,
        "w": 72,
        "h": 18,
        "z": 80
      },
      "eyes": {
        "x": 50,
        "y": 10.5,
        "w": 62,
        "h": 8,
        "z": 70
      },
      "face": {
        "x": 50,
        "y": 18.5,
        "w": 48,
        "h": 10,
        "z": 60
      },
      "body": {
        "x": 50,
        "y": 46,
        "w": 82,
        "h": 42,
        "z": 40
      },
      "fullBody": {
        "x": 50,
        "y": 60,
        "w": 100,
        "h": 68,
        "z": 40
      },
      "handL": {
        "x": 11,
        "y": 71,
        "w": 26,
        "h": 23,
        "rotate": 8,
        "z": 50
      },
      "handR": {
        "x": 89,
        "y": 71,
        "w": 26,
        "h": 23,
        "rotate": -8,
        "z": 50
      },
      "footL": {
        "x": 22,
        "y": 94.5,
        "w": 34,
        "h": 15,
        "z": 30
      },
      "footR": {
        "x": 78,
        "y": 94.5,
        "w": 34,
        "h": 15,
        "z": 30
      },
      "back": {
        "x": 70,
        "y": 40,
        "w": 30,
        "h": 34,
        "z": 10
      }
    },
    "order": [
      "back",
      "base",
      "feet",
      "body",
      "hands",
      "face",
      "eyes",
      "head"
    ],
    "adjustments": {}
  }
};
