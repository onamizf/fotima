/* Публичные контакты проекта. Пустые адреса остаются заглушками, без выдуманных ссылок. */
const WelcomeConfig={author:'onamizf',school:'',className:'7',email:'',telegram:''};
const WelcomeTranslations={
 ru:{
  menu:['О ЛАБОРАТОРИИ','КАК УЧИТЬСЯ','ТЕМЫ КУРСА','БЕЗОПАСНОСТЬ','КОНТАКТЫ'],
  navigation:'О лаборатории',menuToggle:'Открыть меню',login:'ВОЙТИ',continue:'ПРОДОЛЖИТЬ',existing:'Уже есть аккаунт? Войти',more:'Узнать больше',how:'Как это работает',
  about:'Виртуальная лаборатория, где ученики 7 класса проводят химические опыты безопасно — прямо в браузере.',
  counts:[['тема','темы','тем'],['опыт','опыта','опытов'],['мини-игра','мини-игры','мини-игр']],
  assistant:'Твой помощник — лягушонок-лаборант',steps:['Зарегистрируйся','Изучи теорию','Проведи опыт','Пройди мини-тест'],
  xp:'За каждый шаг — очки XP, звания и значки 🏆',soon:'Скоро',route:'Смотреть маршрут обучения →',experiments:'Опытов',
  why:'Почему виртуально?',benefits:['Никаких опасных веществ','Можно ошибаться и повторять','Работает на любом устройстве'],
  rulesTitle:'5 главных правил в лаборатории',rules:['Надевай защитные очки.','Не пробуй вещества на вкус.','Не вдыхай вещества прямо из сосуда.','Реальные опыты — только с преподавателем.','Выключай нагрев и убирай рабочее место.'],
  author:'Автор',school:'Школа',className:'Класс',placeholder:'Будет добавлено',write:'Написать',noContact:'Контакты автора пока не указаны.',
  project:'Проект: Разработка адаптивной виртуальной лаборатории по химии для учащихся 7 класса',
  speech:['Привет! Я покажу тебе химию 🧪','Учимся шаг за шагом!','Начнём с веществ!','Здесь ничего не взорвётся… почти 😄','Всегда рад твоим идеям!'],
  greetings:['Доброй ночи!','Доброе утро!','Добрый день!','Добрый вечер!'],clockHint:'Самое время для опыта',
  preview:'Темы курса',openTopic:'Открыть тему',hello:'Привет'
 },
 en:{
  menu:['ABOUT THE LAB','HOW TO LEARN','COURSE TOPICS','SAFETY','CONTACT'],
  navigation:'About the laboratory',menuToggle:'Open menu',login:'LOG IN',continue:'CONTINUE',existing:'Already have an account? Log in',more:'Learn more',how:'How it works',
  about:'A virtual laboratory where grade 7 students run chemistry experiments safely — right in the browser.',
  counts:[['topic','topics','topics'],['experiment','experiments','experiments'],['mini-game','mini-games','mini-games']],
  assistant:'Your helper — the frog lab assistant',steps:['Create an account','Explore the theory','Run an experiment','Take a mini-quiz'],
  xp:'Earn XP, ranks and badges at every step 🏆',soon:'Coming soon',route:'View the learning journey →',experiments:'Experiments',
  why:'Why virtual?',benefits:['No dangerous substances','Make mistakes and try again','Works on any device'],
  rulesTitle:'5 essential lab rules',rules:['Wear safety goggles.','Never taste substances.','Never inhale directly from a vessel.','Real experiments require a teacher.','Turn off heating and tidy your workspace.'],
  author:'Author',school:'School',className:'Grade',placeholder:'To be added',write:'Write a message',noContact:'The author’s contact details have not been added yet.',
  project:'Project: Development of an adaptive virtual chemistry laboratory for grade 7 students',
  speech:['Hello! Let’s discover chemistry 🧪','Let’s learn one step at a time!','Start with substances!','Nothing will explode here… almost 😄','Your ideas are always welcome!'],
  greetings:['Good night!','Good morning!','Good afternoon!','Good evening!'],clockHint:'A great time for an experiment',
  preview:'Course topics',openTopic:'Open topic',hello:'Hello'
 },
 'uz-Latn':{
  menu:['LABORATORIYA HAQIDA','QANDAY O‘RGANILADI','KURS MAVZULARI','XAVFSIZLIK','ALOQA'],
  navigation:'Laboratoriya haqida',menuToggle:'Menyuni ochish',login:'KIRISH',continue:'DAVOM ETISH',existing:'Akkaunting bormi? Kirish',more:'Batafsil',how:'Bu qanday ishlaydi',
  about:'7-sinf o‘quvchilari kimyoviy tajribalarni xavfsiz, bevosita brauzerda o‘tkazadigan virtual laboratoriya.',
  counts:[['mavzu','mavzu','mavzu'],['tajriba','tajriba','tajriba'],['mini-o‘yin','mini-o‘yin','mini-o‘yin']],
  assistant:'Yordamching — qurbaqa-laborant',steps:['Ro‘yxatdan o‘t','Nazariyani o‘rgan','Tajriba o‘tkaz','Mini-testni yech'],
  xp:'Har bir qadam uchun XP, unvon va nishonlar 🏆',soon:'Tez orada',route:'O‘quv yo‘lini ko‘rish →',experiments:'Tajribalar',
  why:'Nega virtual?',benefits:['Xavfli moddalar yo‘q','Xato qilib, qayta urinib ko‘rish mumkin','Istalgan qurilmada ishlaydi'],
  rulesTitle:'Laboratoriyadagi 5 asosiy qoida',rules:['Himoya ko‘zoynagini taq.','Moddalarni tatib ko‘rma.','Idishdan to‘g‘ridan-to‘g‘ri hidlama.','Haqiqiy tajribani faqat o‘qituvchi bilan bajar.','Isitishni o‘chir va ish joyini yig‘ishtir.'],
  author:'Muallif',school:'Maktab',className:'Sinf',placeholder:'Keyin qo‘shiladi',write:'Xabar yozish',noContact:'Muallifning aloqa ma’lumotlari hali kiritilmagan.',
  project:'Loyiha: 7-sinf o‘quvchilari uchun kimyodan moslashuvchan virtual laboratoriyani ishlab chiqish',
  speech:['Salom! Kimyoni birga o‘rganamiz 🧪','Qadam-baqadam o‘rganamiz!','Moddalardan boshlaymiz!','Bu yerda hech narsa portlamaydi… deyarli 😄','G‘oyalaringni kutaman!'],
  greetings:['Xayrli tun!','Xayrli tong!','Xayrli kun!','Xayrli kech!'],clockHint:'Tajriba uchun ayni vaqt',
  preview:'Kurs mavzulari',openTopic:'Mavzuni ochish',hello:'Salom'
 }
};
