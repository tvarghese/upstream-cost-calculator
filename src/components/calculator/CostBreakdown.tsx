import { fmt } from "../../lib/format";
import type { LineItem } from "../../lib/types";

interface CostBreakdownProps {
  lineItems: LineItem[];
  jyTotal: number;
  ridgecrestTotal: number;
  grandTotal: number;
  perPerson?: number;
  totalPeople?: number;
  comparisonNote?: string | null;
}

export function CostBreakdown({
  lineItems,
  jyTotal,
  ridgecrestTotal,
  grandTotal,
  perPerson,
  totalPeople,
  comparisonNote,
}: CostBreakdownProps) {
  return (
    <div className="breakdown">
      <div className="breakdown__title">Your Cost Breakdown</div>

      {lineItems.map((item, i) => (
        <div
          key={`${item.label}-${i}`}
          className={`breakdown__item ${i < lineItems.length - 1 ? "breakdown__item--bordered" : ""}`}
        >
          <div>
            <div className="breakdown__item-label">{item.label}</div>
            <div className="breakdown__item-sub">{item.sub}</div>
            {!item.amountLabel && (
              <div
                className={`breakdown__badge ${item.dest === "JY" ? "breakdown__badge--jy" : "breakdown__badge--ridgecrest"}`}
              >
                → Pay to {item.dest === "JY" ? "JY USA" : "Ridgecrest"}
              </div>
            )}
          </div>
          <div className="breakdown__item-amount">
            {item.amountLabel ?? fmt(item.amount)}
          </div>
        </div>
      ))}

      <div className="breakdown__totals">
        <div className="breakdown__total-row">
          <span className="breakdown__total-jy">Total to JY USA</span>
          <strong className="breakdown__total-jy">{fmt(jyTotal)}</strong>
        </div>
        {ridgecrestTotal > 0 && (
          <div className="breakdown__total-row breakdown__total-row--spaced">
            <span className="breakdown__total-ridgecrest">Total to Ridgecrest</span>
            <strong className="breakdown__total-ridgecrest">{fmt(ridgecrestTotal)}</strong>
          </div>
        )}
        <div className="breakdown__grand-total">
          <span className="breakdown__grand-label">GRAND TOTAL</span>
          <span className="breakdown__grand-amount">{fmt(grandTotal)}</span>
        </div>
        {perPerson !== undefined && totalPeople !== undefined && totalPeople > 0 && (
          <div className="breakdown__per-person">
            ≈ {fmt(perPerson)} per person across {totalPeople} people
          </div>
        )}
        {comparisonNote && <div className="breakdown__comparison">{comparisonNote}</div>}
      </div>
    </div>
  );
}
