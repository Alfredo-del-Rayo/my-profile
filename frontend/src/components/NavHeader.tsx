import SessionUI from "./SessionUI.tsx"
export default function NavHeader(){
    return (
        <nav className="nav-header-container">
        {
            Object.entries(paths).map( ([key, value]) => (
                <NavItem key={key} name={key} link={value} lock={locks[key]??""} />
            ))
        }
        </nav>
        )
}

function NavItem({name, link, lock=false}: {name: string, link: string, lock: boolean}){
    return(
            <a className= "nav-item" href={link}>
                {lock && <SessionUI />}
                {name}
            </a>
    )
}

const paths: Record<string, string> = {
     "résumé": "/resume",
     portfolio: "/portfolio"
}

const locks: Record<string, boolean> = { 
    "résumé": false,
    portfolio: true
}
