/* Self-assembly data, ordered evidence, scoring and resumable attempts. */
const Practical12AssemblyData=(()=>{const content={
  "items": [
    {
      "id": "stand",
      "name": {
        "ru": "Штатив",
        "en": "Retort stand",
        "uz-Latn": "Shtativ",
        "uz-Cyrl": "Штатив"
      },
      "model": "stand-base",
      "needed": true
    },
    {
      "id": "clamp",
      "name": {
        "ru": "Муфта с лапкой",
        "en": "Bosshead and clamp",
        "uz-Latn": "Mufta va qisqich",
        "uz-Cyrl": "Муфта ва қисқич"
      },
      "model": "clamp",
      "needed": true
    },
    {
      "id": "burner",
      "name": {
        "ru": "Газовая горелка",
        "en": "Gas burner",
        "uz-Latn": "Gaz gorelkasi",
        "uz-Cyrl": "Газ горелкаси"
      },
      "model": "burner",
      "needed": true
    },
    {
      "id": "tripod",
      "name": {
        "ru": "Треножник",
        "en": "Tripod",
        "uz-Latn": "Uchoyoq",
        "uz-Cyrl": "Учоёқ"
      },
      "model": "tripod",
      "needed": true
    },
    {
      "id": "gauze",
      "name": {
        "ru": "Проволочная сетка",
        "en": "Wire gauze",
        "uz-Latn": "Sim to‘r",
        "uz-Cyrl": "Сим тўр"
      },
      "model": "gauze",
      "needed": true
    },
    {
      "id": "beaker",
      "name": {
        "ru": "Химический стакан",
        "en": "Beaker",
        "uz-Latn": "Kimyoviy stakan",
        "uz-Cyrl": "Кимёвий стакан"
      },
      "model": "beaker",
      "needed": true
    },
    {
      "id": "tube",
      "name": {
        "ru": "Термостойкая пробирка",
        "en": "Heat-resistant test tube",
        "uz-Latn": "Issiqqa chidamli probirka",
        "uz-Cyrl": "Иссиққа чидамли пробирка"
      },
      "model": "tube",
      "needed": true
    },
    {
      "id": "thermometer",
      "name": {
        "ru": "Термометр",
        "en": "Thermometer",
        "uz-Latn": "Termometr",
        "uz-Cyrl": "Термометр"
      },
      "model": "thermometer",
      "needed": true
    },
    {
      "id": "water-bottle",
      "name": {
        "ru": "Склянка с водой",
        "en": "Water bottle",
        "uz-Latn": "Suvli shisha",
        "uz-Cyrl": "Сувли шиша"
      },
      "model": "water-bottle",
      "needed": true
    },
    {
      "id": "alcohol-bottle",
      "name": {
        "ru": "Склянка со спиртом",
        "en": "Alcohol bottle",
        "uz-Latn": "Spirtli shisha",
        "uz-Cyrl": "Спиртли шиша"
      },
      "model": "alcohol-bottle",
      "needed": true
    },
    {
      "id": "flask",
      "name": {
        "ru": "Коническая колба",
        "en": "Conical flask",
        "uz-Latn": "Konussimon kolba",
        "uz-Cyrl": "Конуссимон колба"
      },
      "model": "conical-flask",
      "needed": false,
      "why": {
        "ru": "Колба нужна для смешивания растворов. Для этой водяной бани нужен стакан.",
        "en": "A flask is used for mixing solutions. This water bath needs a beaker.",
        "uz-Latn": "Kolba eritmalarni aralashtirish uchun kerak. Bu suv hammomi uchun stakan kerak.",
        "uz-Cyrl": "Колба эритмаларни аралаштириш учун керак. Бу сув ҳаммоми учун стакан керак."
      }
    },
    {
      "id": "funnel",
      "name": {
        "ru": "Воронка",
        "en": "Funnel",
        "uz-Latn": "Voronka",
        "uz-Cyrl": "Воронка"
      },
      "model": "funnel",
      "needed": false,
      "why": {
        "ru": "Воронка нужна для переливания и фильтрования. В этой водяной бане она не нужна.",
        "en": "A funnel is for pouring and filtering. It is not needed in this water bath.",
        "uz-Latn": "Voronka quyish va filtrlash uchun kerak. Bu suv hammomida u kerak emas.",
        "uz-Cyrl": "Воронка қуйиш ва фильтрлаш учун керак. Бу сув ҳаммомида у керак эмас."
      }
    },
    {
      "id": "cylinder",
      "name": {
        "ru": "Мерный цилиндр",
        "en": "Measuring cylinder",
        "uz-Latn": "O‘lchov silindri",
        "uz-Cyrl": "Ўлчов цилиндри"
      },
      "model": "measuring-cylinder",
      "needed": false,
      "why": {
        "ru": "Цилиндр измеряет объём жидкости. Нагревать его нельзя.",
        "en": "A measuring cylinder measures liquid volume. It must not be heated.",
        "uz-Latn": "Silindr suyuqlik hajmini o‘lchaydi. Uni isitish mumkin emas.",
        "uz-Cyrl": "Цилиндр суюқлик ҳажмини ўлчайди. Уни иситиш мумкин эмас."
      }
    },
    {
      "id": "dish",
      "name": {
        "ru": "Выпарительная чашка",
        "en": "Evaporating dish",
        "uz-Latn": "Bug‘latish kosachasi",
        "uz-Cyrl": "Буғлатиш косачаси"
      },
      "model": "evaporating-dish",
      "needed": false,
      "why": {
        "ru": "Чашка нужна для выпаривания растворов, а здесь мы нагреваем спирт в водяной бане.",
        "en": "A dish evaporates solutions. Here alcohol is heated in a water bath.",
        "uz-Latn": "Kosacha eritmalarni bug‘latadi. Bu yerda spirt suv hammomida isitiladi.",
        "uz-Cyrl": "Косача эритмаларни буғлатади. Бу ерда спирт сув ҳаммомида иситилади."
      }
    },
    {
      "id": "spirit-lamp",
      "name": {
        "ru": "Спиртовка",
        "en": "Spirit lamp",
        "uz-Latn": "Spirt lampasi",
        "uz-Cyrl": "Спирт лампаси"
      },
      "model": "spirit-lamp",
      "needed": false,
      "why": {
        "ru": "Спиртовка тоже нагревает, но в этой установке используется газовая горелка.",
        "en": "A spirit lamp also heats, but this apparatus uses a gas burner.",
        "uz-Latn": "Spirt lampasi ham isitadi, ammo bu qurilmada gaz gorelkasi ishlatiladi.",
        "uz-Cyrl": "Спирт лампаси ҳам иситади, аммо бу қурилмада газ горелкаси ишлатилади."
      }
    },
    {
      "id": "holder",
      "name": {
        "ru": "Пробиркодержатель",
        "en": "Test-tube holder",
        "uz-Latn": "Probirka tutqichi",
        "uz-Cyrl": "Пробирка тутқичи"
      },
      "model": "tube-holder",
      "needed": false,
      "why": {
        "ru": "Держатель нужен для нагревания пробирки в руке. Здесь её закрепляет лапка штатива.",
        "en": "A holder is for hand-held heating. Here the stand clamp holds the tube.",
        "uz-Latn": "Tutqich probirkani qo‘lda isitish uchun kerak. Bu yerda uni shtativ qisqichi ushlab turadi.",
        "uz-Cyrl": "Тутқич пробиркани қўлда иситиш учун керак. Бу ерда уни штатив қисқичи ушлаб туради."
      }
    },
    {
      "id": "tongs",
      "name": {
        "ru": "Тигельные щипцы",
        "en": "Crucible tongs",
        "uz-Latn": "Tigel qisqichi",
        "uz-Cyrl": "Тигель қисқичи"
      },
      "model": "crucible-tongs",
      "needed": false,
      "why": {
        "ru": "Щипцами берут горячие тигли. В этой установке тигля нет.",
        "en": "Tongs hold hot crucibles. This apparatus has no crucible.",
        "uz-Latn": "Qisqich bilan issiq tigel olinadi. Bu qurilmada tigel yo‘q.",
        "uz-Cyrl": "Қисқич билан иссиқ тигель олинади. Бу қурилмада тигель йўқ."
      }
    },
    {
      "id": "mortar",
      "name": {
        "ru": "Ступка с пестиком",
        "en": "Mortar and pestle",
        "uz-Latn": "Hovoncha va dastak",
        "uz-Cyrl": "Ҳовонча ва дастак"
      },
      "model": "mortar",
      "needed": false,
      "why": {
        "ru": "Ступка измельчает твёрдые вещества. Для нагревания жидкостей она не нужна.",
        "en": "A mortar grinds solids. It is not used for heating liquids.",
        "uz-Latn": "Hovoncha qattiq moddalarni maydalaydi. Suyuqlikni isitish uchun u kerak emas.",
        "uz-Cyrl": "Ҳовонча қаттиқ моддаларни майдалайди. Суюқликни иситиш учун у керак эмас."
      }
    }
  ],
  "steps": [
    {
      "id": "stand",
      "part": "stand",
      "action": "place",
      "text": {
        "ru": "Поставь штатив на стол.",
        "en": "Put the stand on the table.",
        "uz-Latn": "Shtativni stolga qo‘y.",
        "uz-Cyrl": "Штативни столга қўй."
      }
    },
    {
      "id": "burner",
      "part": "burner",
      "action": "place",
      "text": {
        "ru": "Поставь газовую горелку на основание штатива.",
        "en": "Place the gas burner on the stand base.",
        "uz-Latn": "Gaz gorelkasini shtativ tagligiga qo‘y.",
        "uz-Cyrl": "Газ горелкасини штатив таглигига қўй."
      }
    },
    {
      "id": "tripod",
      "part": "tripod",
      "action": "place",
      "text": {
        "ru": "Поставь треножник над горелкой.",
        "en": "Place the tripod over the burner.",
        "uz-Latn": "Uchoyoqni gorelka ustiga qo‘y.",
        "uz-Cyrl": "Учоёқни горелка устига қўй."
      }
    },
    {
      "id": "gauze",
      "part": "gauze",
      "action": "place",
      "text": {
        "ru": "Положи проволочную сетку на треножник.",
        "en": "Put the wire gauze on the tripod.",
        "uz-Latn": "Sim to‘rni uchoyoqqa qo‘y.",
        "uz-Cyrl": "Сим тўрни учоёққа қўй."
      }
    },
    {
      "id": "beaker",
      "part": "beaker",
      "action": "place",
      "text": {
        "ru": "Поставь стакан на сетку.",
        "en": "Put the beaker on the gauze.",
        "uz-Latn": "Stakanni to‘rga qo‘y.",
        "uz-Cyrl": "Стаканни тўрга қўй."
      }
    },
    {
      "id": "water",
      "part": "water-bottle",
      "action": "pour",
      "text": {
        "ru": "Налей воду в стакан.",
        "en": "Pour water into the beaker.",
        "uz-Latn": "Stakanga suv quy.",
        "uz-Cyrl": "Стаканга сув қуй."
      }
    },
    {
      "id": "clamp",
      "part": "clamp",
      "action": "place",
      "text": {
        "ru": "Закрепи муфту с лапкой на стержне штатива.",
        "en": "Attach the bosshead and clamp to the stand rod.",
        "uz-Latn": "Mufta va qisqichni shtativ ustuniga mahkamla.",
        "uz-Cyrl": "Муфта ва қисқични штатив устунига маҳкамла."
      }
    },
    {
      "id": "tube",
      "part": "tube",
      "action": "lower",
      "text": {
        "ru": "Вставь пробирку в лапку и опусти её в воду.",
        "en": "Insert the tube into the clamp and lower it into the water.",
        "uz-Latn": "Probirkani qisqichga qo‘yib, suvga tushir.",
        "uz-Cyrl": "Пробиркани қисқичга қўйиб, сувга тушир."
      }
    },
    {
      "id": "alcohol",
      "part": "alcohol-bottle",
      "action": "pour",
      "text": {
        "ru": "Налей спирт в пробирку.",
        "en": "Pour alcohol into the test tube.",
        "uz-Latn": "Probirkaga spirt quy.",
        "uz-Cyrl": "Пробиркага спирт қуй."
      }
    },
    {
      "id": "thermometer",
      "part": "thermometer",
      "action": "place",
      "text": {
        "ru": "Вставь термометр в пробирку.",
        "en": "Insert the thermometer into the test tube.",
        "uz-Latn": "Termometrni probirkaga kirit.",
        "uz-Cyrl": "Термометрни пробиркага кирит."
      }
    },
    {
      "id": "ignite",
      "part": "match",
      "action": "ignite",
      "text": {
        "ru": "Открой вентиль, затем поднеси спичку к горелке.",
        "en": "Open the valve, then bring the match to the burner.",
        "uz-Latn": "Ventilni och, keyin gugurtni gorelkaga yaqinlashtir.",
        "uz-Cyrl": "Вентильни оч, кейин гугуртни горелкага яқинлаштир."
      }
    }
  ],
  "copy": {
    "study": {
      "ru": "🔍 Изучить установку",
      "en": "🔍 Explore apparatus",
      "uz-Latn": "🔍 Qurilmani o‘rganish",
      "uz-Cyrl": "🔍 Қурилмани ўрганиш"
    },
    "build": {
      "ru": "🧩 Собрать установку",
      "en": "🧩 Build apparatus",
      "uz-Latn": "🧩 Qurilmani yig‘ish",
      "uz-Cyrl": "🧩 Қурилмани йиғиш"
    },
    "locked": {
      "ru": "Сначала изучи детали",
      "en": "Study the parts first",
      "uz-Latn": "Avval qismlarni o‘rgan",
      "uz-Cyrl": "Аввал қисмларни ўрган"
    },
    "title": {
      "ru": "Собери установку сам",
      "en": "Build it yourself",
      "uz-Latn": "Qurilmani o‘zing yig‘",
      "uz-Cyrl": "Қурилмани ўзинг йиғ"
    },
    "instruction": {
      "ru": "Выбери нужный прибор и поставь его на место. На компьютере можно перетащить карточку в сцену.",
      "en": "Choose a part, then choose its place. On a computer you can drag a card into the scene.",
      "uz-Latn": "Kerakli jihozni tanlab, o‘z joyiga qo‘y. Kompyuterda kartochkani sahnaga sudrash mumkin.",
      "uz-Cyrl": "Керакли жиҳозни танлаб, ўз жойига қўй. Компьютерда карточкани саҳнага судраш мумкин."
    },
    "restart": {
      "ru": "↺ Начать заново",
      "en": "↺ Start again",
      "uz-Latn": "↺ Qaytadan boshlash",
      "uz-Cyrl": "↺ Қайтадан бошлаш"
    },
    "hint": {
      "ru": "💡 Подсказка",
      "en": "💡 Hint",
      "uz-Latn": "💡 Yordam",
      "uz-Cyrl": "💡 Ёрдам"
    },
    "guided": {
      "ru": "С подсказками",
      "en": "With guides",
      "uz-Latn": "Ko‘rsatmalar bilan",
      "uz-Cyrl": "Кўрсатмалар билан"
    },
    "unguided": {
      "ru": "Без подсказок",
      "en": "Without guides",
      "uz-Latn": "Ko‘rsatmalarsiz",
      "uz-Cyrl": "Кўрсатмаларсиз"
    },
    "step": {
      "ru": "Шаг {n} / 11: {text}",
      "en": "Step {n} / 11: {text}",
      "uz-Latn": "{n} / 11-qadam: {text}",
      "uz-Cyrl": "{n} / 11-қадам: {text}"
    },
    "errors": {
      "ru": "Ошибки: {n}",
      "en": "Errors: {n}",
      "uz-Latn": "Xatolar: {n}",
      "uz-Cyrl": "Хатолар: {n}"
    },
    "time": {
      "ru": "Время: {n} с",
      "en": "Time: {n} s",
      "uz-Latn": "Vaqt: {n} s",
      "uz-Cyrl": "Вақт: {n} с"
    },
    "place": {
      "ru": "Поставить здесь",
      "en": "Place here",
      "uz-Latn": "Shu yerga qo‘y",
      "uz-Cyrl": "Шу ерга қўй"
    },
    "choose": {
      "ru": "Выбери прибор в лотке",
      "en": "Choose a part from the tray",
      "uz-Latn": "Lotokdan jihozni tanla",
      "uz-Cyrl": "Лотокдан жиҳозни танла"
    },
    "selected": {
      "ru": "Выбрано: {name}. Нажми на место в сцене.",
      "en": "Selected: {name}. Choose a place in the scene.",
      "uz-Latn": "Tanlandi: {name}. Sahnadagi joyni bos.",
      "uz-Cyrl": "Танланди: {name}. Саҳнадаги жойни бос."
    },
    "used": {
      "ru": "Установлено",
      "en": "Placed",
      "uz-Latn": "Joylashtirildi",
      "uz-Cyrl": "Жойлаштирилди"
    },
    "tray": {
      "ru": "Лоток приборов",
      "en": "Equipment tray",
      "uz-Latn": "Jihozlar lotogi",
      "uz-Cyrl": "Жиҳозлар лотоги"
    },
    "previous": {
      "ru": "Предыдущие приборы",
      "en": "Previous parts",
      "uz-Latn": "Oldingi jihozlar",
      "uz-Cyrl": "Олдинги жиҳозлар"
    },
    "next": {
      "ru": "Следующие приборы",
      "en": "Next parts",
      "uz-Latn": "Keyingi jihozlar",
      "uz-Cyrl": "Кейинги жиҳозлар"
    },
    "order": {
      "ru": "Сначала: {text}",
      "en": "First: {text}",
      "uz-Latn": "Avval: {text}",
      "uz-Cyrl": "Аввал: {text}"
    },
    "miss": {
      "ru": "Место не подходит. Попробуй ещё раз.",
      "en": "That is not the right place. Try again.",
      "uz-Latn": "Bu joy mos emas. Yana urinib ko‘r.",
      "uz-Cyrl": "Бу жой мос эмас. Яна уриниб кўр."
    },
    "glassDanger": {
      "ru": "Стакан нельзя ставить без сетки: стекло может лопнуть. Сначала положи сетку.",
      "en": "Do not place the beaker without gauze: the glass may crack. Put the gauze down first.",
      "uz-Latn": "Stakanni to‘rsiz qo‘yma: shisha yorilishi mumkin. Avval to‘rni qo‘y.",
      "uz-Cyrl": "Стаканни тўрсиз қўйма: шиша ёрилиши мумкин. Аввал тўрни қўй."
    },
    "fireDanger": {
      "ru": "Сначала собери установку, налей воду и закрепи пробирку. Потом зажигай горелку.",
      "en": "Assemble the apparatus, add water and secure the tube before lighting the burner.",
      "uz-Latn": "Avval qurilmani yig‘, suv quy va probirkani mahkamla. Keyin gorelkani yoq.",
      "uz-Cyrl": "Аввал қурилмани йиғ, сув қуй ва пробиркани маҳкамла. Кейин горелкани ёқ."
    },
    "danger": {
      "ru": "⚠ ОПАСНО",
      "en": "⚠ DANGER",
      "uz-Latn": "⚠ XAVFLI",
      "uz-Cyrl": "⚠ ХАВФЛИ"
    },
    "height": {
      "ru": "Высота пробирки",
      "en": "Tube height",
      "uz-Latn": "Probirka balandligi",
      "uz-Cyrl": "Пробирка баландлиги"
    },
    "heightGood": {
      "ru": "Зазор безопасный. Закрепи пробирку.",
      "en": "The clearance is safe. Secure the tube.",
      "uz-Latn": "Oraliq xavfsiz. Probirkani mahkamla.",
      "uz-Cyrl": "Оралиқ хавфсиз. Пробиркани маҳкамла."
    },
    "heightLow": {
      "ru": "Пробирка упирается в дно и может треснуть. Подними её.",
      "en": "The tube touches the bottom and could crack. Raise it.",
      "uz-Latn": "Probirka tubga tegib, yorilishi mumkin. Uni ko‘tar.",
      "uz-Cyrl": "Пробирка тубга тегиб, ёрилиши мумкин. Уни кўтар."
    },
    "heightHigh": {
      "ru": "Пробирка слишком высоко — опусти её в воду.",
      "en": "The tube is too high. Lower it into the water.",
      "uz-Latn": "Probirka juda baland. Uni suvga tushir.",
      "uz-Cyrl": "Пробирка жуда баланд. Уни сувга тушир."
    },
    "secure": {
      "ru": "Закрепить пробирку",
      "en": "Secure tube",
      "uz-Latn": "Probirkani mahkamlash",
      "uz-Cyrl": "Пробиркани маҳкамлаш"
    },
    "valve": {
      "ru": "Открыть вентиль",
      "en": "Open valve",
      "uz-Latn": "Ventilni ochish",
      "uz-Cyrl": "Вентильни очиш"
    },
    "match": {
      "ru": "Поднести спичку",
      "en": "Bring a match",
      "uz-Latn": "Gugurtni yaqinlashtirish",
      "uz-Cyrl": "Гугуртни яқинлаштириш"
    },
    "valveFirst": {
      "ru": "Сначала открой вентиль.",
      "en": "Open the valve first.",
      "uz-Latn": "Avval ventilni och.",
      "uz-Cyrl": "Аввал вентильни оч."
    },
    "heating": {
      "ru": "Вода нагревается, температура спирта повышается…",
      "en": "The water is heating and the alcohol temperature is rising…",
      "uz-Latn": "Suv isimoqda, spirt harorati ko‘tarilmoqda…",
      "uz-Cyrl": "Сув исимоқда, спирт ҳарорати кўтарилмоқда…"
    },
    "success": {
      "ru": "Установка собрана! 🎉",
      "en": "Apparatus assembled! 🎉",
      "uz-Latn": "Qurilma yig‘ildi! 🎉",
      "uz-Cyrl": "Қурилма йиғилди! 🎉"
    },
    "again": {
      "ru": "↺ Собрать ещё раз",
      "en": "↺ Build again",
      "uz-Latn": "↺ Yana yig‘ish",
      "uz-Cyrl": "↺ Яна йиғиш"
    },
    "challenge": {
      "ru": "Без подсказок 🏆",
      "en": "Without guides 🏆",
      "uz-Latn": "Ko‘rsatmalarsiz 🏆",
      "uz-Cyrl": "Кўрсатмаларсиз 🏆"
    },
    "master": {
      "ru": "Мастер установки",
      "en": "Apparatus master",
      "uz-Latn": "Qurilma ustasi",
      "uz-Cyrl": "Қурилма устаси"
    },
    "masterHint": {
      "ru": "Собери водяную баню без подсказок и ошибок.",
      "en": "Build the water bath without guides, hints or mistakes.",
      "uz-Latn": "Suv hammomini ko‘rsatma, yordam va xatolarsiz yig‘.",
      "uz-Cyrl": "Сув ҳаммомини кўрсатма, ёрдам ва хатоларсиз йиғ."
    },
    "firstXP": {
      "ru": "Первая сборка: +20 XP",
      "en": "First build: +20 XP",
      "uz-Latn": "Birinchi yig‘ish: +20 XP",
      "uz-Cyrl": "Биринчи йиғиш: +20 XP"
    },
    "betterXP": {
      "ru": "Новый лучший результат: +5 XP",
      "en": "New personal best: +5 XP",
      "uz-Latn": "Yangi eng yaxshi natija: +5 XP",
      "uz-Cyrl": "Янги энг яхши натижа: +5 XP"
    },
    "noXP": {
      "ru": "Награда за первую сборку уже получена",
      "en": "First-build reward already earned",
      "uz-Latn": "Birinchi yig‘ish mukofoti olingan",
      "uz-Cyrl": "Биринчи йиғиш мукофоти олинган"
    },
    "hintPenalty": {
      "ru": "Больше двух подсказок: −1 звезда",
      "en": "More than two hints: −1 star",
      "uz-Latn": "Ikkitadan ortiq yordam: −1 yulduz",
      "uz-Cyrl": "Иккитадан ортиқ ёрдам: −1 юлдуз"
    },
    "best": {
      "ru": "Лучший результат: {stars} · {errors} ошибок · {time} с",
      "en": "Best: {stars} · {errors} errors · {time} s",
      "uz-Latn": "Eng yaxshi: {stars} · {errors} xato · {time} s",
      "uz-Cyrl": "Энг яхши: {stars} · {errors} хато · {time} s"
    },
    "fallback": {
      "ru": "WebGL недоступен. Собери установку по схеме: выбери прибор, затем место.",
      "en": "WebGL is unavailable. Use the diagram: choose a part, then its place.",
      "uz-Latn": "WebGL mavjud emas. Sxemada jihozni tanlab, joyini bos.",
      "uz-Cyrl": "WebGL мавжуд эмас. Схемада жиҳозни танлаб, жойини бос."
    },
    "loading": {
      "ru": "Подготавливаем приборы…",
      "en": "Preparing equipment…",
      "uz-Latn": "Jihozlar tayyorlanmoqda…",
      "uz-Cyrl": "Жиҳозлар тайёрланмоқда…"
    }
  }
};
 const ids=content.items.map(i=>i.id),actions=content.steps.map(s=>s.id),limit=(n,max=100000)=>Number.isFinite(n)?Math.max(0,Math.min(max,Math.floor(n))):0;
 function shuffle(){const a=[...ids];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
 function stars(errors,hints){return Math.max(1,(errors===0&&hints===0?3:errors<=3?2:1)-(hints>2?1:0));}
 const blankRun=(guided=true)=>({actions:[],order:shuffle(),errors:0,hints:0,seconds:0,guided,everGuided:guided,pendingTube:false,tubePercent:80,valveOpen:false,selected:null,done:false,reward:null});
 const blank=()=>({version:1,run:blankRun(),completion:null,best:null,earnedSteps:[],improvements:0,master:false,masterProof:null});
 function validCompletion(p){return !!p&&p.version===1&&Array.isArray(p.actions)&&JSON.stringify(p.actions)===JSON.stringify(actions)&&Number.isInteger(p.errors)&&p.errors>=0&&Number.isInteger(p.hints)&&p.hints>=0&&Number.isFinite(p.seconds)&&p.seconds>=0&&typeof p.guided==='boolean'&&p.stars===stars(p.errors,p.hints);}
 function result(r){return {version:1,actions:[...r.actions],errors:r.errors,hints:r.hints,seconds:r.seconds,guided:r.everGuided,stars:stars(r.errors,r.hints)};}
 function better(a,b){return !b||a.stars>b.stars||a.stars===b.stars&&(a.errors<b.errors||a.errors===b.errors&&(a.hints<b.hints||a.hints===b.hints&&a.seconds<b.seconds));}
 function finish(s){const p=result(s.run);if(!validCompletion(p))return false;const first=!s.completion,improved=!first&&better(p,s.best);s.completion=p;if(better(p,s.best))s.best=p;if(improved)s.improvements=Math.min(999,s.improvements+1);if(!p.guided&&p.errors===0&&p.hints===0){s.master=true;s.masterProof=p;}s.run.done=true;s.run.selected=null;s.run.reward=first?'firstXP':improved?'betterXP':'noXP';return true;}
 function advance(s){const r=s.run,i=r.actions.length;if(i>=actions.length)return false;r.actions.push(actions[i]);if(!s.earnedSteps.includes(i+1))s.earnedSteps.push(i+1);r.selected=null;r.pendingTube=false;if(r.actions.length===actions.length)finish(s);return true;}
 function sanitize(v){const out=blank();if(v?.version!==1)return out;out.completion=validCompletion(v.completion)?v.completion:null;out.best=validCompletion(v.best)?v.best:out.completion;out.improvements=limit(v.improvements,999);out.masterProof=validCompletion(v.masterProof)&&!v.masterProof.guided&&v.masterProof.errors===0&&v.masterProof.hints===0?v.masterProof:null;out.master=!!out.masterProof;out.earnedSteps=Array.isArray(v.earnedSteps)?[...new Set(v.earnedSteps.filter(n=>Number.isInteger(n)&&n>=1&&n<=11))]:[];const r=v.run||{},a=[];for(let i=0;i<actions.length;i++){if(r.actions?.[i]!==actions[i])break;a.push(actions[i]);}out.run={...blankRun(r.guided!==false),actions:a,order:Array.isArray(r.order)&&r.order.length===ids.length&&new Set(r.order).size===ids.length&&r.order.every(id=>ids.includes(id))?[...r.order]:shuffle(),errors:limit(r.errors),hints:limit(r.hints),seconds:limit(r.seconds,10000000),everGuided:r.everGuided!==false||r.guided!==false,pendingTube:a.length===7&&r.pendingTube===true,tubePercent:limit(r.tubePercent,100),valveOpen:a.length>=10&&r.valveOpen===true,selected:ids.includes(r.selected)||r.selected==='match'?r.selected:null,done:a.length===11&&!!out.completion,reward:['firstXP','betterXP','noXP'].includes(r.reward)?r.reward:null};if(out.run.actions.length===11&&!out.run.done)out.run=blankRun();return out;}
 return {...content,ids,actions,blank,blankRun,shuffle,stars,validCompletion,result,better,finish,advance,sanitize};
})();
CourseData.badges.push({id:'assembly-master',title:Practical12AssemblyData.copy.master,hint:Practical12AssemblyData.copy.masterHint});
