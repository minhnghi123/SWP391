import PaymentStatus from '../components/payment/paymentStatus'
import HeaderPayment from '../components/payment/HeaderPayment'
import FooterHomePage from '../components/home/footerHomPage'

export default function paymentStatusPage() {
    return (
        <>
            <HeaderPayment />
            <PaymentStatus />
            <FooterHomePage/>
        </>
    )
}