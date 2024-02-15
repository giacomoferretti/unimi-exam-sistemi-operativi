import { xxhash128 } from "hash-wasm";

import { fromHexString } from "~/utils/bytes";
import { randomChoice, randomRange, sfc32 } from "~/utils/random";
import type { MemoryExerciseAlgorithm, MemoryProblem } from "./types";
import { solveMemoryProblem } from "./solver";

const MIN_FRAME_SIZE = 3;
const MAX_FRAME_SIZE = 5;

const MIN_FRAME_VALUE = 1;
const MAX_FRAME_VALUE = 7;

const NUMBER_OF_REQUESTS = 16;

const ALGORITHMS = [
  "least-recently-used",
  "optimal",
  "first-in-first-out",
  "second-chance",
] as const;

export const AlgorithmDisplayName: Record<MemoryExerciseAlgorithm, string> = {
  "first-in-first-out": "First In First Out",
  "least-recently-used": "Least Recently Used",
  // "optimal": "Optimal",
  // "second-chance": "Second Chance",

  "optimal": "Ottimale",
  "second-chance": "Seconda Chance",
} as const;

export const generateMemoryExercise = async (seed: string) => {
  const hash = await xxhash128(seed);
  const data = fromHexString(hash);
  const dataview = new DataView(data.buffer);

  const seededRandom = sfc32(
    dataview.getInt32(0),
    dataview.getInt32(4),
    dataview.getInt32(8),
    dataview.getInt32(12),
  );

  const algorithm = randomChoice(ALGORITHMS, seededRandom);
  const memorySize = randomRange(MIN_FRAME_SIZE, MAX_FRAME_SIZE, seededRandom);
  const requests = new Array(NUMBER_OF_REQUESTS).fill(0).map(() => {
    return randomRange(MIN_FRAME_VALUE, MAX_FRAME_VALUE, seededRandom);
  });

  // Solve the exercise to get the solution
  const problem: MemoryProblem = {
    algorithm,
    memorySize,
    requests,
  };
  const solution = solveMemoryProblem(problem);

  return {
    problem,
    solution,
  };
};
