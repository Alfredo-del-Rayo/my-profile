import "@/styles/project.css";
import Header from "@/components/Header.tsx";
import {useParams} from "react-router-dom";
import type {Project} from "@/models/Project.ts";
import { Navigate, useLocation } from "react-router-dom";
import useIcons from "@/hooks/useIcons.ts";
import useProjects from "@/hooks/useProjects.ts";
import Carrousel from "../components/project/Carrousel.tsx";
import ProjectTechStack from "../components/project/ProjectTech.tsx";
import Overview from "@/components/project/Overview.tsx";
import Features from "@/components/project/Features.tsx";
import ProjectLinks from "@/components/project/ProjectLinks.tsx";

export default function ProjectPage() {
    const location = useLocation();
    const {projects, error} = useProjects();
    const {iconMap, error: iconError} = useIcons();
    const {projectId} = useParams();
    const project: Project | undefined = projects.find(p=> p.id === projectId);

    if (error || iconError){
        return <Navigate to="/unlock" state={{ from: location}} replace />;
    }else if (!project) {
       return (
            <div className= "project-page" >
                <Header prev="/portfolio" title="Project Not Found"/>
            </div>
        );
    } else    {
         const hasLinks: boolean = Object.keys(project.links).length > 0;
        return (
            <div className= "project-page" >
                <Header prev="/portfolio" title={project.title}/>
                {hasLinks && <ProjectLinks links={project.links}/>}
                <Carrousel images={project.images}/>
                <main id="main-content">
                    <Overview text={project.overview} />
                    <Features features={project.features} />
                    <ProjectTechStack tech={project.tech} iconMap={iconMap}/>
                </main>
            </div>
        );
    }
}