import { promises as fs } from "fs";

import rehypeMathjax from "rehype-mathjax";
import rehypeStringify from "rehype-stringify";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const headingRegex = /^##\s*(.+)$/m;

export const loadData = async () => {
  const markdownContent = await fs.readFile(
    process.cwd() + "/src/app/oral/all/quiz/_data/data.md",
    "utf8",
  );

  // Array to store the questions and their content
  const questions: Array<Question> = [];

  const split = markdownContent.split(headingRegex);
  split.shift();

  for (let i = 0; i < split.length; i += 2) {
    questions.push({
      question: split[i]!.trim(),
      content: (
        await unified()
          .use(remarkParse)
          .use(remarkMath)
          .use(remarkRehype)
          .use(rehypeMathjax)
          .use(rehypeStringify)
          .process(split[i + 1]!.trim())
      ).toString(),
    });
  }

  return questions;
};

export type Question = {
  question: string;
  content: string;
};
