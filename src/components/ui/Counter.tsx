import { IconButton } from "./IconButton";

interface CounterProps {
  label: string;
  subtitle?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  color?: string;
}

export function Counter({
  label,
  subtitle,
  value,
  min = 0,
  max = 8,
  onChange,
  color = "var(--color-text)",
}: CounterProps) {
  return (
    <div className="counter">
      <div className="counter__label" style={{ color }}>
        {label}
      </div>
      {subtitle && <div className="counter__subtitle">{subtitle}</div>}
      <div className="counter__controls">
        <IconButton onClick={() => onChange(Math.max(min, value - 1))}>−</IconButton>
        <span className="counter__value">{value}</span>
        <IconButton onClick={() => onChange(Math.min(max, value + 1))}>+</IconButton>
      </div>
    </div>
  );
}
