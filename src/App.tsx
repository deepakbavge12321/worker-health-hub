
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import SESIDashboard from "./pages/SESIDashboard";
import HealthRecords from "./pages/HealthRecords";
import Teleconsultation from "./pages/Teleconsultation";
import Insurance from "./pages/Insurance";
import Settings from "./pages/Settings";
import DoctorConsultation from "./pages/DoctorConsultation";
import NotFound from "./pages/NotFound";

// Context for user state
import { UserProvider } from "./contexts/UserContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/employer-dashboard" element={<EmployerDashboard />} />
            <Route path="/sesi-dashboard" element={<SESIDashboard />} />
            <Route path="/health-records" element={<HealthRecords />} />
            <Route path="/teleconsultation" element={<Teleconsultation />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/doctor/consultation/:patientId?" element={<DoctorConsultation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
