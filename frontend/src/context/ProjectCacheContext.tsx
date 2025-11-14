 import type {Project} from "@/models/Project.ts";
 import React, { createContext, useContext, useState} from "react";

 interface ProjectCacheContextValue {
    projects: Project[],
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
 }

 const ProjectCacheContext = createContext<ProjectCacheContextValue | undefined>(undefined);

 export function ProjectCacheProvider({children}:{children:React.ReactNode}){
    const [projects, setProjects] = useState<Project[]>([]);
    return (
      <ProjectCacheContext.Provider value={{ projects, setProjects }}>
         {children}
      </ProjectCacheContext.Provider>
    );
 }

 export function useProjectCache() {
   const ctx = useContext(ProjectCacheContext);
   if(!ctx) throw new Error("Error: Components that use hook UseProjectCache must be children of ProjectCacheProvider");
   return ctx;
 }