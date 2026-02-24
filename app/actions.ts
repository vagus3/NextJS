"use server";

import { z } from "zod";
import { postSchema } from "./schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { getToken } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";



export async function createBlogAction(
  values: z.infer<typeof postSchema>
) {
  try {

    const parsed = postSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error("Invalid input");
  }

    const token = await getToken();
      const imageUrl = await fetchMutation(
        api.posts.generateImageUploadUrl,
        {},
        { token }
      );


    let storageId: Id<"_storage"> | undefined;

    if (parsed.data.image) {
      const uploadUrl = await fetchMutation(
        api.posts.generateImageUploadUrl,
        {},
        { token }
      );

      const uploadResult = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          "Content-Type": parsed.data.image.type,
        },
        body: parsed.data.image,
      });

      if (!uploadResult.ok) {
        return { error: "Failed to upload image" };
      }

      const { storageId } = await uploadResult.json()
    }
    await fetchMutation(
      api.posts.createPost,
      {
        title: parsed.data.title,
        body: parsed.data.content,
        imageStorageId: storageId,
      },
      { token }
    );

    

  } catch {
    return {
        error: "Failed to create blog post"
    }
  }
  // revalidatePath("/blog")
  updateTag("blog");
  return redirect("/blog");
}
