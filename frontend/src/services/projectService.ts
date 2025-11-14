import { ProjectSchema } from "@/models/Project.ts";

export default async function fetchProjects() {
    const response = await fetch('/api/projects');
    if (!response.ok) {
        throw new Error('Failed to fetch projects');
    }
    const jsonResponse = await response.json();
    const projects = jsonResponse?.projects;
    return ProjectSchema.array().parse(projects);
}