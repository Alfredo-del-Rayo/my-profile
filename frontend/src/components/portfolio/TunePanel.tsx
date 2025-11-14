import CheckboxRow from "./CheckboxRow.tsx";

export function TunePanel({visible, keys, toggleKey, setVisible}: {visible: boolean, keys: Record<string, boolean>, toggleKey: (key: string) => (void), setVisible: (v: boolean) => (void)}){
    return (
        <div style={{display: visible ? "block" : "none" }} className="tune-panel">
            <div className="tune-panel-grid">
                <h5 className="tune-panel-title">Filters</h5>
                <div className="tune-panel-table">
                    {Object.entries(keys).map(([key, value]) => (
                        <CheckboxRow key={key} keyName={key} isToggled={value} toggleKey={toggleKey} />
                        ))}
                </div>
                <button className="tune-panel-button" type="button" onClick={_e => setVisible(false)}>Close</button>
            </div>
        </div>
    )
}