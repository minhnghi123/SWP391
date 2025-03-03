import { useRef, useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import formatCurrency from "../../utils/calculateMoney";
import Variants from "../home/Variants";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import "../css/loading.css";
import { useSelector, useDispatch } from "react-redux";
import { vaccineAction } from "../redux/reducers/selectVaccine";
import { motion } from "framer-motion";

export default function BodyVariantsHomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [vaccines, setVaccines] = useState([]);
  const [combos, setCombos] = useState([]);
  const [sortVaccines, setSortVaccines] = useState([]);
  const [sortCombos, setSortCombos] = useState([]);
  const [inputData, setInputData] = useState("");
  const [sortType, setSortType] = useState("All");
  const [isLoading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const ref = useRef(null);
  const itemList = useSelector((state) => state.vaccine?.itemList || []);
  const calculatedTotal = useSelector((state) => state.vaccine.totalPrice);
  const isBooking = useSelector((state) => state.vaccine.isBooking);
  const user = useSelector((state) => state.account.user);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const fetchData = async (url) => {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return await response.json();
        };

        const [vaccineRes, comboRes] = await Promise.all([
          fetchData("https://localhost:7280/api/Vaccine/getAllVacines"),
          fetchData("https://localhost:7280/api/VaccineCombo/getVaccineCombo"),
        ]);

        console.log("Vaccines:", vaccineRes);
        console.log("Combos:", comboRes);

        setVaccines(vaccineRes.data || vaccineRes);
        setCombos(comboRes.data || comboRes);
        setSortVaccines(vaccineRes.data || vaccineRes); // Chỉ gán vaccines
        setSortCombos(comboRes.data || comboRes); // Chỉ gán combos
      } catch (error) {
        console.error("Error fetching data:", error);
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

  const handleSearch = useCallback(() => {
    const searchValue = inputData.trim().toLowerCase();
    if (!searchValue) {
      setSortVaccines(vaccines); // Reset về danh sách vaccines gốc
      setSortCombos(combos); // Reset về danh sách combos gốc
      return;
    }

    const filteredVaccines = vaccines.filter((v) => v.name.toLowerCase().includes(searchValue));
    const filteredCombos = combos.filter((c) => c.name.toLowerCase().includes(searchValue));
    setSortVaccines(filteredVaccines); // Chỉ lọc vaccines
    setSortCombos(filteredCombos); // Chỉ lọc combos
  }, [inputData, vaccines, combos]);

  useEffect(() => {
    const timer = setTimeout(handleSearch, 300);
    return () => clearTimeout(timer);
  }, [inputData, handleSearch]);

  const handleInput = (e) => setInputData(e.target.value);

  const sortSelect = (type) => {
    setSortType(type);
    if (type === "All") {
      setSortVaccines(vaccines);
      setSortCombos(combos);
    } else if (type === "Le") {
      setSortVaccines(vaccines);
      setSortCombos([]);
    } else if (type === "Combo") {
      setSortVaccines([]);
      setSortCombos(combos);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
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

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 space-y-4">
            {(sortType === "All" || sortType === "Le") && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-medium text-gray-800 mb-3">Single Vaccines</h2>
                {isLoading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="loader"></div>
                  </div>
                ) : err ? (
                  <div className="flex justify-center items-center h-32">
                    <p className="text-red-500 text-center">Failed to fetch data.</p>
                  </div>
                ) : sortVaccines.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {sortVaccines.map((item) => (
                      <div
                        key={item.id}
                        className="bg-gray-50 rounded-md p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Variants
                          id={item.id}
                          image={item.image || null}
                          name={item?.name || item?.comboName || ""}
                          description={item.description}
                          type={item.discount ? "combos" : "vaccine"}
                          priceGoc={item.discount ? item.totalPrice : ""}
                          priceSale={item.discount ? item.finalPrice : item.price}
                          isBooking={isBooking}
                          country={item.fromCountry}
                          onClick={() => handleAddVaccine(item)}
                          compact={true}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 text-gray-500">
                    <p>No results found</p>
                  </div>
                )}
              </div>
            )}

            {(sortType === "All" || sortType === "Combo") && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-medium text-gray-800 mb-3">Combo Packages</h2>
                {isLoading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="loader"></div>
                  </div>
                ) : err ? (
                  <div className="flex justify-center items-center h-32">
                    <p className="text-red-500 text-center">Failed to fetch data.</p>
                  </div>
                ) : sortCombos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {sortCombos.map((item) => (
                      <div
                        key={item.id}
                        className="bg-gray-50 rounded-md p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Variants
                          id={item.id}
                          image={item.image || null}
                          name={item?.name || item?.comboName || ""}
                          description={item.description}
                          type={item.discount ? "combos" : "vaccine"}
                          priceGoc={item.discount ? item.totalPrice : ""}
                          priceSale={item.discount ? item.finalPrice : item.price}
                          isBooking={isBooking}
                          country={item.fromCountry}
                          onClick={() => handleAddVaccine(item)}
                          compact={true}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 text-gray-500">
                    <p>No results found</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="w-full lg:w-80">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-16">
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                Payment Summary ({itemList.length} Items)
              </h2>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {itemList.map((vaccine) => (
                  <div
                    key={vaccine.id}
                    className="flex justify-between items-center text-xs bg-gray-50 p-1.5 rounded-md"
                  >
                    <span className="text-gray-700 truncate">{vaccine.name}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-blue-600">{formatCurrency(vaccine.price)} VND</span>
                      <button
                        onClick={() => dispatch(vaccineAction.deleteVaccine(vaccine.id))}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <BackspaceOutlinedIcon fontSize="small" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 mt-3 pt-3">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-700">Total:</span>
                  <span className="text-lg font-semibold text-blue-600">
                    {formatCurrency(calculatedTotal)} VND
                  </span>
                </div>
                <Link to={`/paymentPage/${user.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-2 rounded-md text-white font-medium text-sm ${
                      itemList.length > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
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