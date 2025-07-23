import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, ImageIcon, FileText, Camera, User, Sparkles, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import FeatureSwitchSheet from "@/components/FeatureSwitchSheet";
import FeatureOutput from "@/components/FeatureOutput";
import IdkOutput from "@/components/features/IdkOutput";

interface Message {
  text: string;
  isUser: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'm your AI learning assistant. Ask me anything or choose a feature below to get started!",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showFeatureSwitch, setShowFeatureSwitch] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [currentFeature, setCurrentFeature] = useState<string | null>(null);
  const [featureResult, setFeatureResult] = useState<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // If IDK feature is active, show output directly
    if (activeFeature === "idk") {
      setCurrentFeature("idk");
      setFeatureResult({
        explanation: `Here's a kid-friendly explanation for: "${input}"\n\nThis is a demonstration of how the IDK feature would work. The AI would provide a detailed explanation based on your question.`,
        realWorldExample: "This is where a real-world example would appear to help you understand the concept better.",
        recapQuestions: [
          "What was the main topic you asked about?",
          "Can you think of a similar example in your daily life?",
          "How might this apply to your studies?"
        ],
        olderStudentContent: "For advanced learners: This section would contain more detailed, technical explanations and additional context."
      });
    } else {
      // Simulate AI response
      setTimeout(() => {
        const aiMessage = { 
          text: "I understand you're asking about: " + input + ". Let me help you with that! You can also try our specialized features like IDK for detailed explanations, or use the feature switch to explore other tools.", 
          isUser: false 
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1000);
    }
    
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFeatureSelect = (feature: string) => {
    setActiveFeature(feature);
    // Add visual feedback that feature is selected
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex-1 min-h-0 flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-3 max-w-4xl mx-auto",
                message.isUser ? "justify-end" : "justify-start"
              )}
            >
              {!message.isUser && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
              )}
              <div
                className={cn(
                  "px-4 py-3 rounded-2xl max-w-[80%] whitespace-pre-wrap",
                  message.isUser
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "bg-muted"
                )}
              >
                {message.text}
              </div>
              {message.isUser && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 max-w-4xl mx-auto">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              </div>
              <div className="bg-muted px-4 py-3 rounded-2xl">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Feature Output Display */}
        {currentFeature && featureResult && (
          <FeatureOutput 
            isVisible={true}
            onClose={() => {
              setCurrentFeature(null);
              setFeatureResult(null);
            }}
            accentColor="feature-teal"
          >
            <IdkOutput
              explanation={featureResult.explanation}
              realWorldExample={featureResult.realWorldExample}
              recapQuestions={featureResult.recapQuestions}
              olderStudentContent={featureResult.olderStudentContent}
            />
          </FeatureOutput>
        )}

        {/* Input Area */}
        <div className="p-4 border-t bg-background/95 backdrop-blur">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="flex-1 relative">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="resize-none min-h-[44px] max-h-32 pr-12"
                  rows={1}
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setShowAttachments(!showAttachments)}
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="h-auto"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            
            {showAttachments && (
              <div className="mt-3 p-3 border rounded-lg bg-muted/50">
                <div className="flex gap-2 mb-2">
                  <Button variant="outline" size="sm">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Image
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Document
                  </Button>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Camera
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Upload images, PDFs, or take a photo for analysis
                </p>
              </div>
            )}

            {/* Feature Selection */}
            <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
              <Button
                variant={activeFeature === "idk" ? "default" : "outline"}
                size="sm"
                onClick={() => handleFeatureSelect("idk")}
                className="flex-shrink-0"
              >
                🧠 IDK
              </Button>
              <Button
                variant={activeFeature === "exam-kind" ? "default" : "outline"}
                size="sm"
                onClick={() => handleFeatureSelect("exam-kind")}
                className="flex-shrink-0"
              >
                📘 Exam-Kind
              </Button>
              <Button
                variant={activeFeature === "do-learn" ? "default" : "outline"}
                size="sm"
                onClick={() => handleFeatureSelect("do-learn")}
                className="flex-shrink-0"
              >
                🚀 Do-Learn
              </Button>
              <Button
                variant={activeFeature === "examtmro" ? "default" : "outline"}
                size="sm"
                onClick={() => handleFeatureSelect("examtmro")}
                className="flex-shrink-0"
              >
                📅 ExamTmro
              </Button>
              <Button
                variant={activeFeature === "test-me" ? "default" : "outline"}
                size="sm"
                onClick={() => handleFeatureSelect("test-me")}
                className="flex-shrink-0"
              >
                🧪 Test Me
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Feature Switch FAB */}
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-40"
        onClick={() => setShowFeatureSwitch(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <FeatureSwitchSheet 
        open={showFeatureSwitch} 
        onOpenChange={setShowFeatureSwitch}
      />
    </div>
  );
};

export default Index;