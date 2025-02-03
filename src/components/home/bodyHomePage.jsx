import img2 from '../../assets/p2.webp'
import img4 from '../../assets/p4.webp'
import img5 from '../../assets/p5.jpg'
import img6 from '../../assets/p6.webp'
import img7 from '../../assets/p7.webp'
import img8 from '../../assets/p8.webp'
import img12 from '../../assets/p12.jpg'
import { useState, useEffect, useContext } from 'react';
import pictureBody from '../../../bodyPicture.json'
import Variants from '../home/Variants'
import BenefitforParents from '../home/BenefitForParents'
import News from '../home/News'
import FeedbackParent from '../home/FeedbackParent'
import { Link, useNavigate } from 'react-router-dom'
import { VaccineContext } from '../Context/ChildrenSelected'
import { fetchData } from '../../Api/axios'

export default function BodyHomePage() {
    const navigate = useNavigate();
    const pictures = pictureBody;
    const [currentPicIndex, setCurrentPicIndex] = useState(0);
    const [bestVaccine, setBestVaccine] = useState()
    const {
        isBooking,
        handleBookVaccine,

    } = useContext(VaccineContext)

    
    useEffect(() => {
        fetchData('vaccine').
            then((res) => {
                if (res?.data) {
                    const sortedTop3 = [...res.data]
                        .sort((a, b) => b.price - a.price)
                        .slice(0, 3);
                    setBestVaccine(sortedTop3);
                }
                else {
                    alert("No data")
                }

            })
            .catch((err) => alert("Error"))
    }, [])


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
        <div className="max-w-7xl mx-auto mt-4 px-4 py-2 z-0  " id='home'>
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
                    {bestVaccine?.length > 0 ? (
                        bestVaccine.map((eachvaccine) => {
                            const priceSale = eachvaccine.discount
                                ? eachvaccine.price * (1 - eachvaccine.discount / 100)
                                : eachvaccine.price;

                            return (
                                <Variants
                                    key={eachvaccine.id}
                                    id={eachvaccine.id}
                                    image={eachvaccine.image || null}
                                    title={eachvaccine.name}
                                    description={eachvaccine.description}
                                    type={eachvaccine.discount ? 'combos' : 'vaccine'}
                                    priceGoc={eachvaccine.discount ? eachvaccine.price : null}
                                    priceSale={priceSale}
                                    isBooking={isBooking}
                                    onClick={() => handleBookVaccine(eachvaccine)}
                                />
                            );
                        })
                    ) : (
                        <p>Loading...</p>
                    )}



                </div>
                <div className='flex justify-end mt-8'>
                    <button onClick={() => navigate('/variantsPage')} className='group px-6 py-2.5 bg-white border-2 border-blue-500 rounded-full hover:bg-blue-500  flex items-center gap-2 '>
                        {/* <span clas=>sName='font-medium text-blue-500 group-hover:text-white transition-colors'>View All Vaccines</span> */}
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
                <div className='flex justify-end mb-8'>
                    <button onClick={() => navigate('feedbackPage')} className='group px-6 py-2.5 bg-white border-2 border-blue-500 rounded-full hover:bg-blue-500  flex items-center gap-2 '>

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
                    </button>
                </div>
                {/* Feedback Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Feedback Card 1 */}
                    <FeedbackParent
                        randomNumber={5}
                        image={img12}
                        description={"The doctors here are kind and patient, making my child feel comfortable and at ease during every visit. A wonderful experience!"}
                        babyName={"John"}
                        username={"Sarah Johnson"} />

                    {/* Feedback Card 2 */}

                    <FeedbackParent
                        randomNumber={5}
                        image={img12}
                        description={"The vaccination tracking system has made it so much easier to stay on top of my children's immunization schedule. Highly recommended!"}
                        babyName={"John"}
                        username={"Michael Chen"} />

                    {/* Feedback Card 3 */}

                    <FeedbackParent
                        randomNumber={5}
                        image={img12} description={"The reminders and notifications have been a lifesaver. I never miss an important vaccination appointment anymore!"}
                        babyName={"John"}
                        username={"Emma Davis"} />
                </div>
            </div>



        </div>
    )
}