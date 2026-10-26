# Сторонние компоненты

- **Three.js 0.160.1**, MIT. Официальный пакет `https://registry.npmjs.org/three/-/three-0.160.1.tgz`. При получении архива проверена SHA-512 integrity из метаданных npm. Браузерная сборка сохранена в `assets/vendor/three-0.160.1.min.js`, лицензия — `assets/vendor/THREE-LICENSE.txt`, версия/источник/integrity — `assets/vendor/THREE-PROVENANCE.json`. Сайт загружает локальную копию, без CDN. Библиотека используется как движок; геометрия моделей, текстуры кабинета и прикладная логика созданы в проекте.
- **Inter**, SIL Open Font License 1.1: локальный `assets/Inter.ttf`, лицензия `assets/OFL.txt`.

Модели из учебника или чужих библиотек 3D-объектов в эту поставку не включены. Пользовательские текстовые ответы не используются как код, шейдеры, URL текстур или содержимое исполняемых скриптов.

## OrbitControls r160

Локальный `assets/vendor/OrbitControls-0.160.0.js` взят из three.js r160 (MIT): https://github.com/mrdoob/three.js/blob/r160/examples/jsm/controls/OrbitControls.js . Единственная адаптация — импорт/экспорт заменён обращением к уже подключённому локальному THREE. Лицензия: `assets/vendor/THREE-LICENSE.txt`; источник и SHA-256 исходника: `assets/vendor/ORBIT-PROVENANCE.json`.
