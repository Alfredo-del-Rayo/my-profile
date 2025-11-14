import { z } from "zod";


export const ProjectSchema = z.object({
    id: z.string(),
    title: z.string(),
    image: z.string(),
    links: z.record(z.string(), z.string()),
    images: z.array(z.string()),
    url: z.union([z.url(), z.literal("")]).optional(),
    type: z.string(),
    tech: z.array(z.string()),
    overview: z.string(),
    features: z.array(z.string()),
});

export type Project = z.infer<typeof ProjectSchema>;