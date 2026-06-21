import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import type { TournamentDocument } from "@/lib/mock-documents";

// Configure pdf.js worker (client-only)
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();
}

export function DocumentLightbox({
  document: doc,
  onClose,
}: {
  document: TournamentDocument;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  // Lock body scroll
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
      document.body.style.overflow = prevBody;
    };
  }, []);

  // Esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Measure available area
  useEffect(() => {
    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setSize({ w: rect.width, h: rect.height });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (typeof window === "undefined") return null;

  const node = (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2147483647,
        background: "rgba(0, 0, 0, 0.92)",
        display: "flex",
        flexDirection: "column",
        touchAction: "none",
      }}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Закрыть"
        className="flex items-center justify-center"
        style={{
          position: "absolute",
          top: "max(12px, env(safe-area-inset-top))",
          right: "max(12px, env(safe-area-inset-right))",
          width: 44,
          height: 44,
          borderRadius: 9999,
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(8px)",
          border: "0.5px solid rgba(255,255,255,0.2)",
          color: "#fff",
          zIndex: 2,
          cursor: "pointer",
        }}
      >
        <X style={{ width: 24, height: 24 }} />
      </button>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: "max(12px, env(safe-area-inset-top))",
          left: "max(12px, env(safe-area-inset-left))",
          right: 68,
          height: 44,
          display: "flex",
          alignItems: "center",
          color: "#fff",
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          fontSize: 16,
          lineHeight: "20px",
          textShadow: "0 1px 2px rgba(0,0,0,0.4)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          zIndex: 1,
        }}
      >
        {doc.title}
      </div>

      {/* Content */}
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          inset: 0,
          paddingTop: "calc(max(12px, env(safe-area-inset-top)) + 56px)",
          paddingBottom: "max(12px, env(safe-area-inset-bottom))",
          paddingLeft: "max(0px, env(safe-area-inset-left))",
          paddingRight: "max(0px, env(safe-area-inset-right))",
          overflow: "hidden",
        }}
      >
        {size.w > 0 && size.h > 0 && (
          <TransformWrapper
            initialScale={1}
            minScale={1}
            maxScale={6}
            doubleClick={{ mode: "toggle", step: 2 }}
            wheel={{ step: 0.2 }}
            pinch={{ step: 5 }}
            panning={{ velocityDisabled: true }}
            centerOnInit
          >
            <TransformComponent
              wrapperStyle={{ width: "100%", height: "100%" }}
              contentStyle={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {doc.kind === "pdf" ? (
                <Document
                  file={doc.url}
                  loading={
                    <span style={{ color: "#fff", fontFamily: "var(--font-body)", fontSize: 14 }}>
                      Загрузка…
                    </span>
                  }
                  error={
                    <span style={{ color: "#fff", fontFamily: "var(--font-body)", fontSize: 14 }}>
                      Не удалось открыть файл
                    </span>
                  }
                >
                  <Page
                    pageNumber={1}
                    width={size.w}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                  />
                </Document>
              ) : (
                <img
                  src={doc.url}
                  alt={doc.title}
                  draggable={false}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: size.w,
                    height: "auto",
                    objectFit: "contain",
                    userSelect: "none",
                  }}
                />
              )}
            </TransformComponent>
          </TransformWrapper>
        )}
      </div>
    </div>
  );

  return createPortal(node, window.document.body);
}
