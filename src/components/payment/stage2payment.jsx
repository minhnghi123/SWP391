import { useMemo, useEffect } from 'react';
import HeaderSection from './eachComponentStage2/leftSide/headerSection';
import ChildrenListSection from './eachComponentStage2/leftSide/childrenListSection';
import SummaryHeaderCard from './eachComponentStage2/rightSide/headerSummary';
import PaymentSummaryCard from './eachComponentStage2/rightSide/paymentSummaryCard';
import PaymentMethodCard from './eachComponentStage2/rightSide/PaymentMethodCard';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import { vaccineAction } from '../redux/reducers/selectVaccine';
import { childAction } from '../redux/reducers/selectChildren';


export default function Stage2Payment({ isopennextstep }) {
    const itemList = useSelector((state) => state.vaccine.itemList)
    const listChildren = useSelector((state) => state.children.listChildren)
    const totalPrice = useSelector((state) => state.vaccine.totalPrice)
    const user = useSelector((state) => state.account.user);
    const advitory_detail = useSelector((state) => state.children.advitory_detail)
    const dispatch = useDispatch()
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const handleNextStep = () => {
        isopennextstep(3);
    };
    const CalculateTotal = useMemo(() => {
        const totalPriceVaccine = totalPrice
        const total = listChildren.length * totalPriceVaccine;
        return total;
    }, [listChildren, itemList]);
    const handleSubmit = async () => {
        const value = {
            parentId: user.id,
            totalPrice: CalculateTotal + (CalculateTotal * 0.05),
            advitory_detail: advitory_detail ? advitory_detail : '',
            itemList: itemList.map((vaccine) => vaccine.id),
            listChildren: listChildren.map((child) => child.id),
        };

        const postData = async () => {
            try {
                const res = await axios.post('http://localhost:3000/payments', value);
                if (res?.status === 201 ) {
                    toast.success('Post success');
                    dispatch(vaccineAction.completePayment());
                    dispatch(childAction.completePayment());
                }

            } catch (error) {
                toast.error(`Failed: ${error.message || 'An error occurred'}`);
                console.error('Failed', error);
            }
        };

        await postData();
    };

    return (
        <div className='max-w-7xl mx-auto px-4 py-16'>
 <ToastContainer />
            <div className='flex flex-col lg:flex-row gap-12'>
                {/* leftSide */}
                <div className="w-full lg:w-[600px] space-y-8">
                   
                    <HeaderSection childrenVaccines={listChildren} />
                    <ChildrenListSection childrenVaccines={listChildren} valueSelectVaccine={itemList}  advitory_detail={advitory_detail} />
                </div>
                {/* rightSide */}
                <div className="w-full lg:w-[600px] space-y-8">
                    <SummaryHeaderCard />
                    <PaymentSummaryCard CalculateTotal={CalculateTotal} />
                    <PaymentMethodCard childrenVaccines={listChildren} handleNextStep={handleNextStep} CalculateTotal={CalculateTotal} />
                </div>
            </div>
        </div>
    );
}