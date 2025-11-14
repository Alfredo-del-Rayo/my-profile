import {STRINGS} from '@/strings.ts'
export default function Values() {
    return (
        <section className="values-section-container">
            <h2 className="values-title">My Culture</h2>
            <div className="values-content">
            {
                STRINGS.homePage.myCulture.map((desc: string, idx: number) => (
                    <p key={idx}>{desc}</p>
                ))
            }
            </div>
            <div className="values-section">
                <div className="values-container">
                    <div className="values-absolute">
                            {
                                Object.keys(STRINGS.homePage.values).map( (key, idx) => (
                                    <div key={idx} className={`value ${valueClassess[idx]}`}>
                                        <h3 className="value-center">{key}</h3>
                                    </div>
                                ))
                            }
                    </div>
                </div>
            </div>
            <div className="values-content">
                <ol>
                {
                    Object.entries(STRINGS.homePage.values).map(([key, value]) => (
                        <li key={key}>
                            <h3>{key}</h3>
                            <p>{value}</p>
                        </li>
                    ))
                }
                </ol>
            </div>
            <div className="values-content">
                <p>{STRINGS.homePage.cultureConclusion}</p>
            </div>
            
        </section>
    )
}

const valueClassess: string[] = [
     "value-one",
     "value-two", 
     "value-three"
]