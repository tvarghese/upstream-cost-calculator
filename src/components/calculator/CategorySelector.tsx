import { REG_FEES } from "../../config/rates";
import { fmt } from "../../lib/format";
import type { Category } from "../../lib/types";
import { Section } from "../ui/Section";

interface CategorySelectorProps {
  category: Category;
  onCategoryChange: (category: Category) => void;
}

export function CategorySelector({ category, onCategoryChange }: CategorySelectorProps) {
  return (
    <Section step="1" label="Who is registering?">
      <div className="category-grid">
        {(Object.entries(REG_FEES) as [Category, (typeof REG_FEES)[Category]][]).map(
          ([key, val]) => (
            <button
              key={key}
              type="button"
              className={`category-card ${category === key ? "category-card--active" : ""}`}
              onClick={() => onCategoryChange(key)}
            >
              <div>{val.label}</div>
              <div className="category-card__fee">{fmt(val.fee)}</div>
              <div className="category-card__note">to JY USA</div>
            </button>
          ),
        )}
      </div>
    </Section>
  );
}
