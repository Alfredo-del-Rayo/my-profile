export async function fetchIconMap(): Promise<Record<string, string>>{
    const res = await fetch('/api/icons');
    if (!res.ok){
      throw new Error("Failed to fetch Icon Map")
    } 
    try{
        const iconMap: Record<string, string> = await res.json(); 
        return iconMap; 
    } catch (error) {
        throw new Error(`Failed to fetch Icon Map: ${error}`)
    }
   
}

export function matchIcons(icons: string[], iconMap: Record<string, string>) {
    const imageIcons: Record<string, string> = {};
    const textIcons: string[] = []; 
    if (iconMap != null) {
        for(const icon of icons){
            if (iconMap[icon] != "")
                imageIcons[icon] = iconMap[icon];
            else
                textIcons.push(icon);
        }
    }
    return {imageIcons, textIcons};
}