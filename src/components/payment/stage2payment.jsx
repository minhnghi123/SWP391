import { useState, useContext, useMemo, useEffect } from 'react';
import HeaderSection from './eachComponentStage2/leftSide/headerSection';
import ChildrenListSection from './eachComponentStage2/leftSide/childrenListSection';
import SummaryHeaderCard from './eachComponentStage2/rightSide/headerSummary';
import PaymentSummaryCard from './eachComponentStage2/rightSide/paymentSummaryCard';
import PaymentMethodCard from './eachComponentStage2/rightSide/PaymentMethodCard';
import { useSelector, useDispatch } from "react-redux";
import { vaccineAction } from '../redux/reducers/SelectVaccine';

export default function Stage2Payment({ isopennextstep }) {
    const dispatch = useDispatch()
    const itemList = useSelector((state) => state.vaccine.itemList)
    const listChildren = useSelector((state) => state.children.listChildren)
    const totalPrice = useSelector((state) => state.vaccine.totalPrice)
   
    useEffect(() => {
        window.scrollTo(0, 0);
        const storedData = localStorage.getItem('ListVaccine');
        if (storedData) {
           dispatch(vaccineAction.replaceData(JSON.parse(storedData)))
        }
        
    }, []);

    const handleNextStep = () => {
        isopennextstep(3);
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
                    <HeaderSection childrenVaccines={listChildren} />
                    <ChildrenListSection childrenVaccines={listChildren} valueSelectVaccine={itemList} />
                </div>

                {/* rightSide */}
                <div className="w-full lg:w-[600px] space-y-8">
                    <SummaryHeaderCard />
                    <PaymentSummaryCard CalculateTotal={CalculateTotal} child={listChildren} />
                    <PaymentMethodCard childrenVaccines={listChildren} handleNextStep={handleNextStep} CalculateTotal={CalculateTotal} />
                </div>
            </div>
        </div>
    );
}