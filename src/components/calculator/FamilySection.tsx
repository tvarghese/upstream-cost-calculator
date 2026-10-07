import { NOTICES } from "../../config/event";
import {
  getFamilyRoomsForPeople,
  MEAL_RATES,
  NIGHTS,
  ROYAL_GORGE_ADDON,
  ZION_BOTH_FEE,
  ZION_ONLY_FEE,
} from "../../config/rates";
import { fmt } from "../../lib/format";
import type { CampusStudentPath } from "../../lib/types";
import { Counter } from "../ui/Counter";
import { Section } from "../ui/Section";
import { SelectCard } from "../ui/SelectCard";

interface FamilySectionProps {
  adults: number;
  disciples: number;
  older18plus: number;
  kids7to11: number;
  kidsUnder7: number;
  famRoom: string;
  royalGorgeKids: number;
  roomHeadcount: number;
  campusStudents: number;
  campusStudentPath: CampusStudentPath;
  campusSectionOpen: boolean;
  includedPeople: number;
  effectiveRGKids: number;
  royalGorgeTotal: number;
  onAdultsChange: (value: number) => void;
  onDisciplesChange: (value: number) => void;
  onOlder18plusChange: (value: number) => void;
  onKids7to11Change: (value: number) => void;
  onKidsUnder7Change: (value: number) => void;
  onFamRoomChange: (room: string) => void;
  onRoyalGorgeKidsChange: (value: number) => void;
  onCampusStudentsChange: (value: number) => void;
  onCampusStudentPathChange: (path: CampusStudentPath) => void;
  onCampusSectionOpenChange: (open: boolean) => void;
}

export function FamilySection({
  adults,
  disciples,
  older18plus,
  kids7to11,
  kidsUnder7,
  famRoom,
  effectiveRGKids,
  royalGorgeTotal,
  roomHeadcount,
  campusStudents,
  campusStudentPath,
  campusSectionOpen,
  includedPeople,
  onAdultsChange,
  onDisciplesChange,
  onOlder18plusChange,
  onKids7to11Change,
  onKidsUnder7Change,
  onFamRoomChange,
  onRoyalGorgeKidsChange,
  onCampusStudentsChange,
  onCampusStudentPathChange,
  onCampusSectionOpenChange,
}: FamilySectionProps) {
  const availableRooms = getFamilyRoomsForPeople(roomHeadcount);
  const stayingWithFamily =
    campusSectionOpen && campusStudents > 0 && campusStudentPath === "with_family";

  return (
    <>
      <Section step="2" label="Family Composition">
        <div className="meals-info">
          🍽 Meals —{" "}
          <strong className="meals-info__highlight">12+</strong>: ${MEAL_RATES.adult}/person
          · <strong className="meals-info__highlight">7–11</strong>: $
          {MEAL_RATES.child}/person ·{" "}
          <strong className="meals-info__highlight">Under 7</strong>: free
          <div className="meals-info__notice">📌 {NOTICES.familyMeals}</div>
        </div>

        <div className="counter-grid">
          <Counter
            label="Adults / Parents (18+)"
            subtitle={`$${MEAL_RATES.adult}/person meals`}
            value={adults}
            min={1}
            max={8}
            onChange={onAdultsChange}
            color="var(--color-blue-counter)"
          />
          <Counter
            label="Children (12–17)"
            subtitle={`$${MEAL_RATES.adult}/person meals`}
            value={disciples}
            min={0}
            max={8}
            onChange={onDisciplesChange}
            color="var(--color-purple)"
          />
          <Counter
            label="Older Kids (18+, not MaDsters)"
            subtitle={`$${MEAL_RATES.adult}/person meals`}
            value={older18plus}
            min={0}
            max={8}
            onChange={onOlder18plusChange}
            color="var(--color-pink)"
          />
          <Counter
            label="Children (7–11)"
            subtitle={`$${MEAL_RATES.child}/person meals`}
            value={kids7to11}
            min={0}
            max={8}
            onChange={onKids7to11Change}
            color="var(--color-green-counter)"
          />
          <Counter
            label="Under 7"
            subtitle="Free meals"
            value={kidsUnder7}
            min={0}
            max={8}
            onChange={onKidsUnder7Change}
            color="var(--color-text-muted)"
          />
        </div>
      </Section>

      <div className="section">
        <button
          type="button"
          className="section-toggle"
          aria-expanded={campusSectionOpen}
          onClick={() => onCampusSectionOpenChange(!campusSectionOpen)}
        >
          <span className="section__label section-toggle__label">
            <span className="section__step">3.</span>
            Campus students attending both ZION and UPSTREAM
          </span>
          <span className="section-toggle__action">{campusSectionOpen ? "Hide" : "Show"}</span>
        </button>
        {campusSectionOpen ? (
          <>
            <div className="info-box info-box--orange">
              <strong>{NOTICES.campusStudentsMadsters}</strong>
            </div>
            <p className="hint-text hint-text--spaced">{NOTICES.campusStudentsIntro}</p>
            <Counter
              label="Campus students (not MADsters)"
              subtitle="Want both ZION and UPSTREAM"
              value={campusStudents}
              min={0}
              max={8}
              onChange={onCampusStudentsChange}
              color="var(--color-accent-light)"
            />
            {campusStudents > 0 && (
              <div className="select-list campus-paths">
                <SelectCard
                  selected={campusStudentPath === "package"}
                  onClick={() => onCampusStudentPathChange("package")}
                  trailing={
                    <div className="select-card__meta">
                      <div className="select-card__price">{fmt(ZION_BOTH_FEE)}</div>
                      <div>each, to JY</div>
                    </div>
                  }
                >
                  <div className="select-card__name">Register through ZION for both</div>
                  <div className="select-card__desc">
                    UPSTREAM registration, Royal Gorge lodging, and meals are included.
                  </div>
                  <div className="select-card__detail">{NOTICES.campusStudentPackage}</div>
                </SelectCard>
                <SelectCard
                  selected={campusStudentPath === "with_family"}
                  onClick={() => onCampusStudentPathChange("with_family")}
                  trailing={
                    <div className="select-card__meta">
                      <div className="select-card__price">{fmt(ZION_ONLY_FEE)}</div>
                      <div>each, to JY</div>
                    </div>
                  }
                >
                  <div className="select-card__name">ZION only, stay in the family room</div>
                  <div className="select-card__desc">
                    Counted as 18+ on the family UPSTREAM registration.
                  </div>
                  <div className="select-card__detail">{NOTICES.campusStudentWithFamily}</div>
                </SelectCard>
              </div>
            )}
          </>
        ) : (
          <p className="hint-text">
            Optional. Open this only if campus students who are not MADsters want both ZION and
            UPSTREAM.
          </p>
        )}
      </div>

      <div className="summary-row summary-row--after-section">
        <span className="summary-row__label">Total family members included here</span>
        <span className="summary-row__value">{includedPeople}</span>
      </div>

      {availableRooms.length > 0 && (
        <Section step="4" label="Family Room Choice">
          <p className="hint-text">{NOTICES.familyRoom}</p>
          {stayingWithFamily && (
            <p className="hint-text hint-text--spaced">
              These room choices include {campusStudents} campus student
              {campusStudents === 1 ? "" : "s"} staying with the family. Walnut has bunk
              beds if you need them. No Royal Gorge bunk is added for these students.
            </p>
          )}
          <div className="select-list">
            {availableRooms.map((r) => {
              const selected = famRoom === r.id;
              return (
                <SelectCard
                  key={r.id}
                  selected={selected}
                  onClick={() => onFamRoomChange(r.id)}
                  trailing={
                    <div className="select-card__price">{fmt(r.rate * NIGHTS)}</div>
                  }
                >
                  <div className="select-card__header">
                    <span className="select-card__name">{r.name}</span>
                    {r.limited && (
                      <span className="limited-badge">⚑ Only 13 rooms</span>
                    )}
                  </div>
                  <div className="select-card__desc">{r.desc}</div>
                  <div className="select-card__detail">
                    ${r.rate}/night × {NIGHTS} nights ={" "}
                    <strong>{fmt(r.rate * NIGHTS)}</strong> whole room
                  </div>
                </SelectCard>
              );
            })}
          </div>
        </Section>
      )}

      {older18plus > 0 && (
        <Section step="5" label="Royal Gorge Bunk (optional — Older Kids 18+)">
          <div className="info-box info-box--pink">
            {NOTICES.royalGorgeAddon}
            <div className="info-box__note">{NOTICES.royalGorgeAddonNote}</div>
          </div>
          <div className="rg-grid">
            <Counter
              label="Going to Royal Gorge"
              subtitle={`Up to ${older18plus} older kid${older18plus > 1 ? "s" : ""} · $${ROYAL_GORGE_ADDON} each`}
              value={effectiveRGKids}
              min={0}
              max={older18plus}
              onChange={onRoyalGorgeKidsChange}
              color="var(--color-pink)"
            />
            {effectiveRGKids > 0 && (
              <div className="rg-summary">
                <div>
                  In main room:{" "}
                  <strong>{older18plus - effectiveRGKids}</strong> older kid
                  {older18plus - effectiveRGKids !== 1 ? "s" : ""}
                </div>
                <div>
                  Royal Gorge:{" "}
                  <strong className="rg-summary__pink">{effectiveRGKids}</strong> older kid
                  {effectiveRGKids !== 1 ? "s" : ""}
                </div>
                <div>
                  Add-on cost:{" "}
                  <strong className="rg-summary__accent">{fmt(royalGorgeTotal)}</strong>
                </div>
              </div>
            )}
          </div>
        </Section>
      )}
    </>
  );
}
