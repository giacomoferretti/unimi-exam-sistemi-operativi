import { type NextRequest } from "next/server";

const handler = async (req: NextRequest) => {
  const data = await req.formData();

  const seed = data.get("seed") ?? Math.random().toString(36).substring(7);

  return new Response(seed);
};

export { handler as GET };
