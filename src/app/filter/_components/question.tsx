"use client";

import { useState } from "react";

import { type FilterQuestion } from "~/data/types";
import { cn } from "~/utils";

export type QuestionProps = {
  question: FilterQuestion;
};

export const Question = ({ question }: QuestionProps) => {
  const [selected, setSelected] = useState<number | null>(null);

  // const answers = useMemo(async () => {
  //   return question.answers.map(async (answer) => {
  //     const hash = await xxhash3(answer.text);

  //     return {
  //       text: answer.text,
  //       correct: answer.correct,
  //       hash: hash,
  //     };
  //   });
  // }, [question.answers]);

  return (
    <>
      <span className="font-semibold text-gray-900">{question.question}</span>
      <ol className="list-inside list-[upper-alpha] ps-5 text-gray-900">
        {question.answers.map((answer, index) => (
          <li
            key={answer.text}
            onClick={() => setSelected(index)}
            className={cn("cursor-pointer hover:underline", {
              "text-green-600": selected !== null && answer.correct,
              "text-red-600": selected === index && !answer.correct,
            })}>
            {answer.text}
          </li>
        ))}
      </ol>
    </>
  );
};
