import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Clock, RefreshCw, Plus, Brain } from "lucide-react";

interface QuizQuestion {
  id: string;
  question: string;
  type: "mcq" | "short";
  options?: string[];
  correctAnswer: string;
  explanation: string;
  userAnswer?: string;
  isCorrect?: boolean;
}

interface TestMeOutputProps {
  quizTitle: string;
  questions: QuizQuestion[];
  timePerQuestion?: number;
  showTimer: boolean;
}

const TestMeOutput = ({ 
  quizTitle, 
  questions, 
  timePerQuestion = 60, 
  showTimer 
}: TestMeOutputProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [expandedExplanations, setExpandedExplanations] = useState<string[]>([]);

  // Timer effect
  useEffect(() => {
    if (showTimer && timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults) {
      // Auto-advance to next question when time runs out
      handleNextQuestion();
    }
  }, [timeLeft, showTimer, showResults]);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(timePerQuestion);
  }, [currentQuestion, timePerQuestion]);

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinishQuiz = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: questions.length, percentage: Math.round((correct / questions.length) * 100) };
  };

  const toggleExplanation = (questionId: string) => {
    setExpandedExplanations(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    setTimeLeft(timePerQuestion);
    setExpandedExplanations([]);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="animate-fade-in space-y-4">
        {/* Results Header */}
        <Card className="border-feature-orange/20 bg-gradient-to-br from-feature-orange-light/30 to-background">
          <CardHeader>
            <CardTitle className="text-feature-orange flex items-center gap-2">
              <div className="w-2 h-2 bg-feature-orange rounded-full animate-pulse"></div>
              Quiz Complete! 🎉
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-feature-orange mb-2 animate-scale-in">
                {score.percentage}%
              </div>
              <p className="text-muted-foreground">
                {score.correct} out of {score.total} correct
              </p>
              <Progress value={score.percentage} className="mt-4 h-3" />
            </div>
            
            <div className="text-center space-y-2">
              {score.percentage >= 80 && (
                <p className="text-sm text-feature-orange">🌟 Excellent work! You're mastering this topic!</p>
              )}
              {score.percentage >= 60 && score.percentage < 80 && (
                <p className="text-sm text-feature-orange">👍 Good job! A little more practice will perfect it!</p>
              )}
              {score.percentage < 60 && (
                <p className="text-sm text-feature-orange">💪 Keep going! Every expert was once a beginner!</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Review Answers */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-feature-orange">📝 Review Your Answers</h3>
          {questions.map((question, index) => {
            const userAnswer = userAnswers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;
            return (
              <Card key={question.id} className={`border-l-4 ${
                isCorrect ? 'border-l-green-500' : 'border-l-red-500'
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm text-foreground">
                      Question {index + 1}
                    </CardTitle>
                    <Badge variant={isCorrect ? "default" : "destructive"} className="text-xs">
                      {isCorrect ? "Correct" : "Incorrect"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{question.question}</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <p className="text-muted-foreground">Your answer: <span className={isCorrect ? "text-green-600" : "text-red-600"}>{userAnswer || "No answer"}</span></p>
                    {!isCorrect && (
                      <p className="text-muted-foreground">Correct answer: <span className="text-green-600">{question.correctAnswer}</span></p>
                    )}
                  </div>
                  
                  <Collapsible 
                    open={expandedExplanations.includes(question.id)}
                    onOpenChange={() => toggleExplanation(question.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-feature-orange p-0 h-auto">
                        <ChevronDown className={`h-4 w-4 mr-1 transition-transform ${
                          expandedExplanations.includes(question.id) ? 'rotate-180' : ''
                        }`} />
                        Show Explanation
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="animate-accordion-down">
                      <div className="mt-2 p-3 bg-feature-orange-light/10 rounded-lg">
                        <p className="text-sm text-muted-foreground">{question.explanation}</p>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetQuiz}
            className="text-feature-orange border-feature-orange/20 hover:bg-feature-orange/10"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry Quiz
          </Button>
          <Button variant="outline" size="sm" className="text-feature-orange border-feature-orange/20 hover:bg-feature-orange/10">
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
          <Button variant="outline" size="sm" className="col-span-2 text-feature-orange border-feature-orange/20 hover:bg-feature-orange/10">
            <Brain className="h-4 w-4 mr-2" />
            Send Wrong Answers to IDK
          </Button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  
  return (
    <div className="animate-fade-in space-y-4">
      {/* Quiz Header */}
      <Card className="border-feature-orange/20 bg-gradient-to-br from-feature-orange-light/30 to-background">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-feature-orange flex items-center gap-2">
              <div className="w-2 h-2 bg-feature-orange rounded-full animate-pulse"></div>
              {quizTitle}
            </CardTitle>
            {showTimer && (
              <div className="flex items-center gap-2 text-feature-orange">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-mono">{timeLeft}s</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
        </CardContent>
      </Card>

      {/* Current Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-foreground">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {question.type === "mcq" ? (
            <div className="space-y-2">
              {question.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(question.id, option)}
                  className={`w-full p-3 text-left rounded-lg border transition-all duration-200 ${
                    userAnswers[question.id] === option
                      ? 'border-feature-orange bg-feature-orange/10 text-feature-orange'
                      : 'border-border hover:border-feature-orange/50 hover:bg-feature-orange/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      userAnswers[question.id] === option
                        ? 'border-feature-orange bg-feature-orange'
                        : 'border-muted-foreground'
                    }`}>
                      {userAnswers[question.id] === option && (
                        <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                      )}
                    </div>
                    <span className="text-sm">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <Input
                placeholder="Type your answer here..."
                value={userAnswers[question.id] || ""}
                onChange={(e) => handleAnswerSelect(question.id, e.target.value)}
                className="border-feature-orange/20 focus:border-feature-orange"
              />
              <Button 
                variant="outline" 
                size="sm"
                className="text-feature-orange border-feature-orange/20 hover:bg-feature-orange/10"
              >
                Show Answer
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevQuestion}
          disabled={currentQuestion === 0}
          className="text-feature-orange border-feature-orange/20 hover:bg-feature-orange/10"
        >
          Previous
        </Button>
        
        <div className="flex gap-2">
          {currentQuestion < questions.length - 1 ? (
            <Button
              size="sm"
              onClick={handleNextQuestion}
              disabled={!userAnswers[question.id]}
              className="bg-feature-orange hover:bg-feature-orange/90 text-white"
            >
              Next
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={handleFinishQuiz}
              disabled={!userAnswers[question.id]}
              className="bg-feature-orange hover:bg-feature-orange/90 text-white"
            >
              Finish Quiz
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestMeOutput;