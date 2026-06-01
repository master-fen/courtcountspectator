import { Search } from "lucide-react";

export function SearchBar({
  placeholder = "Поиск по названию",
}: { placeholder?: string } = {}) {
  return (
    <div style={{ width: 360, padding: "0 12px" }}>
      <div
        className="flex flex-row items-center"
        style={{
          width: 336,
          height: 31,
          padding: "0 12px",
          gap: 8,
          background: "var(--court-search-bg)",
          borderRadius: 8,
        }}
      >
        <Search
          style={{
            width: 14,
            height: 14,
            color: "var(--court-text-soft)",
            flexShrink: 0,
          }}
          strokeWidth={2}
        />
        <input
          type="text"
          placeholder={placeholder}
          readOnly
          className="flex-1 bg-transparent outline-none"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: 14,
            lineHeight: "18px",
            color: "var(--court-text-strong)",
            border: "none",
          }}
        />
      </div>
    </div>
  );
}
