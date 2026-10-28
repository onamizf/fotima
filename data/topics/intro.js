/* Структура главы 1; все формулировки и изображения проекта самостоятельные. */
const IntroData={
 "version": 2,
 "title": {
  "ru": "Введение в химию",
  "uz-Latn": "Kimyo faniga kirish",
  "en": "Introduction to chemistry"
 },
 "ui": {
  "title": {
   "ru": "Введение в химию",
   "uz-Latn": "Kimyo faniga kirish",
   "en": "Introduction to chemistry"
  },
  "states": {
   "ru": "Агрегатные состояния веществ",
   "uz-Latn": "Moddalarning agregat holatlari",
   "en": "States of matter"
  },
  "goal": {
   "ru": "Цель",
   "uz-Latn": "Maqsad",
   "en": "Goal"
  },
  "needs": {
   "ru": "Что понадобится",
   "uz-Latn": "Kerakli jihozlar",
   "en": "Equipment"
  },
  "skills": {
   "ru": "Навыки",
   "uz-Latn": "Ko‘nikmalar",
   "en": "Skills"
  },
  "observe": {
   "ru": "Наблюдать",
   "uz-Latn": "Kuzatish",
   "en": "Observe"
  },
  "identify": {
   "ru": "Определять",
   "uz-Latn": "Aniqlash",
   "en": "Identify"
  },
  "compare": {
   "ru": "Сравнивать",
   "uz-Latn": "Taqqoslash",
   "en": "Compare"
  },
  "analyse": {
   "ru": "Анализировать",
   "uz-Latn": "Tahlil qilish",
   "en": "Analyse"
  },
  "start": {
   "ru": "НАЧАТЬ",
   "uz-Latn": "BOSHLASH",
   "en": "START"
  },
  "check": {
   "ru": "ПРОВЕРИТЬ",
   "uz-Latn": "TEKSHIRISH",
   "en": "CHECK"
  },
  "next": {
   "ru": "ДАЛЬШЕ",
   "uz-Latn": "KEYINGISI",
   "en": "NEXT"
  },
  "repeat": {
   "ru": "Повторить",
   "uz-Latn": "Takrorlash",
   "en": "Try again"
  },
  "map": {
   "ru": "К шагам темы",
   "uz-Latn": "Mavzu bosqichlariga",
   "en": "Chapter steps"
  },
  "continue": {
   "ru": "Продолжить",
   "uz-Latn": "Davom etish",
   "en": "Continue"
  },
  "done": {
   "ru": "Выполнено",
   "uz-Latn": "Bajarildi",
   "en": "Completed"
  },
  "locked": {
   "ru": "Сначала заверши предыдущий шаг",
   "uz-Latn": "Oldingi bosqichni tugat",
   "en": "Complete the previous step first"
  },
  "self": {
   "ru": "Самооценка",
   "uz-Latn": "O‘z-o‘zini baholash",
   "en": "Self-assessment"
  },
  "quiz": {
   "ru": "Закрепление",
   "uz-Latn": "Mustahkamlash",
   "en": "Review quiz"
  },
  "correct": {
   "ru": "Верно! Двигаемся дальше 🧪",
   "uz-Latn": "To‘g‘ri! Davom etamiz 🧪",
   "en": "Correct! Let’s continue 🧪"
  },
  "wrong": {
   "ru": "Пока не совпало. Рассмотри сцену и попробуй ещё раз.",
   "uz-Latn": "Hali mos emas. Manzarani ko‘rib, qayta urin.",
   "en": "Not quite. Look at the scene and try again."
  },
  "empty": {
   "ru": "Сначала выполни действия и заполни ответы.",
   "uz-Latn": "Avval amallarni bajar va javoblarni to‘ldir.",
   "en": "Complete the actions and answers first."
  },
  "danger": {
   "ru": "Что здесь опасно?",
   "uz-Latn": "Bu yerda qanday xavf bor?",
   "en": "What is the danger?"
  },
  "precaution": {
   "ru": "Как правильно?",
   "uz-Latn": "Qanday to‘g‘ri bajariladi?",
   "en": "What is the safe action?"
  },
  "matchHint": {
   "ru": "Перетащи карточку к метке или выбери карточку и нажми на метку.",
   "uz-Latn": "Kartani belgiga sudra yoki kartani tanlab, belgini bos.",
   "en": "Drag a card to a target, or select a card and press its target."
  },
  "selected": {
   "ru": "Выбрано",
   "uz-Latn": "Tanlandi",
   "en": "Selected"
  },
  "name": {
   "ru": "Название",
   "uz-Latn": "Nomi",
   "en": "Name"
  },
  "purpose": {
   "ru": "Назначение",
   "uz-Latn": "Vazifasi",
   "en": "Purpose"
  },
  "inspect": {
   "ru": "Нажми на предмет, чтобы рассмотреть его.",
   "uz-Latn": "Jihozni ko‘rish uchun ustiga bos.",
   "en": "Select an object to inspect it."
  },
  "fallback": {
   "ru": "2D-сцена: все задания доступны.",
   "uz-Latn": "2D manzara: barcha topshiriqlar mavjud.",
   "en": "2D scene: all tasks remain available."
  },
  "loading": {
   "ru": "Готовим лабораторию…",
   "uz-Latn": "Laboratoriya tayyorlanmoqda…",
   "en": "Preparing the laboratory…"
  },
  "camera": {
   "ru": "Обзор",
   "uz-Latn": "Ko‘rish",
   "en": "View"
  },
  "zoomIn": {
   "ru": "Приблизить",
   "uz-Latn": "Yaqinlashtirish",
   "en": "Zoom in"
  },
  "zoomOut": {
   "ru": "Отдалить",
   "uz-Latn": "Uzoqlashtirish",
   "en": "Zoom out"
  },
  "resetView": {
   "ru": "Сбросить ракурс",
   "uz-Latn": "Ko‘rinishni tiklash",
   "en": "Reset view"
  },
  "sound": {
   "ru": "Звук",
   "uz-Latn": "Ovoz",
   "en": "Sound"
  },
  "shelf": {
   "ru": "Изучи 6 основных предметов. Дополнительные — на верхней полке.",
   "uz-Latn": "6 asosiy jihozni o‘rgan. Qo‘shimchalari yuqori tokchada.",
   "en": "Explore the 6 main objects. Bonus equipment is on the upper shelf."
  },
  "recognition": {
   "ru": "Узнай предмет",
   "uz-Latn": "Jihozni top",
   "en": "Identify the object"
  },
  "constructor": {
   "ru": "Собери модель колбы из трёх частей",
   "uz-Latn": "Kolba modelini uch qismdan yig‘",
   "en": "Build a flask model from three parts"
  },
  "neck": {
   "ru": "Горлышко",
   "uz-Latn": "Bo‘yin",
   "en": "Neck"
  },
  "body": {
   "ru": "Корпус",
   "uz-Latn": "Korpus",
   "en": "Body"
  },
  "bottom": {
   "ru": "Дно",
   "uz-Latn": "Tagi",
   "en": "Base"
  },
  "assemblyHint": {
   "ru": "Собери водяную баню: в пробирке спирт и термометр, снаружи вода. Нагрев получает водяная баня.",
   "uz-Latn": "Suv hammomini yig‘: probirkada spirt va termometr, tashqarida suv. Suv hammomi isitiladi.",
   "en": "Build a water bath: alcohol and a thermometer inside the test tube, water outside it. Heat the water bath."
  },
  "heat": {
   "ru": "НАГРЕТЬ",
   "uz-Latn": "QIZDIRISH",
   "en": "HEAT"
  },
  "stop": {
   "ru": "ЗАКРЫТЬ ГАЗ",
   "uz-Latn": "GAZNI YOPISH",
   "en": "CLOSE GAS"
  },
  "cool": {
   "ru": "Остывает",
   "uz-Latn": "Sovimoqda",
   "en": "Cooling"
  },
  "cold": {
   "ru": "Остыло",
   "uz-Latn": "Sovidi",
   "en": "Cool"
  },
  "temperature": {
   "ru": "Температура модели",
   "uz-Latn": "Model harorati",
   "en": "Model temperature"
  },
  "evapHint": {
   "ru": "В чашке раствор медного купороса, под ней стакан с водой. Подпиши установку и наблюдай выпаривание и кристаллизацию при охлаждении.",
   "uz-Latn": "Qurilmani belgila, keyin bug‘lanish va soviganda kristallar paydo bo‘lishini kuzat.",
   "en": "Label the setup, then observe evaporation and crystals forming as it cools."
  },
  "demo": {
   "ru": "ПОКАЗАТЬ",
   "uz-Latn": "KO‘RSATISH",
   "en": "RUN DEMO"
  },
  "modelTime": {
   "ru": "Время и нагрев в модели условные и ускоренные; это не реальные измерения.",
   "uz-Latn": "Model vaqti va isitish shartli hamda tezlashtirilgan; bu haqiqiy o‘lchov emas.",
   "en": "Model time and heating are illustrative and accelerated, not real measurements."
  },
  "parts": {
   "ru": "Части горелки",
   "uz-Latn": "Gorelka qismlari",
   "en": "Burner parts"
  },
  "functions": {
   "ru": "Часть → функция",
   "uz-Latn": "Qism → vazifa",
   "en": "Part → function"
  },
  "explode": {
   "ru": "Разобрать",
   "uz-Latn": "Ajratish",
   "en": "Explode view"
  },
  "assemble": {
   "ru": "Собрать",
   "uz-Latn": "Yig‘ish",
   "en": "Assemble"
  },
  "air": {
   "ru": "Воздух",
   "uz-Latn": "Havo",
   "en": "Air"
  },
  "gas": {
   "ru": "Газ",
   "uz-Latn": "Gaz",
   "en": "Gas"
  },
  "prepare": {
   "ru": "Подготовить горелку",
   "uz-Latn": "Gorelkani tayyorlash",
   "en": "Prepare the burner"
  },
  "lightMatch": {
   "ru": "Зажечь спичку",
   "uz-Latn": "Gugurtni yoqish",
   "en": "Light match"
  },
  "match": {
   "ru": "Спичка",
   "uz-Latn": "Gugurt",
   "en": "Match"
  },
  "nozzleTarget": {
   "ru": "К трубке горелки",
   "uz-Latn": "Mo‘riga",
   "en": "To the burner tube"
  },
  "putOutMatch": {
   "ru": "Погасить спичку",
   "uz-Latn": "Gugurtni o‘chirish",
   "en": "Extinguish match"
  },
  "igniteHint": {
   "ru": "Подготовь горелку, закрой воздух, поднеси зажжённую спичку и медленно открой газ. Затем погаси спичку и закрой газ.",
   "uz-Latn": "Gorelkani tayyorla, havoni yop, yoqilgan gugurtni mo‘riga tutib gazni sekin och. Keyin gugurtni o‘chir va gazni yop.",
   "en": "Prepare the burner, close the air inlet, hold a lit match at the tube and slowly open the gas. Then extinguish the match and close the gas."
  },
  "gasAlarm": {
   "ru": "Стоп! Закрой кран: горючий газ не должен накапливаться. Модель уже перекрыла подачу.",
   "uz-Latn": "To‘xta! Jo‘mrakni yop: yonuvchan gaz to‘planmasligi kerak. Model gazni avtomatik yopdi.",
   "en": "Stop! Close the tap: flammable gas must not accumulate. The model has shut off the supply."
  },
  "gasSymbol": {
   "ru": "Зелёное облако — условный сигнал. Настоящий газ может быть невидимым.",
   "uz-Latn": "Yashil bulut shartli belgi. Haqiqiy gaz ko‘rinmas bo‘lishi mumkin.",
   "en": "The green cloud is a symbol. Actual gas may be invisible."
  },
  "sequenceError": {
   "ru": "Проверь порядок: сначала подготовка и закрытый воздух, затем огонь у трубки и газ.",
   "uz-Latn": "Tartibni tekshir: avval tayyorlash va havoni yopish, keyin mo‘riga olov va gaz.",
   "en": "Check the order: prepare and close air first, then bring the flame to the tube before opening gas."
  },
  "yellow": {
   "ru": "Жёлтое",
   "uz-Latn": "Sarg‘ish",
   "en": "Yellow"
  },
  "blue": {
   "ru": "Голубое",
   "uz-Latn": "Ko‘kimtir",
   "en": "Blue"
  },
  "flame": {
   "ru": "Пламя",
   "uz-Latn": "Alanga",
   "en": "Flame"
  },
  "light": {
   "ru": "Свет в лаборатории",
   "uz-Latn": "Laboratoriya yoritilishi",
   "en": "Laboratory lighting"
  },
  "xray": {
   "ru": "Рентген пламени",
   "uz-Latn": "Alanga zonalari",
   "en": "Flame X-ray"
  },
  "inner": {
   "ru": "Внутренняя зона: несгоревший газ",
   "uz-Latn": "Ichki qism: yonmagan gaz",
   "en": "Inner zone: unburnt gas"
  },
  "outerYellow": {
   "ru": "Внешняя зона: неполное сгорание, возможна сажа",
   "uz-Latn": "Tashqi qism: qisman yonish, qurum hosil bo‘lishi mumkin",
   "en": "Outer zone: incomplete combustion, soot can form"
  },
  "outerBlue": {
   "ru": "Внешняя зона: более полное сгорание",
   "uz-Latn": "Tashqi qism: to‘liqroq yonish",
   "en": "Outer zone: more complete combustion"
  },
  "dark": {
   "ru": "Тёмная",
   "uz-Latn": "To‘q rang",
   "en": "Dark"
  },
  "yellowColor": {
   "ru": "Жёлтая",
   "uz-Latn": "Sariq",
   "en": "Yellow"
  },
  "blueColor": {
   "ru": "Голубая",
   "uz-Latn": "Ko‘k",
   "en": "Blue"
  },
  "orange": {
   "ru": "Оранжевая",
   "uz-Latn": "To‘q sariq",
   "en": "Orange"
  },
  "steady": {
   "ru": "Ровное",
   "uz-Latn": "Barqaror",
   "en": "Steady"
  },
  "flicker": {
   "ru": "Колышется",
   "uz-Latn": "Tebranadi",
   "en": "Flickering"
  },
  "stability": {
   "ru": "При умеренной подаче газа пламя…",
   "uz-Latn": "Gaz me’yorida berilganda alanga…",
   "en": "At moderate gas flow the flame is…"
  },
  "idle": {
   "ru": "Почему при короткой паузе под наблюдением выбирают жёлтое пламя?",
   "uz-Latn": "Nega nazorat ostidagi qisqa tanaffusda sarg‘ish alanga tanlanadi?",
   "en": "Why use a yellow flame during a short, supervised pause?"
  },
  "visible": {
   "ru": "Оно заметнее. Закончив работу, газ закрывают.",
   "uz-Latn": "U yaxshiroq ko‘rinadi. Ish tugagach gaz yopiladi.",
   "en": "It is easier to see. Close the gas when finished."
  },
  "unattended": {
   "ru": "Горелку можно оставить без присмотра",
   "uz-Latn": "Gorelkani qarovsiz qoldirish mumkin",
   "en": "The burner can be left unattended"
  },
  "hottest": {
   "ru": "Оно всегда самое горячее",
   "uz-Latn": "U doim eng issiq",
   "en": "It is always the hottest"
  },
  "compareFlames": {
   "ru": "Наблюдай оба цвета пламени, меняй газ и освещение, затем подпиши зоны.",
   "uz-Latn": "Ikkala alanga rangini kuzat, gaz va yoritishni o‘zgartir, so‘ng zonalarni belgila.",
   "en": "Observe both flame colours, vary gas and lighting, then label the zones."
  },
  "raceHint": {
   "ru": "Одинаковые чашки, объём воды, расстояние и подача газа. Меняем только тип пламени.",
   "uz-Latn": "Idishlar, suv hajmi, masofa va gaz bir xil. Faqat alanga turi o‘zgaradi.",
   "en": "Identical dishes, water volume, distance and gas flow. Change only the flame type."
  },
  "time": {
   "ru": "Время в игре, с",
   "uz-Latn": "O‘yindagi vaqt, s",
   "en": "Game time, s"
  },
  "recordTime": {
   "ru": "Запиши показания секундомера",
   "uz-Latn": "Sekundomer ko‘rsatkichini yoz",
   "en": "Record the stopwatch readings"
  },
  "flip": {
   "ru": "Перевернуть остывшие чашки",
   "uz-Latn": "Sovigan idishlarni ag‘darish",
   "en": "Turn over the cooled dishes"
  },
  "independent": {
   "ru": "Независимая переменная",
   "uz-Latn": "Mustaqil o‘zgaruvchi",
   "en": "Independent variable"
  },
  "controlled": {
   "ru": "Контролируемые условия",
   "uz-Latn": "Nazorat o‘zgaruvchilari",
   "en": "Controlled conditions"
  },
  "flameType": {
   "ru": "Тип пламени",
   "uz-Latn": "Alanga turi",
   "en": "Flame type"
  },
  "volume": {
   "ru": "Объём воды",
   "uz-Latn": "Suv hajmi",
   "en": "Water volume"
  },
  "distance": {
   "ru": "Расстояние до пламени",
   "uz-Latn": "Alangagacha masofa",
   "en": "Distance to flame"
  },
  "dishes": {
   "ru": "Одинаковые чашки",
   "uz-Latn": "Bir xil idishlar",
   "en": "Identical dishes"
  },
  "gasFlow": {
   "ru": "Подача газа",
   "uz-Latn": "Gaz miqdori",
   "en": "Gas flow"
  },
  "conclusion": {
   "ru": "Вывод",
   "uz-Latn": "Xulosa",
   "en": "Conclusion"
  },
  "blueBetter": {
   "ru": "В этой модели голубое пламя нагревает быстрее и не оставляет сажи.",
   "uz-Latn": "Bu modelda ko‘kimtir alanga tezroq qizdiradi va qurum qoldirmaydi.",
   "en": "In this model the blue flame heats faster and leaves no soot."
  },
  "yellowBetter": {
   "ru": "Жёлтое нагревает быстрее и не коптит",
   "uz-Latn": "Sarg‘ish alanga tezroq qizdiradi va qurum qoldirmaydi",
   "en": "Yellow heats faster without soot"
  },
  "equal": {
   "ru": "Разницы нет",
   "uz-Latn": "Farqi yo‘q",
   "en": "There is no difference"
  },
  "soot": {
   "ru": "Сажа",
   "uz-Latn": "Qurum",
   "en": "Soot"
  },
  "clean": {
   "ru": "Чистое дно",
   "uz-Latn": "Toza tag",
   "en": "Clean base"
  },
  "boils": {
   "ru": "Кипит",
   "uz-Latn": "Qaynamoqda",
   "en": "Boiling"
  },
  "goggles": {
   "ru": "НАДЕТЬ ОЧКИ",
   "uz-Latn": "KO‘ZOYNAK TAQISH",
   "en": "WEAR GOGGLES"
  },
  "holder": {
   "ru": "Держатель: высота от дна, %",
   "uz-Latn": "Qisqich: tagidan balandligi, %",
   "en": "Holder: height from the base, %"
  },
  "angle": {
   "ru": "Угол пробирки",
   "uz-Latn": "Probirka burchagi",
   "en": "Test-tube angle"
  },
  "direction": {
   "ru": "Куда направлено горлышко?",
   "uz-Latn": "Probirka og‘zi qayerga qaratilgan?",
   "en": "Where does the opening point?"
  },
  "away": {
   "ru": "От людей",
   "uz-Latn": "Odamlardan nariga",
   "en": "Away from people"
  },
  "selfDirection": {
   "ru": "На себя",
   "uz-Latn": "O‘zingga",
   "en": "Towards you"
  },
  "peer": {
   "ru": "На одноклассника",
   "uz-Latn": "Sinfdoshga",
   "en": "Towards a classmate"
  },
  "heatPosition": {
   "ru": "Место нагрева: от дна, %",
   "uz-Latn": "Isitish joyi: tagidan, %",
   "en": "Heating point: from the base, %"
  },
  "sweep": {
   "ru": "Плавно переместить пробирку",
   "uz-Latn": "Probirkani asta siljitish",
   "en": "Move the test tube gently"
  },
  "overheat": {
   "ru": "Перегрев одного места",
   "uz-Latn": "Bir joyning qizib ketishi",
   "en": "Local overheating"
  },
  "tubeHint": {
   "ru": "Воды — треть пробирки. Держатель закрепи в верхней трети, не у самого края. Очки, угол около 45°, горлышко от людей; плавно перемещай пробирку.",
   "uz-Latn": "Suv probirkaning uchdan birida. Qisqichni yuqori uchdan biriga, chetiga emas, o‘rnat. Ko‘zoynak taq, taxminan 45° qiya tut, og‘zini odamlardan nariga qarat va asta siljit.",
   "en": "Fill one third with water. Fix the holder in the upper third, below the rim. Wear goggles, tilt about 45°, point away from people and keep the tube moving."
  },
  "tubeWarning": {
   "ru": "Проверь очки, держатель, угол и направление. Нагревай ниже уровня воды.",
   "uz-Latn": "Ko‘zoynak, qisqich, burchak va yo‘nalishni tekshir. Suv sathidan pastni isit.",
   "en": "Check goggles, holder, angle and direction. Heat below the water level."
  },
  "cracked": {
   "ru": "Пробирка повреждена. Газ закрыт. Начни попытку заново.",
   "uz-Latn": "Probirka shikastlandi. Gaz yopildi. Qayta boshla.",
   "en": "The test tube is damaged. Gas is closed. Start a new attempt."
  },
  "moveWarning": {
   "ru": "Не задерживай нагрев в одной точке. Плавно перемещай пробирку.",
   "uz-Latn": "Bir nuqtani uzoq isitma. Probirkani asta siljit.",
   "en": "Do not heat one point continuously. Move the tube gently."
  },
  "stopBoiling": {
   "ru": "Вода закипела — закрой газ.",
   "uz-Latn": "Suv qaynadi — gazni yop.",
   "en": "The water is boiling — close the gas."
  },
  "yes": {
   "ru": "Да",
   "uz-Latn": "Ha",
   "en": "Yes"
  },
  "unsure": {
   "ru": "Не уверен(а)",
   "uz-Latn": "Ishonchim komil emas",
   "en": "Not sure"
  },
  "no": {
   "ru": "Нет",
   "uz-Latn": "Yo‘q",
   "en": "No"
  },
  "plan": {
   "ru": "Как я подтяну слабые темы",
   "uz-Latn": "Qiyin mavzularni qanday yaxshilayman",
   "en": "My plan for improving weaker skills"
  },
  "selfHint": {
   "ru": "Оцени каждый навык. При сомнении вернись к заданию и запиши план повторения.",
   "uz-Latn": "Har bir ko‘nikmani bahola. Ikkilansang, topshiriqqa qaytib, takrorlash rejasini yoz.",
   "en": "Rate each skill. If unsure, revisit its task and write a revision plan."
  },
  "save": {
   "ru": "СОХРАНИТЬ",
   "uz-Latn": "SAQLASH",
   "en": "SAVE"
  },
  "result": {
   "ru": "Результат",
   "uz-Latn": "Natija",
   "en": "Result"
  },
  "passHint": {
   "ru": "Для завершения нужны все предыдущие шаги и не менее 80% в закреплении.",
   "uz-Latn": "Yakunlash uchun oldingi bosqichlar va mustahkamlashda kamida 80% kerak.",
   "en": "Complete all preceding steps and score at least 80% in the review."
  },
  "passed": {
   "ru": "Тема пройдена!",
   "uz-Latn": "Mavzu tugallandi!",
   "en": "Chapter completed!"
  },
  "nextTopic": {
   "ru": "ТЕМА 2: АГРЕГАТНЫЕ СОСТОЯНИЯ",
   "uz-Latn": "2-MAVZU: AGREGAT HOLATLAR",
   "en": "TOPIC 2: STATES OF MATTER"
  },
  "order": {
   "ru": "Собери порядок безопасного нагрева",
   "uz-Latn": "Xavfsiz isitish tartibini tuz",
   "en": "Arrange the safe heating sequence"
  },
  "swipe": {
   "ru": "Выбери пламя: влево — жёлтое, вправо — голубое",
   "uz-Latn": "Alangani tanla: chap — sarg‘ish, o‘ng — ko‘kimtir",
   "en": "Choose the flame: swipe left for yellow, right for blue"
  },
  "research": {
   "ru": "Мини-исследование: площадь поверхности и испарение",
   "uz-Latn": "Kichik tadqiqot: yuza maydoni va bug‘lanish",
   "en": "Mini-investigation: surface area and evaporation"
  },
  "area": {
   "ru": "Площадь открытой поверхности",
   "uz-Latn": "Ochiq yuza maydoni",
   "en": "Exposed surface area"
  },
  "remaining": {
   "ru": "Объём оставшейся воды",
   "uz-Latn": "Qolgan suv hajmi",
   "en": "Remaining water volume"
  },
  "sameConditions": {
   "ru": "Объём, температура, время и место одинаковые",
   "uz-Latn": "Hajm, harorat, vaqt va joy bir xil",
   "en": "Keep volume, temperature, time and location the same"
  },
  "researchGoal": {
   "ru": "Сравнить испарение при разной площади открытой воды",
   "uz-Latn": "Ochiq suv yuzasi turlicha bo‘lganda bug‘lanishni solishtirish",
   "en": "Compare evaporation from different exposed water areas"
  },
  "massMetal": {
   "ru": "Сравнить массу металлических предметов",
   "uz-Latn": "Metall jismlar massasini solishtirish",
   "en": "Compare the mass of metal objects"
  },
  "colour": {
   "ru": "Цвет сосуда",
   "uz-Latn": "Idish rangi",
   "en": "Vessel colour"
  },
  "allDifferent": {
   "ru": "Изменить сразу все условия",
   "uz-Latn": "Hamma sharoitni birdan o‘zgartirish",
   "en": "Change all conditions together"
  },
  "choose": {
   "ru": "Выбери…",
   "uz-Latn": "Tanla…",
   "en": "Choose…"
  },
  "paused": {
   "ru": "Нагрев остановлен. Продолжи после проверки установки.",
   "uz-Latn": "Isitish to‘xtadi. Qurilmani tekshirib davom et.",
   "en": "Heating is paused. Check the setup before continuing."
  },
  "progressSelf": {
   "ru": "Самооценка: введение в химию",
   "uz-Latn": "O‘z-o‘zini baholash: kimyoga kirish",
   "en": "Self-assessment: introduction to chemistry"
  },
  "solid": {
   "ru": "Твёрдое",
   "uz-Latn": "Qattiq",
   "en": "Solid"
  },
  "liquid": {
   "ru": "Жидкое",
   "uz-Latn": "Suyuq",
   "en": "Liquid"
  },
  "gasState": {
   "ru": "Газообразное",
   "uz-Latn": "Gazsimon",
   "en": "Gas"
  },
  "stateHint": {
   "ru": "Сравни образцы: сохраняют ли они форму и объём?",
   "uz-Latn": "Namunalarni solishtir: shakl va hajmni saqlaydimi?",
   "en": "Compare the samples: do they retain their shape and volume?"
  }
 },
 "works": [
  {
   "id": "safety",
   "title": {
    "ru": "1.1 Техника безопасности",
    "uz-Latn": "1.1 Texnika xavfsizligi",
    "en": "1.1 Laboratory safety"
   },
   "goal": {
    "ru": "Распознавай опасные действия и знаки; выбирай безопасное поведение.",
    "uz-Latn": "Xavfli harakat va belgilarni top, xavfsiz xatti-harakatni tanla.",
    "en": "Recognise hazards and signs, and choose safe actions."
   },
   "equipment": [
    "tube",
    "beaker"
   ],
   "skills": [
    "observe",
    "identify"
   ]
  },
  {
   "id": "equipment",
   "title": {
    "ru": "1.2 Лабораторное оборудование",
    "uz-Latn": "1.2 Laboratoriya jihozlari",
    "en": "1.2 Laboratory equipment"
   },
   "goal": {
    "ru": "Узнавай приборы и собирай две учебные установки.",
    "uz-Latn": "Jihozlarni tanib, ikki o‘quv qurilmasini yig‘.",
    "en": "Identify equipment and assemble two learning setups."
   },
   "equipment": [
    "tube",
    "beaker",
    "dish",
    "stand",
    "tripod",
    "burner"
   ],
   "skills": [
    "observe",
    "identify",
    "compare"
   ]
  },
  {
   "id": "bunsen",
   "title": {
    "ru": "1.3 Горелка Бунзена",
    "uz-Latn": "1.3 Bunzen gorelkasi",
    "en": "1.3 Bunsen burner"
   },
   "goal": {
    "ru": "Разберись в устройстве горелки, сравни пламя и безопасно нагрей воду в модели.",
    "uz-Latn": "Gorelka tuzilishini o‘rgan, alangalarni solishtir va modelda suvni xavfsiz isit.",
    "en": "Explore burner parts, compare flames and safely heat water in the model."
   },
   "equipment": [
    "burner",
    "dish",
    "tube",
    "tripod"
   ],
   "skills": [
    "observe",
    "analyse",
    "compare"
   ]
  }
 ],
 "tasks": [
  {
   "id": "danger-a",
   "work": "safety",
   "type": "danger",
   "title": {
    "ru": "Смешивание без инструкции",
    "uz-Latn": "Ko‘rsatmasiz aralashtirish",
    "en": "Mixing without instructions"
   },
   "letter": "A"
  },
  {
   "id": "danger-b",
   "work": "safety",
   "type": "danger",
   "title": {
    "ru": "Очки забыты на столе",
    "uz-Latn": "Ko‘zoynak stolda qolgan",
    "en": "Goggles left on the table"
   },
   "letter": "B"
  },
  {
   "id": "danger-c",
   "work": "safety",
   "type": "danger",
   "title": {
    "ru": "Нос у пробирки",
    "uz-Latn": "Burun probirkaga yaqin",
    "en": "Nose against a test tube"
   },
   "letter": "C"
  },
  {
   "id": "danger-d",
   "work": "safety",
   "type": "danger",
   "title": {
    "ru": "Лицо над кипящим стаканом",
    "uz-Latn": "Yuz qaynagan stakan ustida",
    "en": "Face above a boiling beaker"
   },
   "letter": "D"
  },
  {
   "id": "signs",
   "work": "safety",
   "type": "match",
   "title": {
    "ru": "Знаки опасности",
    "uz-Latn": "Xavf belgilari",
    "en": "Hazard signs"
   }
  },
  {
   "id": "museum",
   "work": "equipment",
   "type": "museum",
   "title": {
    "ru": "Музей оборудования",
    "uz-Latn": "Jihozlar muzeyi",
    "en": "Equipment museum"
   }
  },
  {
   "id": "assembly",
   "work": "equipment",
   "type": "assembly",
   "title": {
    "ru": "Собери водяную баню",
    "uz-Latn": "Suv hammomini yig‘",
    "en": "Build a water bath"
   }
  },
  {
   "id": "evap-labels",
   "work": "equipment",
   "type": "evap",
   "title": {
    "ru": "Подпиши установку",
    "uz-Latn": "Qurilmani belgilash",
    "en": "Label the setup"
   }
  },
  {
   "id": "burner-parts",
   "work": "bunsen",
   "type": "parts",
   "title": {
    "ru": "A · Части и функции",
    "uz-Latn": "A · Qismlar va vazifalar",
    "en": "A · Parts and functions"
   }
  },
  {
   "id": "ignition",
   "work": "bunsen",
   "type": "ignition",
   "title": {
    "ru": "B · Зажигание и выключение",
    "uz-Latn": "B · Yoqish va o‘chirish",
    "en": "B · Lighting and shutting down"
   }
  },
  {
   "id": "flames",
   "work": "bunsen",
   "type": "flames",
   "title": {
    "ru": "D · Два типа пламени",
    "uz-Latn": "D · Ikki xil alanga",
    "en": "D · Two flame types"
   }
  },
  {
   "id": "race",
   "work": "bunsen",
   "type": "race",
   "title": {
    "ru": "E · Какое пламя греет лучше?",
    "uz-Latn": "E · Qaysi alanga yaxshiroq isitadi?",
    "en": "E · Which flame heats better?"
   }
  },
  {
   "id": "tube",
   "work": "bunsen",
   "type": "tube",
   "title": {
    "ru": "F · Вода в пробирке",
    "uz-Latn": "F · Probirkadagi suv",
    "en": "F · Water in a test tube"
   }
  }
 ],
 "dangers": [
  {
   "id": "danger-a",
   "letter": "A",
   "title": {
    "ru": "Смешивание без инструкции",
    "uz-Latn": "Ko‘rsatmasiz aralashtirish",
    "en": "Mixing without instructions"
   },
   "danger": [
    {
     "ru": "Непредсказуемая реакция",
     "uz-Latn": "Kutilmagan reaksiya",
     "en": "An unpredictable reaction"
    },
    {
     "ru": "Неправильный цвет стола",
     "uz-Latn": "Stol rangi noto‘g‘ri",
     "en": "The wrong table colour"
    },
    {
     "ru": "Слишком маленький стакан",
     "uz-Latn": "Stakan juda kichik",
     "en": "The beaker is too small"
    }
   ],
   "correctDanger": 0,
   "actions": [
    {
     "ru": "Добавить ещё одно вещество",
     "uz-Latn": "Yana modda qo‘shish",
     "en": "Add another substance"
    },
    {
     "ru": "Смешивать только по заданию преподавателя",
     "uz-Latn": "Faqat o‘qituvchi topshirig‘i bilan aralashtirish",
     "en": "Mix only as instructed by the teacher"
    },
    {
     "ru": "Закрыть глаза",
     "uz-Latn": "Ko‘zni yumish",
     "en": "Close your eyes"
    }
   ],
   "correctAction": 1
  },
  {
   "id": "danger-b",
   "letter": "B",
   "title": {
    "ru": "Очки забыты на столе",
    "uz-Latn": "Ko‘zoynak stolda qolgan",
    "en": "Goggles left on the table"
   },
   "danger": [
    {
     "ru": "Стакан слишком прозрачный",
     "uz-Latn": "Stakan juda shaffof",
     "en": "The beaker is too transparent"
    },
    {
     "ru": "Брызги могут попасть в глаза",
     "uz-Latn": "Sachragan tomchi ko‘zga tushishi mumkin",
     "en": "Splashes could reach the eyes"
    },
    {
     "ru": "Пробирка не подписана цветом",
     "uz-Latn": "Probirkada rang belgisi yo‘q",
     "en": "The test tube has no colour label"
    }
   ],
   "correctDanger": 1,
   "actions": [
    {
     "ru": "Подойти ещё ближе",
     "uz-Latn": "Yana yaqinlashish",
     "en": "Move closer"
    },
    {
     "ru": "Держать очки в руке",
     "uz-Latn": "Ko‘zoynakni qo‘lda tutish",
     "en": "Hold goggles in your hand"
    },
    {
     "ru": "Надеть защитные очки до нагрева",
     "uz-Latn": "Isitishdan oldin himoya ko‘zoynagi taqish",
     "en": "Wear goggles before heating"
    }
   ],
   "correctAction": 2
  },
  {
   "id": "danger-c",
   "letter": "C",
   "title": {
    "ru": "Нос у пробирки",
    "uz-Latn": "Burun probirkaga yaqin",
    "en": "Nose against a test tube"
   },
   "danger": [
    {
     "ru": "Вода слишком холодная",
     "uz-Latn": "Suv juda sovuq",
     "en": "The water is too cold"
    },
    {
     "ru": "Пробирка синего цвета",
     "uz-Latn": "Probirka ko‘k rangda",
     "en": "The test tube is blue"
    },
    {
     "ru": "Вдыхание вредных паров",
     "uz-Latn": "Zararli bug‘larni nafasga olish",
     "en": "Inhaling harmful vapours"
    }
   ],
   "correctDanger": 2,
   "actions": [
    {
     "ru": "Только с разрешения учителя осторожно направить воздух ладонью",
     "uz-Latn": "Faqat o‘qituvchi ruxsati bilan havoni qo‘l bilan yelpish",
     "en": "Only if a teacher permits it, gently waft air with a hand"
    },
    {
     "ru": "Сделать глубокий вдох",
     "uz-Latn": "Chuqur nafas olish",
     "en": "Take a deep breath"
    },
    {
     "ru": "Попробовать вещество",
     "uz-Latn": "Moddani tatib ko‘rish",
     "en": "Taste the substance"
    }
   ],
   "correctAction": 0
  },
  {
   "id": "danger-d",
   "letter": "D",
   "title": {
    "ru": "Лицо над кипящим стаканом",
    "uz-Latn": "Yuz qaynagan stakan ustida",
    "en": "Face above a boiling beaker"
   },
   "danger": [
    {
     "ru": "Ожог паром или брызгами",
     "uz-Latn": "Bug‘ yoki tomchidan kuyish",
     "en": "Steam or splash burns"
    },
    {
     "ru": "Слишком большой стол",
     "uz-Latn": "Stol juda katta",
     "en": "The table is too large"
    },
    {
     "ru": "Не хватает красителя",
     "uz-Latn": "Bo‘yoq yetishmaydi",
     "en": "There is not enough dye"
    }
   ],
   "correctDanger": 0,
   "actions": [
    {
     "ru": "Наклониться ниже",
     "uz-Latn": "Pastroq engashish",
     "en": "Lean lower"
    },
    {
     "ru": "Отойти и наблюдать сбоку с безопасного расстояния",
     "uz-Latn": "Uzoqlashib, yon tomondan xavfsiz masofada kuzatish",
     "en": "Step back and observe from the side at a safe distance"
    },
    {
     "ru": "Проверить воду пальцем",
     "uz-Latn": "Suvni barmoq bilan tekshirish",
     "en": "Test the water with a finger"
    }
   ],
   "correctAction": 1
  }
 ],
 "signs": [
  {
   "id": "irritant",
   "name": {
    "ru": "Раздражение и вредное воздействие паров",
    "uz-Latn": "Ta’sirlantiruvchi va zararli bug‘lar",
    "en": "Irritation and harmful vapours"
   }
  },
  {
   "id": "explosive",
   "name": {
    "ru": "Взрывоопасные вещества",
    "uz-Latn": "Portlovchi moddalar",
    "en": "Explosive substances"
   }
  },
  {
   "id": "corrosive",
   "name": {
    "ru": "Едкие вещества",
    "uz-Latn": "O‘yuvchi moddalar",
    "en": "Corrosive substances"
   }
  },
  {
   "id": "toxic",
   "name": {
    "ru": "Ядовитые вещества",
    "uz-Latn": "Zaharli moddalar",
    "en": "Toxic substances"
   }
  },
  {
   "id": "flammable",
   "name": {
    "ru": "Легковоспламеняющиеся вещества",
    "uz-Latn": "Oson yonuvchan moddalar",
    "en": "Flammable substances"
   }
  }
 ],
 "equipment": [
  {
   "id": "tube",
   "name": {
    "ru": "Пробирка",
    "uz-Latn": "Probirka",
    "en": "Test tube"
   },
   "purpose": {
    "ru": "Небольшие порции веществ и наблюдение реакций.",
    "uz-Latn": "Oz miqdordagi modda va reaksiyalarni kuzatish.",
    "en": "Small samples and observing reactions."
   },
   "bonus": false
  },
  {
   "id": "beaker",
   "name": {
    "ru": "Химический стакан",
    "uz-Latn": "Kimyoviy stakan",
    "en": "Beaker"
   },
   "purpose": {
    "ru": "Смешивание и нагрев; деления дают приблизительный объём.",
    "uz-Latn": "Aralashtirish va isitish; belgilar hajmni taxminan ko‘rsatadi.",
    "en": "Mixing and heating; markings indicate approximate volume."
   },
   "bonus": false
  },
  {
   "id": "dish",
   "name": {
    "ru": "Фарфоровая чашка",
    "uz-Latn": "Chinni kosacha",
    "en": "Evaporating dish"
   },
   "purpose": {
    "ru": "Выпаривание раствора и получение твёрдого остатка.",
    "uz-Latn": "Eritmani bug‘latish va qattiq qoldiq olish.",
    "en": "Evaporating a solution to leave a solid residue."
   },
   "bonus": false
  },
  {
   "id": "flask",
   "name": {
    "ru": "Коническая колба",
    "uz-Latn": "Konussimon kolba",
    "en": "Conical flask"
   },
   "purpose": {
    "ru": "Перемешивание раствора круговым движением без разбрызгивания.",
    "uz-Latn": "Eritmani sachratmasdan aylantirib aralashtirish.",
    "en": "Swirling a solution with less splashing."
   },
   "bonus": false
  },
  {
   "id": "funnel",
   "name": {
    "ru": "Воронка",
    "uz-Latn": "Voronka",
    "en": "Funnel"
   },
   "purpose": {
    "ru": "Переливание жидкости; с фильтром — отделение твёрдых частиц.",
    "uz-Latn": "Suyuqlik quyish; filtr bilan qattiq zarrachalarni ajratish.",
    "en": "Transferring liquid; with filter paper, separating solids."
   },
   "bonus": false
  },
  {
   "id": "cylinder",
   "name": {
    "ru": "Мерный цилиндр",
    "uz-Latn": "O‘lchov silindri",
    "en": "Measuring cylinder"
   },
   "purpose": {
    "ru": "Отмеривание объёма по шкале.",
    "uz-Latn": "Shkala bo‘yicha hajm o‘lchash.",
    "en": "Measuring liquid volume with a scale."
   },
   "bonus": false
  },
  {
   "id": "stand",
   "name": {
    "ru": "Штатив с лапкой",
    "uz-Latn": "Qisqichli shtativ",
    "en": "Clamp stand"
   },
   "purpose": {
    "ru": "Удерживает пробирку и другие приборы.",
    "uz-Latn": "Probirka va boshqa jihozlarni ushlab turadi.",
    "en": "Supports test tubes and other apparatus."
   },
   "bonus": true
  },
  {
   "id": "tripod",
   "name": {
    "ru": "Треножник",
    "uz-Latn": "Uchoyoq",
    "en": "Tripod"
   },
   "purpose": {
    "ru": "Поддерживает посуду над горелкой.",
    "uz-Latn": "Idishni gorelka ustida ushlab turadi.",
    "en": "Supports vessels above a burner."
   },
   "bonus": true
  },
  {
   "id": "gauze",
   "name": {
    "ru": "Сетка",
    "uz-Latn": "Sim to‘r",
    "en": "Wire gauze"
   },
   "purpose": {
    "ru": "Поддерживает сосуд и распределяет тепло.",
    "uz-Latn": "Idishni tutib, issiqlikni taqsimlaydi.",
    "en": "Supports vessels and distributes heat."
   },
   "bonus": true
  },
  {
   "id": "burette",
   "name": {
    "ru": "Бюретка",
    "uz-Latn": "Byuretka",
    "en": "Burette"
   },
   "purpose": {
    "ru": "Точное дозирование жидкости через кран.",
    "uz-Latn": "Jo‘mrak orqali suyuqlikni aniq dozalash.",
    "en": "Delivering precise liquid volumes through a tap."
   },
   "bonus": true
  },
  {
   "id": "burner",
   "name": {
    "ru": "Горелка Бунзена",
    "uz-Latn": "Bunzen gorelkasi",
    "en": "Bunsen burner"
   },
   "purpose": {
    "ru": "Регулируемый источник нагрева в лаборатории.",
    "uz-Latn": "Laboratoriyada boshqariladigan issiqlik manbai.",
    "en": "An adjustable laboratory heat source."
   },
   "bonus": true
  }
 ],
 "parts": [
  {
   "id": "nozzle",
   "name": {
    "ru": "Трубка",
    "uz-Latn": "Mo‘ri",
    "en": "Burner tube"
   }
  },
  {
   "id": "airHole",
   "name": {
    "ru": "Отверстие для воздуха",
    "uz-Latn": "Havo kirishi uchun teshik",
    "en": "Air inlet"
   }
  },
  {
   "id": "collar",
   "name": {
    "ru": "Муфта-регулятор",
    "uz-Latn": "Havo oqimini nazorat qiluvchi nay",
    "en": "Air-control collar"
   }
  },
  {
   "id": "inlet",
   "name": {
    "ru": "Подача газа",
    "uz-Latn": "Gaz o‘tkazuvchi nay",
    "en": "Gas inlet"
   }
  },
  {
   "id": "base",
   "name": {
    "ru": "Подставка",
    "uz-Latn": "Taglik",
    "en": "Base"
   }
  },
  {
   "id": "tap",
   "name": {
    "ru": "Газовый кран",
    "uz-Latn": "Gaz miqdorini nazorat qiluvchi jo‘mrak",
    "en": "Gas tap"
   }
  }
 ],
 "functions": [
  {
   "id": "airHole",
   "text": {
    "ru": "Пропускает воздух внутрь",
    "uz-Latn": "Havoni ichkariga o‘tkazadi",
    "en": "Lets air enter"
   }
  },
  {
   "id": "collar",
   "text": {
    "ru": "Изменяет открытие воздушных отверстий",
    "uz-Latn": "Havo teshiklarini ochib-yopadi",
    "en": "Opens or closes air inlets"
   }
  },
  {
   "id": "nozzle",
   "text": {
    "ru": "Поднимает пламя над основанием",
    "uz-Latn": "Alangani taglikdan yuqoriga chiqaradi",
    "en": "Raises the flame above the base"
   }
  },
  {
   "id": "tap",
   "text": {
    "ru": "Регулирует поток газа",
    "uz-Latn": "Gaz oqimini boshqaradi",
    "en": "Controls the gas flow"
   }
  }
 ],
 "quiz": [
  {
   "id": "fire",
   "prompt": {
    "ru": "Какое действие создаёт прямой риск пожара?",
    "uz-Latn": "Qaysi harakat yong‘in xavfini tug‘diradi?",
    "en": "Which action creates a direct fire risk?"
   },
   "options": [
    {
     "ru": "Убрать рабочее место",
     "uz-Latn": "Ish joyini yig‘ish",
     "en": "Tidy the workspace"
    },
    {
     "ru": "Оставить зажжённую горелку и уйти",
     "uz-Latn": "Yoqilgan gorelkani qoldirib ketish",
     "en": "Leave a lit burner and walk away"
    },
    {
     "ru": "Закрыть газовый кран",
     "uz-Latn": "Gaz jo‘mragini yopish",
     "en": "Close the gas tap"
    },
    {
     "ru": "Надеть очки",
     "uz-Latn": "Ko‘zoynak taqish",
     "en": "Put on goggles"
    }
   ],
   "correct": 1
  },
  {
   "id": "lids",
   "prompt": {
    "ru": "Что может загрязнить реактивы и запрещено в лаборатории?",
    "uz-Latn": "Qaysi harakat reaktivlarni ifloslantirishi mumkin va taqiqlanadi?",
    "en": "Which prohibited action can contaminate reagents?"
   },
   "options": [
    {
     "ru": "Вернуть склянке её собственную крышку",
     "uz-Latn": "Idishning o‘z qopqog‘ini yopish",
     "en": "Replace a bottle’s own lid"
    },
    {
     "ru": "Прочитать этикетку",
     "uz-Latn": "Yorliqni o‘qish",
     "en": "Read the label"
    },
    {
     "ru": "Менять крышки разных склянок местами",
     "uz-Latn": "Turli idishlar qopqog‘ini almashtirish",
     "en": "Swap lids between reagent bottles"
    },
    {
     "ru": "Убрать отходы в назначенную ёмкость",
     "uz-Latn": "Chiqindini belgilangan idishga tashlash",
     "en": "Put waste in its designated container"
    }
   ],
   "correct": 2
  },
  {
   "id": "corrosion",
   "prompt": {
    "ru": "На этикетке капли разрушают руку и поверхность. О чём предупреждение?",
    "uz-Latn": "Yorliqda tomchilar qo‘l va yuzani yemirmoqda. Bu qanday xavf?",
    "en": "A label shows drops damaging a hand and a surface. What is the hazard?"
   },
   "options": [
    {
     "ru": "Едкое вещество",
     "uz-Latn": "O‘yuvchi modda",
     "en": "Corrosive substance"
    },
    {
     "ru": "Только высокая температура",
     "uz-Latn": "Faqat yuqori harorat",
     "en": "High temperature only"
    },
    {
     "ru": "Только яркий цвет",
     "uz-Latn": "Faqat yorqin rang",
     "en": "Bright colour only"
    },
    {
     "ru": "Безопасная вода",
     "uz-Latn": "Xavfsiz suv",
     "en": "Safe water"
    }
   ],
   "correct": 0
  },
  {
   "id": "volume",
   "prompt": {
    "ru": "Нужно точно дозировать 25 мл жидкости. Что лучше подходит?",
    "uz-Latn": "25 ml suyuqlikni aniq dozalash kerak. Qaysi jihoz mos?",
    "en": "You need to deliver 25 ml accurately. Which tool is best?"
   },
   "options": [
    {
     "ru": "Обычный стакан",
     "uz-Latn": "Oddiy stakan",
     "en": "Ordinary beaker"
    },
    {
     "ru": "Воронка",
     "uz-Latn": "Voronka",
     "en": "Funnel"
    },
    {
     "ru": "Коническая колба",
     "uz-Latn": "Konussimon kolba",
     "en": "Conical flask"
    },
    {
     "ru": "Бюретка",
     "uz-Latn": "Byuretka",
     "en": "Burette"
    }
   ],
   "correct": 3
  }
 ],
 "order": [
  {
   "ru": "Надеть очки",
   "uz-Latn": "Ko‘zoynak taqish",
   "en": "Wear goggles"
  },
  {
   "ru": "Налить воду на треть и закрепить держатель",
   "uz-Latn": "Uchdan bir suv quyib qisqichni o‘rnatish",
   "en": "Fill one third and attach the holder"
  },
  {
   "ru": "Получить голубое пламя",
   "uz-Latn": "Ko‘kimtir alanga hosil qilish",
   "en": "Establish a blue flame"
  },
  {
   "ru": "Наклонить от людей примерно на 45°",
   "uz-Latn": "Odamlardan nariga taxminan 45° qiya tutish",
   "en": "Tilt about 45° away from people"
  },
  {
   "ru": "Перемещать пробирку, нагревая ниже воды",
   "uz-Latn": "Suvdan pastini isitib, probirkani siljitish",
   "en": "Move the tube while heating below water level"
  },
  {
   "ru": "При кипении закрыть газ",
   "uz-Latn": "Qaynaganda gazni yopish",
   "en": "Close the gas when boiling"
  }
 ],
 "swipes": [
  {
   "prompt": {
    "ru": "Воздух закрыт",
    "uz-Latn": "Havo yopiq",
    "en": "Air inlets closed"
   },
   "answer": "yellow"
  },
  {
   "prompt": {
    "ru": "На дне чашки появилась сажа",
    "uz-Latn": "Idish tagida qurum paydo bo‘ldi",
    "en": "Soot forms on the dish"
   },
   "answer": "yellow"
  },
  {
   "prompt": {
    "ru": "Подходит для нагрева",
    "uz-Latn": "Isitishga mos",
    "en": "Suitable for heating"
   },
   "answer": "blue"
  },
  {
   "prompt": {
    "ru": "При умеренной подаче более горячее и ровное",
    "uz-Latn": "Gaz me’yorida issiqroq va barqaror",
    "en": "Hotter and steadier at moderate flow"
   },
   "answer": "blue"
  },
  {
   "prompt": {
    "ru": "Труднее заметить на ярком фоне",
    "uz-Latn": "Yorug‘ fonda payqash qiyin",
    "en": "Harder to see against a bright background"
   },
   "answer": "blue"
  }
 ],
 "selfSkills": [
  {
   "title": {
    "ru": "Безопасные действия",
    "uz-Latn": "Xavfsiz harakatlar",
    "en": "Safe actions"
   },
   "task": "danger-a"
  },
  {
   "title": {
    "ru": "Знаки опасности",
    "uz-Latn": "Xavf belgilari",
    "en": "Hazard signs"
   },
   "task": "signs"
  },
  {
   "title": {
    "ru": "Названия и применение приборов",
    "uz-Latn": "Jihoz nomlari va vazifalari",
    "en": "Equipment names and uses"
   },
   "task": "museum"
  },
  {
   "title": {
    "ru": "Части горелки",
    "uz-Latn": "Gorelka qismlari",
    "en": "Burner parts"
   },
   "task": "burner-parts"
  },
  {
   "title": {
    "ru": "Жёлтое и голубое пламя",
    "uz-Latn": "Sarg‘ish va ko‘kimtir alanga",
    "en": "Yellow and blue flames"
   },
   "task": "flames"
  }
 ],
 "source": {
  "title": "Kimyo. 7-sinf uchun mashq daftari",
  "author": "Ho Pek Leng",
  "publisher": "Novda Edutainment / Marshall Cavendish Education",
  "year": 2026,
  "pages": "4–16",
  "use": "Structure and learning goals only; original wording and illustrations."
 }
};
/* Canonical IDs are language-independent; textbook letters are presentation data. */
const SafetySituations=(()=>{
 const ids=['danger-a','danger-b','danger-c','danger-d'];
 const copy={ru:{letters:['A','B','C','D'],heading:'Практическая работа 1.1 · Ситуация {letter} из 4',situation:'СИТУАЦИЯ {letter}',previous:'← Ситуация {letter}',next:'Ситуация {letter} →'},'uz-Latn':{letters:['A','B','D','E'],heading:'1.1-amaliy ish · 4 vaziyatdan {letter} vaziyat',situation:'{letter} VAZIYAT',previous:'← {letter} vaziyat',next:'{letter} vaziyat →'},'uz-Cyrl':{letters:['A','B','D','E'],heading:'1.1-амалий иш · 4 вазиятдан {letter} вазият',situation:'{letter} ВАЗИЯТ',previous:'← {letter} вазият',next:'{letter} вазият →'},en:{letters:['A','B','C','D'],heading:'Practical work 1.1 · Situation {letter} of 4',situation:'SITUATION {letter}',previous:'← Situation {letter}',next:'Situation {letter} →'}};
 const text=lang=>copy[lang]||copy.ru;
 const letter=(id,lang)=>text(lang).letters[ids.indexOf(id)]||'';
 function navigation(lang,done=()=>false){return ids.map(id=>({id,label:letter(id,lang),done:done(id)}));}
 function decorate(scenario){const index=ids.indexOf(scenario.id);for(const [lang,t] of Object.entries(scenario.copy)){const c=text(lang),format=(key,i)=>c[key].replace('{letter}',c.letters[i]);t.heading=format('heading',index);t.situation=format('situation',index);if(index>0)t.previous=format('previous',index-1);if(index<ids.length-1)t.next=format('next',index+1);}return scenario;}
 const oldId=id=>id==='danger-d'?'danger-c':id==='danger-e'?'danger-d':id;
 const oldExperiment=id=>id==='intro-danger-d'?'intro-danger-c':id==='intro-danger-e'?'intro-danger-d':id;
 function migrateIntro(value){if(value?.version!==1)return value;return {...value,version:2,task:oldId(value.task),rows:Object.fromEntries(Object.entries(value.rows||{}).map(([id,row])=>[oldId(id),row]))};}
 function migrateSave(value){if(value?.intro?.version!==1)return value;const out={...value,intro:migrateIntro(value.intro)};if(value.game){const g=value.game;out.game={...g,rewards:Object.fromEntries(Object.entries(g.rewards||{}).map(([key,date])=>[key.startsWith('exp:')?'exp:'+oldExperiment(key.slice(4)):key,date])),daily:Object.fromEntries(Object.entries(g.daily||{}).map(([day,id])=>[day,oldExperiment(id)]))};}return out;}
 return {ids,copy,letter,navigation,decorate,migrateIntro,migrateSave};
})();
for(const task of [...IntroData.tasks,...IntroData.dangers])if(SafetySituations.ids.includes(task.id))task.letter=Object.fromEntries(Object.keys(SafetySituations.copy).map(lang=>[lang,SafetySituations.letter(task.id,lang)]));

for(const part of IntroData.parts)part.purpose=IntroData.functions.find(f=>f.id===part.id)?.text||(part.id==='base'?{ru:'Обеспечивает устойчивость прибора.','uz-Latn':'Jihozning barqaror turishini ta’minlaydi.',en:'Keeps the burner stable.'}:{ru:'Проводит газ к горелке.','uz-Latn':'Gazni gorelkaga yetkazadi.',en:'Carries gas to the burner.'});
IntroData.symbols={irritant:{ru:'Восклицательный знак','uz-Latn':'Undov belgisi',en:'Exclamation mark'},explosive:{ru:'Взрыв','uz-Latn':'Portlash',en:'Exploding bomb'},corrosive:{ru:'Капли на руке и поверхности','uz-Latn':'Qo‘l va yuzaga tomchilar',en:'Drops on a hand and surface'},toxic:{ru:'Череп','uz-Latn':'Bosh suyagi',en:'Skull'},flammable:{ru:'Пламя','uz-Latn':'Alanga',en:'Flame'}};
/* Ответы и критерии урока находятся в данных, а не в модулях отрисовки. */
IntroData.rules={
 assembly:['stand','tube','beaker','gauze','tripod','burner'],
 labels:{a:'beaker',b:'tripod',d:'dish',e:'burner'},
 safeTube:['goggles','holder','blue','angle','away','motion','boiled','off'],
 flameAnswers:{yellowInner:'dark',yellowOuter:'yellowColor',blueInner:'dark',blueOuter:'blueColor',yellowStable:'flicker',blueStable:'steady',idle:'visible'},
 race:{yellowTime:20,blueTime:12,tolerance:.5,variable:'flameType',controlled:['volume','gasFlow','dishes','distance'],conclusion:'blueBetter'},
 research:{goal:'researchGoal',variable:'area',controls:'sameConditions',measure:'remaining'},
 passPercent:80
};
/* Старую работу о безопасности сохраняем как архив, не выдавая за зачёт новой главы. */
IntroData.ui.water={ru:'Вода','uz-Latn':'Suv',en:'Water'};IntroData.ui.ethanol={ru:'Спирт','uz-Latn':'Spirt',en:'Alcohol'};IntroData.ui.thermometer={ru:'Термометр','uz-Latn':'Termometr',en:'Thermometer'};IntroData.ui.solution={ru:'Раствор медного купороса','uz-Latn':'Mis (II) sulfat eritmasi',en:'Copper sulfate solution'};IntroData.ui.introDescription={ru:'Безопасность, оборудование и первые учебные опыты с горелкой.','uz-Latn':'Xavfsizlik, jihozlar va gorelka bilan ilk o‘quv tajribalari.',en:'Safety, equipment and first learning experiments with a burner.'};
CourseData.legacySafety=CourseData.topics[0];
CourseData.topics[0]={id:'intro',number:1,title:IntroData.title,icon:'topic-01-intro',color:'#148d78',description:IntroData.ui.introDescription,ready:true,steps:{theory:[],experiments:IntroData.tasks.map(task=>({id:'intro-'+task.id,kind:'intro',key:task.id,title:task.title,...(task.id==='evap-labels'?{icon:'exp-filtration'}:{}),minutes:task.work==='bunsen'?5:3,difficulty:task.work==='bunsen'?2:1,substance:null})),quiz:IntroData.quiz}};
CourseData.topics.splice(1,0,{id:'states',number:2,title:IntroData.ui.states,description:IntroData.ui.stateHint,icon:'topic-02-states',color:'#3a96c6',ready:true,steps:{theory:[
 {ru:'Твёрдое тело обычно сохраняет собственную форму и объём. В модели сравним его с жидкостью и газом.','uz-Latn':'Qattiq jism odatda o‘z shakli va hajmini saqlaydi. Modelda uni suyuqlik va gaz bilan solishtiramiz.',en:'A solid normally retains its own shape and volume. Compare it with a liquid and a gas in the model.'},
 {ru:'Жидкость сохраняет объём, но принимает форму занятой части сосуда.','uz-Latn':'Suyuqlik hajmini saqlaydi, lekin idishning egallagan qismi shaklini oladi.',en:'A liquid retains its volume but takes the shape of the part of the vessel it occupies.'},
 {ru:'Газ заполняет доступный объём сосуда. Его частицы находятся далеко друг от друга.','uz-Latn':'Gaz idishning mavjud hajmini egallaydi. Uning zarrachalari bir-biridan uzoq joylashgan.',en:'A gas fills the available volume of a vessel. Its particles are widely separated.'}
 ],experiments:['solid','liquid','gasState'].map(key=>({id:'states-'+key,kind:'states',key,title:IntroData.ui[key],minutes:2,difficulty:1,substance:null})),quiz:[
 {prompt:{ru:'Что обычно сохраняет форму без сосуда?','uz-Latn':'Odatda qaysi holat idishsiz shaklini saqlaydi?',en:'Which state normally keeps its shape without a vessel?'},options:[IntroData.ui.solid,IntroData.ui.liquid,IntroData.ui.gasState],correct:0},
 {prompt:{ru:'В каком состоянии вода в стакане при комнатной температуре?','uz-Latn':'Xona haroratida stakandagi suv qanday holatda?',en:'What state is water in a beaker at room temperature?'},options:[IntroData.ui.gasState,IntroData.ui.liquid,IntroData.ui.solid],correct:1},
 {prompt:{ru:'Как ведёт себя газ в закрытой ёмкости?','uz-Latn':'Gaz yopiq idishda qanday joylashadi?',en:'How does a gas behave in a closed container?'},options:[{ru:'Лежит одним кусочком','uz-Latn':'Bir bo‘lak bo‘lib yotadi',en:'Remains as a single chunk'},{ru:'Сохраняет каплевидную форму','uz-Latn':'Tomchi shaklini saqlaydi',en:'Keeps a droplet shape'},{ru:'Заполняет доступный объём','uz-Latn':'Mavjud hajmni egallaydi',en:'Fills the available volume'}],correct:2},
 {prompt:{ru:'Что сохраняет жидкость при переливании без потерь?','uz-Latn':'To‘kilmasdan quyilganda suyuqlik nimani saqlaydi?',en:'What does a liquid retain when transferred without loss?'},options:[{ru:'Объём','uz-Latn':'Hajm',en:'Volume'},{ru:'Форму старого сосуда','uz-Latn':'Oldingi idish shakli',en:'The old vessel’s shape'},{ru:'Форму твёрдого тела','uz-Latn':'Qattiq jism shakli',en:'The shape of a solid'}],correct:0},
 {prompt:{ru:'Какое состояние соответствует кристаллу соли?','uz-Latn':'Tuz kristali qaysi holatga mos?',en:'What state is a salt crystal?'},options:[IntroData.ui.gasState,IntroData.ui.solid,IntroData.ui.liquid],correct:1}
 ]}});
CourseData.topics.forEach((topic,index)=>topic.number=index+1);
CourseData.badges.push({id:'chapter-intro',title:{ru:'Безопасность прежде всего','uz-Latn':'Avvalo xavfsizlik',en:'Safety comes first'},hint:{ru:'Заверши все работы введения, самооценку и закрепление с результатом не менее 80%.','uz-Latn':'Kirishdagi barcha ishlar, o‘z-o‘zini baholash va mustahkamlashni kamida 80% bilan tugat.',en:'Complete all introductory activities, self-assessment and at least 80% in the review.'}});
