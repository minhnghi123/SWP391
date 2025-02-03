import { useRef, useEffect, useState, useContext } from 'react';
import { VaccineContext } from '../Context/ChildrenSelected';
import { Link, useNavigate } from 'react-router-dom';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import formatCurrency from '../../utils/calculateMoney';
import ToUpperCaseWords from '../../utils/upperCaseFirstLetter';
import Variants from '../home/Variants';
import { fetchData } from '../../Api/axios';

export default function BodyVariantsHomePage() {
    const navigate = useNavigate()
    const [vaccines, setVaccine] = useState([]); 
    const [combos, setCombos] = useState([]); 

    useEffect(() => {
        fetchData('vaccine')
            .then((res) => setVaccine(res.data))
            .catch((err) => console.error("Error fetching vaccines:", err));

        fetchData('combos')
            .then((res) => setCombos(res.data))
            .catch((err) => console.error("Error fetching combos:", err));
    }, []); 


    const ref = useRef(null);
    const [inputData, setInputData] = useState('');
    const [sortVaccines, setSortVaccines] = useState([]);
    const [sortType, setSortType] = useState('');
    const [isOpen, setIsOpen] = useState(true)


    const {
        selectedVaccines,
        isBooking,
        handleBookVaccine,
        handleRemoveVaccine,
        calculatedTotal
    } = useContext(VaccineContext);

    // const [valueSelectVaccine, setSelectedVaccines] = useState(() => {
    //     return JSON.parse(localStorage.getItem('AddItems')) || [];
    //   });

    useEffect(() => {
        window.scrollTo(0, 0);
        setSortVaccines([...vaccines, ...combos]);
    }, [vaccines,combos]);

    const handleInput = (e) => {
        setInputData(e.target.value);
    };

    const sortSelect = (type) => {
        setSortType(type);
        let sorted = [];
        switch (type) {
            case "All":
                sorted = [...vaccines, ...combos];
                break;
            case "Le":
                sorted = [...vaccines];
                break;
            case "Combo":
                sorted = [...combos];
                break;
            default:
                sorted = [...vaccines, ...combos];
        }

        setIsOpen(true)
        setSortVaccines(sorted);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        ref.current.focus();

        const searchValue = ToUpperCaseWords(inputData.trim().toLowerCase());
        console.log(searchValue);
        setInputData('');

        if (searchValue) {
            const sortByNameVaccine = vaccines
                .filter((vaccine) => vaccine.name.includes(searchValue))
                .sort((a, b) => a.price - b.price);
            const sortByNameCombo = combos
                .filter((combo) => combo.name.includes(searchValue))
                .sort((a, b) => a.price - b.price);

            const combinedResults = [...sortByNameVaccine, ...sortByNameCombo];

            if (combinedResults.length > 0) {
                setSortVaccines(combinedResults);
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        } else {

            setSortVaccines([...vaccines, ...combos]);
            setIsOpen(true);
        }
    };

    return (
        <div className="max-w-[1400px] mx-auto py-4 px-4 z-0 mt-40 ">
            {/* Header and search section */}
            <button onClick={() => navigate(-1)} className='bg-blue-400 p-3 rounded-lg text-white'>Back</button>
            <div className="flex flex-row gap-4 items-center justify-between">
                <h1 className='text-2xl font-semibold text-gray-800'>Thong tin san pham</h1>
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
                    <button onClick={handleSubmit} type='submit'>
                        <SearchOutlinedIcon
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 
                                       text-gray-400 group-hover:text-gray-500 transition-colors duration-200"
                        />
                    </button>
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
                            <option value="Le">Le</option>
                            <option value="Combo">Combo</option>
                        </select>
                    </div>

                    {/* Vaccine Grid */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {isOpen ? (
                            sortVaccines && sortVaccines.map((eachvaccine) => (
                                <Variants
                                    key={eachvaccine.id}
                                    id={eachvaccine.id}
                                    image={eachvaccine.image || null}
                                    title={eachvaccine.name}
                                    description={eachvaccine.description}
                                    type={eachvaccine.discount ? 'combos' : 'vaccine'}
                                    priceGoc={eachvaccine.discount ? eachvaccine.price : null}
                                    priceSale={
                                        eachvaccine.discount
                                            ? eachvaccine.price * (1 - eachvaccine.discount / 100)
                                            : eachvaccine.price
                                    }
                                    isBooking={isBooking}
                                    onClick={() => handleBookVaccine(eachvaccine)}
                                />
                            ))
                        ) : (
                            <h1 className='text-red-800'>Dell coco</h1>
                        )}
                    </div>
                </div>

                {/* Payment Summary Sidebar */}
                <div className="flex-[0.25] mt-16">
                    <div className="sticky top-[80px] bg-white rounded-2xl p-6 border border-gray-100 
                    shadow-md hover:shadow-lg transition-all duration-300">
                        <div className='flex justify-between items-center'>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Summary</h3>
                            <h3 className='text-gray-600 text-sm mb-4'>{selectedVaccines.length} Items</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="border-t border-gray-100 pt-4">
                                <div className="flex flex-col gap-2 mb-3">
                                    <span className="text-gray-600 text-sm">Selected Vaccines:</span>
                                    {selectedVaccines.map((vaccine) => (
                                        <div key={vaccine.id} className="flex justify-between items-center bg-gray-50 
                                        p-2 rounded text-sm group hover:bg-gray-100 transition-all duration-200">
                                            <span className="text-gray-800">{vaccine.name}</span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-blue-600">
                                                    {
                                                        vaccine.discount ?
                                                            (formatCurrency(vaccine.price * (1 - vaccine.discount / 100)))
                                                            :
                                                            (formatCurrency(vaccine.price))
                                                    }
                                                    {' '}VND</span>
                                                <button
                                                    onClick={() => handleRemoveVaccine(vaccine.id)}
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
    );
}