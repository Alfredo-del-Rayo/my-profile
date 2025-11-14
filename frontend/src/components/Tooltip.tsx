export default function Tooltip({content, tooltip}: {content: React.ReactNode, tooltip: string}){

    return (
        <div className="tooltip">
            {content}
            <div className="tooltip-text">
                {tooltip}
            </div>
        </div>

    )
}