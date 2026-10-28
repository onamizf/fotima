# Сторонние компоненты

- **Three.js 0.160.1**, MIT. Официальный пакет `https://registry.npmjs.org/three/-/three-0.160.1.tgz`. При получении архива проверена SHA-512 integrity из метаданных npm. Браузерная сборка сохранена в `assets/vendor/three-0.160.1.min.js`, лицензия — `assets/vendor/THREE-LICENSE.txt`, версия/источник/integrity — `assets/vendor/THREE-PROVENANCE.json`. Сайт загружает локальную копию, без CDN. Библиотека используется как движок; геометрия моделей, текстуры кабинета и прикладная логика созданы в проекте.
- **Inter**, SIL Open Font License 1.1: локальный `assets/Inter.ttf`, лицензия `assets/OFL.txt`.

Модели из учебника или чужих библиотек 3D-объектов в эту поставку не включены. Пользовательские текстовые ответы не используются как код, шейдеры, URL текстур или содержимое исполняемых скриптов.

## OrbitControls r160

Локальный `assets/vendor/OrbitControls-0.160.0.js` взят из three.js r160 (MIT): https://github.com/mrdoob/three.js/blob/r160/examples/jsm/controls/OrbitControls.js . Единственная адаптация — импорт/экспорт заменён обращением к уже подключённому локальному THREE. Лицензия: `assets/vendor/THREE-LICENSE.txt`; источник и SHA-256 исходника: `assets/vendor/ORBIT-PROVENANCE.json`.

## Данные таблицы Менделеева

`data/elements.js` адаптирует фактический набор **Bowserinator/Periodic-Table-JSON**, лицензия **CC BY-SA 3.0**: https://github.com/Bowserinator/Periodic-Table-JSON . Адаптированный набор данных распространяется на тех же условиях. Годы открытия дополнены из **andrejewski/periodic-table**, **ISC**: https://github.com/andrejewski/periodic-table . Лицензионные файлы из источников, атрибуция, ссылки и SHA-256 полученных исходников: `assets/elements-data/LICENSE.txt` и `assets/elements-data/SOURCES.json` (включены и в веб-пакет).

Адаптация: исключена запись 119, добавлены имена RU/UZ/EN, школьные объяснения и применения, исправлены атомные веса, свойства переведены в °C, расчётные/неизвестные объёмные данные исключены, задана конвенция группы 3 Lu/Lr, добавлены типы собственных моделей и изотопы для схем ядра. Подробности: [PERIODIC_TABLE_RELEASE.md](PERIODIC_TABLE_RELEASE.md). Лицензия набора данных не заменяет лицензии Three.js, шрифта или остального кода проекта.

## Иконки Lucide 0.468.0

Локальная выборка из 37 SVG в `data/home-icons.js`: https://github.com/lucide-icons/lucide/tree/0.468.0/icons . Лицензия ISC (включая атрибуцию Feather/Cole Bemis) сохранена в `assets/vendor/LUCIDE-LICENSE.txt`; исходные URL, версия и SHA-256 — в `assets/vendor/LUCIDE-PROVENANCE.json`. Служебные SVG встроены в интерфейс без CDN; размеры и stroke-width 2 задаются общим помощником Icon.
