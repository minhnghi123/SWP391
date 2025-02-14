import { useRef, useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import formatCurrency from '../../utils/calculateMoney';
import Variants from '../home/Variants';
import { fetchData } from '../../Api/axios';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import '../css/loading.css';
import { useSelector, useDispatch } from "react-redux";
import { vaccineAction } from '../redux/reducers/selectVaccine';

export default function BodyVariantsHomePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [vaccines, setVaccines] = useState([]);
    const [combos, setCombos] = useState([]);
    const [sortVaccines, setSortVaccines] = useState([]);
    const [inputData, setInputData] = useState('');
    const [sortType, setSortType] = useState('All');
    const [isLoading, setLoading] = useState(true);
    const [err, setErr] = useState(false);
    const ref = useRef(null);
    const itemList = useSelector((state) => state.vaccine?.itemList || []);
    const calculatedTotal = useSelector((state) => state.vaccine.totalPrice);
    const isBooking = useSelector((state) => state.vaccine.isBooking);

    // Fetch data on initial render
    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const [vaccineRes, comboRes] = await Promise.all([
                    fetchData('vaccine'),
                    fetchData('combos'),
                ]);
                setVaccines(vaccineRes.data);
                setCombos(comboRes.data);
                setSortVaccines([...vaccineRes.data, ...comboRes.data]);
            } catch (error) {
                setErr(true);
            } finally {
                setLoading(false);
            }
        };
        fetchDataAsync();
    }, []);

    const handleAddVaccine = (vaccine) => {
        dispatch(
            vaccineAction.addVaccine({
                id: vaccine.id,
                name: vaccine.name,
                price: vaccine.discount ? vaccine.price * (1 - vaccine.discount / 100) : vaccine.price,
                description: vaccine.description,
                country: vaccine.origin,
                image: vaccine.image,
                vaccine: Array.isArray(vaccine.vaccines) ? vaccine.vaccines : [],
            })
        );
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        setSortVaccines([...vaccines, ...combos]);
    }, [vaccines, combos]);

    // Improved search function
    const handleSearch = useCallback(() => {
        const searchValue = inputData.trim().toLowerCase();
        if (!searchValue) {
            setSortVaccines([...vaccines, ...combos]);
            return;
        }

        const filteredVaccines = vaccines.filter((v) => v.name.toLowerCase().includes(searchValue));
        const filteredCombos = combos.filter((c) => c.name.toLowerCase().includes(searchValue));
        setSortVaccines([...filteredVaccines, ...filteredCombos]);

    }, [inputData, vaccines, combos]);

    useEffect(() => {
        const timer = setTimeout(handleSearch, 300);
        return () => clearTimeout(timer);
    }, [inputData, handleSearch]);

    const handleInput = (e) => {
        setInputData(e.target.value);
    };

    const sortSelect = (type) => {
        setSortType(type);
        if (type === "All") {
            setSortVaccines([...vaccines, ...combos]);
        } else if (type === "Le") {
            setSortVaccines([...vaccines]);
        } else if (type === "Combo") {
            setSortVaccines([...combos]);
        }

    };

    return (
        <div className="max-w-[1400px] mx-auto py-4 px-4 z-0 mt-40">
            {/* Header and search section */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors group"
            >
                <ArrowBackIosNewOutlinedIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Home</span>
            </button>
            <div className="flex flex-row gap-4 items-center justify-between">
                <h1 className='text-2xl font-semibold text-gray-800'>List Vaccines</h1>
                <div className="relative group">
                    <input
                        ref={ref}
                        value={inputData}
                        onChange={handleInput}
                        type="text"
                        placeholder="Search..."
                        className="w-64 pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 
                                   text-sm placeholder-gray-400
                                   group-hover:border-gray-300
                                   focus:outline-none focus:ring-2 focus:ring-blue-50 
                                   focus:border-blue-500 transition-all duration-200"
                    />
                </div>
            </div>

            <div className="flex flex-row gap-4">
                <div className="flex-[0.75]">
                    {/* Sort dropdown */}
                    <div className="flex justify-between items-center mb-6">
                        <select
                            className="block w-52 p-3 text-sm text-gray-700 bg-white border border-gray-200 
                            rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                            hover:border-gray-300 transition-all duration-200 cursor-pointer shadow-sm"
                            value={sortType}
                            onChange={(e) => sortSelect(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Le">Single</option>
                            <option value="Combo">Combo</option>
                        </select>
                    </div>

                    {/* Vaccine Grid */}
                    {isLoading ? (
                        <div className="loader absolute right-[50%] left-[45%]"></div>
                    ) : err ? (
                        <div className="text-red-500 text-center mt-4">
                            <p>Fetch Data Failed</p>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {sortVaccines.length > 0 ? (
                                sortVaccines.map((eachvaccine) => (
                                    <Variants
                                        key={eachvaccine.id}
                                        image={eachvaccine.image}
                                        name={eachvaccine.name}
                                        description={eachvaccine.description}
                                        country={eachvaccine.origin}
                                        priceSale={eachvaccine.discount
                                            ? Math.round(eachvaccine.price * (1 - eachvaccine.discount / 100))
                                            : eachvaccine.price || 0}
                                        isBooking={isBooking}
                                        onClick={() => handleAddVaccine(eachvaccine)}
                                    />
                                ))
                            ) : (
                                <p className="text-gray-600 text-center mt-6">No results found</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Payment Summary Sidebar */}
                <div className="flex-[0.25] mt-16">
                    <div className="sticky top-[80px] bg-white rounded-2xl p-6 border border-gray-100 
                    shadow-md hover:shadow-lg transition-all duration-300">
                        <div className='flex justify-between items-center'>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Summary</h3>
                            <h3 className='text-gray-600 text-sm mb-4'>{itemList.length || 0} Items</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="border-t border-gray-100 pt-4">
                                <div className="flex flex-col gap-2 mb-3">
                                    <span className="text-gray-600 text-sm">Selected Vaccines:</span>
                                    {itemList.map((vaccine) => (
                                        <div key={vaccine.id} className="flex justify-between items-center bg-gray-50 
                                        p-2 rounded text-sm group hover:bg-gray-100 transition-all duration-200">
                                            <span className="text-gray-800">{vaccine.name}</span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-blue-600">
                                                    {vaccine.discount
                                                        ? formatCurrency(vaccine.price * (1 - vaccine.discount / 100))
                                                        : formatCurrency(vaccine.price)
                                                    }{' '}VND
                                                </span>
                                                <button
                                                    onClick={() => dispatch(vaccineAction.deleteVaccine(vaccine.id))}
                                                    className="text-gray-400 hover:text-red-500 p-1 rounded-full 
                                                    hover:bg-red-50 transition-all duration-200"
                                                    title="Remove vaccine"
                                                >
                                                    <BackspaceOutlinedIcon />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="text-gray-600 text-sm">Total Amount:</span>
                                    <span className="font-semibold text-base text-blue-600">
                                        {formatCurrency(calculatedTotal)} VND
                                    </span>
                                </div>
                                <Link to="/paymentPage">
                                    <button
                                        className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg 
                                        hover:bg-blue-600 transition-all duration-300 font-medium text-sm
                                        shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={itemList.length === 0}
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
    );
}
