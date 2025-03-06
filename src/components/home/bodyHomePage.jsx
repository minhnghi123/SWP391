import img2 from '../../assets/p2.webp'
import img4 from '../../assets/p4.webp'
import img5 from '../../assets/p5.jpg'
import img6 from '../../assets/p6.webp'
import img7 from '../../assets/p7.webp'
import img8 from '../../assets/p8.webp'
import img12 from '../../assets/p12.jpg'
import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import pictureBody from '../../../bodyPicture.json'
import Variants from '../home/Variants'
import BenefitforParents from '../home/BenefitForParents'
import News from '../home/News'
import FeedbackParent from '../home/FeedbackParent'
import { Link, useNavigate } from 'react-router-dom'
import { VaccineContext } from '../Context/ChildrenSelected'
import { fetchData } from '../../Api/axios'
import { useSelector, useDispatch } from "react-redux";
import '../css/loading.css'
import { vaccineAction } from '../redux/reducers/selectVaccine'

// Animation variants
const fadeInUp = {
    initial: {
        y: 100,
        opacity: 0,
        scale: 0.9
    },
    animate: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99],
            scale: {
                type: "spring",
                damping: 15,
                stiffness: 100
            }
        }
    }
};

const slideUp = {
    initial: {
        y: 100,
        opacity: 0,
        scale: 0.9
    },
    animate: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99],
            scale: {
                type: "spring",
                damping: 15,
                stiffness: 100
            }
        },
        hover: {
            y: -5,
            transition: {
                duration: 0.3
            }
        }
    }
};

const staggerContainer = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2
        }
    }
};

const cardVariants = {
    initial: {
        y: 100,
        opacity: 0,
        scale: 0.9
    },
    animate: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99],
            scale: {
                type: "spring",
                damping: 15,
                stiffness: 100
            }
        },
        hover: {
            y: -10,
            scale: 1.02,
            transition: {
                duration: 0.3
            }
        }
    }
};

const heroVariants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.8,
            staggerChildren: 0.2
        }
    }
};

const heroImageVariants = {
    initial: {
        scale: 1.2,
        opacity: 0
    },
    animate: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 1.2,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    }
};

const heroHeadingVariants = {
    initial: {
        x: -100,
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            type: "spring",
            damping: 15
        }
    }
};

const heroDescriptionVariants = {
    initial: {
        x: 100,
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            type: "spring",
            damping: 15
        }
    }
};

const heroButtonVariants = {
    initial: {
        y: 50,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            type: "spring",
            damping: 12
        }
    },
    hover: {
        scale: 1.05,
        y: -5,
        transition: {
            duration: 0.3,
            type: "spring",
            damping: 10
        }
    },
    tap: {
        scale: 0.95
    }
};

const heroChildVariants = {
    initial: {
        y: 50,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    }
};

const slideFromLeft = {
    initial: {
        x: -100,
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99],
            type: "spring",
            damping: 20
        }
    }
};

const slideFromRight = {
    initial: {
        x: 100,
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99],
            type: "spring",
            damping: 20
        }
    }
};

export default function BodyHomePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const pictures = pictureBody;
    const [currentPicIndex, setCurrentPicIndex] = useState(0);
    const [bestVaccine, setBestVaccine] = useState([])


    const isBooking = useSelector((state) => state.vaccine.isBooking)


    useEffect(() => {
        fetchData('Vaccine/get-all-vaccines').
            then((res) => {
                if (res?.data) {
                    const sortedTop3 = [...res.data]
                        .sort((a, b) => b.price - a.price)
                        .slice(0, 3);
                    setBestVaccine(sortedTop3);
                }
            })
            .catch((err) => console.log("Error"))
    }, [])


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPicIndex((prevIndex) =>
                prevIndex === pictures.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000); // Change picture every 3 seconds

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
        }))
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
                    className="relative w-full h-[600px] overflow-hidden rounded-3xl ">
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

                {/* Navigation Dots */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                    {pictures.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => setCurrentPicIndex(index)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className={`
                                w-4 h-4 rounded-full transition-all duration-300
                                ${index === currentPicIndex
                                    ? 'bg-slate-500 w-4'
                                    : 'bg-white/50 hover:bg-white/75'}
                            `}
                        />
                    ))}
                </motion.div>

                {/* Overlay Content */}
                <div className="absolute rounded-3xl inset-0 bg-gradient-to-b from-white/10 to-black/50 opacity-0 animate-fadeInDelay">
                    <div className='flex flex-col items-center justify-between h-full p-12'>
                        {/* Heading */}
                        <motion.h1
                            variants={heroHeadingVariants}
                            className='text-blue-500 text-5xl font-bold text-center max-w-3xl leading-tight drop-shadow-lg 
                            bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600'>
                            Track your child's vaccine schedule with ease
                        </motion.h1>

                        {/* Description and CTA */}
                        <div className='space-y-8 text-center'>
                            <motion.p
                                variants={heroDescriptionVariants}
                                className='text-white text-xl font-medium max-w-2xl drop-shadow-lg'>
                                Ensure your optimal health with personalized infusions.
                            </motion.p>

                            {/* CTA Button */}
                            <motion.button
                                variants={heroButtonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className='px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full 
                                font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30
                                border-2 border-transparent hover:border-white/20'>
                                Get Started Now
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* About Us Section */}
            <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="max-w-7xl mx-auto px-4 py-16"
                id='about'>
                {/* Section Header */}
                <motion.div
                    variants={slideUp}
                    className="text-center mb-12">
                    <span className="text-blue-500 font-semibold text-sm tracking-wider uppercase">Who We Are</span>
                    <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">
                        About <span className="text-blue-500">Us</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto rounded-full"></div>
                </motion.div>

                {/* Content Container */}
                <div className='flex flex-row items-center gap-12 bg-white border border-gray-100 rounded-3xl p-8 shadow-lg'>
                    {/* Image Section */}
                    <motion.div
                        variants={slideFromLeft}
                        className='flex-1 relative'>
                        <div className="absolute inset-0 bg-blue-500/10 rounded-3xl transform -rotate-6"></div>
                        <div className="relative overflow-hidden rounded-3xl">
                            <img
                                src={img8}
                                alt="About Us"
                                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent"></div>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        variants={slideFromRight}
                        className='flex-1 space-y-8 px-6'>
                        <div className="space-y-6">
                            <h3 className="text-3xl font-bold text-gray-800 leading-tight">
                                Empowering Parents for Better Child Healthcare
                            </h3>

                            <p className="text-gray-600 leading-relaxed">
                                Our mission is to provide parents with a comprehensive and easy-to-use platform for managing their children's vaccination schedules. We believe in making healthcare management simple, accessible, and efficient for every family.
                            </p>

                            {/* Stats */}
                            <motion.div
                                variants={staggerContainer}
                                className="grid grid-cols-3 gap-6 py-6">
                                <motion.div variants={slideFromLeft} className="text-center">
                                    <div className="text-3xl font-bold text-blue-500">10k+</div>
                                    <div className="text-sm text-gray-600 mt-1">Happy Parents</div>
                                </motion.div>
                                <motion.div variants={slideUp} className="text-center">
                                    <div className="text-3xl font-bold text-blue-500">15+</div>
                                    <div className="text-sm text-gray-600 mt-1">Years Experience</div>
                                </motion.div>
                                <motion.div variants={slideFromRight} className="text-center">
                                    <div className="text-3xl font-bold text-blue-500">98%</div>
                                    <div className="text-sm text-gray-600 mt-1">Satisfaction Rate</div>
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
                                        className='px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 font-medium flex items-center gap-2'>
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
                className="text-center mb-12"
                id='variants'>
                <motion.div variants={slideUp}>
                    <span className="text-blue-500 font-semibold text-sm tracking-wider uppercase">Our Products</span>
                    <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">
                        Best <span className="text-blue-500">Vaccines</span> Available
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto rounded-full"></div>
                    <p className="text-gray-600 max-w-[30rem] mx-auto mt-4">
                        Choose from our selection of high-quality vaccines, carefully selected for your child's health and safety
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    className='container mx-auto px-4 py-8'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative'>
                        {bestVaccine?.length > 0 ? (
                            bestVaccine.map((vaccine) => (
                                <motion.div
                                    key={`vaccine-${vaccine.id}`}
                                    variants={cardVariants}
                                    whileHover="hover">
                                    <Variants
                                        key={`vaccine-${vaccine.id}`}
                                        id={vaccine.id}
                                        image={vaccine.image}
                                        name={vaccine.name}
                                        description={vaccine.description}
                                        type="vaccine"
                                        priceGoc={null}
                                        priceSale={vaccine.price}
                                        country={vaccine.fromCountry}
                                        onClick={() => handleAddToCart(vaccine, 'vaccine')}
                                        isBooking={isBooking}
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <div className="loader absolute right-[50%] left-[45%]"></div>
                        )}
                    </div>
                    <div className='flex justify-end mt-8'>
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/variantsPage')}
                            className='group px-6 py-2.5 bg-white border-2 border-blue-500 rounded-full hover:bg-blue-500 flex items-center gap-2'>
                            <span className='font-medium text-blue-500 group-hover:text-white transition-colors'>
                                View All Vaccines
                            </span>
                            <svg
                                className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors transform group-hover:translate-x-1"
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
                className="max-w-7xl mx-auto px-4 py-16"
                id='news'>
                {/* News Header */}
                <div className="text-center mb-12">
                    <span className="text-blue-500 font-semibold text-sm tracking-wider uppercase">Latest Updates</span>
                    <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">
                        Latest <span className="text-blue-500">News</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto rounded-full"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                        Stay updated with the latest healthcare information and vaccine developments
                    </p>
                </div>


                {/* News Cards Container */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    <motion.div variants={slideFromLeft}>
                        <News
                            label={"Healthcare"}
                            date={"08/01/2025"}
                            title={"New vaccines against seasonal flu are now available"}
                            image={img2}
                            description={"New generation flu vaccines, which are more effective in preventing common virus strains, are now available at our facilities..."}
                            author={"Dr. Johnson"}
                        />
                    </motion.div>
                    <motion.div variants={slideFromRight}>
                        <News
                            label={"Updates"}
                            date={"07/28/2025"}
                            title={"Healthcare system implements new digital records"}
                            image={img4}
                            description={"Digital transformation in healthcare brings new opportunities for better patient care and streamlined operations..."}
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
                className="max-w-7xl mx-auto px-4 py-16"
                id='benefits'>
                <motion.div variants={slideUp} className="text-center mb-16">
                    <span className="text-blue-500 font-semibold text-base tracking-wider uppercase">Services</span>
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Benefits for <span className="text-blue-500">Parents</span>
                    </h2>
                    <div className=" mb-4 w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto rounded-full"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover how our platform makes managing your child's healthcare journey easier and more efficient
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    className='grid grid-cols-3 gap-12'>
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
                    <motion.div
                        variants={slideFromRight}
                        whileHover={{ scale: 1.05, y: -10 }}>
                        <BenefitforParents
                            image={img7}
                            title={"Expert Support"}
                            description={"Get instant access to healthcare professionals and expert advice for your child's health needs."}
                        />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Feedback Section */}
            <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="max-w-7xl mx-auto px-4 py-16"
                id='feedback'>
                <motion.div variants={slideUp} className="text-center mb-12">
                    <span className="text-blue-500 font-semibold text-sm tracking-wider uppercase">Testimonials</span>
                    <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">
                        Parent's <span className="text-blue-500">Feedback</span>
                    </h2>
                    <div className=" mb-4 w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto rounded-full"></div>
                    <p className="text-gray-600">
                        What our parents say about us
                    </p>
                </motion.div>
                <div className='flex justify-end mb-8'>
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('feedbackPage')}
                        className='group px-6 py-2.5 bg-white border-2 border-blue-500 rounded-full hover:bg-blue-500 flex items-center gap-2'>
                        <span className='font-medium text-blue-500 group-hover:text-white transition-colors'>
                            View All Feedback
                        </span>
                        <svg
                            className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors transform group-hover:translate-x-1"
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
                <motion.div
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <motion.div
                        variants={slideFromLeft}
                        whileHover={{ scale: 1.05, y: -10 }}>
                        <FeedbackParent
                            randomNumber={5}
                            image={img12}
                            description={"The doctors here are kind and patient, making my child feel comfortable and at ease during every visit. A wonderful experience!"}
                            babyName={"John"}
                            username={"Sarah Johnson"}
                        />
                    </motion.div>
                    <motion.div
                        variants={slideUp}
                        whileHover={{ scale: 1.05, y: -10 }}>
                        <FeedbackParent
                            randomNumber={5}
                            image={img12}
                            description={"The vaccination tracking system has made it so much easier to stay on top of my children's immunization schedule. Highly recommended!"}
                            babyName={"John"}
                            username={"Michael Chen"}
                        />
                    </motion.div>
                    <motion.div
                        variants={slideFromRight}
                        whileHover={{ scale: 1.05, y: -10 }}>
                        <FeedbackParent
                            randomNumber={5}
                            image={img12}
                            description={"The reminders and notifications have been a lifesaver. I never miss an important vaccination appointment anymore!"}
                            babyName={"John"}
                            username={"Emma Davis"}
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}