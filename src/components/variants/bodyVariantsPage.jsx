import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft, ShoppingCart, X, Plus, Check } from 'lucide-react';
import Variants from '../home/Variants';
import FormmatDeicimal from '../../utils/calculateMoney';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { vaccineAction } from '../redux/reducers/selectVaccine';
import useAxios from '../../utils/useAxios';

const url = import.meta.env.VITE_BASE_URL_DB;

function BoydVaritants() {
  const api = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  const cart = useSelector((state) => [...state.vaccine.listVaccine, ...state.vaccine.listComboVaccine]);
  const totalPrice = useSelector((state) => state.vaccine.totalPrice);
  const user = useSelector((state) => state.account.user);
  const [comboVaccine, setComboVaccines] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const isBooking = useSelector((state) => state.vaccine.isBooking);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
   
    const fetchDataVariants = async () => {
      try {
        const [vaccinesRes, comboVaccineRes] = await Promise.all([
          api.get(`${url}/Vaccine/get-all-vaccines`),
          api.get(`${url}/VaccineCombo/get-all-vaccine-combo`)
        ])
        if (vaccines.status === 200) setVaccines(vaccines.data)
        if (comboVaccine.status === 200) setComboVaccines(comboVaccine.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchDataVariants()
  }, [])


  const filteredVaccines = vaccines.filter((vaccine) =>
    vaccine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCombos = comboVaccine.filter((combo) =>
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
      removeFromCart(vaccine.id, type);
    } else {
      if (isCombo) {
        dispatch(vaccineAction.addComboVaccine({
          id: vaccine.id,
          name: name,
          price: finalPrice,
          description: vaccine.description,
          country: vaccine.fromCountry,
          vaccines: vaccine.vaccines,
          type: type,
          vaccines: vaccine.vaccines.map(vaccine => ({
            id: vaccine.id,
            name: vaccine.name,
            price: vaccine.price,
            suggestAgeMax: vaccine.suggestAgeMax,
            suggestAgeMin: vaccine.suggestAgeMin,
          }))
        }));
      } else {
        dispatch(vaccineAction.addVaccine({
          id: vaccine.id,
          name: name,
          price: vaccine.price,

          maxAge: vaccine.suggestAgeMax,
          minAge: vaccine.suggestAgeMin,
          type: type,
        }));
      }
    }
  };

  const removeFromCart = (itemId, type) => {
    if (type === 'vaccine') {
      dispatch(vaccineAction.deleteVaccine(itemId));
    } else {
      dispatch(vaccineAction.deleteComboVaccine(itemId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 shadow-lg backdrop-blur-lg">
        <div className="container max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-700 hover:text-indigo-600 transition-all duration-300 group"
          >
            <ArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" size={20} />
            <span className="font-semibold text-lg">Back</span>
          </button>
          <h1 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text">
            Vaccine Booking
          </h1>
          <div>
            
          </div>

        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-6 py-12">
        {/* Search and Filter */}
        <div className="mb-12 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search vaccines or combos..."
              className="w-full px-6 py-3 pl-12 rounded-xl border border-gray-200 shadow-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <select
            className="px-4 py-3 bg-white/80 border border-gray-200 text-gray-700 rounded-xl shadow-md hover:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all duration-300 backdrop-blur-sm"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Vaccines</option>
            <option value="Single">Single Vaccines</option>
            <option value="Combo">Combo Packages</option>
          </select>
        </div>

        {/* Main Content - 7:3 Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Vaccine List (70%) */}
          <div className="lg:w-3/4 space-y-12">
            {(filterType === 'All' || filterType === 'Single') && (
              <section>
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="mr-3">Single Vaccines</span>
                  <span className="text-sm font-medium text-gray-500">({filteredVaccines.length} available)</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredVaccines.map((vaccine) => (
                    <Variants
                      key={`vaccine-${item.id}`}
                      id={item.id}
                      image={item.image}
                      name={item.name}
                      description={item.description}
                      type="vaccine"
                      priceGoc={null}
                      priceSale={item.price}
                      country={item.fromCountry}
                      maxAge={item.suggestAgeMax}
                      minAge={item.suggestAgeMin}
                      onClick={() => handleAddToCart(item, 'vaccine')}
                      isBooking={isBooking}
                      className="hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-white/90 backdrop-blur-sm"
                    />
                  ))}
                </div>
              </section>
            )}

             {(filterType === "All" || filterType === "Combo") && (
              <section>
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="mr-3">Vaccine Combos</span>
                  <span className="text-sm font-medium text-gray-500">({filteredCombos.length} available)</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                      maxAge={
                        combo.vaccines && combo.vaccines.length > 0
                          ? combo.vaccines.reduce((max, v) => Math.max(max, v.suggestAgeMax || 0), 0)
                          : 0
                      }
                      minAge={
                        combo.vaccines && combo.vaccines.length > 0
                          ? combo.vaccines.reduce((min, v) => Math.min(min, v.suggestAgeMin || 100), 100)
                          : 0
                      }
                      vaccines={combo.vaccines}
                      onClick={() => handleAddToCart(combo, 'combo')}
                      isBooking={isBooking}
                      className="hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-white/90 backdrop-blur-sm"
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Side - Cart Summary (30%) */}
          <div className="lg:w-1/4">
            <div className="bg-white/95 p-6 rounded-2xl shadow-xl static top-24 backdrop-blur-lg border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Booking Summary
              </h2>

              {cart.length === 0 ? (
                <div className="py-12 text-center">
                  <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4 animate-bounce" />
                  <p className="text-gray-600 font-medium">Your cart is empty</p>
                  <p className="text-sm text-gray-400 mt-1">Add vaccines to proceed</p>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="max-h-[50vh] overflow-y-auto mb-6 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {cart.filter((item) => item.type === 'vaccine').length > 0 && (
                      <div className="mb-4">
                        <h3 className="font-semibold text-gray-700 mb-3">Vaccines</h3>
                        {cart
                          .filter((item) => item.type === 'vaccine')
                          .map((item) => (
                            <div
                              key={`cart-vaccine-${item.id}`}
                              className="flex justify-between items-center py-3 group hover:bg-gray-50 rounded-lg transition-all duration-200"
                            >
                              <span className="truncate text-sm text-gray-600 flex-1">{item.name}</span>
                              <div className="flex items-center ml-2">
                                <span className="text-indigo-600 font-medium text-sm mr-3">
                                  {FormmatDeicimal(item.price)} VND
                                </span>
                                <button
                                  onClick={() => removeFromCart(item.id, 'vaccine')}
                                  className="text-gray-400 hover:text-red-500 transition-colors duration-200 transform hover:scale-110"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}

                    {cart.filter((item) => item.type === 'combo').length > 0 && (
                      <div className="mb-4">
                        <h3 className="font-semibold text-gray-700 mb-3">Combos</h3>
                        {cart
                          .filter((item) => item.type === 'combo')
                          .map((item) => (
                            <div
                              key={`cart-combo-${item.id}`}
                              className="flex justify-between items-center py-3 group hover:bg-gray-50 rounded-lg transition-all duration-200"
                            >
                              <span className="truncate text-sm text-gray-600 flex-1">{item.name}</span>
                              <div className="flex items-center ml-2">
                                <span className="text-indigo-600 font-medium text-sm mr-3">
                                  {FormmatDeicimal(item.price)} VND
                                </span>
                                <button
                                  onClick={() => removeFromCart(item.id, 'combo')}
                                  className="text-gray-400 hover:text-red-500 transition-colors duration-200 transform hover:scale-110"
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
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold text-gray-800">
                      <span>Total</span>
                      <span className="text-indigo-600">{FormmatDeicimal(totalPrice)} VND</span>
                    </div>
                  </div>
                </>
              )}

              {/* Checkout Button */}
              <button
                onClick={() => navigate(`/information/${user?.id}`)}
                className={`w-full py-3 mt-6 rounded-xl text-white font-medium transition-all duration-300 shadow-lg flex items-center justify-center ${
                  cart.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 hover:shadow-xl transform hover:-translate-y-1'
                }`}
                disabled={cart.length === 0}
              >
                <ShoppingCart size={18} className="mr-2" />
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BoydVaritants;