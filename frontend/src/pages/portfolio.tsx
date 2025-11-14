import '@/styles/portfolio.css'
import {STRINGS} from "@/strings.ts"
import ProjectGrid from '@/components/portfolio/ProjectGrid.tsx'
import SearchBar from "@/components/portfolio/SearchBar.tsx"
import UseProjects from '@/hooks/useProjects.ts'
import useTunningKeys from "@/hooks/useTunningKeys.ts"
import UseIcons from '@/hooks/useIcons.ts'
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import Header from "@/components/Header.tsx"; 
 


export default function Portfolio() {
    const navigate = useNavigate();
    const {projects, error: projectError} = UseProjects();
    const {iconMap, error: iconError} = UseIcons();
    const [query, setQuery] = useState<string>("");
    if (projectError || iconError) {
        navigate("/unlock");
    } else {
        const {keys, filterKeys, toggleKey} = useTunningKeys({title: true, overview: false, features: false, tech: true});
        return (
            <div className= "portfolio-page" >
                <Header title={STRINGS.portfolioPage.title} prev="/" />
                <SearchBar query={query} setQuery={setQuery} keys={keys} toggleKey={toggleKey}/>
                <div className="project-grid-container" style={{ backgroundImage: "url(/api/image/background.png)"}}>
                    <ProjectGrid  projects={projects} iconMap={iconMap} query={query} filterKeys={filterKeys} />
                </div>
            </ div>
        )
    }
}