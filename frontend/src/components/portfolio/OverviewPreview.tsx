const MAX_PREVIEW_LENGTH: number = 200;
export default function OverviewPreview({text}: {text: string}) {
    const overflow: boolean = text.length > MAX_PREVIEW_LENGTH;
    let preview: string = overflow ? text.substring(0, MAX_PREVIEW_LENGTH) : text;
    if (overflow){
        let i: number = MAX_PREVIEW_LENGTH - 1;
        while (i > 0) {
            if (preview.charAt(i) == ' '){
                preview = preview.substring(0, i) + "...";
                break;
            } else {
                i--;
            }
        }
    }
    return (
        <div className="overview-preview">
        <p><label>Overview: </label> {preview}</p>
        </div>
    );
}