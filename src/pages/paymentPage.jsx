
import { useState } from 'react'
import HeaderPayment from '../components/payment/HeaderPayment';
import Stage1Payment from '../components/payment/stage1payment';
import FooterHomePage from '../components/home/footerHomPage';
import Stage2Payment from '../components/payment/stage2payment';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Stage3Payment from '../pages/paymentStatusPage'
export default function PaymentPage() {

  const { id } = useParams();
  const currentStep = useSelector((state) => state.payment.currentStep)
  const renderBodyPayment = () => {
    switch (currentStep) {
      case 1:
        return <Stage1Payment id={id} />
      case 2:
        return <Stage2Payment id={id} />
      default:
        return <Stage1Payment id={id} />
    }
  }
  return (
    <>

      <HeaderPayment />

      {renderBodyPayment()}

      <FooterHomePage />

      )

    </>
  )


}
