"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { useUIStore } from "@/lib/store";

const STEPS = [
  {
    title: "Welcome to NexusHub! 🚀",
    description: "Your all-in-one developer & creator ecosystem dashboard. Let us show you around.",
    target: null,
  },
  {
    title: "Command Palette",
    description: "Press ⌘K (Ctrl+K) anytime to search projects, tasks, navigate pages, or toggle dark mode — all from your keyboard.",
    target: "search",
  },
  {
    title: "Sidebar Navigation",
    description: "Navigate between Dashboard, Projects, Tasks, Community, and Settings. Click the collapse button to maximize your workspace.",
    target: "sidebar",
  },
  {
    title: "Kanban Board",
    description: "Drag and drop tasks between columns. Edit, delete, or add new tasks inline. Use priorities to keep work organized.",
    target: "kanban",
  },
  {
    title: "You're all set! ✨",
    description: "Explore the dashboard, create projects, manage tasks, and connect with the community. Press ? anytime to see keyboard shortcuts.",
    target: null,
  },
];

const STORAGE_KEY = "nexushub-onboarding-done";

export function OnboardingTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const done = localStorage.getItem(STORAGE_KEY);
    if (!done) {
      const t = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  const handleSkip = () => {
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            onClick={handleSkip}
          />

          {/* Tour Card */}
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-[71] w-[380px] rounded-2xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 shadow-2xl overflow-hidden"
          >
            {/* Progress bar */}
            <div className="h-1 bg-surface-100 dark:bg-surface-800">
              <motion.div
                animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-nexus-600"
              />
            </div>

            <div className="p-6">
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-surface-400 font-medium">Step {step + 1} of {STEPS.length}</span>
                <button
                  onClick={handleSkip}
                  className="text-xs text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors"
                >
                  Skip tour
                </button>
              </div>

              {/* Content */}
              <div className="flex items-start gap-3 mb-6">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-nexus-600/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-nexus-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-1">
                    {STEPS[step].title}
                  </h3>
                  <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
                    {STEPS[step].description}
                  </p>
                </div>
              </div>

              {/* Step dots */}
              <div className="flex items-center gap-1.5 mb-5">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === step ? "w-6 bg-nexus-600" : i < step ? "w-1.5 bg-nexus-400" : "w-1.5 bg-surface-300 dark:bg-surface-600"
                    }`}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <button
                  onClick={step > 0 ? () => setStep(step - 1) : handleSkip}
                  className="text-sm text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 transition-colors"
                >
                  {step > 0 ? "Back" : "Skip"}
                </button>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 rounded-xl bg-nexus-600 hover:bg-nexus-700 text-white font-semibold py-2.5 px-4 text-sm transition-all hover:shadow-lg hover:shadow-nexus-600/25"
                >
                  {step === STEPS.length - 1 ? "Get Started" : "Next"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
