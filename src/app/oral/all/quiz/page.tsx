// import { ClickToReveal } from "../../exercise/[seed]/_components/click-to-reveal";
import { QuizPage } from "./_components/quiz";
import { loadData } from "./_data";

export default async function OraleCompletoQuiz() {
  // Simulate slow loading
  // await new Promise((resolve) => setTimeout(resolve, 100000));

  const questions = await loadData();

  return <QuizPage questions={questions} />;
}
