import { redirect } from "next/navigation";
import { customAlphabet } from "nanoid";

const randomSeedGenerator = customAlphabet("1234567890abcdef", 8);

export default async function ExerciseRandom() {
  redirect("/oral/exercise/" + randomSeedGenerator());
}

export const dynamic = "force-dynamic";
