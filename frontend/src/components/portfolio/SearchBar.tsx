import {TunePanel} from "./TunePanel.tsx"
import useFocusShortcut from "@/hooks/useFocusShortcut.ts"
import {useState} from "react"
import {STRINGS} from "@/strings.ts"
    
export default function SearchBar({query, setQuery, keys, toggleKey}:
     {query: string, setQuery: (q: string) => void, keys: Record<string, boolean>, toggleKey: (key: string) => (void)} ) {
    const {ref} = useFocusShortcut("k");
    const [togglePanel, setTogglePanel] = useState<boolean>(false);
    function downloadFile() {
        globalThis.window.open("/api/file/Portfolio_Alfredo_del_Rayo.pdf", "_bank");
    }

    return(
        <div className="search-bar-container">
            <img className="search-icon" src="/search.svg" alt="search"/>
            <input
                ref={ref} 
                className="search-bar" 
                value={query}
                onChange={e => setQuery(e.target.value)} 
                placeholder="Search Projects... (Ctr + K)"/>
            <button className="tune-button" type="button" onClick={(_e) => {setTogglePanel(!togglePanel)}}>
                <img className="tune-icon" src="/tune.svg" alt="tune"/>
            </button>
            <div className="tune-panel-container">
                    <TunePanel visible={togglePanel} keys={keys} toggleKey={toggleKey} setVisible={setTogglePanel}/>
            </div>
            <div className="download-option">
                <button type="button"  onClick={downloadFile}>
                    <img className="download-icon" src="/downloadsecondary.svg" alt="download icon" />
                </button>
                <p className="download-text">{STRINGS.portfolioPage.download}</p>
            </div>
        </div>
    )
}