import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { CalendarIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import  formatDate  from '../../utils/FormDate';
import FormmatDeicimal from '../../utils/calculateMoney';
import  useAxios  from '../../utils/useAxios';
const url = import.meta.env.VITE_BASE_URL_DB
const Detail = () => {
    const { idVaccine, type } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [vaccine, setVaccine] = useState(null);
    const [combo, setCombo] = useState(null);
    const [loading, setLoading] = useState(false);
    const api = useAxios()

    useEffect(() => {
        const fetchDataVariants = async () => {
            setLoading(true)
            try {
                if (type === 'vaccine') {
                    const res = await api.get(`${url}/Vaccine/get-vaccine-by-id/${idVaccine}`)
                    if (res.status === 200) setVaccine(res.data)
                }
                else {
                    const res = await api.get(`${url}/VaccineCombo/get-vaccine-combo-detail/${idVaccine}`)
                    if (res.status === 200) setCombo(res.data)
                }
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchDataVariants()

    }, [idVaccine]);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center mt-10">Error: {error.message}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10 border border-gray-100">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-blue-600 hover:text-blue-700 transition-colors group"
                >
                    <ArrowBackIosNewOutlinedIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to List</span>
                </button>
                <span className={`px-3 py-1 rounded-full text-sm font-medium 
                    ${type === 'combo' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                    {type === 'combo' ? 'Combo Package' : 'Single Vaccine'}
                </span>
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column - Image and Basic Info */}
                <div className="md:w-1/3">
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <img
                            src={vaccine?.image || '/vaccine-placeholder.jpg'}
                            alt={type === 'combo' ? combo?.comboName : vaccine?.name}
                            className="w-full h-64 object-contain rounded-lg"
                        />
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center text-gray-600">
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
                                            <span className="ml-2 text-sm text-green-600">
                                                (-{combo?.discount}%)
                                            </span>
                                        </>
                                    ) : (
                                        `${FormmatDeicimal(vaccine?.price)} VND`
                                    )}
                                </span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <CalendarIcon className="w-5 h-5 mr-2" />
                                <span>Entry: {formatDate(type === 'combo' ? combo?.entryDate : vaccine?.entryDate)}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <ClockIcon className="w-5 h-5 mr-2" />
                                <span>Expires: {formatDate(type === 'combo' ? combo?.timeExpired : vaccine?.timeExpired)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Details */}
                <div className="md:w-2/3 space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {type === 'combo' ? combo?.comboName : vaccine?.name}
                        </h1>
                        <p className="text-gray-600">
                            {type === 'combo' ? combo?.description : vaccine?.description}
                        </p>
                    </div>

                    {/* Key Information */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <h3 className="text-sm font-medium text-blue-800 mb-1">Quantity Available</h3>
                            <p className="text-lg font-semibold text-gray-900">{vaccine?.quantity || 'N/A'}</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg">
                            <h3 className="text-sm font-medium text-orange-800 mb-1">Required Doses</h3>
                            <p className="text-lg font-semibold text-gray-900">{vaccine?.doesTimes || 'N/A'}</p>
                        </div>
                    </div>

                    {/* Age Range and Country */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-800 mb-1">Suggested Age Range</h3>
                            <p className="text-gray-900">
                                {vaccine?.suggestAgeMin} - {vaccine?.suggestAgeMax} years
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-800 mb-1">Country of Origin</h3>
                            <p className="text-gray-900">{vaccine?.fromCountry}</p>
                        </div>
                    </div>

                    {/* Combo Vaccines List */}
                    {type === 'combo' && combo?.vaccines && (
                        <div className="border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Included Vaccines</h3>
                            <div className="space-y-4">
                                {combo.vaccines.map((v) => (
                                    <div key={v.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <h4 className="font-medium text-gray-900">{v.name}</h4>
                                            <p className="text-sm text-gray-500">{v.description}</p>
                                        </div>
                                        <span className="text-gray-600">{FormmatDeicimal(v.price)} VND</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-3">
                <button 
                    onClick={() => navigate(-1)}
                    className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                >
                    Back to List
                </button>
                <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default Detail;
