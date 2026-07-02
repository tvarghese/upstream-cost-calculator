import type { ReactNode } from "react";

interface SelectCardProps {
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
  trailing?: ReactNode;
}

export function SelectCard({
  selected,
  onClick,
  disabled = false,
  children,
  trailing,
}: SelectCardProps) {
  return (
    <button
      type="button"
      className={`select-card ${selected ? "select-card--purple-active" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div>{children}</div>
      {trailing}
    </button>
  );
}
