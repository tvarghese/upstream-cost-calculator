import type { ReactNode } from "react";

interface SectionProps {
  step?: string;
  label: string;
  children: ReactNode;
}

export function Section({ step, label, children }: SectionProps) {
  return (
    <div className="section">
      <div className="section__label">
        {step && <span className="section__step">{step}.</span>}
        {label}
      </div>
      {children}
    </div>
  );
}
