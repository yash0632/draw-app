"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "outlined" | "secondary"
  size?: "lg" | "md",
  onClick?:()=>void
}

export const Button = ({ children, className, variant,size,onClick }: ButtonProps) => {
  return (
    <button
      className={`${className} 
        ${variant == "primary" ? "bg-primary": variant == "secondary"? "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80":"border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm"} 
        ${size === "lg" ? "px-4 py-2":"px-2 py-1"}`
      }
      
      onClick={onClick}
    >
      {children}
    </button>
  );
};
