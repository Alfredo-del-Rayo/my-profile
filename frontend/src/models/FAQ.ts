import z from "zod"

export const FAQSchema = z.object({
    question: z.string(),
    answer: z.string()
})

export type FAQ = z.infer<typeof FAQSchema>;