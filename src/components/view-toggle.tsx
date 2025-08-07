import { Monitor, Terminal } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ViewToggleProps {
  isCliView: boolean;
  onToggle: () => void;
  className?: string;
}

export function ViewToggle({ isCliView, onToggle, className }: ViewToggleProps) {
  return (
    <div className={cn(
      "fixed left-1/2 -translate-x-1/2 z-50 bg-background/80 backdrop-blur-sm rounded-full p-1 shadow-lg border",
      "transition-all duration-200 ease-in-out",
      isCliView ? "top-4" : "top-20",
      className
    )}>
      <div className="flex items-center relative">
        <div className={cn(
          "absolute inset-0 bg-primary/10 rounded-full transition-transform duration-200",
          isCliView ? "translate-x-full" : "translate-x-0"
        )} />
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "relative px-4 transition-colors",
            !isCliView && "text-primary"
          )}
          onClick={() => !isCliView && onToggle()}
        >
          <span className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            <span className="text-sm">GUI</span>
          </span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "relative px-4 transition-colors",
            isCliView && "text-primary"
          )}
          onClick={() => isCliView && onToggle()}
        >
          <span className="flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            <span className="text-sm">CLI</span>
          </span>
        </Button>
      </div>
    </div>
  );
} 