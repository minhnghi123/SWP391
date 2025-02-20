import { useMemo, useEffect, useState } from 'react';
import HeaderSection from './eachComponentStage2/leftSide/headerSection';
import ChildrenListSection from './eachComponentStage2/leftSide/childrenListSection';
import SummaryHeaderCard from './eachComponentStage2/rightSide/headerSummary';
import PaymentSummaryCard from './eachComponentStage2/rightSide/paymentSummaryCard';
import PaymentMethodCard from './eachComponentStage2/rightSide/PaymentMethodCard';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { vaccineAction } from '../redux/reducers/selectVaccine';
import { childAction } from '../redux/reducers/selectChildren';
import { arriveActions } from '../redux/reducers/arriveDate';
import PaymentStatusModal from './eachComponentStage3/modalStatusPayment';

export default function Stage2Payment({ isopennextstep }) {
    const [showModal, setShowModal] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const arriveDate = useSelector(state => state.arriveDate.arriveDate);
    const user = useSelector((state) => state.account.user);
    const paymentMenthod = useSelector((state) => state.methodPayment.methodPayment)
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
        const total = listChildren.length * totalPriceVaccine;
        return total;
    }, [listChildren, itemList]);

    // Handle payment function
    const handlePayment = async () => {
        try {
            const value = {
                parentId: user.id,
                advitory_detail: advitory_detail ? advitory_detail : null,
                totalPrice: CalculateTotal + (CalculateTotal * 0.05),
                paymentMenthod: paymentMenthod,
                arrvieDate: arriveDate,
                listChildren: listChildren.map((child) => child.id),
                listVaccine: itemList.map((vaccine) => vaccine.id),

            };
            const res = await axios.post('', value);
            if (res?.status === 201) {
                // isopennextstep(3);
                toast.success("Payment successful");
                dispatch(vaccineAction.completePayment());
                dispatch(childAction.completePayment());
                dispatch(arriveActions.resetArriveDate());

                // Show success modal
                setIsSuccess(true);
                setShowModal(true);
            } else {
                throw new Error(response?.data?.msg || "Payment failed");
            }
        } catch (error) {
            toast.error(`Failed: ${error?.response?.data?.message || error.message}`);
            console.error("Payment Error:", error);

            // Show failure modal
            setIsSuccess(false);
            setShowModal(true);
        }
    };

    return (
        <div className='max-w-7xl mx-auto px-4 py-16'>
            {/* <ToastContainer /> */}
            <PaymentStatusModal
                isSuccess={isSuccess}
                setIsSuccess={setIsSuccess}
                showModal={showModal}
                setShowModal={setShowModal}
            />

            <div className='flex flex-col lg:flex-row gap-12'>
                {/* leftSide */}
                <div className="w-full lg:w-[600px] space-y-8">
                    <HeaderSection listChildren={listChildren} />
                    <ChildrenListSection
                        childrenVaccines={listChildren}
                        listVaccine={itemList}
                        advitory_detail={advitory_detail}
                    />
                </div>

                {/* rightSide */}
                <div className="w-full lg:w-[600px] space-y-8">
                    <SummaryHeaderCard />
                    <PaymentSummaryCard CalculateTotal={CalculateTotal} />
                    <PaymentMethodCard
                        listChildren={listChildren}
                        CalculateTotal={CalculateTotal}
                        handleSubmit={handlePayment} // Ensure this prop is passed
                    />
                </div>
            </div>
        </div>
    );
}
