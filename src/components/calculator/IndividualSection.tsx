import { NOTICES } from "../../config/event";
import {
  NIGHTS,
  ROYAL_GORGE_OCC,
  ROYAL_GORGE_PERSON,
  ROYAL_GORGE_RATE,
  ROOMS_YA,
} from "../../config/rates";
import { fmt } from "../../lib/format";
import { IconButton } from "../ui/IconButton";
import { Section } from "../ui/Section";
import { SelectCard } from "../ui/SelectCard";

interface IndividualSectionProps {
  category: "ya" | "student";
  yaRoom: string;
  yaCount: number;
  yaRoomShare: number;
  onYaRoomChange: (room: string) => void;
  onYaCountChange: (count: number) => void;
}

export function IndividualSection({
  category,
  yaRoom,
  yaCount,
  yaRoomShare,
  onYaRoomChange,
  onYaCountChange,
}: IndividualSectionProps) {
  const yaRoomData = ROOMS_YA.find((r) => r.id === yaRoom)!;
  const maxOcc = "maxOcc" in yaRoomData ? yaRoomData.maxOcc : 4;
  const effectiveCount = Math.min(yaCount, maxOcc);
  const rooms = ROOMS_YA.filter((r) =>
    category === "student" ? r.id === "royalgorge" : true,
  );

  return (
    <>
      <Section step="2" label="Room Choice">
        {category === "student" ? (
          <div className="info-box info-box--orange">{NOTICES.studentRoom}</div>
        ) : (
          <p className="hint-text">{NOTICES.yaRoomSharing}</p>
        )}
        <div className="select-list">
          {rooms.map((r) => {
            const selected = yaRoom === r.id;
            return (
              <SelectCard
                key={r.id}
                selected={selected}
                onClick={() => onYaRoomChange(r.id)}
                disabled={category === "student"}
                trailing={
                  "maxOcc" in r ? (
                    <div className="select-card__meta">up to {r.maxOcc}/room</div>
                  ) : undefined
                }
              >
                <div className="select-card__name">{r.name}</div>
                <div className="select-card__desc">{r.desc}</div>
                {r.id === "royalgorge" ? (
                  <div className="select-card__detail">
                    ${ROYAL_GORGE_RATE}/night ÷ {ROYAL_GORGE_OCC} people ={" "}
                    <strong>${ROYAL_GORGE_PERSON}/night per person</strong> ·{" "}
                    {fmt(ROYAL_GORGE_PERSON * NIGHTS)} total
                  </div>
                ) : (
                  r.rate !== null && (
                    <div className="select-card__detail">
                      ${r.rate}/night × {NIGHTS} nights = {fmt(r.rate * NIGHTS)} (whole room,
                      split among group)
                    </div>
                  )
                )}
              </SelectCard>
            );
          })}
        </div>
      </Section>

      {yaRoom !== "royalgorge" && (
        <Section step="3" label="People sharing this room?">
          <p className="hint-text hint-text--spaced">{NOTICES.roomSharing}</p>
          <div className="room-sharing">
            <div className="room-sharing__controls">
              <IconButton onClick={() => onYaCountChange(Math.max(1, yaCount - 1))}>
                −
              </IconButton>
              <span className="counter__value">{effectiveCount}</span>
              <IconButton onClick={() => onYaCountChange(Math.min(maxOcc, yaCount + 1))}>
                +
              </IconButton>
            </div>
            <div>
              <div className="room-sharing__label">Your room share</div>
              <div className="room-sharing__amount">{fmt(yaRoomShare)}</div>
              <div className="room-sharing__detail">
                {fmt((yaRoomData.rate ?? 0) * NIGHTS)} ÷ {effectiveCount} people
              </div>
            </div>
          </div>
        </Section>
      )}

      {yaRoom === "royalgorge" && (
        <div className="info-box info-box--gray">
          ℹ {NOTICES.royalGorgeIndividual}{" "}
          <strong style={{ color: "var(--color-accent-light)" }}>
            {fmt(ROYAL_GORGE_PERSON * NIGHTS)}
          </strong>
          .
        </div>
      )}
    </>
  );
}
