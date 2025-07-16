import { useState } from "react";
import { TestTube2, Timer, RotateCcw, Download } from "lucide-react";
import FeatureTopBar from "@/components/FeatureTopBar";
import FeatureSwitchSheet from "@/components/FeatureSwitchSheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export default function QuizMode() {
  const [showFeatureSwitch, setShowFeatureSwitch] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    questionCount: 10,
    format: "mix",
    difficulty: "auto",
    timerPerQuestion: 60
  });
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [smartDefaults, setSmartDefaults] = useState({
    difficultyAuto: true,
    includeWeakTopics: true
  });
  const [advancedSettings, setAdvancedSettings] = useState({
    feedbackMode: "immediate",
    includeExplanations: true,
    spacedRecall: true,
    exportAnki: false
  });

  const recentTopics = [
    "React Hooks", "Organic Chemistry", "Linear Algebra", 
    "World War II", "Python Basics", "Statistics"
  ];

  const handleTopicSelect = (topic: string) => {
    setFormData(prev => ({ ...prev, topic }));
  };

  const handleSubmit = () => {
    console.log("Quiz Mode submitted:", { formData, smartDefaults, advancedSettings });
  };

  const handleStartFlashcards = () => {
    console.log("Starting flashcard mode:", { formData });
  };

  return (
    <div className="min-h-screen bg-feature-yellow-light/30">
      <FeatureTopBar 
        title="🧪 test me – Quiz Mode" 
        onFeatureSwitchClick={() => setShowFeatureSwitch(true)}
      />
      
      <div className="p-4 pb-24 space-y-6">
        {/* Topic Selection */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <Label className="text-sm font-medium">Topic</Label>
            <Input
              placeholder="Enter topic or import from other features..."
              value={formData.topic}
              onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
            />
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Recent Topics</Label>
              <div className="flex gap-2 flex-wrap">
                {recentTopics.map((topic) => (
                  <Badge 
                    key={topic}
                    variant="outline"
                    className="cursor-pointer hover:bg-feature-yellow-light"
                    onClick={() => handleTopicSelect(topic)}
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-2 text-xs">
              <Button variant="link" size="sm" className="p-0 h-auto">Import from IDK</Button>
              <Button variant="link" size="sm" className="p-0 h-auto">Import from ExamTmro</Button>
              <Button variant="link" size="sm" className="p-0 h-auto">Import from Planner</Button>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Settings */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Question Count</Label>
                <Select 
                  value={formData.questionCount.toString()} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, questionCount: parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Questions</SelectItem>
                    <SelectItem value="10">10 Questions</SelectItem>
                    <SelectItem value="20">20 Questions</SelectItem>
                    <SelectItem value="50">50 Questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Format</Label>
                <Select value={formData.format} onValueChange={(value) => setFormData(prev => ({ ...prev, format: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mcq">MCQ Only</SelectItem>
                    <SelectItem value="mix">Mixed</SelectItem>
                    <SelectItem value="flashcards">Flashcards</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Smart Defaults */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TestTube2 className="h-4 w-4" />
              Smart Defaults
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">Auto Difficulty</Label>
                  <p className="text-xs text-muted-foreground">Based on your level & progress</p>
                </div>
                <Switch 
                  checked={smartDefaults.difficultyAuto}
                  onCheckedChange={(checked) => setSmartDefaults(prev => ({ ...prev, difficultyAuto: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">Weak Topics First</Label>
                  <p className="text-xs text-muted-foreground">Prioritize areas you struggle with</p>
                </div>
                <Switch 
                  checked={smartDefaults.includeWeakTopics}
                  onCheckedChange={(checked) => setSmartDefaults(prev => ({ ...prev, includeWeakTopics: checked }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timer Settings */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Timer className="h-4 w-4" />
                Timer per Question: {formData.timerPerQuestion}s
              </Label>
            </div>
            <Slider
              value={[formData.timerPerQuestion]}
              onValueChange={([value]) => setFormData(prev => ({ ...prev, timerPerQuestion: value }))}
              max={300}
              min={15}
              step={15}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>15s</span>
              <span>5min</span>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Options */}
        <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              Advanced Options
              <ChevronDown className={`h-4 w-4 transition-transform ${advancedOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-sm">Feedback Mode</Label>
                    <div className="flex gap-2">
                      {[
                        { value: "immediate", label: "Immediate" },
                        { value: "end", label: "End Review" }
                      ].map((mode) => (
                        <Badge 
                          key={mode.value}
                          variant={advancedSettings.feedbackMode === mode.value ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setAdvancedSettings(prev => ({ ...prev, feedbackMode: mode.value }))}
                        >
                          {mode.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Include Explanations</Label>
                      <Switch 
                        checked={advancedSettings.includeExplanations}
                        onCheckedChange={(checked) => setAdvancedSettings(prev => ({ ...prev, includeExplanations: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Spaced Recall</Label>
                      <Switch 
                        checked={advancedSettings.spacedRecall}
                        onCheckedChange={(checked) => setAdvancedSettings(prev => ({ ...prev, spacedRecall: checked }))}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm">Export Anki/CSV</Label>
                      <p className="text-xs text-muted-foreground">Download wrong answers as deck</p>
                    </div>
                    <Switch 
                      checked={advancedSettings.exportAnki}
                      onCheckedChange={(checked) => setAdvancedSettings(prev => ({ ...prev, exportAnki: checked }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {/* Quick Stats */}
        <Card className="border-feature-yellow/20 bg-feature-yellow-light/50">
          <CardContent className="p-4">
            <div className="text-sm text-center">
              <div className="font-medium">Last Quiz: React Hooks</div>
              <div className="text-muted-foreground">8/10 correct • 2 min avg</div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            onClick={handleStartFlashcards}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Flashcard Mode
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </Button>
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t">
        <Button 
          onClick={handleSubmit}
          className="w-full bg-feature-yellow hover:bg-feature-yellow/90 text-feature-yellow-foreground"
          size="lg"
          disabled={!formData.topic.trim()}
        >
          Start Quiz
        </Button>
      </div>

      <FeatureSwitchSheet 
        open={showFeatureSwitch} 
        onOpenChange={setShowFeatureSwitch}
      />
    </div>
  );
}