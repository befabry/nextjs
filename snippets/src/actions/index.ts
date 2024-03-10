"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";

export async function createSnippet(
  formState: { message: string },
  formData: FormData,
) {
  const title = formData.get("title");
  const code = formData.get("code");

  if (typeof title !== "string" || title.length < 3) {
    return {
      message: "Title must be longer",
    };
  }

  if (typeof code !== "string" || code.length < 10) {
    return {
      message: "Code must be longer",
    };
  }

  try {
    await db.snippet.create({
      data: {
        code,
        title,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { message: error.message };
    }

    return {
      message: "An unexpected error occured, try again later",
    };
  }

  redirect("/");
}

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });

  redirect("/");
}
