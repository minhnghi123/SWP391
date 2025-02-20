import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { childAction } from "../redux/reducers/selectChildren";
import { arriveActions } from "../redux/reducers/arriveDate";
import { fetchData } from "../../Api/axios";
import { format } from "date-fns";
import HeaderLeftSide from "./eachComponentStage1/leftSide/HeaderLeftSide";
import ChildrenList from "./eachComponentStage1/leftSide/ChildrenList";
import FormAddChildren from "./eachComponentStage1/leftSide/formAddChildren";
import ChildCard from "./eachComponentStage1/rightSide/ChildCard";
import ChooseDateVaccination from "./eachComponentStage1/rightSide/ChooseDateVaccination,";
import FormAdvitory_detail from "./eachComponentStage1/rightSide/FormAdvitory_detail";
import NoSelectChildren from "./eachComponentStage1/rightSide/NoSelectChildren";

export default function Stage1Payment({ isopennextstep }) {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account.user);
  const listChildren = useSelector((state) => state.children.listChildren);
  const arriveDate = useSelector((state) => state.arriveDate.arriveDate);
  const advitory = useSelector((state) => state.children.advitory_detail);

  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [inputAdvisory, setInputAdvisory] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [checkSent, setSent] = useState(false);
  const [inputDat, setData] = useState({
    parentID: account?.id || "",
    id: "",
    name: "",
    dateOfBirth: "",
    gender: "",
    status: true,
    createDate: "",
  });

  useEffect(() => {
    if (selectedDate) {
      dispatch(arriveActions.setArriveDate(format(selectedDate, "yyyy/MM/dd")));
    } else {
      dispatch(arriveActions.resetArriveDate());
    }
  }, [selectedDate, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!account?.id) return;
    const getUserData = async () => {
      try {
        const res = await fetchData(`user/${account.id}`);
        if (res.status === 200 && res?.data) setUser(res.data);
      } catch (error) {
        console.error("Fetch error:", error);
        setErr("Fetch failed");
      }
    };
    getUserData();
  }, [account?.id]);

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

  const handleChange = (e) => {
    dispatch(childAction.handleOnChange({ name: e.target.name, value: e.target.value }));
  };

  const handleRemove = (id) => {
    dispatch(childAction.deleteChild(id));
  };

  const handleAddChildren = (child) => {
    dispatch(
      childAction.chooseChildren({
        parentID: account.id,
        ...child,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputDat.name || !inputDat.dateOfBirth) return alert("Vui lòng nhập đủ thông tin!");
    setData({ parentID: account.id, id: "", name: "", dateOfBirth: "", gender: "", status: true });
    setIsOpenFirst(false);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full lg:w-[550px] space-y-8">
            <HeaderLeftSide account={account} user={user} />
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
                    setSelectedDate={setSelectedDate}
                    selectedDate={selectedDate}
                  />
                  <div className="space-y-1 border-gray-200 border-b mb-5">
                    {listChildren.map((child) => (
                      <ChildCard
                        key={child.id}
                        child={child}
                        handleRemove={() => handleRemove(child.id)}
                        parentName={account.name}
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
                    onClick={arriveDate !== null ? () => isopennextstep(2) : undefined}
                    className={`w-full mt-6 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium shadow-lg transition-all duration-300 ${
                      arriveDate !== null ? "hover:from-teal-600 hover:to-teal-700" : "pointer-events-none opacity-50"
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