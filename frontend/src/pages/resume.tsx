import Header from "@/components/Header.tsx";
import ResumeContent from "@/components/resume/ResumeContent.tsx";
import DownloadBar from "@/components/resume/DownloadBar.tsx";
import "@/styles/resume.css";

export default function ResumePage(){
    return (
        <div className="resume-page">
            <Header title="CV Alfredo Alexei del Rayo" prev="/" />
            <DownloadBar />
             <main id="main-content" className="resume-main-content">
                 <ResumeContent />
             </main>
        </div>
    );
}