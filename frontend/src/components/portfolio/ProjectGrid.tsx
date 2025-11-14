import GridLayout from './GridLayout.tsx'
import ProjectTile from './ProjectTile.tsx'
import type {Project} from '@/models/Project.ts';
import { useProjectSearch } from "@/hooks/useProjectSearch.ts";

export default function ProjectGrid({projects, iconMap, query, filterKeys}: {projects: Project[], iconMap: Record<string, string>, query: string, filterKeys: string[]}) {
    const filteredProjects: Project[] = useProjectSearch(projects, filterKeys, query);
    return(
        <div className="grid-container">
        <GridLayout>
            {filteredProjects.map( (project) => (
                <ProjectTile key={project.id} tileMeta={project} iconMap={iconMap} />
            ))}
        </GridLayout>
        </div>
    )
}