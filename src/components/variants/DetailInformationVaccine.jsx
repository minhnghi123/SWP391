import React, { useState, useEffect } from 'react';
import { CalendarIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import formatDate from '../../utils/FormDate';
import FormmatDeicimal from '../../utils/calculateMoney';
import useAxios from '../../utils/useAxios';

const url = import.meta.env.VITE_BASE_URL_DB;

const Detail = ({ idVaccine, type, onClose, mode }) => {
  const [error, setError] = useState(null);
  const [vaccine, setVaccine] = useState(null);
  const [combo, setCombo] = useState(null);
  const [loading, setLoading] = useState(false);
  const api = useAxios();

  useEffect(() => {
    const fetchDataVariants = async () => {
      if (!idVaccine || !type) {
        setError(new Error('Invalid vaccine ID or type'));
        return;
      }

      setLoading(true);
      try {
        let res;
        if (type === 'vaccine') {
          const endpoint = `${url}/Vaccine/get-vaccine-by-id/${idVaccine}`;
          res = await api.get(endpoint);
          if (res.status === 200) setVaccine(res.data);
        } else if (type === 'combo') {
          const endpoint = `${url}/VaccineCombo/get-vaccine-combo-detail/${idVaccine}`;
          res = await api.get(endpoint);
          if (res.status === 200) setCombo(res.data);
        } else {
          setError(new Error('Invalid type parameter'));
        }
      } catch (error) {
        console.error('API Error:', error.response || error);
        setError(error.response?.data?.message || error.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchDataVariants();
  }, [idVaccine, type]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error: {error.message}</div>;
  }

  if (!vaccine && !combo) {
    return <div className="text-center mt-10">No data available</div>;
  }

  return (
    <div
      className={`relative bg-white p-6 rounded-lg shadow-lg ${
        mode === 'centered' ? 'w-full max-w-3xl' : 'w-full max-w-4xl'
      }`}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={onClose}
          className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
        >
          <span className="font-medium text-sm">← Back to List</span>
        </button>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            type === 'combo' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
          }`}
        >
          {type === 'combo' ? 'Combo Package' : 'Single Vaccine'}
        </span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column - Image and Basic Info */}
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg p-4">
            <img
              src={vaccine?.image || combo?.image || '/vaccine-placeholder.jpg'}
              alt={type === 'combo' ? combo?.comboName : vaccine?.name}
              className="w-full h-48 object-contain rounded-lg"
            />
            <div className="mt-4 space-y-2 text-gray-600 text-sm">
              <div className="flex items-center">
                <CurrencyDollarIcon className="w-5 h-5 mr-2" />
                <span className="font-medium">
                  {type === 'combo' ? (
                    <>
                      <span className="line-through text-gray-400">
                        {FormmatDeicimal(combo?.totalPrice)} VND
                      </span>
                      <span className="ml-2 text-green-600">
                        {FormmatDeicimal(combo?.finalPrice)} VND
                      </span>
                      <span className="ml-2 text-xs text-green-600">
                        (-{combo?.discount}%)
                      </span>
                    </>
                  ) : (
                    `${FormmatDeicimal(vaccine?.price)} VND`
                  )}
                </span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                <span>Entry: {formatDate(type === 'combo' ? combo?.entryDate : vaccine?.entryDate)}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="w-5 h-5 mr-2" />
                <span>Expires: {formatDate(type === 'combo' ? combo?.timeExpired : vaccine?.timeExpired)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="md:w-2/3 space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {type === 'combo' ? combo?.comboName : vaccine?.name}
            </h1>
            <p className="text-gray-500 text-sm">{type === 'combo' ? combo?.description : vaccine?.description}</p>
          </div>

          {/* Key Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h3 className="text-xs font-medium text-blue-800 mb-1">Quantity Available</h3>
              <p className="text-lg font-semibold text-gray-900">{vaccine?.quantity || 'N/A'}</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <h3 className="text-xs font-medium text-orange-800 mb-1">Required Doses</h3>
              <p className="text-lg font-semibold text-gray-900">{vaccine?.doesTimes || 'N/A'}</p>
            </div>
          </div>

          {/* Age Range and Country */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <h3 className="text-xs font-medium text-gray-800 mb-1">Suggested Age Range</h3>
              <p className="text-sm text-gray-900">
                {vaccine?.suggestAgeMin} - {vaccine?.suggestAgeMax} years
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h3 className="text-xs font-medium text-gray-800 mb-1">Country of Origin</h3>
              <p className="text-sm text-gray-900">{vaccine?.fromCountry || combo?.fromCountry}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back to List
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Detail;