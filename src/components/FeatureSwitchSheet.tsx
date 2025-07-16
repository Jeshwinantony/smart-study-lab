import { useState } from "react";
import { Brain, Calendar, Rocket, BookOpen, TestTube2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FeatureSwitchSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const features = [
  {
    id: "idk",
    route: "/idk",
    title: "IDK",
    subtitle: "Doubt Explainer",
    icon: Brain,
    color: "feature-sky",
    badge: "Ask anything"
  },
  {
    id: "exam-kind",
    route: "/exam-kind",
    title: "exam-kind",
    subtitle: "Study Planner",
    icon: Calendar,
    color: "feature-indigo",
    badge: "2 exams scheduled"
  },
  {
    id: "do-learn",
    route: "/do-learn",
    title: "do-learn",
    subtitle: "Guided Skills",
    icon: Rocket,
    color: "feature-green",
    badge: "3 steps left"
  },
  {
    id: "examtmro",
    route: "/examtmro",
    title: "ExamTmro",
    subtitle: "Recap & Mind Maps",
    icon: BookOpen,
    color: "feature-lavender",
    badge: "Blue Method"
  },
  {
    id: "test-me",
    route: "/test-me",
    title: "test me",
    subtitle: "Quiz & Flashcards",
    icon: TestTube2,
    color: "feature-yellow",
    badge: "Practice mode"
  }
];

export default function FeatureSwitchSheet({ open, onOpenChange }: FeatureSwitchSheetProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname;

  const handleFeatureSelect = (route: string) => {
    navigate(route);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[80vh]">
        <SheetHeader>
          <SheetTitle>Switch Feature</SheetTitle>
        </SheetHeader>
        
        <div className="grid grid-cols-1 gap-3 mt-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            const isActive = currentRoute === feature.route;
            
            return (
              <Button
                key={feature.id}
                variant={isActive ? "secondary" : "outline"}
                onClick={() => handleFeatureSelect(feature.route)}
                className="h-auto p-4 justify-start gap-4"
              >
                <div 
                  className={`p-2 rounded-lg bg-${feature.color}-light`}
                  style={{
                    backgroundColor: isActive ? `hsl(var(--${feature.color}))` : `hsl(var(--${feature.color}-light))`
                  }}
                >
                  <Icon className={`h-5 w-5 text-${feature.color}-foreground`} />
                </div>
                
                <div className="flex-1 text-left">
                  <div className="font-medium">{feature.title}</div>
                  <div className="text-sm text-muted-foreground">{feature.subtitle}</div>
                </div>
                
                <Badge variant="secondary" className="text-xs">
                  {feature.badge}
                </Badge>
              </Button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}