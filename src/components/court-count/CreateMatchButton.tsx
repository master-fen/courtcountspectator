export function CreateMatchButton() {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] p-4 bg-background border-t border-border">
      <button
        type="button"
        className="w-full py-4 rounded-xl bg-court-blue-strong text-white text-lg font-medium"
      >
        Создать матч
      </button>
    </div>
  );
}
