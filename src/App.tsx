import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import IdkExplain from "./pages/IdkExplain";
import StudyPlanner from "./pages/StudyPlanner";
import SkillBuilder from "./pages/SkillBuilder";
import RecapMindMap from "./pages/RecapMindMap";
import QuizMode from "./pages/QuizMode";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/idk" element={<IdkExplain />} />
          <Route path="/exam-kind" element={<StudyPlanner />} />
          <Route path="/do-learn" element={<SkillBuilder />} />
          <Route path="/examtmro" element={<RecapMindMap />} />
          <Route path="/test-me" element={<QuizMode />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
