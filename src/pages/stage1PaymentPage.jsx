
import { useParams } from 'react-router-dom';
import Stage1Payment from '../components/payment/stage1payment';
import FooterHomePage from '../components/home/footerHomPage'
import HeaderPayment from '../components/payment/HeaderPayment';
export default function stage1Payment() {
  const { id } = useParams()

  return (
    <>

      

        <Stage1Payment id={id} />
     
   

      

    </>
  )


}
