MiniGameData.games.push({
  "id": "danger",
  "related": "1.1",
  "chapter": "ch1",
  "cover": "assets/lab/1-1/a-2-braid.webp",
  "title": {
    "ru": "Лаборатория в опасности",
    "en": "Laboratory in danger",
    "uz-Latn": "Laboratoriya xavf ostida",
    "uz-Cyrl": "Лаборатория хавф остида"
  },
  "rules": {
    "ru": "Найди нарушения в сцене до конца времени. Нажимай на опасное место; промах отнимет 2 секунды.",
    "en": "Find unsafe actions before time runs out. Select the unsafe spot; a miss costs 2 seconds.",
    "uz-Latn": "Vaqt tugashidan oldin xavflarni top. Xavfli joyni bos; xato bosish 2 soniyani oladi.",
    "uz-Cyrl": "Вақт тугашидан олдин хавфларни топ. Хавфли жойни бос; хато босиш 2 сонияни олади."
  }
});
MiniGameData.dangers=[
  {
    "id": "hair",
    "x": 20,
    "y": 23,
    "title": {
      "ru": "Волосы не убраны",
      "en": "Loose hair",
      "uz-Latn": "Soch yig‘ilmagan",
      "uz-Cyrl": "Соч йиғилмаган"
    },
    "rule": {
      "ru": "Убери волосы: они не должны попадать в вещество или пламя.",
      "en": "Tie hair back: keep it out of chemicals and flames.",
      "uz-Latn": "Sochni yig‘: u modda yoki alangaga tegmasin.",
      "uz-Cyrl": "Сочни йиғ: у модда ёки алангага тегмасин."
    }
  },
  {
    "id": "goggles",
    "x": 48,
    "y": 30,
    "title": {
      "ru": "Нет очков",
      "en": "No goggles",
      "uz-Latn": "Ko‘zoynak yo‘q",
      "uz-Cyrl": "Кўзойнак йўқ"
    },
    "rule": {
      "ru": "Защитные очки надевают до начала работы.",
      "en": "Put safety goggles on before starting work.",
      "uz-Latn": "Ish boshlanishidan oldin himoya ko‘zoynagini taq.",
      "uz-Cyrl": "Иш бошланишидан олдин ҳимоя кўзойнагини тақ."
    }
  },
  {
    "id": "sniff",
    "x": 80,
    "y": 37,
    "title": {
      "ru": "Нюхает из пробирки",
      "en": "Directly sniffing a tube",
      "uz-Latn": "Probirkadan bevosita hidlash",
      "uz-Cyrl": "Пробиркадан бевосита ҳидлаш"
    },
    "rule": {
      "ru": "Не вдыхай пары прямо из пробирки; направляй воздух ладонью только с разрешения учителя.",
      "en": "Do not inhale directly; gently waft air only with your teacher’s permission.",
      "uz-Latn": "Bevosita hidlama; faqat o‘qituvchi ruxsati bilan havoni kaft bilan yo‘naltir.",
      "uz-Cyrl": "Бевосита ҳидлама; фақат ўқитувчи рухсати билан ҳавони кафт билан йўналтир."
    }
  },
  {
    "id": "face",
    "x": 52,
    "y": 51,
    "title": {
      "ru": "Лицо над нагреваемой пробиркой",
      "en": "Face above a heated tube",
      "uz-Latn": "Yuz qizdirilayotgan probirka ustida",
      "uz-Cyrl": "Юз қиздирилаётган пробирка устида"
    },
    "rule": {
      "ru": "Отверстие нагреваемой пробирки направляй от людей; не наклоняйся над ней.",
      "en": "Point a heated tube away from people; never lean over it.",
      "uz-Latn": "Qizdirilayotgan probirka og‘zini odamlardan chetga qarat; uning ustiga egilma.",
      "uz-Cyrl": "Қиздирилаётган пробирка оғзини одамлардан четга қарат; унинг устига эгилма."
    }
  },
  {
    "id": "sandwich",
    "x": 25,
    "y": 80,
    "title": {
      "ru": "Еда на столе",
      "en": "Food on the bench",
      "uz-Latn": "Stol ustida ovqat",
      "uz-Cyrl": "Стол устида овқат"
    },
    "rule": {
      "ru": "Еда и напитки запрещены в лаборатории.",
      "en": "Food and drink are not allowed in the laboratory.",
      "uz-Latn": "Laboratoriyada ovqat va ichimlik taqiqlanadi.",
      "uz-Cyrl": "Лабораторияда овқат ва ичимлик тақиқланади."
    }
  },
  {
    "id": "flame",
    "x": 72,
    "y": 79,
    "title": {
      "ru": "Горелка без присмотра",
      "en": "Unattended burner",
      "uz-Latn": "Qarovsiz gorelka",
      "uz-Cyrl": "Қаровсиз горелка"
    },
    "rule": {
      "ru": "Не оставляй горящую горелку без присмотра: перекрой газ.",
      "en": "Never leave a lit burner unattended: turn off the gas.",
      "uz-Latn": "Yoniq gorelkani qarovsiz qoldirma: gazni o‘chir.",
      "uz-Cyrl": "Ёниқ горелкани қаровсиз қолдирма: газни ўчир."
    }
  },
  {
    "id": "holder",
    "x": 45,
    "y": 60,
    "title": {
      "ru": "Пробирка в пальцах",
      "en": "Tube held in fingers",
      "uz-Latn": "Probirka barmoqlarda",
      "uz-Cyrl": "Пробирка бармоқларда"
    },
    "rule": {
      "ru": "При нагревании используй пробиркодержатель.",
      "en": "Use a tube holder when heating.",
      "uz-Latn": "Qizdirishda probirka tutqichidan foydalan.",
      "uz-Cyrl": "Қиздиришда пробирка тутқичидан фойдалан."
    }
  },
  {
    "id": "edge",
    "x": 91,
    "y": 87,
    "title": {
      "ru": "Посуда у края",
      "en": "Glassware at the edge",
      "uz-Latn": "Idish chetga qo‘yilgan",
      "uz-Cyrl": "Идиш четга қўйилган"
    },
    "rule": {
      "ru": "Ставь посуду подальше от края стола.",
      "en": "Keep glassware away from the bench edge.",
      "uz-Latn": "Idishni stol chetidan uzoqroq qo‘y.",
      "uz-Cyrl": "Идишни стол четидан узоқроқ қўй."
    }
  },
  {
    "id": "label",
    "x": 8,
    "y": 75,
    "title": {
      "ru": "Нет подписи на склянке",
      "en": "Unlabelled bottle",
      "uz-Latn": "Sklyankada yorliq yo‘q",
      "uz-Cyrl": "Склянкада ёрлиқ йўқ"
    },
    "rule": {
      "ru": "Не используй неизвестные вещества без этикетки.",
      "en": "Never use an unknown substance without a label.",
      "uz-Latn": "Yorliqsiz noma’lum moddani ishlatma.",
      "uz-Cyrl": "Ёрлиқсиз номаълум моддани ишлатма."
    }
  },
  {
    "id": "clutter",
    "x": 42,
    "y": 87,
    "title": {
      "ru": "Лишние предметы на столе",
      "en": "Cluttered bench",
      "uz-Latn": "Stolda ortiqcha buyumlar",
      "uz-Cyrl": "Столда ортиқча буюмлар"
    },
    "rule": {
      "ru": "Оставь на рабочем месте только нужные приборы.",
      "en": "Keep only the equipment you need on the bench.",
      "uz-Latn": "Ish joyida faqat kerakli asboblarni qoldir.",
      "uz-Cyrl": "Иш жойида фақат керакли асбобларни қолдир."
    }
  }
];

Object.assign(MiniGameData.dangers.find(d=>d.id==="hair"),{x:19,y:37,w:24,h:52});
Object.assign(MiniGameData.dangers.find(d=>d.id==="face"),{x:54,y:56,w:22,h:27});
