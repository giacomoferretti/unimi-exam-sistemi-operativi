import type filtro from "~/data/filtro.json";
import { type FilterQuestion } from "~/data/types";

export const extractFilterQuestions = (
  questions: typeof filtro,
  length = 20,
  allowDuplicates = false,
  randomFunction = Math.random,
) => {
  const result: Array<FilterQuestion> = [];
  const indexes = new Set<number>();

  while (indexes.size < length) {
    const index = Math.floor(randomFunction() * questions.length);

    if (allowDuplicates || !indexes.has(index)) {
      const question = questions[index];

      if (question) {
        indexes.add(index);
        result.push(question);
      }
    }
  }

  return result;
};
