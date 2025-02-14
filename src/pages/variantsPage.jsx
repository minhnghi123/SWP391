import { Link } from "react-router-dom";

import HeaderVariants from '../components/variants/headerVariants';
import BodyVariantsHomePage from "../components/variants/bodyVariantsPage";
import FooterHomePage from '../components/home/footerHomPage';
import { VaccineProvider } from '../components/Context/ChildrenSelected'
const VariantsPage = () => {

    return (
        <>
        <VaccineProvider>
           <HeaderVariants/>

            <BodyVariantsHomePage />


            <FooterHomePage />
        </VaccineProvider>
        </>
    )

}

export default VariantsPage;