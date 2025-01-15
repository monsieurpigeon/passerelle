import { airtableLoader } from "@ascorbic/airtable-loader";
import { defineCollection } from "astro:content";

const projects = defineCollection({
  loader: airtableLoader({
    base: import.meta.env.AIRTABLE_BASE,
    table: "Projects",
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

export const collections = { projects, tools, persons };
