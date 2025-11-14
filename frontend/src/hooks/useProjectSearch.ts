import {useMemo} from "react";
import { indexSearch } from "@/services/searchService.ts";
import type {Project} from "@/models/Project.ts"

export function useProjectSearch(projects: Project[], filterKeys: string[], query: string ){
    return useMemo ( () => { 
        if(!query.trim()) return projects;
        return indexSearch(projects, filterKeys, query);
    }, [projects, filterKeys, query]);
}