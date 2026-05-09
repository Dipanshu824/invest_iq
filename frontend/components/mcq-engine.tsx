"use client";

import { CheckCircle2, Circle, Trophy } from "lucide-react";
import { useMemo, useState } from "react";
//import { QuizQuestion } from "@/types/stock";

export function McqEngine({ questions }: { questions: any[] }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const score = useMemo(
    () => questions.reduce((total, question) => total + (answers[question.id] === question.correctIndex ? 1 : 0), 0),
    [answers, questions]
  );
  const progress = Math.round((Object.keys(answers).length / questions.length) * 100);
  const financeIq = 620 + score * 45 + progress;

  return (
    <section className="glass rounded-2xl p-5">
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-slate-400">MCQ learning engine</p>
          <h2 className="text-xl font-semibold">Build your finance IQ</h2>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-mintIQ/20 bg-mintIQ/10 px-3 py-2 text-sm text-mintIQ">
          <Trophy className="h-4 w-4" />
          IQ {financeIq}
        </div>
      </div>
      <div className="mb-6 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-mintIQ transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="space-y-5">
        {questions.map((question, questionIndex) => {
          const selected = answers[question.id];
          return (
            <article key={question.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="mb-4 font-medium">{questionIndex + 1}. {question.question}</p>
              <div className="grid gap-2">
                {question.options.map((option, index) => {
                  const isSelected = selected === index;
                  const isCorrect = selected !== undefined && question.correctIndex === index;
                  return (
                    <button
                      key={option}
                      onClick={() => setAnswers((current) => ({ ...current, [question.id]: index }))}
                      className={`flex items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm transition ${
                        isCorrect
                          ? "border-mintIQ/50 bg-mintIQ/10"
                          : isSelected
                            ? "border-dangerIQ/50 bg-dangerIQ/10"
                            : "border-white/10 bg-slate-950/30 hover:border-cyanIQ/40"
                      }`}
                    >
                      {isCorrect ? <CheckCircle2 className="h-4 w-4 text-mintIQ" /> : <Circle className="h-4 w-4 text-slate-500" />}
                      {option}
                    </button>
                  );
                })}
              </div>
              {selected !== undefined ? <p className="mt-4 text-sm leading-6 text-slate-400">{question.explanation}</p> : null}
            </article>
          );
        })}
      </div>
      <p className="mt-5 text-sm text-slate-400">Score: {score}/{questions.length}</p>
    </section>
  );
}
