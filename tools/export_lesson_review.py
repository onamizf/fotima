"""Export the exact current lesson data for teacher review; no source text is invented."""
import json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
lines=['# Учебные тексты новых лабораторных для проверки','', '**Редакция:** 0.2 · **Дата:** 19 октября 2026 г. · **Статус:** экспертная и языковая проверка не выполнены.','', 'Основа — одобренные REVISED_LABORATORY_SCENARIOS.md и три лабораторные работы, присланные заказчиком. Страна — Узбекистан; известны издательские сведения «SHARQ», Ташкент, 2017. Авторы и точное издание будут добавлены позже. Предыдущие практические работы не подменяют этот перечень.','', '## Вопросы преподавателю','', '- Подтвердить названия, порядок и терминологию трёх лабораторных в используемом учебнике.','- Проверить тексты, вопросы, отвлекающие варианты и объяснения во всех четырёх языковых версиях.','- Для таблицы утвердить состав образцов, условия, численные плотности, твёрдость и температуры с источниками. Не назначать неприменимым свойствам произвольный ноль.','- Уточнить форму медного купороса, состав спирта, конкретный эфир и газ для горения. Рисунок голубого купороса сейчас условно соответствует CuSO₄·5H₂O.','- Утвердить трактовку сравнения запахов по текстовым карточкам, наблюдений при нагревании меди и выделении газа в выбранной модели карбоната.','- Рассмотреть отдельно управление будущими виртуальными приборами. Сейчас нагревание, реакции и измерения не реализованы.','', '| Проверяющий | Дата | Замечания | Итог |','| --- | --- | --- | --- |','| Не указан | Не выполнена | Ожидаются | Не утверждено |','', 'Ниже — точные тексты приложения. Они не выдаются за цитаты из учебника. После редактирования src/lessons/*.js этот документ обновляется командой `python tools/export_lesson_review.py`.']
for lang,title in [('ru','Русский'),('uz-Latn','Узбекский — латиница'),('uz-Cyrl','Узбекский — кириллица'),('en','English')]:
 raw=(root/f'src/lessons/{lang}.js').read_text();lessons=json.loads(raw.split(' = ',1)[1].strip().removesuffix(';'));lines+=['',f'## {title}']
 for lesson in lessons.values():
  lines+=['',f'### {lesson["title"]}','','**Цель:** '+lesson['goal']]
  for index,section in enumerate(lesson['sections'],1):
   lines+=['',f'**{index}. {section["title"]}**']
   for paragraph in section['paragraphs']:lines+=['',paragraph]
  lines+=['','**Словарь**','']+[f'- **{entry["term"]}:** {entry["definition"]}' for entry in lesson['glossary']]
  lines+=['','**Вопросы и объяснения**']
  for question in lesson['questions']:
   lines+=['',f'**{question["prompt"]}**','']
   lines += [f'- {option["label"]} — **{"верно" if option["id"]==question["correct"] else "неверно"}**. {option["feedback"]}' for option in question['options']]
(root/'LESSON_CONTENT_REVIEW.md').write_text('\n'.join(lines)+'\n')
print('LESSON_CONTENT_REVIEW.md updated from current lesson data')
