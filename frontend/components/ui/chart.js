import React, { forwardRef } from "react";
import { cn } from "@/lib/utils/utils";

const ChartContainer = forwardRef(function ChartContainer(
  { className, config, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("w-full h-full", className)}
      style={{
        "--color-primary": config.primary?.color,
        "--color-secondary": config.secondary?.color,
        ...Object.entries(config).reduce((acc, [key, value]) => {
          if (typeof value === "object" && value.color) {
            acc[`--color-${key}`] = value.color;
          }
          return acc;
        }, {}),
      }}
      {...props}
    />
  );
});
ChartContainer.displayName = "ChartContainer";

const ChartTooltip = forwardRef(function ChartTooltip(
  { content, ...props },
  ref
) {
  if (!content) return null;

  return (
    <div
      ref={ref}
      className="rounded-lg border bg-background p-2 shadow-md"
      {...props}
    >
      {content}
    </div>
  );
});
ChartTooltip.displayName = "ChartTooltip";

const ChartTooltipContent = forwardRef(function ChartTooltipContent(
  { active, payload, label, hideLabel, ...props },
  ref
) {
  if (!active || !payload) return null;

  return (
    <div ref={ref} className="space-y-1" {...props}>
      {!hideLabel && <p className="text-sm font-medium">{label}</p>}
      {payload.map((item, index) => (
        <div key={index} className="flex items-center text-xs">
          <span
            className="mr-2 h-3 w-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="font-medium">{item.name}:</span>
          <span className="ml-1">{item.value}</span>
        </div>
      ))}
    </div>
  );
});
ChartTooltipContent.displayName = "ChartTooltipContent";

export { ChartContainer, ChartTooltip, ChartTooltipContent };
