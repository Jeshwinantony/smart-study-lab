import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Play, CheckCircle, PlusCircle, Trophy, Star, Target } from "lucide-react";

interface LearningModule {
  id: string;
  title: string;
  goal: string;
  timeEstimate: string;
  tasks: { id: string; title: string; completed: boolean }[];
  resources: { title: string; url: string }[];
  completed: boolean;
}

interface Milestone {
  title: string;
  xp: number;
  badge: "bronze" | "silver" | "gold";
  unlocked: boolean;
}

interface DoLearnOutputProps {
  pathTitle: string;
  goalStatement: string;
  modules: LearningModule[];
  milestones: Milestone[];
  currentXP: number;
  totalXP: number;
}

const DoLearnOutput = ({ 
  pathTitle, 
  goalStatement, 
  modules, 
  milestones, 
  currentXP, 
  totalXP 
}: DoLearnOutputProps) => {
  const [openModules, setOpenModules] = useState<string[]>([]);

  const toggleModule = (moduleId: string) => {
    setOpenModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getBadgeIcon = (badge: string, unlocked: boolean) => {
    const className = `h-5 w-5 ${unlocked ? 'text-feature-green' : 'text-muted-foreground'}`;
    switch (badge) {
      case "bronze": return <Target className={className} />;
      case "silver": return <Star className={className} />;
      case "gold": return <Trophy className={className} />;
      default: return <Target className={className} />;
    }
  };

  return (
    <div className="animate-fade-in space-y-4">
      {/* Motivational Header */}
      <Card className="border-feature-green/20 bg-gradient-to-br from-feature-green-light/30 to-background">
        <CardHeader>
          <CardTitle className="text-feature-green flex items-center gap-2">
            <div className="w-2 h-2 bg-feature-green rounded-full animate-pulse"></div>
            {pathTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed mb-4">{goalStatement}</p>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-feature-green font-medium">{currentXP} / {totalXP} XP</span>
            </div>
            <Progress value={(currentXP / totalXP) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Milestone Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-feature-green flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={`min-w-[100px] p-3 rounded-lg text-center transition-all duration-200 ${
                  milestone.unlocked 
                    ? 'bg-feature-green-light/20 ring-2 ring-feature-green/20' 
                    : 'bg-muted/50'
                }`}
              >
                <div className="mb-2 flex justify-center">
                  {getBadgeIcon(milestone.badge, milestone.unlocked)}
                </div>
                <p className="text-xs font-medium text-foreground">{milestone.title}</p>
                <p className="text-xs text-muted-foreground">{milestone.xp} XP</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Modules */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-feature-green">📚 Learning Modules</h3>
        {modules.map((module, index) => (
          <Collapsible 
            key={module.id}
            open={openModules.includes(module.id)}
            onOpenChange={() => toggleModule(module.id)}
          >
            <CollapsibleTrigger asChild>
              <Card className={`cursor-pointer hover:shadow-md transition-all duration-200 animate-scale-in ${
                module.completed ? 'border-feature-green/20 bg-feature-green-light/10' : ''
              }`} style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {module.completed ? (
                        <CheckCircle className="h-5 w-5 text-feature-green" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-muted-foreground rounded-full" />
                      )}
                      <div>
                        <CardTitle className="text-sm text-feature-green">{module.title}</CardTitle>
                        <p className="text-xs text-muted-foreground">{module.timeEstimate}</p>
                      </div>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-feature-green transition-transform ${
                      openModules.includes(module.id) ? 'rotate-180' : ''
                    }`} />
                  </div>
                </CardHeader>
              </Card>
            </CollapsibleTrigger>
            <CollapsibleContent className="animate-accordion-down">
              <Card className="border-t-0 rounded-t-none">
                <CardContent className="pt-0 space-y-4">
                  <p className="text-sm text-muted-foreground">{module.goal}</p>
                  
                  {/* Task Checklist */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Tasks</p>
                    <div className="space-y-2">
                      {module.tasks.map((task) => (
                        <div key={task.id} className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            task.completed 
                              ? 'bg-feature-green border-feature-green' 
                              : 'border-muted-foreground'
                          }`}>
                            {task.completed && <CheckCircle className="h-3 w-3 text-white" />}
                          </div>
                          <span className={`text-sm ${
                            task.completed ? 'text-muted-foreground line-through' : 'text-foreground'
                          }`}>
                            {task.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Resource Links */}
                  {module.resources.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Resources</p>
                      <div className="flex flex-wrap gap-2">
                        {module.resources.map((resource, i) => (
                          <Badge key={i} variant="outline" className="text-xs cursor-pointer hover:bg-feature-green/10">
                            {resource.title}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Module Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="bg-feature-green hover:bg-feature-green/90 text-white">
                      <Play className="h-4 w-4 mr-2" />
                      Start Module
                    </Button>
                    <Button variant="outline" size="sm" className="text-feature-green border-feature-green/20">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Notes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-4">
        <Button variant="outline" size="sm" className="text-feature-green border-feature-green/20 hover:bg-feature-green/10">
          <Play className="h-4 w-4 mr-2" />
          Start Module
        </Button>
        <Button variant="outline" size="sm" className="text-feature-green border-feature-green/20 hover:bg-feature-green/10">
          <CheckCircle className="h-4 w-4 mr-2" />
          Mark Complete
        </Button>
      </div>
    </div>
  );
};

export default DoLearnOutput;