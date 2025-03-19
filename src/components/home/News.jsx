import { useState } from 'react'
import ModalLasterNews from './modalLasterNews'
import { motion } from 'framer-motion'
const News = ({ label, title, description, image, date, author }) => {
    const [isOpen, setIsOpen] = useState(false)
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
                        <button onClick={() => setIsOpen(true)} className='group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 text-sm font-medium'>
                            Read More
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {
                isOpen && <ModalLasterNews isOpen={isOpen} setIsOpen={setIsOpen} title={title} description={description} date={date} author={author} image={image} topic={label} />
            }
        </div>

    )
}
export default News