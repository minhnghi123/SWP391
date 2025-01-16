
import { useState } from 'react'
import HeaderPayment from '../components/HeaderPayment';
import BodyPaymentPage from '../components/bodyPayment';
import FooterHomePage from '../components/footerHomPage';
import Stage2Payment from '../components/stage2payment';
import Stage3Payment from '../components/stage3payment';

export default function PaymentPage() {
  const [isopennextstep, setIsopenNextStep] = useState(1);


  const renderBodyPayment = () => {
    switch (isopennextstep) {
      case 1:
        return <BodyPaymentPage isopennextstep={setIsopenNextStep} />
      case 2:
        return <Stage2Payment isopennextstep={setIsopenNextStep} />
      case 3:
        return <Stage3Payment isopennextstep={setIsopenNextStep} />
      default:
        return <BodyPaymentPage isopennextstep={setIsopenNextStep} />
    }
  }
  return (
    <>
      <HeaderPayment currentStep={isopennextstep} />
      {renderBodyPayment()}
      {/* <BodyPaymentPage/> */}
      <FooterHomePage />
    </>
  )


}
