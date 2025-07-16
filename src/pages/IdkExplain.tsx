import { useState } from "react";
import { Upload, FileText, Image, File } from "lucide-react";
import FeatureTopBar from "@/components/FeatureTopBar";
import FeatureSwitchSheet from "@/components/FeatureSwitchSheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export default function IdkExplain() {
  const [showFeatureSwitch, setShowFeatureSwitch] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    level: "",
    language: "English",
    realWorldExample: false,
    exampleDomain: "tech",
    outputLength: "medium",
    includeQuiz: false,
    citeSources: false,
    sendToChat: false
  });
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = () => {
    // Placeholder implementation
    console.log("IDK Explain submitted:", { formData, files });
    // In real app: buildPrompt(), callAPI(), showResult()
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...newFiles]);
  };

  return (
    <div className="min-h-screen bg-feature-sky-light/30">
      <FeatureTopBar 
        title="🧠 IDK – Doubt Explainer" 
        onFeatureSwitchClick={() => setShowFeatureSwitch(true)}
      />
      
      <div className="p-4 pb-24 space-y-6">
        {/* Topic Input */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <Label htmlFor="topic" className="text-sm font-medium">
              Topic / Question <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="topic"
              placeholder="What would you like me to explain? Ask anything you're curious about..."
              className="min-h-[120px] resize-none"
              value={formData.topic}
              onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
            />
          </CardContent>
        </Card>

        {/* Upload Row */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <Label className="text-sm font-medium">Upload (Optional)</Label>
            <div className="grid grid-cols-3 gap-2">
              <label className="flex flex-col items-center gap-2 p-3 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-feature-sky/50 transition-colors">
                <Image className="h-5 w-5 text-muted-foreground" />
                <span className="text-xs text-center">Image</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </label>
              <label className="flex flex-col items-center gap-2 p-3 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-feature-sky/50 transition-colors">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="text-xs text-center">PDF/Doc</span>
                <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileUpload} />
              </label>
              <label className="flex flex-col items-center gap-2 p-3 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-feature-sky/50 transition-colors">
                <File className="h-5 w-5 text-muted-foreground" />
                <span className="text-xs text-center">Screenshot</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                    <File className="h-4 w-4" />
                    <span className="text-sm truncate">{file.name}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Settings */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Learning Level</Label>
                <Select value={formData.level} onValueChange={(value) => setFormData(prev => ({ ...prev, level: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="middle">Middle</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="college">College</SelectItem>
                    <SelectItem value="pro">Pro Lite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Output Length</Label>
                <Select value={formData.outputLength} onValueChange={(value) => setFormData(prev => ({ ...prev, outputLength: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Real World Examples */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Real-World Example</Label>
                <Switch 
                  checked={formData.realWorldExample}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, realWorldExample: checked }))}
                />
              </div>
              {formData.realWorldExample && (
                <div className="flex gap-2 flex-wrap">
                  {["Tech", "Daily Life", "Exam Answer"].map((domain) => (
                    <Badge 
                      key={domain}
                      variant={formData.exampleDomain === domain.toLowerCase().replace(" ", "") ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setFormData(prev => ({ ...prev, exampleDomain: domain.toLowerCase().replace(" ", "") }))}
                    >
                      {domain}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Advanced Options */}
        <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              Format Options
              <ChevronDown className={`h-4 w-4 transition-transform ${advancedOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Include Quiz</Label>
                    <Switch 
                      checked={formData.includeQuiz}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, includeQuiz: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Cite Sources</Label>
                    <Switch 
                      checked={formData.citeSources}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, citeSources: checked }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {/* Send to Chat Option */}
        <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
          <Label className="text-sm">Send to Chat After</Label>
          <Switch 
            checked={formData.sendToChat}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, sendToChat: checked }))}
          />
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t">
        <Button 
          onClick={handleSubmit}
          className="w-full bg-feature-sky hover:bg-feature-sky/90 text-white"
          size="lg"
          disabled={!formData.topic.trim()}
        >
          Explain Now
        </Button>
      </div>

      <FeatureSwitchSheet 
        open={showFeatureSwitch} 
        onOpenChange={setShowFeatureSwitch}
      />
    </div>
  );
}