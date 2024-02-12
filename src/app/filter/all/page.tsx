import filtro from "~/data/filtro.json";

export default async function FiltroCompleto() {
  return (
    <main>
      <div className="mx-auto max-w-4xl">
        <ol className="list-inside list-decimal">
          {filtro.map((question, questionIdx) => (
            <li key={questionIdx} className="mt-4">
              <span className="font-semibold text-gray-900">
                {question.question}
              </span>
              <ol className="list-inside list-[upper-alpha] ps-5 text-gray-900">
                {question.answers.map((answer) => (
                  <li
                    key={answer.text}
                    className={answer.correct ? "text-green-600" : ""}>
                    {answer.text}
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
