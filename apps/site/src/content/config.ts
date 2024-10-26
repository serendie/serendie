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
    fullWidth: z.boolean().optional(),
    showSiblingLinks: z.boolean().optional(),
    subLinks: z
      .array(
        z.object({
          name: z.string(),
          path: z.string(),
        })
      )
      .optional(),
  }),
});

export const collections = {
  components: componentsCollection,
  pages: pagesCollection,
};
