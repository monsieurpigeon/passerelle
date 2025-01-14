import { airtableLoader } from "@ascorbic/airtable-loader";
import { defineCollection } from "astro:content";

const ideas = defineCollection({
  loader: airtableLoader({
    base: import.meta.env.AIRTABLE_BASE,
    table: "Ideas",
  }),
});

console.log(ideas);

export const collections = { ideas };
