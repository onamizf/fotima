/* Локализованные тексты, анатомические стыки одежды и посадка обуви. */
const SafetyWardrobeData = {
  "categories": [
    {
      "id": "head",
      "name": {
        "ru": "Головной убор",
        "uz-Latn": "Bosh kiyim",
        "uz-Cyrl": "Бош кийим",
        "en": "Headwear"
      },
      "emoji": "🪖"
    },
    {
      "id": "eyes",
      "name": {
        "ru": "Защитные очки",
        "uz-Latn": "Himoya ko'zoynagi",
        "uz-Cyrl": "Ҳимоя кўзойнаги",
        "en": "Safety glasses"
      },
      "emoji": "🥽"
    },
    {
      "id": "face",
      "name": {
        "ru": "Маски для лица",
        "uz-Latn": "Yuz niqoblari",
        "uz-Cyrl": "Юз ниқоблари",
        "en": "Face masks"
      },
      "emoji": "😷"
    },
    {
      "id": "body",
      "name": {
        "ru": "Верхняя одежда",
        "uz-Latn": "Ustki kiyimlar",
        "uz-Cyrl": "Устки кийимлар",
        "en": "Outerwear"
      },
      "emoji": "🥼"
    },
    {
      "id": "hands",
      "name": {
        "ru": "Перчатки",
        "uz-Latn": "Qo'lqoplar",
        "uz-Cyrl": "Қўлқоплар",
        "en": "Gloves"
      },
      "emoji": "🧤"
    },
    {
      "id": "feet",
      "name": {
        "ru": "Обувь",
        "uz-Latn": "Oyoq kiyim",
        "uz-Cyrl": "Оёқ кийим",
        "en": "Footwear"
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
        "ru": "Шапочка для волос",
        "uz-Latn": "Soch qalpoqchasi",
        "uz-Cyrl": "Соч қалпоқчаси",
        "en": "Hair cap"
      },
      "tip": {
        "ru": "Убирает волосы под защитную шапочку.",
        "uz-Latn": "Sochni himoya qalpoqchasi ichiga yig'adi.",
        "uz-Cyrl": "Сочни ҳимоя қалпоқчаси ичига йиғади.",
        "en": "Keeps hair tucked inside a protective cap."
      },
      "layer": "assets/game/wear/cap.webp",
      "z": 80
    },
    {
      "id": "hard-hat",
      "category": "head",
      "slot": "head",
      "name": {
        "ru": "Строительная каска",
        "uz-Latn": "Qurilish kaskasi",
        "uz-Cyrl": "Қурилиш каскаси",
        "en": "Hard hat"
      },
      "tip": {
        "ru": "Защищает голову от падающих предметов.",
        "uz-Latn": "Boshni tepadan tushadigan buyumlardan himoya qiladi.",
        "uz-Cyrl": "Бошни тепадан тушадиган буюмлардан ҳимоя қилади.",
        "en": "Protects the head from falling objects."
      },
      "layer": "assets/game/wear/hard-hat.webp",
      "z": 80,
      "registration": {
        "source": [
          0,
          0,
          896,
          1200
        ],
        "body": [
          18,
          -20,
          878,
          916
        ]
      }
    },
    {
      "id": "fire-helmet",
      "category": "head",
      "slot": "head",
      "name": {
        "ru": "Пожарная каска",
        "uz-Latn": "O't o'chiruvchi kaskasi",
        "uz-Cyrl": "Ўт ўчирувчи каскаси",
        "en": "Firefighter helmet"
      },
      "tip": {
        "ru": "Защищает голову пожарного от жара и ударов.",
        "uz-Latn": "Boshni issiqlik va zarbalardan himoya qiladi.",
        "uz-Cyrl": "Бошни иссиқлик ва зарбалардан ҳимоя қилади.",
        "en": "Protects a firefighter's head from heat and impacts."
      },
      "layer": "assets/game/wear/fire-helmet.webp",
      "z": 80
    },
    {
      "id": "miner-helmet",
      "category": "head",
      "slot": "head",
      "name": {
        "ru": "Каска шахтёра",
        "uz-Latn": "Konchi kaskasi",
        "uz-Cyrl": "Кончи каскаси",
        "en": "Miner helmet"
      },
      "tip": {
        "ru": "Защищает голову и освещает путь фонарём.",
        "uz-Latn": "Boshni himoya qiladi, chirog'i yo'lni yoritadi.",
        "uz-Cyrl": "Бошни ҳимоя қилади, чироғи ёълни ёритади.",
        "en": "Protects the head and lights the way with a lamp."
      },
      "layer": "assets/game/wear/miner-helmet.webp",
      "z": 80
    },
    {
      "id": "chef-hat",
      "category": "head",
      "slot": "head",
      "name": {
        "ru": "Поварской колпак",
        "uz-Latn": "Oshpaz qalpog'i",
        "uz-Cyrl": "Ошпаз қалпоғи",
        "en": "Chef hat"
      },
      "tip": {
        "ru": "Не даёт волосам попасть в пищу.",
        "uz-Latn": "Sochning ovqatga tushishiga yo'l qo'ymaydi.",
        "uz-Cyrl": "Сочнинг овқатга тушишига ёъл қўймайди.",
        "en": "Keeps hair out of food."
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
        "ru": "Шляпа пчеловода",
        "uz-Latn": "Asalarichi shlyapasi",
        "uz-Cyrl": "Асаларичи шляпаси",
        "en": "Beekeeper veil"
      },
      "tip": {
        "ru": "Сетка защищает лицо от пчёл.",
        "uz-Latn": "To'ri yuzni asalarilardan himoya qiladi.",
        "uz-Cyrl": "Тўри юзни асаларилардан ҳимоя қилади.",
        "en": "A mesh veil protects the face from bees."
      },
      "layer": "assets/game/wear/bee-hat.webp",
      "z": 85
    },
    {
      "id": "space-helmet",
      "category": "head",
      "slot": "head",
      "name": {
        "ru": "Шлем скафандра",
        "uz-Latn": "Skafandr shlemi",
        "uz-Cyrl": "Скафандр шлеми",
        "en": "Space helmet"
      },
      "tip": {
        "ru": "Герметичный шлем помогает дышать в космосе.",
        "uz-Latn": "Havo o'tkazmaydigan shlem kosmosda nafas olishga yordam beradi.",
        "uz-Cyrl": "Ҳаво ўтказмайдиган шлем космосда нафас олишга ёрдам беради.",
        "en": "An airtight helmet helps the wearer breathe in space."
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
        "ru": "Защитные очки",
        "uz-Latn": "Himoya ko'zoynagi",
        "uz-Cyrl": "Ҳимоя кўзойнаги",
        "en": "Safety glasses"
      },
      "tip": {
        "ru": "Защищают глаза от частиц и случайных брызг.",
        "uz-Latn": "Ko'zlarni mayda zarrachalar va tasodifiy sachrashlardan himoya qiladi.",
        "uz-Cyrl": "Кўзларни майда заррачалар ва тасодифий сачрашлардан ҳимоя қилади.",
        "en": "Protects the eyes from particles and accidental splashes."
      },
      "layer": "assets/game/wear/goggles.webp",
      "z": 70
    },
    {
      "id": "sealed-goggles",
      "category": "eyes",
      "slot": "eyes",
      "name": {
        "ru": "Закрытые очки-маска",
        "uz-Latn": "Yopiq himoya ko'zoynagi",
        "uz-Cyrl": "Ёпиқ ҳимоя кўзойнаги",
        "en": "Sealed goggles"
      },
      "tip": {
        "ru": "Закрывают глаза от брызг со всех сторон.",
        "uz-Latn": "Ko'zlarni har tomondan sachraydigan tomchilardan himoya qiladi.",
        "uz-Cyrl": "Кўзларни ҳар томондан сачрайдиган томчилардан ҳимоя қилади.",
        "en": "Protects the eyes from splashes on all sides."
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
        "ru": "Медицинская маска",
        "uz-Latn": "Tibbiy niqob",
        "uz-Cyrl": "Тиббий ниқоб",
        "en": "Medical mask"
      },
      "tip": {
        "ru": "Помогает сохранять чистоту операционного поля.",
        "uz-Latn": "Operatsiya joyini toza saqlashga yordam beradi.",
        "uz-Cyrl": "Операция жойини тоза сақлашга ёрдам беради.",
        "en": "Helps keep the operating area clean."
      },
      "layer": "assets/game/wear/medical-mask.webp",
      "z": 60
    },
    {
      "id": "respirator",
      "category": "face",
      "slot": "face",
      "name": {
        "ru": "Респиратор",
        "uz-Latn": "Respirator",
        "uz-Cyrl": "Респиратор",
        "en": "Respirator"
      },
      "tip": {
        "ru": "Защищает дыхание с подходящим для опасности фильтром.",
        "uz-Latn": "Xavfga mos filtr bilan nafas yo'llarini himoya qiladi.",
        "uz-Cyrl": "Хавфга мос филтр билан нафас ёълларини ҳимоя қилади.",
        "en": "Protects breathing when fitted with a filter suited to the hazard."
      },
      "layer": "assets/game/wear/respirator.webp",
      "z": 60
    },
    {
      "id": "face-shield",
      "category": "face",
      "slot": "face",
      "name": {
        "ru": "Защитный щиток",
        "uz-Latn": "Yuz qalqoni",
        "uz-Cyrl": "Юз қалқони",
        "en": "Face shield"
      },
      "tip": {
        "ru": "Дополняет очки и защищает лицо от брызг.",
        "uz-Latn": "Ko'zoynakka qo'shimcha bo'lib, yuzni sachrashlardan himoya qiladi.",
        "uz-Cyrl": "Кўзойнакка қўшимча бўлиб, юзни сачрашлардан ҳимоя қилади.",
        "en": "Adds to goggles by protecting the face from splashes."
      },
      "layer": "assets/game/wear/face-shield.webp",
      "z": 75
    },
    {
      "id": "welding-mask",
      "category": "face",
      "slot": "face",
      "name": {
        "ru": "Сварочная маска",
        "uz-Latn": "Payvandlash niqobi",
        "uz-Cyrl": "Пайвандлаш ниқоби",
        "en": "Welding helmet"
      },
      "tip": {
        "ru": "Защищает глаза и лицо от яркой сварочной дуги.",
        "uz-Latn": "Ko'z va yuzni juda yorqin payvandlash yoyidan himoya qiladi.",
        "uz-Cyrl": "Кўз ва юзни жуда ёрқин пайвандлаш ёйидан ҳимоя қилади.",
        "en": "Protects the eyes and face from the bright welding arc."
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
        "ru": "Дыхательный аппарат",
        "uz-Latn": "Nafas olish apparati",
        "uz-Cyrl": "Нафас олиш аппарати",
        "en": "Breathing apparatus"
      },
      "tip": {
        "ru": "Подаёт пожарному воздух независимо от дыма.",
        "uz-Latn": "Tutun bo'lsa ham o't o'chiruvchiga havo yetkazadi.",
        "uz-Cyrl": "Тутун бўлса ҳам ўт ўчирувчига ҳаво етказади.",
        "en": "Supplies a firefighter with air independently of the smoke."
      },
      "layer": "assets/game/wear/fire-breathing.webp",
      "z": 60
    },
    {
      "id": "lab-coat",
      "category": "body",
      "slot": "body",
      "name": {
        "ru": "Лабораторный халат",
        "uz-Latn": "Laboratoriya xalati",
        "uz-Cyrl": "Лаборатория халати",
        "en": "Lab coat"
      },
      "tip": {
        "ru": "Защищает одежду и кожу при работе в лаборатории.",
        "uz-Latn": "Laboratoriyada kiyim va terini himoya qiladi.",
        "uz-Cyrl": "Лабораторияда кийим ва терини ҳимоя қилади.",
        "en": "Protects clothing and skin during laboratory work."
      },
      "layer": "assets/game/wear/lab-coat.webp",
      "z": 30,
      "coverage": {
        "hideShirtSleeves": true
      },
      "joints": {
        "cuffs": [
          {
            "pins": [
              {
                "from": [
                  189,
                  694
                ],
                "to": [
                  188,
                  694
                ]
              },
              {
                "from": [
                  256,
                  715
                ],
                "to": [
                  249,
                  714
                ]
              }
            ],
            "opening": {
              "x": 218,
              "y": 704,
              "rx": 27,
              "ry": 5,
              "angle": 18
            }
          },
          {
            "pins": [
              {
                "from": [
                  707,
                  694
                ],
                "to": [
                  708,
                  694
                ]
              },
              {
                "from": [
                  640,
                  715
                ],
                "to": [
                  647,
                  714
                ]
              }
            ],
            "opening": {
              "x": 678,
              "y": 704,
              "rx": 27,
              "ry": 5,
              "angle": -18
            }
          }
        ],
        "neck": {
          "extend": 14
        }
      }
    },
    {
      "id": "surgical-gown",
      "category": "body",
      "slot": "body",
      "name": {
        "ru": "Хирургический халат",
        "uz-Latn": "Jarrohlik xalati",
        "uz-Cyrl": "Жарроҳлик халати",
        "en": "Surgical gown"
      },
      "tip": {
        "ru": "Создаёт защитный барьер в операционной.",
        "uz-Latn": "Operatsiya xonasida himoya to'sig'ini yaratadi.",
        "uz-Cyrl": "Операция хонасида ҳимоя тўсиғини яратади.",
        "en": "Creates a protective barrier in the operating room."
      },
      "layer": "assets/game/wear/surgical-gown.webp",
      "z": 30,
      "coverage": {
        "hideShirtSleeves": true
      },
      "joints": {
        "cuffs": [
          {
            "pins": [
              {
                "from": [
                  190,
                  683
                ],
                "to": [
                  195,
                  681
                ]
              },
              {
                "from": [
                  253,
                  704
                ],
                "to": [
                  253,
                  700
                ]
              }
            ],
            "opening": {
              "x": 224,
              "y": 691,
              "rx": 21,
              "ry": 5,
              "angle": 18
            }
          },
          {
            "pins": [
              {
                "from": [
                  706,
                  683
                ],
                "to": [
                  701,
                  681
                ]
              },
              {
                "from": [
                  643,
                  704
                ],
                "to": [
                  643,
                  700
                ]
              }
            ],
            "opening": {
              "x": 672,
              "y": 691,
              "rx": 21,
              "ry": 5,
              "angle": -18
            }
          }
        ],
        "neck": {
          "extend": 0
        }
      }
    },
    {
      "id": "apron",
      "category": "body",
      "slot": "body",
      "name": {
        "ru": "Защитный фартук",
        "uz-Latn": "Himoya fartugi",
        "uz-Cyrl": "Ҳимоя фартуги",
        "en": "Protective apron"
      },
      "tip": {
        "ru": "Дополняет халат или китель защитным слоем.",
        "uz-Latn": "Xalat yoki ustki kiyimga qo'shimcha himoya qatlami bo'ladi.",
        "uz-Cyrl": "Халат ёки устки кийимга қўшимча ҳимоя қатлами бўлади.",
        "en": "Adds a protective layer over a coat or jacket."
      },
      "layer": "assets/game/wear/apron.webp",
      "z": 30
    },
    {
      "id": "coverall",
      "category": "body",
      "slot": "body",
      "name": {
        "ru": "Защитный комбинезон",
        "uz-Latn": "Himoya kombinezoni",
        "uz-Cyrl": "Ҳимоя комбинезони",
        "en": "Protective coverall"
      },
      "tip": {
        "ru": "Закрывает тело при работе с опасными веществами.",
        "uz-Latn": "Xavfli moddalar bilan ishlaganda tanani yopadi.",
        "uz-Cyrl": "Хавфли моддалар билан ишлаганда танани ёпади.",
        "en": "Covers the body when working with hazardous substances."
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
        "ru": "Пожарный костюм",
        "uz-Latn": "O't o'chiruvchi kiyimi",
        "uz-Cyrl": "Ўт ўчирувчи кийими",
        "en": "Firefighter suit"
      },
      "tip": {
        "ru": "Защищает тело от жара.",
        "uz-Latn": "Tanani issiqlikdan himoya qiladi.",
        "uz-Cyrl": "Танани иссиқликдан ҳимоя қилади.",
        "en": "Protects the body from heat."
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
      },
      "joints": {
        "cuffs": [
          {
            "pins": [
              {
                "from": [
                  183,
                  730
                ],
                "to": [
                  177,
                  722
                ]
              },
              {
                "from": [
                  263,
                  754
                ],
                "to": [
                  259,
                  746
                ]
              }
            ],
            "opening": {
              "x": 218,
              "y": 734,
              "rx": 36,
              "ry": 7,
              "angle": 17
            }
          },
          {
            "pins": [
              {
                "from": [
                  713,
                  730
                ],
                "to": [
                  719,
                  722
                ]
              },
              {
                "from": [
                  633,
                  754
                ],
                "to": [
                  637,
                  746
                ]
              }
            ],
            "opening": {
              "x": 678,
              "y": 734,
              "rx": 36,
              "ry": 7,
              "angle": -17
            }
          }
        ],
        "neck": {
          "extend": 14
        }
      }
    },
    {
      "id": "hi-vis-vest",
      "category": "body",
      "slot": "body",
      "name": {
        "ru": "Светоотражающий жилет",
        "uz-Latn": "Nur qaytaruvchi nimcha",
        "uz-Cyrl": "Нур қайтарувчи нимча",
        "en": "High-visibility vest"
      },
      "tip": {
        "ru": "Помогает быть заметным на стройке.",
        "uz-Latn": "Qurilishda boshqalarga yaxshi ko'rinishga yordam beradi.",
        "uz-Cyrl": "Қурилишда бошқаларга яхши кўринишга ёрдам беради.",
        "en": "Helps the wearer stay visible on a building site."
      },
      "layer": "assets/game/wear/hi-vis-vest.webp",
      "z": 30
    },
    {
      "id": "welder-jacket",
      "category": "body",
      "slot": "body",
      "name": {
        "ru": "Куртка сварщика",
        "uz-Latn": "Payvandchi kurtkasi",
        "uz-Cyrl": "Пайвандчи курткаси",
        "en": "Welding jacket"
      },
      "tip": {
        "ru": "Защищает от искр и горячих частиц.",
        "uz-Latn": "Uchqunlar va issiq zarrachalardan himoya qiladi.",
        "uz-Cyrl": "Учқунлар ва иссиқ заррачалардан ҳимоя қилади.",
        "en": "Protects against sparks and hot particles."
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
      },
      "joints": {
        "cuffs": [
          {
            "pins": [
              {
                "from": [
                  176,
                  724
                ],
                "to": [
                  178,
                  721
                ]
              },
              {
                "from": [
                  247,
                  746
                ],
                "to": [
                  257,
                  745
                ]
              }
            ],
            "opening": {
              "x": 217,
              "y": 733,
              "rx": 34,
              "ry": 6,
              "angle": 17
            }
          },
          {
            "pins": [
              {
                "from": [
                  720,
                  724
                ],
                "to": [
                  718,
                  721
                ]
              },
              {
                "from": [
                  649,
                  746
                ],
                "to": [
                  639,
                  745
                ]
              }
            ],
            "opening": {
              "x": 679,
              "y": 733,
              "rx": 34,
              "ry": 6,
              "angle": -17
            }
          }
        ],
        "neck": {
          "extend": 14
        }
      }
    },
    {
      "id": "bee-suit",
      "category": "body",
      "slot": "body",
      "name": {
        "ru": "Костюм пчеловода",
        "uz-Latn": "Asalarichi kiyimi",
        "uz-Cyrl": "Асаларичи кийими",
        "en": "Beekeeper suit"
      },
      "tip": {
        "ru": "Закрывает тело от укусов пчёл.",
        "uz-Latn": "Tanani asalari chaqishidan himoya qiladi.",
        "uz-Cyrl": "Танани асалари чақишидан ҳимоя қилади.",
        "en": "Covers the body to protect against bee stings."
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
        "ru": "Поварской китель",
        "uz-Latn": "Oshpaz kiyimi",
        "uz-Cyrl": "Ошпаз кийими",
        "en": "Chef jacket"
      },
      "tip": {
        "ru": "Защищает тело при работе на кухне.",
        "uz-Latn": "Oshxonada ishlaganda tanani himoya qiladi.",
        "uz-Cyrl": "Ошхонада ишлаганда танани ҳимоя қилади.",
        "en": "Protects the body during kitchen work."
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
      },
      "joints": {
        "cuffs": [
          {
            "pins": [
              {
                "from": [
                  213,
                  630
                ],
                "to": [
                  209,
                  633
                ]
              },
              {
                "from": [
                  290,
                  657
                ],
                "to": [
                  272,
                  657
                ]
              }
            ],
            "opening": {
              "x": 240,
              "y": 645,
              "rx": 27,
              "ry": 5,
              "angle": 18
            }
          },
          {
            "pins": [
              {
                "from": [
                  683,
                  630
                ],
                "to": [
                  687,
                  633
                ]
              },
              {
                "from": [
                  606,
                  657
                ],
                "to": [
                  624,
                  657
                ]
              }
            ],
            "opening": {
              "x": 656,
              "y": 645,
              "rx": 27,
              "ry": 5,
              "angle": -18
            }
          }
        ],
        "neck": {
          "extend": 30
        }
      }
    },
    {
      "id": "work-overall",
      "category": "body",
      "slot": "body",
      "name": {
        "ru": "Рабочая спецовка",
        "uz-Latn": "Ish kombinezoni",
        "uz-Cyrl": "Иш комбинезони",
        "en": "Work overalls"
      },
      "tip": {
        "ru": "Защищает одежду и кожу при работе.",
        "uz-Latn": "Ish paytida kiyim va terini himoya qiladi.",
        "uz-Cyrl": "Иш пайтида кийим ва терини ҳимоя қилади.",
        "en": "Protects clothing and skin while working."
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
      },
      "joints": {
        "cuffs": [
          {
            "pins": [
              {
                "from": [
                  174,
                  712
                ],
                "to": [
                  177,
                  722
                ]
              },
              {
                "from": [
                  239,
                  733
                ],
                "to": [
                  257,
                  746
                ]
              }
            ],
            "opening": {
              "x": 217,
              "y": 734,
              "rx": 35,
              "ry": 6,
              "angle": 17
            }
          },
          {
            "pins": [
              {
                "from": [
                  722,
                  712
                ],
                "to": [
                  719,
                  722
                ]
              },
              {
                "from": [
                  657,
                  733
                ],
                "to": [
                  639,
                  746
                ]
              }
            ],
            "opening": {
              "x": 679,
              "y": 734,
              "rx": 35,
              "ry": 6,
              "angle": -17
            }
          }
        ]
      }
    },
    {
      "id": "space-suit",
      "category": "body",
      "slot": "body",
      "name": {
        "ru": "Скафандр",
        "uz-Latn": "Skafandr",
        "uz-Cyrl": "Скафандр",
        "en": "Space suit"
      },
      "tip": {
        "ru": "Поддерживает безопасную среду в космосе.",
        "uz-Latn": "Kosmosda xavfsiz muhitni saqlaydi.",
        "uz-Cyrl": "Космосда хавфсиз муҳитни сақлайди.",
        "en": "Maintains a safe environment in space."
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
      },
      "joints": {
        "cuffs": [
          {
            "pins": [
              {
                "from": [
                  183,
                  726
                ],
                "to": [
                  177,
                  722
                ]
              },
              {
                "from": [
                  248,
                  744
                ],
                "to": [
                  257,
                  746
                ]
              }
            ],
            "opening": {
              "x": 217,
              "y": 734,
              "rx": 35,
              "ry": 6,
              "angle": 17
            }
          },
          {
            "pins": [
              {
                "from": [
                  713,
                  726
                ],
                "to": [
                  719,
                  722
                ]
              },
              {
                "from": [
                  648,
                  744
                ],
                "to": [
                  639,
                  746
                ]
              }
            ],
            "opening": {
              "x": 679,
              "y": 734,
              "rx": 35,
              "ry": 6,
              "angle": -17
            }
          }
        ],
        "neck": {
          "extend": 18,
          "opening": {
            "x": 448,
            "y": 430,
            "rx": 65,
            "ry": 18,
            "angle": 0,
            "entry": {
              "left": 368,
              "right": 528,
              "top": 350,
              "shoulder": 410
            }
          }
        }
      }
    },
    {
      "id": "nitrile-gloves",
      "category": "hands",
      "slot": "hands",
      "name": {
        "ru": "Нитриловые перчатки",
        "uz-Latn": "Nitril qo'lqoplar",
        "uz-Cyrl": "Нитрил қўлқоплар",
        "en": "Nitrile gloves"
      },
      "tip": {
        "ru": "Создают защитный барьер для рук.",
        "uz-Latn": "Qo'llar uchun himoya to'sig'ini yaratadi.",
        "uz-Cyrl": "Қўллар учун ҳимоя тўсиғини яратади.",
        "en": "Create a protective barrier for the hands."
      },
      "layer": "assets/game/wear/nitrile-gloves.webp",
      "z": 50,
      "gloveFit": {
        "opening": {
          "x": 226,
          "y": 670,
          "rx": 35,
          "ry": 5,
          "angle": 17
        }
      }
    },
    {
      "id": "rubber-gloves",
      "category": "hands",
      "slot": "hands",
      "name": {
        "ru": "Резиновые перчатки",
        "uz-Latn": "Rezina qo'lqoplar",
        "uz-Cyrl": "Резина қўлқоплар",
        "en": "Rubber gloves"
      },
      "tip": {
        "ru": "Защищают руки при работе с подходящими химикатами.",
        "uz-Latn": "Mos kimyoviy moddalar bilan ishlaganda qo'llarni himoya qiladi.",
        "uz-Cyrl": "Мос кимёвий моддалар билан ишлаганда қўлларни ҳимоя қилади.",
        "en": "Protect the hands when handling compatible chemicals."
      },
      "layer": "assets/game/wear/rubber-gloves.webp",
      "z": 50,
      "gloveFit": {
        "opening": {
          "x": 237,
          "y": 633,
          "rx": 44,
          "ry": 6,
          "angle": 17
        }
      }
    },
    {
      "id": "heat-gloves",
      "category": "hands",
      "slot": "hands",
      "name": {
        "ru": "Термостойкие перчатки",
        "uz-Latn": "Issiqqa chidamli qo'lqoplar",
        "uz-Cyrl": "Иссиққа чидамли қўлқоплар",
        "en": "Heat-resistant gloves"
      },
      "tip": {
        "ru": "Защищают руки от горячих предметов.",
        "uz-Latn": "Qo'llarni issiq buyumlardan himoya qiladi.",
        "uz-Cyrl": "Қўлларни иссиқ буюмлардан ҳимоя қилади.",
        "en": "Protect the hands from hot objects."
      },
      "layer": "assets/game/wear/heat-gloves.webp",
      "z": 50,
      "gloveFit": {
        "opening": {
          "x": 241,
          "y": 627,
          "rx": 55,
          "ry": 7,
          "angle": 17
        }
      }
    },
    {
      "id": "work-gloves",
      "category": "hands",
      "slot": "hands",
      "name": {
        "ru": "Рабочие перчатки",
        "uz-Latn": "Ish qo'lqoplari",
        "uz-Cyrl": "Иш қўлқоплари",
        "en": "Work gloves"
      },
      "tip": {
        "ru": "Защищают руки от механических повреждений.",
        "uz-Latn": "Qo'llarni mexanik shikastlanishlardan himoya qiladi.",
        "uz-Cyrl": "Қўлларни механик шикастланишлардан ҳимоя қилади.",
        "en": "Protect the hands from mechanical injuries."
      },
      "layer": "assets/game/wear/work-gloves.webp",
      "z": 50,
      "gloveFit": {
        "opening": {
          "x": 226,
          "y": 665,
          "rx": 41,
          "ry": 6,
          "angle": 17
        }
      }
    },
    {
      "id": "welding-gauntlets",
      "category": "hands",
      "slot": "hands",
      "name": {
        "ru": "Сварочные краги",
        "uz-Latn": "Payvandchi qo'lqoplari",
        "uz-Cyrl": "Пайвандчи қўлқоплари",
        "en": "Welding gauntlets"
      },
      "tip": {
        "ru": "Защищают кисти и запястья от искр.",
        "uz-Latn": "Qo'l va bilaklarni uchqunlardan himoya qiladi.",
        "uz-Cyrl": "Қўл ва билакларни учқунлардан ҳимоя қилади.",
        "en": "Protect the hands and wrists from sparks."
      },
      "layer": "assets/game/wear/welding-gauntlets.webp",
      "z": 50,
      "gloveFit": {
        "opening": {
          "x": 252,
          "y": 606,
          "rx": 55,
          "ry": 6,
          "angle": 17
        }
      }
    },
    {
      "id": "dielectric-gloves",
      "category": "hands",
      "slot": "hands",
      "name": {
        "ru": "Диэлектрические перчатки",
        "uz-Latn": "Dielektrik qo'lqoplar",
        "uz-Cyrl": "Диелектрик қўлқоплар",
        "en": "Insulating gloves"
      },
      "tip": {
        "ru": "Проверены на защиту от электрического тока.",
        "uz-Latn": "Elektr tokidan himoya qilishi tekshirilgan.",
        "uz-Cyrl": "Электр токидан ҳимоя қилиши текширилган.",
        "en": "Tested to protect against electric current."
      },
      "layer": "assets/game/wear/dielectric-gloves.webp",
      "z": 50,
      "gloveFit": {
        "opening": {
          "x": 245,
          "y": 618,
          "rx": 62,
          "ry": 7,
          "angle": 17
        }
      }
    },
    {
      "id": "bee-gloves",
      "category": "hands",
      "slot": "hands",
      "name": {
        "ru": "Перчатки пчеловода",
        "uz-Latn": "Asalarichi qo'lqoplari",
        "uz-Cyrl": "Асаларичи қўлқоплари",
        "en": "Beekeeper gloves"
      },
      "tip": {
        "ru": "Длинные манжеты закрывают руки от пчёл.",
        "uz-Latn": "Uzun manjetlar qo'llarni asalarilardan himoya qiladi.",
        "uz-Cyrl": "Узун манжетлар қўлларни асаларилардан ҳимоя қилади.",
        "en": "Long cuffs protect the arms from bees."
      },
      "layer": "assets/game/wear/bee-gloves.webp",
      "z": 50,
      "gloveFit": {
        "opening": {
          "x": 260,
          "y": 583,
          "rx": 56,
          "ry": 7,
          "angle": 17
        },
        "backRise": 20
      }
    },
    {
      "id": "space-gloves",
      "category": "hands",
      "slot": "hands",
      "name": {
        "ru": "Перчатки скафандра",
        "uz-Latn": "Skafandr qo'lqoplari",
        "uz-Cyrl": "Скафандр қўлқоплари",
        "en": "Space gloves"
      },
      "tip": {
        "ru": "Сохраняют герметичность защиты рук в космосе.",
        "uz-Latn": "Kosmosda qo'llar himoyasini havo o'tkazmaydigan holda saqlaydi.",
        "uz-Cyrl": "Космосда қўллар ҳимоясини ҳаво ўтказмайдиган ҳолда сақлайди.",
        "en": "Keep the hands sealed and protected in space."
      },
      "layer": "assets/game/wear/space-gloves.webp",
      "z": 50,
      "gloveFit": {
        "opening": {
          "x": 244,
          "y": 625,
          "rx": 60,
          "ry": 7,
          "angle": 17
        }
      }
    },
    {
      "id": "closed-shoes",
      "category": "feet",
      "slot": "feet",
      "name": {
        "ru": "Закрытая обувь",
        "uz-Latn": "Yopiq oyoq kiyim",
        "uz-Cyrl": "Ёпиқ оёқ кийим",
        "en": "Closed shoes"
      },
      "tip": {
        "ru": "Закрывает стопы в лаборатории.",
        "uz-Latn": "Laboratoriyada oyoq panjalarini yopadi.",
        "uz-Cyrl": "Лабораторияда оёқ панжаларини ёпади.",
        "en": "Cover the feet in the laboratory."
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
      },
      "footwear": {
        "mode": "covered",
        "openings": [
          {
            "x": 372,
            "y": 1024,
            "outer": 45,
            "ry": 13
          },
          {
            "x": 524,
            "y": 1024,
            "outer": 45,
            "ry": 13
          }
        ]
      }
    },
    {
      "id": "rubber-boots",
      "category": "feet",
      "slot": "feet",
      "name": {
        "ru": "Резиновые сапоги",
        "uz-Latn": "Rezina etiklar",
        "uz-Cyrl": "Резина этиклар",
        "en": "Rubber boots"
      },
      "tip": {
        "ru": "Защищают ноги от влаги и подходящих химикатов.",
        "uz-Latn": "Oyoqlarni namlik va mos kimyoviy moddalardan himoya qiladi.",
        "uz-Cyrl": "Оёқларни намлик ва мос кимёвий моддалардан ҳимоя қилади.",
        "en": "Protect the feet from moisture and compatible chemicals."
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
      },
      "footwear": {
        "mode": "tucked",
        "openings": [
          {
            "x": 365,
            "y": 940,
            "outer": 56,
            "ry": 11
          },
          {
            "x": 544,
            "y": 940,
            "outer": 56,
            "ry": 11
          }
        ]
      }
    },
    {
      "id": "shoe-covers",
      "category": "feet",
      "slot": "feet",
      "name": {
        "ru": "Бахилы",
        "uz-Latn": "Baxilalar",
        "uz-Cyrl": "Бахилалар",
        "en": "Shoe covers"
      },
      "tip": {
        "ru": "Помогают сохранять чистоту операционной.",
        "uz-Latn": "Operatsiya xonasini toza saqlashga yordam beradi.",
        "uz-Cyrl": "Операция хонасини тоза сақлашга ёрдам беради.",
        "en": "Help keep the operating room clean."
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
      },
      "footwear": {
        "mode": "covered",
        "openings": [
          {
            "x": 360,
            "y": 1028,
            "outer": 52,
            "ry": 11
          },
          {
            "x": 540,
            "y": 1028,
            "outer": 52,
            "ry": 11
          }
        ]
      }
    },
    {
      "id": "steel-boots",
      "category": "feet",
      "slot": "feet",
      "name": {
        "ru": "Ботинки со стальным носком",
        "uz-Latn": "Po'lat tumshuqli botinkalar",
        "uz-Cyrl": "Пўлат тумшуқли ботинкалар",
        "en": "Steel-toe boots"
      },
      "tip": {
        "ru": "Защищают пальцы ног от тяжёлых предметов.",
        "uz-Latn": "Oyoq barmoqlarini og'ir buyumlardan himoya qiladi.",
        "uz-Cyrl": "Оёқ бармоқларини оғир буюмлардан ҳимоя қилади.",
        "en": "Protect the toes from heavy objects."
      },
      "layer": "assets/game/wear/steel-boots.webp",
      "z": 40,
      "footwear": {
        "mode": "tucked",
        "openings": [
          {
            "x": 365,
            "y": 864,
            "outer": 63,
            "ry": 14
          },
          {
            "x": 533,
            "y": 864,
            "outer": 63,
            "ry": 14
          }
        ]
      }
    },
    {
      "id": "fire-boots",
      "category": "feet",
      "slot": "feet",
      "name": {
        "ru": "Пожарные сапоги",
        "uz-Latn": "O't o'chiruvchi etiklari",
        "uz-Cyrl": "Ўт ўчирувчи этиклари",
        "en": "Firefighter boots"
      },
      "tip": {
        "ru": "Защищают ноги от жара и опасных поверхностей.",
        "uz-Latn": "Oyoqlarni issiqlik va xavfli yuzalardan himoya qiladi.",
        "uz-Cyrl": "Оёқларни иссиқлик ва хавфли юзалардан ҳимоя қилади.",
        "en": "Protect the feet from heat and hazardous surfaces."
      },
      "layer": "assets/game/wear/fire-boots.webp",
      "z": 40,
      "footwear": {
        "mode": "tucked",
        "openings": [
          {
            "x": 364,
            "y": 895,
            "outer": 57,
            "ry": 14
          },
          {
            "x": 536,
            "y": 895,
            "outer": 57,
            "ry": 14
          }
        ]
      }
    },
    {
      "id": "dielectric-boots",
      "category": "feet",
      "slot": "feet",
      "name": {
        "ru": "Диэлектрические боты",
        "uz-Latn": "Dielektrik etiklar",
        "uz-Cyrl": "Диелектрик этиклар",
        "en": "Insulating boots"
      },
      "tip": {
        "ru": "Обеспечивают дополнительную защиту от тока.",
        "uz-Latn": "Elektr tokidan qo'shimcha himoya beradi.",
        "uz-Cyrl": "Электр токидан қўшимча ҳимоя беради.",
        "en": "Provide additional protection against electric current."
      },
      "layer": "assets/game/wear/dielectric-boots.webp",
      "z": 40,
      "footwear": {
        "mode": "tucked",
        "openings": [
          {
            "x": 362,
            "y": 863,
            "outer": 63,
            "ry": 14
          },
          {
            "x": 535,
            "y": 863,
            "outer": 63,
            "ry": 14
          }
        ]
      }
    },
    {
      "id": "chef-shoes",
      "category": "feet",
      "slot": "feet",
      "name": {
        "ru": "Нескользящая обувь",
        "uz-Latn": "Sirpanmaydigan oyoq kiyim",
        "uz-Cyrl": "Сирпанмайдиган оёқ кийим",
        "en": "Non-slip shoes"
      },
      "tip": {
        "ru": "Помогает не поскользнуться на кухне.",
        "uz-Latn": "Oshxonada sirpanib ketmaslikka yordam beradi.",
        "uz-Cyrl": "Ошхонада сирпаниб кетмасликка ёрдам беради.",
        "en": "Help prevent slipping in the kitchen."
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
      },
      "footwear": {
        "mode": "covered",
        "openings": [
          {
            "x": 372,
            "y": 1000,
            "outer": 53,
            "ry": 22
          },
          {
            "x": 525,
            "y": 1000,
            "outer": 53,
            "ry": 22
          }
        ]
      }
    },
    {
      "id": "space-boots",
      "category": "feet",
      "slot": "feet",
      "name": {
        "ru": "Ботинки скафандра",
        "uz-Latn": "Skafandr botinkalari",
        "uz-Cyrl": "Скафандр ботинкалари",
        "en": "Space boots"
      },
      "tip": {
        "ru": "Защищают ноги в составе скафандра.",
        "uz-Latn": "Skafandrning bir qismi sifatida oyoqlarni himoya qiladi.",
        "uz-Cyrl": "Скафандрнинг бир қисми сифатида оёқларни ҳимоя қилади.",
        "en": "Protect the feet as part of a space suit."
      },
      "layer": "assets/game/wear/space-boots.webp",
      "z": 40,
      "footwear": {
        "mode": "tucked",
        "openings": [
          {
            "x": 365,
            "y": 912,
            "outer": 62,
            "ry": 13
          },
          {
            "x": 532,
            "y": 912,
            "outer": 62,
            "ry": 13
          }
        ]
      }
    }
  ],
  "professions": [
    {
      "id": "chemist",
      "group": {
        "ru": "ХИМИЯ",
        "uz-Latn": "KIMYO",
        "uz-Cyrl": "КИМЁ",
        "en": "CHEMISTRY"
      },
      "name": {
        "ru": "Химик-лаборант",
        "uz-Latn": "Kimyogar-laborant",
        "uz-Cyrl": "Кимёгар-лаборант",
        "en": "Laboratory chemist"
      },
      "emoji": "🧪",
      "description": {
        "ru": "Безопасные опыты в лаборатории",
        "uz-Latn": "Laboratoriyada xavfsiz tajribalar",
        "uz-Cyrl": "Лабораторияда хавфсиз тажрибалар",
        "en": "Safe laboratory experiments"
      },
      "greeting": {
        "ru": "Защитим глаза, руки и одежду перед опытом!",
        "uz-Latn": "Tajribadan oldin ko'z, qo'l va kiyimni himoya qilamiz!",
        "uz-Cyrl": "Тажрибадан олдин кўз, қўл ва кийимни ҳимоя қиламиз!",
        "en": "Let's protect our eyes, hands and clothes before the experiment!"
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
        "ru": "ХИМИЯ",
        "uz-Latn": "KIMYO",
        "uz-Cyrl": "КИМЁ",
        "en": "CHEMISTRY"
      },
      "name": {
        "ru": "Работа с кислотами",
        "uz-Latn": "Kislotalar bilan ishlash",
        "uz-Cyrl": "Кислоталар билан ишлаш",
        "en": "Working with acids"
      },
      "emoji": "⚗️",
      "description": {
        "ru": "Защита от опасных брызг",
        "uz-Latn": "Xavfli sachrashlardan himoya",
        "uz-Cyrl": "Хавфли сачрашлардан ҳимоя",
        "en": "Protection from dangerous splashes"
      },
      "greeting": {
        "ru": "Кислоты могут брызнуть! Подберём двойную защиту лица и одежды!",
        "uz-Latn": "Kislotalar sachrashi mumkin! Yuz va kiyim uchun qo'shimcha himoya tanlaymiz!",
        "uz-Cyrl": "Кислоталар сачраши мумкин! Юз ва кийим учун қўшимча ҳимоя танлаймиз!",
        "en": "Acids can splash! Let's choose extra protection for the face and clothes!"
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
        "ru": "ХИМИЯ",
        "uz-Latn": "KIMYO",
        "uz-Cyrl": "КИМЁ",
        "en": "CHEMISTRY"
      },
      "name": {
        "ru": "Опыты с огнём",
        "uz-Latn": "Olov bilan tajribalar",
        "uz-Cyrl": "Олов билан тажрибалар",
        "en": "Experiments with fire"
      },
      "emoji": "🔥",
      "description": {
        "ru": "Защита при нагревании",
        "uz-Latn": "Qizdirish paytidagi himoya",
        "uz-Cyrl": "Қиздириш пайтидаги ҳимоя",
        "en": "Protection while heating"
      },
      "greeting": {
        "ru": "Будет горячо! Уберём волосы и защитим руки!",
        "uz-Latn": "Issiq bo'ladi! Sochni yig'ib, qo'llarni himoya qilamiz!",
        "uz-Cyrl": "Иссиқ бўлади! Сочни йиғиб, қўлларни ҳимоя қиламиз!",
        "en": "It will be hot! Let's tuck our hair away and protect our hands!"
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
        "ru": "ХИМИЯ",
        "uz-Latn": "KIMYO",
        "uz-Cyrl": "КИМЁ",
        "en": "CHEMISTRY"
      },
      "name": {
        "ru": "Работа с ядовитыми газами",
        "uz-Latn": "Zaharli gazlar bilan ishlash",
        "uz-Cyrl": "Заҳарли газлар билан ишлаш",
        "en": "Working with toxic gases"
      },
      "emoji": "🌫️",
      "description": {
        "ru": "Защита дыхания и тела",
        "uz-Latn": "Nafas yo'llari va tana himoyasi",
        "uz-Cyrl": "Нафас ёъллари ва тана ҳимояси",
        "en": "Protection for breathing and the body"
      },
      "greeting": {
        "ru": "Опасные газы невидимы! Подберём защиту дыхания и тела!",
        "uz-Latn": "Xavfli gazlar ko'rinmaydi! Nafas yo'llari va tanani himoya qilamiz!",
        "uz-Cyrl": "Хавфли газлар кўринмайди! Нафас ёъллари ва танани ҳимоя қиламиз!",
        "en": "Dangerous gases can be invisible! Let's protect our breathing and body!"
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
        "ru": "МЕДИЦИНА",
        "uz-Latn": "TIBBIYOT",
        "uz-Cyrl": "ТИББИЁТ",
        "en": "MEDICINE"
      },
      "name": {
        "ru": "Хирург",
        "uz-Latn": "Jarroh",
        "uz-Cyrl": "Жарроҳ",
        "en": "Surgeon"
      },
      "emoji": "🩺",
      "description": {
        "ru": "Чистота в операционной",
        "uz-Latn": "Operatsiya xonasidagi tozalik",
        "uz-Cyrl": "Операция хонасидаги тозалик",
        "en": "Cleanliness in the operating room"
      },
      "greeting": {
        "ru": "В операционной всё должно быть стерильно!",
        "uz-Latn": "Operatsiya xonasida hamma narsa steril bo'lishi kerak!",
        "uz-Cyrl": "Операция хонасида ҳамма нарса стерил бўлиши керак!",
        "en": "Everything in the operating room must be sterile!"
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
        "ru": "СПАСАТЕЛИ",
        "uz-Latn": "QUTQARUVCHILAR",
        "uz-Cyrl": "ҚУТҚАРУВЧИЛАР",
        "en": "RESCUE"
      },
      "name": {
        "ru": "Пожарный",
        "uz-Latn": "O't o'chiruvchi",
        "uz-Cyrl": "Ўт ўчирувчи",
        "en": "Firefighter"
      },
      "emoji": "🚒",
      "description": {
        "ru": "Защита от жара и дыма",
        "uz-Latn": "Issiqlik va tutundan himoya",
        "uz-Cyrl": "Иссиқлик ва тутундан ҳимоя",
        "en": "Protection from heat and smoke"
      },
      "greeting": {
        "ru": "Огонь горячий! Защити меня с головы до ног!",
        "uz-Latn": "Olov juda issiq! Meni boshdan oyoq himoya qil!",
        "uz-Cyrl": "Олов жуда иссиқ! Мени бошдан оёқ ҳимоя қил!",
        "en": "Fire is hot! Protect me from head to toe!"
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
        "ru": "РАБОЧИЕ",
        "uz-Latn": "ISHCHILAR",
        "uz-Cyrl": "ИШЧИЛАР",
        "en": "TRADES"
      },
      "name": {
        "ru": "Строитель",
        "uz-Latn": "Quruvchi",
        "uz-Cyrl": "Қурувчи",
        "en": "Builder"
      },
      "emoji": "🏗️",
      "description": {
        "ru": "Безопасность на стройке",
        "uz-Latn": "Qurilishdagi xavfsizlik",
        "uz-Cyrl": "Қурилишдаги хавфсизлик",
        "en": "Safety on a building site"
      },
      "greeting": {
        "ru": "На стройке важно быть заметной и защищённой!",
        "uz-Latn": "Qurilishda yaxshi ko'rinish va himoyalanish muhim!",
        "uz-Cyrl": "Қурилишда яхши кўриниш ва ҳимояланиш муҳим!",
        "en": "On a building site, I need to be visible and protected!"
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
        "ru": "РАБОЧИЕ",
        "uz-Latn": "ISHCHILAR",
        "uz-Cyrl": "ИШЧИЛАР",
        "en": "TRADES"
      },
      "name": {
        "ru": "Сварщик",
        "uz-Latn": "Payvandchi",
        "uz-Cyrl": "Пайвандчи",
        "en": "Welder"
      },
      "emoji": "✨",
      "description": {
        "ru": "Защита от дуги и искр",
        "uz-Latn": "Payvandlash yoyi va uchqunlardan himoya",
        "uz-Cyrl": "Пайвандлаш ёйи ва учқунлардан ҳимоя",
        "en": "Protection from the arc and sparks"
      },
      "greeting": {
        "ru": "Искры летят! Защитим лицо, руки и одежду!",
        "uz-Latn": "Uchqunlar uchyapti! Yuz, qo'l va kiyimni himoya qilamiz!",
        "uz-Cyrl": "Учқунлар учяпти! Юз, қўл ва кийимни ҳимоя қиламиз!",
        "en": "Sparks are flying! Let's protect our face, hands and clothes!"
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
        "ru": "РАБОЧИЕ",
        "uz-Latn": "ISHCHILAR",
        "uz-Cyrl": "ИШЧИЛАР",
        "en": "TRADES"
      },
      "name": {
        "ru": "Электрик",
        "uz-Latn": "Elektrchi",
        "uz-Cyrl": "Электрчи",
        "en": "Electrician"
      },
      "emoji": "⚡",
      "description": {
        "ru": "Специальная защита от тока",
        "uz-Latn": "Elektr tokidan maxsus himoya",
        "uz-Cyrl": "Электр токидан махсус ҳимоя",
        "en": "Special protection against electric current"
      },
      "greeting": {
        "ru": "Ток опасен! Нужна проверенная диэлектрическая защита!",
        "uz-Latn": "Elektr toki xavfli! Tekshirilgan dielektrik himoya kerak!",
        "uz-Cyrl": "Электр токи хавфли! Текширилган диелектрик ҳимоя керак!",
        "en": "Electric current is dangerous! We need tested insulating protection!"
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
        "ru": "РАБОЧИЕ",
        "uz-Latn": "ISHCHILAR",
        "uz-Cyrl": "ИШЧИЛАР",
        "en": "TRADES"
      },
      "name": {
        "ru": "Шахтёр",
        "uz-Latn": "Konchi",
        "uz-Cyrl": "Кончи",
        "en": "Miner"
      },
      "emoji": "⛏️",
      "description": {
        "ru": "Защита под землёй",
        "uz-Latn": "Yer ostidagi himoya",
        "uz-Cyrl": "Ер остидаги ҳимоя",
        "en": "Protection underground"
      },
      "greeting": {
        "ru": "Под землёй темно и пыльно. Подберём надёжную защиту!",
        "uz-Latn": "Yer osti qorong'i va chang. Ishonchli himoya tanlaymiz!",
        "uz-Cyrl": "Ер ости қоронғи ва чанг. Ишончли ҳимоя танлаймиз!",
        "en": "It is dark and dusty underground. Let's choose reliable protection!"
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
        "ru": "РАБОЧИЕ",
        "uz-Latn": "ISHCHILAR",
        "uz-Cyrl": "ИШЧИЛАР",
        "en": "TRADES"
      },
      "name": {
        "ru": "Повар",
        "uz-Latn": "Oshpaz",
        "uz-Cyrl": "Ошпаз",
        "en": "Cook"
      },
      "emoji": "👩‍🍳",
      "description": {
        "ru": "Чистота и защита от жара",
        "uz-Latn": "Tozalik va issiqlikdan himoya",
        "uz-Cyrl": "Тозалик ва иссиқликдан ҳимоя",
        "en": "Cleanliness and protection from heat"
      },
      "greeting": {
        "ru": "Приготовим вкусный обед! Защитимся от жара и скользкого пола!",
        "uz-Latn": "Mazali ovqat tayyorlaymiz! Issiqlik va sirpanchiq poldan himoyalanamiz!",
        "uz-Cyrl": "Мазали овқат тайёрлаймиз! Иссиқлик ва сирпанчиқ полдан ҳимояланамиз!",
        "en": "Let's cook a tasty meal! We need protection from heat and slippery floors!"
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
        "ru": "ОСОБЫЕ",
        "uz-Latn": "MAXSUS KASBLAR",
        "uz-Cyrl": "МАХСУС КАСБЛАР",
        "en": "SPECIAL JOBS"
      },
      "name": {
        "ru": "Пчеловод",
        "uz-Latn": "Asalarichi",
        "uz-Cyrl": "Асаларичи",
        "en": "Beekeeper"
      },
      "emoji": "🐝",
      "description": {
        "ru": "Защита от укусов",
        "uz-Latn": "Asalari chaqishidan himoya",
        "uz-Cyrl": "Асалари чақишидан ҳимоя",
        "en": "Protection from bee stings"
      },
      "greeting": {
        "ru": "Пчёлы любят мёд! Закроем все щёлочки в костюме!",
        "uz-Latn": "Asalarilar asalni yaxshi ko'radi! Kiyimdagi barcha tirqishlarni yopamiz!",
        "uz-Cyrl": "Асаларилар асални яхши кўради! Кийимдаги барча тирқишларни ёпамиз!",
        "en": "Bees love honey! Let's close every gap in the suit!"
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
        "ru": "ОСОБЫЕ",
        "uz-Latn": "MAXSUS KASBLAR",
        "uz-Cyrl": "МАХСУС КАСБЛАР",
        "en": "SPECIAL JOBS"
      },
      "name": {
        "ru": "Космонавт",
        "uz-Latn": "Kosmonavt",
        "uz-Cyrl": "Космонавт",
        "en": "Astronaut"
      },
      "emoji": "🚀",
      "description": {
        "ru": "Полный комплект для космоса",
        "uz-Latn": "Kosmos uchun to'liq himoya",
        "uz-Cyrl": "Космос учун тўлиқ ҳимоя",
        "en": "A complete kit for space"
      },
      "greeting": {
        "ru": "В космосе нет воздуха, нужен полный скафандр!",
        "uz-Latn": "Kosmosda havo yo'q, to'liq skafandr kerak!",
        "uz-Cyrl": "Космосда ҳаво ёъқ, тўлиқ скафандр керак!",
        "en": "There is no air in space. We need a complete space suit!"
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
      "ru": "Гардероб безопасности",
      "uz-Latn": "Xavfsizlik garderobi",
      "uz-Cyrl": "Хавфсизлик гардероби",
      "en": "Safety wardrobe"
    },
    "wardrobe": {
      "ru": "Гардероб",
      "uz-Latn": "Garderob",
      "uz-Cyrl": "Гардероб",
      "en": "Wardrobe"
    },
    "play": {
      "ru": "Играть",
      "uz-Latn": "O'ynash",
      "uz-Cyrl": "Ўйнаш",
      "en": "Play"
    },
    "professions": {
      "ru": "Профессии",
      "uz-Latn": "Kasblar",
      "uz-Cyrl": "Касблар",
      "en": "Professions"
    },
    "progress": {
      "ru": "Пройдено профессий: {n} / 13",
      "uz-Latn": "Bajarilgan kasblar: {n} / 13",
      "uz-Cyrl": "Бажарилган касблар: {n} / 13",
      "en": "Professions completed: {n} / 13"
    },
    "worn": {
      "ru": "Надето",
      "uz-Latn": "Kiyilgan buyumlar",
      "uz-Cyrl": "Кийилган буюмлар",
      "en": "Worn items"
    },
    "choose": {
      "ru": "Выбери: {name}",
      "uz-Latn": "Tanla: {name}",
      "uz-Cyrl": "Танла: {name}",
      "en": "Choose: {name}"
    },
    "done": {
      "ru": "Готово",
      "uz-Latn": "Tayyor",
      "uz-Cyrl": "Тайёр",
      "en": "Done"
    },
    "hint": {
      "ru": "Подсказка",
      "uz-Latn": "Maslahat",
      "uz-Cyrl": "Маслаҳат",
      "en": "Hint"
    },
    "exit": {
      "ru": "Выйти",
      "uz-Latn": "Chiqish",
      "uz-Cyrl": "Чиқиш",
      "en": "Exit"
    },
    "close": {
      "ru": "Закрыть",
      "uz-Latn": "Yopish",
      "uz-Cyrl": "Ёпиш",
      "en": "Close"
    },
    "left": {
      "ru": "Повернуть влево",
      "uz-Latn": "Chapga burish",
      "uz-Cyrl": "Чапга буриш",
      "en": "Turn left"
    },
    "right": {
      "ru": "Повернуть вправо",
      "uz-Latn": "O'ngga burish",
      "uz-Cyrl": "Ўнгга буриш",
      "en": "Turn right"
    },
    "reset": {
      "ru": "Сбросить всё",
      "uz-Latn": "Hammasini yechish",
      "uz-Cyrl": "Ҳаммасини ечиш",
      "en": "Reset outfit"
    },
    "help": {
      "ru": "Категории: {categories}. Выбирай защиту по категориям. В каждой категории можно надеть один предмет: новый заменит прежний. Повторный клик снимает предмет. Q / E переключают категории. В профессии собери весь комплект и нажми «Готово».",
      "uz-Latn": "Toifalar: {categories}. Himoya vositalarini toifalar bo'yicha tanla. Har bir toifadan bitta buyum kiyish mumkin: yangisi eskisini almashtiradi. Yana bossang, buyum yechiladi. Q / E toifalarni almashtiradi. Kasb uchun to'liq kiyim to'plamini yig'ib, «Tayyor»ni bos.",
      "uz-Cyrl": "Тоифалар: {categories}. Ҳимоя воситаларини тоифалар бўйича танла. Ҳар бир тоифадан битта буюм кийиш мумкин: янгиси эскисини алмаштиради. Яна боссанг, буюм ечилади. Q / E тоифаларни алмаштиради. Касб учун тўлиқ кийим тўпламини йиғиб, «Тайёр»ни бос.",
      "en": "Categories: {categories}. Choose protection by category. You can wear one item in each category: a new one replaces the previous item. Click again to remove it. Q / E switch categories. For a profession, collect the complete kit and press Done."
    },
    "free": {
      "ru": "Классный образ! А теперь попробуй профессию!",
      "uz-Latn": "Zo'r ko'rinish! Endi biror kasbni sinab ko'r!",
      "uz-Cyrl": "Зўр кўриниш! Энди бирор касбни синаб кўр!",
      "en": "Great outfit! Now try a profession!"
    },
    "freeIntro": {
      "ru": "Собери свой образ или выбери профессию!",
      "uz-Latn": "O'z qiyofangni yarat yoki kasb tanla!",
      "uz-Cyrl": "Ўз қиёфангни ярат ёки касб танла!",
      "en": "Create your own outfit or choose a profession!"
    },
    "great": {
      "ru": "Ты супер! 🎉",
      "uz-Latn": "Sen zo'rsan! 🎉",
      "uz-Cyrl": "Сен зўрсан! 🎉",
      "en": "You are amazing! 🎉"
    },
    "ready": {
      "ru": "Я готова к работе! Я полностью защищена!",
      "uz-Latn": "Men ishga tayyorman! Men to'liq himoyalanganman!",
      "uz-Cyrl": "Мен ишга тайёрман! Мен тўлиқ ҳимояланганман!",
      "en": "I am ready for work! I am fully protected!"
    },
    "another": {
      "ru": "Другая профессия",
      "uz-Latn": "Boshqa kasb",
      "uz-Cyrl": "Бошқа касб",
      "en": "Another profession"
    },
    "master": {
      "ru": "Мастер безопасности 🏆",
      "uz-Latn": "Xavfsizlik ustasi 🏆",
      "uz-Cyrl": "Хавфсизлик устаси 🏆",
      "en": "Safety master 🏆"
    },
    "change": {
      "ru": "Сменить профессию? Текущий комплект будет сброшен.",
      "uz-Latn": "Kasbni almashtirasanmi? Hozirgi kiyim to'plami yechiladi.",
      "uz-Cyrl": "Касбни алмаштирасанми? Ҳозирги кийим тўплами ечилади.",
      "en": "Change profession? Your current outfit will be cleared."
    },
    "yes": {
      "ru": "Сменить",
      "uz-Latn": "Almashtirish",
      "uz-Cyrl": "Алмаштириш",
      "en": "Change"
    },
    "cancel": {
      "ru": "Отмена",
      "uz-Latn": "Bekor qilish",
      "uz-Cyrl": "Бекор қилиш",
      "en": "Cancel"
    },
    "missing": {
      "ru": "Ещё немного! Подбери защиту для категории «{name}».",
      "uz-Latn": "Yana ozgina qoldi! «{name}» toifasi uchun himoya tanla.",
      "uz-Cyrl": "Яна озгина қолди! «{name}» тоифаси учун ҳимоя танла.",
      "en": "Almost there! Choose protection for the {name} category."
    },
    "wrong": {
      "ru": "Для этой работы нужна другая защита. Посмотри категорию «{name}».",
      "uz-Latn": "Bu ish uchun boshqa himoya kerak. «{name}» toifasini tekshir.",
      "uz-Cyrl": "Бу иш учун бошқа ҳимоя керак. «{name}» тоифасини текшир.",
      "en": "This job needs different protection. Check the {name} category."
    },
    "already": {
      "ru": "Награда за эту профессию уже получена",
      "uz-Latn": "Bu kasb uchun mukofot allaqachon olingan",
      "uz-Cyrl": "Бу касб учун мукофот аллақачон олинган",
      "en": "You have already earned the reward for this profession"
    },
    "praise": {
      "ru": "Отлично!|Верно!|Молодец!|Так держать!",
      "uz-Latn": "Ajoyib!|To'g'ri!|Barakalla!|Shunday davom et!",
      "uz-Cyrl": "Ажойиб!|Тўғри!|Баракалла!|Шундай давом эт!",
      "en": "Excellent!|Correct!|Well done!|Keep it up!"
    },
    "reward": {
      "ru": "+{n} XP",
      "uz-Latn": "+{n} XP",
      "uz-Cyrl": "+{n} XP",
      "en": "+{n} XP"
    },
    "stars": {
      "ru": "Звёзды: {n} из 3",
      "uz-Latn": "Yulduzlar: {n} / 3",
      "uz-Cyrl": "Юлдузлар: {n} / 3",
      "en": "Stars: {n} out of 3"
    },
    "instructions": {
      "ru": "Как играть",
      "uz-Latn": "Qanday o'ynash kerak",
      "uz-Cyrl": "Қандай ўйнаш керак",
      "en": "How to play"
    },
    "complete": {
      "ru": "Надето {n} / {total}",
      "uz-Latn": "Kiyildi: {n} / {total}",
      "uz-Cyrl": "Кийилди: {n} / {total}",
      "en": "Equipped: {n} / {total}"
    },
    "chooseProfession": {
      "ru": "Выбери профессию",
      "uz-Latn": "Kasb tanla",
      "uz-Cyrl": "Касб танла",
      "en": "Choose a profession"
    },
    "back": {
      "ru": "На старт",
      "uz-Latn": "Boshlanishiga",
      "uz-Cyrl": "Бошланишига",
      "en": "Back to start"
    },
    "bonus": {
      "ru": "Бонус за все 13 профессий: +100 XP",
      "uz-Latn": "Barcha 13 kasb uchun bonus: +100 XP",
      "uz-Cyrl": "Барча 13 касб учун бонус: +100 XP",
      "en": "Bonus for all 13 professions: +100 XP"
    },
    "fallback": {
      "ru": "Защита готова!",
      "uz-Latn": "Himoya tayyor!",
      "uz-Cyrl": "Ҳимоя тайёр!",
      "en": "Protection is ready!"
    },
    "acids:goggles": {
      "ru": "Брызги кислоты могут попасть сбоку, нужны закрытые очки-маска!",
      "uz-Latn": "Kislota yon tomondan sachrashi mumkin. Yopiq himoya ko'zoynagi kerak!",
      "uz-Cyrl": "Кислота ён томондан сачраши мумкин. Ёпиқ ҳимоя кўзойнаги керак!",
      "en": "Acid can splash from the side. You need sealed goggles!"
    },
    "gases:medical-mask": {
      "ru": "Медицинская маска не защитит от ядовитых газов, нужен респиратор!",
      "uz-Latn": "Tibbiy niqob zaharli gazlardan himoya qilmaydi. Respirator kerak!",
      "uz-Cyrl": "Тиббий ниқоб заҳарли газлардан ҳимоя қилмайди. Респиратор керак!",
      "en": "A medical mask cannot protect against toxic gases. You need a respirator!"
    },
    "welder:goggles": {
      "ru": "Сварка слишком яркая, нужна сварочная маска!",
      "uz-Latn": "Payvandlash juda yorqin. Payvandlash niqobi kerak!",
      "uz-Cyrl": "Пайвандлаш жуда ёрқин. Пайвандлаш ниқоби керак!",
      "en": "Welding is too bright. You need a welding helmet!"
    },
    "beekeeper:work-gloves": {
      "ru": "Пчёлы найдут щёлочку, нужны длинные перчатки пчеловода!",
      "uz-Latn": "Asalarilar tirqish topadi. Uzun asalarichi qo'lqoplari kerak!",
      "uz-Cyrl": "Асаларилар тирқиш топади. Узун асаларичи қўлқоплари керак!",
      "en": "Bees can find a gap. You need long beekeeper gloves!"
    },
    "electrician:rubber-gloves": {
      "ru": "Нужны специальные диэлектрические перчатки, они проверены на защиту от тока!",
      "uz-Latn": "Elektr tokidan himoyasi tekshirilgan maxsus dielektrik qo'lqoplar kerak!",
      "uz-Cyrl": "Электр токидан ҳимояси текширилган махсус диелектрик қўлқоплар керак!",
      "en": "You need special insulating gloves tested for protection against electric current!"
    },
    "electrician:nitrile-gloves": {
      "ru": "Нужны специальные диэлектрические перчатки, они проверены на защиту от тока!",
      "uz-Latn": "Elektr tokidan himoyasi tekshirilgan maxsus dielektrik qo'lqoplar kerak!",
      "uz-Cyrl": "Электр токидан ҳимояси текширилган махсус диелектрик қўлқоплар керак!",
      "en": "You need special insulating gloves tested for protection against electric current!"
    },
    "firefighter:medical-mask": {
      "ru": "Маска не спасёт от дыма, нужен дыхательный аппарат!",
      "uz-Latn": "Niqob tutundan saqlamaydi. Nafas olish apparati kerak!",
      "uz-Cyrl": "Ниқоб тутундан сақламайди. Нафас олиш аппарати керак!",
      "en": "A mask cannot protect against smoke. You need breathing apparatus!"
    },
    "firefighter:respirator": {
      "ru": "Маска не спасёт от дыма, нужен дыхательный аппарат!",
      "uz-Latn": "Niqob tutundan saqlamaydi. Nafas olish apparati kerak!",
      "uz-Cyrl": "Ниқоб тутундан сақламайди. Нафас олиш аппарати керак!",
      "en": "A mask cannot protect against smoke. You need breathing apparatus!"
    },
    "calibration": {
      "ru": "Калибровка",
      "uz-Latn": "Kalibrlash",
      "en": "Calibration",
      "uz-Cyrl": "Калибрлаш"
    },
    "calibrationHint": {
      "ru": "Настраиваются только запасные иконки без готового слоя. Перетаскивай, колёсиком меняй размер, [ и ] — поворот.",
      "uz-Latn": "Faqat tayyor qatlami yo'q zaxira belgilar sozlanadi. Sudra, g'ildirak bilan o'lchamini, [ va ] bilan burchagini o'zgartir.",
      "en": "Only fallback icons without a full layer can be adjusted. Drag to move, use the wheel to resize, and [ or ] to rotate.",
      "uz-Cyrl": "Фақат тайёр қатлами ёъқ захира белгилар созланади. Судра, ғилдирак билан ўлчамини, [ ва ] билан бурчагини ўзгартир."
    },
    "copySettings": {
      "ru": "Скопировать настройки",
      "uz-Latn": "Sozlamalarni nusxalash",
      "en": "Copy settings",
      "uz-Cyrl": "Созламаларни нусхалаш"
    },
    "copied": {
      "ru": "JSON скопирован",
      "uz-Latn": "JSON nusxalandi",
      "en": "JSON copied",
      "uz-Cyrl": "JSON нусхаланди"
    },
    "copyFallback": {
      "ru": "Выдели JSON и скопируй вручную",
      "uz-Latn": "JSON matnini tanlab, qo'lda nusxala",
      "en": "Select the JSON and copy it manually",
      "uz-Cyrl": "JSON матнини танлаб, қўлда нусхала"
    },
    "calibrationSelect": {
      "ru": "Надень предмет без готового слоя и выбери его на лягушке",
      "uz-Latn": "Tayyor qatlami yo'q buyumni kiydir va uni qurbaqada tanla",
      "en": "Equip an item without a full layer and select it on the frog",
      "uz-Cyrl": "Тайёр қатлами ёъқ буюмни кийдир ва уни қурбақада танла"
    },
    "frogAlt": {
      "ru": "Лягушонок в футболке, без защитной одежды",
      "uz-Latn": "Himoya kiyimisiz, futbolka kiygan qurbaqa",
      "en": "Frog in a T-shirt without protective clothing",
      "uz-Cyrl": "Ҳимоя кийимисиз, футболка кийган қурбақа"
    },
    "collapseCalibration": {
      "ru": "Свернуть калибровку",
      "uz-Latn": "Kalibrlashni yig'ish",
      "en": "Collapse calibration",
      "uz-Cyrl": "Калибрлашни йиғиш"
    },
    "expandCalibration": {
      "ru": "Настроить запасные иконки",
      "uz-Latn": "Zaxira belgilarini sozlash",
      "en": "Adjust fallback icons",
      "uz-Cyrl": "Захира белгиларини созлаш"
    },
    "showFrames": {
      "ru": "Показать рамки",
      "uz-Latn": "Chegaralarni ko'rsatish",
      "en": "Show outlines",
      "uz-Cyrl": "Чегараларни кўрсатиш"
    },
    "hideFrames": {
      "ru": "Скрыть рамки",
      "uz-Latn": "Chegaralarni yashirish",
      "en": "Hide outlines",
      "uz-Cyrl": "Чегараларни яшириш"
    },
    "professionProgress": {
      "ru": "Пройдено: {n} / 13",
      "uz-Latn": "Bajarildi: {n} / 13",
      "en": "Completed: {n} / 13",
      "uz-Cyrl": "Бажарилди: {n} / 13"
    },
    "professionCompleted": {
      "ru": "Профессия пройдена",
      "uz-Latn": "Kasb bajarildi",
      "en": "Profession completed",
      "uz-Cyrl": "Касб бажарилди"
    },
    "stickerAlt": {
      "ru": "Лягушка в лабораторном халате",
      "uz-Latn": "Laboratoriya xalatidagi qurbaqa",
      "uz-Cyrl": "Лаборатория халатидаги қурбақа",
      "en": "Frog in a lab coat"
    },
    "settingsJSON": {
      "ru": "Настройки запасных иконок, JSON",
      "uz-Latn": "Zaxira belgilar sozlamalari, JSON",
      "uz-Cyrl": "Захира белгилар созламалари, JSON",
      "en": "Fallback icon settings, JSON"
    },
    "partLeft": {
      "ru": "Левая сторона",
      "uz-Latn": "Chap tomon",
      "uz-Cyrl": "Чап томон",
      "en": "Left side"
    },
    "partRight": {
      "ru": "Правая сторона",
      "uz-Latn": "O'ng tomon",
      "uz-Cyrl": "Ўнг томон",
      "en": "Right side"
    },
    "partIcon": {
      "ru": "Значок",
      "uz-Latn": "Belgi",
      "uz-Cyrl": "Белги",
      "en": "Icon"
    },
    "calibrationCoordinates": {
      "ru": "{name} · {part}: x {x} · y {y} · w {w} · {rotate}°",
      "uz-Latn": "{name} · {part}: x {x} · y {y} · w {w} · {rotate}°",
      "uz-Cyrl": "{name} · {part}: х {x} · й {y} · w {w} · {rotate}°",
      "en": "{name} · {part}: x {x} · y {y} · w {w} · {rotate}°"
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
