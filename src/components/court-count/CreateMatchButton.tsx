export function CreateMatchButton() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        width: 360,
        padding: "16px 0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--court-surface) 70%, transparent) 40%, var(--court-surface) 100%)",
        pointerEvents: "none",
      }}
    >
      <button
        type="button"
        className="flex items-center justify-center"
        style={{
          pointerEvents: "auto",
          width: 306,
          height: 40,
          borderRadius: 8,
          background: "var(--court-primary)",
          color: "var(--court-on-primary)",
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "20px",
          border: "none",
          cursor: "pointer",
          boxShadow:
            "0 8px 20px -4px color-mix(in oklab, var(--court-primary) 55%, transparent), 0 2px 6px rgba(0,0,0,0.15)",
          transform: "translateY(-2px)",
          transition: "transform 200ms ease, box-shadow 200ms ease",
        }}
      >
        Создать матч
      </button>
    </div>
  );
}
