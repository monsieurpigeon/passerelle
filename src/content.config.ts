import { airtableLoader } from "@ascorbic/airtable-loader";
import { defineCollection } from "astro:content";

const ideas = defineCollection({
  loader: airtableLoader({
    base: import.meta.env.AIRTABLE_BASE,
    table: "Ideas",
  }),
});

const tools = defineCollection({
  loader: airtableLoader({
    base: import.meta.env.AIRTABLE_BASE,
    table: "Tools",
  }),
});

const persons = defineCollection({
  loader: airtableLoader({
    base: import.meta.env.AIRTABLE_BASE,
    table: "Persons",
  }),
});

export const collections = { ideas, tools, persons };
