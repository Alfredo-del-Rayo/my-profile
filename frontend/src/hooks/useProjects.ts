import fetchProjects from "@/services/projectService.ts";
import { useEffect, useState} from "react";
import { useProjectCache } from "@/context/ProjectCacheContext.tsx";
import type {Project} from "@/models/Project.ts";

export default function UseProjects(): {projects: Project[], error: string | null} {
    const {projects, setProjects} = useProjectCache();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProjects().then(setProjects).catch(err => setError(err.message));
    }, [])

    return { projects, error };
}