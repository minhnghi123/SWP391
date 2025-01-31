import { useState, useContext, useMemo, useEffect } from 'react';
import { VaccineContext } from '../Context/ChildrenSelected';
import { NumberOfPeopleContext } from "../Context/NumberOfPeopleVacines";
import { useNavigate } from 'react-router-dom';
import HeaderSection from './eachComponentStage2/leftSide/headerSection';
import ChildrenListSection from './eachComponentStage2/leftSide/childrenListSection';
import SummaryHeaderCard from './eachComponentStage2/rightSide/headerSummary';
import PaymentSummaryCard from './eachComponentStage2/rightSide/paymentSummaryCard';
import PaymentMethodCard from './eachComponentStage2/rightSide/PaymentMethodCard';

export default function Stage2Payment({ isopennextstep }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleNextStep = () => {
        isopennextstep(3);
    };

    const [valueSelectVaccine, setSelectedVaccines] = useState(() => {
        return JSON.parse(localStorage.getItem('AddItems')) || [];
    });

    const [childrenVaccines, setChildrenVaccine] = useState(() => {
        return JSON.parse(localStorage.getItem('childrenSelectedvaccines')) || [];
    });

    const { handleRemmoveChildren, isIDChildren } = useContext(NumberOfPeopleContext);

    useEffect(() => {
        setChildrenVaccine(JSON.parse(localStorage.getItem('childrenSelectedvaccines')) || []);
    }, [isIDChildren]);

    const CalculateTotal = useMemo(() => {
        const totalPrice = valueSelectVaccine.reduce((total, vaccine) => total + vaccine.price, 0);
        const total = childrenVaccines.length * totalPrice;
        return total;
    }, [valueSelectVaccine, childrenVaccines]);

    return (
        <div className='max-w-7xl mx-auto px-4 py-16'>
            <div className='flex flex-col lg:flex-row gap-12'>
                {/* leftSide */}
                <div className="w-full lg:w-[600px] space-y-8">
                    <HeaderSection childrenVaccines={childrenVaccines} />
                    <ChildrenListSection childrenVaccines={childrenVaccines} valueSelectVaccine={valueSelectVaccine} handleRemmoveChildren={handleRemmoveChildren} />
                </div>

                {/* rightSide */}
                <div className="w-full lg:w-[600px] space-y-8">
                    <SummaryHeaderCard />
                    <PaymentSummaryCard CalculateTotal={CalculateTotal} child={childrenVaccines} />
                    <PaymentMethodCard childrenVaccines={childrenVaccines} handleNextStep={handleNextStep} CalculateTotal={CalculateTotal} />
                </div>
            </div>
        </div>
    );
}