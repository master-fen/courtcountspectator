import { useState } from "react";

type Variant =
  | "default"
  | "soft-glow"
  | "floating"
  | "glass"
  | "highlight-strip"
  | "spotlight"
  | "gradient-border"
  | "pulse-ring";

const VARIANTS: { id: Variant; label: string }[] = [
  { id: "default", label: "Default" },
  { id: "soft-glow", label: "Soft Glow" },
  { id: "floating", label: "Floating" },
  { id: "glass", label: "Glass" },
  { id: "highlight-strip", label: "Highlight" },
  { id: "spotlight", label: "Spotlight" },
  { id: "gradient-border", label: "Gradient Border" },
  { id: "pulse-ring", label: "Pulse Ring" },
];

const BASE_BTN: React.CSSProperties = {
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
  position: "relative",
  zIndex: 1,
  transition: "transform 200ms ease, box-shadow 200ms ease",
};

export function CreateMatchButton() {
  const [variant, setVariant] = useState<Variant>("default");

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        width: 360,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Variant switcher */}
      <div
        style={{
          width: 360,
          background: "var(--court-surface-muted)",
          borderTop: "0.5px solid var(--court-border)",
          padding: "6px 8px",
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
        }}
      >
        {VARIANTS.map((v) => {
          const active = v.id === variant;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => setVariant(v.id)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                lineHeight: "14px",
                padding: "4px 8px",
                borderRadius: 6,
                border: "0.5px solid var(--court-border)",
                background: active
                  ? "var(--court-primary)"
                  : "transparent",
                color: active
                  ? "var(--court-on-primary)"
                  : "var(--court-text-soft)",
                cursor: "pointer",
              }}
            >
              {v.label}
            </button>
          );
        })}
      </div>

      <VariantWrapper variant={variant} />
    </div>
  );
}

function VariantWrapper({ variant }: { variant: Variant }) {
  const containerBase: React.CSSProperties = {
    width: 360,
    padding: "12px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    background: "var(--court-surface)",
  };

  const label = "Создать матч";

  if (variant === "default") {
    return (
      <div style={containerBase}>
        <button type="button" style={BASE_BTN}>{label}</button>
      </div>
    );
  }

  if (variant === "soft-glow") {
    return (
      <div style={containerBase}>
        <div style={{ position: "relative" }}>
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: -8,
              borderRadius: 16,
              background: "var(--court-primary)",
              opacity: 0.35,
              filter: "blur(16px)",
              zIndex: 0,
            }}
          />
          <button type="button" style={BASE_BTN}>{label}</button>
        </div>
      </div>
    );
  }

  if (variant === "floating") {
    return (
      <div style={containerBase}>
        <button
          type="button"
          style={{
            ...BASE_BTN,
            boxShadow:
              "0 8px 20px -4px color-mix(in oklab, var(--court-primary) 55%, transparent), 0 2px 6px rgba(0,0,0,0.15)",
            transform: "translateY(-2px)",
          }}
        >
          {label}
        </button>
      </div>
    );
  }

  if (variant === "glass") {
    return (
      <div style={containerBase}>
        <button
          type="button"
          style={{
            ...BASE_BTN,
            background:
              "color-mix(in oklab, var(--court-primary) 35%, transparent)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid color-mix(in oklab, var(--court-primary) 70%, transparent)",
            color: "var(--court-text-strong)",
          }}
        >
          {label}
        </button>
      </div>
    );
  }

  if (variant === "highlight-strip") {
    return (
      <div
        style={{
          ...containerBase,
          background:
            "linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--court-primary) 18%, transparent) 100%)",
          borderTop: "1px solid color-mix(in oklab, var(--court-primary) 40%, transparent)",
        }}
      >
        <button type="button" style={BASE_BTN}>{label}</button>
      </div>
    );
  }

  if (variant === "spotlight") {
    return (
      <div style={{ ...containerBase, overflow: "hidden" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "var(--court-primary)",
            opacity: 0.45,
            filter: "blur(60px)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />
        <button type="button" style={BASE_BTN}>{label}</button>
      </div>
    );
  }

  if (variant === "gradient-border") {
    return (
      <div style={containerBase}>
        <div
          style={{
            padding: 2,
            borderRadius: 10,
            background:
              "linear-gradient(135deg, var(--court-primary), var(--court-green))",
          }}
        >
          <button
            type="button"
            style={{
              ...BASE_BTN,
              width: 302,
              height: 36,
              borderRadius: 8,
              background: "var(--court-surface)",
              color: "var(--court-text-strong)",
            }}
          >
            {label}
          </button>
        </div>
      </div>
    );
  }

  if (variant === "pulse-ring") {
    return (
      <div style={containerBase}>
        <div style={{ position: "relative" }}>
          <span
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 8,
              boxShadow: "0 0 0 0 var(--court-primary)",
              animation: "btn-pulse-ring 1.8s ease-out infinite",
            }}
          />
          <button type="button" style={BASE_BTN}>{label}</button>
        </div>
      </div>
    );
  }

  return null;
}
