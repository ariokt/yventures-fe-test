import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col gap-8 w-full min-h-screen items-center justify-center font-sans">
      <h1 className="text-3xl font-bold">Welcome Reviewer!</h1>
      <Link href={'/todos'} className="bg-gray-300 py-4 px-8 rounded-2xl hover:bg-gray-100 cursor-pointer">
        Next &#10217;
      </Link>
    </div>
  );
}
