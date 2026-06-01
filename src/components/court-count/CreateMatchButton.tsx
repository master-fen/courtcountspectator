export function CreateMatchButton() {
  return (
    <div
      className="flex items-center justify-center bg-court-surface"
      style={{ width: 360, padding: "12px 0" }}
    >
      <button
        type="button"
        className="flex items-center justify-center"
        style={{
          width: 306,
          height: 40,
          borderRadius: 8,
          background: "#4DB2EA",
          color: "#FFFFFF",
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "20px",
        }}
      >
        Создать матч
      </button>
    </div>
  );
}
