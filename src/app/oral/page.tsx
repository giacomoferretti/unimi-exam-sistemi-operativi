import { unstable_noStore as noStore } from "next/cache";

import orale from "~/data/orale.json";
import { Card } from "../_components/card";
import { ReloadPageButton } from "../_components/reload-page-button";

export default async function Orale() {
  noStore();
  const randomQuestion = orale[Math.floor(Math.random() * orale.length)]!;

  return (
    <main className="flex min-h-full flex-col items-center justify-center">
      <Card>
        <div className="w-full">
          <h1 className="text-center text-2xl font-bold">
            {randomQuestion.question}
          </h1>
          <div className="mt-8 flex items-center justify-center gap-4">
            {randomQuestion.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Card>

      <ReloadPageButton />
    </main>
  );
}
