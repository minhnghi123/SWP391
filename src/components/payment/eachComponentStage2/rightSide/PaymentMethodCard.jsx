import React from 'react';
import MenthodPayment from './menthodPayment';

const PaymentMethodCard = ({ childrenVaccines, handleNextStep, CalculateTotal }) => (
    <MenthodPayment childrenVaccines={childrenVaccines} handleNextStep={handleNextStep} CalculateTotal={CalculateTotal} />
);

export default PaymentMethodCard;