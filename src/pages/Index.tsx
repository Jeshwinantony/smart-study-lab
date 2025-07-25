import { useState } from "react";
import { Brain, Calendar, Rocket, BookOpen, TestTube2, MessageCircle, Menu, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import FeatureSwitchSheet from "@/components/FeatureSwitchSheet";
import IdkOutput from "@/components/features/IdkOutput";
import ExamKindOutput from "@/components/features/ExamKindOutput";
import DoLearnOutput from "@/components/features/DoLearnOutput";
import ExamTmroOutput from "@/components/features/ExamTmroOutput";
import TestMeOutput from "@/components/features/TestMeOutput";

const features = [
  {
    id: "idk",
    route: "/idk",
    title: "IDK",
    subtitle: "Doubt Explainer",
    description: "Get kid-friendly explanations for any topic",
    icon: Brain,
    color: "feature-teal",
    lightBg: "feature-teal-light"
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
    color: "feature-blue",
    lightBg: "feature-blue-light"
  },
  {
    id: "test-me",
    route: "/test-me",
    title: "test me",
    subtitle: "Quiz & Flashcards",
    description: "Practice with adaptive quizzes and spaced recall",
    icon: TestTube2,
    color: "feature-orange",
    lightBg: "feature-orange-light"
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [showFeatureSwitch, setShowFeatureSwitch] = useState(false);
  const [currentFeature, setCurrentFeature] = useState<string | null>(null);
  const [userInput, setUserInput] = useState("");

  const handleFeatureClick = (featureId: string) => {
    setCurrentFeature(featureId);
    // Mock trigger the feature with user input
    if (userInput.trim()) {
      triggerFeature(featureId, userInput);
    } else {
      triggerFeature(featureId, "Sample question");
    }
  };

  const triggerFeature = (featureId: string, input: string) => {
    // This would normally call an API
    console.log(`Triggering ${featureId} with input: ${input}`);
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      // Auto-detect feature based on input or show feature selection
      setShowFeatureSwitch(true);
    }
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
            <Input 
              placeholder="Ask me anything to get started..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 border-0 shadow-none focus-visible:ring-0 bg-transparent"
            />
            <Button 
              size="sm" 
              onClick={handleSendMessage}
              disabled={!userInput.trim()}
              className="h-8 w-8 p-0"
            >
              <Send className="h-4 w-4" />
            </Button>
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
                onClick={() => handleFeatureClick(feature.id)}
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

      {/* Feature Output Section */}
      {currentFeature && (
        <div className="max-w-2xl mx-auto p-6">
          {currentFeature === "idk" && (
            <IdkOutput
              question={userInput || "What is photosynthesis?"}
              explanation="Photosynthesis is like a magical kitchen inside plants! Just like you need ingredients to cook, plants need sunlight, water, and air to make their own food. The green parts of the plant (called chlorophyll) act like tiny chefs that mix these ingredients together to create sugar - which is the plant's food! This process also makes oxygen, which is the air we breathe. So plants are basically cooking their own meals while helping us breathe!"
              realWorldExample="Think of it like a solar-powered smoothie maker! The plant's leaves are like solar panels that catch sunlight, the roots drink water from the ground like a straw, and the leaves breathe in carbon dioxide from the air. Mix it all together, and you get plant food (glucose) plus oxygen as a bonus gift for us!"
              recapQuestions={[
                "What three ingredients do plants need for photosynthesis?",
                "What do plants make during photosynthesis?",
                "Why is photosynthesis important for humans?"
              ]}
              advancedExplanation="Photosynthesis occurs in two main stages: the light-dependent reactions (in the thylakoids) and the light-independent reactions (Calvin cycle in the stroma). The overall equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. This process is fundamental to life on Earth as it converts inorganic compounds into organic compounds and releases oxygen as a byproduct."
            />
          )}
          
          {currentFeature === "exam-kind" && (
            <ExamKindOutput
              planSummary="Your personalized 14-day study plan for Biology and Chemistry exams. Balanced schedule with 3 hours daily, focusing on weak topics first."
              weekDates={["2024-01-15", "2024-01-16", "2024-01-17", "2024-01-18", "2024-01-19", "2024-01-20", "2024-01-21"]}
              studyDays={[
                {
                  date: "Monday, Jan 15",
                  subjects: ["Biology", "Chemistry"],
                  topics: ["Photosynthesis", "Cell Division", "Chemical Bonding"],
                  timeBlocks: ["9-10 AM", "2-3 PM", "7-8 PM"],
                  priority: "High",
                  focus: "Understanding Concepts",
                  tip: "Use diagrams and flowcharts for photosynthesis process"
                },
                {
                  date: "Tuesday, Jan 16",
                  subjects: ["Chemistry"],
                  topics: ["Atomic Structure", "Periodic Table"],
                  timeBlocks: ["9-11 AM", "3-4 PM"],
                  priority: "Medium",
                  focus: "Problem Solving",
                  tip: "Practice numerical problems on electron configuration"
                }
              ]}
            />
          )}
          
          {currentFeature === "do-learn" && (
            <DoLearnOutput
              pathTitle="Master React in 7 Days! 🚀"
              goalStatement="Build your first interactive React app from zero to hero with hands-on projects and real-world examples."
              currentXP={150}
              totalXP={500}
              milestones={[
                { title: "First Component", xp: 50, badge: "bronze", unlocked: true },
                { title: "State Master", xp: 150, badge: "silver", unlocked: true },
                { title: "Hook Hero", xp: 300, badge: "gold", unlocked: false }
              ]}
              modules={[
                {
                  id: "1",
                  title: "React Fundamentals",
                  goal: "Understand components, JSX, and props",
                  timeEstimate: "45 minutes",
                  completed: true,
                  tasks: [
                    { id: "1", title: "Create your first component", completed: true },
                    { id: "2", title: "Learn about JSX syntax", completed: true },
                    { id: "3", title: "Pass props between components", completed: false }
                  ],
                  resources: [
                    { title: "React Docs", url: "#" },
                    { title: "Practice Playground", url: "#" }
                  ]
                },
                {
                  id: "2",
                  title: "State and Events",
                  goal: "Master useState and event handling",
                  timeEstimate: "60 minutes",
                  completed: false,
                  tasks: [
                    { id: "1", title: "Create stateful components", completed: false },
                    { id: "2", title: "Handle click events", completed: false },
                    { id: "3", title: "Build a counter app", completed: false }
                  ],
                  resources: [
                    { title: "useState Guide", url: "#" },
                    { title: "Event Handling", url: "#" }
                  ]
                }
              ]}
            />
          )}
          
          {currentFeature === "examtmro" && (
            <ExamTmroOutput
              summaryHeader="Complete Biology Revision Pack ready! Perfect for tomorrow's exam with key concepts, definitions, and mind maps."
              recapPoints={[
                "Photosynthesis occurs in chloroplasts and has two main stages",
                "Cell division includes mitosis (body cells) and meiosis (sex cells)",
                "DNA structure is a double helix with complementary base pairs",
                "Enzymes are biological catalysts that speed up reactions",
                "Homeostasis maintains internal balance in living organisms"
              ]}
              definitions={[
                {
                  term: "Photosynthesis",
                  meaning: "The process by which plants convert light energy into chemical energy",
                  example: "6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂"
                },
                {
                  term: "Mitosis",
                  meaning: "Cell division that produces two identical diploid cells",
                  example: "Skin cell repair and growth"
                }
              ]}
              comparisons={[
                {
                  title: "Mitosis vs Meiosis",
                  items: [
                    {
                      label: "Mitosis",
                      points: ["2 identical cells", "Diploid (2n)", "Body cells", "Growth & repair"]
                    },
                    {
                      label: "Meiosis",
                      points: ["4 different cells", "Haploid (n)", "Sex cells", "Reproduction"]
                    }
                  ]
                }
              ]}
              mindMapData={[
                {
                  id: "1",
                  title: "Cell Biology",
                  children: [
                    {
                      id: "1.1",
                      title: "Cell Structure",
                      content: "Nucleus, mitochondria, chloroplasts"
                    },
                    {
                      id: "1.2",
                      title: "Cell Division",
                      children: [
                        { id: "1.2.1", title: "Mitosis", content: "Growth and repair" },
                        { id: "1.2.2", title: "Meiosis", content: "Sexual reproduction" }
                      ]
                    }
                  ]
                }
              ]}
              pastQuestions={[
                "Explain the process of photosynthesis with a labeled diagram",
                "Compare and contrast mitosis and meiosis",
                "Describe the structure and function of DNA"
              ]}
            />
          )}
          
          {currentFeature === "test-me" && (
            <TestMeOutput
              quizTitle="Biology Quick Quiz 🧬"
              showTimer={true}
              timePerQuestion={30}
              questions={[
                {
                  id: "1",
                  question: "What is the powerhouse of the cell?",
                  type: "mcq",
                  options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
                  correctAnswer: "Mitochondria",
                  explanation: "Mitochondria are called the powerhouse of the cell because they produce ATP (energy) through cellular respiration."
                },
                {
                  id: "2",
                  question: "What gas do plants release during photosynthesis?",
                  type: "short",
                  correctAnswer: "Oxygen",
                  explanation: "During photosynthesis, plants release oxygen as a byproduct while converting carbon dioxide and water into glucose using sunlight."
                },
                {
                  id: "3",
                  question: "Which organelle is responsible for protein synthesis?",
                  type: "mcq",
                  options: ["Golgi apparatus", "Endoplasmic reticulum", "Ribosome", "Lysosome"],
                  correctAnswer: "Ribosome",
                  explanation: "Ribosomes are the cellular structures responsible for protein synthesis, translating mRNA into proteins."
                }
              ]}
            />
          )}
        </div>
      )}

      {/* Floating Switch Feature Button */}
      {currentFeature && (
        <Button
          onClick={() => setShowFeatureSwitch(true)}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90 z-50"
          size="sm"
        >
          <Menu className="h-6 w-6" />
        </Button>
      )}

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
