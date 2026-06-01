# Тёмная тема + переключатель

## 1. `src/styles.css`

В `@theme inline` оставить токены `--color-court-*`, ссылающиеся на `--court-*`. Переименовать/добавить:
- `--court-bg`, `--court-surface`, `--court-surface-muted`
- `--court-card-header` (фон шапки карточки)
- `--court-border`, `--court-primary`, `--court-primary-soft`
- `--court-green`, `--court-logo-green`, `--court-logo-blue`
- `--court-text`, `--court-text-strong`, `--court-text-soft`, `--court-text-muted`
- `--court-on-primary`

`:root` (значения для светлой — без визуальных изменений):
- bg `#DBE3E6`, surface `#FFFFFF`, surface-muted `#F2F6F7`
- card-header `rgba(133,208,250,0.25)`, border `#929C9F`
- primary `#4DB2EA`, primary-soft `rgba(133,208,250,0.25)`
- green `#9CF73E`, logo-green `#9CF73E`, logo-blue `#85D0FA`
- text `#1A1A1A`, text-strong `#202020`, text-soft `#525556`, text-muted `#393C3D`
- on-primary `#FFFFFF`

`.dark`:
- bg `#0D1316`, surface `#182329`, surface-muted `#1E303A`
- card-header `#1E303A`, border `#70818F`
- primary `#4DB2EA` (оставляем), primary-soft `rgba(133,208,250,0.15)`
- logo-green `#84EA1A`, logo-blue `#85D0FA`
- text `#AEB4BA`, text-strong `#AEB4BA`, text-soft `#70818F`, text-muted `#70818F`
- on-primary `#FFFFFF`

## 2. Перевод компонентов на токены (без визуальных изменений в светлой)

- `Header.tsx` — burger цвет: `var(--court-text-strong)`.
- `Logo.tsx` — `fill` зелёного `var(--court-logo-green)`, голубого `var(--court-logo-blue)`.
- `TournamentTitle.tsx` — стрелка и заголовок: `var(--court-text-strong)`.
- `SectionTabs.tsx` — divider `var(--court-text-soft)`, active `var(--court-primary)`, inactive text `var(--court-text)`.
- `StatusPills.tsx` — border/text active `var(--court-primary)`, inactive `var(--court-text)`.
- `CreateMatchButton.tsx` — обёртка `bg-court-surface`, кнопка `background: var(--court-primary)`, текст `var(--court-on-primary)`.
- `MatchCard.tsx`:
  - article: border `var(--court-border)`, bg `var(--court-surface)`
  - header: bg `var(--court-card-header)`
  - dot: `var(--court-green)`, court text `var(--court-text-strong)`, stage `var(--court-text-muted)`, timer `var(--court-text-strong)`, chevron `var(--court-text-soft)`
  - body: bg `var(--court-surface)`, текст игроков `var(--court-text-strong)`
  - сет-бокс border `var(--court-text-muted)`, текст `var(--court-text)`
  - message plate: bg `var(--court-surface-muted)`, иконка `var(--court-text-muted)`, текст `var(--court-text-soft)`
  - TennisBallIcon: `fill="var(--court-text-strong)"`
- `routes/index.tsx` — внешний фон `var(--court-bg)`, центральная колонка `bg-court-surface`.

## 3. Переключатель темы

- `src/hooks/use-theme.ts` — хук: state `"light" | "dark"`, `localStorage.theme`, тоглит класс `dark` на `document.documentElement`. Дефолт `light`.
- `Header.tsx` — заменить раскладку на три слота: лого слева, кнопка-тогл (иконка `Sun`/`Moon`, 24×24) по центру, меню справа. Использовать `position: relative` + абсолютный центр, чтобы лого и меню остались на месте.

## Что не трогаем
Размеры, паддинги, шрифты, layout карточек, mock-данные, скролл, фикс-кнопку.
