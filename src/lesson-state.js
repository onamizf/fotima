const lessonContent={};
const lessonUIKeys=['lessonBanner','editorial','goalLabel','glossaryLabel','quizLabel','readAgain','checkAnswer','selectAnswer','correctLabel','retryLabel','theoryPassed','theoryPending','toDemo','readingLabel','lessonProgress','practicePending','resetQuiz','diagramLabel','residueLabel','filtrateLabel','reviewNote'];
const lessonUIRows={
ru:['Этап 4 · Предварительные уроки. Химия и переводы ожидают проверки преподавателем. Лаборатория пока демонстрационная.','Предварительный учебный материал — ещё не сверен с конкретным учебником.','Цель урока','Словарь терминов','Проверь понимание','Вернуться к объяснению','Проверить ответ','Выбери ответ, затем нажми «Проверить ответ».','Верно','Пока неверно — попробуй ещё раз','Теория и вопросы пройдены','Сначала прочитай три части и правильно ответь на оба вопроса.','Перейти в демонстрационную лабораторию','Часть','Теория пройдена','Опыт ещё не выполнен. Пройденная теория не завершает всю тему.','Повторить вопросы','Схема учебной модели','Песок · остаток на фильтре','Вода · фильтрат в сосуде','Можно возвращаться к тексту и исправлять ответы без ограничения попыток.'],
'uz-Latn':['4-bosqich · Dastlabki darslar. Kimyo mazmuni va tarjimalar oʻqituvchi tekshiruvini kutmoqda. Laboratoriya hozircha namuna.','Dastlabki oʻquv materiali — muayyan darslik bilan hali solishtirilmagan.','Dars maqsadi','Atamalar lugʻati','Tushunganingni tekshir','Tushuntirishga qaytish','Javobni tekshirish','Javobni tanla, soʻng «Javobni tekshirish»ni bos.','Toʻgʻri','Hozircha notoʻgʻri — yana urinib koʻr','Nazariya va savollar tugallandi','Avval uch qismni oʻqi va ikkala savolga toʻgʻri javob ber.','Namuna laboratoriyasiga oʻtish','Qism','Nazariya tugallangan','Tajriba hali bajarilmadi. Nazariyani tugatish butun mavzuni yakunlamaydi.','Savollarni takrorlash','Oʻquv modeli chizmasi','Qum · filtrdagi qoldiq','Suv · idishdagi filtrat','Matnga qaytish va javoblarni cheksiz urinishlar bilan tuzatish mumkin.'],
'uz-Cyrl':['4-босқич · Дастлабки дарслар. Кимё мазмуни ва таржималар ўқитувчи текширувини кутмоқда. Лаборатория ҳозирча намуна.','Дастлабки ўқув материали — муайян дарслик билан ҳали солиштирилмаган.','Дарс мақсади','Атамалар луғати','Тушунганингни текшир','Тушунтиришга қайтиш','Жавобни текшириш','Жавобни танла, сўнг «Жавобни текшириш»ни бос.','Тўғри','Ҳозирча нотўғри — яна уриниб кўр','Назария ва саволлар тугалланди','Аввал уч қисмни ўқи ва иккала саволга тўғри жавоб бер.','Намуна лабораториясига ўтиш','Қисм','Назария тугалланган','Тажриба ҳали бажарилмади. Назарияни тугатиш бутун мавзуни якунламайди.','Саволларни такрорлаш','Ўқув модели чизмаси','Қум · фильтрдаги қолдиқ','Сув · идишдаги фильтрат','Матнга қайтиш ва жавобларни чексиз уринишлар билан тузатиш мумкин.'],
en:['Stage 4 · Draft lessons. Chemistry content and translations await teacher review. The laboratory is still a demo.','Draft learning material — not yet checked against a specific textbook.','Lesson goal','Glossary','Check your understanding','Return to the explanation','Check answer','Choose an answer, then select “Check answer”.','Correct','Not yet — try again','Theory and questions completed','Read all three parts and answer both questions correctly first.','Open the demonstration laboratory','Part','Theory completed','The experiment has not been completed. Passing theory does not complete the whole topic.','Repeat questions','Learning model diagram','Sand · residue on the filter','Water · filtrate in the vessel','You can revisit the text and correct answers without a limit on attempts.']};
for(const [language,row] of Object.entries(lessonUIRows)){
 if(row.length!==lessonUIKeys.length)throw new Error('Missing lesson UI translations: '+language);
 Object.assign(dictionaries[language],Object.fromEntries(lessonUIKeys.map((key,i)=>[key,row[i]])));
 dictionaries[language].demo=dictionaries[language].lessonBanner;
}
function blankLesson(){return {version:2,step:0,visited:[],answers:{}};}
function sanitiseLesson(value,topicId){
 const lesson=lessonContent.ru[topicId],clean=blankLesson();
 if(!value||value.version!==lesson.version)return clean;
 clean.step=Number.isInteger(value.step)?Math.max(0,Math.min(3,value.step)):0;
 clean.visited=Array.isArray(value.visited)?[...new Set(value.visited.filter(n=>Number.isInteger(n)&&n>=0&&n<3))]:[];
 for(const question of lesson.questions){
  const answer=value.answers?.[question.id];
  if(answer&&question.options.some(option=>option.id===answer.selected))clean.answers[question.id]={selected:answer.selected,checked:answer.checked===true,attempts:Number.isSafeInteger(answer.attempts)?Math.max(0,Math.min(1000000,answer.attempts)):0};
 }
 if(clean.step===3&&clean.visited.length!==3)clean.step=0;
 return clean;
}
function currentLesson(topicId){return state.lessons[topicId]||(state.lessons[topicId]=blankLesson());}
function lessonPassed(topicId){const progress=state.lessons[topicId],lesson=lessonContent.ru[topicId];return !!progress&&progress.version===lesson.version&&progress.visited.length===3&&lesson.questions.every(q=>progress.answers[q.id]?.checked&&progress.answers[q.id].selected===q.correct);}
