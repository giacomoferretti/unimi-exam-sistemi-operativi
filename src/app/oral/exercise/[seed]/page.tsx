import { RandomSeedButton } from "~/app/filter/_components/random-button";
import {
  AlgorithmDisplayName,
  generateMemoryExercise,
} from "~/lib/exercise/memory";
import { ClickToReveal } from "./_components/click-to-reveal";

const transposeRowsToColumns = (rows: number[][]) => {
  if (rows.length === 0) return [];

  return rows[0]!.map((_, i) => rows.map((row) => row[i]!));
};

const invertOrder = (array: number[][]) => {
  return array.map((row) => row.reverse());
};

const pushUpZeroes = (array: number[][]) => {
  return array.map((row) => {
    const zeroes = row.filter((value) => value === 0);
    const nonZeroes = row.filter((value) => value !== 0);
    return [...zeroes, ...nonZeroes];
  });
};

const normalizeArray = (array: number[][]) => {
  const maxRowLength = Math.max(...array.map((row) => row.length));
  return array.map((row) => {
    const rowLength = row.length;
    if (rowLength < maxRowLength) {
      return [...row, ...new Array<number>(maxRowLength - rowLength).fill(0)];
    }
    return row;
  });
};

export default async function Exercise({
  params,
}: {
  params: { seed: string };
}) {
  const exercise = await generateMemoryExercise(params.seed);

  return (
    <>
      <div className="size-0">&nbsp;</div> {/* Hack to fix the sticky header */}
      <div className="mx-auto mt-16 max-w-2xl rounded-md border p-8 shadow">
        <div className="relative">
          <div className="absolute right-0 top-0">
            <RandomSeedButton url="/oral/exercise/" />
          </div>

          <h1 className="mb-2 text-center text-2xl font-bold">
            Memory Manager
          </h1>
          <h2 className="text-center ">
            Algoritmo:{" "}
            <span className="font-semibold">
              {AlgorithmDisplayName[exercise.problem.algorithm]}
            </span>
          </h2>
          <h3 className="text-center ">
            Numero di frame:{" "}
            <span className="font-semibold">{exercise.problem.memorySize}</span>
          </h3>
        </div>
        <hr className="my-4" />
        <table className="w-full table-fixed  border">
          <tbody>
            <tr>
              {exercise.problem.requests.map((request, index) => {
                return (
                  <td
                    key={index}
                    className="rounded-xl border p-1 text-center font-mono leading-8">
                    {request}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
        <br />
        <ClickToReveal>
          <table className="w-full table-fixed">
            <tbody>
              {transposeRowsToColumns(
                pushUpZeroes(
                  normalizeArray(invertOrder(exercise.solution.frames)),
                ),
              ).map((frame, index) => {
                return (
                  <tr key={index}>
                    {frame.map((request, index) => {
                      return (
                        <td
                          key={index}
                          className="border p-1 text-center font-mono leading-8">
                          {request === 0 ? "" : request}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br />
          <table className="w-full table-fixed">
            <tbody>
              <tr>
                {exercise.solution.faults.map((fault, index) => {
                  return (
                    <td
                      key={index}
                      className="border p-1 text-center font-mono leading-8">
                      {fault ? "F" : ""}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>

          <p className="mt-4 text-center">
            {exercise.solution.faults.filter((fault) => fault).length} page
            fault
          </p>
        </ClickToReveal>

        <div className="pt-4 text-right text-sm opacity-40">{params.seed}</div>
      </div>
    </>
  );
}
