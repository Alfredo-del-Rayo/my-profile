export default function Features({features}:{features: string[]}){
    return (
        <div className="features-container">
            <h2>Key Features</h2>
            <ul>
                {features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                ))}
            </ul>
        </div>
    )
}