import {
  MEAL_RATES,
  NIGHTS,
  ROYAL_GORGE_ADDON,
  ROYAL_GORGE_PERSON,
  ROOM_REFERENCE,
} from "../../config/rates";
import { fmt } from "../../lib/format";

export function RoomReference() {
  return (
    <div className="room-reference">
      <div className="room-reference__title">Room Reference</div>
      <div className="room-reference__grid">
        {ROOM_REFERENCE.map((r) => (
          <div key={r.name} className="room-reference__item">
            <div className="room-reference__name">{r.name}</div>
            {r.rate !== null ? (
              <>
                <div>${r.rate}/night</div>
                <div className="room-reference__total">{fmt(r.rate * NIGHTS)} total</div>
              </>
            ) : (
              <>
                <div>${ROYAL_GORGE_PERSON}/night/person</div>
                <div className="room-reference__total">
                  {fmt(ROYAL_GORGE_PERSON * NIGHTS)} total
                </div>
              </>
            )}
            <div className="room-reference__note">{r.note}</div>
          </div>
        ))}
      </div>
      <div className="room-reference__footer">
        Meals: ${MEAL_RATES.adult}/person (12+) · ${MEAL_RATES.child}/person (7–11) · Under 7
        free · Royal Gorge family add-on: ${ROYAL_GORGE_ADDON}/older kid
      </div>
    </div>
  );
}
