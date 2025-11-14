import { matchIcons } from "@/services/iconService.ts";
import Tooltip from "@/components/Tooltip.tsx";

export function TechStack({tech, iconMap}: {tech: string[], iconMap: Record<string, string>}){
    const {imageIcons, textIcons} = matchIcons(tech, iconMap);
    return (
        <div className="tech-container">
        <label>Tech: </label>
         {Object.entries(imageIcons).map(([key, value]) => (
                <Tooltip key={key} content={<img key={key} className="icon-image" src={`/${value}`} alt={value}/>} tooltip={key}/>
        ))}
        {textIcons.map((value: string) => (
            <Tooltip key={value} content={<span key={value} className="icon-text">&nbsp; {value}</span>} tooltip={value} />
        ) )}
        </div>
    )
}