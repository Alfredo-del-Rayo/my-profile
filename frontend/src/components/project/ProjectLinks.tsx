const linkIcons: Record<string, string> = {
    github: "github.svg",
    youtube: "youtube.svg",
    website: "globe.svg"
}

export default function ProjectLinks({links}: {links: Record<string, string>}){
        return (
        <div className="links-container">
            {Object.entries(links).map(([key, value]: [key: string, value: string]) => (
                <a key={key} href={value} className="link-anchor">
                    <img  src={`/${linkIcons[key]}`} className="link-icon" />
                </a>
            ))}
        </div>
    )
}

