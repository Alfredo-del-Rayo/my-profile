import type  { Project } from "@/models/Project.ts";
import OverviewPreview from "./OverviewPreview.tsx";
import { TechStack } from "./TechStack.tsx";
import {useNavigate} from "react-router-dom"
export default function ProjectTitle({tileMeta, iconMap}: {tileMeta: Project, iconMap: Record<string, string>}) {
    const navigate = useNavigate()
    return (
        <div className="project-tile">
            <button style={{backgroundImage: `url(/files/images/${tileMeta.image})`}} type="button" className="tile-img-container" 
            onClick={(e)  =>{
                e.preventDefault();
                navigate(`/project/${tileMeta.id}`)
            }}>
                    <div className="tile-img">
                        <h3>Learn More...</h3>
                    </div>
            </button>
            <h3 className="project-title"> {tileMeta.title} </h3>
            <OverviewPreview text={tileMeta.overview}/>
            <TechStack tech ={tileMeta.tech} iconMap={iconMap}/>
        </div>
    );
}