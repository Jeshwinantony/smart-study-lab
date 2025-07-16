import { useState } from "react";
import { Plus, Upload, Calendar, Clock } from "lucide-react";
import FeatureTopBar from "@/components/FeatureTopBar";
import FeatureSwitchSheet from "@/components/FeatureSwitchSheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface Exam {
  id: string;
  subject: string;
  date: string;
  weight: number;
}

export default function StudyPlanner() {
  const [showFeatureSwitch, setShowFeatureSwitch] = useState(false);
  const [exams, setExams] = useState<Exam[]>([]);
  const [newExam, setNewExam] = useState({ subject: "", date: "", weight: 50 });
  const [dailyStudyTime, setDailyStudyTime] = useState([2]);
  const [weakTopics, setWeakTopics] = useState<string[]>([]);
  const [newWeakTopic, setNewWeakTopic] = useState("");
  const [answerTypeFocus, setAnswerTypeFocus] = useState<string[]>(["5m"]);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [settings, setSettings] = useState({
    chunkLength: "45m",
    revisionSpacing: "auto",
    bufferDay: true,
    reminders: "push",
    syncCalendar: false
  });

  const handleAddExam = () => {
    if (newExam.subject && newExam.date) {
      setExams(prev => [...prev, {
        id: Date.now().toString(),
        ...newExam
      }]);
      setNewExam({ subject: "", date: "", weight: 50 });
    }
  };

  const handleAddWeakTopic = () => {
    if (newWeakTopic.trim()) {
      setWeakTopics(prev => [...prev, newWeakTopic.trim()]);
      setNewWeakTopic("");
    }
  };

  const toggleAnswerType = (type: string) => {
    setAnswerTypeFocus(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleSubmit = () => {
    console.log("Study Planner submitted:", { exams, dailyStudyTime: dailyStudyTime[0], weakTopics, answerTypeFocus, settings });
  };

  return (
    <div className="min-h-screen bg-feature-indigo-light/30">
      <FeatureTopBar 
        title="📘 exam-kind – Study Planner" 
        onFeatureSwitchClick={() => setShowFeatureSwitch(true)}
      />
      
      <div className="p-4 pb-24 space-y-6">
        {/* Add Exam Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Exams
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Subject"
                value={newExam.subject}
                onChange={(e) => setNewExam(prev => ({ ...prev, subject: e.target.value }))}
              />
              <Input
                type="date"
                value={newExam.date}
                onChange={(e) => setNewExam(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Importance Weight: {newExam.weight}%</Label>
              <Slider
                value={[newExam.weight]}
                onValueChange={([value]) => setNewExam(prev => ({ ...prev, weight: value }))}
                max={100}
                step={10}
                className="w-full"
              />
            </div>
            <Button onClick={handleAddExam} className="w-full" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Exam
            </Button>
            
            {/* Exam List */}
            {exams.length > 0 && (
              <div className="space-y-2">
                {exams.map((exam) => (
                  <div key={exam.id} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                    <div>
                      <div className="font-medium">{exam.subject}</div>
                      <div className="text-sm text-muted-foreground">{exam.date}</div>
                    </div>
                    <Badge variant="secondary">{exam.weight}%</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Daily Study Time */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Daily Study Time: {dailyStudyTime[0]} hours
            </Label>
            <Slider
              value={dailyStudyTime}
              onValueChange={setDailyStudyTime}
              max={8}
              min={0.5}
              step={0.5}
              className="w-full"
            />
          </CardContent>
        </Card>

        {/* Weak Topics */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <Label className="text-sm font-medium">Weak Topics</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add topic to focus on..."
                value={newWeakTopic}
                onChange={(e) => setNewWeakTopic(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddWeakTopic()}
              />
              <Button onClick={handleAddWeakTopic} size="sm">Add</Button>
            </div>
            {weakTopics.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {weakTopics.map((topic, index) => (
                  <Badge key={index} variant="outline">{topic}</Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Answer Type Focus */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <Label className="text-sm font-medium">Answer Type Focus</Label>
            <div className="flex gap-2 flex-wrap">
              {["2m", "5m", "13m", "16m"].map((type) => (
                <Badge 
                  key={type}
                  variant={answerTypeFocus.includes(type) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleAnswerType(type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upload Syllabus */}
        <Card>
          <CardContent className="p-4">
            <Label className="text-sm font-medium mb-3 block">Upload Syllabus (Optional)</Label>
            <label className="flex items-center gap-3 p-4 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-feature-indigo/50 transition-colors">
              <Upload className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Upload Documents</div>
                <div className="text-xs text-muted-foreground">PDF, images, or text files</div>
              </div>
              <input type="file" multiple accept=".pdf,.doc,.docx,image/*,.txt" className="hidden" />
            </label>
          </CardContent>
        </Card>

        {/* Advanced Settings */}
        <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              Advanced Settings
              <ChevronDown className={`h-4 w-4 transition-transform ${advancedOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Buffer Day</Label>
                    <Switch 
                      checked={settings.bufferDay}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, bufferDay: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Sync Calendar</Label>
                    <Switch 
                      checked={settings.syncCalendar}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, syncCalendar: checked }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t">
        <Button 
          onClick={handleSubmit}
          className="w-full bg-feature-indigo hover:bg-feature-indigo/90 text-white"
          size="lg"
          disabled={exams.length === 0}
        >
          Generate Plan
        </Button>
      </div>

      <FeatureSwitchSheet 
        open={showFeatureSwitch} 
        onOpenChange={setShowFeatureSwitch}
      />
    </div>
  );
}