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
    timezone: z.string().optional(),
    githubUrl: z.string().url(),
    linkedinUrl: z.string().url(),
    githubHandle: z.string(),
    linkedinHandle: z.string(),
  }),
});

const about = defineCollection({
  loader: glob({ base: "./src/content/about", pattern: "*.yaml" }),
  schema: z.object({
    intro: z.string(),
    focus: z.array(
      z.object({
        title: z.string(),
        summary: z.string(),
      }),
    ),
    principles: z.array(
      z.object({
        title: z.string(),
        summary: z.string(),
      }),
    ),
  }),
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "*.yaml" }),
  schema: z.object({
    featured: z.array(
      z.object({
        slug: z.string(),
        title: z.string(),
        summary: z.string(),
        context: z.string().optional(),
        problem: z.string(),
        approach: z.string(),
        challenge: z.string(),
        outcome: z.string(),
        differently: z.string().optional(),
        stack: z.array(z.string()).default([]),
        tags: z.array(z.string()).default([]),
        demoUrl: z.string().url().nullable().optional(),
        repoUrl: z.string().url().nullable().optional(),
      }),
    ),
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
        highlights: z.array(z.string()).default([]),
        tags: z.array(z.string()).default([]),
      }),
    ),
  }),
});

export const collections = { profile, about, projects, skills, experience };
