import img9 from '../../assets/p9.jpg'
import img10 from '../../assets/p10.jpg'
import img11 from '../../assets/p11.jpg'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { useEffect, useState } from 'react';
import formatCurrency from '../../utils/calculateMony'
import { Link } from 'react-router-dom'
export default function BodyVariantsHomePage() {
    const [selectedVaccines, setSelectedVaccines] = useState([]);
    const [sortType, setSortType] = useState('');

    const vaccines = [
        {
            id: 1,
            name: 'Vaccine A',
            price: 2000000,
            image: img10,
            description: 'High-quality vaccine with proven effectiveness and long-lasting immunity',
            origin: 'USA'
        },
        {
            id: 2,
            name: 'Vaccine B',
            price: 1000000,
            image: img11,
            description: 'High-quality vaccine with proven effectiveness and long-lasting immunity',
            origin: 'USA'
        },
        {
            id: 3,
            name: 'Vaccine C',
            price: 1000000,
            image: img11,
            description: 'High-quality vaccine with proven effectiveness and long-lasting immunity',
            origin: 'USA'
        },
        {
            id: 4,
            name: 'Vaccine D',
            price: 1000000,
            image: img11,
            description: 'High-quality vaccine with proven effectiveness and long-lasting immunity',
            origin: 'USA'
        }
    ];

    const [sortedVaccines, setSortedVaccines] = useState(vaccines);

    const handleSort = (type) => {
        setSortType(type);
        let sorted = [...vaccines];

        switch (type) {
            case 'price_low':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price_high':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                sorted = vaccines;
        }

        setSortedVaccines(sorted);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleBookVaccine = (vaccine) => {
        setSelectedVaccines(prev => [...prev, vaccine]);
    };
    const calculateTotal = () => {    
        return selectedVaccines.reduce((total, vaccine) => total + vaccine.price, 0);
    };

    const handleRemoveVaccine = (indexToRemove) => {
        setSelectedVaccines(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-12 z-0">
            <div className="text-center mb-12">
                <span className="text-blue-500 font-semibold text-xs tracking-wider uppercase 
                    bg-blue-50 px-3 py-1.5 rounded-full inline-block mb-2">
                    Our Products
                </span>
                <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-3">
                    Best <span className="text-blue-500">Vaccines</span> Available
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto rounded-full mb-4"></div>
                <p className="text-gray-600 max-w-[35rem] mx-auto text-base">
                    Choose from our selection of high-quality vaccines, carefully selected for your child's health and safety
                </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-3/4">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex gap-3 items-center">
                            <select
                                className="block w-48 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 
                                rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                hover:border-gray-300 transition-all duration-200 cursor-pointer shadow-sm"
                                value={sortType}
                                onChange={(e) => handleSort(e.target.value)}
                            >
                                <option value="">Sort Vaccines By</option>
                                <option value="price_low">Price: Low to High</option>
                                <option value="price_high">Price: High to Low</option>
                                <option value="name">Name</option>
                            </select>
                            <span className="text-gray-500 text-sm">
                                {selectedVaccines.length} of 4 selected
                            </span>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {sortedVaccines.map((vaccine) => (
                            <div key={vaccine.id} className='bg-white rounded-2xl p-5 hover:shadow-lg transition-all duration-300 
                                border border-gray-100 hover:border-blue-100 group relative overflow-hidden'>
                                <div className='space-y-4'>
                                    <div className='bg-blue-50 rounded-xl p-4 flex items-center justify-center h-40 
                                        group-hover:bg-blue-100 transition-colors duration-300'>
                                        <img
                                            src={vaccine.image}
                                            alt={vaccine.name}
                                            className='max-h-full object-contain transform group-hover:scale-110 
                                                transition-transform duration-500'
                                        />
                                    </div>

                                    <div className='space-y-2'>
                                        <div className="flex justify-between items-start">
                                            <h2 className='text-lg font-semibold text-gray-800 group-hover:text-blue-600 
                                                transition-colors duration-300'>
                                                {vaccine.name}
                                            </h2>
                                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">
                                                In Stock
                                            </span>
                                        </div>
                                        <p className='text-gray-600 text-sm leading-relaxed line-clamp-2'>
                                            {vaccine.description}
                                        </p>

                                        <div className='flex items-center gap-2 text-gray-500 bg-gray-50 p-2 t
                                            rounded-lg text-xs'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                                            </svg>
                                            <span className='text-sm'>Origin: {vaccine.origin}</span>
                                        </div>

                                        <div className='flex flex-col gap-3 pt-2'>
                                            <div className='flex items-center gap-1.5 text-blue-600'>
                                                <LocalOfferOutlinedIcon className='h-4 w-4' />
                                                <span className='text-base font-semibold'>
                                                    {vaccine.price.toLocaleString()} VND
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => handleBookVaccine(vaccine)}
                                                className='w-full px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 
                                                    transition-all duration-300 font-medium shadow-md hover:shadow-lg
                                                    active:scale-95 flex items-center justify-center gap-1.5'
                                            >
                                                <span>Book Now</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                        strokeWidth={2} d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-1/4">
                    <div className="sticky top-[80px] bg-white rounded-2xl p-6 border border-gray-100 
                        shadow-md hover:shadow-lg transition-all duration-300">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Summary</h3>
                        <div className="space-y-4">
                            <div className="border-t border-gray-100 pt-4">
                                <div className="flex flex-col gap-2 mb-3">
                                    <span className="text-gray-600 text-sm">Selected Vaccines:</span>
                                    {selectedVaccines.map((vaccine, index) => (
                                        <div key={index} className="flex justify-between items-center bg-gray-50 
                                            p-2 rounded text-sm group hover:bg-gray-100 transition-all duration-200">
                                            <span className="text-gray-800">{vaccine.name}</span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-blue-600">{vaccine.price.toLocaleString()} VND</span>
                                                <button
                                                    onClick={() => handleRemoveVaccine(index)}
                                                    className="text-gray-400 hover:text-red-500 p-1 rounded-full 
                                                        hover:bg-red-50 transition-all duration-200"
                                                    title="Remove vaccine"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="text-gray-600 text-sm">Total Amount:</span>
                                    <span className="font-semibold text-base text-blue-600">
                                        {calculateTotal().toLocaleString()} VND
                                    </span>
                                </div>
                                <Link to="/paymentPage">

                                    <button
                                        className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg 
                                        hover:bg-blue-600 transition-all duration-300 font-medium text-sm
                                        shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={selectedVaccines.length === 0}
                                    >
                                        Proceed to Payment
                                    </button>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}