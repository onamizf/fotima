/* Situation B. Zones are calibrated against the question frame; debug mode exports edits. */
const SituationB={
  "id": "danger-b",
  "letter": "B",
  "previous": "danger-a",
  "frames": [
    "assets/lab/1-1/b-1-start.webp",
    "assets/lab/1-1/b-2-boil.webp",
    "assets/lab/1-1/b-3-splash.webp",
    "assets/lab/1-1/b-4-safe.webp"
  ],
  "stages": [
    {
      "at": 0,
      "frame": 0,
      "zoom": 1.06,
      "effect": "hint"
    },
    {
      "at": 3,
      "frame": 1,
      "zoom": 1.3,
      "effect": "boiling",
      "points": {
        "rim": {
          "x": 54,
          "y": 42
        },
        "tubeBottom": {
          "x": 57,
          "y": 53
        }
      }
    },
    {
      "at": 6,
      "frame": 2,
      "zoom": 1.3,
      "effect": "tube-splash"
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
      "effect": "confetti"
    }
  ],
  "zones": {
    "goggles": {
      "x": 62,
      "y": 63,
      "w": 12,
      "h": 9
    },
    "tube": {
      "x": 51,
      "y": 40,
      "w": 7,
      "h": 19
    },
    "flame": {
      "x": 55.5,
      "y": 54,
      "w": 4,
      "h": 15
    },
    "face": {
      "x": 45,
      "y": 20,
      "w": 12,
      "h": 25
    }
  },
  "hintZone": "goggles",
  "cameraZone": "tube",
  "hotspots": [
    {
      "id": "goggles",
      "zone": "goggles",
      "label": "gogglesLabel"
    },
    {
      "id": "tube",
      "zone": "tube",
      "label": "tubeLabel"
    }
  ],
  "effectPoints": {
    "rim": {
      "x": 56,
      "y": 42
    },
    "tubeBottom": {
      "x": 52.5,
      "y": 57
    },
    "face": {
      "x": 51,
      "y": 34
    },
    "flame": {
      "x": 57.4,
      "y": 59
    }
  },
  "successEffect": "goggles-flight",
  "questions": {
    "risk": {
      "correct": [
        0
      ]
    },
    "actions": {
      "correct": [
        0,
        1,
        2,
        3
      ]
    }
  },
  "copy": {
    "ru": {
      "title": "Нагревание без защитных очков",
      "heading": "Практическая работа 1.1 · Ситуация B из 4",
      "situation": "СИТУАЦИЯ B",
      "q1": "Нажми на сцене, что здесь не так",
      "found": "Найдено {n} / {total}",
      "gogglesLabel": "Очки не надеты",
      "tubeLabel": "Пробирка без держателя и направлена на себя",
      "hint": "Проверь, где очки Тимура и как он держит пробирку…",
      "q2": "Чем это опасно?",
      "q3": "Как нужно нагревать пробирку?",
      "previous": "← Ситуация A",
      "next": "Ситуация D →",
      "stop": "Ой! А где твои очки? 😱",
      "praise": "Глаза в безопасности! 👍",
      "what": "Жидкость перегрелась и выплеснулась к лицу. Глаза Тимура не были защищены очками.",
      "why": [
        "Горячая жидкость и пар могут обжечь лицо.",
        "Капли реактива могут повредить глаза и зрение.",
        "Горячее стекло обжигает пальцы."
      ],
      "bad": [
        "Нагревать без защитных очков.",
        "Держать нагреваемую пробирку пальцами.",
        "Направлять отверстие на себя или соседа.",
        "Наклоняться над нагреваемой посудой."
      ],
      "good": [
        "Надеть очки до начала работы и не снимать до конца.",
        "Закрепить держатель на верхней трети пробирки.",
        "Наклонить примерно на 45°, отверстие направить от людей.",
        "Сначала равномерно прогреть всю пробирку, затем нагревать жидкость, плавно перемещая пробирку."
      ],
      "helpTitle": "⑤ Если всё-таки попало в глаза",
      "help": "Сразу скажи учителю. Немедленно промывай глаза проточной водой не меньше 15 минут; нужна медицинская помощь. Не три глаза.",
      "subtitles": [
        "Тимур нагревает пробирку с раствором…",
        "Жидкость закипает всё сильнее…",
        "Жидкость выплеснулась к лицу. Останови нагревание!",
        "Найди две ошибки и помоги Тимуру",
        "Очки надеты, пробирка в держателе и направлена от людей"
      ],
      "alts": [
        "Тимур без очков нагревает пробирку, держа её пальцами; очки лежат на столе",
        "Жидкость в пробирке бурно кипит, над отверстием пар",
        "Капли горячей жидкости летят к незащищённым глазам и лицу Тимура",
        "Тимур в очках нагревает наклонённую пробирку с держателем, отверстием от людей"
      ],
      "risks": [
        "Кипящая жидкость может брызнуть в глаза и на лицо — возможны ожог и травма глаз",
        "Пробирка остынет слишком быстро",
        "Опыт займёт больше времени"
      ],
      "riskFeedback": [
        "От горячей жидкости и реактива нужно защищать глаза и лицо.",
        "Проблема не в охлаждении: кипящая жидкость может выплеснуться.",
        "Длительность опыта не объясняет риск ожога и травмы глаз."
      ],
      "actions": [
        "Надеть защитные очки до начала опыта",
        "Держать пробирку держателем, а не пальцами",
        "Наклонить пробирку и направить отверстие от себя и соседей",
        "Сначала равномерно прогреть всю пробирку, затем нагревать жидкость у дна, плавно перемещая её",
        "Заглянуть в пробирку сверху, чтобы увидеть кипение",
        "Держать пробирку над пламенем неподвижно"
      ],
      "actionFeedback": [
        "Очки нужны с начала работы до её окончания.",
        "Стекло нагревается — используй держатель.",
        "Отверстие всегда должно быть направлено от людей.",
        "Равномерное прогревание и плавное движение снижают риск перегрева.",
        "Из отверстия могут вылететь горячая жидкость и пар. Не заглядывай внутрь.",
        "Неподвижное нагревание одного места повышает риск перегрева и выброса жидкости."
      ],
      "inspect": "Внимательно осмотри сцену. Нужно отметить две ошибки."
    },
    "uz-Latn": {
      "title": "Himoya ko‘zoynagisiz isitish",
      "heading": "1.1-amaliy ish · 4 vaziyatdan B vaziyat",
      "situation": "B VAZIYAT",
      "q1": "Sahnada nima noto‘g‘ri ekanini tanla",
      "found": "Topildi: {n} / {total}",
      "gogglesLabel": "Ko‘zoynak taqilmagan",
      "tubeLabel": "Probirka tutqichsiz, og‘zi o‘ziga qaratilgan",
      "hint": "Temurning ko‘zoynagi qayerda va u probirkani qanday ushlab turibdi?",
      "q2": "Bu nimasi bilan xavfli?",
      "q3": "Probirkani qanday isitish kerak?",
      "previous": "← A vaziyat",
      "next": "D vaziyat →",
      "stop": "Voy! Ko‘zoynaging qani? 😱",
      "praise": "Ko‘zlar himoyalangan! 👍",
      "what": "Suyuqlik ortiqcha qizib, yuz tomon sachradi. Temurning ko‘zlari ko‘zoynak bilan himoyalanmagan edi.",
      "why": [
        "Issiq suyuqlik va bug‘ yuzni kuydirishi mumkin.",
        "Reaktiv tomchilari ko‘zga zarar yetkazib, ko‘rishni buzishi mumkin.",
        "Issiq shisha barmoqlarni kuydiradi."
      ],
      "bad": [
        "Himoya ko‘zoynagisiz isitish.",
        "Qizdirilayotgan probirkani barmoqlar bilan ushlash.",
        "Probirka og‘zini o‘ziga yoki yonidagiga qaratish.",
        "Qizdirilayotgan idish ustiga egilish."
      ],
      "good": [
        "Ko‘zoynakni ish boshida taqib, oxirigacha yechma.",
        "Tutqichni probirkaning yuqori uchdan bir qismiga mahkamla.",
        "Taxminan 45° qiyalat, og‘zini odamlardan nariga qarat.",
        "Avval butun probirkani bir tekis isit, keyin uni sekin harakatlantirib suyuqlikni qizdir."
      ],
      "helpTitle": "⑤ Ko‘zga sachrasa",
      "help": "Darhol o‘qituvchiga ayt. Ko‘zni darhol kamida 15 daqiqa oqar suvda yuv va tibbiy yordam ol. Ko‘zni ishqalama.",
      "subtitles": [
        "Temur eritmani probirkada qizdiryapti…",
        "Suyuqlik tobora kuchliroq qaynayapti…",
        "Suyuqlik yuz tomon sachradi. Isitishni to‘xtat!",
        "Ikki xatoni top va Temurga yordam ber",
        "Ko‘zoynak taqilgan, probirka tutqichda va odamlardan nariga qaratilgan"
      ],
      "alts": [
        "Temur ko‘zoynaksiz probirkani barmoqlari bilan qizdiryapti; ko‘zoynak stolda",
        "Probirkadagi suyuqlik kuchli qaynayapti, og‘zidan bug‘ chiqyapti",
        "Issiq tomchilar Temurning himoyalanmagan yuzi va ko‘zlariga sachrayapti",
        "Temur ko‘zoynakda, probirkani tutqich bilan qiya ushlab, og‘zini odamlardan nariga qaratgan"
      ],
      "risks": [
        "Qaynagan suyuqlik ko‘z va yuzga sachrab, kuyish va ko‘z jarohatiga sabab bo‘lishi mumkin",
        "Probirka juda tez soviydi",
        "Tajriba uzoqroq davom etadi"
      ],
      "riskFeedback": [
        "Ko‘z va yuzni issiq suyuqlik hamda reaktivdan himoya qilish kerak.",
        "Xavf sovishda emas: qaynagan suyuqlik sachrashi mumkin.",
        "Vaqt kuyish va ko‘z jarohati xavfini tushuntirmaydi."
      ],
      "actions": [
        "Tajriba boshlanishidan oldin himoya ko‘zoynagini taqish",
        "Probirkani barmoqlar bilan emas, tutqich bilan ushlash",
        "Probirkani qiyalatib, og‘zini o‘zidan va boshqalardan nariga qaratish",
        "Avval butun probirkani bir tekis isitib, keyin uni sekin harakatlantirib tub yaqinidagi suyuqlikni qizdirish",
        "Qaynashini ko‘rish uchun probirkaga tepadan qarash",
        "Probirkani olov ustida qimirlatmay ushlash"
      ],
      "actionFeedback": [
        "Ko‘zoynak ish boshidan oxirigacha taqilgan bo‘lsin.",
        "Shisha qiziydi. Tutqich ishlat.",
        "Probirka og‘zini doim odamlardan nariga qarat.",
        "Bir tekis isitish va sekin harakat ortiqcha qizishni kamaytiradi.",
        "Og‘zidan issiq suyuqlik va bug‘ otilishi mumkin. Ichiga qarama.",
        "Bir joyni qimirlatmay isitish ortiqcha qizish va sachrash xavfini oshiradi."
      ],
      "inspect": "Sahnani diqqat bilan ko‘r. Ikkita xatoni belgilash kerak."
    },
    "uz-Cyrl": {
      "title": "Ҳимоя кўзойнагисиз иситиш",
      "heading": "1.1-амалий иш · 4 вазиятдан B вазият",
      "situation": "B ВАЗИЯТ",
      "q1": "Саҳнада нима нотўғри эканини танла",
      "found": "Топилди: {n} / {total}",
      "gogglesLabel": "Кўзойнак тақилмаган",
      "tubeLabel": "Пробирка тутқичсиз, оғзи ўзига қаратилган",
      "hint": "Темурнинг кўзойнаги қаерда ва у пробиркани қандай ушлаб турибди?",
      "q2": "Бу нимаси билан хавфли?",
      "q3": "Пробиркани қандай иситиш керак?",
      "previous": "← A вазият",
      "next": "D вазият →",
      "stop": "Вой! Кўзойнагинг қани? 😱",
      "praise": "Кўзлар ҳимояланган! 👍",
      "what": "Суюқлик ортиқча қизиб, юз томон сачради. Темурнинг кўзлари кўзойнак билан ҳимояланмаган эди.",
      "why": [
        "Иссиқ суюқлик ва буғ юзни куйдириши мумкин.",
        "Реактив томчилари кўзга зарар етказиб, кўришни бузиши мумкин.",
        "Иссиқ шиша бармоқларни куйдиради."
      ],
      "bad": [
        "Ҳимоя кўзойнагисиз иситиш.",
        "Қиздирилаётган пробиркани бармоқлар билан ушлаш.",
        "Пробирка оғзини ўзига ёки ёнидагига қаратиш.",
        "Қиздирилаётган идиш устига эгилиш."
      ],
      "good": [
        "Кўзойнакни иш бошида тақиб, охиригача ечма.",
        "Тутқични пробирканинг юқори учдан бир қисмига маҳкамла.",
        "Тахминан 45° қиялат, оғзини одамлардан нарига қарат.",
        "Аввал бутун пробиркани бир текис исит, кейин уни секин ҳаракатлантириб суюқликни қиздир."
      ],
      "helpTitle": "⑤ Кўзга сачраса",
      "help": "Дарҳол ўқитувчига айт. Кўзни дарҳол камида 15 дақиқа оқар сувда юв ва тиббий ёрдам ол. Кўзни ишқалама.",
      "subtitles": [
        "Темур эритмани пробиркада қиздиряпти…",
        "Суюқлик тобора кучлироқ қайнаяпти…",
        "Суюқлик юз томон сачради. Иситишни тўхтат!",
        "Икки хатони топ ва Темурга ёрдам бер",
        "Кўзойнак тақилган, пробирка тутқичда ва одамлардан нарига қаратилган"
      ],
      "alts": [
        "Темур кўзойнаксиз пробиркани бармоқлари билан қиздиряпти; кўзойнак столда",
        "Пробиркадаги суюқлик кучли қайнаяпти, оғзидан буғ чиқяпти",
        "Иссиқ томчилар Темурнинг ҳимояланмаган юзи ва кўзларига сачраяпти",
        "Темур кўзойнакда, пробиркани тутқич билан қия ушлаб, оғзини одамлардан нарига қаратган"
      ],
      "risks": [
        "Қайнаган суюқлик кўз ва юзга сачраб, куйиш ва кўз жароҳатига сабаб бўлиши мумкин",
        "Пробирка жуда тез совийди",
        "Тажриба узоқроқ давом этади"
      ],
      "riskFeedback": [
        "Кўз ва юзни иссиқ суюқлик ҳамда реактивдан ҳимоя қилиш керак.",
        "Хавф совишда эмас: қайнаган суюқлик сачраши мумкин.",
        "Вақт куйиш ва кўз жароҳати хавфини тушунтирмайди."
      ],
      "actions": [
        "Тажриба бошланишидан олдин ҳимоя кўзойнагини тақиш",
        "Пробиркани бармоқлар билан эмас, тутқич билан ушлаш",
        "Пробиркани қиялатиб, оғзини ўзидан ва бошқалардан нарига қаратиш",
        "Аввал бутун пробиркани бир текис иситиб, кейин уни секин ҳаракатлантириб туб яқинидаги суюқликни қиздириш",
        "Қайнашини кўриш учун пробиркага тепадан қараш",
        "Пробиркани олов устида қимирлатмай ушлаш"
      ],
      "actionFeedback": [
        "Кўзойнак иш бошидан охиригача тақилган бўлсин.",
        "Шиша қизийди. Тутқич ишлат.",
        "Пробирка оғзини доим одамлардан нарига қарат.",
        "Бир текис иситиш ва секин ҳаракат ортиқча қизишни камайтиради.",
        "Оғзидан иссиқ суюқлик ва буғ отилиши мумкин. Ичига қарама.",
        "Бир жойни қимирлатмай иситиш ортиқча қизиш ва сачраш хавфини оширади."
      ],
      "inspect": "Саҳнани диққат билан кўр. Иккита хатони белгилаш керак."
    },
    "en": {
      "title": "Heating without safety goggles",
      "heading": "Practical work 1.1 · Situation B of 4",
      "situation": "SITUATION B",
      "q1": "Select what is wrong in the scene",
      "found": "Found {n} / {total}",
      "gogglesLabel": "Goggles are not being worn",
      "tubeLabel": "No holder; the tube points towards the learner",
      "hint": "Check where Timur’s goggles are and how he holds the tube…",
      "q2": "Why is this dangerous?",
      "q3": "How should a test tube be heated?",
      "previous": "← Situation A",
      "next": "Situation D →",
      "stop": "Oops! Where are your goggles? 😱",
      "praise": "Eyes protected! 👍",
      "what": "The liquid overheated and splashed towards Timur’s face. His eyes were not protected by goggles.",
      "why": [
        "Hot liquid and vapour can burn the face.",
        "Chemical splashes can injure the eyes and damage sight.",
        "Hot glass can burn fingers."
      ],
      "bad": [
        "Heat without safety goggles.",
        "Hold a heated tube with bare fingers.",
        "Point the opening at yourself or a neighbour.",
        "Lean over glassware being heated."
      ],
      "good": [
        "Put goggles on before starting and keep them on throughout.",
        "Attach the holder to the upper third of the tube.",
        "Tilt the tube about 45° and point its opening away from people.",
        "Warm the whole tube evenly first, then heat the liquid while moving the tube gently."
      ],
      "helpTitle": "⑤ If a splash reaches the eyes",
      "help": "Tell your teacher immediately. Start rinsing with running water at once for at least 15 minutes and get medical help. Do not rub your eyes.",
      "subtitles": [
        "Timur is heating a solution in a test tube…",
        "The liquid boils more and more vigorously…",
        "Liquid splashes towards his face. Stop heating!",
        "Find two mistakes and help Timur",
        "Goggles on, tube in a holder and pointed away from people"
      ],
      "alts": [
        "Timur heats a test tube with his fingers; his goggles are on the bench",
        "Liquid boils vigorously in the tube, with vapour above its opening",
        "Hot droplets fly towards Timur’s unprotected face and eyes",
        "Timur wears goggles and uses a holder to heat a tilted tube, pointed away from people"
      ],
      "risks": [
        "Boiling liquid can splash into the eyes and onto the face, causing burns and eye injuries",
        "The tube will cool too quickly",
        "The experiment will take longer"
      ],
      "riskFeedback": [
        "Eyes and face need protection from hot liquid and chemicals.",
        "Cooling is not the danger: boiling liquid can splash out.",
        "Duration does not explain the danger of burns and eye injuries."
      ],
      "actions": [
        "Put on safety goggles before the experiment",
        "Use a test-tube holder, not fingers",
        "Tilt the tube and point its opening away from yourself and others",
        "Warm the entire tube evenly first, then heat the liquid near the bottom while moving the tube gently",
        "Look into the tube from above to check boiling",
        "Hold the tube still above the flame"
      ],
      "actionFeedback": [
        "Wear goggles from start to finish.",
        "Glass gets hot. Use a holder.",
        "Always point the opening away from people.",
        "Even warming and gentle movement reduce local overheating.",
        "Hot liquid and vapour can escape from the opening. Never look inside.",
        "Heating one spot without moving the tube can overheat the liquid and make it splash out."
      ],
      "inspect": "Look closely at the scene. Mark both mistakes."
    }
  },
  "helperPlacement": "top-right"
};
for(const lang of Object.keys(SituationB.copy))SituationB.copy[lang]={...SituationA.copy[lang],...SituationB.copy[lang]};
{
 const localized=key=>Object.fromEntries(Object.entries(SituationB.copy).map(([lang,c])=>[lang,c[key]]));
 IntroData.tasks.find(t=>t.id===SituationB.id).title=localized('title');
 const danger=IntroData.dangers.find(d=>d.id===SituationB.id);danger.title=localized('title');
 CourseData.topics.find(t=>t.id==='intro').steps.experiments.find(e=>e.key===SituationB.id).title=localized('title');
 // Preserve the existing answer indices so checked legacy records remain valid.
 danger.danger=[1,0,2].map(i=>Object.fromEntries(Object.entries(SituationB.copy).map(([lang,c])=>[lang,c.risks[i]])));
 danger.actions=[4,5,0].map(i=>Object.fromEntries(Object.entries(SituationB.copy).map(([lang,c])=>[lang,c.actions[i]])));
}
