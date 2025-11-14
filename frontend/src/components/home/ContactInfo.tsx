import {STRINGS} from "@/strings.ts"
export default function ContactInfo(){
    const contactLinks: Record<string, string> = STRINGS.homePage.contactLinks;
    return (
        <address className="contact-info">
            {
                Object.entries(STRINGS.homePage.contact).map(([key, value]: [key: string, value: string]) => (
                    <ContactLine key={key} text={value} icon={contactInfoIcons[key]} link={contactLinks[key]}/>
                ))
            }
        </address>

    )
}

function ContactLine({text, icon, link}: {text: string, icon: string, link: string}){
    return (
        <div className="contact">
            <img className="contact-icon" src={icon} alt={icon}/>
            <p className="contact-text"><a href={link}>{text}</a></p>
        </div>
    )
}

const contactInfoIcons: Record<string, string> = {
    phone: "phone.svg",
    email: "mail.svg",
    address: "location.svg"
}