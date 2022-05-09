import { usePeepPetsCarousel } from './usePeepPetsCarousel';
import { PeepPetsCarouselProps } from './IPeepPetsCarousel';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { CgLoadbar } from 'react-icons/cg';
import Row from '../Flexboxes/Row/Row';
import './PeepPetsCarousel.css';

function PeepPetsCarousel({ images }: PeepPetsCarouselProps) {
    const { currentImageIndex, MIN_IMAGE_COUNT, nextImageHandler, prevImageHandler, markerClickHandler } = usePeepPetsCarousel({ images });
    return (
        <>
            {images.length >= MIN_IMAGE_COUNT &&
                <div className="carousel">
                    <FaArrowAltCircleLeft className="left-arrow" onClick={prevImageHandler} />
                    <FaArrowAltCircleRight className="right-arrow" onClick={nextImageHandler} />
                    <Row styles='carousel-index-markers-container'>
                        {images.map((image: string, index: number) => (
                            <CgLoadbar
                                key={index}
                                className={`carousel-index-marker ${index === currentImageIndex && "active-marker"}`}
                                onClick={() => markerClickHandler(index)}
                            />
                        ))}
                    </Row>

                    {images.map((image: string, index: number) => (
                        currentImageIndex === index && (
                            <img
                                key={index}
                                src={image}
                                className="carousel-image"
                                alt="Dog #1"
                            />
                        )
                    ))}
                </div>}
        </>
    );
}

export default PeepPetsCarousel;
