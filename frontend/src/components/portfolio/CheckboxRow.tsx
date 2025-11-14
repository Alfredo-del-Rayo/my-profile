export default function CheckboxRow({keyName, toggleKey, isToggled}: {keyName: string, toggleKey: (key: string) => (void), isToggled: boolean}){
    return (
        <div className="checkbox-row">
            <label className="checkbox-label">{keyName}: </label>
            <input className="checkbox-input" 
            type="checkbox"
            checked={isToggled}
            onChange={(_e) => {
                toggleKey(keyName);
                isToggled = !isToggled;
            }} />
        </div>
    )
}