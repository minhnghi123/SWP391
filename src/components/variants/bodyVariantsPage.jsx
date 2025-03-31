import React, { useState, useEffect } from "react";
import { Search, ArrowLeft, ShoppingCart, X, Plus, Check } from "lucide-react";
import Variants from "../home/Variants";
import FormmatDeicimal from "../../utils/calculateMoney";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { vaccineAction } from "../redux/reducers/selectVaccine";
import ModalDetailVaccine from "../home/modalDetailVaccine";
import ModalDetailCombo from "../home/modalDetailCombo";
import useAxios from "../../utils/useAxios";
import Infomation from "../../../Infomation.json";
import Pagination from "../../utils/pagination";

const url = import.meta.env.VITE_BASE_URL_DB;

function BodyVariants() {
  const vc = Infomation.vaccine;
  const vcCombo = Infomation.vaccineCombo;

  const api = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");

  const cart = useSelector((state) => [
    ...state.vaccine.listVaccine,
    ...state.vaccine.listComboVaccine,
  ]);
  const totalPrice = useSelector((state) => state.vaccine.totalPrice);
  const user = useSelector((state) => state.account.user);
  const [comboVaccine, setComboVaccines] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const isBooking = useSelector((state) => state.vaccine.isBooking);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [isOpenCombo, setIsOpenCombo] = useState(false);

  const [vaccinePage, setVaccinePage] = useState(1);
  const [vaccineItemsPerPage, setVaccineItemsPerPage] = useState(6);
  const [vaccineSortField, setVaccineSortField] = useState("name");
  const [vaccineSortOrder, setVaccineSortOrder] = useState("asc");

  const [comboPage, setComboPage] = useState(1);
  const [comboItemsPerPage, setComboItemsPerPage] = useState(6);
  const [comboSortField, setComboSortField] = useState("comboName");
  const [comboSortOrder, setComboSortOrder] = useState("asc");

  const handleSelectVaccine = (vaccine) => {
    setSelectedVaccine(vaccine);
    setIsOpen(true);
  };

  const handleSelectCombo = (combo) => {
    setSelectedCombo(combo);
    setIsOpenCombo(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchDataVariants = async () => {
      try {
        const [vaccinesRes, comboVaccineRes] = await Promise.all([
          api.get(`${url}/Vaccine/get-all-vaccines`),
          api.get(`${url}/VaccineCombo/get-all-vaccine-combo`),
        ]);

        if (isMounted) {
          if (vaccinesRes.status === 200 && vaccinesRes.data)
            setVaccines(vaccinesRes.data);
          if (comboVaccineRes.status === 200 && comboVaccineRes.data)
            setComboVaccines(comboVaccineRes.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataVariants();

    return () => {
      isMounted = false;
    };
  }, [url]);

  const filteredVaccines = vaccines.filter((vaccine) =>
    vaccine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedVaccines = [...filteredVaccines].sort((a, b) => {
    const valueA = vaccineSortField === "price" ? a.price : a[vaccineSortField];
    const valueB = vaccineSortField === "price" ? b.price : b[vaccineSortField];
    if (vaccineSortField === "price") {
      return vaccineSortOrder === "asc" ? valueA - valueB : valueB - valueA;
    }
    return vaccineSortOrder === "asc"
      ? String(valueA).localeCompare(String(valueB))
      : String(valueB).localeCompare(String(valueA));
  });
  const totalVaccinePages = Math.ceil(
    sortedVaccines.length / vaccineItemsPerPage
  );
  const vaccineStartIndex = (vaccinePage - 1) * vaccineItemsPerPage;
  const vaccineEndIndex = vaccineStartIndex + vaccineItemsPerPage;
  const paginatedVaccines = sortedVaccines.slice(
    vaccineStartIndex,
    vaccineEndIndex
  );

  const filteredCombos = comboVaccine.filter((combo) =>
    combo.comboName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedCombos = [...filteredCombos].sort((a, b) => {
    const valueA =
      comboSortField === "finalPrice" ? a.finalPrice : a[comboSortField];
    const valueB =
      comboSortField === "finalPrice" ? b.finalPrice : b[comboSortField];
    if (comboSortField === "finalPrice") {
      return comboSortOrder === "asc" ? valueA - valueB : valueB - valueA;
    }
    return comboSortOrder === "asc"
      ? String(valueA).localeCompare(String(valueB))
      : String(valueB).localeCompare(String(valueA));
  });
  const totalComboPages = Math.ceil(sortedCombos.length / comboItemsPerPage);
  const comboStartIndex = (comboPage - 1) * comboItemsPerPage;
  const comboEndIndex = comboStartIndex + comboItemsPerPage;
  const paginatedCombos = sortedCombos.slice(comboStartIndex, comboEndIndex);

  const handleAddToCart = (vaccine, type) => {
    const isCombo =
      Array.isArray(vaccine?.vaccines) && vaccine.vaccines.length > 0;
    const finalPrice = isCombo ? vaccine.finalPrice : vaccine.price;
    // const ischeck =
    //   type === "combo" ? `combo-${vaccine.id}` : `vaccine-${vaccine.id}`;
    const name = type === "combo" ? vaccine.comboName : vaccine.name;

    const isItemInCart = cart.some(
      (item) =>
        (type === "combo" && item.type === "combo" && item.id === vaccine.id) ||
        (type === "vaccine" &&
          item.type === "vaccine" &&
          item.id === vaccine.id)
    );

    if (isItemInCart) {
      removeFromCart(vaccine.id, type);
    } else {
      if (isCombo) {
        dispatch(
          vaccineAction.addComboVaccine({
            id: vaccine.id,
            name: name,
            price: finalPrice,
            description: vaccine.description,
            country: vaccine.fromCountry,
            vaccines: vaccine.vaccines,
            type: type,
            listVaccine: vaccine.vaccines.map((item) => ({
              id: item.id,
              name: item.name,
              price: item.price,
              suggestAgeMax: item.suggestAgeMax,
              suggestAgeMin: item.suggestAgeMin,
              quantity: item.quantity,
              doesTimes: item.doesTimes,
            })),
          })
        );
      } else {
        dispatch(
          vaccineAction.addVaccine({
            id: vaccine.id,
            name: name,
            price: vaccine.price,
            maxAge: vaccine.suggestAgeMax,
            minAge: vaccine.suggestAgeMin,
            type: type,
            quantity: vaccine.quantity,
            doesTimes: vaccine.doesTimes,
          })
        );
      }
    }
  };

  const removeFromCart = (itemId, type) => {
    if (type === "vaccine") {
      dispatch(vaccineAction.deleteVaccine(itemId));
    } else {
      dispatch(vaccineAction.deleteComboVaccine(itemId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-all"
          >
            <ArrowLeft className="mr-2" size={18} />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
            Vaccine Booking
          </h1>
          <div className="w-10"></div> {/* Placeholder để cân đối */}
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 py-6">
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full sm:flex-1">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search vaccines..."
              className="w-full px-6 py-3 pl-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
            />
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          <select
            className="w-full sm:w-auto px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:border-blue-400 transition-all cursor-pointer"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Vaccines</option>
            <option value="Single">Single Vaccines</option>
            <option value="Combo">Combo Packages</option>
          </select>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Vaccine List */}
          <div className="w-full lg:w-[75%] space-y-8">
            {(filterType === "All" || filterType === "Single") && (
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <span className="mr-2">Single Vaccines</span>
                    <span className="text-sm font-normal text-gray-500">
                      ({filteredVaccines.length} available)
                    </span>
                  </h2>
                </div>
                {filteredVaccines.length === 0 ? (
                  <p className="text-gray-500">No vaccines found.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {paginatedVaccines.map((item) => (
                      <Variants
                        key={`vaccine-${item.id}`}
                        id={item.id}
                        image={vc.find((v) => v.id === item.id)?.img}
                        name={item.name}
                        description={item.description}
                        type="vaccine"
                        priceGoc={null}
                        priceSale={item.price}
                        country={item.fromCountry}
                        maxAge={item.suggestAgeMax}
                        minAge={item.suggestAgeMin}
                        onClick={() => handleAddToCart(item, "vaccine")}
                        quantity={item.quantity}
                        isBooking={isBooking}
                        handleSelectVaccine={() => handleSelectVaccine(item)}
                      />
                    ))}
                  </div>
                )}
                {filteredVaccines.length > 0 && (
                  <Pagination
                    currentPage={vaccinePage}
                    totalPages={totalVaccinePages || 1}
                    itemsPerPage={vaccineItemsPerPage}
                    setCurrentPage={setVaccinePage}
                    setItemsPerPage={setVaccineItemsPerPage}
                    totalItems={filteredVaccines.length}
                  />
                )}
              </section>
            )}

            {(filterType === "All" || filterType === "Combo") && (
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <span className="mr-2">Vaccine Combos</span>
                    <span className="text-sm font-normal text-gray-500">
                      ({filteredCombos.length} available)
                    </span>
                  </h2>
                </div>
                {filteredCombos.length === 0 ? (
                  <p className="text-gray-500">No combos found.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {paginatedCombos.map((combo) => (
                      <Variants
                        key={`combo-${combo.id}`}
                        id={combo.id}
                        image={vcCombo.find((v) => v.id === combo.id)?.img}
                        name={combo.comboName}
                        description={combo.description}
                        type="combo"
                        discount={combo.discount}
                        priceGoc={combo.discount ? combo.totalPrice : null}
                        priceSale={
                          combo.discount ? combo.finalPrice : combo.price
                        }
                        country={combo.fromCountry}
                        maxAge={
                          combo.vaccines && combo.vaccines.length > 0
                            ? combo.vaccines.reduce(
                              (max, vaccine) =>
                                Math.max(max, vaccine.suggestAgeMax || 0),
                              0
                            )
                            : 0
                        }
                        minAge={
                          combo.vaccines && combo.vaccines.length > 0
                            ? combo.vaccines.reduce(
                              (min, vaccine) =>
                                Math.min(min, vaccine.suggestAgeMin || 0),
                              100
                            )
                            : 0
                        }
                        vaccines={combo.vaccines}
                        onClick={() => handleAddToCart(combo, "combo")}
                        handleSelectCombo={() => handleSelectCombo(combo)}
                        isBooking={isBooking}
                      />
                    ))}
                  </div>
                )}
                {filteredCombos.length > 0 && (
                  <Pagination
                    currentPage={comboPage}
                    totalPages={totalComboPages || 1}
                    itemsPerPage={comboItemsPerPage}
                    setCurrentPage={setComboPage}
                    setItemsPerPage={setComboItemsPerPage}
                    totalItems={filteredCombos.length}
                  />
                )}
              </section>
            )}
          </div>

          {/* Cart Summary */}
          <div className="w-full lg:w-[25%] mt-6 lg:mt-0">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold mb-6 pb-2 border-b">
                Booking Summary
              </h2>

              {cart.length === 0 ? (
                <div className="py-8 text-center">
                  <ShoppingCart
                    size={40}
                    className="mx-auto text-gray-300 mb-3"
                  />
                  <p className="text-gray-500">Your cart is empty</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Add vaccines to proceed
                  </p>
                </div>
              ) : (
                <>
                  <div className="max-h-[calc(100vh-300px)] overflow-y-auto mb-4 pr-2">
                    {cart.filter((item) => item.type === "vaccine").length >
                      0 && (
                        <div className="mb-4">
                          <h3 className="font-medium text-gray-700 mb-2">
                            Vaccines
                          </h3>
                          {cart
                            .filter((item) => item.type === "vaccine")
                            .map((item) => (
                              <div
                                key={`cart-vaccine-${item.id}`}
                                className="flex justify-between items-center py-2 group"
                              >
                                <div className="flex items-center flex-1 min-w-0">
                                  <span className="truncate text-sm">
                                    {item.name}
                                  </span>
                                </div>
                                <div className="flex items-center ml-2">
                                  <span className="text-blue-600 font-medium text-sm mr-2">
                                    {FormmatDeicimal(item.price)} VND
                                  </span>
                                  <button
                                    onClick={() =>
                                      removeFromCart(item.id, "vaccine")
                                    }
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}

                    {cart.filter((item) => item.type === "combo").length > 0 && (
                      <div className="mb-4">
                        <h3 className="font-medium text-gray-700 mb-2">
                          Combos
                        </h3>
                        {cart
                          .filter((item) => item.type === "combo")
                          .map((item) => (
                            <div
                              key={`cart-combo-${item.id}`}
                              className="flex justify-between items-center py-2 group"
                            >
                              <div className="flex items-center flex-1 min-w-0">
                                <span className="truncate text-sm">
                                  {item.name}
                                </span>
                              </div>
                              <div className="flex items-center ml-2">
                                <span className="text-blue-600 font-medium text-sm mr-2">
                                  {FormmatDeicimal(item.price)} VND
                                </span>
                                <button
                                  onClick={() =>
                                    removeFromCart(item.id, "combo")
                                  }
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

                  <div className="border-t pt-4 mt-2">
                    <div className="flex justify-between items-center text-lg font-bold mt-4 pt-2 border-t">
                      <span>Total</span>
                      <span className="text-blue-600">
                        {FormmatDeicimal(totalPrice)} VND
                      </span>
                    </div>
                  </div>
                </>
              )}

              <button
                onClick={() => navigate(`/information/${user?.id}`)}
                className={`w-full py-3 rounded-lg mt-6 transition-colors flex items-center justify-center ${cart.length === 0
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
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

      {isOpen && (
        <ModalDetailVaccine
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          vaccine={selectedVaccine}
          onClick={() => handleAddToCart(selectedVaccine, "vaccine")}
        />
      )}
      {isOpenCombo && (
        <ModalDetailCombo
          isOpen={isOpenCombo}
          onClose={() => setIsOpenCombo(false)}
          combo={selectedCombo}
          onClick={() => handleAddToCart(selectedCombo, "combo")}
        />
      )}
    </div>
  );
}

export default BodyVariants;