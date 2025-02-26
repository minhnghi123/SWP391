import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // ✅ Thêm useNavigate
import axios from "axios";
import HeaderSection from "./eachComponentStage2/leftSide/headerSection";
import ChildrenListSection from "./eachComponentStage2/leftSide/childrenListSection";
import SummaryHeaderCard from "./eachComponentStage2/rightSide/headerSummary";
import PaymentSummaryCard from "./eachComponentStage2/rightSide/paymentSummaryCard";
import PaymentMethodCard from "./eachComponentStage2/rightSide/PaymentMethodCard";
import { vaccineAction } from "../redux/reducers/selectVaccine";
import { childAction } from "../redux/reducers/selectChildren";
import { arriveActions } from "../redux/reducers/arriveDate";
import { ToastContainer, toast } from "react-toastify";
import { currenStepAction } from "../redux/reducers/currentStepSlice";

export default function Stage2Payment({ id }) {
    const navigate = useNavigate(); // ✅ Khởi tạo navigate
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const arriveDate = useSelector((state) => state.arriveDate.arriveDate);
    const user = useSelector((state) => state.account.user);
    const paymentMenthod = useSelector((state) => state.methodPayment.methodPayment);
    const itemList = useSelector((state) => state.vaccine.itemList);
    const listChildren = useSelector((state) => state.children.listChildren);
    const totalPrice = useSelector((state) => state.vaccine.totalPrice);
    const advitory_detail = useSelector((state) => state.children.advitory_detail);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const CalculateTotal = useMemo(() => {
        const totalPriceVaccine = totalPrice;
        return listChildren.length * totalPriceVaccine;
    }, [listChildren, itemList]);


    const handleSubmit = async () => {
        setLoading(true);
        try {
            const value = {
                parentId: user.id,
                advitory_detail: advitory_detail || null,
                totalPrice: CalculateTotal + CalculateTotal * 0.05,
                paymentMenthod: paymentMenthod,
                arriveDate: arriveDate,
                listChildren: listChildren.map((child) => child.id),
                listVaccine: itemList.map((vaccine) => vaccine.id),
            };

            const res = await axios.post(`/${paymentMenthod}`, value, { timeout: 900000 }); // 15 phút

            if (res?.status === 200 && res.data.status === "success") {
                // ✅ Thanh toán thành công
                dispatch(vaccineAction.completePayment());
                dispatch(childAction.completePayment());
                dispatch(arriveActions.resetArriveDate());
                dispatch(childAction.resetForm());
                dispatch(currenStepAction.increaseStep());

                setTimeout(() => {
                    dispatch(currenStepAction.increaseStep());
                    setLoading(false);
                    navigate(`/payment/success`);
                }, 1500); // Giữ setTimeout để tạo hiệu ứng
            } else {
                // ❌ Thanh toán thất bại
                setTimeout(() => {
                    dispatch(currenStepAction.increaseStep());
                    setLoading(false);
                    navigate(`/payment/failed`);
                }, 1500);
            }
        } catch (err) {
            // ❌ Xử lý lỗi API
            console.error("Payment error:", err);
            setTimeout(() => {
                dispatch(currenStepAction.increaseStep());
                setLoading(false);
                navigate(`/payment/failed`);
            }, 1500);
        }
    };




    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Side */}
                    <div className="w-full lg:w-[600px] space-y-8">
                        <HeaderSection listChildren={listChildren} />
                        <ChildrenListSection
                            childrenVaccines={listChildren}
                            listVaccine={itemList}
                            advitory_detail={advitory_detail}
                        />
                    </div>

                    {/* Right Side */}
                    <div className="w-full lg:w-[600px] space-y-8">
                        <SummaryHeaderCard />
                        <PaymentSummaryCard CalculateTotal={CalculateTotal} />
                        <PaymentMethodCard
                            listChildren={listChildren}
                            handleSubmit={handleSubmit}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        </>

    );
}
