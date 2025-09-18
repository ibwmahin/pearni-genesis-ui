import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NasaChat from "./pages/NasaChat";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import MissionPlanner from "./pages/MissionPlanner";
import BlogPost1 from "./pages/BlogPost1";
import BlogPost2 from "./pages/BlogPost2";
import BlogPost3 from "./pages/BlogPost3";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/nasa-chat" element={<NasaChat />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mission-planner" element={<MissionPlanner />} />
          <Route path="/blog/future-of-agi" element={<BlogPost1 />} />
          <Route path="/blog/ethical-ai" element={<BlogPost2 />} />
          <Route
            path="/blog/scientific-breakthroughs"
            element={<BlogPost3 />}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
