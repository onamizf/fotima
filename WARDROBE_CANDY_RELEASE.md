# Игровые кнопки и ясные сцены — 1.34.0

Категории переименованы во всех четырёх языках сайта. Русские названия: «Головной убор», «Защитные очки», «Маски для лица», «Верхняя одежда», «Перчатки», «Обувь». Узбекские, английские и узбекские кириллические названия берутся из тех же переводов. Справка перечисляет категории из этих данных; ленточки, подсказки вкладок, доступные имена и сообщения используют общие названия. Ленточка остаётся однострочной, имеет ширину по тексту и уменьшает шрифт при необходимости до 15px. Размер проверяется при смене вкладки, языка, ширины окна и загрузке шрифтов.

Действия получили зелёный, синий, серый и оранжевый варианты с вертикальным градиентом, обводкой 2px, нижней гранью 5px и белым бликом. Основные кнопки имеют высоту 52px на компьютере и 46px на телефоне, текст 18/17px. Нажатие сдвигает кнопку на 4px и уменьшает грань до 1px; наведение добавляет яркость и покачивание, клавиатурный фокус — белое кольцо. Длинная синяя кнопка на старте и в финале получает больше ширины. Выбор вещей и профессий оформлен в том же объёмном стиле с сохранением сеток; компактные значки сохраняют свои размеры. В кнопках используются SVG вместо эмодзи. Подтверждение смены профессии оранжевое, отмена и закрытие серые.

Полученные звёзды — золотые SVG с градиентом и бликом, неполученные — тёмно-синие. Они появляются с задержками 160/320/480 мс и прыжком `0 → 1.25 → 1`. Заголовок финала — 20px, на телефоне 17px; текст награды — 16px, звёзды — 28px, промежутки — 8px. При уменьшенной анимации движения отключены.

Белые и кремовые градиенты поверх обложки и финалов удалены. Изображения имеют `opacity: 1`, `filter: none` и не анимируются осветлением. Обложка заполняет окно; финалы показываются полным кадром. Текст размещён на отдельных карточках `rgba(255,250,240,.92)` с рамкой 3px, скруглением 22px и мягкой тенью. Стартовая карточка находится слева по центру, финальная — по центру снизу с отступом 20px. Максимальная ширина — 560px; на телефоне боковые отступы составляют 12px. Бейдж «Гардероб ?» получил небольшую тёмную полупрозрачную подложку.

Исходные изображения, регистрация и посадка одежды, правила профессий, XP и сохранение прогресса сохранены. `src/app.js`, `src/course-game.js`, `src/storage.js`, `src/routes.js`, `src/wardrobe-joints.js` и `src/wardrobe-footwear.js` не менялись.

Проверки:

- `tests/safety_wardrobe_candy_e2e.py`: 72 сочетания категории/языка/размера окна; новые названия в ленточках, подсказках и справке; отсутствие обрезки; точные параметры кнопок и текст внутри их границ; нажатие, наведение и фокус; 1/2/3 полученные звезды и анимация; размеры финальной карточки и текста. Видимые пиксели обложки и четырёх сцен сравниваются с исходными JPEG в 24 вариантах экрана. Проверяются загрузки и ошибки консоли.
- `tests/safety_wardrobe_ui_i18n_e2e.py`: переключение четырёх языков без сброса комплекта, 13 профессий на узбекском, 360 XP и отсутствие повторных наград.
- `tests/safety_wardrobe_e2e.py`: все профессии по-русски, сохранение, клавиатура и прежние награды.
- Проверки обычной анимации, полных слоёв, запасных изображений, геометрии, модальных окон и настоящей сборки Pages под `/fotima/`.
- Статические проверки переводов, контрактов предметов/профессий и геометрии манжет. Проверка контраста учитывает заданную тёмную обводку белых букв на игровых кнопках.

Снимки: [старт](artifacts/wardrobe-candy-start-ru-1366.png), [старт на телефоне](artifacts/wardrobe-candy-start-uz-Latn-390.png), [профессии](artifacts/wardrobe-candy-professions.png), [подтверждение](artifacts/wardrobe-candy-confirm.png), [финал химика](artifacts/wardrobe-candy-result-chemist-1366.png), [финал пожарного на телефоне](artifacts/wardrobe-candy-result-firefighter-390.png). Отчёт: `artifacts/wardrobe-candy-validation.json`.

Игра: https://onamizf.github.io/fotima/?v=1.34.0#safety-wardrobe

## Изменённые файлы

Полный список кода, тестов, документации и проверочных изображений приведён ниже.

- `README.md`
- `WARDROBE_CANDY_RELEASE.md`
- `artifacts/wardrobe-candy-confirm.png`
- `artifacts/wardrobe-candy-professions.png`
- `artifacts/wardrobe-candy-result-astronaut-1366.png`
- `artifacts/wardrobe-candy-result-astronaut-390.png`
- `artifacts/wardrobe-candy-result-chemist-1366.png`
- `artifacts/wardrobe-candy-result-chemist-390.png`
- `artifacts/wardrobe-candy-result-firefighter-1366.png`
- `artifacts/wardrobe-candy-result-firefighter-390.png`
- `artifacts/wardrobe-candy-result-surgeon-1366.png`
- `artifacts/wardrobe-candy-result-surgeon-390.png`
- `artifacts/wardrobe-candy-start-ru-1366.png`
- `artifacts/wardrobe-candy-start-uz-Latn-390.png`
- `artifacts/wardrobe-candy-validation.json`
- `artifacts/wardrobe-canvas-frames.png`
- `artifacts/wardrobe-fit-cook.png`
- `artifacts/wardrobe-fit-phone.png`
- `artifacts/wardrobe-fit-validation.json`
- `artifacts/wardrobe-help-readable.png`
- `artifacts/wardrobe-layers-validation.json`
- `artifacts/wardrobe-package-validation.json`
- `artifacts/wardrobe-professions-grid.png`
- `artifacts/wardrobe-professions-phone.png`
- `artifacts/wardrobe-ui-body-uz-1366.png`
- `artifacts/wardrobe-ui-body-uz-390.png`
- `artifacts/wardrobe-ui-i18n-validation.json`
- `artifacts/wardrobe-ui-result-ru-master.png`
- `artifacts/wardrobe-ui-result-uz-desktop.png`
- `artifacts/wardrobe-ui-result-uz-phone.png`
- `artifacts/wardrobe-ui-start-ru.png`
- `artifacts/wardrobe-ui-start-uz.png`
- `data/safety-wardrobe.js`
- `index.html`
- `src/safety-wardrobe.css`
- `src/safety-wardrobe.js`
- `tests/safety_wardrobe_candy_e2e.py`
- `tests/safety_wardrobe_fit_e2e.py`
- `tests/safety_wardrobe_package.py`
- `tests/safety_wardrobe_ui_i18n_e2e.py`
- `tests/validate_wardrobe_i18n.cjs`
