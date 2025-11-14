import { z } from "zod";

export const ObjectiveSchema = z.object({
    description: z.string()
});

export const SkillSchema = z.object({
    category: z.string(),
    skills: z.array(z.string())
});

export const EducationSchema = z.object({
    school: z.string(),
    timeline: z.string(),
    degree: z.string(),
    awards: z.string()
});

export const DesignTeamsSchema = z.object({
    team: z.string(),
    timeline: z.string(),
    position: z.string(),
    description: z.array(z.string())
});

export const ResumeProjectSchema = z.object({
    name: z.string(),
    type: z.string(),
    timeline: z.string(),
    description: z.array(z.string())
});

export const WorkExperienceSchema = z.object({
    company: z.string(),
    location: z.string(),
    timeline: z.string(),
    position: z.string(),
    description: z.array(z.string())
});

export const InterestsSchema = z.object({
    description: z.array(z.string())
})


export type Objective = z.infer<typeof ObjectiveSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type DesignTeam = z.infer<typeof DesignTeamsSchema>;
export type ResumeProject = z.infer<typeof ResumeProjectSchema>;
export type WorkExperience = z.infer<typeof WorkExperienceSchema>;
export type Interests = z.infer<typeof InterestsSchema>;