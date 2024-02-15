import type {
  MemoryExerciseSolver,
  MemoryProblem,
  MemorySolution,
} from "../types";

export const solveLeastRecentlyUsed: MemoryExerciseSolver = (problem) => {
  const solution: MemorySolution["frames"] = [];

  const frames: Array<MemoryProblem["requests"][number]> = [];
  const pageFaults = new Array<MemorySolution["faults"][number]>(
    problem.requests.length,
  ).fill(false);

  problem.requests.forEach((request, i) => {
    // Move the request to the end of the frames if it is already in the frames
    if (frames.includes(request)) {
      frames.splice(frames.indexOf(request), 1);
      frames.push(request);
      solution.push([...frames]);
      return;
    }

    // Add the request to the frames if there is space
    if (frames.length < problem.memorySize) {
      frames.push(request);
      pageFaults[i] = true;
      solution.push([...frames]);
      return;
    }

    frames.shift();
    frames.push(request);
    pageFaults[i] = true;
    solution.push([...frames]);
  });

  return {
    frames: solution,
    faults: pageFaults,
  };
};
