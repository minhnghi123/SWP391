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
import { motion, AnimatePresence } from "framer-motion";
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
    const isBooking = useSelector((state) => state.vaccine.isBooking)



    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const [vaccineRes, comboRes] = await Promise.all([
                    fetchData('vaccines'),
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* Header mới với gradient và blur effect */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center text-gray-600 hover:text-blue-600 transition-all duration-300 ease-in-out"
                        >
                            <ArrowBackIosNewOutlinedIcon className="mr-2" />
                            <span className="font-medium">Back</span>
                        </button>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            List Vaccines
                        </h1>
                        <div className="w-32"></div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12">
                {/* Search và Filter Section được cải thiện */}
                <div className="mb-10 space-y-4">
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <input
                                ref={ref}
                                value={inputData}
                                onChange={handleInput}
                                type="text"
                                placeholder="Search vaccines..."
                                className="w-full px-6 py-4 pl-14 rounded-2xl border-2 border-blue-100 focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                            />
                            <SearchOutlinedIcon className="absolute left-5 top-1/2 transform -translate-y-1/2 text-blue-400" />
                        </div>
                        <select
                            className="px-6 py-4 bg-blue-100 text-blue-600 rounded-2xl hover:bg-blue-200 transition-all cursor-pointer"
                            value={sortType}
                            onChange={(e) => sortSelect(e.target.value)}
                        >
                            <option value="All">All Vaccines</option>
                            <option value="Le">Single Vaccines</option>
                            <option value="Combo">Combo Packages</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 ">
                    {/* Main Content */}

                    <div className="flex-1">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="loader"></div> {/* Ensure you have proper CSS for the loader */}
                            </div>
                        ) : err ? (
                            <div className="flex justify-center items-center h-64">
                                <p className="text-red-500 text-center">Failed to fetch data. Please try again later.</p>
                            </div>
                        ) : sortVaccines.length > 0 ? (
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1, transition: { duration: 0.3 } },
                                }}
                            >
                                {sortVaccines.map((vaccine) => (
                                    <motion.div
                                        key={vaccine.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
                                    >
                                        <Variants
                                            id={vaccine.id}
                                            image={vaccine.image || null}
                                            name={vaccine.name}
                                            description={vaccine.description}
                                            type={vaccine.discount ? 'combos' : 'vaccine'}
                                            priceGoc={vaccine.discount ? vaccine.price : null}
                                            priceSale={
                                                vaccine.discount
                                                    ? vaccine.price * (1 - vaccine.discount / 100)
                                                    : vaccine.price
                                            }
                                            isBooking={isBooking}
                                            country={vaccine.origin}
                                            onClick={() => handleAddVaccine(vaccine)}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <div className="flex flex-col justify-center items-center h-64 gap-4">
                                <img src="https://cdn2.cellphones.com.vn/x,webp/media/wysiwyg/Search-Empty.png"></img>
                                <p className="text-gray-600 text-center text-lg">No results found</p>
                            </div>
                        )}
                    </div>




                    {/* Cart Sidebar được cải thiện */}
                    <div className="max-lg:w-[420px]">
                        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 sticky top-28">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800 p-2">Payment Summary</h2>
                                <span className="text-lg text-gray-600">{itemList.length} Items</span>
                            </div>

                            <div className="space-y-4 mb-8">
                                
                                    {itemList.map((vaccine) => (
                                        <div
                                            key={vaccine.id}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="flex justify-between items-center bg-gray-50 p-3 rounded-xl group hover:bg-gray-100 transition-all"
                                        >
                                            <span className="text-gray-800">{vaccine.name}</span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-blue-600 font-medium">
                                                    {formatCurrency(vaccine.discount ?
                                                        vaccine.price * (1 - vaccine.discount / 100) :
                                                        vaccine.price
                                                    )} VND
                                                </span>
                                                <button
                                                    onClick={() => dispatch(vaccineAction.deleteVaccine(vaccine.id))}
                                                    className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-all"
                                                >
                                                    <BackspaceOutlinedIcon />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-xl font-bold text-gray-700">Total:</span>
                                    <span className="text-3xl font-bold text-blue-600">
                                        {formatCurrency(calculatedTotal)} VND
                                    </span>
                                </div>

                                <Link to="/paymentPage">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg
                                        ${itemList.length > 0
                                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-xl"
                                                : "bg-gray-400 cursor-not-allowed "
                                            }`}
                                        disabled={itemList.length === 0}
                                    >
                                        Proceed to Payment
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}