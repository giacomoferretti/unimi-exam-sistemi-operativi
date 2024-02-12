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
        <h1 className="text-center text-2xl font-bold">
          {randomQuestion.question}
        </h1>
      </Card>

      <ReloadPageButton />
    </main>
  );
}
