import type { MemoryProblem, MemorySolution } from "../types";
import { solveFifo } from "./fifo";
import { solveLeastRecentlyUsed } from "./lru";
import { solveOptimal } from "./optimal";
import { solveSecondChance } from "./second-chance";

export const solveMemoryProblem = (problem: MemoryProblem): MemorySolution => {
  switch (problem.algorithm) {
    case "least-recently-used":
      return solveLeastRecentlyUsed(problem);
    case "optimal":
      return solveOptimal(problem);
    case "first-in-first-out":
      return solveFifo(problem);
    case "second-chance":
      return solveSecondChance(problem);
  }
};
