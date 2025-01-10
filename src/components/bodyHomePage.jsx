import img from '../assets/p1.webp'
import img2 from '../assets/p2.webp'
import img3 from '../assets/p3.jpg'
import img4 from '../assets/p4.webp'
import img5 from '../assets/p5.jpg'
import img6 from '../assets/p6.webp'
import img7 from '../assets/p7.webp'
import img8 from '../assets/p8.webp'
import img9 from '../assets/p9.jpg'
import img10 from '../assets/p10.jpg'
import img11 from '../assets/p11.jpg'
import img12 from '../assets/p12.jpg'



import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsHoldingChild } from "@fortawesome/free-solid-svg-icons";

export default function BodyHomePage() {
    return (
        <div className="max-w-7xl mx-auto mt-[125px] px-4 py-2 z-0 ">
            <div className='relative flex flex-col items-center'>

                <img
                    src={img}
                    alt="Vaccine Schedule"
                    className="w-full h-[600px] object-cover rounded-3xl shadow-xl"
                />

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
            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="text-blue-500 font-semibold text-sm tracking-wider uppercase">Who We Are</span>
                    <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">
                        About <span className="text-blue-500">Us</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto rounded-full"></div>
                </div>

                {/* Content Container */}
                <div className='flex flex-row items-center gap-12 bg-white border border-gray-100 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300'>
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
                            <div className="flex items-center gap-4 pt-4">
                                <button className='px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 font-medium flex items-center gap-2'>
                                    Learn More
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Best Vaccines Section Header */}
            <div className="text-center mb-12">
                <span className="text-blue-500 font-semibold text-sm tracking-wider uppercase">Our Products</span>
                <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">
                    Best <span className="text-blue-500">Vaccines</span> Available
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto rounded-full"></div>
                <p className="text-gray-600 max-w-[30rem] mx-auto mt-4">
                    Choose from our selection of high-quality vaccines, carefully selected for your child's health and safety
                </p>
            </div>

            <div className='container mx-auto px-4 py-8'>



                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {/* Vaccine Card */}
                    <div className='bg-white rounded-3xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100'>
                        <div className='space-y-4'>
                            {/* Vaccine Image Placeholder */}
                            <div className='bg-blue-50 rounded-2xl p-4 flex items-center justify-center h-48'>
                                <img
                                    src={img9}
                                    alt="Vaccine A"
                                    className='max-h-full object-contain'
                                />
                            </div>

                            {/* Vaccine Details */}
                            <div className='space-y-3'>
                                <h2 className='text-xl font-semibold text-gray-800'>Vaccine A</h2>
                                <p className='text-gray-600 text-sm'>High-quality vaccine with proven effectiveness</p>

                                {/* Origin */}
                                <div className='flex items-center gap-2 text-gray-500'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                                    </svg>
                                    <span className='text-sm'>Origin: USA</span>
                                </div>

                                {/* Price */}
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-1 text-blue-600'>
                                        <LocalOfferOutlinedIcon className='h-5 w-5' />
                                        <span className='font-semibold'>1,000,000 VND</span>
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
                    {/* Repeat the same card structure for other vaccines */}
                    {/* Vaccine Card */}
                    <div className='bg-white rounded-3xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100'>
                        <div className='space-y-4'>
                            {/* Vaccine Image Placeholder */}
                            <div className='bg-blue-50 rounded-2xl p-4 flex items-center justify-center h-48'>
                                <img
                                    src={img10}
                                    alt="Vaccine A"
                                    className='max-h-full object-contain'
                                />
                            </div>

                            {/* Vaccine Details */}
                            <div className='space-y-3'>
                                <h2 className='text-xl font-semibold text-gray-800'>Vaccine A</h2>
                                <p className='text-gray-600 text-sm'>High-quality vaccine with proven effectiveness</p>

                                {/* Origin */}
                                <div className='flex items-center gap-2 text-gray-500'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                                    </svg>
                                    <span className='text-sm'>Origin: USA</span>
                                </div>

                                {/* Price */}
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-1 text-blue-600'>
                                        <LocalOfferOutlinedIcon className='h-5 w-5' />
                                        <span className='font-semibold'>1,000,000 VND</span>
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
                    {/* Repeat the same card structure for other vaccines */}
                    {/* Vaccine Card */}
                    <div className='bg-white rounded-3xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100'>
                        <div className='space-y-4'>
                            {/* Vaccine Image Placeholder */}
                            <div className='bg-blue-50 rounded-2xl p-4 flex items-center justify-center h-48'>
                                <img
                                    src={img11}
                                    alt="Vaccine A"
                                    className='max-h-full object-contain'
                                />
                            </div>

                            {/* Vaccine Details */}
                            <div className='space-y-3'>
                                <h2 className='text-xl font-semibold text-gray-800'>Vaccine A</h2>
                                <p className='text-gray-600 text-sm'>High-quality vaccine with proven effectiveness</p>

                                {/* Origin */}
                                <div className='flex items-center gap-2 text-gray-500'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                                    </svg>
                                    <span className='text-sm'>Origin: USA</span>
                                </div>

                                {/* Price */}
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-1 text-blue-600'>
                                        <LocalOfferOutlinedIcon className='h-5 w-5' />
                                        <span className='font-semibold'>1,000,000 VND</span>
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
                    {/* Repeat the same card structure for other vaccines */}

                </div>
                <div className='flex justify-end mt-8'>
                    <button className='group px-6 py-2.5 bg-white border-2 border-blue-500 rounded-full hover:bg-blue-500  flex items-center gap-2 '>
                        <span className='font-medium text-blue-500 group-hover:text-white transition-colors'>View All Vaccines</span>
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
            <div className="max-w-7xl mx-auto px-4 py-16">
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
                    {/* News Card 1 */}
                    <div className='bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1'>
                        <div className='flex flex-col md:flex-row h-full'>
                            {/* Image Container */}
                            <div className='md:w-2/5 h-60 md:h-auto relative overflow-hidden'>
                                <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent z-10'></div>
                                <img
                                    src={img2}
                                    alt="Flu Vaccine News"
                                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                                />
                            </div>

                            {/* Content Container */}
                            <div className='md:w-3/5 p-6 md:p-8 flex flex-col justify-between'>
                                <div className='space-y-4'>
                                    <div className='flex flex-wrap items-center gap-3'>
                                        <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-500 rounded-full">
                                            Healthcare
                                        </span>
                                        <span className='text-gray-400 text-sm flex items-center gap-1'>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            08/01/2025
                                        </span>
                                    </div>

                                    <h2 className='text-xl font-bold text-gray-800 leading-tight group-hover:text-blue-500 transition-colors'>
                                        New vaccines against seasonal flu are now available
                                    </h2>

                                    <p className='text-gray-600 text-sm leading-relaxed line-clamp-3'>
                                        New generation flu vaccines, which are more effective in preventing common virus strains, are now available at our facilities...
                                    </p>
                                </div>

                                <div className='flex items-center justify-between mt-6 pt-6 border-t border-gray-100'>
                                    <div className='flex items-center gap-3'>
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-blue-500 font-semibold text-sm">DJ</span>
                                        </div>
                                        <span className='text-sm text-gray-600'>Dr. Johnson</span>
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

                    {/* News Card 2 */}
                    <div className='bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1'>
                        <div className='flex flex-col md:flex-row-reverse h-full'>
                            {/* Image Container */}
                            <div className='md:w-2/5 h-60 md:h-auto relative overflow-hidden'>
                                <div className='absolute inset-0 bg-gradient-to-l from-green-500/20 to-transparent z-10'></div>
                                <img
                                    src={img4}
                                    alt="Healthcare Update"
                                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                                />
                            </div>

                            {/* Content Container */}
                            <div className='md:w-3/5 p-6 md:p-8 flex flex-col justify-between'>
                                <div className='space-y-4'>
                                    <div className='flex flex-wrap items-center gap-3'>
                                        <span className="text-xs font-semibold px-3 py-1 bg-green-50 text-green-500 rounded-full">
                                            Updates
                                        </span>
                                        <span className='text-gray-400 text-sm flex items-center gap-1'>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            07/28/2025
                                        </span>
                                    </div>

                                    <h2 className='text-xl font-bold text-gray-800 leading-tight group-hover:text-green-500 transition-colors'>
                                        Healthcare system implements new digital records
                                    </h2>

                                    <p className='text-gray-600 text-sm leading-relaxed line-clamp-3'>
                                        Digital transformation in healthcare brings new opportunities for better patient care and streamlined operations...
                                    </p>
                                </div>

                                <div className='flex items-center justify-between mt-6 pt-6 border-t border-gray-100'>
                                    <div className='flex items-center gap-3'>
                                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                            <span className="text-green-500 font-semibold text-sm">MC</span>
                                        </div>
                                        <span className='text-sm text-gray-600'>Dr. Chen</span>
                                    </div>
                                    <button className='group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-400 text-white rounded-full hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 text-sm font-medium'>
                                        Read More
                                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* {Benefits parents} */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* Section Header */}
                <div className="text-center mb-16">
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
                    <div className='group hover:-translate-y-2 transition-all duration-300'>
                        <div className='flex flex-col items-center space-y-6'>
                            {/* Image Container */}
                            <div className='relative w-48 h-48'>
                                <div className='absolute inset-0 bg-blue-500/10 rounded-full group-hover:scale-110 transition-transform duration-300'></div>
                                <div className='absolute inset-2 bg-blue-500/20 rounded-full group-hover:scale-110 transition-transform duration-500'></div>
                                <img
                                    className='relative w-full h-full rounded-full object-cover p-4 bg-white shadow-lg group-hover:shadow-xl transition-all duration-300'
                                    src={img5}
                                    alt="Vaccination Schedule"
                                />
                            </div>

                            {/* Content */}
                            <div className='text-center space-y-4 px-6'>
                                <h3 className='text-xl font-bold text-gray-800'>
                                    Easy Schedule Management
                                </h3>
                                <p className='text-gray-600 leading-relaxed'>
                                    Helps parents easily manage their children's vaccination schedules with automated reminders and clear timelines.
                                </p>
                            </div>

                            {/* Learn More Link */}
                            <a href="#" className='flex items-center text-blue-500 font-medium hover:text-blue-600 transition-colors group-hover:translate-x-2 duration-300'>
                                Learn More
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Benefit Card 2 */}
                    <div className='group hover:-translate-y-2 transition-all duration-300'>
                        <div className='flex flex-col items-center space-y-6'>
                            {/* Similar structure with different content */}
                            <div className='relative w-48 h-48'>
                                <div className='absolute inset-0 bg-green-500/10 rounded-full group-hover:scale-110 transition-transform duration-300'></div>
                                <div className='absolute inset-2 bg-green-500/20 rounded-full group-hover:scale-110 transition-transform duration-500'></div>
                                <img
                                    className='relative w-full h-full rounded-full object-cover p-4 bg-white shadow-lg group-hover:shadow-xl transition-all duration-300'
                                    src={img6}
                                    alt="Health Records"
                                />
                            </div>
                            <div className='text-center space-y-4 px-6'>
                                <h3 className='text-xl font-bold text-gray-800'>
                                    Avoid missing important shots.
                                </h3>
                                <p className='text-gray-600 leading-relaxed'>
                                    Access and manage your child's complete health records anytime, anywhere with secure digital storage.
                                </p>
                            </div>
                            <a href="#" className='flex items-center text-green-500 font-medium hover:text-green-600 transition-colors group-hover:translate-x-2 duration-300'>
                                Learn More
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Benefit Card 3 */}
                    <div className='group hover:-translate-y-2 transition-all duration-300'>
                        <div className='flex flex-col items-center space-y-6'>
                            {/* Similar structure with different content */}
                            <div className='relative w-48 h-48'>
                                <div className='absolute inset-0 bg-purple-500/10 rounded-full group-hover:scale-110 transition-transform duration-300'></div>
                                <div className='absolute inset-2 bg-purple-500/20 rounded-full group-hover:scale-110 transition-transform duration-500'></div>
                                <img
                                    className='relative w-full h-full rounded-full object-cover p-4 bg-white shadow-lg group-hover:shadow-xl transition-all duration-300'
                                    src={img7}
                                    alt="Expert Support"
                                />
                            </div>
                            <div className='text-center space-y-4 px-6'>
                                <h3 className='text-xl font-bold text-gray-800'>
                                    Expert Support
                                </h3>
                                <p className='text-gray-600 leading-relaxed'>
                                    Get instant access to healthcare professionals and expert advice for your child's health needs.
                                </p>
                            </div>
                            <a href="#" className='flex items-center text-purple-500 font-medium hover:text-purple-600 transition-colors group-hover:translate-x-2 duration-300'>
                                Learn More
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            {/* Feedback */}
            <div className="max-w-7xl mx-auto px-4 py-16">
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
                                    "The doctors here are kind and patient, making my child feel comfortable and at ease during every visit. A wonderful experience!"
                                </p>
                            </div>

                            {/* Author Info */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={img12}
                                        alt="Parent"
                                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Sarah Johnson</h4>
                                        <p className="text-sm text-gray-500">Parent of 2</p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, index) => (
                                        <StarOutlinedIcon
                                            key={index}
                                            className={`w-5 h-5 ${index < 4 ? 'text-yellow-400' : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feedback Card 2 */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        {/* Similar structure as Card 1, but with different content */}
                        <div className="flex flex-col h-full">
                            <div className="mb-6">
                                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                                    <FontAwesomeIcon
                                        icon={faHandsHoldingChild}
                                        className="text-green-500 text-xl"
                                    />
                                </div>
                            </div>
                            <div className="flex-grow">
                                <p className="text-gray-600 leading-relaxed italic mb-6">
                                    "The vaccination tracking system has made it so much easier to stay on top of my children's immunization schedule. Highly recommended!"
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={img12}
                                        alt="Parent"
                                        className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Michael Chen</h4>
                                        <p className="text-sm text-gray-500">Parent of 3</p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, index) => (
                                        <StarOutlinedIcon
                                            key={index}
                                            className="w-5 h-5 text-yellow-400"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feedback Card 3 */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        {/* Similar structure as Card 1, but with different content */}
                        <div className="flex flex-col h-full">
                            <div className="mb-6">
                                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                                    <FontAwesomeIcon
                                        icon={faHandsHoldingChild}
                                        className="text-purple-500 text-xl"
                                    />
                                </div>
                            </div>
                            <div className="flex-grow">
                                <p className="text-gray-600 leading-relaxed italic mb-6">
                                    "The reminders and notifications have been a lifesaver. I never miss an important vaccination appointment anymore!"
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={img12}
                                        alt="Parent"
                                        className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Emma Davis</h4>
                                        <p className="text-sm text-gray-500">Parent of 1</p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, index) => (
                                        <StarOutlinedIcon
                                            key={index}
                                            className={`w-5 h-5 ${index < 4 ? 'text-yellow-400' : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


           
        </div>
    )
}