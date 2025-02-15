
import formatCurrency from '../../utils/calculateMoney';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate} from 'react-router-dom';



const Variants = ({id, image, name, description, country, priceSale, onClick, type, priceGoc, isBooking }) => {
    const navigate = useNavigate();
    const isBooked = isBooking && isBooking.includes(id);

    return (
        <div  className='bg-white rounded-3xl p-6 hover:shadow-xl hover:scale-105  transition-all duration-300 border border-gray-100'>
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
                    <div className='flex items-center justify-between'>
                        <h2 className='text-xl font-semibold text-gray-800'>{name}</h2>
                        <InfoOutlinedIcon onClick={() => navigate(`/detailInformationVaccine/${type}/${id}`)} className='text-blue-400 cursor-pointer' />
                    </div>

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
                            <div className='flex flex-col'>
                                {priceGoc && (
                                    <span className='text-sm text-gray-500 line-through'>
                                        {formatCurrency(priceGoc)} VND
                                    </span>
                                )}
                                <span className='text-lg font-semibold text-red-500'>
                                    {formatCurrency(priceSale)} VND
                                </span>
                            </div>
                        </div>

                        {
                            <button
                                onClick={onClick}
                                className={`px-4 py-2 ${isBooked ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-lg hover:${isBooked ? 'bg-gray-500' : 'bg-blue-600'} transition-colors duration-300`}
                         
                            >
                                {isBooked ? 'Booking' : 'Book Now'}
                            </button>

                        }
                        {/* <button onClick={onClick} className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300'>
                            Book Now
                        </button> */}
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
export default Variants
