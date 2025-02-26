import React from 'react';
import MenthodPayment from './menthodPayment';

const PaymentMethodCard = ({ listChildren, handleSubmit,isLoading }) => (
    <MenthodPayment listChildren={listChildren} handleSubmit={handleSubmit} isLoading={isLoading} />
);

export default PaymentMethodCard;