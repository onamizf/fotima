# Учебные тексты новых лабораторных для проверки

**Редакция:** 0.2 · **Дата:** 19 октября 2026 г. · **Статус:** экспертная и языковая проверка не выполнены.

Основа — одобренные REVISED_LABORATORY_SCENARIOS.md и три лабораторные работы, присланные заказчиком. Страна — Узбекистан; известны издательские сведения «SHARQ», Ташкент, 2017. Авторы и точное издание будут добавлены позже. Предыдущие практические работы не подменяют этот перечень.

## Вопросы преподавателю

- Подтвердить названия, порядок и терминологию трёх лабораторных в используемом учебнике.
- Проверить тексты, вопросы, отвлекающие варианты и объяснения во всех четырёх языковых версиях.
- Для таблицы утвердить состав образцов, условия, численные плотности, твёрдость и температуры с источниками. Не назначать неприменимым свойствам произвольный ноль.
- Уточнить форму медного купороса, состав спирта, конкретный эфир и газ для горения. Рисунок голубого купороса сейчас условно соответствует CuSO₄·5H₂O.
- Утвердить трактовку сравнения запахов по текстовым карточкам, наблюдений при нагревании меди и выделении газа в выбранной модели карбоната.
- Рассмотреть отдельно управление будущими виртуальными приборами. Сейчас нагревание, реакции и измерения не реализованы.

| Проверяющий | Дата | Замечания | Итог |
| --- | --- | --- | --- |
| Не указан | Не выполнена | Ожидаются | Не утверждено |

Ниже — точные тексты приложения. Они не выдаются за цитаты из учебника. После редактирования src/lessons/*.js этот документ обновляется командой `python tools/export_lesson_review.py`.

## Русский

### Знакомство с веществами с различными физическими свойствами

**Цель:** Сравнить 12 образцов и записать их физические свойства.

**1. Наблюдай и описывай**

Состояние и цвет образца можно определить наблюдением. При обычных условиях вещество может быть твёрдым, жидким или газообразным. Цвет рассматривают при обычном освещении.

Сравнивай именно подписанные образцы. Одинаковый цвет не доказывает, что вещества одинаковы. Вещества не пробуют на вкус, а запах неизвестного образца не проверяют прямым вдыханием.

**2. Сравнивай свойства**

Растворимость описывает, как вещество взаимодействует с выбранным растворителем при заданных условиях. Для жидкостей можно говорить о смешиваемости. Исчезновение видимых кристаллов не означает исчезновения вещества.

Плотность связывает массу и объём: ρ = m/V. Для численного значения нужны единицы и условия. Твёрдость сравнивают для твёрдых образцов; для воды и спирта в этой таблице она неприменима.

**3. Заполняй таблицу осмысленно**

Для соли, сахара, соды, купороса, металлов, воды, спирта, серы и йода запиши состояние, цвет, запах, плотность, растворимость и твёрдость. В приложении запах представлен справочным описанием, а не реальным ощущением.

Температуры плавления и кипения находят в согласованном справочнике. Состав образца, условия и источник указывают отдельно. Пока численные справочные данные не утверждены преподавателем, они не выдаются за проверенные ответы.

**Словарь**

- **Агрегатное состояние:** Твёрдое, жидкое или газообразное состояние вещества при указанных условиях.
- **Плотность:** Отношение массы к объёму: ρ = m/V.
- **Растворимость:** Свойство образовывать раствор с выбранным растворителем при заданных условиях.
- **Твёрдость:** Сопротивление твёрдого материала царапанию в выбранном методе сравнения.

**Вопросы и объяснения**

**Как записать твёрдость воды в этой таблице?**

- Написать ноль — **неверно**. Ноль означал бы измеренное значение. Для жидкой воды выбранный метод твёрдости неприменим.
- Отметить «неприменимо» — **верно**. Верно: здесь сравнивают твёрдость твёрдых материалов, а вода — жидкость.
- Приравнять к твёрдости стекла — **неверно**. Твёрдость стекла не является характеристикой жидкой воды.

**Что нужно для численного описания плотности?**

- Только цвет вещества — **неверно**. Цвет не задаёт массу и объём. Для плотности нужны единицы и условия.
- Только запах — **неверно**. Запах — другое свойство. Плотность относится к массе и объёму.
- Значение, единицы и условия — **верно**. Верно: численное значение без единиц и условий может быть неоднозначным.

### Физические явления

**Цель:** Объяснить плавление, растворение и получение соли из раствора.

**1. Парафин: плавление и охлаждение**

При нагревании образец парафина может перейти из твёрдого состояния в жидкое. При охлаждении он снова затвердевает. В этом задании изучают изменение состояния, а не горение свечи.

Парафин свечи — смесь, поэтому ему не приписывается одна универсальная температура плавления. Виртуальное нагревание будет управляемым; сейчас доступно описание задания.

**2. Соль остаётся в растворе**

При растворении соли видимые кристаллы перестают различаться, но соль остаётся в воде. Раствор — смесь. Перемешивание помогает растворению, но не создаёт новый элемент.

При испарении воды из раствора могут снова появиться кристаллы соли. В учебной модели растворение и выпаривание рассматриваются как физические явления, а не образование нового химического элемента.

**3. Запах — справочное свойство**

В третьем задании сравниваются описания этилового спирта, разбавленного раствора уксусной кислоты и эфира. Браузер не передаёт запах; в приложении будут только справочные карточки.

Конкретный эфир и состав образцов нужно уточнить с преподавателем. Не следует повторять вдыхание паров дома или нюхать неизвестные вещества. Сравнение справочных характеристик само по себе не является реакцией.

**Словарь**

- **Плавление:** Переход из твёрдого состояния в жидкое.
- **Затвердевание:** Переход из жидкого состояния в твёрдое.
- **Выпаривание:** Удаление растворителя испарением для получения оставшегося растворённого вещества.
- **Физическое явление:** Изменение, при котором в рассматриваемом процессе новые вещества не образуются.

**Вопросы и объяснения**

**Что изучается при плавлении и охлаждении парафина?**

- Изменение агрегатного состояния — **верно**. Верно: в этой модели парафин плавится и снова затвердевает.
- Обязательное горение парафина — **неверно**. Плавление и горение — разные процессы. Здесь горение не является целью.
- Создание нового элемента — **неверно**. Изменение состояния не создаёт химический элемент.

**Что остаётся после удаления воды из раствора соли в модели?**

- Ничего: соль исчезла — **неверно**. Соль не исчезала при растворении. Она может снова образовать видимые кристаллы.
- Кристаллы соли — **верно**. Верно: при удалении воды можно снова наблюдать соль.
- Новый металл — **неверно**. Выпаривание этого раствора не превращает соль в металл.

### Химические явления

**Цель:** Связать наблюдения с образованием новых веществ.

**1. Горение и новые вещества**

В работе сравниваются горение бумаги, спирта, газа и спички. Горение — химическое превращение: исходные вещества участвуют в образовании новых. Внешние признаки рассматривают вместе с известным процессом.

Один лишь свет или нагрев не является универсальным доказательством реакции. Состав газа и образцов нужно уточнить до назначения конкретных уравнений. Сейчас горение представлено учебным описанием, без действующего источника пламени.

**2. Медь при нагревании на воздухе**

В упрощённой модели на поверхности меди появляется чёрный оксид меди(II). Сравнивают исходную медь и новый поверхностный слой. Это отличается от одного лишь изменения состояния парафина.

Объяснение модели: 2Cu + O₂ → 2CuO. Нагревание и условное сравнение слоя будут отдельными виртуальными действиями после согласования оборудования.

**3. Карбонат и соляная кислота**

Мел, мрамор и известняк рассматриваются как образцы с карбонатным компонентом. В выбранной модели при взаимодействии с соляной кислотой выделяется углекислый газ: CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂.

Газ наблюдают по пузырькам и предусмотренной пробе над жидкостью. Затухание лучинки рассматривают вместе с известными реагентами, а не как уникальное доказательство состава газа. Примеси и скорость процесса у реальных образцов могут различаться.

**Словарь**

- **Химическое явление:** Процесс, в котором образуются новые вещества.
- **Окисление меди:** В этой модели — взаимодействие меди с кислородом с образованием оксида.
- **Углекислый газ:** Вещество CO₂, образующееся в выбранной модели кислоты и карбоната.
- **Уравнение реакции:** Условная запись химического превращения с формулами и коэффициентами.

**Вопросы и объяснения**

**Какое объяснение соответствует чёрному слою в модели нагревания меди?**

- Медь только расплавилась — **неверно**. Одного изменения состояния недостаточно для объяснения нового слоя; в модели образуется оксид.
- Образовался оксид меди(II) — **верно**. Верно: образование нового вещества отличает этот процесс от простого плавления.
- На поверхности появилась поваренная соль — **неверно**. В указанной модели нет процесса образования поваренной соли.

**Как объясняют пузырьки при действии кислоты на карбонат в этой модели?**

- Любые пузырьки всегда доказывают наличие воздуха — **неверно**. По одним пузырькам нельзя однозначно определить вещество. Учитывай реагенты и процесс.
- Создан новый химический элемент — **неверно**. В этой реакции не создаётся новый химический элемент.
- Выделяется CO₂ согласно выбранной реакции — **верно**. Верно: вывод основан на заданных реагентах и объяснении реакции, а не только на пузырьках.

## Узбекский — латиница

### Fizik xossalari turlicha boʻlgan moddalar bilan tanishish

**Цель:** 12 ta namunani solishtirish va fizik xossalarini yozish.

**1. Kuzat va tavsifla**

Namunaning holati va rangini kuzatish mumkin. Belgilangan sharoitda modda qattiq, suyuq yoki gaz holatda boʻladi. Rang oddiy yorugʻlikda koʻriladi.

Belgilangan namunalarni solishtir. Rangning bir xilligi moddalarning bir xil ekanini isbotlamaydi. Moddalarni tatib koʻrma va notanish namunaning hidini bevosita nafas olib aniqlama.

**2. Xossalarni solishtir**

Eruvchanlik moddaning tanlangan erituvchi bilan belgilangan sharoitdagi xossasini ifodalaydi. Suyuqliklar uchun aralashuvchanlik haqida gapirish mumkin. Kristallar koʻrinmasligi modda yoʻqolganini anglatmaydi.

Zichlik massa va hajmni bogʻlaydi: ρ = m/V. Sonli qiymatga birlik va sharoit kerak. Qattiqlik qattiq namunalar uchun solishtiriladi; bu jadvalda suv va spirtga tanlangan usul qoʻllanmaydi.

**3. Jadvalni mazmunli toʻldir**

Tuz, shakar, soda, mis kuporosi, metallar, suv, spirt, oltingugurt va yod uchun holat, rang, hid, zichlik, suvda eruvchanlik va qattiqlikni yoz. Ilovada hid haqiqiy sezgi emas, maʼlumot matni bilan beriladi.

Suyuqlanish va qaynash haroratlari kelishilgan maʼlumotnomadan olinadi. Namuna tarkibi, sharoit va manba alohida koʻrsatiladi. Oʻqituvchi tasdiqlamagan sonlar tekshirilgan javob deb berilmaydi.

**Словарь**

- **Agregat holat:** Belgilangan sharoitdagi qattiq, suyuq yoki gaz holat.
- **Zichlik:** Massaning hajmga nisbati: ρ = m/V.
- **Eruvchanlik:** Belgilangan sharoitda tanlangan erituvchi bilan eritma hosil qilish xossasi.
- **Qattiqlik:** Tanlangan taqqoslash usulida qattiq materialning tirnalishga qarshiligi.

**Вопросы и объяснения**

**Bu jadvalda suvning qattiqligi qanday yoziladi?**

- Nol yoziladi — **неверно**. Nol oʻlchangan qiymatni bildirardi. Bu usul suyuq suvga qoʻllanmaydi.
- Qoʻllanmaydi deb belgilanadi — **верно**. Toʻgʻri: usul qattiq materiallarni solishtiradi, suv esa suyuqlik.
- Shishaning qattiqligi olinadi — **неверно**. Shishaning qattiqligi suyuq suvning xossasi emas.

**Zichlikni son bilan tavsiflash uchun nima kerak?**

- Faqat rang — **неверно**. Rang massa va hajmni bermaydi. Zichlik uchun birlik va sharoit kerak.
- Faqat hid — **неверно**. Hid boshqa xossa. Zichlik massa va hajmga bogʻliq.
- Qiymat, birlik va sharoit — **верно**. Toʻgʻri: birlik va sharoitsiz son noaniq boʻlishi mumkin.

### Fizik hodisalar

**Цель:** Suyuqlanish, erish va eritmadan tuzni qayta olishni izohlash.

**1. Parafin: suyuqlanish va sovish**

Parafin namunasi qizdirilganda qattiq holatdan suyuq holatga oʻtishi mumkin. Soviganda yana qotadi. Bu topshiriqda sham yonishi emas, holat oʻzgarishi oʻrganiladi.

Sham parafini aralashmadir, shuning uchun unga yagona universal suyuqlanish harorati berilmaydi. Virtual qizdirish boshqariladigan boʻladi; hozir topshiriq tavsifi berilgan.

**2. Tuz eritmada qoladi**

Tuz eriganda kristallar ajratib koʻrinmay qoladi, lekin tuz suvda qoladi. Eritma — aralashma. Aralashtirish erishga yordam beradi, yangi element yaratmaydi.

Eritmadan suv bugʻlanganda tuz kristallari yana koʻrinishi mumkin. Modelda erish va bugʻlatish yangi kimyoviy element yaratish emas, fizik hodisa sifatida qaraladi.

**3. Hid — maʼlumot xossasi**

Uchinchi topshiriqda etil spirti, suyultirilgan sirka kislota eritmasi va efirning hid tavsiflari solishtiriladi. Brauzer hid uzatmaydi: faqat maʼlumot kartochkalari ishlatiladi.

Qaysi efir va namuna tarkibi nazarda tutilganini oʻqituvchi aniqlashtiradi. Uyda bugʻni nafasga olishni takrorlama, notanish moddani hidlama. Maʼlumot xossalarini solishtirishning oʻzi reaksiya emas.

**Словарь**

- **Suyuqlanish:** Qattiq holatdan suyuq holatga oʻtish.
- **Qotish:** Suyuq holatdan qattiq holatga oʻtish.
- **Bugʻlatish:** Erigan moddani olish uchun erituvchini bugʻlanish orqali chiqarish.
- **Fizik hodisa:** Koʻrilayotgan jarayonda yangi moddalar hosil boʻlmaydigan oʻzgarish.

**Вопросы и объяснения**

**Parafin suyuqlanib soviganda nima oʻrganiladi?**

- Agregat holatning oʻzgarishi — **верно**. Toʻgʻri: modelda parafin suyuqlanadi va yana qotadi.
- Parafinning albatta yonishi — **неверно**. Suyuqlanish va yonish boshqa jarayonlar. Bu yerda yonish maqsad emas.
- Yangi element yaratilishi — **неверно**. Holat oʻzgarishi kimyoviy element yaratmaydi.

**Modelda tuz eritmasidan suv chiqarilgach nima qoladi?**

- Hech narsa: tuz yoʻqoldi — **неверно**. Tuz eriganda yoʻqolmagan. Koʻrinadigan kristallar yana hosil boʻlishi mumkin.
- Tuz kristallari — **верно**. Toʻgʻri: suv chiqarilgach tuzni yana kuzatish mumkin.
- Yangi metall — **неверно**. Bu eritmani bugʻlatish tuzni metallga aylantirmaydi.

### Kimyoviy hodisalar

**Цель:** Kuzatishlarni yangi moddalar hosil boʻlishi bilan bogʻlash.

**1. Yonish va yangi moddalar**

Ishda qogʻoz, spirt, gaz va gugurtchoʻp yonishi solishtiriladi. Yonish — yangi moddalar hosil boʻladigan kimyoviy oʻzgarish. Belgilar maʼlum jarayon bilan birga izohlanadi.

Faqat yorugʻlik yoki qizish reaksiyaning universal isboti emas. Aniq tenglamalar uchun gaz va yoqilgʻi tarkibi aniqlashtiriladi. Hozir yonish faol alanga emas, oʻquv matni bilan ifodalangan.

**2. Misning havoda qizdirilishi**

Soddalashtirilgan modelda mis sirtida qora mis(II) oksidi qatlami hosil boʻladi. Dastlabki mis va yangi qatlam solishtiriladi. Bu parafin holatining oʻzgarishidan farq qiladi.

Model izohi: 2Cu + O₂ → 2CuO. Qizdirish va qatlamni shartli solishtirish jihozlar kelishilgach alohida virtual amallar boʻladi.

**3. Karbonat va xlorid kislota**

Boʻr, marmar va ohaktosh karbonat tarkibli namunalar sifatida qaraladi. Tanlangan modelda xlorid kislota bilan taʼsirda karbonat angidrid ajraladi: CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂.

Gaz pufakchalar va suyuqlik ustidagi belgilangan sinov orqali kuzatiladi. Choʻp alangasining oʻchishi gaz tarkibining yagona isboti emas, maʼlum reagentlar bilan birga qaraladi. Haqiqiy namunalar aralashmalari va jarayon tezligi bilan farqlanishi mumkin.

**Словарь**

- **Kimyoviy hodisa:** Yangi moddalar hosil boʻladigan jarayon.
- **Misning oksidlanishi:** Bu modelda misning kislorod bilan taʼsiridan oksid hosil boʻlishi.
- **Karbonat angidrid:** Tanlangan kislota va karbonat modelida hosil boʻladigan CO₂.
- **Reaksiya tenglamasi:** Formulalar va koeffitsiyentlar bilan kimyoviy oʻzgarishning shartli yozuvi.

**Вопросы и объяснения**

**Misni qizdirish modelidagi qora qatlam qanday izohlanadi?**

- Mis faqat suyuqlandi — **неверно**. Faqat holat oʻzgarishi yangi qatlamni izohlamaydi; modelda oksid hosil boʻladi.
- Mis(II) oksidi hosil boʻldi — **верно**. Toʻgʻri: yangi modda hosil boʻlishi oddiy suyuqlanishdan farq qiladi.
- Sirtda osh tuzi paydo boʻldi — **неверно**. Berilgan modelda osh tuzi hosil qiluvchi jarayon yoʻq.

**Bu modelda kislota karbonatga taʼsir qilganda pufakchalar qanday izohlanadi?**

- Har qanday pufakcha doimo havoni isbotlaydi — **неверно**. Faqat pufakcha modda tarkibini aniq bermaydi. Reagentlar va jarayonni hisobga ol.
- Yangi kimyoviy element yaratildi — **неверно**. Bu reaksiyada yangi kimyoviy element yaratilmaydi.
- Tanlangan reaksiyaga muvofiq CO₂ ajraladi — **верно**. Toʻgʻri: xulosa faqat pufakchaga emas, belgilangan reagentlar va reaksiyaga asoslangan.

## Узбекский — кириллица

### Физик хоссалари турлича бўлган моддалар билан танишиш

**Цель:** 12 та намунани солиштириш ва физик хоссаларини ёзиш.

**1. Кузат ва тавсифла**

Намунанинг ҳолати ва рангини кузатиш мумкин. Белгиланган шароитда модда қаттиқ, суюқ ёки газ ҳолатда бўлади. Ранг оддий ёруғликда кўрилади.

Белгиланган намуналарни солиштир. Рангнинг бир хиллиги моддаларнинг бир хил эканини исботламайди. Моддаларни татиб кўрма ва нотаниш намунанинг ҳидини бевосита нафас олиб аниқлама.

**2. Хоссаларни солиштир**

Эрувчанлик модданинг танланган эритувчи билан белгиланган шароитдаги хоссасини ифодалайди. Суюқликлар учун аралашувчанлик ҳақида гапириш мумкин. Кристаллар кўринмаслиги модда йўқолганини англатмайди.

Зичлик масса ва ҳажмни боғлайди: ρ = m/V. Сонли қийматга бирлик ва шароит керак. Қаттиқлик қаттиқ намуналар учун солиштирилади; бу жадвалда сув ва спиртга танланган усул қўлланмайди.

**3. Жадвални мазмунли тўлдир**

Туз, шакар, сода, мис купороси, металлар, сув, спирт, олтингугурт ва йод учун ҳолат, ранг, ҳид, зичлик, сувда эрувчанлик ва қаттиқликни ёз. Иловада ҳид ҳақиқий сезги эмас, маълумот матни билан берилади.

Суюқланиш ва қайнаш ҳароратлари келишилган маълумотномадан олинади. Намуна таркиби, шароит ва манба алоҳида кўрсатилади. Ўқитувчи тасдиқламаган сонлар текширилган жавоб деб берилмайди.

**Словарь**

- **Агрегат ҳолат:** Белгиланган шароитдаги қаттиқ, суюқ ёки газ ҳолат.
- **Зичлик:** Массанинг ҳажмга нисбати: ρ = m/V.
- **Эрувчанлик:** Белгиланган шароитда танланган эритувчи билан эритма ҳосил қилиш хоссаси.
- **Қаттиқлик:** Танланган таққослаш усулида қаттиқ материалнинг тирналишга қаршилиги.

**Вопросы и объяснения**

**Бу жадвалда сувнинг қаттиқлиги қандай ёзилади?**

- Нол ёзилади — **неверно**. Нол ўлчанган қийматни билдирарди. Бу усул суюқ сувга қўлланмайди.
- Қўлланмайди деб белгиланади — **верно**. Тўғри: усул қаттиқ материалларни солиштиради, сув эса суюқлик.
- Шишанинг қаттиқлиги олинади — **неверно**. Шишанинг қаттиқлиги суюқ сувнинг хоссаси эмас.

**Зичликни сон билан тавсифлаш учун нима керак?**

- Фақат ранг — **неверно**. Ранг масса ва ҳажмни бермайди. Зичлик учун бирлик ва шароит керак.
- Фақат ҳид — **неверно**. Ҳид бошқа хосса. Зичлик масса ва ҳажмга боғлиқ.
- Қиймат, бирлик ва шароит — **верно**. Тўғри: бирлик ва шароитсиз сон ноаниқ бўлиши мумкин.

### Физик ҳодисалар

**Цель:** Суюқланиш, эриш ва эритмадан тузни қайта олишни изоҳлаш.

**1. Парафин: суюқланиш ва совиш**

Парафин намунаси қиздирилганда қаттиқ ҳолатдан суюқ ҳолатга ўтиши мумкин. Совиганда яна қотади. Бу топшириқда шам ёниши эмас, ҳолат ўзгариши ўрганилади.

Шам парафини аралашмадир, шунинг учун унга ягона универсал суюқланиш ҳарорати берилмайди. Виртуал қиздириш бошқариладиган бўлади; ҳозир топшириқ тавсифи берилган.

**2. Туз эритмада қолади**

Туз эриганда кристаллар ажратиб кўринмай қолади, лекин туз сувда қолади. Эритма — аралашма. Аралаштириш эришга ёрдам беради, янги элемент яратмайди.

Эритмадан сув буғланганда туз кристаллари яна кўриниши мумкин. Моделда эриш ва буғлатиш янги кимёвий элемент яратиш эмас, физик ҳодиса сифатида қаралади.

**3. Ҳид — маълумот хоссаси**

Учинчи топшириқда этил спирти, суюлтирилган сирка кислота эритмаси ва эфирнинг ҳид тавсифлари солиштирилади. Браузер ҳид узатмайди: фақат маълумот карточкалари ишлатилади.

Қайси эфир ва намуна таркиби назарда тутилганини ўқитувчи аниқлаштиради. Уйда буғни нафасга олишни такрорлама, нотаниш моддани ҳидлама. Маълумот хоссаларини солиштиришнинг ўзи реакция эмас.

**Словарь**

- **Суюқланиш:** Қаттиқ ҳолатдан суюқ ҳолатга ўтиш.
- **Қотиш:** Суюқ ҳолатдан қаттиқ ҳолатга ўтиш.
- **Буғлатиш:** Эриган моддани олиш учун эритувчини буғланиш орқали чиқариш.
- **Физик ҳодиса:** Кўрилаётган жараёнда янги моддалар ҳосил бўлмайдиган ўзгариш.

**Вопросы и объяснения**

**Парафин суюқланиб совиганда нима ўрганилади?**

- Агрегат ҳолатнинг ўзгариши — **верно**. Тўғри: моделда парафин суюқланади ва яна қотади.
- Парафиннинг албатта ёниши — **неверно**. Суюқланиш ва ёниш бошқа жараёнлар. Бу ерда ёниш мақсад эмас.
- Янги элемент яратилиши — **неверно**. Ҳолат ўзгариши кимёвий элемент яратмайди.

**Моделда туз эритмасидан сув чиқарилгач нима қолади?**

- Ҳеч нарса: туз йўқолди — **неверно**. Туз эриганда йўқолмаган. Кўринадиган кристаллар яна ҳосил бўлиши мумкин.
- Туз кристаллари — **верно**. Тўғри: сув чиқарилгач тузни яна кузатиш мумкин.
- Янги металл — **неверно**. Бу эритмани буғлатиш тузни металлга айлантирмайди.

### Кимёвий ҳодисалар

**Цель:** Кузатишларни янги моддалар ҳосил бўлиши билан боғлаш.

**1. Ёниш ва янги моддалар**

Ишда қоғоз, спирт, газ ва гугуртчўп ёниши солиштирилади. Ёниш — янги моддалар ҳосил бўладиган кимёвий ўзгариш. Белгилар маълум жараён билан бирга изоҳланади.

Фақат ёруғлик ёки қизиш реакциянинг универсал исботи эмас. Аниқ тенгламалар учун газ ва ёқилғи таркиби аниқлаштирилади. Ҳозир ёниш фаол аланга эмас, ўқув матни билан ифодаланган.

**2. Миснинг ҳавода қиздирилиши**

Соддалаштирилган моделда мис сиртида қора мис(II) оксиди қатлами ҳосил бўлади. Дастлабки мис ва янги қатлам солиштирилади. Бу парафин ҳолатининг ўзгаришидан фарқ қилади.

Модель изоҳи: 2Cu + O₂ → 2CuO. Қиздириш ва қатламни шартли солиштириш жиҳозлар келишилгач алоҳида виртуал амаллар бўлади.

**3. Карбонат ва хлорид кислота**

Бўр, мармар ва оҳактош карбонат таркибли намуналар сифатида қаралади. Танланган моделда хлорид кислота билан таъсирда карбонат ангидрид ажралади: CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂.

Газ пуфакчалар ва суюқлик устидаги белгиланган синов орқали кузатилади. Чўп алангасининг ўчиши газ таркибининг ягона исботи эмас, маълум реагентлар билан бирга қаралади. Ҳақиқий намуналар аралашмалари ва жараён тезлиги билан фарқланиши мумкин.

**Словарь**

- **Кимёвий ҳодиса:** Янги моддалар ҳосил бўладиган жараён.
- **Миснинг оксидланиши:** Бу моделда миснинг кислород билан таъсиридан оксид ҳосил бўлиши.
- **Карбонат ангидрид:** Танланган кислота ва карбонат моделида ҳосил бўладиган CO₂.
- **Реакция тенгламаси:** Формулалар ва коэффициентлар билан кимёвий ўзгаришнинг шартли ёзуви.

**Вопросы и объяснения**

**Мисни қиздириш моделидаги қора қатлам қандай изоҳланади?**

- Мис фақат суюқланди — **неверно**. Фақат ҳолат ўзгариши янги қатламни изоҳламайди; моделда оксид ҳосил бўлади.
- Мис(II) оксиди ҳосил бўлди — **верно**. Тўғри: янги модда ҳосил бўлиши оддий суюқланишдан фарқ қилади.
- Сиртда ош тузи пайдо бўлди — **неверно**. Берилган моделда ош тузи ҳосил қилувчи жараён йўқ.

**Бу моделда кислота карбонатга таъсир қилганда пуфакчалар қандай изоҳланади?**

- Ҳар қандай пуфакча доимо ҳавони исботлайди — **неверно**. Фақат пуфакча модда таркибини аниқ бермайди. Реагентлар ва жараённи ҳисобга ол.
- Янги кимёвий элемент яратилди — **неверно**. Бу реакцияда янги кимёвий элемент яратилмайди.
- Танланган реакцияга мувофиқ CO₂ ажралади — **верно**. Тўғри: хулоса фақат пуфакчага эмас, белгиланган реагентлар ва реакцияга асосланган.

## English

### Exploring substances with different physical properties

**Цель:** Compare 12 samples and record their physical properties.

**1. Observe and describe**

You can observe a sample’s state and colour. Under specified conditions a substance can be solid, liquid or gas. Examine colour under ordinary lighting.

Compare labelled samples. The same colour does not prove they are the same substance. Never taste substances or directly inhale an unknown sample to determine its odour.

**2. Compare properties**

Solubility describes behaviour with a chosen solvent under specified conditions. For liquids, miscibility may be the relevant description. Crystals no longer being visible does not mean the substance has disappeared.

Density relates mass and volume: ρ = m/V. Numerical values need units and conditions. Hardness is compared for solid samples; the chosen hardness method does not apply to water and alcohol in this table.

**3. Complete the table thoughtfully**

Record state, colour, odour, density, water solubility and hardness for salt, sugar, baking soda, copper sulfate, metals, water, alcohol, sulfur and iodine. Odour is shown as reference text, not a real sensation.

Use an agreed reference for melting and boiling temperatures. Record sample composition, conditions and source separately. Numerical data pending teacher review are not presented as verified answers.

**Словарь**

- **State of matter:** Solid, liquid or gas under specified conditions.
- **Density:** Mass divided by volume: ρ = m/V.
- **Solubility:** The ability to form a solution with a chosen solvent under specified conditions.
- **Hardness:** Resistance of a solid material to scratching in the chosen comparison method.

**Вопросы и объяснения**

**How should water’s hardness be entered in this table?**

- Enter zero — **неверно**. Zero would imply a measured value. This hardness method does not apply to liquid water.
- Mark it as not applicable — **верно**. Correct: this method compares solid materials, while water is liquid.
- Use the hardness of glass — **неверно**. The hardness of glass does not describe liquid water.

**What is needed to describe density numerically?**

- Only the colour — **неверно**. Colour does not specify mass and volume. Density requires units and conditions.
- Only the odour — **неверно**. Odour is a different property. Density concerns mass and volume.
- A value, units and conditions — **верно**. Correct: a value without units and conditions can be ambiguous.

### Physical changes

**Цель:** Explain melting, dissolving and recovering salt from a solution.

**1. Paraffin: melting and cooling**

Heating can turn a paraffin sample from solid to liquid. It solidifies again on cooling. This task studies a change of state, not candle combustion.

Candle paraffin is a mixture, so it does not have one universal melting temperature. Virtual heating will be controlled; this stage provides the task description.

**2. Salt remains in solution**

When salt dissolves, crystals are no longer distinguishable, but the salt remains in the water. A solution is a mixture. Stirring helps dissolving; it does not create an element.

Removing water by evaporation can make salt crystals visible again. In this model dissolving and evaporation are physical changes, not the creation of a new chemical element.

**3. Odour as a reference property**

The third task compares descriptions of ethanol, diluted acetic acid solution and ether. A browser cannot transmit odours: only reference cards will be used.

The particular ether and sample compositions need teacher clarification. Do not reproduce vapour inhalation at home or smell unknown substances. Comparing reference properties is not itself a reaction.

**Словарь**

- **Melting:** A change from solid to liquid.
- **Solidification:** A change from liquid to solid.
- **Evaporation to recover a solute:** Removing solvent by evaporation to recover the dissolved substance.
- **Physical change:** A change in which no new substances form in the process being considered.

**Вопросы и объяснения**

**What is studied when paraffin melts and cools?**

- A change of state — **верно**. Correct: in this model paraffin melts and solidifies again.
- The necessary burning of paraffin — **неверно**. Melting and burning are different processes. Burning is not the aim here.
- The creation of a new element — **неверно**. Changing state does not create a chemical element.

**What remains after removing the water from the salt solution in this model?**

- Nothing: the salt disappeared — **неверно**. Salt did not disappear when it dissolved. Visible crystals can form again.
- Salt crystals — **верно**. Correct: salt can be observed again after removing water.
- A new metal — **неверно**. Evaporating this solution does not turn salt into a metal.

### Chemical changes

**Цель:** Connect observations with the formation of new substances.

**1. Burning and new substances**

This work compares burning paper, alcohol, gas and a match. Combustion is a chemical change involving the formation of new substances. Observations are considered together with the known process.

Light or heating alone is not universal proof of a reaction. Gas and fuel compositions need clarification before assigning specific equations. At this stage burning is described in text, with no functioning flame source.

**2. Copper heated in air**

The simplified model forms a black layer of copper(II) oxide on copper. Compare the original copper and the new surface layer. This differs from merely changing paraffin’s state.

The model is explained by 2Cu + O₂ → 2CuO. Heating and comparing the layer will be separate virtual actions after the equipment is agreed.

**3. Carbonate and hydrochloric acid**

Chalk, marble and limestone are treated as samples containing a carbonate component. The chosen model releases carbon dioxide on reaction with hydrochloric acid: CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂.

Observe gas bubbles and the specified test above the liquid. A splint going out is considered with known reactants, not as unique proof of gas identity. Real samples can differ in impurities and reaction rate.

**Словарь**

- **Chemical change:** A process in which new substances form.
- **Copper oxidation:** In this model, copper reacts with oxygen to form an oxide.
- **Carbon dioxide:** CO₂ formed in the selected acid–carbonate model.
- **Reaction equation:** A representation of chemical change using formulas and coefficients.

**Вопросы и объяснения**

**What explains the black layer in the copper-heating model?**

- The copper only melted — **неверно**. A state change alone does not explain the new layer; the model forms an oxide.
- Copper(II) oxide formed — **верно**. Correct: a new substance distinguishes the process from simple melting.
- Table salt appeared on the surface — **неверно**. The specified model has no process producing table salt.

**How are bubbles explained in this acid–carbonate model?**

- Any bubbles always prove that air is present — **неверно**. Bubbles alone do not uniquely identify a substance. Consider the reactants and process.
- A new chemical element was created — **неверно**. This reaction does not create a new chemical element.
- CO₂ is released according to the selected reaction — **верно**. Correct: the conclusion uses the specified reactants and reaction, not bubbles alone.
