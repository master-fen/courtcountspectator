export function CreateMatchButton({ label = "Создать матч" }: { label?: string } = {}) {
  return (
    <div
      className="flex items-center justify-center bg-court-surface"
      style={{
        width: 360,
        padding: "12px 0",
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
      }}
    >
      <button
        type="button"
        className="flex items-center justify-center"
        style={{
          width: 306,
          height: 40,
          borderRadius: 8,
          background: "var(--court-primary)",
          color: "var(--court-on-primary)",
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "20px",
        }}
      >
        {label}
      </button>
    </div>
  );
}
