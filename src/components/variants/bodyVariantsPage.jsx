import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft, ShoppingCart, X, Plus, Check } from 'lucide-react';
import Variants from '../home/Variants';
import FormmatDeicimal from '../../utils/calculateMoney'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { vaccineAction } from '../redux/reducers/selectVaccine'
import { fetchData } from '../../Api/axios'
import useAxios from '../../utils/useAxios'
const url = import.meta.env.VITE_BASE_URL_DB
// Mock data for vaccines


// Format currency function


function boydVaritants() {
  const api = useAxios()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState("All");


  const cart = useSelector(state => [...state.vaccine.listVaccine, ...state.vaccine.listComboVaccine]);
  const totalPrice = useSelector(state => state.vaccine.totalPrice)
  const user = useSelector(state => state.account.user)
  const [comboVaccine, setComboVaccines] = useState([])
  const [vaccines, setVaccines] = useState([])
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(false)
  const isBooking = useSelector(state => state.vaccine.isBooking)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
   
    const fetchDataVariants = async () => {
      try {
        const [vaccines, comboVaccine] = await Promise.all([
          api.get(`${url}/Vaccine/get-all-vaccines`),
          api.get(`${url}/VaccineCombo/get-all-vaccine-combo`)
        ])
        if (vaccines.status === 200) setVaccines(vaccines.data)
        if (comboVaccine.status === 200) setComboVaccines(comboVaccine.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchDataVariants()
  }, [])


  const filteredVaccines = vaccines.filter(vaccine =>
    vaccine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCombos = comboVaccine.filter(combo =>
    combo.comboName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleAddToCart = (vaccine, type) => {
    const isCombo = Array.isArray(vaccine?.vaccines) && vaccine.vaccines.length > 0;
    const finalPrice = isCombo ? vaccine.finalPrice : vaccine.price;
    const ischeck = type === 'combo' ? `combo-${vaccine.id}` : `vaccine-${vaccine.id}`;
    const name = type === 'combo' ? vaccine.comboName : vaccine.name;

    // Kiểm tra xem item đã tồn tại trong giỏ hàng hay chưa
    const isItemInCart = cart.some(item => 
      (type === 'combo' && item.type === 'combo' && item.id === vaccine.id) || 
      (type === 'vaccine' && item.type === 'vaccine' && item.id === vaccine.id)
    );

    if (isItemInCart) {
      // Nếu đã có, xóa khỏi giỏ
      removeFromCart(vaccine.id, type);
    } else {
      // Nếu chưa có, thêm vào giỏ
      if (isCombo) {
        dispatch(vaccineAction.addComboVaccine({
          id: vaccine.id,
          name: name,
          price: finalPrice,
          description: vaccine.description,
          country: vaccine.fromCountry,
          vaccines: vaccine.vaccines,
          type: type,
        }));
      } else {
        dispatch(vaccineAction.addVaccine({
          id: vaccine.id,
          name: name,
          price: vaccine.price,
          description: vaccine.description,
          country: vaccine.fromCountry,
          maxAge: vaccine.suggestAgeMax,
          minAge: vaccine.suggestAgeMin,
          type: type,
        }));
      }
    }


    //click again , delete vaccine or combo id
  };
  const removeFromCart = (itemId, type) => {
    if (type === 'vaccine') {
      dispatch(vaccineAction.deleteVaccine(itemId))
    } else {
      dispatch(vaccineAction.deleteComboVaccine(itemId))
    }
  };






  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center text-gray-600 hover:text-blue-600 transition-all">
            <ArrowLeft className="mr-2" size={18} />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
            Vaccine Booking
          </h1>
          <div>
            
          </div>

        </div>
      </header>

      <div className=" max-w-[1400px] mx-auto px-4 py-6">
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search vaccines..."
              className="w-full px-6 py-3 pl-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <select
            className="px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:border-blue-400 transition-all cursor-pointer"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Vaccines</option>
            <option value="Single">Single Vaccines</option>
            <option value="Combo">Combo Packages</option>
          </select>
        </div>

        {/* Main Content - 7:3 Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Vaccine List (70%) */}
          <div className="lg:w-[75%] space-y-8">
            {(filterType === "All" || filterType === "Single") && (
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                  <span className="mr-2">Single Vaccines</span>
                  <span className="text-sm font-normal text-gray-500">({filteredVaccines.length} available)</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredVaccines.map((vaccine) => (
                    <Variants
                      key={`vaccine-${vaccine.id}`}
                      id={vaccine.id}
                      image={vaccine.image}
                      name={vaccine.name}
                      description={vaccine.description}
                      type="vaccine"
                      priceGoc={null}
                      priceSale={vaccine.price}
                      country={vaccine.fromCountry}
                      maxAge={vaccine.suggestAgeMax}
                      minAge={vaccine.suggestAgeMin}
                      onClick={() => handleAddToCart(vaccine, 'vaccine')}
                      isBooking={isBooking}
                    />
                  ))}
                </div>
              </section>
            )}

             {(filterType === "All" || filterType === "Combo") && (
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                  <span className="mr-2">Vaccine Combos</span>
                  <span className="text-sm font-normal text-gray-500">({filteredCombos.length} available)</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredCombos.map((combo) => (
                    <Variants
                      key={`combo-${combo.id}`}
                      id={combo.id}
                      image={combo.image}
                      name={combo.comboName}
                      description={combo.description}
                      type="combo"
                      discount={combo.discount}
                      priceGoc={combo.discount ? combo.totalPrice : null}
                      priceSale={combo.discount ? combo.finalPrice : combo.price}
                      country={combo.fromCountry}
                      maxAge={combo.vaccines && combo.vaccines.length > 0 ? combo.vaccines.reduce((max, vaccine) => Math.max(max, vaccine.suggestAgeMax || 0), 0) : 0}
                      minAge={combo.vaccines && combo.vaccines.length > 0 ? combo.vaccines.reduce((min, vaccine) => Math.min(min, vaccine.suggestAgeMin || 0), 100) : 0}
                      vaccines={combo.vaccines}
                      onClick={() => handleAddToCart(combo, 'combo')}
                      isBooking={isBooking}
                    />
                  ))}
                </div>
              </section>
            )} 
          </div>

          {/* Right Side - Cart Summary (30%) */}
          <div className="lg:w-[25%]">
            <div className="bg-white p-6 rounded-xl shadow-md sticky top-[19rem]">
              <h2 className="text-xl font-bold mb-6 pb-2 border-b">Booking Summary</h2>

              {cart.length === 0 ? (
                <div className="py-8 text-center">
                  <ShoppingCart size={40} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">Your cart is empty</p>
                  <p className="text-sm text-gray-400 mt-1">Add vaccines to proceed</p>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="max-h-[calc(100vh-300px)] overflow-y-auto mb-4 pr-2">
                    {/* Vaccines Section */}
                    {cart.filter(item => item.type === 'vaccine').length > 0 && (
                      <div className="mb-4">
                        <h3 className="font-medium text-gray-700 mb-2">Vaccines</h3>
                        {cart.filter(item => item.type === 'vaccine').map(item => (
                          <div key={`cart-vaccine-${item.id}`} className="flex justify-between items-center py-2 group">
                            <div className="flex items-center flex-1 min-w-0">
                              <span className="truncate text-sm">{item.name}</span>
                            </div>
                            <div className="flex items-center ml-2">
                              <span className="text-blue-600 font-medium text-sm mr-2">
                                {FormmatDeicimal(item.price)} {` `} VND
                              </span>
                              <button
                                onClick={() => removeFromCart(item.id, 'vaccine')}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Combos Section */}
                    {cart.filter(item => item.type === 'combo').length > 0 && (
                      <div className="mb-4">
                        <h3 className="font-medium text-gray-700 mb-2">Combos</h3>
                        {cart.filter(item => item.type === 'combo').map(item => (
                          <div key={`cart-combo-${item.id}`} className="flex justify-between items-center py-2 group">
                            <div className="flex items-center flex-1 min-w-0">
                              <span className="truncate text-sm">{item.name}</span>
                            </div>
                            <div className="flex items-center ml-2">
                              <span className="text-blue-600 font-medium text-sm mr-2">
                                {FormmatDeicimal(item.price)} {` `} VND
                              </span>
                              <button
                                onClick={() => removeFromCart(item.id, 'combo')}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price Summary */}
                  <div className="border-t pt-4 mt-2">
                    <div className="flex justify-between items-center text-lg font-bold mt-4 pt-2 border-t">
                      <span>Total</span>
                      <span className="text-blue-600">{FormmatDeicimal(totalPrice)} {` `} VND</span>
                    </div>
                  </div>
                </>
              )}

              {/* Checkout Button */}
              <button onClick={() => navigate(`/information/${user?.id}`)}
                className={`w-full py-3 rounded-lg mt-6 transition-colors flex items-center justify-center ${cart.length === 0
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                disabled={cart.length === 0}
              >
                <ShoppingCart size={18} className="mr-2" />
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default boydVaritants;