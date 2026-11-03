# Финал и карточки профессий — 1.36.0

Финальная сцена занимает всё игровое окно без бежевых полос. При обрезке менее 25% используется `cover` с центром 50% 30%; при большем изменении пропорций — полный кадр `contain` поверх той же фотографии с размытием 24px. Белого тумана нет; затемнение ограничено нижними 25%. Появление сцены занимает 900 мс, затем камера медленно приближается за 12 секунд.

Кремовая карточка результата с золотой и внутренней белой обводкой находится по центру снизу, на 20px выше края. Добавлены переводимая оранжевая лента, три глянцевые звезды с последовательным прыжком и искрами, плашка награды с монетой и две равные игровые кнопки. На телефоне сохранены отступы 12px и размеры звёзд 36/44px. Счётчик XP меняет только отображение числа после появления панели; начисление и сохранение награды прежние. Режим уменьшенного движения показывает результат сразу.

Шапка окна профессий — отдельный элемент flex-колонки. Под ней прокручивается только список белых карточек: четыре колонки на компьютере, три на планшете, две на телефоне. Подключены все 13 изображений из пользовательского архива; JPEG декодированы в PNG 1024×1024 без изменения полученных пикселей. Для отсутствующей картинки используется сцена профессии; следующее открытие повторно запрашивает карточку. Если недоступны оба изображения, остаются значок и доступное текстовое название.

Логика профессий, состав комплектов, XP, сохранения, изображения сцен и все слои/маски одежды не изменены. Новые подписи добавлены через существующую систему переводов на русском, узбекском латиницей и кириллицей, английском. Версия и хеши `?v=` обновлены.

## Проверки

- `node tests/validate_wardrobe_layers.cjs` — 41 слой, 13 комплектов, прежние XP/storage/routes.
- `node tests/validate_wardrobe_i18n.cjs` — 205 строк на четырёх языках, параметры и русский запасной перевод.
- `python tests/safety_wardrobe_e2e.py` — все 13 профессий, 360 XP, сохранение и отсутствие повторной награды.
- `python tests/safety_wardrobe_ui_i18n_e2e.py` — все 13 профессий на узбекском, четыре языка, сохранение комплекта/поворота/подсказок/результата при переводе.
- `python tests/safety_wardrobe_fit_e2e.py` — прежняя посадка, маски ног, контраст и сетка профессий.
- `python tests/safety_wardrobe_motion_e2e.py` — обычные анимации, подсказки, смена профессии, недоступные изображения, очистка при выходе.
- `python tests/safety_wardrobe_candy_e2e.py` — категории на четырёх языках, размеры кнопок и вмещение текста, состояния 1/2/3 звёзд; открытые пиксели обложки и четырёх сцен совпадают с исходными JPEG. Нижнее затемнение и карточка исключены из выборки пикселей.
- `python tests/safety_wardrobe_result_gallery_e2e.py` — русский/узбекский список при 1920×1080, 1366×768, 768×900, 390×844, 320×740; отдельная прокрутка; три финала при 1920×1080, 1366×768 и двух размерах телефона; пропорции фона, равные кнопки, размеры звёзд, запасное изображение, повторный запрос и режим без двух картинок; задержки анимаций и прежние XP.
- `python tests/safety_wardrobe_package.py` — настоящая сборка под `/fotima/`, 13 новых изображений, загрузка одежды, соединения перчаток/обуви, хеши ресурсов.

Ошибок JavaScript, консоли и загрузки при обычном прохождении не обнаружено. В сценариях недоступных изображений запросы намеренно прерываются тестом. Снимки химика, пожарного и космонавта просмотрены: лицо не перекрыто, светлых полос нет. Проверена также карточка бонуса за все 13 профессий.

## Изменённые файлы

- `README.md`
- `WARDROBE_RESULT_GALLERY_RELEASE.md`
- `artifacts/wardrobe-candy-professions.png`
- `artifacts/wardrobe-candy-result-astronaut-1366.png`
- `artifacts/wardrobe-candy-result-astronaut-390.png`
- `artifacts/wardrobe-candy-result-chemist-1366.png`
- `artifacts/wardrobe-candy-result-chemist-390.png`
- `artifacts/wardrobe-candy-result-firefighter-1366.png`
- `artifacts/wardrobe-candy-result-firefighter-390.png`
- `artifacts/wardrobe-candy-result-surgeon-1366.png`
- `artifacts/wardrobe-candy-result-surgeon-390.png`
- `artifacts/wardrobe-candy-validation.json`
- `artifacts/wardrobe-fit-validation.json`
- `artifacts/wardrobe-gallery-ru-1366.png`
- `artifacts/wardrobe-gallery-ru-390.png`
- `artifacts/wardrobe-gallery-uz-Latn-1366.png`
- `artifacts/wardrobe-gallery-uz-Latn-390.png`
- `artifacts/wardrobe-package-validation.json`
- `artifacts/wardrobe-professions-grid.png`
- `artifacts/wardrobe-professions-phone.png`
- `artifacts/wardrobe-result-astronaut-1366.png`
- `artifacts/wardrobe-result-astronaut-1920.png`
- `artifacts/wardrobe-result-astronaut-390.png`
- `artifacts/wardrobe-result-chemist-1366.png`
- `artifacts/wardrobe-result-chemist-1920.png`
- `artifacts/wardrobe-result-chemist-390.png`
- `artifacts/wardrobe-result-firefighter-1366.png`
- `artifacts/wardrobe-result-firefighter-1920.png`
- `artifacts/wardrobe-result-firefighter-390.png`
- `artifacts/wardrobe-result-gallery-validation.json`
- `artifacts/wardrobe-ui-i18n-validation.json`
- `artifacts/wardrobe-ui-result-ru-master.png`
- `artifacts/wardrobe-ui-result-uz-desktop.png`
- `artifacts/wardrobe-ui-result-uz-phone.png`
- `assets/game/cards/card-acids.png`
- `assets/game/cards/card-astronaut.png`
- `assets/game/cards/card-beekeeper.png`
- `assets/game/cards/card-builder.png`
- `assets/game/cards/card-chemist.png`
- `assets/game/cards/card-cook.png`
- `assets/game/cards/card-electrician.png`
- `assets/game/cards/card-fire.png`
- `assets/game/cards/card-firefighter.png`
- `assets/game/cards/card-gases.png`
- `assets/game/cards/card-miner.png`
- `assets/game/cards/card-surgeon.png`
- `assets/game/cards/card-welder.png`
- `data/safety-wardrobe.js`
- `index.html`
- `src/safety-wardrobe.css`
- `src/safety-wardrobe.js`
- `tests/safety_wardrobe_candy_e2e.py`
- `tests/safety_wardrobe_package.py`
- `tests/safety_wardrobe_result_gallery_e2e.py`
- `tests/safety_wardrobe_ui_i18n_e2e.py`
