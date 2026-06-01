# Подгонка под макет Figma (360×800)

Переделываем размеры, шрифты и цвета строго по Figma-снипетам. Структура и набор компонентов сохраняются.

## Глобально

- Контейнер экрана — фиксированная ширина `360px`, фон страницы `#DBE3E6`.
- Шрифты: подключить `Roboto` (для заголовка турнира) и `Lato` (для всего остального) через Google Fonts в `__root.tsx`.
- Шкала отступов и размеров — в `px`, как в Figma, не округляем до Tailwind-шкалы.

## Дизайн-токены (`src/styles.css`, oklch-эквиваленты hex'ов)

- `--background` → `#DBE3E6` (Light/Background)
- `--court-surface` → `#FFFFFF` / `#FEFEFE` (поверхности)
- `--court-surface-muted` → `#F2F6F7` (плашка сообщения)
- `--court-primary` → `#4DB2EA` (активный таб, пилюля, кнопка)
- `--court-primary-soft` → `rgba(133,208,250,0.25)` (шапка карточки матча)
- `--court-green` → `#9CF73E` (индикатор «идёт»)
- `--court-on-surface` → `#1A1A1A`
- `--court-on-surface-strong` → `#202020`
- `--court-on-surface-300` → `#525556` (подзаголовки, текст сообщения)
- `--court-on-surface-200` → `#393C3D` (мелкие цифры/иконки)
- `--court-on-surface-400` → `#929C9F` (бордер карточек)
- `--font-display` → `'Roboto', sans-serif`
- `--font-body` → `'Lato', sans-serif`

Заменяем существующие `--court-blue/--court-blue-strong/--court-green` на новый набор; рефакторим компоненты под него.

## Header (`Header.tsx`)

- Контейнер: `width: 360px; height: 64px; padding: 16px 24px;` фон `#FFFFFF`, нижняя граница убирается (на макете отделение идёт за счёт фона страницы).
- Внутренний ряд: `space-between`, gap 12. Логотип `64×32`, иконка-меню `24×24`, цвет `#202020`.

## Tournament title (`TournamentTitle.tsx`)

- Контейнер: фон `#FFFFFF`, `padding: 0 12px`, height 75px, gap 16 к табам.
- Ряд иконка+заголовок: gap 8, иконка `ArrowLeft 24×24` `#202020`.
- Заголовок: `font-family: Roboto; font-weight: 500; font-size: 18px; line-height: 21px; color: #202020;` ширина `336px`.

## Section tabs (`SectionTabs.tsx`)

- Контейнер: `width: 336px; height: 31px;` нижняя граница `0.5px solid #525556`.
- Каждый таб: `padding: 2px 8px`, выравнивание по центру, `Lato 16/20`.
  - Активный: `font-weight: 600; color: #4DB2EA;` нижняя граница `2px solid #4DB2EA` (перекрывает общую линию).
  - Неактивный: `font-weight: 400; color: #1A1A1A;`.
- Ширины кнопок ровно как в макете (Матчи 65, Настройки 97, Судьи 61) задаются контентом + padding, не фиксируем явно.

## Status pills (`StatusPills.tsx`)

- Внешний контейнер: `padding: 0 12px` (внутри блока с табами), gap между пилюлями 0 — обе сидят слева.
- Пилюля: `padding: 8px 12px; gap: 8px; border-radius: 6px;` `Lato 14/18`.
  - Активная: `border: 1px solid #4DB2EA; color: #4DB2EA;`
  - Неактивная: без рамки, `color: #1A1A1A`.

## Match card (`MatchCard.tsx`)

- Внешний: `width: 344px;` `border: 0.5px solid #929C9F; border-radius: 6px;` фон `#FEFEFE`. Высота определяется содержимым (146 с сообщением / 112 без).
- **Шапка карточки**: `height: 32px; padding: 8px 12px; gap: 8px;` фон `rgba(133,208,250,0.25)`.
  - Индикатор: круг `10×10` фон `#9CF73E`.
  - «Корт N» — `Lato 14/18 #202020`.
  - «Стадия» — `Lato 12/14 #393C3D`.
  - Таймер `Lato 14/18 #202020` + шеврон `16×16` `#525556`.
- **Тело матча**: `padding: 16px 12px 0; gap: 12px;` фон `#FEFEFE`.
  - Строка игрока: ряд `space-between`, gap 12.
  - Имя: `Lato 14/18 #202020`. Иконка мяча 18×18 справа от имени у подающего.
  - Цифры справа: gap 19 между «текущий гейм» и блоком сетов; между сетами gap 12.
    - Текущий гейм: квадратик `20×20`, `border: ~0.5px solid #393C3D; border-radius: 2px; padding: 2px;` текст `Lato 14/18 #1A1A1A`.
    - Сеты: `Lato 14/18 #202020`, выровнены по правому краю.
- **Подвал сообщения** (опционально): `padding: 12px 8px; gap: 8px;` фон `#F2F6F7`. Иконка `Megaphone 14×14 #393C3D` (горизонтально отражённая). Текст `Lato 12/14 #525556; letter-spacing: 0.04em;`.

## Create match button (`CreateMatchButton.tsx`)

- Внешняя плашка: ширина `360px`, фон `#FFFFFF`, центрирует кнопку.
- Кнопка: `width: 306px; height: 40px; padding: 12px 0; border-radius: 8px;` фон `#4DB2EA`, текст `Lato 16/20 #FFFFFF`.

## Home screen (`routes/index.tsx`)

- Внешний враппер: `min-h-screen` фон `#DBE3E6`, центрирование по горизонтали.
- Внутренний `width: 360px;` колонка с `gap: 4px` между: Header → блок «Title+Tabs+Pills+List» (белый, `padding-top: 12px; gap: 16px`) → нижняя плашка с кнопкой.
- Список карточек внутри `padding: 0 8px; gap: 12px;` (для отступа 8 от краёв 360 = 344).
- Sticky-кнопку убираем — она часть колонки внизу как на макете.

## Файлы под правку

- `src/styles.css` — заменить блок токенов court-* и добавить font-vars.
- `src/routes/__root.tsx` — `<link>` на Google Fonts (Roboto 500, Lato 400/600).
- `src/components/court-count/Header.tsx`
- `src/components/court-count/TournamentTitle.tsx`
- `src/components/court-count/SectionTabs.tsx`
- `src/components/court-count/StatusPills.tsx`
- `src/components/court-count/MatchCard.tsx` — переработка ряда счёта, нового подвала, рамки.
- `src/components/court-count/CreateMatchButton.tsx` — убрать `fixed`, отцентровать.
- `src/routes/index.tsx` — новая обёртка 360px, фон #DBE3E6, без `pb-28`.

## Что не делаем

- Не делаем экран адаптивным под десктоп — фиксируем 360px как в Figma.
- Логотип остаётся плейсхолдером (зелёный + голубой квадраты) до получения файла.
