
import { useParams } from 'react-router-dom';
import Stage1Payment from '../components/payment/stage1payment';
export default function stage1Payment() {
 const {id}= useParams()

  return (
    <>

      {/* <HeaderPayment /> */}

     <Stage1Payment id={id}/>
{/* 
      <FooterHomePage /> */}

      )

    </>
  )


}
