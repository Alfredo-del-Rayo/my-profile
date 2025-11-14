import {STRINGS} from "@/strings.ts";
import LinkBar from "./LinkBar.tsx";
import ContactInfo from "./ContactInfo.tsx";

export default function Profile(){
    return (
        <div className="profile-container">
            <div className= "profile-picture-container">
                <img className="profile-picture" src="./profile-picture.png" alt="profile picture" />
                <ContactInfo />
            </div>
            <div className="profile-description">
                <h2>About me</h2>
                { STRINGS.homePage.description.map((value: string, idx: number)=> (
                    <p key={idx}>{value}</p>
                ))}
                <hr />
                <LinkBar />
            </div>
        </div>
    )
}