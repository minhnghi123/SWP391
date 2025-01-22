import img9 from '../../assets/p9.jpg'
import img10 from '../../assets/p10.jpg'
import img11 from '../../assets/p11.jpg'
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import formatCurrency from '../../utils/calculateMoney'
import { Link, useLocation } from 'react-router-dom'
import Variants from '../home/Variants';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ToUpperCaseWords from '../../utils/upperCaseFirstLetter'
export default function BodyVariantsHomePage({ }) {
    const vaccines = [
        {
            id: 1,
            name: 'Vaccine A',
            price: 2000000,
            image: img9,
            description: 'High-quality vaccine with proven effectiveness and long-lasting immunity',
            origin: 'USA'
        },
        {
            id: 2,
            name: 'Vaccine B',
            price: 1000000,
            image: img9,
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
            image: img10,
            description: 'High-quality vaccine with proven effectiveness and long-lasting immunity',
            origin: 'USA'
        },
        {
            id: 5,
            name: 'Vaccine D',
            price: 1000000,
            image: img11,
            description: 'High-quality vaccine with proven effectiveness and long-lasting immunity',
            origin: 'USA'
        }, {
            id: 6,
            name: 'Vaccine D',
            price: 1000000,
            image: img11,
            description: 'High-quality vaccine with proven effectiveness and long-lasting immunity',
            origin: 'USA'
        },
        {
            id: 7,
            name: 'Vaccine A',
            price: 2000000,
            image: img9,
            description: 'High-quality vaccine with proven effectiveness and long-lasting immunity',
            origin: 'USA'
        },
        {
            id: 8,
            name: 'Vaccine B',
            price: 1000000,
            image: img9,
            description: 'High-quality vaccine with proven effectiveness and long-lasting immunity',
            origin: 'USA'
        },
        {
            id: 9,
            name: 'Vaccine C',
            price: 1000000,
            image: img11,
            description: 'High-quality vaccine with proven effectiveness and long-lasting immunity',
            origin: 'USA'
        },
        {
            id: 10,
            name: 'Vaccine D',
            price: 1000000,
            image: img10,
            description: 'High-quality vaccine with proven effectiveness and long-lasting immunity',
            origin: 'USA'
        },
        {
            id: 11,
            name: 'Vaccine D',
            price: 1000000,
            image: img11,
            description: 'High-quality vaccine with proven effectiveness and long-lasting immunity',
            origin: 'USA'
        }, {
            id: 12,
            name: 'Vaccine D',
            price: 1000000,
            image: img11,
            description: 'High-quality vaccine with proven effectiveness and long-lasting immunity',
            origin: 'USA'
        }
    ];

    const combos = [
        {
            id: 20,
            name: 'Combo A + B',
            vaccines: ['Vaccine A', 'Vaccine B'],
            price: 2800000,
            discount: 10, // Giảm giá 10%
            description: 'Combo Vaccine A và B giúp bạn tối ưu hóa khả năng miễn dịch với mức giá ưu đãi.'
        },
        {
            id: 22,
            name: 'Combo C + D',
            vaccines: ['Vaccine C', 'Vaccine D'],
            price: 1800000,
            discount: 15, // Giảm giá 15%
            description: 'Combo Vaccine C và D đảm bảo bảo vệ toàn diện với mức giá phải chăng.'
        },
        {
            id: 32,
            name: 'Combo A + C + D',
            vaccines: ['Vaccine A', 'Vaccine C', 'Vaccine D'],
            price: 3700000,
            discount: 20, // Giảm giá 20%
            description: 'Combo Vaccine A, C và D cung cấp giải pháp miễn dịch toàn diện với chi phí tối ưu.'
        },
        {
            id: 42,
            name: 'Combo B + D',
            vaccines: ['Vaccine B', 'Vaccine D'],
            price: 2500000,
            discount: 5, // Giảm giá 5%
            description: 'Combo Vaccine B và D phù hợp cho các nhu cầu miễn dịch cơ bản với giá thành hợp lý.'
        }
    ];

    const ref = useRef(null)
    const [inputData, setInputData] = useState('');
    const [sortVaccines, setSortVaccines] = useState(vaccines)
    const [selectedVaccines, setSelectedVaccines] = useState([]);
    const [sortType, setSortType] = useState('');
    const [isBooking, setBooking] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0);
        setSortVaccines([...vaccines, ...combos]);
    }, []);

    const handleBookVaccine = (vaccine) => {
        setSelectedVaccines((prev) => {
            const checkExist = prev.find((item) => item.id === vaccine.id);
    
            if (checkExist) {
               // delete item when click again
                const updatedVaccines = prev.filter((item) => item.id !== vaccine.id);
                // remove id from list booking
                setBooking((prevBooking) => prevBooking.filter((item) => item !== vaccine.id));
                return updatedVaccines;
            } else {
                // add a new item
                const updatedVaccines = [...prev, vaccine];
                // add id to list booking
                setBooking((prevBooking) => [...prevBooking, vaccine.id]);
                return updatedVaccines;
            }
        });
    };
    



    const calculatedTotal = useMemo(() => {
        return selectedVaccines.reduce((total, vaccine) => {
            if (vaccine.discount)
                return total + vaccine.price * (1 - vaccine.discount / 100);
            else
                return total + vaccine.price;
        }, 0);
    }, [selectedVaccines]);


    const handleRemoveVaccine = (id) => {
        setSelectedVaccines(prev => {
            const newarray = prev.filter(vaccine => vaccine.id !== id);
            setBooking((prevBooking) => prevBooking.filter((item) => item !== id))

            return newarray
        });
    };

    const handleInput = (e) => {
        setInputData(e.target.value)

    }
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
        setSortVaccines(sorted);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        ref.current.focus()
        const searchValue = ToUpperCaseWords(inputData.trim().toLowerCase());
        setInputData('');
        if (searchValue) {
            const sortByName = vaccines
                .filter((vaccine) => vaccine.name.includes(searchValue))


            setSortVaccines(sortByName);
        } else {
            setSortVaccines(vaccines);
        }

    };
    const handleAction = (vaccine) => {
        handleBookVaccine(vaccine)
        handleRemoveVaccine(vaccine.id)
    }



    return (

        <div className="max-w-[1400px] mx-auto py-4 px-4 z-0 mt-40 ">
            {/* header */}
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
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex gap-3 items-center">
                            <select
                                className="block w-52 p-3 text-sm text-gray-700 bg-white border border-gray-200 
                        rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        hover:border-gray-300 transition-all duration-200 cursor-pointer shadow-sm "
                                value={sortType}
                                onChange={(e) => sortSelect(e.target.value)}
                            >
                                <option value="All">All</option>
                                <option value="Le">Le</option>
                                <option value="Combo">Combo</option>

                            </select>


                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {/* Vaccine Card */}

                        {sortVaccines.map((eachvaccine) => (
                            <Variants
                                key={eachvaccine.id}
                                id={eachvaccine.id}
                                image={eachvaccine.image ?
                                    (eachvaccine.image)
                                    :
                                    (null)
                                }
                                title={eachvaccine.name}
                                description={eachvaccine.description}
                                // country={eachvaccine.origin}
                                type={eachvaccine.discount ? 'combos' : 'vaccine'}
                                priceGoc={eachvaccine.discount ? eachvaccine.price : null}
                                priceSale={
                                    eachvaccine.discount ?
                                        (eachvaccine.price * (1 - eachvaccine.discount / 100))
                                        :
                                        (eachvaccine.price)
                                }
                                isBooking={isBooking}

                                onClick={() => handleBookVaccine(eachvaccine)}
                            />
                        ))}

                    </div>
                </div>

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