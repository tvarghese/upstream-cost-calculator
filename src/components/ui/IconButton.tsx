import type { ReactNode } from "react";

interface IconButtonProps {
  onClick: () => void;
  children: ReactNode;
}

export function IconButton({ onClick, children }: IconButtonProps) {
  return (
    <button type="button" className="icon-button" onClick={onClick}>
      {children}
    </button>
  );
}
