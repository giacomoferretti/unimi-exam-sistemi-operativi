import type {
  MemoryExerciseSolver,
  MemoryProblem,
  MemorySolution,
} from "../types";

export const solveOptimal: MemoryExerciseSolver = (problem) => {
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

    // Add the request to the frames if there is space
    if (frames.length < problem.memorySize) {
      frames.push(request);
      pageFaults[i] = true;
      solution.push([...frames]);
      return;
    }

    // Find the farthest request
    const currentFrame = [...frames];
    let currentFrameRequestsIdx = i;
    while (
      currentFrame.length > 1 &&
      currentFrameRequestsIdx < problem.requests.length
    ) {
      const currentRequest = problem.requests[currentFrameRequestsIdx]!;

      // Remove the request from the frames
      if (currentFrame.includes(currentRequest)) {
        currentFrame.splice(currentFrame.indexOf(currentRequest), 1);
      }

      currentFrameRequestsIdx++;
    }

    // If the farthest request is not found, remove the first request
    let idx = frames.indexOf(currentFrame[0]!);
    if (idx === -1) {
      idx = 0;
    }

    frames.splice(idx, 1);
    frames.push(request);

    pageFaults[i] = true;

    solution.push([...frames]);
  });

  return {
    frames: solution,
    faults: pageFaults,
  };
};
