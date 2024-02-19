"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, RefreshCcwIcon } from "lucide-react";

import { ClickToReveal } from "~/app/oral/exercise/[seed]/_components/click-to-reveal";
import { randomRange } from "~/utils/random";
import { type Question } from "../_data";

export type QuizProps = {
  questions: Question[];
};

export const QuizPage = ({ questions }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [show, setShow] = useState(false);

  const updateCurrentQuestion = (newQuestion: number) => {
    setCurrentQuestion(newQuestion);
    setShow(false);
  };

  const emptyQuestions = useMemo(() => {
    return questions.filter((question) => question.content === "").length;
  }, [questions]);

  const answeredQuestions = useMemo(() => {
    return questions.filter((question) => question.content !== "").length;
  }, [questions]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <main className="flex min-h-full flex-col items-center justify-center bg-gray-50 px-6 py-8">
      <div className="container flex flex-1 flex-col bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <div className="-mt-4 mb-4 flex items-center justify-between">
          <div className="text-center font-bold tabular-nums">
            {currentQuestion + 1} / {questions.length} ({emptyQuestions} /{" "}
            {answeredQuestions})
          </div>
          <button
            onClick={() =>
              updateCurrentQuestion(randomRange(0, questions.length - 1))
            }
            className="inline-flex items-center justify-center gap-3 rounded-md bg-white p-4 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent">
            <span className="font-semibold leading-6">Casuale</span>
            <RefreshCcwIcon className="size-5" aria-hidden="true" />
          </button>{" "}
        </div>
        <div className="flex flex-1 grid-cols-2 flex-col gap-4 sm:grid">
          <div className="flex items-center justify-center">
            <span className="text-2xl font-bold">
              {questions[currentQuestion]!.question}
            </span>
          </div>
          <ClickToReveal show={show} setShow={setShow}>
            <p
              className="prose lg:prose-xl"
              dangerouslySetInnerHTML={{
                __html: questions[currentQuestion]!.content,
              }}
            />
          </ClickToReveal>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {currentQuestion === 0 ? (
            <span></span>
          ) : (
            <button
              onClick={() => updateCurrentQuestion(currentQuestion - 1)}
              className="flex w-full items-center justify-center gap-3 rounded-md bg-white p-4 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent">
              <ArrowLeftIcon className="size-5" aria-hidden="true" />
              <span className="font-semibold leading-6">Precedente</span>
            </button>
          )}
          {currentQuestion === questions.length - 1 ? (
            <span></span>
          ) : (
            <button
              onClick={() => updateCurrentQuestion(currentQuestion + 1)}
              className="flex w-full items-center justify-center gap-3 rounded-md bg-white p-4 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent">
              <span className="font-semibold leading-6">Prossima</span>
              <ArrowRightIcon className="size-5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </main>
  );
};
