import React from "react";
import { cn } from "@/lib/utils";
import { PythonQuizQuestion } from "@/data/pythonQuizQuestions";

interface QuizQuestionMapProps {
  questions: PythonQuizQuestion[];
  answers: Record<number, string>;
  currentIdx: number;
  onSelect: (idx: number) => void;
  mode: "all" | "tricky";
}

export function QuizQuestionMap({ 
  questions, 
  answers, 
  currentIdx, 
  onSelect,
  mode 
}: QuizQuestionMapProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Question Map</h3>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          {mode === "tricky" ? "Tricky Mode" : "All Questions"}
        </span>
      </div>
      <div className="grid grid-cols-10 gap-1.5 sm:grid-cols-12 md:grid-cols-10 lg:grid-cols-8">
        {questions.map((q, idx) => {
          const isAnswered = answers[q.id] !== undefined;
          const isCorrect = isAnswered && answers[q.id] === q.answer;
          const isCurrent = currentIdx === idx;
          
          return (
            <button
              key={q.id}
              onClick={() => onSelect(idx)}
              title={`Question ${q.id}`}
              className={cn(
                "h-6 w-6 rounded-md text-[10px] font-medium transition-all hover:scale-110",
                isCurrent 
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background" 
                  : "hover:bg-accent",
                isAnswered
                  ? isCorrect
                    ? "bg-green-500/20 text-green-600 border border-green-500/30"
                    : "bg-red-500/20 text-red-600 border border-red-500/30"
                  : "bg-muted text-muted-foreground border border-transparent"
              )}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-[10px] text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-muted" /> Pending
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-green-500/40" /> Correct
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-red-500/40" /> Wrong
        </div>
      </div>
    </div>
  );
}
