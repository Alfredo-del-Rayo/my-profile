import useIndexTracker from "@/hooks/useIndexTracker.ts";
import { useSmartInterval } from "@/hooks/useSmartInterval.ts";
import { usePreloadedImages } from "../../hooks/usePreloadedImages.ts";
import {useState} from "react";

export default function Carrousel({images}: {images: string[]}){
    const [prefix, setPrefix] = useState<string>("/api/image");
    const[hasCached, setHasCached] = useState<boolean>(false)
    const {currentSlide, setCurrentSlide, goNextSlide, goPrevSlide} = useIndexTracker(images);
    const {cache, isReady} = usePreloadedImages(images);
    const [imageUrls, setImageUrls] = useState<string[]>(images);
    useSmartInterval(goNextSlide, 6000);

    if(isReady && !hasCached){
        setImageUrls(cache);
        setPrefix("")
        setHasCached(true);
    }

    console.log("prefix:", prefix);
    console.log("imageURl[0]", imageUrls[0]);
    console.log(`${prefix}${imageUrls[0]}`)
    
    return (
        <div className="project-carrousel-container">
            <div className="project-carrousel" rel="preload" style={{backgroundImage: `url(${prefix}${imageUrls[currentSlide]})`}}>
                <div className="project-carrousel-ui">
                    <Arrows goToNext={goNextSlide} goToPrev={goPrevSlide}/>
                    <TrackerDots images={images} currentIndex={currentSlide} setCurrentSlide={setCurrentSlide}/>
                </div>
            </div>
        </div>
    );
}

function Arrows({goToPrev, goToNext}: {goToPrev: () => (void), goToNext: () => (void)}){
    return (
        <div className="carrousel-arrow-container">
            <button type="button" onClick={goToPrev} className= "arrow">
                <img className="arrow-icon" src="/back-arrow-secondary.svg" alt="back-arrow" />
            </button>
            <button type="button" onClick={goToNext} className="arrow">
                <img className="arrow-icon" src="/forward-arrow-secondary.svg" alt="forward-arrow" />
            </button>
        </div>
    );
}

function TrackerDots({images, currentIndex, setCurrentSlide}: {images: string[], currentIndex: number, setCurrentSlide: (s: number)=>(void)}){
    return (
        <div className="dot-container">
            { images.map((_value, index) => (
                index == currentIndex ?
                 <button key={index} type="button" className="dot dot-full"/>
                 :
                 <button key={index} type="button" onClick={(_e) => (setCurrentSlide(index))} className="dot dot-empty"/>
            ))}
           
        </div>
    );
}
