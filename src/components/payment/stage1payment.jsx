import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { childAction } from "../redux/reducers/selectChildren";
import HeaderLeftSide from "./eachComponentStage1/leftSide/HeaderLeftSide";
import ChildrenList from "./eachComponentStage1/leftSide/ChildrenList";
import FormAddChildren from "./eachComponentStage1/leftSide/formAddChildren";
import ChildCard from "./eachComponentStage1/rightSide/ChildCard";
import ChooseDateVaccination from "./eachComponentStage1/rightSide/ChooseDateVaccination,";
import FormAdvitory_detail from "./eachComponentStage1/rightSide/FormAdvitory_detail";
import NoSelectChildren from "./eachComponentStage1/rightSide/NoSelectChildren";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAxios from "../../utils/useAxios";

const url = import.meta.env.VITE_BASE_URL_DB
export default function Stage1Payment({id}) {
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

  const [checkSent, setSent] = useState(false);
  const [inputDat, setData] = useState({
    parentID: id || "",
    id: "",
    name: "",
    dateOfBirth: "",
    gender: "",
    status: true,
    createDate: "",
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
        const response = await api.get(`${url}/User/get-user-by-id/${id}`)
        if (response.status === 200) {
          setUser(response.data);
        }

        // Fetch child data
      const res = await api.get(`${url}/Child/get-child-by-parents-id/${id}`)
        if (res.status === 200) {
          setChild(res.data);
        }
      } catch (error) {
       
        setErr("Fetch failed");
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [id]);


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
        parentID: user.id,
        ...child,
      })
    );
  };


  const handleChange = (e) => {
    dispatch(childAction.handleOnChange({ name: e.target.name, value: e.target.value }));
  };

  //add new children
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputDat.name || !inputDat.dateOfBirth) return alert("Vui lòng nhập đủ thông tin!");
    setData({ parentID: user.id, id: "", name: "", dateOfBirth: "", gender: "", status: true });
    setIsOpenFirst(false);
  };

  return (
   

      <div className="max-w-[1400px] my-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full lg:w-[550px] space-y-8">
            <HeaderLeftSide user={user?.user} />
            <ChildrenList
             child={child}
              listChildren={listChildren}
              handleAddChildren={handleAddChildren}
              isOpenFirst={isOpenFirst}
              setIsOpenFirst={setIsOpenFirst}
            />
            {isOpenFirst && <FormAddChildren handleOnchange={handleChange} handleSubmit={handleSubmit} />}
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
                        parentName={user?.user?.name}
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
                    onClick={arriveDate !== null ? ()=>navigate(`/payment/${id}`) : undefined}
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