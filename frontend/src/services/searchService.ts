import Fuse from 'fuse.js';
import type {Project} from "@/models/Project.ts";

const longFields = ["overview", "features"];

export function indexSearch(projects: Project[], keys: string[], query: string): Project[]{
    const incLong: boolean = keys.some(key => longFields.includes(key));
    const fuse = new Fuse(projects, {keys: keys, includeScore: true, ignoreLocation: incLong});
    const score_cutoff = incLong? 1 : 0.5;
    return fuse.search(query).filter(result => result.score !== undefined && result.score <= score_cutoff).map(result => result.item);
}