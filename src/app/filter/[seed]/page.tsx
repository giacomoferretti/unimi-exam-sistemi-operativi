import { xxhash128 } from "hash-wasm";

import filtro from "~/data/filtro.json";
// import { RenderingInfo } from "~/ui/rendering-info";
import { fromHexString } from "~/utils/bytes";
import { extractFilterQuestions } from "~/utils/extraction";
import { sfc32 } from "~/utils/random";
import { Question } from "../_components/question";
import { RandomSeedButton } from "../_components/random-button";
import { Timer } from "../_components/timer";

const randomFunction = async (seed: string) => {
  const hash = await xxhash128(seed);
  const data = fromHexString(hash);
  const dataview = new DataView(data.buffer);

  return sfc32(
    dataview.getInt32(0),
    dataview.getInt32(4),
    dataview.getInt32(8),
    dataview.getInt32(12),
  );
};

export default async function Filter({ params }: { params: { seed: string } }) {
  const random = await randomFunction(params.seed);

  const questions = extractFilterQuestions(filtro, 20, false, random);

  const truncatedSeed =
    params.seed.length > 12 ? params.seed.slice(0, 12) + "…" : params.seed;

  return (
    <div className="bg-gray-50">
      <header className="sticky top-0 mx-auto flex max-w-2xl items-center justify-between rounded-b-md border border-t-0 bg-white p-4 shadow-sm">
        <Timer />
        <span>{truncatedSeed}</span>
        <RandomSeedButton />
      </header>

      <main className="min-h-full">
        <div className="mx-auto max-w-2xl">
          <ol className="list-inside list-decimal space-y-4 py-4">
            {questions.map((question, index) => (
              <li
                key={index}
                className="rounded-md border bg-white p-4 shadow-sm">
                <Question question={question} />
              </li>
            ))}
          </ol>
        </div>
      </main>

      {/* <div className="fixed bottom-0 right-0 max-w-sm p-4">
        <RenderingInfo type="ssr" />
      </div> */}
    </div>
  );
}
