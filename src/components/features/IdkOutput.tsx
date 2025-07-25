import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, BookOpen, TestTube2, Save, Copy } from "lucide-react";

interface IdkOutputProps {
  question: string;
  explanation: string;
  realWorldExample?: string;
  recapQuestions?: string[];
  advancedExplanation?: string;
}

const IdkOutput = ({ 
  question, 
  explanation, 
  realWorldExample, 
  recapQuestions, 
  advancedExplanation 
}: IdkOutputProps) => {
  const [questionsOpen, setQuestionsOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  return (
    <div className="animate-fade-in space-y-4">
      {/* Main Explanation Card */}
      <Card className="border-feature-teal/20 bg-gradient-to-br from-feature-teal-light/30 to-background">
        <CardHeader>
          <CardTitle className="text-feature-teal flex items-center gap-2">
            <div className="w-2 h-2 bg-feature-teal rounded-full animate-pulse"></div>
            AI Explanation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground leading-relaxed">{explanation}</p>
          </div>
        </CardContent>
      </Card>

      {/* Real-world Example */}
      {realWorldExample && (
        <Card className="animate-slide-in-right border-feature-teal/10">
          <CardHeader>
            <CardTitle className="text-sm text-feature-teal">🌍 Real-world Example</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm leading-relaxed">{realWorldExample}</p>
          </CardContent>
        </Card>
      )}

      {/* Quick Recap Questions */}
      {recapQuestions && recapQuestions.length > 0 && (
        <Collapsible open={questionsOpen} onOpenChange={setQuestionsOpen}>
          <CollapsibleTrigger asChild>
            <Card className="cursor-pointer hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-feature-teal">🧠 Quick Recap Questions</CardTitle>
                  <ChevronDown className={`h-4 w-4 text-feature-teal transition-transform ${questionsOpen ? 'rotate-180' : ''}`} />
                </div>
              </CardHeader>
            </Card>
          </CollapsibleTrigger>
          <CollapsibleContent className="animate-accordion-down">
            <Card className="border-t-0 rounded-t-none">
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {recapQuestions.map((question, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Badge variant="outline" className="text-xs bg-feature-teal/10 text-feature-teal border-feature-teal/20">
                        {index + 1}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{question}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* For Older Students */}
      {advancedExplanation && (
        <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
          <CollapsibleTrigger asChild>
            <Card className="cursor-pointer hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-feature-teal">🎓 For Older Students</CardTitle>
                  <ChevronDown className={`h-4 w-4 text-feature-teal transition-transform ${advancedOpen ? 'rotate-180' : ''}`} />
                </div>
              </CardHeader>
            </Card>
          </CollapsibleTrigger>
          <CollapsibleContent className="animate-accordion-down">
            <Card className="border-t-0 rounded-t-none">
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground leading-relaxed">{advancedExplanation}</p>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-4">
        <Button variant="outline" size="sm" className="text-feature-teal border-feature-teal/20 hover:bg-feature-teal/10">
          <Save className="h-4 w-4 mr-2" />
          Save to Notes
        </Button>
        <Button variant="outline" size="sm" className="text-feature-teal border-feature-teal/20 hover:bg-feature-teal/10">
          <BookOpen className="h-4 w-4 mr-2" />
          Convert to ExamTmro
        </Button>
        <Button variant="outline" size="sm" className="text-feature-teal border-feature-teal/20 hover:bg-feature-teal/10">
          <TestTube2 className="h-4 w-4 mr-2" />
          Send to Test Me
        </Button>
        <Button variant="outline" size="sm" className="text-feature-teal border-feature-teal/20 hover:bg-feature-teal/10">
          <Copy className="h-4 w-4 mr-2" />
          Copy Answer
        </Button>
      </div>
    </div>
  );
};

export default IdkOutput;