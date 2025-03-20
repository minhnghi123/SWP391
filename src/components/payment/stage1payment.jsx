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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import CalculateAge from "../../utils/calculateYearOld";
import { toast } from "react-toastify";
const url = import.meta.env.VITE_BASE_URL_DB
export default function Stage1Payment({ id }) {
  const api = useAxios()
  const navigate = useNavigate()



  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch();
  const listChildren = useSelector((state) => state.children.listChildren);
  const arriveDate = useSelector((state) => state.arriveDate.arriveDate);
  const advitory = useSelector((state) => state.children.advitory_detail);
  const [user, setUser] = useState(null)
  const [child, setChild] = useState(null);
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [inputAdvisory, setInputAdvisory] = useState("");
  const listVaccine = useSelector((state) => state.vaccine.listVaccine);
  const listComboVaccine = useSelector((state) => state.vaccine.listComboVaccine);
  const [trigger, setTrigger] = useState(false)
  const [checkSent, setSent] = useState(false);
  const [inputData, setData] = useState({
    parentId: id || "",
    name: "",
    dateOfBirth: "",
    gender: "",
  });



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (!id) return;
    const getUserData = async () => {
      setLoading(true);
      setErr(null);
      try {
        // Fetch user data
        const [user, child] = await Promise.all([
          api.get(`${url}/User/get-user-by-id/${id}`),
          api.get(`${url}/Child/get-child-by-parents-id/${id}`)
        ])
        if (user.status === 200) {
          setUser(user.data.user)
        }
        if (child.status === 200) {
          setChild(child.data)
        }

      } catch (error) {

        setErr("Fetch failed");
      } finally {
        setLoading(false);
      }

    };

    getUserData();
  }, [id, trigger]);
  //create child
  const handleOnchange = (e) => {
    const { name, value } = e.target
    setData({ ...inputData, [name]: value })

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    if (!inputData.name || !inputData.dateOfBirth || !inputData.gender) {
      setErr("Please enter all fields");
      setLoading(false);
      return;
    }

    const dateOfBirthISO = inputData.dateOfBirth instanceof Date
      ? inputData.dateOfBirth.toISOString()
      : new Date(inputData.dateOfBirth).toISOString();

    try {
      const value = {
        parentId: id,
        name: inputData.name,
        dateOfBirth: dateOfBirthISO,
        gender: inputData.gender === 'Male' ? 0 : 1,
      };


      const response = await api.post(`${url}/Child/create-child`, value);
      if (response.status === 200) {
        toast.success("Create child successfully")
        setTrigger(prev => !prev)
        setIsOpenFirst(false);
        setData({
          name: "",
          dateOfBirth: "",
          gender: "",
        })
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
      setErr(error.response?.data?.message || "Create child failed");
    } finally {
      setLoading(false);
    }
  };


  const handleInputAdvisory = (e) => {
    e.preventDefault();
    if (!inputAdvisory.trim()) return alert("Please enter your advisory message.");
    dispatch(childAction.replaceAdvitory(inputAdvisory));
    setInputAdvisory("");
    setSent(true);
  };

  const resetForm = () => {
    dispatch(childAction.resetForm());
    setSent(false);
  };

  //remove child on list vaccination
  const handleRemove = (id) => {
    dispatch(childAction.deleteChild(id));
  };
  // add child on list vaccination
  const handleAddChildren = (child) => {
    dispatch(
      childAction.chooseChildren({
        ...child,
        parentID: id,
      })
    );
  };



  //check vaccine suitable for any child
  const isVaccineSuitableForAnyChild = (childToCheck) => {
    if (!childToCheck || !childToCheck.dateOfBirth) return false; 

    const ageString = CalculateAge(childToCheck.dateOfBirth);
    const age = parseInt(ageString.split(" ")[0], 10); 

    if (isNaN(age)) return false; // Nếu age không hợp lệ, trả về false

    return listVaccine?.some(vaccine => age >= vaccine.minAge && age <= vaccine.maxAge) || false;
  };

  // Check combo suitability
  const isComboSuitableForAnyChild = (childToCheck) => {
    if (!childToCheck || !childToCheck.dateOfBirth) return false;

    const ageString = CalculateAge(childToCheck.dateOfBirth);
    const age = parseInt(ageString.split(" ")[0], 10);

    if (isNaN(age)) return false;

    return listComboVaccine?.some(combo =>
      combo.vaccines.every(vaccine => age >= vaccine.suggestAgeMin && age <= vaccine.suggestAgeMax)
    ) || false;
  };


  return (


    <div className="max-w-[1400px] my-10 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 justify-center">
        <div className="w-full lg:w-[550px] space-y-8">
          <HeaderLeftSide user={user} />
          <ChildrenList
            child={child}
            listChildren={listChildren}
            handleAddChildren={handleAddChildren}
            isOpenFirst={isOpenFirst}
            setIsOpenFirst={setIsOpenFirst}
            isVaccineSuitableForAnyChild={isVaccineSuitableForAnyChild}
            isComboSuitableForAnyChild={isComboSuitableForAnyChild}
          />
          {isOpenFirst && <FormAddChildren handleOnchange={handleOnchange} handleSubmit={handleSubmit} err={err} />}
        </div>




        <div className="w-full lg:w-[650px] space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 sticky top-6">
            {listChildren.length > 0 ? (
              <>
                <ChooseDateVaccination
                  arriveDate={arriveDate}


                />
                <div className="space-y-1 border-gray-200 border-b mb-5">
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
                  onClick={arriveDate !== null ? () => navigate(`/payment/${id}`) : undefined}
                  className={`w-full mt-6 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium shadow-lg transition-all duration-300 ${arriveDate !== null ? "hover:from-teal-600 hover:to-teal-700" : "pointer-events-none opacity-50"
                    }`}
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
     
    </div>
    

  );
}