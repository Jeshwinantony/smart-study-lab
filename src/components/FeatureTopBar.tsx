import { ArrowLeft, Grid3X3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface FeatureTopBarProps {
  title: string;
  onFeatureSwitchClick: () => void;
}

export default function FeatureTopBar({ title, onFeatureSwitchClick }: FeatureTopBarProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => navigate("/")}
        className="gap-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Chat
      </Button>
      
      <h1 className="font-semibold text-foreground">{title}</h1>
      
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onFeatureSwitchClick}
        className="text-muted-foreground hover:text-foreground"
      >
        <Grid3X3 className="h-4 w-4" />
      </Button>
    </div>
  );
}