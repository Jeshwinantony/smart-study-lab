import { useState } from "react";
import { BookOpen, Download, Share, Map } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RecapMindMap() {
  const [showFeatureSwitch, setShowFeatureSwitch] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    coverage: "whole",
    depth: "standard",
    answerType: "5m",
    selectedUnits: [] as string[]
  });
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [contentOptions, setContentOptions] = useState({
    definitions: true,
    mindMap: true,
    comparisons: true,
    recapSheet: true,
    testQuestions: false,
    diagramMode: false
  });
  const [settings, setSettings] = useState({
    usePlannerData: true,
    includePastYearQ: false,
    includeUploadedDocs: false,
    exportFormat: "pdf"
  });

  const availableUnits = [
    "Introduction", "Core Concepts", "Advanced Topics", 
    "Applications", "Case Studies", "Practice Problems"
  ];

  const handleUnitToggle = (unit: string) => {
    setFormData(prev => ({
      ...prev,
      selectedUnits: prev.selectedUnits.includes(unit)
        ? prev.selectedUnits.filter(u => u !== unit)
        : [...prev.selectedUnits, unit]
    }));
  };

  const handleSubmit = () => {
    console.log("ExamTmro submitted:", { formData, contentOptions, settings });
  };

  return (
    <div className="min-h-screen bg-feature-lavender-light/30">
      <FeatureTopBar 
        title="📅 ExamTmro – Recap Pack" 
        onFeatureSwitchClick={() => setShowFeatureSwitch(true)}
      />
      
      <div className="p-4 pb-24 space-y-6">
        {/* Topic/Subject */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <Label className="text-sm font-medium">Topic or Subject</Label>
            <Input
              placeholder="Enter topic or select from your planner..."
              value={formData.topic}
              onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
            />
            <div className="flex gap-2 flex-wrap">
              {["Physics", "Chemistry", "Mathematics", "History", "Biology"].map((subject) => (
                <Badge 
                  key={subject}
                  variant="outline"
                  className="cursor-pointer hover:bg-feature-lavender-light"
                  onClick={() => setFormData(prev => ({ ...prev, topic: subject }))}
                >
                  {subject}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Coverage & Settings */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Coverage</Label>
                <Select value={formData.coverage} onValueChange={(value) => setFormData(prev => ({ ...prev, coverage: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whole">Whole Subject</SelectItem>
                    <SelectItem value="units">Selected Units</SelectItem>
                    <SelectItem value="topics">Specific Topics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Depth</Label>
                <Select value={formData.depth} onValueChange={(value) => setFormData(prev => ({ ...prev, depth: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quick">Quick Rev</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="full">Full</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.coverage === "units" && (
              <div className="space-y-2">
                <Label className="text-sm">Select Units</Label>
                <div className="flex gap-2 flex-wrap">
                  {availableUnits.map((unit) => (
                    <Badge 
                      key={unit}
                      variant={formData.selectedUnits.includes(unit) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleUnitToggle(unit)}
                    >
                      {unit}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-sm font-medium">Answer Type Target</Label>
              <div className="flex gap-2">
                {["2m", "5m", "13m", "16m"].map((type) => (
                  <Badge 
                    key={type}
                    variant={formData.answerType === type ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFormData(prev => ({ ...prev, answerType: type }))}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Options */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Content Options</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="essential" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="essential">Essential</TabsTrigger>
                <TabsTrigger value="optional">Optional</TabsTrigger>
              </TabsList>
              
              <TabsContent value="essential" className="space-y-3 mt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Definitions</Label>
                    <Switch 
                      checked={contentOptions.definitions}
                      onCheckedChange={(checked) => setContentOptions(prev => ({ ...prev, definitions: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Mind Map</Label>
                    <Switch 
                      checked={contentOptions.mindMap}
                      onCheckedChange={(checked) => setContentOptions(prev => ({ ...prev, mindMap: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Comparisons</Label>
                    <Switch 
                      checked={contentOptions.comparisons}
                      onCheckedChange={(checked) => setContentOptions(prev => ({ ...prev, comparisons: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Recap Sheet</Label>
                    <Switch 
                      checked={contentOptions.recapSheet}
                      onCheckedChange={(checked) => setContentOptions(prev => ({ ...prev, recapSheet: checked }))}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="optional" className="space-y-3 mt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">5Q Test</Label>
                    <Switch 
                      checked={contentOptions.testQuestions}
                      onCheckedChange={(checked) => setContentOptions(prev => ({ ...prev, testQuestions: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Diagram Mode</Label>
                    <Switch 
                      checked={contentOptions.diagramMode}
                      onCheckedChange={(checked) => setContentOptions(prev => ({ ...prev, diagramMode: checked }))}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Smart Defaults */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Use exam-kind planner data</Label>
              <Switch 
                checked={settings.usePlannerData}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, usePlannerData: checked }))}
              />
            </div>
            {settings.usePlannerData && (
              <div className="text-xs text-muted-foreground p-2 bg-muted/50 rounded">
                Will focus on weak areas and upcoming exam dates
              </div>
            )}
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Past-year Questions</Label>
                    <Switch 
                      checked={settings.includePastYearQ}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, includePastYearQ: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Your Uploaded Docs</Label>
                    <Switch 
                      checked={settings.includeUploadedDocs}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, includeUploadedDocs: checked }))}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm">Export Format</Label>
                  <div className="flex gap-2">
                    {["PDF", "Notes", "Flashcards"].map((format) => (
                      <Badge 
                        key={format}
                        variant={settings.exportFormat === format.toLowerCase() ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSettings(prev => ({ ...prev, exportFormat: format.toLowerCase() }))}
                      >
                        {format}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" size="sm">
            <Map className="h-4 w-4 mr-1" />
            Mind Map
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t">
        <Button 
          onClick={handleSubmit}
          className="w-full bg-feature-lavender hover:bg-feature-lavender/90 text-white"
          size="lg"
          disabled={!formData.topic.trim()}
        >
          Generate Recap Pack
        </Button>
      </div>

      <FeatureSwitchSheet 
        open={showFeatureSwitch} 
        onOpenChange={setShowFeatureSwitch}
      />
    </div>
  );
}