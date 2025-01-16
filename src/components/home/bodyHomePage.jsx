import img from '../../assets/p1.webp'
import img2 from '../../assets/p2.webp'
import img3 from '../../assets/p3.jpg'
import img4 from '../../assets/p4.webp'
import img5 from '../../assets/p5.jpg'
import img6 from '../../assets/p6.webp'
import img7 from '../../assets/p7.webp'
import img8 from '../../assets/p8.webp'
import img9 from '../../assets/p9.jpg'
import img10 from '../../assets/p10.jpg'
import img11 from '../../assets/p11.jpg'
import img12 from '../../assets/p12.jpg'



import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsHoldingChild } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from 'react';
import formatCurrency from '../../utils/calculateMony'
import pictureBody from '../../../bodyPicture.json'
// import VariantsPage from '../pages/variantsPage'
// import AboutPage from '../pages/aboutPage'
import { Link } from 'react-router-dom'

const Variants = ({ image, title, description, country, price }) => {
    return (
        <div className='bg-white rounded-3xl p-6 hover:shadow-xl hover:scale-105  transition-all duration-300 border border-gray-100'>
            <div className='space-y-4'>
                {/* Vaccine Image Placeholder */}
                <div className='bg-blue-50 rounded-2xl p-4 flex items-center justify-center h-48'>
                    <img
                        src={image}
                        alt="Vaccine A"
                        className='max-h-full object-contain'
                    />
                </div>

                {/* Vaccine Details */}
                <div className='space-y-3'>
                    <h2 className='text-xl font-semibold text-gray-800'>{title}</h2>
                    <p className='text-gray-600 text-sm'>{description}</p>

                    {/* Origin */}
                    <div className='flex items-center gap-2 text-gray-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                        </svg>
                        <span className='text-sm'>Origin: {country}</span>
                    </div>

                    {/* Price */}
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-1 text-blue-600'>
                            <LocalOfferOutlinedIcon className='h-5 w-5' />
                            <span className='font-semibold'>{formatCurrency(price)} VND</span>
                        </div>
                        <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300'>
                            Book Now
                        </button>
                    </div>
                </div>

                {/* Clinic Info */}
                <div className='pt-4 border-t border-gray-100'>
                    <div className='flex items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className='text-gray-600 text-sm'>Available at: Central Medical Clinic</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
const FeedbackParent = ({ image, description, babyName, parentName, randomNumber }) => {
    return (
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col h-full">
                {/* Icon */}
                <div className="mb-6">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon
                            icon={faHandsHoldingChild}
                            className="text-blue-500 text-xl"
                        />
                    </div>
                </div>

                {/* Quote */}
                <div className="flex-grow">
                    <p className="text-gray-600 leading-relaxed italic mb-6">
                        {description}
                    </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src={image}
                            alt="Parent"
                            className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                        />
                        <div>
                            <h4 className="font-semibold text-gray-800">{parentName}</h4>
                            <p className="text-sm text-gray-500">{babyName}</p>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        {
                            randomNumber === 1 ?
                                [...Array(5)].map((_, index) => (
                                    <StarOutlinedIcon
                                        key={index}
                                        className={`w-5 h-5 ${index < 4 ? 'text-yellow-400' : 'text-gray-300'
                                            }`}
                                    />
                                )) : (
                                    [...Array(5)].map((_, index) => (
                                        <StarOutlinedIcon
                                            key={index}
                                            className="w-5 h-5 text-yellow-400"
                                        />
                                    ))
                                )
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}
const BenefitforParents = ({ image, title, description }) => {
    return (
        <div className='group hover:-translate-y-2 transition-all duration-300'>
            <div className='flex flex-col items-center space-y-6'>
                {/* Image Container */}
                <div className='relative w-48 h-48'>
                    <div className='absolute inset-0 bg-blue-500/10 rounded-full group-hover:scale-110 transition-transform duration-300'></div>
                    <div className='absolute inset-2 bg-blue-500/20 rounded-full group-hover:scale-110 transition-transform duration-500'></div>
                    <img
                        className='relative w-full h-full rounded-full object-cover p-4 bg-white shadow-lg group-hover:shadow-xl transition-all duration-300'
                        src={image}
                        alt="Vaccination Schedule"
                    />
                </div>

                {/* Content */}
                <div className='text-center space-y-4 px-6'>
                    <h3 className='text-xl font-bold text-gray-800'>
                        {title}
                    </h3>
                    <p className='text-gray-600 leading-relaxed'>
                        {description}
                    </p>
                </div>

                {/* Learn More Link */}
                {/* <a href="#" className='flex items-center text-blue-500 font-medium hover:text-blue-600 transition-colors group-hover:translate-x-2 duration-300'>
                    Learn More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </a> */}
                <div className="flex items-center gap-4 pt-4">
                    <button className='px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 font-medium flex items-center gap-2'>
                        <Link to="/aboutPage">Learn More</Link>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>

                </div>
            </div>
        </div>
    )
}
const News = ({ label, title, description, image, date, author }) => {
    return (

        <div className='bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1'>
            <div className='flex flex-col md:flex-row h-full'>
                {/* Image Container */}
                <div className='md:w-2/5 h-60 md:h-auto relative overflow-hidden'>
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent z-10'></div>
                    <img
                        src={image}
                        alt="Flu Vaccine News"
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                    />
                </div>

                {/* Content Container */}
                <div className='md:w-3/5 p-6 md:p-8 flex flex-col justify-between'>
                    <div className='space-y-4'>
                        <div className='flex flex-wrap items-center gap-3'>
                            <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-500 rounded-full">
                                {label}
                            </span>
                            <span className='text-gray-400 text-sm flex items-center gap-1'>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {date}
                            </span>
                        </div>

                        <h2 className='text-xl font-bold text-gray-800 leading-tight group-hover:text-blue-500 transition-colors'>
                            {title}
                        </h2>

                        <p className='text-gray-600 text-sm leading-relaxed line-clamp-3'>
                            {description}
                        </p>
                    </div>

                    <div className='flex items-center justify-between mt-6 pt-6 border-t border-gray-100'>
                        <div className='flex items-center gap-3'>
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-500 font-semibold text-sm">DJ</span>
                            </div>
                            <span className='text-sm text-gray-600'>{author}</span>
                        </div>
                        <button className='group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 text-sm font-medium'>
                            Read More
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default function BodyHomePage() {
    const pictures = pictureBody;
    const [currentPicIndex, setCurrentPicIndex] = useState(0);
    // Automatic picture change
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPicIndex((prevIndex) =>
                prevIndex === pictures.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000); // Change picture every 3 seconds

        return () => clearInterval(interval);
    }, [pictures.length]);
    const randomNumber = () => {
        return Math.floor(Math.random() * 2);
    };

    return (
        <div className="max-w-7xl mx-auto mt-[125px] px-4 py-2 z-0  " id='home'>
            <div className='relative flex flex-col items-center '>
                {/* Picture Carousel */}
                <div className="relative w-full h-[600px] overflow-hidden rounded-3xl ">
                    {pictures.map((picture, index) => (
                        <img
                            key={picture.id}
                            src={picture.src}
                            alt={`Slide ${index + 1}`}
                            className={`
                                absolute w-full h-full object-cover transition-opacity duration-1000
                                ${index === currentPicIndex ? 'opacity-100' : 'opacity-0'}
                            `}
                        />
                    ))}
                </div>

                {/* Optional: Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                    {pictures.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPicIndex(index)}
                            className={`
                                w-4 h-4 rounded-full transition-all duration-300
                                ${index === currentPicIndex
                                    ? 'bg-slate-500 w-4'
                                    : 'bg-white/50 hover:bg-white/75'}
                            `}
                        />
                    ))}
                </div>

                {/* Overlay Content */}
                <div className='absolute inset-0 bg-gradient-to-b from-white/10 to-black/50 rounded-3xl'>
                    <div className='flex flex-col items-center justify-between h-full p-12'>
                        {/* Heading */}
                        <h1 className='text-blue-500 text-5xl font-bold text-center max-w-3xl leading-tight drop-shadow-lg'>
                            Track your child's vaccine schedule with ease
                        </h1>

                        {/* Description */}
                        <div className='space-y-8 text-center'>
                            <p className='text-white text-xl font-medium max-w-2xl drop-shadow-lg'>
                                Ensure your optimal health with personalized infusions.
                            </p>

                            {/* CTA Button */}
                            <button className='px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 transform hover:scale-105'>
                                Get Started Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/*About Us*/}
            <div className="max-w-7xl mx-auto px-4 py-16  " id='about'>
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="text-blue-500 font-semibold text-sm tracking-wider uppercase">Who We Are</span>
                    <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">
                        About <span className="text-blue-500">Us</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto rounded-full"></div>
                </div>

                {/* Content Container */}
                <div className='flex flex-row items-center gap-12 bg-white border border-gray-100 rounded-3xl p-8 shadow-lg 
                hover:shadow-xl hover:scale-105  transition-all duration-300'>
                    {/* Image Section */}
                    <div className='flex-1 relative'>
                        <div className="absolute inset-0 bg-blue-500/10 rounded-3xl transform -rotate-6"></div>
                        <div className="relative overflow-hidden rounded-3xl">
                            <img
                                src={img8}
                                alt="About Us"
                                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent"></div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className='flex-1 space-y-8 px-6'>
                        <div className="space-y-6">
                            <h3 className="text-3xl font-bold text-gray-800 leading-tight">
                                Empowering Parents for Better Child Healthcare
                            </h3>

                            <p className="text-gray-600 leading-relaxed">
                                Our mission is to provide parents with a comprehensive and easy-to-use platform for managing their children's vaccination schedules. We believe in making healthcare management simple, accessible, and efficient for every family.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 py-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-500">10k+</div>
                                    <div className="text-sm text-gray-600 mt-1">Happy Parents</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-500">15+</div>
                                    <div className="text-sm text-gray-600 mt-1">Years Experience</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-500">98%</div>
                                    <div className="text-sm text-gray-600 mt-1">Satisfaction Rate</div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <Link to="/aboutPage">
                                <div className="flex items-center gap-4 pt-4">
                                    <button className='px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 font-medium flex items-center gap-2'>
                                        Learn More
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>

                                </div>

                            </Link>

                        </div>
                    </div>
                </div>
            </div>
            {/* Best Vaccines Section Header */}
            <div className="text-center mb-12" id='variants'>
                <span className="text-blue-500 font-semibold text-sm tracking-wider uppercase">Our Products</span>
                <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">
                    Best <span className="text-blue-500">Vaccines</span> Available
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto rounded-full"></div>
                <p className="text-gray-600 max-w-[30rem] mx-auto mt-4">
                    Choose from our selection of high-quality vaccines, carefully selected for your child's health and safety
                </p>
            </div>

            <div className='container mx-auto px-4 py-8 '>



                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {/* Vaccine Card */}

                    <Variants
                        image={img9}
                        title={"Vaccine A"}
                        description={"High-quality vaccine with proven effectiveness"}
                        country={"USA"}
                        price={1000000} />

                    {/* Vaccine Card 2 */}

                    <Variants
                        image={img10}
                        title={"Vaccine B"}
                        description={"High-quality vaccine with proven effectiveness"}
                        country={"USA"} price={1000000} />

                    {/* Vaccine Card 3 */}

                    <Variants
                        image={img11}
                        title={"Vaccine C"}
                        description={"High-quality vaccine with proven effectiveness"}
                        country={"USA"}
                        price={1000000} />

                </div>
                <div className='flex justify-end mt-8'>
                    <button className='group px-6 py-2.5 bg-white border-2 border-blue-500 rounded-full hover:bg-blue-500  flex items-center gap-2 '>
                        {/* <span className='font-medium text-blue-500 group-hover:text-white transition-colors'>View All Vaccines</span> */}
                        <span className='font-medium text-blue-500 group-hover:text-white transition-colors'>
                            <Link to="/variantsPage">View All Vaccines</Link>
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
                    </button>
                </div>
            </div>

            {/*News Section*/}
            <div className="max-w-7xl mx-auto px-4 py-16" id='news'>
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
                    <News label={"Healthcare"} date={"08/01/2025"} title={"New vaccines against seasonal flu are now available"} image={img2} description={"New generation flu vaccines, which are more effective in preventing common virus strains, are now available at our facilities..."} author={"Dr. Johnson"} />
                    <News label={"Updates"} date={"07/28/2025"} title={"Healthcare system implements new digital records"} image={img4} description={"Digital transformation in healthcare brings new opportunities for better patient care and streamlined operations..."} author={"Dr. Chen"} />
                </div>
            </div>

            {/* {Benefits parents} */}
            <div className="max-w-7xl mx-auto px-4 py-16" id='benefits'>
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-blue-500 font-semibold text-base tracking-wider uppercase">Services</span>
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Benefits for <span className="text-blue-500">Parents</span>
                    </h2>
                    <div className=" mb-4 w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto rounded-full"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover how our platform makes managing your child's healthcare journey easier and more efficient
                    </p>
                </div>

                {/* Benefits Cards */}
                <div className='grid grid-cols-3 gap-12'>
                    {/* Benefit Card 1 */}

                    <BenefitforParents
                        image={img5} title={"Easy Schedule Management"}
                        description={"Helps parents easily manage their children's vaccination schedules with automated reminders and clear timelines."} />

                    {/* Benefit Card 2 */}

                    <BenefitforParents
                        image={img6} title={"Avoid missing important shots."}
                        description={"Access and manage your child's complete health records anytime, anywhere with secure digital storage."} />

                    {/* Benefit Card 3 */}

                    <BenefitforParents
                        image={img7} title={"Expert Support"}
                        description={"Get instant access to healthcare professionals and expert advice for your child's health needs."} />
                </div>
            </div>


            {/* Feedback */}
            <div className="max-w-7xl mx-auto px-4 py-16" id='feedback'>
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="text-blue-500 font-semibold text-sm tracking-wider uppercase">Testimonials</span>
                    <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">
                        Parent's <span className="text-blue-500">Feedback</span>
                    </h2>
                    <div className=" mb-4 w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto rounded-full"></div>
                    <p className="text-gray-600">
                        What our parents say about us
                    </p>
                </div>

                {/* Feedback Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feedback Card 1 */}
                    <FeedbackParent
                        randomNumber={randomNumber()}
                        image={img12}
                        description={"The doctors here are kind and patient, making my child feel comfortable and at ease during every visit. A wonderful experience!"}
                        babyName={"John"}
                        parentName={"Sarah Johnson"} />

                    {/* Feedback Card 2 */}

                    <FeedbackParent
                        randomNumber={randomNumber()}
                        image={img12}
                        description={"The vaccination tracking system has made it so much easier to stay on top of my children's immunization schedule. Highly recommended!"}
                        babyName={"John"}
                        parentName={"Michael Chen"} />

                    {/* Feedback Card 3 */}

                    <FeedbackParent
                        randomNumber={randomNumber()}
                        image={img12} description={"The reminders and notifications have been a lifesaver. I never miss an important vaccination appointment anymore!"}
                        babyName={"John"}
                        parentName={"Emma Davis"} />
                </div>
            </div>



        </div>
    )
}