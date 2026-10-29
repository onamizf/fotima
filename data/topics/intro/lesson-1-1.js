/* Textbook page content and persisted viewing evidence; all UI copy is localized. */
const SafetyLessonData=(()=>{const content={
 "copy": {
  "ru": {
   "route": "Маршрут",
   "chapter": "Глава 1. Введение в химию",
   "overline": "ГЛАВА 1 · ПРАКТИЧЕСКАЯ РАБОТА 1.1",
   "heading": "Техника безопасности в химической лаборатории",
   "goal": "Цель: изучить правила безопасности в лаборатории",
   "skills": "Навыки: наблюдение · определение · коммуникация",
   "task": "Задание {n}",
   "progress": "Прогресс работы",
   "count": "{n} из {total}",
   "analysisInstruction": "На рисунках показаны ситуации в химической лаборатории. Определи, в чём опасность каждой ситуации, и какие меры предосторожности нужно принять.",
   "situation": "Ситуация {letter}",
   "risk": "Опасность",
   "precaution": "Меры предосторожности",
   "locked": "Посмотри ситуацию, чтобы узнать",
   "watch": "▶ Смотреть",
   "replay": "↺ Ещё раз",
   "reviewed": "Разобрано",
   "close": "Закрыть",
   "closeScene": "Закрыть ситуацию",
   "next": "Дальше →",
   "nextScene": "Следующая ситуация →",
   "what": "Что случилось",
   "safe": "Вот как правильно",
   "resultTitle": "Практическая работа 1.1 пройдена! 🎉",
   "resultText": "Все четыре ситуации разобраны.",
   "xp": "За эту работу: {n} XP",
   "nextLesson": "Практическая работа 1.2 →",
   "saved": "Прогресс сохраняется автоматически.",
   "imageError": "Не удалось загрузить кадр. Открой ситуацию, чтобы повторить загрузку.",
   "slide": "Показать ситуацию {letter}",
   "complete": "Выполнено"
  },
  "en": {
   "route": "Learning route",
   "chapter": "Chapter 1. Introduction to chemistry",
   "overline": "CHAPTER 1 · PRACTICAL WORK 1.1",
   "heading": "Safety in the chemistry laboratory",
   "goal": "Goal: learn laboratory safety rules",
   "skills": "Skills: observation · identification · communication",
   "task": "Task {n}",
   "progress": "Work progress",
   "count": "{n} of {total}",
   "analysisInstruction": "The pictures show situations in a chemistry laboratory. Identify the danger in each one and the precautions to take.",
   "situation": "Situation {letter}",
   "risk": "Danger",
   "precaution": "Precautions",
   "locked": "Watch the situation to find out",
   "watch": "▶ Watch",
   "replay": "↺ Watch again",
   "reviewed": "Reviewed",
   "close": "Close",
   "closeScene": "Close situation",
   "next": "Next →",
   "nextScene": "Next situation →",
   "what": "What happened",
   "safe": "Here is the safe way",
   "resultTitle": "Practical work 1.1 completed! 🎉",
   "resultText": "All four situations have been reviewed.",
   "xp": "For this work: {n} XP",
   "nextLesson": "Practical work 1.2 →",
   "saved": "Progress is saved automatically.",
   "imageError": "Could not load the image. Open the situation to retry.",
   "slide": "Show situation {letter}",
   "complete": "Completed"
  },
  "uz-Latn": {
   "route": "Ta’lim yo‘li",
   "chapter": "1-bob. Kimyoga kirish",
   "overline": "1-BOB · 1.1-AMALIY ISH",
   "heading": "Kimyo laboratoriyasida xavfsizlik texnikasi",
   "goal": "Maqsad: laboratoriya xavfsizlik qoidalarini o‘rganish",
   "skills": "Ko‘nikmalar: kuzatish · aniqlash · muloqot",
   "task": "{n}-topshiriq",
   "progress": "Ish jarayoni",
   "count": "{total} tadan {n} tasi",
   "analysisInstruction": "Rasmlarda kimyo laboratoriyasidagi vaziyatlar tasvirlangan. Har bir vaziyatdagi xavf va zarur ehtiyot choralarini aniqlang.",
   "situation": "{letter} vaziyat",
   "risk": "Xavf",
   "precaution": "Ehtiyot choralari",
   "locked": "Bilish uchun vaziyatni tomosha qil",
   "watch": "▶ Ko‘rish",
   "replay": "↺ Qayta ko‘rish",
   "reviewed": "Tahlil qilindi",
   "close": "Yopish",
   "closeScene": "Vaziyatni yopish",
   "next": "Keyingi →",
   "nextScene": "Keyingi vaziyat →",
   "what": "Nima bo‘ldi",
   "safe": "Mana to‘g‘ri usul",
   "resultTitle": "1.1-amaliy ish bajarildi! 🎉",
   "resultText": "To‘rtta vaziyat tahlil qilindi.",
   "xp": "Bu ish uchun: {n} XP",
   "nextLesson": "1.2-amaliy ish →",
   "saved": "Natijalar avtomatik saqlanadi.",
   "imageError": "Kadr yuklanmadi. Qayta yuklash uchun vaziyatni oching.",
   "slide": "{letter} vaziyatni ko‘rsatish",
   "complete": "Bajarildi"
  },
  "uz-Cyrl": {
   "route": "Та’лим йўли",
   "chapter": "1-боб. Кимёга кириш",
   "overline": "1-БОБ · 1.1-АМАЛИЙ ИСҲ",
   "heading": "Кимё лабораториясида хавфсизлик техникаси",
   "goal": "Мақсад: лаборатория хавфсизлик қоидаларини ўрганиш",
   "skills": "Кўникмалар: кузатиш · аниқлаш · мулоқот",
   "task": "{n}-топшириқ",
   "progress": "Иш жараёни",
   "count": "{total} тадан {n} таси",
   "analysisInstruction": "Расмларда кимё лабораториясидаги вазиятлар тасвирланган. Ҳар бир вазиятдаги хавф ва зарур еҳтиёт чораларини аниқланг.",
   "situation": "{letter} вазият",
   "risk": "Хавф",
   "precaution": "Еҳтиёт чоралари",
   "locked": "Билиш учун вазиятни томоша қил",
   "watch": "▶ Кўриш",
   "replay": "↺ Қайта кўриш",
   "reviewed": "Таҳлил қилинди",
   "close": "Ёпиш",
   "closeScene": "Вазиятни ёпиш",
   "next": "Кейинги →",
   "nextScene": "Кейинги вазият →",
   "what": "Нима бўлди",
   "safe": "Мана тўғри усул",
   "resultTitle": "1.1-амалий иш бажарилди! 🎉",
   "resultText": "Тўртта вазият таҳлил қилинди.",
   "xp": "Бу иш учун: {n} ХП",
   "nextLesson": "1.2-амалий иш →",
   "saved": "Натижалар автоматик сақланади.",
   "imageError": "Кадр юкланмади. Қайта юклаш учун вазиятни очинг.",
   "slide": "{letter} вазиятни кўрсатиш",
   "complete": "Бажарилди"
  }
 },
 "scenarios": [
  {
   "id": "a",
   "task": "danger-a",
   "image": "assets/lab/1-1/a-1-start.webp",
   "title": {
    "ru": "Распущенные волосы",
    "en": "Loose hair",
    "uz-Latn": "Yig‘ilmagan soch",
    "uz-Cyrl": "Йиғилмаган соч"
   },
   "risk": {
    "ru": "Волосы попадают в вещество: возможны ожог, отравление и испорченный опыт. Рядом с огнём волосы могут загореться.",
    "en": "Hair can fall into a chemical, causing burns, poisoning and a spoiled experiment. Near a flame, it can catch fire.",
    "uz-Latn": "Soch moddaga tegsa, kuyish, zaharlanish va tajribaning buzilishi mumkin. Olov yonida soch yonishi mumkin.",
    "uz-Cyrl": "Соч моддага тегса, куйиш, заҳарланиш ва тажрибанинг бузилиши мумкин. Олов ёнида соч ёниши мумкин."
   },
   "precaution": {
    "ru": "Собрать волосы резинкой. Стоять прямо и не наклоняться над посудой.",
    "en": "Tie hair back. Stand upright and do not lean over glassware.",
    "uz-Latn": "Sochni rezinka bilan yig‘ish. Tik turish va idishlar ustiga egilmaslik.",
    "uz-Cyrl": "Сочни резинка билан йиғиш. Тик туриш ва идишлар устига егилмаслик."
   }
  },
  {
   "id": "b",
   "task": "danger-b",
   "image": "assets/lab/1-1/b-1-start.webp",
   "title": {
    "ru": "Нагревание без очков",
    "en": "Heating without goggles",
    "uz-Latn": "Ko‘zoynaksiz isitish",
    "uz-Cyrl": "Кўзойнаксиз иситиш"
   },
   "risk": {
    "ru": "Кипящая жидкость брызгает в глаза и на лицо. Горячее стекло обжигает пальцы.",
    "en": "Boiling liquid can splash into the eyes and onto the face. Hot glass burns fingers.",
    "uz-Latn": "Qaynayotgan suyuqlik ko‘z va yuzga sachraydi. Issiq shisha barmoqlarni kuydiradi.",
    "uz-Cyrl": "Қайнаётган суюқлик кўз ва юзга сачрайди. Иссиқ шиша бармоқларни куйдиради."
   },
   "precaution": {
    "ru": "Надеть очки. Использовать держатель. Отверстие пробирки направлять от себя и соседей.",
    "en": "Wear goggles. Use a test-tube holder. Point the opening away from yourself and others.",
    "uz-Latn": "Ko‘zoynak taqish. Tutqichdan foydalanish. Probirka og‘zini o‘zidan va boshqalardan chetga yo‘naltirish.",
    "uz-Cyrl": "Кўзойнак тақиш. Тутқичдан фойдаланиш. Пробирка оғзини ўзидан ва бошқалардан четга йўналтириш."
   }
  },
  {
   "id": "c",
   "task": "danger-c",
   "image": "assets/lab/1-1/c-1-start.webp",
   "title": {
    "ru": "Нюхать из пробирки",
    "en": "Smelling from a test tube",
    "uz-Latn": "Probirkadan bevosita hidlash",
    "uz-Cyrl": "Пробиркадан бевосита ҳидлаш"
   },
   "risk": {
    "ru": "Ядовитые или едкие пары вызывают кашель, головокружение и ожог носа и горла.",
    "en": "Toxic or corrosive vapours can cause coughing, dizziness and burns to the nose and throat.",
    "uz-Latn": "Zaharli yoki o‘yuvchi bug‘lar yo‘tal, bosh aylanishi, burun va tomoq kuyishiga sabab bo‘ladi.",
    "uz-Cyrl": "Заҳарли ёки ўювчи буғлар йўтал, бош айланиши, бурун ва томоқ куйишига сабаб бўлади."
   },
   "precaution": {
    "ru": "Только с разрешения учителя: держать пробирку на расстоянии и ладонью направлять воздух к себе. С пахучими веществами работать в вытяжном шкафу.",
    "en": "Only with your teacher’s permission: hold the tube away and waft air towards yourself. Work with strong-smelling chemicals in a fume hood.",
    "uz-Latn": "Faqat o‘qituvchi ruxsati bilan: probirkani uzoqda tutib, havoni kaft bilan o‘ziga yo‘naltirish. Hidli moddalar bilan tortma shkafda ishlash.",
    "uz-Cyrl": "Фақат ўқитувчи рухсати билан: пробиркани узоқда тутиб, ҳавони кафт билан ўзига йўналтириш. Ҳидли моддалар билан тортма шкафда ишлаш."
   }
  },
  {
   "id": "d",
   "task": "danger-d",
   "image": "assets/lab/1-1/d-1-start.webp",
   "title": {
    "ru": "Лицо над кипящей водой",
    "en": "Face above boiling water",
    "uz-Latn": "Yuz qaynayotgan suv ustida",
    "uz-Cyrl": "Юз қайнаётган сув устида"
   },
   "risk": {
    "ru": "Горячий пар и брызги обжигают лицо. Очки запотевают, и становится хуже видно.",
    "en": "Hot steam and splashes burn the face. Goggles fog up and make it harder to see.",
    "uz-Latn": "Issiq bug‘ va tomchilar yuzni kuydiradi. Ko‘zoynak bug‘lanib, ko‘rish qiyinlashadi.",
    "uz-Cyrl": "Иссиқ буғ ва томчилар юзни куйдиради. Кўзойнак буғланиб, кўриш қийинлашади."
   },
   "precaution": {
    "ru": "Стоять прямо. Наблюдать сбоку и на расстоянии. Не трогать горячую посуду.",
    "en": "Stand upright. Observe from the side at a distance. Do not touch hot glassware.",
    "uz-Latn": "Tik turish. Yon tomondan, masofa saqlab kuzatish. Issiq idishga tegmaslik.",
    "uz-Cyrl": "Тик туриш. Ён томондан, масофа сақлаб кузатиш. Иссиқ идишга тегмаслик."
   }
  }
 ]
};
 const normalize=value=>String(value||'').normalize('NFKC').toLowerCase().replace(/ё/g,'е').replace(/[‘’ʻʼ`´]/g,"'").replace(/\s+/g,' ').trim();
 const has=(value,pattern)=>pattern.test(value);
 const terms={hair:/волос|кос[ауыео]|косич|локон|hair|braid|soch|соч/,eye:/глаз|лиц|очк|eye|face|goggle|ko'z|ko‘z|yuz|ko'zo|кўз|юз|козой/,hand:/рук|пальц|hand|finger|qo'l|barmoq|қўл|бармоқ/,vapour:/пар[ыао]?\b|пары|нюх|вдых|запах|нос|дых|каш|отрав|ядов|раздраж|головокруж|vapou?r|smell|sniff|inhal|toxic|poison|cough|fume|hid|bug'|nafas|zahar|yo'tal|ҳид|буғ|нафас|заҳар|йўтал/,hot:/кип|горяч|нагрев|ожог|обж|всплес|выплес|брызг|splash|boil|hot|burn|heat|steam|qayn|issiq|kuy|sachr|isit|қай|иссиқ|куй|сачр|исит/,chemical:/реактив|веществ|раствор|пробир|хим|chemical|reagent|solution|tube|reaktiv|modda|eritma|probirka|реактив|модда|эритма|пробирка/};
 function analyze(id,risk,precaution){const r=normalize(risk),p=normalize(precaution),both=r+' '+p;id=id.replace('danger-','');if(!r||!p)return {accepted:false,reason:'empty'};if(/опасност[ьи]\s*(?:здесь\s*)?нет|не\s*опасно|нет\s*(?:никаког[оа]\s*)?риска|no\s+(?:danger|risk)|xavf\s+yo'q|хавф\s+йўқ/.test(r))return {accepted:false,reason:'noRisk'};
  let danger=false,safe=false;
  if(id==='a'){danger=has(both,terms.hair)&&(has(r,terms.hair)||has(r,terms.hot)||/отрав|испорт|загряз|попа|poison|contamin|touch|fall|zahar|teg|заҳар|тег/.test(r));safe=has(p,terms.hair)&&/убр|убир|собр|собир|завяз|заплес|закреп|закол|спрят|хвост|пучок|косын|сетк|tie|tied|secure|back|cover|bog'|yig'|mahkam|боғ|йиғ|маҳкам/.test(p);}
  if(id==='b'){danger=has(r,terms.eye)||has(r,terms.hot)||has(r,terms.hand)||has(r,terms.chemical);const eyeSafe=/(?:над|нос|защит|очк|goggle|wear|protect|ko'zoy|taq|кўзой|тақ)/.test(p)&&has(p,terms.eye),holder=/держател|щипц|перчат|holder|tongs|glove|tutqich|qo'lqop|тутқич|қўлқоп/.test(p),handling=/инструкц|указани|от себя|от людей|не направ|вдали|away|instruct|teacher|yo'riq|o'qituv|chetga|йўриқ|ўқитув|четга/.test(p);safe=has(r,/глаз|eye|ko'z|кўз/)?eyeSafe:eyeSafe||holder||handling;}
  if(id==='c'){danger=has(r,terms.vapour)||/ожог|обж|burn|kuy|куй/.test(r)&&has(both,terms.vapour);safe=/не\s*(?:нюх|вдых|поднос|наклон)|нельзя\s*(?:нюх|вдых)|тяг|вытяж|ладон|веер|помах|издал|расстояни|подальше|waft|hood|avoid inhal|avoid breath|do not\s*(?:smell|sniff|inhale|breathe)|don't\s*(?:smell|sniff|inhale|breathe)|never\s*(?:smell|sniff|inhale|breathe)|distance|hidlam|bevosita.*(?:emas|mumkin emas)|tortma|kaft|yelp|uzoq|ҳидлам|тортма|кафт|елп|узоқ/.test(p);}
  if(id==='d'){danger=has(r,terms.hot)||has(r,terms.eye)&&has(both,terms.hot);safe=/не\s*(?:наклон|склон|поднос|направ)|нельзя\s*наклон|держател|щипц|очк|подальше|расстояни|отойти|от себя|держать лицо|holder|tongs|goggle|away|distance|do not lean|don't lean|never lean|tutqich|ko'zoy|egilma|uzoq|chetga|тутқич|кўзой|эгилма|узоқ|четга/.test(p);}
  if(/не\s+(?:надевать|носить)\s+(?:защитные\s+)?очки/.test(p))safe=false;
  if(id==='a'&&/не\s*(?:убир|убр|собир|собр|завяз)|(?:do not|don't|never)\s*(?:tie|secure)|оставить.*распущ/.test(p))safe=false;
  if(id==='c'&&/(?:нужно|надо|следует)\s*(?:нюхать|вдыхать).*прямо|(?:smell|sniff) directly/.test(p)&&!/не нюх|не вдых|do not|don't|never/.test(p))safe=false;
  return {accepted:danger&&safe,reason:!danger?'uncertainRisk':!safe?'uncertainPrecaution':'accepted'};
 }

 function validReview(p){return !!p&&p.version===1&&JSON.stringify(p.stages)==='[0,1,2,3,4]'&&JSON.stringify(p.explanations)==='[0,1,2]';}
 function blank(){return {version:3,reviews:{}};}
 function sanitize(value){const out=blank();if(!value||![1,2,3].includes(value.version))return out;for(const s of content.scenarios){const p=value.reviews?.[s.id];if(validReview(p))out.reviews[s.id]={version:1,stages:[0,1,2,3,4],explanations:[0,1,2]};}return out;}
 return {...content,analyze,validReview,blank,sanitize};
})();
