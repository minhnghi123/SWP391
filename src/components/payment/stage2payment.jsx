import { useState, useContext, useMemo, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';

export default function Stage2Payment({ isopennextstep }) {
    const itemList = useSelector((state) => state.vaccine.itemList)
    const listChildren = useSelector((state) => state.children.listChildren)
    const totalPrice = useSelector((state) => state.vaccine.totalPrice)
    const user = useSelector((state) => state.account.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(itemList)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const handleNextStep = () => {
        isopennextstep(3);
    };
    const handleSubmit = async () => {
        const value = {
            parentId: user.id,
            totalPrice: totalPrice,
            itemList: itemList, // Ensure itemList is an array
            advitory_detail: ''
        };

        const postData = async () => {
            try {
                const res = await axios.post('http://localhost:3000/payments', value);
                toast.success('Post success')
                dispatch(vaccineAction.completePayment())
                dispatch(childAction.completePayment())


            } catch (error) {
                toast.error('Failed')
                console.error('Failed', error);
            }
        };

        await postData();
    };





    const CalculateTotal = useMemo(() => {
        const totalPriceVaccine = totalPrice
        const total = listChildren.length * totalPriceVaccine;
        return total;
    }, [listChildren, itemList]);

    return (
        <div className='max-w-7xl mx-auto px-4 py-16'>

            <div className='flex flex-col lg:flex-row gap-12'>
                {/* leftSide */}
                <div className="w-full lg:w-[600px] space-y-8">
                    <ToastContainer />
                    <HeaderSection childrenVaccines={listChildren} />
                    <ChildrenListSection childrenVaccines={listChildren} valueSelectVaccine={itemList} />
                </div>

                {/* rightSide */}
                <div className="w-full lg:w-[600px] space-y-8">
                    <button onClick={handleSubmit}>Post</button>
                    <SummaryHeaderCard />
                    <PaymentSummaryCard CalculateTotal={CalculateTotal} child={listChildren} />
                    <PaymentMethodCard childrenVaccines={listChildren} handleNextStep={handleNextStep} CalculateTotal={CalculateTotal} />
                </div>
            </div>
        </div>
    );
}