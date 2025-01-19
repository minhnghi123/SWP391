import { Link } from "react-router-dom";

import Header from '../components/home/headerHomePage';
import BodyVariantsHomePage from "../components/variants/bodyVariantsPage";
import FooterHomePage from '../components/home/footerHomPage';

const VariantsPage = () => {
 
    return (
        <>
            <Header />
            <BodyVariantsHomePage  />
            <FooterHomePage />
        </>
    )

}

export default VariantsPage;