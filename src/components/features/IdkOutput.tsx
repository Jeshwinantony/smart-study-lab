import { useState } from "react";
import { Brain, BookOpen, TestTube2, Copy, Save } from "lucide-react";
import OverviewCard from "@/components/OverviewCard";
import ActionButtons from "@/components/ActionButtons";
import ScrollableSections from "@/components/ScrollableSections";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface IdkOutputProps {
  explanation: string;
  realWorldExample?: string;
  recapQuestions?: string[];
  olderStudentContent?: string;
}

export default function IdkOutput({ 
  explanation, 
  realWorldExample, 
  recapQuestions = [], 
  olderStudentContent 
}: IdkOutputProps) {
  const [questionsOpen, setQuestionsOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const actionButtons = [
    { label: "Save to Notes", icon: Save, onClick: () => console.log("Save to notes") },
    { label: "Convert to ExamTmro", icon: BookOpen, onClick: () => console.log("Convert to ExamTmro") },
    { label: "Send to Test Me", icon: TestTube2, onClick: () => console.log("Send to Test Me") },
    { label: "Copy Answer", icon: Copy, onClick: () => navigator.clipboard.writeText(explanation) },
  ];

  const sections = [
    ...(realWorldExample ? [{
      title: "Real-World Example",
      content: <div className="prose prose-sm max-w-none">{realWorldExample}</div>
    }] : []),
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Main Explanation */}
      <OverviewCard
        title="AI Explanation"
        icon={<Brain className="h-5 w-5 text-feature-teal" />}
        accentColor="feature-teal"
        content={
          <div className="prose prose-sm max-w-none text-muted-foreground">
            {explanation}
          </div>
        }
      />

      {/* Real-world Example & Additional Sections */}
      {sections.length > 0 && (
        <ScrollableSections sections={sections} accentColor="feature-teal" />
      )}

      {/* Quick Recap Questions */}
      {recapQuestions.length > 0 && (
        <Collapsible open={questionsOpen} onOpenChange={setQuestionsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between border-feature-teal/20">
              Quick Recap Questions ({recapQuestions.length})
              <ChevronDown className={`h-4 w-4 transition-transform ${questionsOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 space-y-2">
            {recapQuestions.map((question, index) => (
              <div key={index} className="p-3 bg-feature-teal-light/20 rounded-lg border-l-2 border-feature-teal">
                <p className="text-sm">{question}</p>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* For Older Students */}
      {olderStudentContent && (
        <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between border-feature-teal/20">
              For Older Students
              <ChevronDown className={`h-4 w-4 transition-transform ${advancedOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <div className="p-4 bg-feature-teal-light/20 rounded-lg">
              <div className="prose prose-sm max-w-none">{olderStudentContent}</div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Action Buttons */}
      <ActionButtons buttons={actionButtons} accentColor="feature-teal" />
    </div>
  );
}