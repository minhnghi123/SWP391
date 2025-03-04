import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderSection from "./eachComponentStage2/leftSide/headerSection";
import ChildrenListSection from "./eachComponentStage2/leftSide/childrenListSection";
import SummaryHeaderCard from "./eachComponentStage2/rightSide/headerSummary";
import PaymentSummaryCard from "./eachComponentStage2/rightSide/paymentSummaryCard";
import PaymentMethodCard from "./eachComponentStage2/rightSide/PaymentMethodCard";
import { ToastContainer, toast } from "react-toastify";
import { addData } from "../../Api/axios";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Stage2Payment() {
    const { id } = useParams()
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const arriveDate = useSelector((state) => state.arriveDate.arriveDate);
    const paymentMenthod = useSelector((state) => state.methodPayment.methodPayment);
    const listChildren = useSelector((state) => state.children.listChildren);
    const totalPrice = useSelector((state) => state.vaccine.totalPrice);
    const advitory_detail = useSelector((state) => state.children.advitory_detail);
    const listVaccine = useSelector((state) => state.vaccine.listVaccine);
    const listComboVaccine = useSelector((state) => state.vaccine.listComboVaccine);
    const cart = useSelector(state => [...state.vaccine.listVaccine, ...state.vaccine.listComboVaccine]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const CalculateTotal = useMemo(() => {
        const totalPriceVaccine = totalPrice;
        return listChildren.length * totalPriceVaccine;
    }, [listChildren, listVaccine, listComboVaccine]);

    const handleSubmit = async () => {
        if (paymentMenthod === 2) {
            toast.error('Sever is not available')
            return
        }
        else if (paymentMenthod === 1) {
            setTimeout(() => {
                navigate('/confirm/pending')
            }, 3000)
        }
        try {
            setLoading(true)
            const totalPrice = (CalculateTotal || 0) + ((CalculateTotal || 0) * 0.05) + (Object.keys(advitory_detail || {}).length ? listChildren.length * 50000 : 0);

            const value = {
                parentId: id || "N/A",
                advisoryDetail: Object.keys(advitory_detail || {}).length ? advitory_detail : 'no',
                totalPrice: totalPrice,
                paymentId: paymentMenthod || "N/A",
                arrivedAt: arriveDate || "N/A",
                childrenIds: (listChildren || []).map(child => child.id),
                vaccineIds: (listVaccine || []).map(vaccine => vaccine.id),
                vaccineComboIds: (listComboVaccine || []).map(combo => combo.id)
            };
            const res = await addData('Booking/add-booking', value);
           
            if (res && res.status === 200 && res.data) {
                window.location.href = res.data;
            } else {
                console.log('Err fetch API', res);
                toast.error('API error: ' + (res?.message || 'Unknown error'));
            }
        } catch (err) {
            console.error("Payment error:", err);
            toast.error('Err fetch API');
        } finally {
            setLoading(false)
        }
    };




    return (
        <>
            <ToastContainer />
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Side */}
                    <div className="w-full lg:w-[600px] space-y-8">
                        <HeaderSection listChildren={listChildren} />
                        <ChildrenListSection
                            childrenVaccines={listChildren}
                            listVaccine={cart}
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
