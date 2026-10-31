/* Canonical glossary shared by collection, search, practice tooltips and self-check. */
const LearningLexicon=(()=>{
 const items=[
  {
    "id": "word-safety",
    "chapter": "ch1",
    "term": {
      "ru": "Техника безопасности",
      "en": "Laboratory safety",
      "uz-Latn": "Xavfsizlik qoidalari",
      "uz-Cyrl": "Хавфсизлик қоидалари"
    },
    "definition": {
      "ru": "Правила, которые помогают защитить людей во время работы.",
      "en": "Rules that protect people during work.",
      "uz-Latn": "Ish vaqtida odamlarni himoya qiladigan qoidalar.",
      "uz-Cyrl": "Иш вақтида одамларни ҳимоя қиладиган қоидалар."
    },
    "example": {
      "ru": "Перед опытом убирают волосы и надевают очки.",
      "en": "Tie back hair and put on goggles before an experiment.",
      "uz-Latn": "Tajribadan oldin soch yig‘iladi va ko‘zoynak taqiladi.",
      "uz-Cyrl": "Тажрибадан олдин соч йиғилади ва кўзойнак тақилади."
    }
  },
  {
    "id": "word-reagent",
    "chapter": "ch1",
    "term": {
      "ru": "Реактив",
      "en": "Reagent",
      "uz-Latn": "Reaktiv",
      "uz-Cyrl": "Реактив"
    },
    "definition": {
      "ru": "Вещество, которое используют для проведения химического опыта.",
      "en": "A substance used in a chemical experiment.",
      "uz-Latn": "Kimyoviy tajribada ishlatiladigan modda.",
      "uz-Cyrl": "Кимёвий тажрибада ишлатиладиган модда."
    },
    "example": {
      "ru": "Раствор медного купороса — лабораторный реактив.",
      "en": "Copper sulfate solution is a laboratory reagent.",
      "uz-Latn": "Mis kuporosi eritmasi laboratoriya reaktividir.",
      "uz-Cyrl": "Мис купороси эритмаси лаборатория реактивидир."
    }
  },
  {
    "id": "word-goggles",
    "chapter": "ch1",
    "term": {
      "ru": "Защитные очки",
      "en": "Safety goggles",
      "uz-Latn": "Himoya ko‘zoynagi",
      "uz-Cyrl": "Ҳимоя кўзойнаги"
    },
    "definition": {
      "ru": "Средство защиты глаз от брызг и мелких частиц.",
      "en": "Eye protection against splashes and small particles.",
      "uz-Latn": "Ko‘zni sachrash va mayda zarrachalardan himoya qiluvchi vosita.",
      "uz-Cyrl": "Кўзни сачраш ва майда заррачалардан ҳимоя қилувчи восита."
    },
    "example": {
      "ru": "Их надевают до начала работы с растворами.",
      "en": "Put them on before working with solutions.",
      "uz-Latn": "Eritmalar bilan ishlashdan oldin taqiladi.",
      "uz-Cyrl": "Эритмалар билан ишлашдан олдин тақилади."
    }
  },
  {
    "id": "word-water-bath",
    "chapter": "ch1",
    "term": {
      "ru": "Водяная баня",
      "en": "Water bath",
      "uz-Latn": "Suv hammomi",
      "uz-Cyrl": "Сув ҳаммоми"
    },
    "definition": {
      "ru": "Нагревание сосуда с веществом через окружающую его горячую воду.",
      "en": "Heating a container through the hot water surrounding it.",
      "uz-Latn": "Moddali idishni atrofidagi issiq suv orqali isitish.",
      "uz-Cyrl": "Моддали идишни атрофидаги иссиқ сув орқали иситиш."
    },
    "example": {
      "ru": "Пробирку со спиртом нагревают в стакане с водой, без прямого пламени.",
      "en": "Heat the alcohol tube inside a beaker of water, away from direct flame.",
      "uz-Latn": "Spirtli probirka suvli stakanda, alangaga bevosita tekkizmasdan isitiladi.",
      "uz-Cyrl": "Спиртли пробирка сувли стаканда, алангага бевосита теккизмасдан иситилади."
    }
  },
  {
    "id": "word-temperature",
    "chapter": "ch2",
    "term": {
      "ru": "Температура",
      "en": "Temperature",
      "uz-Latn": "Harorat",
      "uz-Cyrl": "Ҳарорат"
    },
    "definition": {
      "ru": "Величина, которая характеризует степень нагретости тела.",
      "en": "A quantity describing how hot or cold a body is.",
      "uz-Latn": "Jismning qay darajada issiq yoki sovuqligini ifodalovchi kattalik.",
      "uz-Cyrl": "Жисмнинг қай даражада иссиқ ёки совуқлигини ифодаловчи катталик."
    },
    "example": {
      "ru": "Термометр показывает температуру воды.",
      "en": "A thermometer shows water temperature.",
      "uz-Latn": "Termometr suv haroratini ko‘rsatadi.",
      "uz-Cyrl": "Термометр сув ҳароратини кўрсатади."
    }
  },
  {
    "id": "word-boiling",
    "chapter": "ch2",
    "term": {
      "ru": "Кипение",
      "en": "Boiling",
      "uz-Latn": "Qaynash",
      "uz-Cyrl": "Қайнаш"
    },
    "definition": {
      "ru": "Переход жидкости в газ по всему её объёму с образованием пузырьков.",
      "en": "A liquid becoming gas throughout its volume, forming bubbles.",
      "uz-Latn": "Suyuqlikning butun hajmida pufakchalar hosil qilib gazga aylanishi.",
      "uz-Cyrl": "Суюқликнинг бутун ҳажмида пуфакчалар ҳосил қилиб газга айланиши."
    },
    "example": {
      "ru": "В кипящем чайнике образуются пузырьки водяного пара.",
      "en": "Steam bubbles form in a boiling kettle.",
      "uz-Latn": "Qaynayotgan choynakda suv bug‘i pufakchalari paydo bo‘ladi.",
      "uz-Cyrl": "Қайнаётган чойнакда сув буғи пуфакчалари пайдо бўлади."
    }
  },
  {
    "id": "word-condensation",
    "chapter": "ch2",
    "term": {
      "ru": "Конденсация",
      "en": "Condensation",
      "uz-Latn": "Kondensatsiya",
      "uz-Cyrl": "Конденсация"
    },
    "definition": {
      "ru": "Переход вещества из газообразного состояния в жидкое.",
      "en": "A substance changing from gas to liquid.",
      "uz-Latn": "Moddaning gaz holatidan suyuq holatga o‘tishi.",
      "uz-Cyrl": "Модданинг газ ҳолатидан суюқ ҳолатга ўтиши."
    },
    "example": {
      "ru": "На холодном стакане появляются капельки воды из воздуха.",
      "en": "Water droplets from the air appear on a cold glass.",
      "uz-Latn": "Sovuq stakanda havodagi suvdan tomchilar paydo bo‘ladi.",
      "uz-Cyrl": "Совуқ стаканда ҳаводаги сувдан томчилар пайдо бўлади."
    }
  },
  {
    "id": "word-diffusion",
    "chapter": "ch2",
    "term": {
      "ru": "Диффузия",
      "en": "Diffusion",
      "uz-Latn": "Diffuziya",
      "uz-Cyrl": "Диффузия"
    },
    "definition": {
      "ru": "Самопроизвольное перемешивание частиц веществ из-за их движения.",
      "en": "Particles mixing spontaneously because they are moving.",
      "uz-Latn": "Zarrachalarning harakati tufayli o‘z-o‘zidan aralashishi.",
      "uz-Cyrl": "Заррачаларнинг ҳаракати туфайли ўз-ўзидан аралашиши."
    },
    "example": {
      "ru": "Капля красителя постепенно окрашивает воду.",
      "en": "A drop of dye gradually colours water.",
      "uz-Latn": "Bo‘yoq tomchisi suvga asta-sekin tarqaladi.",
      "uz-Cyrl": "Бўёқ томчиси сувга аста-секин тарқалади."
    }
  },
  {
    "id": "word-atom",
    "chapter": "ch3",
    "term": {
      "ru": "Атом",
      "en": "Atom",
      "uz-Latn": "Atom",
      "uz-Cyrl": "Атом"
    },
    "definition": {
      "ru": "Мельчайшая химически неделимая частица элемента, сохраняющая его химическую принадлежность.",
      "en": "The smallest chemically indivisible particle of an element that retains its chemical identity.",
      "uz-Latn": "Elementning kimyoviy mansubligini saqlovchi kimyoviy bo‘linmas eng kichik zarracha.",
      "uz-Cyrl": "Элементнинг кимёвий мансублигини сақловчи кимёвий бўлинмас энг кичик заррача."
    },
    "example": {
      "ru": "Медная проволока состоит из атомов меди.",
      "en": "Copper wire consists of copper atoms.",
      "uz-Latn": "Mis sim mis atomlaridan iborat.",
      "uz-Cyrl": "Мис сим мис атомларидан иборат."
    }
  },
  {
    "id": "word-molecule",
    "chapter": "ch3",
    "term": {
      "ru": "Молекула",
      "en": "Molecule",
      "uz-Latn": "Molekula",
      "uz-Cyrl": "Молекула"
    },
    "definition": {
      "ru": "Частица вещества из связанных между собой атомов.",
      "en": "A particle consisting of atoms bonded together.",
      "uz-Latn": "O‘zaro bog‘langan atomlardan tashkil topgan zarracha.",
      "uz-Cyrl": "Ўзаро боғланган атомлардан ташкил топган заррача."
    },
    "example": {
      "ru": "В молекуле воды H₂O два атома водорода и один кислорода.",
      "en": "An H₂O molecule has two hydrogen atoms and one oxygen atom.",
      "uz-Latn": "H₂O molekulasida ikkita vodorod va bitta kislorod atomi bor.",
      "uz-Cyrl": "H₂O молекуласида иккита водород ва битта кислород атоми бор."
    }
  },
  {
    "id": "word-element",
    "chapter": "ch3",
    "term": {
      "ru": "Химический элемент",
      "en": "Chemical element",
      "uz-Latn": "Kimyoviy element",
      "uz-Cyrl": "Кимёвий элемент"
    },
    "definition": {
      "ru": "Вид атомов с одинаковым числом протонов в ядре.",
      "en": "Atoms of a kind with the same number of protons in their nuclei.",
      "uz-Latn": "Yadrosidagi protonlar soni bir xil bo‘lgan atomlar turi.",
      "uz-Cyrl": "Ядросидаги протонлар сони бир хил бўлган атомлар тури."
    },
    "example": {
      "ru": "Кислород — элемент с порядковым номером 8.",
      "en": "Oxygen is the element with atomic number 8.",
      "uz-Latn": "Kislorodning tartib raqami 8.",
      "uz-Cyrl": "Кислороднинг тартиб рақами 8."
    }
  },
  {
    "id": "word-symbol",
    "chapter": "ch3",
    "term": {
      "ru": "Химический символ",
      "en": "Chemical symbol",
      "uz-Latn": "Kimyoviy belgi",
      "uz-Cyrl": "Кимёвий белги"
    },
    "definition": {
      "ru": "Краткое буквенное обозначение химического элемента.",
      "en": "A short letter notation for a chemical element.",
      "uz-Latn": "Kimyoviy elementning qisqa harfli ifodasi.",
      "uz-Cyrl": "Кимёвий элементнинг қисқа ҳарфли ифодаси."
    },
    "example": {
      "ru": "Fe обозначает железо, O — кислород.",
      "en": "Fe denotes iron; O denotes oxygen.",
      "uz-Latn": "Fe temirni, O kislorodni bildiradi.",
      "uz-Cyrl": "Fe темирни, O кислородни билдиради."
    }
  },
  {
    "id": "word-mass",
    "chapter": "ch4",
    "term": {
      "ru": "Масса",
      "en": "Mass",
      "uz-Latn": "Massa",
      "uz-Cyrl": "Масса"
    },
    "definition": {
      "ru": "Физическая величина, которую определяют взвешиванием и измеряют, например, в граммах.",
      "en": "A physical quantity determined by weighing and measured, for example, in grams.",
      "uz-Latn": "Tortish orqali aniqlanadigan, masalan, grammlarda o‘lchanadigan kattalik.",
      "uz-Cyrl": "Тортиш орқали аниқланадиган, масалан, граммларда ўлчанадиган катталик."
    },
    "example": {
      "ru": "На весах отвешивают 5 г соли.",
      "en": "Weigh out 5 g of salt on a balance.",
      "uz-Latn": "Tarozida 5 g tuz tortiladi.",
      "uz-Cyrl": "Тарозида 5 g туз тортилади."
    }
  },
  {
    "id": "word-volume",
    "chapter": "ch4",
    "term": {
      "ru": "Объём",
      "en": "Volume",
      "uz-Latn": "Hajm",
      "uz-Cyrl": "Ҳажм"
    },
    "definition": {
      "ru": "Пространство, которое занимает тело или порция вещества.",
      "en": "The space occupied by a body or a quantity of substance.",
      "uz-Latn": "Jism yoki modda egallagan fazo.",
      "uz-Cyrl": "Жисм ёки модда эгаллаган фазо."
    },
    "example": {
      "ru": "Мерным цилиндром отмеряют 50 мл воды.",
      "en": "Measure 50 ml of water with a measuring cylinder.",
      "uz-Latn": "Menzurka bilan 50 ml suv o‘lchanadi.",
      "uz-Cyrl": "Мензурка билан 50 ml сув ўлчанади."
    }
  },
  {
    "id": "word-property",
    "chapter": "ch4",
    "term": {
      "ru": "Физическое свойство",
      "en": "Physical property",
      "uz-Latn": "Fizik xossa",
      "uz-Cyrl": "Физик хосса"
    },
    "definition": {
      "ru": "Признак вещества, который изучают без превращения его в другое вещество.",
      "en": "A property studied without converting the substance into another substance.",
      "uz-Latn": "Moddani boshqa moddaga aylantirmasdan o‘rganiladigan belgi.",
      "uz-Cyrl": "Моддани бошқа моддага айлантирмасдан ўрганиладиган белги."
    },
    "example": {
      "ru": "Цвет и плотность — физические свойства.",
      "en": "Colour and density are physical properties.",
      "uz-Latn": "Rang va zichlik fizik xossalardir.",
      "uz-Cyrl": "Ранг ва зичлик физик хоссалардир."
    }
  },
  {
    "id": "word-reaction",
    "chapter": "ch5",
    "term": {
      "ru": "Химическая реакция",
      "en": "Chemical reaction",
      "uz-Latn": "Kimyoviy reaksiya",
      "uz-Cyrl": "Кимёвий реакция"
    },
    "definition": {
      "ru": "Превращение одних веществ в другие.",
      "en": "A change in which substances form other substances.",
      "uz-Latn": "Bir moddalarning boshqa moddalarga aylanishi.",
      "uz-Cyrl": "Бир моддаларнинг бошқа моддаларга айланиши."
    },
    "example": {
      "ru": "При горении образуются новые вещества.",
      "en": "Burning produces new substances.",
      "uz-Latn": "Yonishda yangi moddalar hosil bo‘ladi.",
      "uz-Cyrl": "Ёнишда янги моддалар ҳосил бўлади."
    }
  },
  {
    "id": "word-catalyst",
    "chapter": "ch5",
    "term": {
      "ru": "Катализатор",
      "en": "Catalyst",
      "uz-Latn": "Katalizator",
      "uz-Cyrl": "Катализатор"
    },
    "definition": {
      "ru": "Вещество, изменяющее скорость реакции и восстанавливающееся к её концу.",
      "en": "A substance that changes reaction rate and is regenerated by the end.",
      "uz-Latn": "Reaksiya tezligini o‘zgartirib, oxirida qayta tiklanadigan modda.",
      "uz-Cyrl": "Реакция тезлигини ўзгартириб, охирида қайта тикланадиган модда."
    },
    "example": {
      "ru": "Ферменты помогают многим реакциям в организме.",
      "en": "Enzymes help many reactions in the body.",
      "uz-Latn": "Fermentlar organizmdagi ko‘p reaksiyalarga yordam beradi.",
      "uz-Cyrl": "Ферментлар организмдаги кўп реакцияларга ёрдам беради."
    }
  },
  {
    "id": "word-mixture",
    "chapter": "ch6",
    "term": {
      "ru": "Смесь",
      "en": "Mixture",
      "uz-Latn": "Aralashma",
      "uz-Cyrl": "Аралашма"
    },
    "definition": {
      "ru": "Совокупность двух или более веществ, которые можно разделить физическими способами.",
      "en": "Two or more substances together that can be separated physically.",
      "uz-Latn": "Fizik usullar bilan ajratish mumkin bo‘lgan ikki yoki undan ortiq modda.",
      "uz-Cyrl": "Физик усуллар билан ажратиш мумкин бўлган икки ёки ундан ортиқ модда."
    },
    "example": {
      "ru": "Воздух — смесь газов.",
      "en": "Air is a mixture of gases.",
      "uz-Latn": "Havo gazlar aralashmasidir.",
      "uz-Cyrl": "Ҳаво газлар аралашмасидир."
    }
  },
  {
    "id": "word-pure",
    "chapter": "ch6",
    "term": {
      "ru": "Чистое вещество",
      "en": "Pure substance",
      "uz-Latn": "Sof modda",
      "uz-Cyrl": "Соф модда"
    },
    "definition": {
      "ru": "Вещество с определённым составом, без примесей других веществ.",
      "en": "A substance of definite composition without other substances as impurities.",
      "uz-Latn": "Boshqa moddalar qo‘shimchasisiz, muayyan tarkibli modda.",
      "uz-Cyrl": "Бошқа моддалар қўшимчасисиз, муайян таркибли модда."
    },
    "example": {
      "ru": "Чистая дистиллированная вода состоит из H₂O.",
      "en": "Pure distilled water consists of H₂O.",
      "uz-Latn": "Sof distillangan suv H₂O dan iborat.",
      "uz-Cyrl": "Соф дистилланган сув H₂O дан иборат."
    }
  },
  {
    "id": "word-solution",
    "chapter": "ch6",
    "term": {
      "ru": "Раствор",
      "en": "Solution",
      "uz-Latn": "Eritma",
      "uz-Cyrl": "Эритма"
    },
    "definition": {
      "ru": "Однородная смесь растворителя и растворённого вещества.",
      "en": "A homogeneous mixture of solvent and dissolved substance.",
      "uz-Latn": "Erituvchi va erigan moddaning bir jinsli aralashmasi.",
      "uz-Cyrl": "Эритувчи ва эриган модданинг бир жинсли аралашмаси."
    },
    "example": {
      "ru": "Соль равномерно распределяется в солёной воде.",
      "en": "Salt is evenly distributed in salt water.",
      "uz-Latn": "Tuz sho‘r suvda bir tekis tarqalgan.",
      "uz-Cyrl": "Туз шўр сувда бир текис тарқалган."
    }
  }
];
 const languages=['ru','en','uz-Latn','uz-Cyrl'];
 for(const item of Practical12Data.items){const details=EquipmentCardData.items.find(d=>d.id===item.id);items.push({id:'lab-'+item.id,chapter:'ch1',term:item.name,definition:details.definition,example:details.why});}
 for(const id of ['burner','stand']){const part=Setup12Data.parts.find(p=>p.id===id);items.push({id:'lab-'+id,chapter:'ch1',term:part.name,definition:part.definition,example:part.purpose});}
 for(const [topic,chapter]of Object.entries({properties:'ch4',physical:'ch2',chemical:'ch5'}))for(let i=0;i<lessonContent.ru[topic].glossary.length;i++){const term={},definition={};for(const lang of languages){const entry=lessonContent[lang]?.[topic]?.glossary[i]||lessonContent.ru[topic].glossary[i];term[lang]=entry.term;definition[lang]=entry.definition;}const examples={properties:[['Лёд — твёрдый, вода — жидкая, пар — газообразный.','Ice is solid, water is liquid, steam is gas.','Muz qattiq, suv suyuq, bug‘ gazdir.','Муз қаттиқ, сув суюқ, буғ газдир.'],['Одинаковый объём железа тяжелее такого же объёма пробки.','An equal volume of iron is heavier than cork.','Bir xil hajmdagi temir po‘kakdan og‘irroq.','Бир хил ҳажмдаги темир пўкакдан оғирроқ.'],['Сахар растворяется в чае.','Sugar dissolves in tea.','Shakar choyda eriydi.','Шакар чойда эрийди.'],['Сталь царапает более мягкий материал.','Steel scratches a softer material.','Po‘lat yumshoqroq materialni tirnaydi.','Пўлат юмшоқроқ материални тирнайди.']],physical:[['Лёд превращается в воду.','Ice turns into water.','Muz suvga aylanadi.','Муз сувга айланади.'],['В морозилке вода становится льдом.','Water becomes ice in a freezer.','Muzlatkichda suv muzga aylanadi.','Музлаткичда сув музга айланади.'],['После испарения солёной воды остаются кристаллы соли.','Salt crystals remain after salt water evaporates.','Sho‘r suv bug‘langach tuz kristallari qoladi.','Шўр сув буғлангач туз кристаллари қолади.'],['Согнутая проволока остаётся тем же веществом.','Bent wire is still the same substance.','Egilgan sim o‘sha modda bo‘lib qoladi.','Эгилган сим ўша модда бўлиб қолади.']],chemical:[['Железо ржавеет.','Iron rusts.','Temir zanglaydi.','Темир занглайди.'],['При нагревании на меди образуется тёмный оксид.','Heating copper forms a dark oxide.','Mis qizdirilganda to‘q oksid hosil bo‘ladi.','Мис қиздирилганда тўқ оксид ҳосил бўлади.'],['CO₂ выделяется при взаимодействии мела с кислотой.','CO₂ is released when chalk reacts with acid.','Bo‘r kislota bilan reaksiyada CO₂ chiqaradi.','Бўр кислота билан реакцияда CO₂ чиқаради.'],['2H₂ + O₂ → 2H₂O.','2H₂ + O₂ → 2H₂O.','2H₂ + O₂ → 2H₂O.','2H₂ + O₂ → 2H₂O.']]};items.push({id:'curriculum-'+topic+'-'+i,chapter:topic==='properties'&&i===0?'ch2':chapter,term,definition,example:Object.fromEntries(languages.map((lang,n)=>[lang,examples[topic][i][n]]))});}
 for(const item of items){item.aliases={};const native=Setup12Data.parts.find(p=>p.id===item.id.replace('lab-',''));for(const language of languages){item.aliases[language]=native?.name?.[language]?[native.name[language]]:[];}}
 const russian={'lab-test-tube':['пробирку','пробирке','пробирки'],'lab-beaker':['стакан','стакане','стакана'],'lab-conical-flask':['колба','колбу','колбе'],'lab-funnel':['воронку','воронке'],'lab-measuring-cylinder':['мерным цилиндром','мерном цилиндре'],'lab-burner':['горелка','горелку','горелки'],'lab-stand':['штатив','штативе'],'word-goggles':['очки','очков'],'word-water-bath':['водяной бани','водяную баню'],'word-reagent':['реактивы','реактива','реактивов']};for(const [id,list]of Object.entries(russian))items.find(i=>i.id===id).aliases.ru.push(...list);
 const available=()=>items.filter(i=>PersonalPages.startedChapters().some(c=>c.id===i.chapter)),chapterName=id=>TextbookCourse.copy('chapter',{n:TextbookCourse.chapter(id).number});
 return {items,available,chapterName};
})();
