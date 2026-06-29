import { defineCollection } from "astro:content";
import { z } from "astro:schema";
import { glob } from "astro/loaders";

/**
 * Content is modelled as one YAML file per locale (id = locale, e.g. "en", "es").
 * Each file holds the full payload for that locale; components query by locale.
 */

const profile = defineCollection({
  loader: glob({ base: "./src/content/profile", pattern: "*.yaml" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    roleToken: z.string(),
    tagline: z.string(),
    location: z.string().optional(),
    githubUrl: z.string().url(),
    linkedinUrl: z.string().url(),
    githubHandle: z.string(),
    linkedinHandle: z.string(),
  }),
});

const skills = defineCollection({
  loader: glob({ base: "./src/content/skills", pattern: "*.yaml" }),
  schema: z.object({
    modules: z.array(
      z.object({
        title: z.string(),
        summary: z.string(),
        tags: z.array(z.string()).default([]),
      }),
    ),
  }),
});

const experience = defineCollection({
  loader: glob({ base: "./src/content/experience", pattern: "*.yaml" }),
  schema: z.object({
    roles: z.array(
      z.object({
        title: z.string(),
        company: z.string(),
        period: z.string(),
        current: z.boolean().default(false),
        summary: z.string(),
        tags: z.array(z.string()).default([]),
      }),
    ),
  }),
});

export const collections = { profile, skills, experience };
