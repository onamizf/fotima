# Перчатки и рукава — 1.35.0

Все восемь видов перчаток соединяются с рукавами выбранной одежды или с настоящими предплечьями лягушки. Вместо наложения двух цельных рисунков отдельно отображаются задний край манжеты, рукав/рука внутри отверстия и передняя часть перчатки. Лишняя часть рукава ниже стыка и исходная кисть базы скрываются. Пальцы и фактура прежних моделей сохраняются.

Профиль обоих рукавов определяется по прозрачности зарегистрированной одежды с учётом существующей посадки манжет. Верх перчатки локально подстраивается по ширине и положению. У короткого рукава кителя выбирается цельная ткань выше прежнего отверстия манжеты, чтобы у запястья не появлялся зелёный зазор. Фартук, жилет и вариант без верхней одежды используют профиль настоящих рук. Перчатки и одежда остаются в общем холсте 896×1200.

Для выбранной пары кэшируются профиль и растеризованный результат; кэш сочетаний ограничен восемью записями. При смене перчаток, одежды, языка, снятии вещей или завершении загрузки перестраиваются только нужные маски. Собственные кисти скрываются после загрузки полного слоя; при недоступной картинке остаются прежние запасные значки. Маска кистей отделена от масок футболки и ступней, поэтому посадка обуви сохраняется.

Клик по видимой передней части или заднему краю снимает перчатки. Клик по ткани внутри отверстия выбирает одежду. Отражение персонажа учитывается при попадании. Один предмет перчаток по-прежнему занимает одну категорию; требования профессий, награды, XP и сохранение не менялись. Все исходные WebP сохранены без изменений.

Проверки:

- `tests/safety_wardrobe_gloves_e2e.py`: 96 сочетаний — 11 вещей × 8 перчаток и ещё 8 вариантов без верхней одежды. В обеих манжетах сравниваются реальные пиксели ткани/кожи с персонажем до надевания перчаток. Проверены 6728 пикселей рукавов и 154 точки возможного выступания пальцев, фактура перчаток, снятие по передней/задней части и после отражения, выбор ткани внутри отверстия, смена одежды/обуви/языка, задержанная и недоступная картинка, мобильный экран и отсутствие XP в свободном режиме.
- `tests/safety_wardrobe_joints_e2e.py`: прежние 14 манжет и воротники семи вещей без перчаток.
- `tests/safety_wardrobe_footwear_e2e.py`: все 48 сочетаний обуви.
- Обычная проверка 13 профессий по-русски и проверка 13 профессий по-узбекски: прежние 360 XP, сохранение и отсутствие повторной награды.
- Проверки анимаций, запасных картинок, геометрии полных слоёв, переводов и настоящей сборки Pages под `/fotima/`. Производственная сборка проверяется со скафандром, перчатками и обувью одновременно.

Снимки: [все сочетания](artifacts/wardrobe-gloves-preview.jpg), [крупные планы восьми видов](artifacts/wardrobe-gloves-details.jpg), [мобильный экран](artifacts/wardrobe-gloves-phone.png). Отчёт: `artifacts/wardrobe-gloves-validation.json`.

Игра: https://onamizf.github.io/fotima/?v=1.35.0#safety-wardrobe

## Изменённые файлы

Полный список кода, тестов, документации и проверочных изображений приведён ниже.

- `README.md`
- `WARDROBE_GLOVES_RELEASE.md`
- `artifacts/wardrobe-footwear-phone.png`
- `artifacts/wardrobe-footwear-validation.json`
- `artifacts/wardrobe-gloves-details.jpg`
- `artifacts/wardrobe-gloves-phone.png`
- `artifacts/wardrobe-gloves-preview.jpg`
- `artifacts/wardrobe-gloves-space.jpg`
- `artifacts/wardrobe-gloves-validation.json`
- `artifacts/wardrobe-joints-phone.png`
- `artifacts/wardrobe-joints-validation.json`
- `artifacts/wardrobe-layers-validation.json`
- `artifacts/wardrobe-package-validation.json`
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
- `src/wardrobe-gloves.js`
- `tests/safety_wardrobe_gloves_e2e.py`
- `tests/safety_wardrobe_package.py`
