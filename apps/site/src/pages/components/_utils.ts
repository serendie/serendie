import { getCollection } from "astro:content";

export const getComponentsCollection = async () => {
  const components = await getCollection("components");
  return components.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
};
