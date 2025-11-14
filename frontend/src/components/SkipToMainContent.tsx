import {useCallback} from "react"
export default function SkipToMainContent() {
    const handleSkipToContent = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        const main = document.getElementById("main-content");
        if (!main) return;
        console.log(main)
    
        const firstFocusable = main.querySelector<HTMLElement>(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
        );
        
        if (firstFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }, []);
    
        return (
         <a href="#main-content" className="skip-link"  onClick={handleSkipToContent} >
                Skip to main content
        </a>
        );
}