import { useState } from "react";
import { Brain, Calendar, Rocket, BookOpen, TestTube2, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FeatureSwitchSheet from "@/components/FeatureSwitchSheet";

const features = [
  {
    id: "idk",
    route: "/idk",
    title: "IDK",
    subtitle: "Doubt Explainer",
    description: "Get kid-friendly explanations for any topic",
    icon: Brain,
    color: "feature-sky",
    lightBg: "feature-sky-light"
  },
  {
    id: "exam-kind",
    route: "/exam-kind",
    title: "exam-kind",
    subtitle: "Study Planner",
    description: "Create visual study calendars for your exams",
    icon: Calendar,
    color: "feature-indigo",
    lightBg: "feature-indigo-light"
  },
  {
    id: "do-learn",
    route: "/do-learn",
    title: "do-learn",
    subtitle: "Guided Skills",
    description: "Learn by doing with step-based lessons",
    icon: Rocket,
    color: "feature-green",
    lightBg: "feature-green-light"
  },
  {
    id: "examtmro",
    route: "/examtmro",
    title: "ExamTmro",
    subtitle: "Recap & Mind Maps",
    description: "Generate structured revision packs using Blue Method",
    icon: BookOpen,
    color: "feature-lavender",
    lightBg: "feature-lavender-light"
  },
  {
    id: "test-me",
    route: "/test-me",
    title: "test me",
    subtitle: "Quiz & Flashcards",
    description: "Practice with adaptive quizzes and spaced recall",
    icon: TestTube2,
    color: "feature-yellow",
    lightBg: "feature-yellow-light"
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [showFeatureSwitch, setShowFeatureSwitch] = useState(false);

  const handleFeatureClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <div className="p-6 text-center border-b">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <MessageCircle className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Learning Hub</h1>
            <p className="text-muted-foreground">Chat-first learning platform</p>
          </div>
        </div>
        
        <div className="max-w-md mx-auto mb-6">
          <div className="flex items-center gap-2 p-3 bg-card rounded-lg border">
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
            <input 
              placeholder="Ask me anything to get started..."
              className="flex-1 bg-transparent outline-none text-sm"
              onFocus={() => setShowFeatureSwitch(true)}
            />
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Or explore our AI-powered learning features below
        </p>
      </div>

      {/* Features Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            
            return (
              <Card 
                key={feature.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                onClick={() => handleFeatureClick(feature.route)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div 
                      className={`p-3 rounded-xl bg-${feature.lightBg}/50 group-hover:bg-${feature.color}/10 transition-colors`}
                    >
                      <Icon className={`h-6 w-6 text-${feature.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{feature.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {feature.subtitle}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full mt-4 bg-${feature.color} hover:bg-${feature.color}/90 text-white`}
                    size="sm"
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center border-t bg-muted/30">
        <p className="text-sm text-muted-foreground mb-4">
          Powered by AI • Mobile-optimized • Learn anything, anywhere
        </p>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowFeatureSwitch(true)}
        >
          Quick Feature Switch
        </Button>
      </div>

      <FeatureSwitchSheet 
        open={showFeatureSwitch} 
        onOpenChange={setShowFeatureSwitch}
      />
    </div>
  );
};

export default Index;
