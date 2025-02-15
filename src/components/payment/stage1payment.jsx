import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "../../assets/p5.jpg";
import { childAction } from "../redux/reducers/selectChildren";
import { fetchData } from "../../Api/axios";
import ProfileUser from "./eachComponentStage1/leftSide/profileUser";
import FormAddChildren from "./eachComponentStage1/leftSide/formAddChildren";
import ChildCard from "./eachComponentStage1/rightSide/ChildCard";
import ListChild from "./eachComponentStage1/leftSide/ListChild";

export default function BodyPaymentPage({ isopennextstep }) {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(null);
    const [isOpenFirst, setIsOpenFirst] = useState(false);
    const account = useSelector((state) => state.account.user);
    const listChildren = useSelector((state) => state.children.listChildren);

  
    const handleChange = (e) => {
        dispatch(childAction.handleOnChange({ name: e.target.name, value: e.target.value }));
    };
    const handleRemove =(id)=>{
    
        dispatch(childAction.deleteChild(id))
    }
    // Lấy dữ liệu từ LocalStorage & API
    useEffect(() => {
        window.scrollTo(0, 0);
        if (!account?.id) return;

        const getUserData = async () => {
            try {
                const res = await fetchData(`user/${account.id}`);
                if (res.status === 200 && res?.data) {
                    setUser(res.data);
                }
            } catch (error) {
                console.error("Fetch error:", error);
                setErr('Fetch failed');
            }
        };
        getUserData();
    }, [account?.id]);

    // Xử lý chọn trẻ
    const handleAddChildren = (child) => {
        dispatch(childAction.chooseChildren({
            parentID: account.id,
            id: child.id,
            name: child.name,
            dateOfBirth: child.dateOfBirth,
            gender: child.gender,
            status: child.status,
            createDate: child.createDate
        }));
    };

    // Dữ liệu form thêm trẻ
    const [inputDat, setData] = useState({
        parentID: account?.id || '',
        id: '',
        name: '',
        dateOfBirth: '',
        gender: '',
        status: true,
        createDate: ''
    });

    // Xử lý submit form thêm trẻ
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputDat.name || !inputDat.dateOfBirth) {
            alert("Vui lòng nhập đủ thông tin!");
            return;
        }

        dispatch(childAction.chooseChildren({ ...inputDat, id: Date.now() }));

        setData({
            parentID: account.id,
            id: '',
            name: '',
            dateOfBirth: '',
            gender: '',
            status: true,
            createDate: ''
        });

        setIsOpenFirst(false);
    };

    const handleNextStep = () => isopennextstep(2);

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
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">Child Details</h3>
                                    <div className="space-y-8">
                                        {listChildren.map((child) => (
                                            <ChildCard key={child.id} child={child} handleRemove={()=>handleRemove(child.id)} />
                                        ))}
                                    </div>
                                    <button
                                        onClick={handleNextStep}
                                        className="w-full mt-6 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300"
                                    >
                                        Proceed to Payment
                                    </button>
                                </>
                            ) : (
                                <p className="text-center py-12 text-gray-500">
                                    Please select children to view details
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
