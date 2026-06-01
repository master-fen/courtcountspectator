import type { ReactNode } from "react";

export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <div
      className="bg-court-surface"
      style={{ width: 360, padding: "0 12px" }}
    >
      <h1
        style={{
          width: 336,
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: 22,
          lineHeight: "26px",
          color: "var(--court-text-strong)",
          margin: 0,
        }}
      >
        {children}
      </h1>
    </div>
  );
}
