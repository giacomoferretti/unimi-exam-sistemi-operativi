import Link from "next/link";
import { ListChecksIcon, SpeechIcon } from "lucide-react";

export default async function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Simulatore esame di Sistemi Operativi
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/filter"
              className="flex w-full flex-col items-center justify-center gap-3 rounded-md bg-white p-4 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent">
              <ListChecksIcon className="size-5" aria-hidden="true" />
              <span className="text-sm font-semibold leading-6">Filtro</span>
            </Link>
            <Link
              href="/oral"
              className="flex w-full flex-col items-center justify-center gap-3 rounded-md bg-white p-4 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent">
              <SpeechIcon className="size-5" aria-hidden="true" />
              <span className="text-sm font-semibold leading-6">Orale</span>
            </Link>
          </div>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">v0.0.2</p>
      </div>
    </div>
  );
}
