import formatCurrency from '../../utils/calculateMoney';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from 'react-router-dom';

const VaccineCard = ({ id, image, name, description, country, priceSale, onClick, priceGoc, isBooking, maxAge, minAge, handleSelectVaccine }) => {
  const navigate = useNavigate();
  const isBooked = isBooking?.some(bookingId => bookingId === `vaccine-${id}`);

  return (
    <div className='bg-white rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100'>
      <div className='space-y-4'>

        {/* Vaccine Image */}
        <div className='bg-blue-50 rounded-2xl p-4 flex items-center justify-center h-48'>
          <img src={image} alt={name} className='max-h-full object-contain' />
        </div>

        {/* Vaccine Details */}
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold text-gray-800'>{name}</h2>
            <InfoOutlinedIcon onClick={handleSelectVaccine} className='text-blue-400 cursor-pointer' />
          </div>

          <p className="text-gray-600 text-sm mb-4 w-full truncate">{description}</p>

          {/* Origin and Age */}
          <div className='flex items-center gap-2 text-gray-500 text-sm justify-between'>
            <span className='text-sm'>Origin: {country}</span>
            <span className='text-sm'>Age: {minAge} - {maxAge}</span>
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

            {/* Booking Button */}
            <button
              onClick={onClick}
              className={`px-4 py-2 ${isBooked ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-lg hover:${isBooked ? 'bg-gray-500' : 'bg-blue-600'} transition-colors duration-300`}
            >
              {isBooked ? 'Booking' : 'Book Now'}
            </button>
          </div>
        </div>

        {/* Clinic Info */}
        <div className='pt-4 border-t border-gray-100'>
          <div className='flex items-center gap-2'>
            <span className='text-gray-600 text-sm'>Available at: Central Medical Clinic</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VaccineCard; 