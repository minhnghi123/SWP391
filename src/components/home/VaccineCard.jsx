import React, { useState, useEffect } from 'react';
import formatCurrency from '../../utils/calculateMoney';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import Detail from '../variants/DetailInformationVaccine'; // Adjust the import path

const VaccineCard = ({ id, image, name, description, country, priceSale, onClick, priceGoc, isBooking, maxAge, minAge, type = 'vaccine' }) => {
  const navigate = useNavigate();
  const isBooked = isBooking?.some(bookingId => bookingId === `vaccine-${id}`);
  const [showDetails, setShowDetails] = useState(false);
  const [displayMode, setDisplayMode] = useState('centered'); // 'centered' or 'fullscreen'

  // Toggle the details popup on click
  const handleToggleDetails = () => {
    setShowDetails((prev) => !prev);
    setDisplayMode('centered'); // Always start in centered mode
  };

  // Handle mouse leaving the entire document (viewport)
  const handleDocumentMouseLeave = (e) => {
    // Only trigger if the mouse leaves the viewport entirely
    if (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
      if (showDetails) {
        setDisplayMode('fullscreen');
      }
    }
  };

  // Handle mouse re-entering the document
  const handleDocumentMouseEnter = () => {
    if (showDetails && displayMode === 'fullscreen') {
      setDisplayMode('centered');
    }
  };

  // Set up document-level event listeners
  useEffect(() => {
    document.addEventListener('mouseleave', handleDocumentMouseLeave);
    document.addEventListener('mouseenter', handleDocumentMouseEnter);

    return () => {
      document.removeEventListener('mouseleave', handleDocumentMouseLeave);
      document.removeEventListener('mouseenter', handleDocumentMouseEnter);
    };
  }, [showDetails, displayMode]);

  // Close the popup
  const handleCloseDetails = () => {
    setShowDetails(false);
    setDisplayMode('centered');
  };

  return (
    <div className="bg-white/95 rounded-3xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 relative backdrop-blur-sm">
      <div className="space-y-4">
        {/* Vaccine Image */}
        <div className="bg-blue-50 rounded-2xl p-4 flex items-center justify-center h-48 shadow-sm">
          <img src={image} alt={name} className="max-h-full object-contain transition-transform duration-300 hover:scale-105" />
        </div>

        {/* Vaccine Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 truncate">{name}</h2>
            <InfoOutlinedIcon
              onClick={handleToggleDetails}
              className="text-blue-400 cursor-pointer hover:text-blue-600 transform hover:scale-110 transition-all duration-200"
            />
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

          {/* Origin and Age */}
          <div className="flex items-center gap-2 text-gray-500 text-sm justify-between">
            <span className="text-sm">Origin: {country}</span>
            <span className="text-sm">Age: {minAge} - {maxAge}</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-blue-600">
              <LocalOfferOutlinedIcon className="h-5 w-5 text-blue-500" />
              <div className="flex flex-col">
                {priceGoc && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatCurrency(priceGoc)} VND
                  </span>
                )}
                <span className="text-lg font-semibold text-red-500">
                  {formatCurrency(priceSale)} VND
                </span>
              </div>
            </div>

            {/* Booking Button */}
            <button
              onClick={onClick}
              className={`px-4 py-2 ${
                isBooked ? 'bg-gray-400' : 'bg-blue-500'
              } text-white rounded-xl hover:${
                isBooked ? 'bg-gray-500' : 'bg-blue-600'
              } transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5`}
            >
              {isBooked ? 'Booking' : 'Book Now'}
            </button>
          </div>
        </div>

        {/* Clinic Info */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">Available at: Central Medical Clinic</span>
          </div>
        </div>
      </div>

      {/* Details Popup */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="relative bg-white rounded-2xl shadow-2xl transform transition-all duration-300 scale-100 hover:scale-105">
            {/* Close Button */}
            <button
              onClick={handleCloseDetails}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transform hover:scale-110 transition-all duration-200"
            >
              <CloseIcon className="h-6 w-6" />
            </button>

            {/* Render the Detail component */}
            <Detail idVaccine={id} type={type} onClose={handleCloseDetails} mode={displayMode} />
          </div>
        </div>
      )}
    </div>
  );
};

export default VaccineCard;