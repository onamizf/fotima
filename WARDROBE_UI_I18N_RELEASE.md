# Гардероб: интерфейс и переводы — 1.33.0

На финальной сцене из игровых элементов сверху осталась кнопка закрытия. Заголовок появляется по словам с обычными пробелами между ними, использует `clamp(20px, 2.4vw, 32px)` и помещается в две строки на проверенных экранах. Звёзды — 32px, XP — 20px; компактный блок награды и действий находится в нижней части сцены и оставляет лицо открытым.

Из комнаты убрана нижняя бежевая полоса. Надетые вещи показаны маленькими круглыми значками справа от лягушки возле коврика, без общей подложки и видимой надписи. Убраны значки Q/E, сочетания клавиш сохранены. Вкладка лица получила SVG-иконку маски. Весь блок «Гардероб ?» открывает справку: вместо тёмной плашки — круг с вешалкой и белая надпись. Поворот и сброс оформлены кремовыми круглыми кнопками 36px с тёплыми иконками и увеличением при наведении.

Все шесть вкладок используют одну сетку: пять колонок, квадратные карточки, промежутки 16px, иконки с внутренним отступом 12%. Прокрутка ограничена сеткой; последний ряд не попадает под кнопки действий. На старте вместо эмодзи — круглый стикер с лицом и плечами из существующей сцены химика, белой обводкой и покачиванием при наведении.

Для всех 203 текстовых записей доступны русский, узбекский латиницей, узбекский кириллицей и английский. Это интерфейс, названия/подсказки 41 вещи, тексты 13 профессий, реплики, предупреждения, справка, награды и настройки запасных картинок. Если перевода нет, используется русский.

При смене языка через меню сайта сохраняются надетые вещи, профессия, вкладка и её прокрутка, поворот, ошибки и использованные подсказки, открытое окно и заработанный результат. Временный снимок принадлежит текущему аккаунту; переход в другую страницу или перезагрузка по-прежнему начинает игру со стартового экрана. Смена языка во время празднования переводит уже заработанный результат без повторной награды.

Правила профессий, значения XP, сохранённый прогресс, регистрация одежды, маски, посадка обуви и исходные изображения не менялись.

Проверки:

- `node tests/validate_wardrobe_i18n.cjs`: все 203 записи в четырёх языках, параметры подстановок и русский запасной перевод.
- `python tests/safety_wardrobe_ui_i18n_e2e.py`: настоящее меню языка, сохранение комплекта и результата, переведённые окна и предупреждения, 13 профессий на узбекском и 360 XP, отсутствие повторных наград, смена языка во время анимации, сетка всех вкладок на пяти размерах экрана, финальные пробелы/строки и отсутствие ошибок JavaScript/загрузки.
- Пройдены обычная проверка 13 профессий на русском, проверки слоёв и анимаций, манжет/воротников, рабочей спецовки/каски, посадки/модальных окон и настоящей сборки Pages под `/fotima/`.
- `tests/validate_wardrobe_layers.cjs` сохраняет проверку прежних русских формулировок и правил, разрешая добавленные языки. Старые проверки положения значков и сетки обновлены под новое оформление.

Снимки: [старт по-русски](artifacts/wardrobe-ui-start-ru.png), [старт по-узбекски](artifacts/wardrobe-ui-start-uz.png), [карточки на компьютере](artifacts/wardrobe-ui-body-uz-1366.png), [карточки на телефоне](artifacts/wardrobe-ui-body-uz-390.png), [финал на телефоне](artifacts/wardrobe-ui-result-uz-phone.png). Отчёт: `artifacts/wardrobe-ui-i18n-validation.json`.

Игра: https://onamizf.github.io/fotima/?v=1.33.0#safety-wardrobe

## Изменённые файлы

Список ниже включает код, тесты, документацию и обновлённые проверочные снимки.

- `README.md`
- `WARDROBE_UI_I18N_RELEASE.md`
- `artifacts/wardrobe-canvas-frames.png`
- `artifacts/wardrobe-fit-cook.png`
- `artifacts/wardrobe-fit-phone.png`
- `artifacts/wardrobe-fit-validation.json`
- `artifacts/wardrobe-footwear-phone.png`
- `artifacts/wardrobe-footwear-validation.json`
- `artifacts/wardrobe-help-readable.png`
- `artifacts/wardrobe-joints-phone.png`
- `artifacts/wardrobe-joints-validation.json`
- `artifacts/wardrobe-layers-validation.json`
- `artifacts/wardrobe-package-validation.json`
- `artifacts/wardrobe-professions-grid.png`
- `artifacts/wardrobe-professions-phone.png`
- `artifacts/wardrobe-structure-validation.json`
- `artifacts/wardrobe-ui-body-uz-1366.png`
- `artifacts/wardrobe-ui-body-uz-390.png`
- `artifacts/wardrobe-ui-i18n-validation.json`
- `artifacts/wardrobe-ui-result-ru-master.png`
- `artifacts/wardrobe-ui-result-uz-desktop.png`
- `artifacts/wardrobe-ui-result-uz-phone.png`
- `artifacts/wardrobe-ui-start-ru.png`
- `artifacts/wardrobe-ui-start-uz.png`
- `artifacts/wardrobe-workwear-desktop.png`
- `artifacts/wardrobe-workwear-phone.png`
- `artifacts/wardrobe-workwear-validation.json`
- `data/safety-wardrobe.js`
- `index.html`
- `src/app.js`
- `src/safety-wardrobe.css`
- `src/safety-wardrobe.js`
- `tests/safety_wardrobe_fit_e2e.py`
- `tests/safety_wardrobe_layers_e2e.py`
- `tests/safety_wardrobe_package.py`
- `tests/safety_wardrobe_structure_e2e.py`
- `tests/safety_wardrobe_ui_i18n_e2e.py`
- `tests/validate_wardrobe_i18n.cjs`
- `tests/validate_wardrobe_layers.cjs`
