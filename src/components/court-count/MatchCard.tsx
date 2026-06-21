import type { ReactNode } from "react";
import { ChevronRight, Megaphone } from "lucide-react";
import type { Match, Player } from "@/lib/mock-matches";

function TennisBallIcon({ size = 10 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0.00210483 4.39087C0.137367 3.27498 0.643116 2.23658 1.43855 1.44155C2.23399 0.646523 3.27322 0.14074 4.39022 0.0050056C4.41667 0.00185148 4.44348 0.00418 4.46899 0.0118457C4.4945 0.0195115 4.51815 0.0323497 4.53847 0.0495583C4.55879 0.0667668 4.57534 0.087976 4.58708 0.111861C4.59882 0.135746 4.60551 0.161793 4.60672 0.188375C4.63067 0.774807 4.53274 1.35984 4.31911 1.90658C4.10547 2.45333 3.78075 2.94993 3.36543 3.36508C2.95011 3.78023 2.45319 4.10493 1.906 4.3187C1.35882 4.53247 0.773226 4.63068 0.186154 4.60713C0.159502 4.60599 0.133373 4.59936 0.109406 4.58766C0.0854388 4.57596 0.0641491 4.55944 0.0468706 4.53913C0.0295921 4.51883 0.0166974 4.49518 0.00899428 4.46967C0.00129118 4.44415 -0.00105431 4.41733 0.00210483 4.39087ZM9.81191 5.39238C9.75766 5.39238 9.7039 5.38899 9.64966 5.38899C9.07594 5.38826 8.508 5.50345 7.98 5.72763C7.452 5.95181 6.97484 6.28035 6.57723 6.6935C6.17961 7.10664 5.86976 7.59586 5.66629 8.13171C5.46283 8.66757 5.36997 9.23899 5.39328 9.81163C5.39449 9.83821 5.40118 9.86425 5.41292 9.88814C5.42466 9.91202 5.44121 9.93323 5.46153 9.95044C5.48185 9.96765 5.5055 9.98049 5.53101 9.98815C5.55652 9.99582 5.58333 9.99815 5.60978 9.99499C6.72685 9.85924 7.76614 9.35338 8.56158 8.55826C9.35703 7.76313 9.86273 6.72462 9.9979 5.60865C10.0011 5.58203 9.99866 5.55505 9.99084 5.52941C9.98302 5.50377 9.96996 5.48003 9.95247 5.45969C9.93499 5.43936 9.91346 5.42288 9.88927 5.41129C9.86507 5.39971 9.83873 5.39327 9.81191 5.39238ZM6.08783 6.08667C6.5545 5.61799 7.1096 5.24641 7.72098 4.99345C8.33237 4.74048 8.9879 4.61115 9.64966 4.61294C9.69809 4.61294 9.74943 4.61294 9.79932 4.61294C9.82709 4.61394 9.85476 4.60895 9.88044 4.59832C9.90611 4.58769 9.9292 4.57166 9.94813 4.55133C9.96706 4.531 9.98139 4.50684 9.99014 4.48049C9.99889 4.45413 10.0019 4.42621 9.99886 4.39861C9.86533 3.27864 9.35866 2.23605 8.56032 1.43847C7.76198 0.640895 6.71834 0.134653 5.59719 0.00113502C5.56956 -0.00186762 5.5416 0.00110422 5.51522 0.00984884C5.48884 0.0185935 5.46465 0.0329061 5.4443 0.0518149C5.42395 0.0707237 5.40791 0.093786 5.39726 0.119436C5.38662 0.145086 5.38163 0.172723 5.38263 0.20047C5.40465 0.886599 5.28552 1.56995 5.0326 2.20824C4.77967 2.84654 4.39834 3.42621 3.91217 3.9114C3.44566 4.38043 2.89064 4.75236 2.27924 5.00566C1.66785 5.25896 1.01223 5.38859 0.350345 5.38706C0.301911 5.38706 0.250571 5.38706 0.200684 5.38706C0.172907 5.38606 0.14524 5.39105 0.119563 5.40168C0.093886 5.41231 0.0707991 5.42833 0.0518701 5.44867C0.0329412 5.469 0.0186133 5.49316 0.00985933 5.51951C0.00110539 5.54586 -0.00186961 5.57379 0.00113623 5.60139C0.134673 6.72136 0.64134 7.76394 1.43968 8.56152C2.23802 9.3591 3.28166 9.86535 4.40281 9.99887C4.43044 10.0019 4.4584 9.9989 4.48478 9.99015C4.51116 9.98141 4.53535 9.96709 4.5557 9.94818C4.57605 9.92928 4.59209 9.90621 4.60274 9.88056C4.61338 9.85491 4.61837 9.82728 4.61737 9.79953C4.59508 9.11308 4.71408 8.42936 4.96701 7.79072C5.21995 7.15207 5.60142 6.57208 6.08783 6.08667Z"
        fill="var(--court-text-strong)"
      />
    </svg>
  );
}

function PlayerRow({
  player,
  maxSets,
  showGame,
}: {
  player: Player;
  maxSets: number;
  showGame: boolean;
}) {
  return (
    <div
      className="flex flex-row items-center justify-between"
      style={{ gap: 12, height: 18 }}
    >
      <div className="flex items-center min-w-0" style={{ gap: 8 }}>
        <span
          className="truncate"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: 14,
            lineHeight: "18px",
            color: "var(--court-text-strong)",
          }}
        >
          {player.name}
        </span>
        {player.isServing && <TennisBallIcon size={10} />}
      </div>
      <div className="flex flex-row items-center" style={{ gap: 19 }}>
        {showGame && (
          <span
            className="flex items-center justify-center"
            style={{
              width: 20,
              height: 20,
              borderRadius: 2,
              border: "0.5px solid var(--court-text-muted)",
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "18px",
              color: "var(--court-text)",
              padding: 2,
            }}
          >
            {player.game}
          </span>
        )}
        <div className="flex flex-row items-center" style={{ gap: 12 }}>
          {Array.from({ length: maxSets }).map((_, i) => {
            const s = player.sets[i];
            return (
              <span
                key={i}
                className="text-center"
                style={{
                  position: "relative",
                  width: 9,
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: "18px",
                  color: "var(--court-text-strong)",
                }}
              >
                {s ? s.score : ""}
                {s?.tb !== undefined && (
                  <sup
                    style={{
                      position: "absolute",
                      top: -2,
                      left: "100%",
                      marginLeft: 1,
                      fontSize: 9,
                      lineHeight: 1,
                      color: "var(--court-text-muted)",
                    }}
                  >
                    {s.tb}
                  </sup>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function MatchCard({ match }: { match: Match }) {
  const maxSets = Math.max(...match.players.map((p) => p.sets.length));

  const isCompleted = match.status === "completed";

  return (
    <article
      className="flex flex-col items-start overflow-hidden w-full"
      style={{
        border: isCompleted
          ? "1px solid var(--court-completed-border)"
          : "0.5px solid var(--court-card-border)",
        borderRadius: 6,
        background: "var(--court-surface)",
      }}
    >
      {/* Header */}
      <button
        type="button"
        className="w-full flex flex-row items-center justify-between text-left"
        style={{
          height: 32,
          padding: "8px 12px",
          gap: 8,
          background: isCompleted
            ? "var(--court-completed-header)"
            : "var(--court-card-header)",
        }}
      >
        <div className="flex items-center" style={{ gap: 8 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 9999,
              background:
                match.status === "completed"
                  ? "var(--court-completed-dot)"
                  : match.status === "paused"
                    ? "var(--court-paused-dot)"
                    : "var(--court-green)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "18px",
              color: "var(--court-text-strong)",
            }}
          >
            {match.court}
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: 12,
              lineHeight: "14px",
              color: "var(--court-text-muted)",
            }}
          >
            {match.stage}
          </span>
        </div>
        <div className="flex items-center" style={{ gap: 4 }}>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "18px",
              color: "var(--court-text-strong)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {match.timer.split(":").reduce<ReactNode[]>((acc, part, i, arr) => {
              acc.push(<span key={`p${i}`}>{part}</span>);
              if (i < arr.length - 1) {
                  acc.push(
                    <span key={`c${i}`} className={match.status === "active" ? "animate-timer-blink" : undefined}>:</span>
                  );
              }
              return acc;
            }, [])}
          </span>
          <ChevronRight
            style={{ width: 16, height: 16, color: "var(--court-text-soft)" }}
          />
        </div>
      </button>

      {/* Body */}
      <div
        className="w-full flex flex-col"
        style={{
          padding: "16px 12px",
          gap: 12,
          background: "var(--court-surface)",
        }}
      >
        {match.players.map((p, i) => (
          <PlayerRow key={i} player={p} maxSets={maxSets} showGame={match.status === "active"} />
        ))}
      </div>

      {/* Message */}
      {match.message && (
        <div
          className="w-full flex flex-row items-start"
          style={{
            padding: "12px 8px",
            gap: 8,
            background: "var(--court-surface-muted)",
          }}
        >
          <Megaphone
            style={{
              width: 14,
              height: 14,
              color: "var(--court-text-muted)",
              transform: "scaleX(-1)",
              flexShrink: 0,
              marginTop: 1,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: 12,
              lineHeight: "14px",
              color: "var(--court-text-soft)",
              letterSpacing: "0.04em",
            }}
          >
            {match.message}
          </span>
        </div>
      )}
    </article>
  );
}
