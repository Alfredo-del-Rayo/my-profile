import faqs from "@/data/faqs.json" with {type: "json"};
import type {FAQ} from "@/models/FAQ.ts";
import {useState} from "react";

export default function FAQ(){
    const formatedFAQS: FAQ[] = faqs;
    return (
        <section className="faqs-section" >
            <h2>FAQs</h2>
            <div className="faqs-container">
                <p className="faqs-description">Are you still not sure if I am the right candidate? Here I answer some of the questions I have been asked the most in interviews. They could help you decide whether my thoughts align with your business</p>
                {
                    formatedFAQS.map((faq: FAQ, idx:number ) => (
                        <FAQTile key={idx} f={faq} />
                    ))
                }
            </div>
        </section>
    )
}

function FAQTile({f}: {f: FAQ}){
    const [isHidden, setIsHidden] = useState<boolean>(true);
    return(
        <div className="faq-container">
            <button type="button" className="faq-question" onClick={() => (setIsHidden(p => !p))}>
                <p>{f.question}</p>
                <div className={isHidden? "arrow-up": "arrow-down"}/>
            </button>
             <div className={isHidden?"faq-answer hidden": "faq-answer"}>{f.answer}</div>                
        </div>
    )
} 