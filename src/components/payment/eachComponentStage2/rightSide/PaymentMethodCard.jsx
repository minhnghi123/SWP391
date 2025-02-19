import React from 'react';
import MenthodPayment from './menthodPayment';

const PaymentMethodCard = ({ listChildren, CalculateTotal, handleSubmit }) => (
    <MenthodPayment listChildren={listChildren} CalculateTotal={CalculateTotal} handleSubmit={handleSubmit} />
);

export default PaymentMethodCard;