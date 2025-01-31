import React from 'react';
import SummaryCard from './summaryCard';

const PaymentSummaryCard = ({ CalculateTotal ,child}) => (
    <SummaryCard CalculateTotal={CalculateTotal} child={child} />
);

export default PaymentSummaryCard;