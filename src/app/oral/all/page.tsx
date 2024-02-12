import orale from "~/data/orale.json";

export default async function OraleCompleto() {
  return (
    <main>
      <div className="mx-auto max-w-4xl">
        <ol className="list-inside list-decimal">
          {orale.map((question, questionIdx) => (
            <li key={questionIdx} className="mt-4">
              <span className="font-semibold text-gray-900">
                {question.question}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
