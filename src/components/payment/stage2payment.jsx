import { useMemo, useEffect, useState } from "react";
import HeaderSection from "./eachComponentStage2/leftSide/headerSection";
import ChildrenListSection from "./eachComponentStage2/leftSide/childrenListSection";
import SummaryHeaderCard from "./eachComponentStage2/rightSide/headerSummary";
import PaymentSummaryCard from "./eachComponentStage2/rightSide/paymentSummaryCard";
import PaymentMethodCard from "./eachComponentStage2/rightSide/PaymentMethodCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { vaccineAction } from "../redux/reducers/selectVaccine";
import { childAction } from "../redux/reducers/selectChildren";
import { arriveActions } from "../redux/reducers/arriveDate";
import PaymentStatusModal from "./eachComponentStage3/modalStatusPayment";

export default function Stage2Payment({ id ,isopennextstep}) {
    const [showModal, setShowModal] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState("");

    const arriveDate = useSelector((state) => state.arriveDate.arriveDate);
    const user = useSelector((state) => state.account.user);
    const paymentMenthod = useSelector((state) => state.methodPayment.methodPayment);
    const itemList = useSelector((state) => state.vaccine.itemList);
    const listChildren = useSelector((state) => state.children.listChildren);
    const totalPrice = useSelector((state) => state.vaccine.totalPrice);
    const advitory_detail = useSelector((state) => state.children.advitory_detail);

    const dispatch = useDispatch();


    

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const CalculateTotal = useMemo(() => {
        const totalPriceVaccine = totalPrice;
        return listChildren.length * totalPriceVaccine;
    }, [listChildren, itemList]);

    // Xử lý thanh toán
    const handleSubmit = async () => {
        try {
            // Bước 1: Gọi API lấy URL thanh toán
            const res = await axios.get(`http://localhost:3000/paymentMenthod/${paymentMenthod}`);
            if (res?.status === 200 && res?.data?.payUrl) {
                setPaymentUrl(res.data.payUrl);
                setIsOpen(true);
            } else {
                toast.error("Không thể lấy URL thanh toán!");
                return;
            }

            // Bước 2: Theo dõi trạng thái thanh toán
            const interval = setInterval(async () => {
                try {
                    const statusRes = await axios.get(`http://localhost:3000/paymentMenthod/status/${paymentMenthod}`);
                    if (statusRes?.data?.message === "success") {
                        clearInterval(interval);

                        // Lưu dữ liệu thanh toán
                        const value = {
                            parentId: user.id,
                            advitory_detail: advitory_detail || null,
                            totalPrice: CalculateTotal + CalculateTotal * 0.05,
                            paymentMenthod: paymentMenthod,
                            arrvieDate: arriveDate,
                            listChildren: listChildren.map((child) => child.id),
                            listVaccine: itemList.map((vaccine) => vaccine.id),
                        };

                        const saveRes = await axios.post("http://localhost:3000/payment/save", value);
                        if (saveRes?.status === 201) {
                            toast.success("Thanh toán thành công!");
                            dispatch(vaccineAction.completePayment());
                            dispatch(childAction.completePayment());
                            dispatch(arriveActions.resetArriveDate());
                            setIsSuccess(true);
                        } else {
                            throw new Error("Lưu thông tin thất bại!");
                        }
                    } else if (statusRes?.data?.message === "failed") {
                        clearInterval(interval);
                        throw new Error("Thanh toán thất bại!");
                    }
                } catch (error) {
                    clearInterval(interval);
                    toast.error(`Lỗi: ${error.message}`);
                    setIsSuccess(false);
                } finally {
                    setShowModal(true);
                    setIsOpen(false);
                }
            }, 18000);
        } catch (error) {
            toast.error(`Lỗi: ${error.message}`);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            {/* <ToastContainer /> */}

            {/* Modal trạng thái thanh toán */}
            {/* <PaymentStatusModal
                isSuccess={isSuccess}
                setIsSuccess={setIsSuccess}
                showModal={showModal}
                setShowModal={setShowModal}
            /> */}

            {/* Modal thanh toán */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] relative z-50">
                        <iframe src={paymentUrl} width="100%" height="500px" className="rounded-md"></iframe>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}


            <div className="flex flex-col lg:flex-row gap-12">
                {/* Left Side */}
                <div className="w-full lg:w-[600px] space-y-8">
                    <HeaderSection listChildren={listChildren} />
                    <ChildrenListSection childrenVaccines={listChildren} listVaccine={itemList} advitory_detail={advitory_detail} />
                </div>

                {/* Right Side */}
                <div className="w-full lg:w-[600px] space-y-8">
                    <SummaryHeaderCard />
                    <PaymentSummaryCard CalculateTotal={CalculateTotal} />
                    <PaymentMethodCard listChildren={listChildren} CalculateTotal={CalculateTotal} handleSubmit={()=>isopennextstep(3)} />
                </div>
            </div>
        </div>
    );
}
