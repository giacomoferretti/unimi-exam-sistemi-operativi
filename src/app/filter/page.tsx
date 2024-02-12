import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { customAlphabet } from "nanoid";

const randomSeedGenerator = customAlphabet("1234567890abcdef", 8);

export default async function Filtro() {
  noStore();
  redirect("/filter/" + randomSeedGenerator());

  // noStore();

  // const questions = extractFilterQuestions(filtro);

  // return (
  //   <main className="min-h-full">
  //     <div className="mx-auto max-w-4xl">
  //       <h1 className="mb-4 mt-8 text-center text-4xl font-bold">
  //         Filtro (dura 1 ora)
  //       </h1>
  //       <ol className="list-inside list-decimal">
  //         {questions.map((question, index) => (
  //           <li key={index}>
  //             <Question question={question} />
  //           </li>
  //         ))}
  //       </ol>
  //     </div>
  //   </main>
  // );

  // return (
  //   <div className="flex min-h-full items-center justify-center">
  //     Loading...
  //   </div>
  // );
}
