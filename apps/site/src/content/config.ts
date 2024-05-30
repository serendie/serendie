import { z, defineCollection } from "astro:content";

const docsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subTitle: z.string().optional(),
    description: z.string().optional(),
    lastUpdated: z.string().optional(),
  }),
});

export const collections = {
  docs: docsCollection,
};
