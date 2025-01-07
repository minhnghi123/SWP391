import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import pictureLogin from '../../pictureLogin.json'

export default function ImageRight() {
    const [currentPicIndex, setCurrentPicIndex] = useState(0);
    const pictures = pictureLogin;
    // change picture
    useEffect(() => {
        const id = setInterval(() => {
            setCurrentPicIndex((prevIndex) =>
                prevIndex === pictures.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000);

        return () => {
            clearInterval(id);
        };
    }, [pictures.length]);


    return (

        <div className="flex-[0.5] flex justify-center items-center p-8 relative">
            <div className="w-full h-full overflow-hidden rounded-2xl shadow-2xl relative group">
                {pictures.map((picture, index) => (
                    <img
                        key={picture.id}
                        src={picture.img}
                        alt={`Picture ${index + 1}`}
                        className={`w-full h-full object-cover transition-all duration-800 ease-in-out 
                    absolute top-0 left-0
                    ${index === currentPicIndex ? 'animate-slideLeft opacity-100 z-10' : 'opacity-0 z-0'}`}
                    />
                ))}


                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>


                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 z-20 
                bg-black/20 backdrop-blur-sm px-6 py-3 rounded-full">
                    {pictures.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPicIndex(index)}
                            className={`transition-all duration-300 relative
                            ${currentPicIndex === index
                                    ? 'w-10 h-3 bg-white rounded-full'
                                    : 'w-3 h-3 bg-white/50 rounded-full hover:bg-white/80'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        >
                            <span className={`absolute inset-0 rounded-full animate-ping 
                            ${currentPicIndex === index ? 'bg-white/30' : 'hidden'}`}></span>
                        </button>
                    ))}
                </div>


                <button
                    onClick={() => setCurrentPicIndex(prev => prev === 0 ? pictures.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full 
                bg-white/10 backdrop-blur-sm border border-white/20 
                text-white hover:bg-white/30 transition-all duration-300 
                opacity-0 group-hover:opacity-100 z-20 w-10 h-10 
                flex items-center justify-center shadow-lg 
                hover:scale-110 active:scale-95"
                >
                    <FontAwesomeIcon icon={faChevronLeft} className="text-lg" />
                </button>
                <button
                    onClick={() => setCurrentPicIndex(prev => prev === pictures.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full 
                bg-white/10 backdrop-blur-sm border border-white/20 
                text-white hover:bg-white/30 transition-all duration-300 
                opacity-0 group-hover:opacity-100 z-20 w-10 h-10 
                flex items-center justify-center shadow-lg 
                hover:scale-110 active:scale-95"
                >
                    <FontAwesomeIcon icon={faChevronRight} className="text-lg" />
                </button>

                {/* Image Counter */}
                {/* <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm 
                px-3 py-1 rounded-full text-white text-sm opacity-0 
                group-hover:opacity-100 transition-opacity duration-300 z-20">
                {currentPicIndex + 1} / {pictures.length}
            </div> */}
            </div>
        </div>
    )
}