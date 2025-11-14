import useRouteChange from "@/hooks/useRouteChange.ts"
import {STRINGS} from "@/strings.ts"
import { useNavigate } from "react-router-dom";
export default function DownloadBar(){
    return (
        <div className="resume-download-bar">
            <DownloadOption />
        </div>
    );
}

function DownloadOption(){
    const navigate = useNavigate();
    const {sessionStatus, expiration: _expiration} = useRouteChange();
    function downloadFile() {
        if (sessionStatus === "authenticated")
            globalThis.window.open("/api/file/Resume_Alfredo_del_Rayo.pdf", "_bank");
        else
            navigate("/unlock");
    }
    return (
        <div className="download-option">
            <button type="button"  onClick={downloadFile}>
                <img className="download-icon" src="/downloadsecondary.svg" alt="download icon" />
            </button>
            <p className="download-text">{STRINGS.resumePage.download}</p>
        </div>
    )
}



