import { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeatureOutputProps {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
  accentColor: string;
}

export default function FeatureOutput({ isVisible, onClose, children, accentColor }: FeatureOutputProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className={`p-4 border-b border-${accentColor}/20 bg-${accentColor}-light/30`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-lg font-semibold text-${accentColor}-foreground`}>
              Feature Output
            </h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
}