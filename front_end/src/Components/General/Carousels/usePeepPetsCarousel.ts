import { useState } from 'react';
import { PeepPetsCarouselProps } from './IPeepPetsCarousel';

const MIN_IMAGE_COUNT = 2;

export function usePeepPetsCarousel({ images }: PeepPetsCarouselProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    const nextImageHandler = () => {
        setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1);
    };

    const prevImageHandler = () => {
        setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);
    };

    const markerClickHandler = (index: number) => {
        setCurrentImageIndex(index);
    };

    return {
        currentImageIndex,
        MIN_IMAGE_COUNT,
        nextImageHandler,
        prevImageHandler,
        markerClickHandler
    };
}