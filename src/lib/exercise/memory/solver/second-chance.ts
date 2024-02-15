import type {
  MemoryExerciseSolver,
  MemoryProblem,
  MemorySolution,
} from "../types";

export const solveSecondChance: MemoryExerciseSolver = (problem) => {
  const solution: MemorySolution["frames"] = [];

  const frames: Array<MemoryProblem["requests"][number]> = [];
  const pageFaults = new Array<MemorySolution["faults"][number]>(
    problem.requests.length,
  ).fill(false);

  const frameReferences: Array<boolean> = [];
  problem.requests.forEach((request, i) => {
    // Skip if the request is already in the frames
    if (frames.includes(request)) {
      // Update the reference bit
      frameReferences[frames.indexOf(request)] = true;

      solution.push([...frames]);
      return;
    }

    // Add the request to the frames if there is space
    if (frames.length < problem.memorySize) {
      frames.push(request);
      frameReferences.push(true);
      pageFaults[i] = true;
      solution.push([...frames]);
      return;
    }

    // Find the first frame with a reference bit of 0 (fifo)
    let idx = frameReferences.indexOf(false);
    if (idx === -1) {
      frameReferences.fill(false);
      idx = 0;
    }

    // Remove the frame
    frames.splice(idx, 1);
    frameReferences.splice(idx, 1);

    // Add the new frame
    frames.push(request);
    frameReferences.push(true);

    pageFaults[i] = true;
    solution.push([...frames]);
  });

  return {
    frames: solution,
    faults: pageFaults,
  };
};
