import { z } from "zod";

import { generateMemoryExercise } from "~/lib/exercise/memory";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exerciseRouter = createTRPCRouter({
  memory: publicProcedure
    .input(z.object({ seed: z.string() }))
    .query(async ({ input }) => {
      return await generateMemoryExercise(input.seed);
    }),
});
