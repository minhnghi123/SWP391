import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { childAction } from "../redux/reducers/selectChildren";
import { arriveActions } from "../redux/reducers/arriveDate";
import { fetchData } from "../../Api/axios";

import HeaderLeftSide from "./eachComponentStage1/leftSide/HeaderLeftSide";
import ChildrenList from "./eachComponentStage1/leftSide/ChildrenList";
import FormAddChildren from "./eachComponentStage1/leftSide/formAddChildren";
import ChildCard from "./eachComponentStage1/rightSide/ChildCard";
import ChooseDateVaccination from "./eachComponentStage1/rightSide/ChooseDateVaccination,";
import FormAdvitory_detail from "./eachComponentStage1/rightSide/FormAdvitory_detail";
import NoSelectChildren from "./eachComponentStage1/rightSide/NoSelectChildren";
import axios from "axios";
import { currenStepAction } from "../redux/reducers/currentStepSlice";

export default function Stage1Payment({ id}) {

  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const currestep = useSelector((state)=>state.payment.currestep)
  const dispatch = useDispatch();
  const listChildren = useSelector((state) => state.children.listChildren);
  const arriveDate = useSelector((state) => state.arriveDate.arriveDate);
  const advitory = useSelector((state) => state.children.advitory_detail);


  const [user, setUser] = useState(null);
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [inputAdvisory, setInputAdvisory] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [checkSent, setSent] = useState(false);
  const [inputDat, setData] = useState({

    parentID: user?.id || "",
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
      setLoading(true)
      setErr(null);
      try {
        const res = await axios.get(`http://localhost:3000/user/${id}`);
        if (res.status === 200 && res?.data) {
          setUser(res.data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setErr("Fetch failed");
      } finally {
        setLoading(false)
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
    <div className="min-h-screen py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full lg:w-[550px] space-y-8">
            <HeaderLeftSide user={user} />
            <ChildrenList
              user={user}
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
                        parentName={user?.name}
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
                    onClick={arriveDate !== null ? ()=>dispatch(currenStepAction.increaseStep()) : undefined}
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
    </div>
  );
}