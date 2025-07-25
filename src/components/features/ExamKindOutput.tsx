import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, Download, Bell, BookOpen, Calendar } from "lucide-react";

interface StudyDay {
  date: string;
  subjects: string[];
  topics: string[];
  timeBlocks: string[];
  priority: "High" | "Medium" | "Low";
  focus: string;
  tip: string;
}

interface ExamKindOutputProps {
  planSummary: string;
  studyDays: StudyDay[];
  weekDates: string[];
}

const ExamKindOutput = ({ planSummary, studyDays, weekDates }: ExamKindOutputProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-700 border-red-200";
      case "Medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Low": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="animate-fade-in space-y-4">
      {/* Plan Summary Card */}
      <Card className="border-feature-indigo/20 bg-gradient-to-br from-feature-indigo-light/30 to-background">
        <CardHeader>
          <CardTitle className="text-feature-indigo flex items-center gap-2">
            <div className="w-2 h-2 bg-feature-indigo rounded-full animate-pulse"></div>
            Your Study Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">{planSummary}</p>
        </CardContent>
      </Card>

      {/* Weekly Calendar Scroller */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-feature-indigo flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full">
            <div className="flex gap-2 pb-2">
              {weekDates.map((date, index) => (
                <div 
                  key={index}
                  className="min-w-[80px] p-3 bg-feature-indigo-light/20 rounded-lg text-center"
                >
                  <div className="text-xs text-muted-foreground mb-1">
                    {new Date(date).toLocaleDateString('en', { weekday: 'short' })}
                  </div>
                  <div className="text-sm font-medium text-feature-indigo">
                    {new Date(date).getDate()}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Day-wise Plan */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-feature-indigo">📅 Day-wise Plan</h3>
        {studyDays.map((day, index) => (
          <Card 
            key={index} 
            className="animate-scale-in border-feature-indigo/10 hover:shadow-md transition-all duration-200"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-feature-indigo">{day.date}</CardTitle>
                <Badge variant="outline" className={`text-xs ${getPriorityColor(day.priority)}`}>
                  {day.priority}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Subjects</p>
                  <div className="flex flex-wrap gap-1">
                    {day.subjects.map((subject, i) => (
                      <Badge key={i} variant="secondary" className="text-xs bg-feature-indigo/10 text-feature-indigo">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Time Blocks</p>
                  <div className="flex flex-wrap gap-1">
                    {day.timeBlocks.map((block, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {block}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground mb-1">Topics</p>
                <p className="text-sm text-foreground">{day.topics.join(", ")}</p>
              </div>
              
              <div className="bg-feature-indigo-light/10 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">💡 {day.focus}</p>
                <p className="text-sm text-muted-foreground">{day.tip}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-4">
        <Button variant="outline" size="sm" className="text-feature-indigo border-feature-indigo/20 hover:bg-feature-indigo/10">
          <Edit className="h-4 w-4 mr-2" />
          Edit Plan
        </Button>
        <Button variant="outline" size="sm" className="text-feature-indigo border-feature-indigo/20 hover:bg-feature-indigo/10">
          <Download className="h-4 w-4 mr-2" />
          Export Plan
        </Button>
        <Button variant="outline" size="sm" className="text-feature-indigo border-feature-indigo/20 hover:bg-feature-indigo/10">
          <Bell className="h-4 w-4 mr-2" />
          Set Reminders
        </Button>
        <Button variant="outline" size="sm" className="text-feature-indigo border-feature-indigo/20 hover:bg-feature-indigo/10">
          <BookOpen className="h-4 w-4 mr-2" />
          Link to ExamTmro
        </Button>
      </div>
    </div>
  );
};

export default ExamKindOutput;