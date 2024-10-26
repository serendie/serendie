import { z, defineCollection } from "astro:content";

const componentsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    componentName: z.string(),
    description: z.string(),
    lastUpdated: z.string().optional(),
  }),
});

const pagesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    parent: z.string().optional(),
    lastUpdated: z.string().optional(),
    description: z.string().optional(),
    illustType: z.enum(["A", "B", "C", "D"]).optional(),
    illustSize: z.enum(["large", "small"]).optional(),
  }),
});

export const collections = {
  components: componentsCollection,
  pages: pagesCollection,
};
