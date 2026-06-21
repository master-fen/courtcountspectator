## Sticky-сэндвич с компактным режимом

Закрепляем сверху весь верхний блок: `Header` + `TournamentTitle` + `SectionTabs` + `StatusPills`. При скролле всё это сжимается (уменьшаются высоты и паддинги), но остаётся видимым. Низ страницы — без изменений.

### Что меняется

**`src/routes/index.tsx`**
- Оборачиваем `Header + TournamentTitle + SectionTabs + StatusPills` в один контейнер `<div className="sticky top-0 z-40">` с фоном `var(--court-surface)` и лёгкой тенью при скролле (`box-shadow` появляется только в компактном режиме).
- Добавляем хук `useScrolled(threshold = 16)`, который слушает `window.scroll` и хранит `boolean`. Передаём флаг `compact` в каждый под-компонент.
- Список матчей остаётся как есть (просто скроллится под sticky-зоной). Нижний `CreateMatchButton` тоже без изменений (уже `fixed` снизу).

**`src/components/court-count/Header.tsx`**
- Добавляем `compact?: boolean`. Высота: `h-12 → h-9` в compact, логотип `h-6 → h-5`, иконка меню `18 → 16`, паддинг `py-2 px-6 → py-1 px-4`.
- Плавный переход: `transition-[height,padding] duration-200`.

**`src/components/court-count/TournamentTitle.tsx`**
- Добавляем `compact?: boolean`. В compact: `font-size 18 → 14`, `line-height 21 → 17`, иконка «назад» `24 → 18`, заголовок в одну строку с `truncate` (сейчас может занимать 2 строки). Паддинг сверху схлопываем.

**`src/components/court-count/SectionTabs.tsx`**
- `compact?: boolean`. Высота полосы `28 → 24`, `font-size 16 → 14`, паддинг кнопок `4px 10px → 2px 8px`.

**`src/components/court-count/StatusPills.tsx`**
- `compact?: boolean`. Высота пиллов `28 → 24`, паддинг `8px 12px → 4px 10px`, `font-size 14 → 12`.

**Sticky-обёртка в `index.tsx`**
- В обычном режиме: `gap: 12`, `padding-top: 8`.
- В compact: `gap: 4`, `padding-top: 0`, `box-shadow: 0 2px 8px rgba(0,0,0,0.06)` (в dark — чуть темнее), тонкий бордер снизу `border-bottom: 0.5px solid var(--court-border)`.
- Все переходы через `transition: all 200ms ease`.

### Технические детали

- Хук `useScrolled` — лёгкий, `useEffect` + `passive: true` listener, дебаунс не нужен (просто сравнение порога).
- `position: sticky` работает только если у родителя нет `overflow: hidden`. Текущий корень `min-h-screen flex justify-center` — OK, проверим что внутренний flex-контейнер не режет overflow.
- Z-index: sticky-зона `z-40`, чтобы `MatchDetailsSheet` (обычно `z-50`) был выше.
- SSR-безопасность: начальное значение `scrolled = false`, чтобы не было гидрационного рассинхрона.

### Что НЕ меняется

- Логика фильтрации, карточки матчей, `MatchDetailsSheet`, `CreateMatchButton`, моки, авторизация.
- Цвета и токены дизайн-системы — только размеры/паддинги.
