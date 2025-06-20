import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderSection from "./eachComponentStage2/leftSide/headerSection";
import ChildrenListSection from "./eachComponentStage2/leftSide/childrenListSection";
import SummaryHeaderCard from "./eachComponentStage2/rightSide/headerSummary";
import PaymentSummaryCard from "./eachComponentStage2/rightSide/paymentSummaryCard";
import PaymentMethodCard from "./eachComponentStage2/rightSide/PaymentMethodCard";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { childAction } from "../redux/reducers/selectChildren";
import { vaccineAction } from "../redux/reducers/selectVaccine";
import { methodPaymentAction } from "../redux/reducers/methodPaymentlice";
import useAxios from "../../utils/useAxios";
import { locationAciton } from "../redux/reducers/locationBooking";
const url = import.meta.env.VITE_BASE_URL_DB
export default function Stage2Payment() {
    const api = useAxios()
    const { id } = useParams()
    const [isLoading, setLoading] = useState(false);




    // redux state
    const dispatch = useDispatch()
    const arriveDate = useSelector((state) => state.children.arriveDate);
    const paymentMenthod = useSelector((state) => state.methodPayment.methodPayment);
    const listChildren = useSelector((state) => state.children.listChildren);
    const totalPrice = useSelector((state) => state.vaccine.totalPrice);
    const advitory_detail = useSelector((state) => state.children.advitory_detail);
    const listVaccine = useSelector((state) => state.vaccine.listVaccine);
    const listComboVaccine = useSelector((state) => state.vaccine.listComboVaccine);
    const cart = useSelector(state => [...state.vaccine.listVaccine, ...state.vaccine.listComboVaccine]);
   
    //scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    // no render when listChildren change
    const CalculateTotal = useMemo(() => {
        const totalPriceVaccine = totalPrice;
        return listChildren.length * totalPriceVaccine;
    }, [listChildren, listVaccine, listComboVaccine]);

    //handle submit
    const handleSubmit = async () => {
        dispatch(locationAciton.resetLocation())
        try {
            setLoading(true)

            const value = {
                parentId: id || "N/A",
                advisoryDetail: Object.keys(advitory_detail || {}).length ? advitory_detail : 'no',
                totalPrice: CalculateTotal,
                paymentId: paymentMenthod,
                arrivedAt: arriveDate || "N/A",
                childrenIds: (listChildren || []).map(child => child.id),
                vaccineIds: (listVaccine || []).map(vaccine => vaccine.id),
                vaccineComboIds: (listComboVaccine || []).map(combo => combo.id),

            };
            const res = await api.post(`${url}/Booking/add-booking`, value);
            if (res.status === 200 && res.data) {
                if (paymentMenthod === 1) {
                    window.location.href = res.data;
                    dispatch(childAction.completePayment())
                    dispatch(vaccineAction.completePayment())
                    dispatch(methodPaymentAction.resetMethodPayment())  
                }
                else {
                    window.location.href = res.data;
                }

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
            <div className="max-w-7xl mx-auto px-4 py-16 animate-fadeIn">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Side */}
                    <div className="w-full lg:w-[600px] space-y-8">
                        <HeaderSection listChildren={listChildren} />
                        <ChildrenListSection
                            childrenVaccines={listChildren}
                            listVaccine={cart}
                            advitory_detail={advitory_detail}
                            id={id}
                           


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
