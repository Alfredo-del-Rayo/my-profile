export default function Overview({text}:{text: string}){
    return (
        <div className="overview-container">
            <h2>Overview</h2>
            <p>{text}</p>
        </div>
    )
}