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

export const collections = {
  components: componentsCollection,
};
