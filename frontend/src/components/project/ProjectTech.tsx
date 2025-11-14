import { matchIcons } from "@/services/iconService.ts";
import Tooltip from "@/components/Tooltip.tsx";

export default function ProjectTechStack({tech, iconMap}: {tech: string[], iconMap: Record<string, string>}){
     const {imageIcons, textIcons} = matchIcons(tech, iconMap);
    return (
        <div className="project-tech-container">
            <h2>Core Technologies & Development Concepts</h2>
            <div className="tech-container">
                {Object.entries(imageIcons).map(([key, value]) => (
                <Tooltip key={key} content={<img key={key} className="icon-image" src={`/${value}`} alt={value}/>} tooltip={key}/>
                ))}
                {textIcons.map((value: string) => (
                    <Tooltip key={value} content={<span key={value} className="icon-text">&nbsp; {value}</span>} tooltip={value} />
                ) )}
            </div>
        </div>
    )
}