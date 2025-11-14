import {useNavigate} from "react-router-dom";
import SkipToMainContent from "@/components/SkipToMainContent.tsx";
export default function Header({title, prev}: {title: string, prev: string}){
    const navigate = useNavigate()
    return (
            <div className="page-header-container">
                <img src="/logo.svg" alt="logo" onClick={() => navigate("/")} />
                { prev && <button type="button" className="back-arrow" onClick={() => navigate(`${prev}`)}>
                    <img className="back-arrow-icon" src="/arrowback.svg" alt="back arrow" />
                </button>}
            <h1 className="page-header-title">{title}</h1>
            <SkipToMainContent />
        </div>
    )
}