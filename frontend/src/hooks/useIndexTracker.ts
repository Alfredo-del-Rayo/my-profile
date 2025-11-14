import {useState, useCallback} from 'react';

export default function useIndexTracker(el: string[]): 
    {currentSlide: number, setCurrentSlide: (n: number) => (void), goNextSlide: () => (void), goPrevSlide: () => (void)}{
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const slideNo = el.length;

    const goNextSlide = useCallback(() => {
    setCurrentSlide((prev) => ( (prev + 1) % slideNo));
    },[slideNo]);

    const goPrevSlide = useCallback(() => {
        setCurrentSlide((prev) => ((prev - 1 + slideNo) % slideNo));
    }, [slideNo]);

    return {currentSlide, setCurrentSlide, goNextSlide, goPrevSlide};
}