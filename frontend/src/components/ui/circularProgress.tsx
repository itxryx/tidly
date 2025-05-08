import React from "react";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  color?: string;
  warningThreshold?: number;
  errorThreshold?: number;
}

export function CircularProgress({
  value,
  max,
  size = 24,
  strokeWidth = 3,
  className,
  color = "var(--primary)",
  warningThreshold = 70,
  errorThreshold = 90
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(value, 0), max);
  const percentage = (progress / max) * 100;
  
  const strokeDashoffset = React.useMemo(() => {
    return circumference - (circumference * percentage) / 100;
  }, [circumference, percentage]);

  let progressColor = color;
  if (percentage >= errorThreshold) {
    progressColor = "var(--destructive)";
  } else if (percentage >= warningThreshold) {
    progressColor = "var(--accent)";
  }

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="var(--border)"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={progressColor}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          fill="transparent"
          className="transition-[stroke-dashoffset,stroke] duration-200 ease-out"
          style={{ willChange: "stroke-dashoffset, stroke" }}
        />
      </svg>
      <span
        className={cn(
          "absolute text-[10px] font-medium",
          percentage >= errorThreshold
            ? "text-destructive"
            : percentage >= warningThreshold
            ? "text-accent"
            : "text-muted-foreground"
        )}
      >
        {value}
      </span>
    </div>
  );
}