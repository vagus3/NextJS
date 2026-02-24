import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3).max(500),
  content: z.string().min(5),
  image: z.instanceof(File),
});
