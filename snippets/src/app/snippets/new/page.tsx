import { redirect } from "next/navigation";
import { db } from "@/db";

export default function SnippetCreatePage() {
  async function createSnippet(formDate: FormData) {
    "use server";

    const title = formDate.get("title") as string;
    const code = formDate.get("code") as string;

    await db.snippet.create({
      data: {
        code,
        title,
      },
    });

    redirect("/");
  }

  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">Create a snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>
        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}
