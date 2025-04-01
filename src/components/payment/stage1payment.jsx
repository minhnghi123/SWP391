import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { childAction } from "../redux/reducers/selectChildren";
import HeaderLeftSide from "./eachComponentStage1/leftSide/HeaderLeftSide";
import ChildrenList from "./eachComponentStage1/leftSide/ChildrenList";
import FormAddChildren from "./eachComponentStage1/leftSide/formAddChildren";
import ChildCard from "./eachComponentStage1/rightSide/ChildCard";
import ChooseDateVaccination from "./eachComponentStage1/rightSide/ChooseDateVaccination";
import FormAdvitory_detail from "./eachComponentStage1/rightSide/FormAdvitory_detail";
import NoSelectChildren from "./eachComponentStage1/rightSide/NoSelectChildren";
import { useNavigate } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import CalculateAge from "../../utils/calculateYearOld";
import { toast } from "react-toastify";
import { fetchHistoryTracking, fetchBooking } from "../redux/actions/historyTracking";
import ModalNoQuantity from "./modaNoQuanlity";

const url = import.meta.env.VITE_BASE_URL_DB;

export default function Stage1Payment({ id }) {
  const api = useAxios();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const listChildren = useSelector((state) => state.children.listChildren);
  const arriveDate = useSelector((state) => state.children.arriveDate);
  const advitory = useSelector((state) => state.children.advitory_detail);
  const listVaccine = useSelector((state) => state.vaccine.listVaccine);
  const listComboVaccine = useSelector((state) => state.vaccine.listComboVaccine);

  // Local state
  const [user, setUser] = useState(null);
  const [child, setChild] = useState([]);
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [inputAdvisory, setInputAdvisory] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [checkSent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState()
  const [inputData, setData] = useState({
    parentId: id || "",
    name: "",
    dateOfBirth: "",
    gender: "",
  });

  // check child enough age 
  useEffect(() => {
    if (listChildren.length > 0) {
      const newList = listChildren.filter((child) => {
        const isVaccineValid = isVaccineSuitableForAnyChild(child);
        const isComboValid = isComboSuitableForAnyChild(child);
        return isVaccineValid || isComboValid;
      });

      if (newList.length !== listChildren.length) {
        dispatch(childAction.completePayment()) //reset list children
      }
    }
  }, [listChildren, listVaccine, listComboVaccine]);

  //scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //fetch data
  useEffect(() => {
    if (!id) return;
    getUserData();
    dispatch(fetchHistoryTracking(api, id));
    dispatch(fetchBooking(api, id));
  }, [id,trigger]);

  //reset form
  useEffect(() => {
    if (listChildren.length === 0) {
      dispatch(childAction.resetArriveDate());
      dispatch(childAction.resetForm());
      setSent(false);
    }
  }, [listChildren]);

  // Fetch user and children data
  const getUserData = async () => {
    setLoading(true);
    setErr(null);
    try {
      const userResponse = await api.get(`${url}/User/get-user-by-id/${id}`);
      if (userResponse.status === 200) setUser(userResponse.data.user);

      const childResponse = await api.get(`${url}/Child/get-child-by-parents-id/${id}`);
      if (childResponse.status === 200 && Array.isArray(childResponse.data)) {
        setChild(childResponse.data);
      } else {
        setChild([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErr("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  // Handle form input and submission for adding child
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // handle submit  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputData.name || !inputData.dateOfBirth || !inputData.gender) {
      setErr("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const dateOfBirthISO = new Date(inputData.dateOfBirth).toISOString();
      const value = {
        parentId: id,
        name: inputData.name,
        dateOfBirth: dateOfBirthISO,
        gender: inputData.gender === "Male" ? 0 : 1,
      };
      const response = await api.post(`${url}/Child/create-child`, value);
      if (response.status === 200) {
        toast.success("Child added successfully");
        setTrigger((prev) => !prev);
        setIsOpenFirst(false);
        setData({ parentId: id || "", name: "", dateOfBirth: "", gender: "" });
      }
    } catch (error) {
      setErr(error.response?.data?.message || "Failed to add child");
    } finally {
      setLoading(false);
    }
  };

  // Advisory input handling
  const handleInputAdvisory = (e) => {
    e.preventDefault();
    if (!inputAdvisory.trim()) return toast.error("Please enter an advisory message");
    dispatch(childAction.replaceAdvitory(inputAdvisory));
    setInputAdvisory("");
    setSent(true);
  };

  const resetForm = () => {
    dispatch(childAction.resetForm());
    setSent(false);
  };

  // Child management
  const handleRemove = (childId) => {
    dispatch(childAction.deleteChild(childId));
  };

  const handleAddChildren = (child) => {
    dispatch(childAction.chooseChildren({ ...child, parentID: id }));
  };

  // Vaccine and combo suitability checks
  const isVaccineSuitableForAnyChild = (child) => {
    if (!child?.dateOfBirth) return false;
    const age = parseInt(CalculateAge(child.dateOfBirth).split(" ")[0], 10);
    return listVaccine?.every((v) => age >= v.minAge && age <= v.maxAge) || false;
  };

  // check combo vaccine suitable for any child
  const isComboSuitableForAnyChild = (child) => {
    if (!child?.dateOfBirth) return false;

    const age = parseInt(CalculateAge(child.dateOfBirth).split(" ")[0], 10);
    return (
      listComboVaccine?.some((combo) =>
        combo.vaccines.every((v) => age >= v.suggestAgeMin && age <= v.suggestAgeMax)
      ) || false
    );
  };

  // Quantity check
  const handleCheckQuantity = () => {
    const totalListChild = listChildren.length;
    // Bước 1: Tạo Map để gom nhóm vaccine theo ID
    const vaccineMap = new Map();

    // ✅ Thêm vắc-xin từ listVaccine
    listVaccine?.forEach(vaccine => {
      vaccineMap.set(vaccine.id, {
        name: vaccine.name,
        quantity: vaccine.quantity,
        required: 0 
      });
    });

    // ✅ Thêm vắc-xin từ listComboVaccine
    listComboVaccine?.forEach(combo => {
      combo.listVaccine.forEach(vaccine => {
        if (vaccineMap.has(vaccine.id)) {
          vaccineMap.get(vaccine.id).quantity = vaccine.quantity;
        } else {
          vaccineMap.set(vaccine.id, {
            name: vaccine.name,
            quantity: vaccine.quantity,
            required: 0
          });
        }
      });
    });
    
    // ✅ Tính tổng số liều cần dùng (cộng cả listVaccine và listComboVaccine)
    listVaccine?.forEach(vaccine => {
      if (vaccineMap.has(vaccine.id)) {
        vaccineMap.get(vaccine.id).required += vaccine.doesTimes * totalListChild;
      }
    });

    listComboVaccine?.forEach(combo => {
      combo.listVaccine.forEach(vaccine => {
        if (vaccineMap.has(vaccine.id)) {
          vaccineMap.get(vaccine.id).required += vaccine.doesTimes * totalListChild;
        }
      });
    }); 

    // console.log(vaccineMap)
    // Bước 3: Kiểm tra nếu có vaccine nào không đủ
    const shortageVaccines = [];

    vaccineMap?.forEach((vaccine, id) => {
      if (vaccine.quantity < vaccine.required) {
        shortageVaccines.push({
          id,
          name: vaccine.name,
          required: vaccine.required,
          available: vaccine.quantity,
          shortage: vaccine.required - vaccine.quantity
        });
      }
    });
    //  console.log(shortageVaccines)
    // check shortage vaccine
    if (shortageVaccines.length > 0) {
      setIsModalOpen(true);
      setValue({
        totalChildren: totalListChild,
        shortageVaccines
      });
    } else {
      navigate(`/payment/${id}`);
    }

  }
  
  return (
    <div className="max-w-[1400px] my-10 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side */}
        <div className="w-full lg:w-[550px] space-y-6">
          <HeaderLeftSide user={user} />
          <ChildrenList
            child={child}
            listChildren={listChildren}
            handleAddChildren={handleAddChildren}
            isOpenFirst={isOpenFirst}
            setIsOpenFirst={setIsOpenFirst}
            isVaccineSuitableForAnyChild={isVaccineSuitableForAnyChild}
            isComboSuitableForAnyChild={isComboSuitableForAnyChild}
            loading={loading}
          />
          {isOpenFirst && (
            <FormAddChildren
              handleOnchange={handleOnchange}
              handleSubmit={handleSubmit}
              err={err}
              loading={loading}
              inputData={inputData}
            />
          )}
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-[650px] space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 sticky top-6">
            {listChildren.length > 0 ? (
              <>
                <ChooseDateVaccination arriveDate={arriveDate} />
                <div className="space-y-4 border-b border-gray-200 pb-4 mb-4">
                  {listChildren.map((child) => (
                    <ChildCard
                      key={child.id}
                      child={child}
                      handleRemove={() => handleRemove(child.id)}
                      parentName={user?.name}
                      isVaccineSuitableForAnyChild={isVaccineSuitableForAnyChild}
                      isComboSuitableForAnyChild={isComboSuitableForAnyChild}
                    />
                  ))}
                </div>
                <FormAdvitory_detail
                  advitory={advitory}
                  inputAdvisory={inputAdvisory}
                  setInputAdvisory={setInputAdvisory}
                  checkSent={checkSent}
                  handleInputAdvisory={handleInputAdvisory}
                  resetForm={resetForm}
                />
                <button
                  onClick={arriveDate ? handleCheckQuantity : undefined}
                  disabled={!arriveDate}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold shadow-md hover:from-teal-600 hover:to-teal-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Payment
                </button>
              </>
            ) : (
              <NoSelectChildren />
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ModalNoQuantity
          onClose={() => setIsModalOpen(false)}
          shortageInfo={value}
        />
      )}
    </div>
  );
}