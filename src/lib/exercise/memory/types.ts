export type MemorySolution = {
  frames: number[][];
  faults: boolean[];
};

export type MemoryProblem = {
  algorithm: MemoryExerciseAlgorithm;
  memorySize: number;
  requests: number[];
};

export type MemoryExercise = {
  problem: MemoryProblem;
  solution: MemorySolution;
};

export type MemoryExerciseAlgorithm =
  | "least-recently-used"
  | "optimal"
  | "first-in-first-out"
  | "second-chance";

export type MemoryExerciseSolver = (problem: MemoryProblem) => MemorySolution;
