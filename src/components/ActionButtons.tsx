import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ActionButton {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: "default" | "outline" | "secondary";
}

interface ActionButtonsProps {
  buttons: ActionButton[];
  accentColor: string;
}

export default function ActionButtons({ buttons, accentColor }: ActionButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {buttons.map((button, index) => {
        const Icon = button.icon;
        return (
          <Button
            key={index}
            variant={button.variant || "outline"}
            onClick={button.onClick}
            className={`h-auto p-3 flex flex-col gap-1 ${
              button.variant === "default" 
                ? `bg-${accentColor} hover:bg-${accentColor}/90 text-white` 
                : `border-${accentColor}/20 hover:bg-${accentColor}/10`
            }`}
          >
            <Icon className="h-4 w-4" />
            <span className="text-xs">{button.label}</span>
          </Button>
        );
      })}
    </div>
  );
}