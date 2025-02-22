
import { useState } from 'react'
import HeaderPayment from '../components/payment/HeaderPayment';
import Stage1Payment from '../components/payment/stage1payment';
import FooterHomePage from '../components/home/footerHomPage';
import Stage2Payment from '../components/payment/stage2payment';
import Stage3Payment from '../components/payment/stage3payment';
import { FeedbackProvider } from '../components/Context/FeedbackContext';
import { useParams } from 'react-router-dom';

export default function PaymentPage() {
  const [isopennextstep, setIsopenNextStep] = useState(1);
  const { id } = useParams();


  const renderBodyPayment = () => {
    switch (isopennextstep) {
      case 1:
        return <Stage1Payment id={id} isopennextstep={setIsopenNextStep} />
      case 2:
        return <Stage2Payment id={id} isopennextstep={setIsopenNextStep} />
      case 3:
        return <Stage3Payment id={id} isopennextstep={setIsopenNextStep} />
      default:
        return <Stage1Payment id={id} isopennextstep={setIsopenNextStep} />
    }
  }
  return (
    <>
      {
        isopennextstep === 3 ? (
          <FeedbackProvider>
            {renderBodyPayment()}
          </FeedbackProvider>
        ) : (
          <>
            <HeaderPayment currentStep={isopennextstep} setIsopenNextStep={setIsopenNextStep} />

            {renderBodyPayment()}

            <FooterHomePage />
          </>
        )
      }
    </>
  )


}
