import formatCurrency from '../../utils/calculateMoney';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VaccinesIcon from '@mui/icons-material/Vaccines';

const ComboCard = ({ id, image, name, description, priceSale, onClick, priceGoc, isBooking, vaccines, discount, handleSelectCombo }) => {
  const isBooked = isBooking?.some(bookingId => bookingId === `combo-${id}`);
  const hasEnoughQuantity = vaccines.every(vaccine => vaccine.quantity > 0);
  const checkQuanlitNearSoldOut = vaccines.some(vaccine => vaccine.quantity <= 5 && vaccine.quantity > 0);
  return (
    <div className='bg-white rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100'>
      <div className='space-y-4'>
        {/* Combo Image */}
        <div className='bg-blue-50 rounded-2xl p-4 flex items-center justify-center h-48'>
          <img src={image} alt={name} className='max-h-full object-contain' />
        </div>

        {/* Combo Details */}
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold text-gray-800'>{name}</h2>
            <InfoOutlinedIcon
              onClick={handleSelectCombo}
              className='text-blue-400 cursor-pointer'
            />
          </div>

          <p className="text-gray-600 text-sm mb-4 w-full truncate">{description}</p>

          {/* Included Vaccines */}
          {vaccines && vaccines.length > 0 && (
            <div className='bg-blue-50 p-4 rounded-xl'>
              <h3 className='text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2'>
                <VaccinesIcon className='w-5 h-5 text-blue-600' /> Included Vaccines
              </h3>
              <ul className='space-y-2'>
                {vaccines.map((vaccine, index) => (
                  <li key={index} className='flex items-center justify-between bg-white p-2 rounded-lg'>
                    <span className='flex items-center gap-2'>
                      <span className={`w-2 h-2 rounded-full ${checkQuanlitNearSoldOut ? 'bg-yellow-500' : vaccine.quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className='text-sm font-medium'>{vaccine.name}</span>
                    </span>
                    <div className='flex items-center gap-3'>
                      {/* <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full'>
                        {vaccine.suggestAgeMin}-{vaccine.suggestAgeMax}y
                      </span> */}
                      {
                        checkQuanlitNearSoldOut ? (
                          <span className='text-xs text-yellow-600'>Only {vaccine.quantity} doses</span>
                        ) : (
                          <span className={`text-xs font-semibold ${vaccine.quantity > 0 ? 'text-green-600' : vaccine.quantity < 5 && vaccine.quantity > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {vaccine.quantity} doses
                          </span>
                        )
                      }
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

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
              onClick={hasEnoughQuantity ? onClick : undefined}
              disabled={!hasEnoughQuantity}
              className={`px-4 py-2 rounded-lg transition-colors duration-300 text-white 
                ${!hasEnoughQuantity ? 'bg-gray-300 cursor-not-allowed' : isBooked ? 'bg-gray-400 hover:bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {hasEnoughQuantity ? (isBooked ? 'Booking' : 'Book Now') : 'No Quantity'}
            </button>
          </div>
        </div>

        {/* Savings Info */}
        {priceGoc && (
          <div className='bg-green-50 p-3 rounded-lg flex items-center justify-between'>
            <span className='text-sm font-medium text-green-800'>You Save:</span>
            <span className='text-sm font-bold text-green-800'>
              {formatCurrency(priceGoc - priceSale)} VND ({discount}% off)
            </span>
          </div>
        )}

        {/* Clinic Info */}
        <div className='pt-4 border-t border-gray-100'>
          <div className='flex items-center gap-2 justify-between'>
            <span className='text-gray-600 text-sm'>Available at: Central Medical Clinic</span>
            <span className='text-gray-600 text-sm'>Combo Package</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComboCard;