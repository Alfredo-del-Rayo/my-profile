
export default function LinkBar(){
    return (
        <div className="link-bar-container">
            {Object.entries(linkIcons).map(([key, value]) => (
                <IconLink key={key} name={key}link={links[key]} icon={value} />
            ))}
        </div>
    )
}

function IconLink({name, link, icon}: {name: string, link: string, icon:string}){
    return (
        <a href={link} className="icon-link-anchor">
            <img src={icon} className="icon-link-image" alt={`${name} icon link`} />
        </a>
    )
}

const linkIcons: Record<string, string> = {
    github: "/github.svg",
    linkedin: "/linkedin.svg",
    instagram: "/instagram.svg",
    facebook: "/facebook.svg",
}

const links: Record<string, string> = {
    github: "https://github.com/Alfredo-del-Rayo",
    linkedin: "https://www.linkedin.com/in/alfredo-alexei-del-rayo-haro-875a43219/",
    instagram: "https://www.instagram.com/alexeidelrayo/",
    facebook: "https://www.facebook.com/alfredo.haro.10485"
}

