import { Link } from "react-router-dom";

import HeaderVariants from '../components/variants/headerVariants';
import BodyVariantsHomePage from "../components/variants/bodyVariantsPage";
import FooterHomePage from '../components/home/footerHomPage';

const VariantsPage = () => {

    return (
        <>
            {/* <HeaderVariants /> */}
            <BodyVariantsHomePage />
            <FooterHomePage />
        </>
    )

}

export default VariantsPage;