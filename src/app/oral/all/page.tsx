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
              <span className="ml-2 space-x-2">
                {question.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                    {tag}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
