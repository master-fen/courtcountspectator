## Изменения

**`src/styles.css`** — добавить новую переменную `--court-card-border` в `:root` и `.dark`:
- Light: `rgba(77, 178, 234, 0.5)` (#4DB2EA, 50%)
- Dark: `rgba(156, 247, 62, 0.5)` (#9CF73E, 50%)

**`src/components/court-count/MatchCard.tsx`** — у `<article>` заменить `border: "0.5px solid var(--court-border)"` на `border: "0.5px solid var(--court-card-border)"`.

Других файлов не трогаю.