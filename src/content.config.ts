import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

// About collection schema
const aboutCollection = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/about" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
    what_i_do: z.object({
      title: z.string(),
      items: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
        }),
      ),
    }),
  }),
});

// Contact collection schema
const contactCollection = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/contact" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// Posts collection schema
const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/posts" }),
  // schema receives the image() helper which validates + optimises local images
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string().optional(),
      meta_title: z.string().optional(),
      description: z.string().optional(),
      date: z.coerce.date().optional(),
      // Relative path from the content file, e.g. "./my-trip/cover.jpg"
      image: image().optional(),
      categories: z.array(z.string()).default(() => ["others"]),
      authors: z.array(z.string()).default(() => ["Daniel Henriques Pereira"]),
      tags: z.array(z.string()).default(() => ["others"]),
      draft: z.boolean().optional(),
      // Layout preset: "writing" = narrow reading column; "guide" = hero + stats bar
      preset: z.enum(["writing", "guide"]).default("writing"),
      // Guide preset: optional stats bar items shown below the hero image
      stats: z
        .array(z.object({ label: z.string(), value: z.string() }))
        .optional(),
      // Trip grouping: posts sharing the same trip slug are linked in the sidebar nav
      trip: z.string().optional(),
      trip_title: z.string().optional(),
    }),
});

// Export collections
export const collections = {
  posts: postsCollection,
  about: aboutCollection,
  contact: contactCollection,
};
