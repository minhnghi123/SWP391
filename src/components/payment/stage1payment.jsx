import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { childAction } from "../redux/reducers/selectChildren";
import { arriveActions } from "../redux/reducers/arriveDate";
import { fetchData } from "../../Api/axios";
import { format, set } from "date-fns";
import HeaderLeftSide from "./eachComponentStage1/leftSide/HeaderLeftSide";
import ChildrenList from "./eachComponentStage1/leftSide/ChildrenList";
import FormAddChildren from "./eachComponentStage1/leftSide/formAddChildren";
import ChildCard from "./eachComponentStage1/rightSide/ChildCard";
import ChooseDateVaccination from "./eachComponentStage1/rightSide/ChooseDateVaccination,";
import FormAdvitory_detail from "./eachComponentStage1/rightSide/FormAdvitory_detail";
import NoSelectChildren from "./eachComponentStage1/rightSide/NoSelectChildren";
import axios from "axios";

export default function Stage1Payment({ id, isopennextstep }) {

  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);


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
    if (selectedDate) {
      dispatch(arriveActions.setArriveDate(format(selectedDate, "yyyy/MM/dd")));
    }
  }, [selectedDate, dispatch]);


  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100); // Đợi 100ms trước khi scroll
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
                    {/* Left section */}
                    <div className="w-full lg:w-[550px] space-y-8">
                        {/* Welcome Section */}
                        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-3xl p-8 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold mb-2">
                                        Welcome Back, {account?.name}!
                                    </h1>
                                    <p className="text-teal-100">
                                        Complete your payment information below
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Patient Profile */}
                        <ProfileUser
                            id={account?.id || ''}
                            name={account?.name || ''}
                            email={account?.email || ''}
                            status={user?.status ? 'Active' : 'No Active'}
                            img={account?.picture || Avatar}
                        />

                        {/* Children List */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                                        Children List
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-100 text-sm font-medium text-teal-600">
                                            {listChildren.length}
                                        </span>
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Select children for vaccination registration
                                    </p>
                                </div>

                                <button
                                    onClick={() => setIsOpenFirst(!isOpenFirst)}
                                    className="px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-medium hover:bg-teal-100 transition-all"
                                >
                                    Add New Child
                                </button>
                            </div>

                            {/* Danh sách trẻ */}
                            <div className="grid gap-4">
                                {user?.children ? (
                                    user?.children.map((child) => (
                                        <ListChild key={child.id} child={child} isSelected={listChildren} handleChoose={() => handleAddChildren(child)} />
                                    ))
                                ) : (
                                    <div>Not Found</div>
                                )}
                            </div>

                            {/* Nếu không có trẻ nào */}
                            {user?.children?.length === 0 && (
                                <div className="mt-6 text-center">
                                    <button
                                        onClick={() => setIsOpenFirst(!isOpenFirst)}
                                        className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium shadow-md hover:from-teal-600 hover:to-teal-700 transition-all"
                                    >
                                        Add Your First Child
                                    </button>
                                </div>
                            )}
                        </div>

                        {isOpenFirst && (
                            <FormAddChildren
                                handleOnchange={handleChange}
                                handleSubmit={handleSubmit}
                            />
                        )}
                    </div>

                    {/* Right Section */}
                    <div className="w-full lg:w-[650px] space-y-6">
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 sticky top-6">
                            {listChildren.length > 0 ? (
                                <>
                                    <div className="h-[100px] flex flex-row justify-between items-center p-4 bg-gradient-to-r from-blue-50 via-white to-blue-100 shadow-md rounded-lg">
                                        <h3 className="text-xl font-bold text-gray-900">Danh sách trẻ được chích</h3>
                                        <div className="relative">
                                            {/* Nếu chưa chọn ngày, hiển thị nút "Chọn ngày chích" */}
                                            {!arriveDate && (
                                                <button
                                                    aria-label="Chọn ngày chích"
                                                    onClick={() => setShowCalendar(!showCalendar)}
                                                    className="px-4 py-2 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 text-white rounded-lg text-sm font-medium 
                            transition-all duration-300 ease-in-out shadow-md hover:shadow-lg 
                            hover:from-blue-400 hover:to-blue-600"
                                                >
                                                    📅 Chọn ngày chích
                                                </button>
                                            )}

                                            {/* Hiển thị lịch khi click nút */}
                                            {showCalendar && (
                                                <div
                                                    className="absolute top-full mt-2 bg-white p-3 border rounded-lg shadow-lg z-10"
                                                    role="dialog"
                                                    aria-label="Calendar picker"
                                                >
                                                    <DatePicker
                                                        selected={selectedDate}
                                                        onChange={(date) => {
                                                            setSelectedDate(date);
                                                            setShowCalendar(false);
                                                        }}
                                                        inline
                                                        minDate={new Date()}
                                                    />
                                                </div>
                                            )}

                                            {/* Khi đã chọn ngày, hiển thị ngày đã chọn + nút reset */}
                                            {arriveDate && (
                                                <div className="mt-3 flex items-center gap-4 bg-green-50 p-3 rounded-lg">
                                                    <p className="text-sm text-green-700 font-medium flex items-center">
                                                        <svg
                                                            className="w-5 h-5 mr-2 text-green-600"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                        Ngày đã chọn: {arriveDate}
                                                    </p>
                                                    <button
                                                        aria-label="Xóa ngày đã chọn"
                                                        onClick={() => {
                                                            setSelectedDate(null);
                                                            dispatch(arriveActions.resetArriveDate());
                                                            setShowCalendar(false);
                                                        }}

                                                        className="p-2 bg-gray-200 text-gray-700 rounded-full transition duration-300 hover:bg-gray-300"
                                                    >
                                                        <RefreshCcw className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-1 border-gray-200 border-b mb-5 ">
                                        {listChildren.map((child) => (
                                            <ChildCard key={child.id} child={child} handleRemove={() => handleRemove(child.id)} parentName={account.name} />
                                        ))}

                                    </div>
                                    {(advitory && Object.keys(advitory).length > 0) || checkSent ? (
                                        <div className="flex items-center justify-between mt-6 bg-green-50 p-4 rounded-xl shadow-sm border border-green-200">
                                            <div className="flex items-center space-x-3">
                                                <CheckOutlinedIcon sx={{ color: 'green', fontSize: 24 }} />
                                                <span className="text-green-800 font-medium text-sm sm:text-base">
                                                    Thank you for your support! Your request has been received.
                                                </span>
                                            </div>
                                            <button
                                                className="text-teal-600 font-medium hover:underline focus:outline-none"
                                                onClick={resetForm}
                                            >
                                                Submit another request
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                                Nếu bạn cần tư vấn thì điền form?
                                            </label>
                                            <form onSubmit={handleInputAdvisory} className="flex flex-row items-center gap-2 mt-4">
                                                <input
                                                    type="text"
                                                    value={inputAdvisory}
                                                    onChange={(e) => setInputAdvisory(e.target.value)}
                                                    id="advisory"
                                                    name="advisory"
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 
                  focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                                                    placeholder="Bạn cần hỗ trợ gì?"
                                                />
                                                <button
                                                    type="submit"
                                                    className="bg-teal-500 text-white px-4 py-3 rounded-xl hover:bg-teal-600 transition-all"
                                                >
                                                    Send
                                                </button>
                                            </form>

                                        </>
                                    )}

                                    <button
                                        onClick={arriveDate !== null ? handleNextStep : undefined}
                                        className={`w-full mt-6 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium shadow-lg 
        transition-all duration-300
        ${arriveDate !== null
                                                ? 'hover:from-teal-600 hover:to-teal-700'
                                                : 'pointer-events-none opacity-50'
                                            }`}
                                    >
                                        Proceed to Payment
                                    </button>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M12 9v3m0 0v3m0-3h3m-3 0H6" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Children Selected</h3>
                                    <p className="text-gray-500">Please select children from the list to view their details</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}