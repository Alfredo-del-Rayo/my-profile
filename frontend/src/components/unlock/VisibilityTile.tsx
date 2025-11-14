
export default function VisibilityTyle({visible}: {visible: boolean}){
    return (
        visible? <img className="eye-icon" src="eye-lock.svg" alt="eye-lock"/> : <img className="eye-icon" src="eye.svg" alt="eye"/>
    );

}