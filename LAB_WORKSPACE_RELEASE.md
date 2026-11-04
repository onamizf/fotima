# Задания 1.1 и 1.2 — 1.37.0

## Диагностика

- Изменения приборов предыдущего сеанса остались незакоммиченными в `work` на базе 1.34.0. В репозитории `main` тем временем опубликованы 1.35.0 и 1.36.0 с изменениями гардероба. Номер `?v=` в присланной ссылке не публикует рабочие файлы и не подтверждает версию загруженного сайта.
- `.github/workflows/pages.yml` запускает публикацию при push в `main`. Исправления перенесены на актуальную `main`, изменения гардероба сохранены.
- `assets/lab/equipment/`: 17 cards, 17 objects, sizes.json. Все включаются в пакет `tools/build_site.py`.
- Service worker, Workbox, регистрация `navigator.serviceWorker` и Cache API отсутствуют. `version.json` — отчёт сборки, не service worker manifest.
- Рабочие маршруты: `src/routes.js` → `src/app.js` → `src/project-workspace.js`. Задание 1.1 делегируется `src/safety-workspace.js` и общим `ScenePlayer`/`SceneShell`. Задание 1.2 использует `src/practical-1-2.js`, `src/setup-task-2.js`, `src/assembly-workshop.js`. Эти общие модули не являются копиями маршрутов, поэтому не удалены.
- Новая вкладка создавалась одновременно через `target="_blank"` и `window.open` в `src/project-hub.js`. Оба механизма удалены. Остальные внутренние ссылки используют hash routing.
- Текст 1.1 находился в абсолютной `.cinema-bubble` с ограничением высоты и дублировался навигацией ScenePlayer и SafetyWorkspace. Карточка перенесена в правую колонку; оставлен один ряд кнопок. Полный текст объяснения выводится отдельным HTML без обрезки и внутреннего скролла.

## Версия и кэширование

`index.html` / `meta[name=application-version]` — единственный источник номера выпуска. `src/site-release.js` нормализует `?v=` в адресе без перезагрузки и добавляет версию к оборудованию/JSON. Сборщик формирует URL CSS/JS с номером выпуска и SHA-256 содержимого. Старые номера в runtime-запросах удалены. Прогресс и аккаунты не очищаются.

## Проверка

`python tests/workspace_release_e2e.py`: Chromium, все A–D через интерфейс, полный текст 3/3, один ряд навигации, та же вкладка, history.back и fallback, мобильный порядок сцена → объяснение → ситуации, сборка водяной бани, undo/redo, жидкости, реальные пропорции, опоры, zoom/resize, устаревший URL, отсутствие ошибок консоли.

Также: `python tests/revision22_integrity.py`, `node tests/validate_workspace21.cjs`, упаковка `python tools/build_site.py`.

Без новых изображений: воронка, выпарительная чашка, склянка с водой, спичка. Старые ресурсы для них сохранены.

## Изменённые файлы

- `index.html`
- `src/site-release.js` (новый)
- `src/project-hub.js`
- `src/project-workspace.js`
- `src/project-workspaces.css`
- `src/safety-workspace.js`
- `src/safety-workspace.css`
- `src/scene-player.js`
- `src/scene-shell.js`
- `src/equipment-images.js` (новый)
- `src/equipment-card-model.js`
- `src/practical-1-2.js`
- `src/setup-task-2.js`
- `src/assembly-workshop.js`
- `assets/lab/equipment/cards/*.webp` (17 новых)
- `assets/lab/equipment/objects/*.webp` (17 новых)
- `assets/lab/equipment/sizes.json` (новый)
- `tests/workspace_release_e2e.py` (новый)
- `LAB_WORKSPACE_RELEASE.md` (этот отчёт)
