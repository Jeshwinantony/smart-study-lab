import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Save, Download, TestTube2, Calendar, BookOpen, Target } from "lucide-react";

interface MindMapNode {
  id: string;
  title: string;
  children?: MindMapNode[];
  content?: string;
}

interface Definition {
  term: string;
  meaning: string;
  example?: string;
}

interface Comparison {
  title: string;
  items: { label: string; points: string[] }[];
}

interface ExamTmroOutputProps {
  summaryHeader: string;
  recapPoints: string[];
  definitions: Definition[];
  comparisons: Comparison[];
  mindMapData: MindMapNode[];
  pastQuestions?: string[];
}

const ExamTmroOutput = ({ 
  summaryHeader, 
  recapPoints, 
  definitions, 
  comparisons, 
  mindMapData,
  pastQuestions = []
}: ExamTmroOutputProps) => {
  const [mindMapOpen, setMindMapOpen] = useState<string[]>([]);
  const [pastQuestionsOpen, setPastQuestionsOpen] = useState(false);

  const toggleMindMapNode = (nodeId: string) => {
    setMindMapOpen(prev => 
      prev.includes(nodeId) 
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  const renderMindMapNode = (node: MindMapNode, level: number = 0) => (
    <div key={node.id} className={`${level > 0 ? 'ml-4 border-l-2 border-feature-blue/20 pl-4' : ''}`}>
      {node.children && node.children.length > 0 ? (
        <Collapsible 
          open={mindMapOpen.includes(node.id)} 
          onOpenChange={() => toggleMindMapNode(node.id)}
        >
          <CollapsibleTrigger asChild>
            <div className="flex items-center gap-2 py-2 cursor-pointer hover:bg-feature-blue/5 rounded px-2">
              <ChevronDown className={`h-4 w-4 text-feature-blue transition-transform ${
                mindMapOpen.includes(node.id) ? 'rotate-180' : ''
              }`} />
              <span className="text-sm font-medium text-feature-blue">{node.title}</span>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="animate-accordion-down">
            {node.content && (
              <p className="text-xs text-muted-foreground mb-2 ml-6">{node.content}</p>
            )}
            <div className="space-y-1">
              {node.children.map(child => renderMindMapNode(child, level + 1))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <div className="flex items-center gap-2 py-1 px-2">
          <div className="w-2 h-2 bg-feature-blue/60 rounded-full"></div>
          <span className="text-sm text-foreground">{node.title}</span>
          {node.content && (
            <span className="text-xs text-muted-foreground">- {node.content}</span>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="animate-fade-in space-y-4">
      {/* Summary Header */}
      <Card className="border-feature-blue/20 bg-gradient-to-br from-feature-blue-light/30 to-background">
        <CardHeader>
          <CardTitle className="text-feature-blue flex items-center gap-2">
            <div className="w-2 h-2 bg-feature-blue rounded-full animate-pulse"></div>
            Exam Recap Pack
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">{summaryHeader}</p>
        </CardContent>
      </Card>

      {/* Bullet Recap Points */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-feature-blue flex items-center gap-2">
            <Target className="h-4 w-4" />
            Key Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recapPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-feature-blue rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-foreground leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Key Definitions */}
      {definitions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-feature-blue flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Key Definitions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {definitions.map((def, index) => (
              <div key={index} className="border-l-2 border-feature-blue/20 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs bg-feature-blue/10 text-feature-blue">
                    {def.term}
                  </Badge>
                </div>
                <p className="text-sm text-foreground mb-1">{def.meaning}</p>
                {def.example && (
                  <p className="text-xs text-muted-foreground italic">Example: {def.example}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Comparison Tables */}
      {comparisons.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-feature-blue">📊 Comparisons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {comparisons.map((comp, index) => (
              <div key={index}>
                <h4 className="text-sm font-medium text-foreground mb-2">{comp.title}</h4>
                <div className="grid grid-cols-2 gap-4">
                  {comp.items.map((item, i) => (
                    <div key={i} className="bg-feature-blue-light/10 p-3 rounded-lg">
                      <p className="text-xs font-medium text-feature-blue mb-2">{item.label}</p>
                      <ul className="space-y-1">
                        {item.points.map((point, j) => (
                          <li key={j} className="text-xs text-muted-foreground flex items-start gap-1">
                            <span className="text-feature-blue">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Interactive Mind Map */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-feature-blue">🧠 Mind Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-feature-blue-light/5 rounded-lg p-4">
            {mindMapData.map(node => renderMindMapNode(node))}
          </div>
        </CardContent>
      </Card>

      {/* Past Year Questions */}
      {pastQuestions.length > 0 && (
        <Collapsible open={pastQuestionsOpen} onOpenChange={setPastQuestionsOpen}>
          <CollapsibleTrigger asChild>
            <Card className="cursor-pointer hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-feature-blue">📝 Past Year Questions</CardTitle>
                  <ChevronDown className={`h-4 w-4 text-feature-blue transition-transform ${
                    pastQuestionsOpen ? 'rotate-180' : ''
                  }`} />
                </div>
              </CardHeader>
            </Card>
          </CollapsibleTrigger>
          <CollapsibleContent className="animate-accordion-down">
            <Card className="border-t-0 rounded-t-none">
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {pastQuestions.map((question, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Badge variant="outline" className="text-xs bg-feature-blue/10 text-feature-blue">
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

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-4">
        <Button variant="outline" size="sm" className="text-feature-blue border-feature-blue/20 hover:bg-feature-blue/10">
          <Save className="h-4 w-4 mr-2" />
          Save Recap
        </Button>
        <Button variant="outline" size="sm" className="text-feature-blue border-feature-blue/20 hover:bg-feature-blue/10">
          <Download className="h-4 w-4 mr-2" />
          Export Pack
        </Button>
        <Button variant="outline" size="sm" className="text-feature-blue border-feature-blue/20 hover:bg-feature-blue/10">
          <TestTube2 className="h-4 w-4 mr-2" />
          Generate Quiz
        </Button>
        <Button variant="outline" size="sm" className="text-feature-blue border-feature-blue/20 hover:bg-feature-blue/10">
          <Calendar className="h-4 w-4 mr-2" />
          Add to Planner
        </Button>
      </div>
    </div>
  );
};

export default ExamTmroOutput;