
import { useState } from 'react'
import HeaderPayment from '../components/payment/HeaderPayment';
import Stage1Payment from '../components/payment/stage1payment';
import FooterHomePage from '../components/home/footerHomPage';
import Stage2Payment from '../components/payment/stage2payment';
import Stage3Payment from '../components/payment/stage3payment';
import { NumberOfPeopleProvider } from '../components/Context/NumberOfPeopleVacines'
export default function PaymentPage() {
  const [isopennextstep, setIsopenNextStep] = useState(1);



  const renderBodyPayment = () => {
    switch (isopennextstep) {
      case 1:
        return <Stage1Payment isopennextstep={setIsopenNextStep} />
      case 2:
        return <Stage2Payment isopennextstep={setIsopenNextStep} />
      case 3:
        return <Stage3Payment isopennextstep={setIsopenNextStep} />
      default:
        return <Stage1Payment isopennextstep={setIsopenNextStep} />
    }
  }
  return (
    <>
      {
        isopennextstep === 3 ? (
          <NumberOfPeopleProvider>
            {renderBodyPayment()}
          </NumberOfPeopleProvider>
        ) : (
          <>
            <HeaderPayment currentStep={isopennextstep} setIsopenNextStep={setIsopenNextStep} />
            <NumberOfPeopleProvider>
              {renderBodyPayment()}
            </NumberOfPeopleProvider>
            <FooterHomePage />
          </>
        )
      }
    </>
  )


}
