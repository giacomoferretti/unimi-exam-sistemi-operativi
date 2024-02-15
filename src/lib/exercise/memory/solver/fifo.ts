import type {
  MemoryExerciseSolver,
  MemoryProblem,
  MemorySolution,
} from "../types";

export const solveFifo: MemoryExerciseSolver = (problem) => {
  const solution: MemorySolution["frames"] = [];

  const frames: Array<MemoryProblem["requests"][number]> = [];
  const pageFaults = new Array<MemorySolution["faults"][number]>(
    problem.requests.length,
  ).fill(false);

  problem.requests.forEach((request, i) => {
    // Skip if the request is already in the frames
    if (frames.includes(request)) {
      solution.push([...frames]);
      return;
    }

    // Add the request to the frames
    frames.push(request);

    // Remove the first request if the frames are full
    if (frames.length > problem.memorySize) {
      frames.shift();
    }

    // Mark the page fault
    pageFaults[i] = true;

    // Add the current frames to the solution
    solution.push([...frames]);
  });

  return {
    frames: solution,
    faults: pageFaults,
  };
};
