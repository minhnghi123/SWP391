import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { FaTimes } from "react-icons/fa";
import { fetchData } from "../../Api/axios";
import Variants from "../home/Variants";

const VaccineList = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  
  // State Management
  const [vaccines, setVaccines] = useState([]);
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [inputData, setInputData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch Data từ API
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const res1 = await fetchData("VaccineCombo/getVaccineCombo");
        if (res1?.status === 200) setCombos(res1.data);

        const res2 = await fetchData("Vaccine/getAllVacines");
        if (res2?.status === 200) setVaccines(res2.data);
      } catch (error) {
        setErr(true);
      } finally {
        setLoading(false);
      }
    };
    fetchDataAsync();
  }, []);

  // Lọc dữ liệu theo search
  const filteredVaccines = useMemo(() => 
    vaccines.filter((vaccine) => 
      vaccine.name.toLowerCase().includes(searchQuery.toLowerCase())
    ), [vaccines, searchQuery]
  );

  const filteredCombos = useMemo(() => 
    combos.filter((combo) => 
      combo.comboName.toLowerCase().includes(searchQuery.toLowerCase())
    ), [combos, searchQuery]
  );

  // Xử lý tìm kiếm
  const handleSearch = useCallback(() => {
    setSearchQuery(inputData.trim().toLowerCase());
  }, [inputData]);

  const handleInput = (e) => setInputData(e.target.value);

  if (loading) return <p className="text-center">Loading...</p>;
  if (err) return <p className="text-center text-red-500">Error loading data.</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-blue-600 transition-all">
            <ArrowBackIosNewOutlinedIcon className="mr-2" />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
            List Vaccines
          </h1>
          <div className="w-32"></div>
        </div>
      </header>

      {/* Search */}
      <div className="mb-10 space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <input
              ref={ref}
              value={inputData}
              onChange={handleInput}
              type="text"
              placeholder="Search vaccines..."
              className="w-full px-6 py-4 pl-14 rounded-2xl border-2 border-blue-100 focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all shadow-sm hover:shadow-md"
            />
            <SearchOutlinedIcon className="absolute left-5 top-1/2 transform -translate-y-1/2 text-blue-400" />
          </div>
          <select
            className="px-6 py-4 bg-blue-100 text-blue-600 rounded-2xl hover:bg-blue-200 transition-all cursor-pointer"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Vaccines</option>
            <option value="Single">Single Vaccines</option>
            <option value="Combo">Combo Packages</option>
          </select>
        </div>
      </div>

      {/* Nội dung Vaccine */}
      <main className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      {(filterType === "All" || filterType === "Single") && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Single Vaccines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVaccines.map((vaccine) => (
                <div
                  key={vaccine.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  {vaccine.image && ( // Hiển thị ảnh nếu có
                    <img
                      src={vaccine.image}
                      alt={vaccine.name}
                      className="w-full h-48 object-cover"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/150")
                      } // Ảnh mặc định nếu lỗi
                    />
                  )}
                  <Variants
                    id={vaccine.id}
                    image={vaccine.image || null}
                    name={vaccine?.name || vaccine?.comboName || ""}
                    description={vaccine.description}
                    type={vaccine.discount ? "combos" : "vaccine"}
                    priceGoc={vaccine.discount ? vaccine.totalPrice : ""}
                    priceSale={
                      vaccine.discount ? vaccine.finalPrice : vaccine.price
                    }
                    country={vaccine.fromCountry}
                    onClick={() => handleAddVaccine(vaccine)}
                    compact={true}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
         {(filterType === "All" || filterType === "Combo") && (
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Vaccine Combos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCombos.map((combo) => (
                <div
                  key={combo.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  {combo.image && ( // Hiển thị ảnh nếu có
                    <img
                      src={combo.image}
                      alt={combo.comboName}
                      className="w-full h-48 object-cover"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/150")
                      } // Ảnh mặc định nếu lỗi
                    />
                  )}
                  <Variants
                    id={combo.id}
                    image={combo.image || null}
                    name={combo?.name || combo?.comboName || ""}
                    description={combo.description}
                    type={combo.discount ? "combos" : "vaccine"}
                    priceGoc={combo.discount ? combo.totalPrice : ""}
                    priceSale={
                      combo.discount ? combo.finalPrice : combo.price
                    }
                    country={combo.fromCountry}
                    onClick={() => handleAddVaccine(combo)}
                    compact={true}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Modal Chi Tiết */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-800">{selectedItem.comboName || selectedItem.name}</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <FaTimes size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VaccineList;