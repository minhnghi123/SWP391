import { Link } from 'react-router-dom';
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
                {/* <div className="flex items-center gap-4 pt-4">
                    <button className='px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 font-medium flex items-center gap-2'>
                        <Link to="/aboutPage">Learn More</Link>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>

                </div> */}
            </div>
        </div>
    )
}
export default BenefitforParents