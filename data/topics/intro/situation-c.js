/* Situation C: vapour effects, ordered safety steps and forbidden actions. */
const SituationC={
  "id": "danger-c",
  "previous": "danger-b",
  "frames": [
    "assets/lab/1-1/c-1-start.webp",
    "assets/lab/1-1/c-2-sniff.webp",
    "assets/lab/1-1/c-3-dizzy.webp",
    "assets/lab/1-1/c-4-safe.webp"
  ],
  "stages": [
    {
      "at": 0,
      "frame": 0,
      "zoom": 1.06,
      "effect": "vapour-lines"
    },
    {
      "at": 3,
      "frame": 1,
      "zoom": 1.35,
      "effect": "inhale"
    },
    {
      "at": 6,
      "frame": 2,
      "zoom": 1.35,
      "effect": "dizzy"
    },
    {
      "at": 9,
      "frame": 2,
      "zoom": 1,
      "effect": "question"
    },
    {
      "at": 12,
      "frame": 3,
      "zoom": 1,
      "effect": "confetti",
      "points": {
        "rim": {
          "x": 61,
          "y": 46
        },
        "nose": {
          "x": 54,
          "y": 41
        }
      }
    }
  ],
  "zones": {
    "tube": {
      "x": 55,
      "y": 40,
      "w": 4,
      "h": 13
    },
    "face": {
      "x": 45,
      "y": 24,
      "w": 13,
      "h": 22
    },
    "vapour": {
      "x": 43,
      "y": 25,
      "w": 20,
      "h": 22
    }
  },
  "hotspots": [
    {
      "id": "vapour",
      "zone": "vapour",
      "label": "vapourLabel"
    }
  ],
  "hintZone": "vapour",
  "hintAt": null,
  "cameraZone": "face",
  "helperPlacement": "top-right",
  "effectPoints": {
    "rim": {
      "x": 56.7,
      "y": 40.5
    },
    "nose": {
      "x": 54,
      "y": 39
    }
  },
  "successEffect": "waft-fan",
  "questions": {
    "type": "order",
    "risk": {
      "correct": [
        0
      ]
    },
    "order": {
      "correct": [
        0,
        1,
        2,
        3
      ]
    },
    "actions": {
      "correct": [
        0,
        1
      ]
    }
  },
  "copy": {
    "ru": {
      "title": "Нюхать вещество прямо из пробирки",
      "q1": "Нажми на сцене, что здесь опасно",
      "vapourLabel": "Пары вещества у лица",
      "hint": "Посмотри, как близко пары оказались к носу Мадины…",
      "inspect": "Найди опасность рядом с лицом Мадины.",
      "q2": "Чем это опасно?",
      "q3": "Как правильно определить запах?",
      "orderHelp": "Расставь шаги по порядку. Проверять запах можно только с разрешения учителя.",
      "orderWrong": "Порядок пока неверный. Сначала отодвинь пробирку и направь отверстие от себя.",
      "moveUp": "Выше",
      "moveDown": "Ниже",
      "moveStep": "Переместить шаг",
      "neverQuestion": "Что из этого нельзя никогда?",
      "multiHint": "Отметь все запрещённые действия.",
      "stop": "Кхе-кхе! Так нюхать нельзя! 😵",
      "praise": "Вот так — ладонью к себе! 👋",
      "what": "Мадина вдохнула концентрированные пары прямо из пробирки. Она закашлялась, и у неё закружилась голова.",
      "why": [
        "Некоторые пары ядовиты или едки, например у хлора, аммиака и уксусной кислоты.",
        "Они могут обжечь слизистую носа и горла.",
        "Возможны кашель, головокружение и тошнота."
      ],
      "bad": [
        "Нюхать прямо из пробирки или колбы.",
        "Наклоняться над посудой с веществом.",
        "Пробовать вещества на вкус."
      ],
      "good": [
        "Держать пробирку на расстоянии от лица.",
        "Осторожно направлять воздух ладонью к себе.",
        "С пахучими веществами работать в вытяжном шкафу.",
        "Определять запах только с разрешения учителя."
      ],
      "helpTitle": "⑤ Если стало плохо",
      "help": "Сразу прекрати опыт, отойди на свежий воздух и скажи учителю. Если трудно дышать или самочувствие не улучшается, нужна медицинская помощь.",
      "imageNote": "Маска на рисунке не защищает от химических паров и не заменяет вытяжку.",
      "subtitles": [
        "Мадине интересно, чем пахнет раствор…",
        "Она вдыхает пары прямо из пробирки!",
        "Мадина кашляет: у неё кружится голова. Останови опыт!",
        "Найди опасность и помоги Мадине",
        "Только с разрешения учителя — ладонью направляем воздух к себе"
      ],
      "alts": [
        "Мадина подносит пробирку с раствором к лицу, над ней тонкий пар",
        "Мадина вдыхает пары прямо из пробирки",
        "Мадина кашляет и чувствует головокружение, вокруг лица облако пара",
        "Мадина держит пробирку на расстоянии и направляет воздух ладонью к себе"
      ],
      "risks": [
        "Пары некоторых веществ ядовиты: они обжигают нос и горло, вызывают кашель и головокружение",
        "Раствор может пролиться на пол",
        "Очки запотеют"
      ],
      "riskFeedback": [
        "Концентрированные пары могут повредить дыхательные пути.",
        "Пролив тоже опасен, но здесь Мадина вдыхает пары.",
        "Запотевшие очки не объясняют кашель и головокружение от паров."
      ],
      "orderSteps": [
        "Держать пробирку на расстоянии от лица",
        "Направить отверстие от себя",
        "Ладонью сделать несколько движений над пробиркой к себе",
        "Осторожно вдохнуть воздух, а не пары из пробирки"
      ],
      "actions": [
        "Пробовать вещества на вкус",
        "Нюхать прямо из пробирки или колбы",
        "Работать в вытяжном шкафу с пахучими веществами"
      ],
      "actionFeedback": [
        "Пробовать лабораторные вещества нельзя.",
        "Прямой вдох концентрированных паров опасен.",
        "Вытяжной шкаф нужен для такой работы. Это безопасная мера, а не запрет."
      ]
    },
    "uz-Latn": {
      "title": "Moddani to‘g‘ri probirkadan hidlash",
      "q1": "Sahnada nima xavfli ekanini tanla",
      "vapourLabel": "Yuz yonidagi modda bug‘i",
      "hint": "Bug‘ Madinaning burniga qanchalik yaqin kelganiga qara…",
      "inspect": "Madinaning yuzi yonidagi xavfni top.",
      "q2": "Bu nimasi bilan xavfli?",
      "q3": "Hidni qanday to‘g‘ri aniqlash kerak?",
      "orderHelp": "Qadamlarni tartibga qo‘y. Hidni faqat o‘qituvchi ruxsati bilan tekshirish mumkin.",
      "orderWrong": "Tartib hali to‘g‘ri emas. Avval probirkani uzoqlashtir va og‘zini o‘zingdan nariga qarat.",
      "moveUp": "Yuqoriga",
      "moveDown": "Pastga",
      "moveStep": "Qadamni ko‘chirish",
      "neverQuestion": "Qaysi harakatlar mutlaqo taqiqlangan?",
      "multiHint": "Barcha taqiqlangan harakatlarni belgilа.",
      "stop": "Yo‘tal! Bunday hidlash mumkin emas! 😵",
      "praise": "Mana shunday — kaft bilan havoni o‘zingga yo‘naltir! 👋",
      "what": "Madina to‘plangan bug‘ni bevosita probirkadan nafasiga oldi. U yo‘tala boshladi va boshi aylandi.",
      "why": [
        "Ba’zi bug‘lar zaharli yoki o‘yuvchi bo‘ladi, masalan xlor, ammiak va sirka kislotasi bug‘lari.",
        "Ular burun va tomoq shilliq qavatini kuydirishi mumkin.",
        "Yo‘tal, bosh aylanishi va ko‘ngil aynishi yuz beradi."
      ],
      "bad": [
        "Bevosita probirka yoki kolbadan hidlash.",
        "Modda solingan idish ustiga egilish.",
        "Laboratoriya moddalarini tatib ko‘rish."
      ],
      "good": [
        "Probirkani yuzdan uzoqda tut.",
        "Kaft bilan havoni sekin o‘zingga yo‘naltir.",
        "Hidli moddalar bilan tortma shkafda ishlа.",
        "Hidni faqat o‘qituvchi ruxsati bilan aniqlа."
      ],
      "helpTitle": "⑤ O‘zingni yomon his qilsang",
      "help": "Tajribani darhol to‘xtat, toza havoga chiq va o‘qituvchiga ayt. Nafas olish qiyinlashsa yoki ahvol yaxshilanmasa, tibbiy yordam kerak.",
      "imageNote": "Rasmdagi niqob kimyoviy bug‘lardan himoya qilmaydi va tortma shkaf o‘rnini bosmaydi.",
      "subtitles": [
        "Madina eritmaning hidi qanday ekaniga qiziqdi…",
        "U bug‘ni bevosita probirkadan nafasiga olyapti!",
        "Madina yo‘talyapti, boshi aylanyapti. Tajribani to‘xtat!",
        "Xavfni top va Madinaga yordam ber",
        "Faqat o‘qituvchi ruxsati bilan — havoni kaft bilan o‘zingga yo‘naltir"
      ],
      "alts": [
        "Madina probirkani yuziga yaqinlashtiryapti, undan ingichka bug‘ ko‘tarilmoqda",
        "Madina bug‘ni bevosita probirkadan nafasiga olyapti",
        "Madina yo‘talyapti va boshi aylanyapti, yuzi atrofida bug‘ buluti",
        "Madina probirkani uzoqda tutib, kafti bilan havoni o‘ziga yo‘naltiryapti"
      ],
      "risks": [
        "Ba’zi moddalarning bug‘i zaharli: burun va tomoqni kuydiradi, yo‘tal va bosh aylanishiga sabab bo‘ladi",
        "Eritma polga to‘kilishi mumkin",
        "Ko‘zoynak terlaydi"
      ],
      "riskFeedback": [
        "To‘plangan bug‘ nafas yo‘llariga zarar yetkazishi mumkin.",
        "To‘kilish ham xavfli, ammo bu yerda Madina bug‘ni nafasiga olyapti.",
        "Ko‘zoynak terlashidan bug‘ sababli yo‘tal va bosh aylanishi kelib chiqmaydi."
      ],
      "orderSteps": [
        "Probirkani yuzdan uzoqda tutish",
        "Og‘zini o‘zidan nariga qaratish",
        "Probirka ustida kaft bilan o‘ziga tomon bir necha marta yelpish",
        "Ehtiyotkorlik bilan havoni nafasga olish, probirkadagi bug‘ni emas"
      ],
      "actions": [
        "Moddalarni tatib ko‘rish",
        "Bevosita probirka yoki kolbadan hidlash",
        "Hidli moddalar bilan tortma shkafda ishlash"
      ],
      "actionFeedback": [
        "Laboratoriya moddalarini tatib ko‘rish mumkin emas.",
        "To‘plangan bug‘ni to‘g‘ridan-to‘g‘ri nafasga olish xavfli.",
        "Tortma shkaf himoya vositasi. Unda ishlash taqiqlanmaydi."
      ]
    },
    "uz-Cyrl": {
      "title": "Моддани тўғри пробиркадан ҳидлаш",
      "q1": "Саҳнада нима хавфли эканини танла",
      "vapourLabel": "Юз ёнидаги модда буғи",
      "hint": "Буғ Мадинанинг бурнига қанчалик яқин келганига қара…",
      "inspect": "Мадинанинг юзи ёнидаги хавфни топ.",
      "q2": "Бу нимаси билан хавфли?",
      "q3": "Ҳидни қандай тўғри аниқлаш керак?",
      "orderHelp": "Қадамларни тартибга қўй. Ҳидни фақат ўқитувчи рухсати билан текшириш мумкин.",
      "orderWrong": "Тартиб ҳали тўғри эмас. Аввал пробиркани узоқлаштир ва оғзини ўзингдан нарига қарат.",
      "moveUp": "Юқорига",
      "moveDown": "Пастга",
      "moveStep": "Қадамни кўчириш",
      "neverQuestion": "Қайси ҳаракатлар мутлақо тақиқланган?",
      "multiHint": "Барча тақиқланган ҳаракатларни белгила.",
      "stop": "Йўтал! Бундай ҳидлаш мумкин эмас! 😵",
      "praise": "Мана шундай — кафт билан ҳавони ўзингга йўналтир! 👋",
      "what": "Мадина тўпланган буғни бевосита пробиркадан нафасига олди. У йўтала бошлади ва боши айланди.",
      "why": [
        "Баъзи буғлар заҳарли ёки ўювчи бўлади, масалан хлор, аммиак ва сирка кислотаси буғлари.",
        "Улар бурун ва томоқ шиллиқ қаватини куйдириши мумкин.",
        "Йўтал, бош айланиши ва кўнгил айниши юз беради."
      ],
      "bad": [
        "Бевосита пробирка ёки колбадан ҳидлаш.",
        "Модда солинган идиш устига эгилиш.",
        "Лаборатория моддаларини татиб кўриш."
      ],
      "good": [
        "Пробиркани юздан узоқда тут.",
        "Кафт билан ҳавони секин ўзингга йўналтир.",
        "Ҳидли моддалар билан тортма шкафда ишла.",
        "Ҳидни фақат ўқитувчи рухсати билан аниқла."
      ],
      "helpTitle": "⑤ Ўзингни ёмон ҳис қилсанг",
      "help": "Тажрибани дарҳол тўхтат, тоза ҳавога чиқ ва ўқитувчига айт. Нафас олиш қийинлашса ёки аҳвол яхшиланмаса, тиббий ёрдам керак.",
      "imageNote": "Расмдаги ниқоб кимёвий буғлардан ҳимоя қилмайди ва тортма шкаф ўрнини босмайди.",
      "subtitles": [
        "Мадина эритманинг ҳиди қандай эканига қизиқди…",
        "У буғни бевосита пробиркадан нафасига оляпти!",
        "Мадина йўталяпти, боши айланяпти. Тажрибани тўхтат!",
        "Хавфни топ ва Мадинага ёрдам бер",
        "Фақат ўқитувчи рухсати билан — ҳавони кафт билан ўзингга йўналтир"
      ],
      "alts": [
        "Мадина пробиркани юзига яқинлаштиряпти, ундан ингичка буғ кўтарилмоқда",
        "Мадина буғни бевосита пробиркадан нафасига оляпти",
        "Мадина йўталяпти ва боши айланяпти, юзи атрофида буғ булути",
        "Мадина пробиркани узоқда тутиб, кафти билан ҳавони ўзига йўналтиряпти"
      ],
      "risks": [
        "Баъзи моддаларнинг буғи заҳарли: бурун ва томоқни куйдиради, йўтал ва бош айланишига сабаб бўлади",
        "Эритма полга тўкилиши мумкин",
        "Кўзойнак терлайди"
      ],
      "riskFeedback": [
        "Тўпланган буғ нафас йўлларига зарар етказиши мумкин.",
        "Тўкилиш ҳам хавфли, аммо бу ерда Мадина буғни нафасига оляпти.",
        "Кўзойнак терлашидан буғ сабабли йўтал ва бош айланиши келиб чиқмайди."
      ],
      "orderSteps": [
        "Пробиркани юздан узоқда тутиш",
        "Оғзини ўзидан нарига қаратиш",
        "Пробирка устида кафт билан ўзига томон бир неча марта елпиш",
        "Эҳтиёткорлик билан ҳавони нафасга олиш, пробиркадаги буғни эмас"
      ],
      "actions": [
        "Моддаларни татиб кўриш",
        "Бевосита пробирка ёки колбадан ҳидлаш",
        "Ҳидли моддалар билан тортма шкафда ишлаш"
      ],
      "actionFeedback": [
        "Лаборатория моддаларини татиб кўриш мумкин эмас.",
        "Тўпланган буғни тўғридан-тўғри нафасга олиш хавфли.",
        "Тортма шкаф ҳимоя воситаси. Унда ишлаш тақиқланмайди."
      ]
    },
    "en": {
      "title": "Smelling directly from a test tube",
      "q1": "Select what is dangerous in the scene",
      "vapourLabel": "Chemical vapour near the face",
      "hint": "Look at how close the vapour is to Madina’s nose…",
      "inspect": "Find the danger near Madina’s face.",
      "q2": "Why is this dangerous?",
      "q3": "How should a smell be checked?",
      "orderHelp": "Put the steps in order. Only check a smell if your teacher permits it.",
      "orderWrong": "The order is not correct yet. Move the tube away and point its opening away first.",
      "moveUp": "Move up",
      "moveDown": "Move down",
      "moveStep": "Move step",
      "neverQuestion": "Which actions are never allowed?",
      "multiHint": "Select all prohibited actions.",
      "stop": "Cough, cough! Never smell like that! 😵",
      "praise": "That’s it — waft the air with your hand! 👋",
      "what": "Madina inhaled concentrated vapour directly from the test tube. She started coughing and felt dizzy.",
      "why": [
        "Some vapours are toxic or corrosive, including chlorine, ammonia and acetic acid vapours.",
        "They can burn the lining of the nose and throat.",
        "They may cause coughing, dizziness and nausea."
      ],
      "bad": [
        "Smell directly from a test tube or flask.",
        "Lean over a container holding a substance.",
        "Taste laboratory substances."
      ],
      "good": [
        "Keep the tube away from the face.",
        "Gently waft air towards yourself with your hand.",
        "Use a fume hood when working with strong-smelling substances.",
        "Only check a smell with your teacher’s permission."
      ],
      "helpTitle": "⑤ If you feel unwell",
      "help": "Stop the experiment, move to fresh air and tell your teacher immediately. Seek medical help for breathing difficulty or symptoms that do not improve.",
      "imageNote": "The mask in the illustration does not protect against chemical vapours or replace a fume hood.",
      "subtitles": [
        "Madina wonders what the solution smells like…",
        "She inhales vapour directly from the tube!",
        "Madina is coughing and feels dizzy. Stop the experiment!",
        "Find the danger and help Madina",
        "Only with teacher permission — gently waft air towards yourself"
      ],
      "alts": [
        "Madina brings a test tube near her face; thin vapour rises above it",
        "Madina inhales vapour directly from the test tube",
        "Madina coughs and feels dizzy, with vapour around her face",
        "Madina holds the tube away and wafts air with her hand"
      ],
      "risks": [
        "Some vapours are toxic: they can burn the nose and throat and cause coughing and dizziness",
        "The solution may spill on the floor",
        "The goggles may fog up"
      ],
      "riskFeedback": [
        "Concentrated vapours can injure the airways.",
        "Spills are also hazardous, but Madina is inhaling vapour here.",
        "Foggy goggles do not explain coughing and dizziness from vapour."
      ],
      "orderSteps": [
        "Hold the test tube away from the face",
        "Point its opening away from yourself",
        "Gently wave your hand over the tube towards yourself",
        "Carefully breathe in the air, not vapour directly from the tube"
      ],
      "actions": [
        "Taste substances",
        "Smell directly from a test tube or flask",
        "Work in a fume hood with strong-smelling substances"
      ],
      "actionFeedback": [
        "Laboratory substances must never be tasted.",
        "Direct inhalation of concentrated vapour is dangerous.",
        "A fume hood is a protective measure, not a prohibited action."
      ]
    }
  }
};
for(const lang of Object.keys(SituationC.copy))SituationC.copy[lang]={...SituationA.copy[lang],...SituationC.copy[lang]};
SafetySituations.decorate(SituationC);
{
 const title=Object.fromEntries(Object.entries(SituationC.copy).map(([lang,c])=>[lang,c.title]));
 IntroData.tasks.find(t=>t.id===SituationC.id).title=title;
 IntroData.dangers.find(d=>d.id===SituationC.id).title=title;
 CourseData.topics.find(t=>t.id==='intro').steps.experiments.find(e=>e.key===SituationC.id).title=title;
}
