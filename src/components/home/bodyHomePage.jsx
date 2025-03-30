import img2 from '../../assets/p2.webp';
import img4 from '../../assets/p4.webp';
import img5 from '../../assets/p5.jpg';
import img6 from '../../assets/p6.webp';
import img7 from '../../assets/p7.webp';
import img8 from '../../assets/p8.webp';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import pictureBody from '../../../bodyPicture.json';
import Variants from '../home/Variants';
import BenefitforParents from '../home/BenefitForParents';
import News from '../home/News';
import FeedbackParent from '../home/FeedbackParent';
import { Link, useNavigate } from 'react-router-dom';
import Infomation from '../../../Infomation.json';
import { useSelector, useDispatch } from "react-redux";
import '../css/loading.css';
import { vaccineAction } from '../redux/reducers/selectVaccine';
import useAxios from '../../utils/useAxios';
import ModalDetailVaccine from './modalDetailVaccine';

// Animation variants (giữ nguyên như code gốc)
const slideUp = {
    initial: { y: 100, opacity: 0, scale: 0.9 },
    animate: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99],
            scale: { type: "spring", damping: 15, stiffness: 100 }
        },
        hover: { y: -5, transition: { duration: 0.3 } }
    }
};

const staggerContainer = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } }
};

const cardVariants = {
    initial: { y: 100, opacity: 0, scale: 0.9 },
    animate: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99],
            scale: { type: "spring", damping: 15, stiffness: 100 }
        },
        hover: { y: -10, scale: 1.02, transition: { duration: 0.3 } }
    }
};

const heroVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.2 } }
};

const heroImageVariants = {
    initial: { scale: 1.2, opacity: 0 },
    animate: {
        scale: 1,
        opacity: 1,
        transition: { duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }
    }
};

const heroHeadingVariants = {
    initial: { x: -100, opacity: 0 },
    animate: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, type: "spring", damping: 15 }
    }
};

const heroDescriptionVariants = {
    initial: { x: 100, opacity: 0 },
    animate: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, type: "spring", damping: 15 }
    }
};

const heroButtonVariants = {
    initial: { y: 50, opacity: 0 },
    animate: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, type: "spring", damping: 12 }
    },
    hover: { scale: 1.05, y: -5, transition: { duration: 0.3, type: "spring", damping: 10 } },
    tap: { scale: 0.95 }
};

const slideFromLeft = {
    initial: { x: -100, opacity: 0 },
    animate: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99], type: "spring", damping: 20 }
    }
};

const slideFromRight = {
    initial: { x: 100, opacity: 0 },
    animate: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99], type: "spring", damping: 20 }
    }
};

const url = import.meta.env.VITE_BASE_URL_DB;

export default function BodyHomePage() {
    const vc = Infomation.vaccine;
    const api = useAxios();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pictures = pictureBody;
    const [currentPicIndex, setCurrentPicIndex] = useState(0);
    const [bestVaccine, setBestVaccine] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [user, setUser] = useState([]);
    const isBooking = useSelector((state) => state.vaccine.isBooking);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedVaccine, setSelectedVaccine] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSelectVaccine = (vaccine) => {
        setSelectedVaccine(vaccine);
        setIsOpen(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [vaccineRes, feedbackRes, userRes] = await Promise.all([
                    api.get(`${url}/Vaccine/get-all-vaccines`),
                    api.get(`${url}/Feedback/get-all-feedback`),
                    api.get(`${url}/User/get-all-user`)
                ]);

                if (vaccineRes.status === 200 && feedbackRes.status === 200 && userRes.status === 200) {
                    const sortedVaccines = [...vaccineRes.data].sort((a, b) => b.price - a.price);
                    const sortedFeedback = feedbackRes.data.sort((a, b) => b.rating - a.rating);

                    // Set number of items based on screen size
                    const vaccineCount = isMobile ? 4 : 3;
                    const feedbackCount = isMobile ? 4 : 3;

                    setBestVaccine(sortedVaccines.slice(0, vaccineCount));
                    setFeedback(sortedFeedback.slice(0, feedbackCount));
                    setUser(userRes.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [isMobile]); // Re-fetch when screen size changes

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPicIndex((prevIndex) =>
                prevIndex === pictures.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [pictures.length]);

    const handleAddToCart = (vaccine, type) => {
        dispatch(vaccineAction.addVaccine({
            id: vaccine.id,
            name: vaccine.name,
            price: vaccine.price,
            description: vaccine.description,
            country: vaccine.fromCountry,
            vaccines: vaccine.vaccines,
            type: type,
        }));
    };

    return (
        <div className="max-w-7xl w-full mx-auto mt-4 px-4 py-2 z-0" id='home'>
            {/* Hero Section */}
            <motion.div
                variants={heroVariants}
                initial="initial"
                animate="animate"
                className='relative flex flex-col items-center'>
                {/* Picture Carousel */}
                <motion.div
                    variants={heroImageVariants}
                    className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden rounded-3xl">
                    {pictures.map((picture, index) => (
                        <motion.img
                            key={picture.id}
                            src={picture.src}
                            alt={`Slide ${index + 1}`}
                            className={`
                                absolute w-full h-full object-cover transition-opacity duration-1000
                                ${index === currentPicIndex ? 'opacity-100' : 'opacity-0'}
                            `}
                            initial={{ scale: 1.2 }}
                            animate={{
                                scale: index === currentPicIndex ? 1 : 1.2,
                                transition: { duration: 4 }
                            }}
                        />
                    ))}
                </motion.div>

                {/* Overlay Content */}
                <div className="absolute rounded-3xl inset-0 bg-gradient-to-b from-white/10 to-black/50 opacity-0 animate-fadeInDelay">
                    <div className='flex flex-col items-center justify-between h-full p-6 sm:p-8 md:p-12'>
                        {/* Heading */}
                        <motion.h1
                            variants={heroHeadingVariants}
                            className='text-blue-500 text-3xl sm:text-4xl md:text-5xl font-bold text-center max-w-3xl leading-tight drop-shadow-lg 
                            bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600'>
                            Track your child's vaccine schedule with ease
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            variants={heroDescriptionVariants}
                            className='text-white text-base sm:text-lg md:text-xl font-medium max-w-2xl drop-shadow-lg'>
                            Ensure your optimal health with personalized infusions.
                        </motion.p>
                    </div>
                </div>
            </motion.div>

            {/* About Us Section */}
            <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="max-w-7xl mx-auto px-4 py-8 md:py-16"
                id='about'>
                {/* Section Header */}
                <motion.div
                    variants={slideUp}
                    className="text-center mb-8 md:mb-12">
                    <span className="text-blue-500 font-semibold text-xs md:text-sm tracking-wider uppercase">Who We Are</span>
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
                        About <span className="text-blue-500">Us</span>
                    </h2>
                    <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto rounded-full"></div>
                </motion.div>

                {/* Content Container */}
                <div className='flex flex-col md:flex-row items-center gap-6 md:gap-12 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-lg'>
                    {/* Image Section */}
                    <motion.div
                        variants={slideFromLeft}
                        className='w-full md:w-1/2 relative'>
                        <div className="absolute inset-0 bg-blue-500/10 rounded-3xl transform -rotate-6"></div>
                        <div className="relative overflow-hidden rounded-3xl">
                            <img
                                src={img8}
                                alt="About Us"
                                className="w-full h-[300px] md:h-[400px] object-cover hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent"></div>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        variants={slideFromRight}
                        className='w-full md:w-1/2 space-y-6 px-4 md:px-6'>
                        <div className="space-y-4 md:space-y-6">
                            <h3 className="text-xl md:text-3xl font-bold text-gray-800 leading-tight">
                                Empowering Parents for Better Child Healthcare
                            </h3>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                Our mission is to provide parents with a comprehensive and easy-to-use platform for managing their children's vaccination schedules. We believe in making healthcare management simple, accessible, and efficient for every family.
                            </p>

                            {/* Stats */}
                            <motion.div
                                variants={staggerContainer}
                                className="grid grid-cols-3 gap-4 md:gap-6 py-4 md:py-6">
                                <motion.div variants={slideFromLeft} className="text-center">
                                    <div className="text-xl md:text-3xl font-bold text-blue-500">10k+</div>
                                    <div className="text-xs md:text-sm text-gray-600 mt-1">Happy Parents</div>
                                </motion.div>
                                <motion.div variants={slideUp} className="text-center">
                                    <div className="text-xl md:text-3xl font-bold text-blue-500">15+</div>
                                    <div className="text-xs md:text-sm text-gray-600 mt-1">Years Experience</div>
                                </motion.div>
                                <motion.div variants={slideFromRight} className="text-center">
                                    <div className="text-xl md:text-3xl font-bold text-blue-500">98%</div>
                                    <div className="text-xs md:text-sm text-gray-600 mt-1">Satisfaction Rate</div>
                                </motion.div>
                            </motion.div>

                            {/* CTA Button */}
                            <Link to="/aboutPage">
                                <motion.div
                                    variants={slideFromRight}
                                    className="flex items-center gap-4 pt-4">
                                    <motion.button
                                        whileHover={{ scale: 1.05, x: 10 }}
                                        whileTap={{ scale: 0.95 }}
                                        className='px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 font-medium flex items-center gap-2 text-sm md:text-base'>
                                        Learn More
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </motion.button>
                                </motion.div>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Best Vaccines Section */}
            <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="text-center mb-8 md:mb-12"
                id='variants'>
                <motion.div variants={slideUp}>
                    <span className="text-blue-500 font-semibold text-xs md:text-sm tracking-wider uppercase">Our Products</span>
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
                        Best <span className="text-blue-500">Vaccines</span> Available
                    </h2>
                    <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto rounded-full"></div>
                    <p className="text-gray-600 max-w-[30rem] mx-auto mt-4 text-sm md:text-base">
                        Choose from our selection of high-quality vaccines, carefully selected for your child's health and safety
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    className='container mx-auto px-4 py-6 md:py-8'>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 relative'>
                        {bestVaccine?.length > 0 ? (
                            bestVaccine.map((vaccine) => (
                                <motion.div
                                    key={`vaccine-${vaccine.id}`}
                                    variants={cardVariants}
                                    whileHover="hover">
                                    <Variants
                                        id={vaccine.id}
                                        image={vc.find(v => v.id === vaccine.id)?.img}
                                        name={vaccine.name}
                                        description={vaccine.description}
                                        type="vaccine"
                                        priceGoc={null}
                                        priceSale={vaccine.price}
                                        country={vaccine.fromCountry}
                                        maxAge={vaccine.suggestAgeMax}
                                        minAge={vaccine.suggestAgeMin}
                                        onClick={() => handleAddToCart(vaccine, 'vaccine')}
                                        isBooking={isBooking}
                                        handleSelectVaccine={() => handleSelectVaccine(vaccine)}
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <div className="loader absolute right-[50%] left-[45%]"></div>
                        )}
                    </div>
                    <div className='flex justify-end mt-6 md:mt-8'>
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/variantsPage')}
                            className='group px-4 md:px-6 py-2 md:py-2.5 bg-white border-2 border-blue-500 rounded-full hover:bg-blue-500 flex items-center gap-2 text-sm md:text-base'>
                            <span className='font-medium text-blue-500 group-hover:text-white transition-colors'>
                                View All Vaccines
                            </span>
                            <svg
                                className="w-4 md:w-5 h-4 md:h-5 text-blue-500 group-hover:text-white transition-colors transform group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>

            {/* News Section */}
            <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                variants={slideUp}
                className="max-w-7xl mx-auto px-4 py-8 md:py-16"
                id='news'>
                {/* News Header */}
                <div className="text-center mb-8 md:mb-12">
                    <span className="text-blue-500 font-semibold text-xs md:text-sm tracking-wider uppercase">Latest Updates</span>
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
                        Latest <span className="text-blue-500">News</span>
                    </h2>
                    <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto rounded-full"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-sm md:text-base">
                        Stay updated with the latest healthcare information and vaccine developments
                    </p>
                </div>

                {/* News Cards Container */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8'>
                    <motion.div variants={slideFromLeft}>
                        <News
                            label={"Healthcare"}
                            date={"08/01/2025"}
                            title={"New vaccines against seasonal flu are now available"}
                            image={img2}
                            description={"New generation flu vaccines, developed with advanced technology, are now available at our healthcare facilities. These vaccines offer improved protection against common virus strains, helping to reduce infection risks and severe complications."}
                            author={"Dr. Johnson"}
                        />
                    </motion.div>
                    <motion.div variants={slideFromRight}>
                        <News
                            label={"Updates"}
                            date={"07/28/2025"}
                            title={"Healthcare system implements new digital records"}
                            image={img4}
                            description={"The healthcare system has recently implemented a new digital records system, which allows parents to easily access and manage their children's health records. This system provides a secure and convenient way to store and share medical information."}
                            author={"Dr. Chen"}
                        />
                    </motion.div>
                </div>
            </motion.div>

            {/* Benefits Section */}
            <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="max-w-7xl mx-auto px-4 py-8 md:py-16"
                id='benefits'>
                <motion.div variants={slideUp} className="text-center mb-8 md:mb-16">
                    <span className="text-blue-500 font-semibold text-xs md:text-base tracking-wider uppercase">Services</span>
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
                        Benefits for <span className="text-blue-500">Parents</span>
                    </h2>
                    <div className="mb-4 w-16 md:w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto rounded-full"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                        Discover how our platform makes managing your child's healthcare journey easier and more efficient
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12'>
                    <motion.div
                        variants={slideFromLeft}
                        whileHover={{ scale: 1.05, y: -10 }}>
                        <BenefitforParents
                            image={img5}
                            title={"Easy Schedule Management"}
                            description={"Helps parents easily manage their children's vaccination schedules with automated reminders and clear timelines."}
                        />
                    </motion.div>
                    <motion.div
                        variants={slideUp}
                        whileHover={{ scale: 1.05, y: -10 }}>
                        <BenefitforParents
                            image={img6}
                            title={"Avoid missing important shots."}
                            description={"Access and manage your child's complete health records anytime, anywhere with secure digital storage."}
                        />
                    </motion.div>
                    {
                        !isMobile && (
                            <motion.div
                                variants={slideFromRight}
                                whileHover={{ scale: 1.05, y: -10 }}>
                                <BenefitforParents
                                    image={img7}
                                    title={"Expert Support"}
                                    description={"Get instant access to healthcare professionals and expert advice for your child's health needs."}
                                />
                            </motion.div>

                        )
                    }
                </motion.div>
            </motion.div>

            {/* Feedback Section */}
            <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="max-w-7xl mx-auto px-4 py-8 md:py-16"
                id='feedback'>
                <motion.div variants={slideUp} className="text-center mb-8 md:mb-12">
                    <span className="text-blue-500 font-semibold text-xs md:text-sm tracking-wider uppercase">Testimonials</span>
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
                        Parent's <span className="text-blue-500">Feedback</span>
                    </h2>
                    <div className="mb-4 w-16 md:w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto rounded-full"></div>
                    <p className="text-gray-600 text-sm md:text-base">
                        What our parents say about us
                    </p>
                </motion.div>
                <div className='flex justify-end mb-6 md:mb-8'>
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('feedbackPage')}
                        className='group px-4 md:px-6 py-2 md:py-2.5 bg-white border-2 border-blue-500 rounded-full hover:bg-blue-500 flex items-center gap-2 text-sm md:text-base'>
                        <span className='font-medium text-blue-500 group-hover:text-white transition-colors'>
                            View All Feedback
                        </span>
                        <svg
                            className="w-4 md:w-5 h-4 md:h-5 text-blue-500 group-hover:text-white transition-colors transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </motion.button>
                </div>
                {/* Feedback Cards Container */}
                {
                    feedback.length > 0 ? (
                        <motion.div
                            variants={staggerContainer}
                            className="grid grid-cols-1  lg:grid-cols-3 gap-4 sm:gap-6">
                            {feedback.map((item) => (
                                <motion.div
                                    key={item.id}
                                    variants={slideFromLeft}
                                    whileHover={{ scale: 1.05, y: -10 }}>
                                    <FeedbackParent
                                        randomNumber={item.ratingScore}
                                        image={user.find(user => user.id === item.userId)?.avatar}
                                        description={item.description}
                                        username={user.find(user => user.id === item.userId)?.username}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="loader absolute right-[50%] left-[45%]"></div>
                    )
                }
            </motion.div>

            {/* Modal */}
            {isOpen && selectedVaccine && (
                <ModalDetailVaccine
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    vaccine={selectedVaccine}
                    onClick={() => handleAddToCart(selectedVaccine, 'vaccine')}
                />
            )}
        </div>
    );
}