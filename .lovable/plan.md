## Что добавляем

Bottom sheet с деталями матча, открывается по тапу на карточку **активного** матча (для `completed`/`paused` тап ничего не делает, ChevronRight скрывается).

### Содержимое шита
1. **Drag-handle** сверху (серая полоска ~36×4, скругление).
2. **Шапка**: `Корт N` (жирный) · `Стадия` (приглушённый) · справа зелёная точка + «Активен».
3. **Строки игроков** — те же стили, что в `MatchCard` (имя + мяч у подающего + game-бокс + сеты).
4. **Сообщение** (если есть) — блок с мегафоном на `--court-surface-muted`.
5. **Разделитель** (тонкая линия).
6. **«Начало матча: HH:MM»** — мелкий приглушённый текст.
7. **«Продолжительность: MM:SS»** — тот же стиль, что «Начало матча»; число — таймер из шапки карточки (`match.timer`), двоеточие мигает (`animate-timer-blink`), как в активной карточке.

Фон белый, скругление верхних углов 12px, padding 16px, gap 16px. Затемнение фона позади.

### Файлы

**1. `src/lib/mock-matches.ts`**
- Добавить опциональное `startTime?: string` в `Match`, проставить у активных (например `"13:00"`).

**2. `src/components/court-count/PlayerRow.tsx`** (новый, рефакторинг)
- Вынести `PlayerRow` + `TennisBallIcon` из `MatchCard.tsx`, чтобы переиспользовать в шите.

**3. `src/components/court-count/MatchDetailsSheet.tsx`** (новый)
- На базе `Sheet`/`SheetContent` из `@/components/ui/sheet` со `side="bottom"`. Скрыть дефолтный close-X через className, добавить drag-handle.
- Props: `match: Match | null`, `open: boolean`, `onOpenChange`.
- Внутри: шапка со статус-пилюлей «Активен», `PlayerRow` для каждого игрока, message-блок (если есть), divider, «Начало матча», «Продолжительность» с мигающим таймером (выделить рендер двоеточия с `animate-timer-blink` в общую утилиту/инлайн).

**4. `src/components/court-count/MatchCard.tsx`**
- Импортировать `PlayerRow` из нового файла.
- Сделать карточку кликабельной только для `status === "active"`: `role="button"`, `onClick={onOpen}`, `cursor: pointer`. Внутреннюю `<button>` шапки заменить на `<div>` (визуал не меняется), чтобы не было вложенных кнопок.
- ChevronRight показывать только для активных.
- Добавить пропс `onOpen?: () => void`.

**5. `src/routes/index.tsx`**
- `useState<Match | null>(null)` для выбранного матча.
- `onOpen={() => m.status === "active" && setSelected(m)}` в `MatchCard`.
- Рендерить `<MatchDetailsSheet match={selected} open={!!selected} onOpenChange={(o) => !o && setSelected(null)} />`.

### Не трогаем
Стили карточек, шапку страницы, табы, фильтры, цветовые токены.
