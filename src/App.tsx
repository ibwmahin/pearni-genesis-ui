
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
