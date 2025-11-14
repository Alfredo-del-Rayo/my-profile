import { Route, Routes } from 'react-router-dom'
import Portfolio from '@/pages/portfolio.tsx'
import Unlock from '@/pages/unlock.tsx'
import Project from '@/pages/project.tsx'
import Resume from '@/pages/resume.tsx'
import HomePage from "./pages/home.tsx"
import {ProjectCacheProvider} from '@/context/ProjectCacheContext.tsx'
import '@/styles/style.css'
import { useTracking } from "./hooks/usePageTracking.ts"

function App() {
  useTracking();
  return (
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<ProjectCacheProvider><Portfolio /></ProjectCacheProvider>} />
        <Route path="/project/:projectId" element={<ProjectCacheProvider><Project/></ProjectCacheProvider>} />
        <Route path="/unlock" element={<Unlock/>} />
        <Route path="/resume" element={<Resume/>} />
      </Routes>
    
  )
}

export default App
