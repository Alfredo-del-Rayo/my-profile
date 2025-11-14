export default function GridLayout({children}: {children: React.ReactNode}) {   
    return (
        <div id="main-content" className="grid-layout">
            {children}
        </div>
    );
}