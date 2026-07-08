import { NOTICES } from "../../config/event";
import {
  getFamilyRoomsForPeople,
  MEAL_RATES,
  NIGHTS,
  ROYAL_GORGE_ADDON,
} from "../../config/rates";
import { fmt } from "../../lib/format";
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
  totalFamPeople: number;
  totalKids: number;
  isLargeFamily: boolean;
  effectiveRGKids: number;
  royalGorgeTotal: number;
  onAdultsChange: (value: number) => void;
  onDisciplesChange: (value: number) => void;
  onOlder18plusChange: (value: number) => void;
  onKids7to11Change: (value: number) => void;
  onKidsUnder7Change: (value: number) => void;
  onFamRoomChange: (room: string) => void;
  onRoyalGorgeKidsChange: (value: number) => void;
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
  totalFamPeople,
  totalKids,
  isLargeFamily,
  onAdultsChange,
  onDisciplesChange,
  onOlder18plusChange,
  onKids7to11Change,
  onKidsUnder7Change,
  onFamRoomChange,
  onRoyalGorgeKidsChange,
}: FamilySectionProps) {
  const availableRooms = getFamilyRoomsForPeople(totalFamPeople);

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
            label="Disciples Track (12–17)"
            subtitle={`$${MEAL_RATES.adult}/person meals · attending UPSTREAM main program`}
            value={disciples}
            min={0}
            max={8}
            onChange={onDisciplesChange}
            color="var(--color-purple)"
          />
          <Counter
            label="Older Kids (18+, not Madsters)"
            subtitle={`$${MEAL_RATES.adult}/person meals · can opt for Royal Gorge`}
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

        <div className="summary-row">
          <span className="summary-row__label">Total family members included here</span>
          <span className="summary-row__value">{totalFamPeople}</span>
        </div>
        {isLargeFamily && (
          <div className="info-box info-box--orange">
            {NOTICES.familyLargeFamily}
            <div className="info-box__note">
              {totalKids} children in your family — your flat rate is $1,900 paid to JY USA.
            </div>
          </div>
        )}
      </Section>

      {!isLargeFamily && availableRooms.length > 0 && (
        <Section step="3" label="Family Room Choice">
          <p className="hint-text">{NOTICES.familyRoom}</p>
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

      {!isLargeFamily && older18plus > 0 && (
        <Section step="4" label="Royal Gorge Bunk (optional — Older Kids 18+)">
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
