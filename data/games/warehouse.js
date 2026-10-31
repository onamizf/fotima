MiniGameData.games.push({
  "id": "warehouse",
  "related": "1.1",
  "chapter": "ch1",
  "cover": "assets/lab/1-2/room.jpg",
  "title": {
    "ru": "Склад реактивов",
    "en": "Reagent warehouse",
    "uz-Latn": "Reaktivlar ombori",
    "uz-Cyrl": "Реактивлар омбори"
  },
  "rules": {
    "ru": "Смотри на знак и переноси склянку на подходящую полку до конца ленты. Можно выбрать склянку, затем полку, или нажать 1–5.",
    "en": "Read the hazard sign and move the bottle to its shelf before the belt ends. Drag, select then tap a shelf, or press 1–5.",
    "uz-Latn": "Belgini o‘qi va sklyankani tasma oxiriga yetmasdan mos javonga qo‘y. Sudra, ketma-ket bos yoki 1–5 tugmalarini ishlat.",
    "uz-Cyrl": "Белгини ўқи ва склянкани тасма охирига етмасдан мос жавонга қўй. Судра, кетма-кет бос ёки 1–5 тугмаларини ишлат."
  }
});
MiniGameData.hazards=[
  {
    "id": "explosive",
    "symbol": "💥",
    "title": {
      "ru": "Взрывоопасные",
      "en": "Explosive",
      "uz-Latn": "Portlovchi",
      "uz-Cyrl": "Портловчи"
    }
  },
  {
    "id": "flammable",
    "symbol": "♨",
    "title": {
      "ru": "Легковоспламеняющиеся",
      "en": "Flammable",
      "uz-Latn": "Tez yonuvchi",
      "uz-Cyrl": "Тез ёнувчи"
    }
  },
  {
    "id": "toxic",
    "symbol": "☠",
    "title": {
      "ru": "Ядовитые",
      "en": "Toxic",
      "uz-Latn": "Zaharli",
      "uz-Cyrl": "Заҳарли"
    }
  },
  {
    "id": "corrosive",
    "symbol": "⚗",
    "title": {
      "ru": "Едкие",
      "en": "Corrosive",
      "uz-Latn": "O‘yuvchi",
      "uz-Cyrl": "Ўювчи"
    }
  },
  {
    "id": "irritant",
    "symbol": "!",
    "title": {
      "ru": "Раздражающие",
      "en": "Irritant",
      "uz-Latn": "Ta’sirlantiruvchi",
      "uz-Cyrl": "Таъсирлантирувчи"
    }
  }
];

for(const hazard of MiniGameData.hazards)hazard.image="assets/games/hazards/"+hazard.id+".svg";
