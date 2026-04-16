import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export interface TourStep {
  targetId: string;
  title: string;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  page?: string; // Route the tour should navigate to before showing this step
}

interface TourContextType {
  isActive: boolean;
  currentStepIndex: number;
  steps: TourStep[];
  startTour: (steps: TourStep[]) => void;
  endTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  isFirstTime: boolean;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export const TourProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState<TourStep[]>([]);
  const [isFirstTime, setIsFirstTime] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("pymaster_tour_seen");
    if (!hasSeenTour) {
      setIsFirstTime(true);
    }
  }, []);

  /** Navigate to a page if the step requires it (and we're not already there). */
  const maybeNavigate = useCallback(
    (step: TourStep) => {
      if (step?.page && step.page !== location.pathname) {
        navigate(step.page);
      }
    },
    [navigate, location.pathname]
  );

  const startTour = useCallback(
    (newSteps: TourStep[]) => {
      setSteps(newSteps);
      setCurrentStepIndex(0);
      setIsActive(true);
      localStorage.setItem("pymaster_tour_seen", "true");
      // Navigate to the first step's page if needed
      if (newSteps[0]?.page && newSteps[0].page !== location.pathname) {
        navigate(newSteps[0].page);
      }
    },
    [navigate, location.pathname]
  );

  const endTour = useCallback(() => {
    setIsActive(false);
    setCurrentStepIndex(0);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      const newIndex = currentStepIndex + 1;
      maybeNavigate(steps[newIndex]);
      setCurrentStepIndex(newIndex);
    } else {
      endTour();
    }
  }, [currentStepIndex, steps, maybeNavigate, endTour]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      const newIndex = currentStepIndex - 1;
      maybeNavigate(steps[newIndex]);
      setCurrentStepIndex(newIndex);
    }
  }, [currentStepIndex, steps, maybeNavigate]);

  return (
    <TourContext.Provider
      value={{
        isActive,
        currentStepIndex,
        steps,
        startTour,
        endTour,
        nextStep,
        prevStep,
        isFirstTime,
      }}
    >
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return context;
};
