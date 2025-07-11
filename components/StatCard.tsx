import { cn } from "@/lib/utils"; // Assuming you have a utility for className concatenation
import { LucideIcon } from "lucide-react";

export const StatCard = ({
  icon,
  label,
  value,
  color = "bg-card/80 border-border",
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color?: string;
}) => (
  <div
    className={cn(
      "flex backdrop-blur-md rounded-lg shadow-lg border transition-all duration-300 animate-in fade-in slide-in-from-left-2",
      // Mobile: Vertical layout, smaller size
      "flex-col items-center gap-2 px-3 py-4 text-sm w-full max-w-[150px] mx-auto",
      // Tablet: Horizontal layout, medium size
      "sm:flex-row sm:items-center sm:gap-3 sm:px-4 sm:py-3 sm:text-base sm:max-w-[200px]",
      // Desktop: Larger horizontal layout, prominent styling
      "lg:gap-4 lg:px-5 lg:py-4 lg:text-lg lg:max-w-[250px] lg:hover:scale-[1.02] lg:hover:shadow-xl",
      color
    )}
  >
    <div
      className="p-2 rounded-md bg-muted/50 flex-shrink-0 
      sm:p-2.5 
      lg:p-3"
    >
      {icon}
    </div>
    <div className="flex flex-col items-center sm:items-start">
      <span
        className="font-medium text-muted-foreground 
        sm:text-sm 
        lg:text-base"
      >
        {label}
      </span>
      <span
        className="font-bold text-foreground 
        text-base sm:text-lg 
        lg:text-xl"
      >
        {value}
      </span>
    </div>
  </div>
);

export const InsightCard = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
    {icon}
    <span>{text}</span>
  </div>
);
