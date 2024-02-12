export type FilterAnswer = {
  text: string;
  correct: boolean;
};

export type FilterQuestion = {
  question: string;
  answers: Array<FilterAnswer>;
};

export type OralQuestion = {
  question: string;
  answer: string;
  tags: Array<string>;
};
