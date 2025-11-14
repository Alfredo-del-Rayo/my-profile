import "@/styles/unlock.css"
import {STRINGS} from "@/strings.ts"
import {useState} from "react";
import {unlock} from "@/services/unlock.ts";
import { useNavigate, useLocation } from "react-router-dom";
import VisibilityTile from "./VisibilityTile.tsx";

export default function UnlockForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [visibility, setVisibility] = useState<boolean>(false);

    const path = (location.state)?.from?.pathname || "/portfolio";
    
    async function submitUnlock(e:  React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const password = formData.get("password");
        const { success, error } = await unlock(password as string);
        if (success){
            navigate(path);
        } else {
            setMessage(error || "Failed to unlock");
        }
        setIsSubmitting(false);
    }

    function changeVisibility(){
        setVisibility(!visibility);
    }


    return (
        <div className="unlock-form-container">
            <div className="unlock-form">
                <div className="header-container">
                    <h1 className="form-title">
                        {STRINGS.unlockPage.formTitle}
                         <img className="lock-icon" src="/lock-cicle.svg" />

                    </h1>
                    <hr className="separator"/>
                    <h3 className="form-subtitle">{STRINGS.unlockPage.subtitle}</h3>
                </div>
                <form onSubmit={submitUnlock}>
                    <div className = "password-field">
                        <label htmlFor="password">Password:</label>
                        <input name="password" type={visibility?"text" : "password"} required />
                        <button type="button" aria-label="Toggle Password Visibility" className="eye-container" onClick={changeVisibility}>
                            <VisibilityTile visible={visibility}/>
                        </button>
                    </div>
                    <button type="submit" disabled={isSubmitting}>{isSubmitting? "Unlocking" : "Unlock"}</button>
                </form>
                <p className="error-message">{message}</p>
                <p className="form-note">Note: {STRINGS.unlockPage.note}</p>
            </div>
        </div>

    );
}