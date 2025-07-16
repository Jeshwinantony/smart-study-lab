import { useState } from "react";
import { Rocket, Play, RotateCcw, Settings } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";

export default function SkillBuilder() {
  const [showFeatureSwitch, setShowFeatureSwitch] = useState(false);
  const [formData, setFormData] = useState({
    skill: "",
    currentLevel: "",
    goalOutcome: "",
    sessionTime: 30,
    codeLang: "Python",
    learningStyle: "mixed"
  });
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [advancedSettings, setAdvancedSettings] = useState({
    includeStarterCode: true,
    generatePracticeData: true,
    showTroubleshooting: true,
    pace: "standard",
    targetPlatform: "web"
  });

  // Mock progress for demo
  const [progress] = useState(35);
  const [hasSession] = useState(true);

  const popularSkills = [
    "React Hooks", "SQL Joins", "Python Functions", "API Integration", 
    "CSS Grid", "JavaScript Async", "Git Workflow", "Docker Basics"
  ];

  const handleSubmit = () => {
    console.log("Skill Builder submitted:", { formData, advancedSettings });
  };

  const handleSkillSelect = (skill: string) => {
    setFormData(prev => ({ ...prev, skill }));
  };

  return (
    <div className="min-h-screen bg-feature-green-light/30">
      <FeatureTopBar 
        title="🚀 do-learn – Guided Skills" 
        onFeatureSwitchClick={() => setShowFeatureSwitch(true)}
      />
      
      <div className="p-4 pb-24 space-y-6">
        {/* Resume Session */}
        {hasSession && (
          <Card className="border-feature-green/20 bg-feature-green-light/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium">React Hooks</div>
                  <div className="text-sm text-muted-foreground">Step 3 of 8</div>
                </div>
                <Badge variant="secondary">{progress}% complete</Badge>
              </div>
              <Progress value={progress} className="mb-3" />
              <Button variant="outline" size="sm" className="w-full">
                <Play className="h-4 w-4 mr-2" />
                Resume Last Step
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Skill to Learn */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <Label className="text-sm font-medium">Skill to Learn</Label>
            <Input
              placeholder="e.g., React Hooks, SQL Joins, API Integration..."
              value={formData.skill}
              onChange={(e) => setFormData(prev => ({ ...prev, skill: e.target.value }))}
            />
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Popular Skills</Label>
              <div className="flex gap-2 flex-wrap">
                {popularSkills.map((skill) => (
                  <Badge 
                    key={skill}
                    variant="outline"
                    className="cursor-pointer hover:bg-feature-green-light"
                    onClick={() => handleSkillSelect(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Level & Goal */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Current Level</Label>
                <Select value={formData.currentLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, currentLevel: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="tried">Tried</SelectItem>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="refresh">Refresh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Goal Outcome</Label>
                <Select value={formData.goalOutcome} onValueChange={(value) => setFormData(prev => ({ ...prev, goalOutcome: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="demo">Build Demo</SelectItem>
                    <SelectItem value="exam">Pass Exam</SelectItem>
                    <SelectItem value="interview">Interview Prep</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                    <SelectItem value="concept">Understand Concept</SelectItem>
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
              <Settings className="h-4 w-4" />
              Smart Defaults
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Session Time (minutes)</Label>
                <Input
                  type="number"
                  min="15"
                  max="120"
                  step="15"
                  value={formData.sessionTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, sessionTime: parseInt(e.target.value) || 30 }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm">Code Language</Label>
                <Select value={formData.codeLang} onValueChange={(value) => setFormData(prev => ({ ...prev, codeLang: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="JavaScript">JavaScript</SelectItem>
                    <SelectItem value="Java">Java</SelectItem>
                    <SelectItem value="TypeScript">TypeScript</SelectItem>
                    <SelectItem value="C++">C++</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Learning Style</Label>
              <div className="flex gap-2">
                {[
                  { value: "do-first", label: "Do-first" },
                  { value: "learn-then-do", label: "Learn-then-do" },
                  { value: "mixed", label: "Mixed" }
                ].map((style) => (
                  <Badge 
                    key={style.value}
                    variant={formData.learningStyle === style.value ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFormData(prev => ({ ...prev, learningStyle: style.value }))}
                  >
                    {style.label}
                  </Badge>
                ))}
              </div>
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
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Include Starter Code</Label>
                    <Switch 
                      checked={advancedSettings.includeStarterCode}
                      onCheckedChange={(checked) => setAdvancedSettings(prev => ({ ...prev, includeStarterCode: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Generate Practice Data</Label>
                    <Switch 
                      checked={advancedSettings.generatePracticeData}
                      onCheckedChange={(checked) => setAdvancedSettings(prev => ({ ...prev, generatePracticeData: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Show Troubleshooting Tips</Label>
                    <Switch 
                      checked={advancedSettings.showTroubleshooting}
                      onCheckedChange={(checked) => setAdvancedSettings(prev => ({ ...prev, showTroubleshooting: checked }))}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm">Pace</Label>
                  <div className="flex gap-2">
                    {["bite-size", "standard", "sprint"].map((pace) => (
                      <Badge 
                        key={pace}
                        variant={advancedSettings.pace === pace ? "default" : "outline"}
                        className="cursor-pointer capitalize"
                        onClick={() => setAdvancedSettings(prev => ({ ...prev, pace }))}
                      >
                        {pace.replace("-", " ")}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm">
            Skip to Practice
          </Button>
          <Button variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Progress
          </Button>
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t">
        <Button 
          onClick={handleSubmit}
          className="w-full bg-feature-green hover:bg-feature-green/90 text-white"
          size="lg"
          disabled={!formData.skill.trim() || !formData.currentLevel || !formData.goalOutcome}
        >
          Start Guided Path
        </Button>
      </div>

      <FeatureSwitchSheet 
        open={showFeatureSwitch} 
        onOpenChange={setShowFeatureSwitch}
      />
    </div>
  );
}