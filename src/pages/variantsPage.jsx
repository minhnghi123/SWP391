import { Link } from "react-router-dom";

import FooterHomePage from '../components/home/footerHomPage';
import BodyVariantsHomePage from "../components/variants/bodyVariantsPage";
import Header from '../components/home/headerHomePage';

const VariantsPage = () => {
    return (
        <div className="relative min-h-screen flex flex-col">
            {/* <Header/> */}
            <BodyVariantsHomePage/>
            <FooterHomePage/>
        </div>
    )
}

export default VariantsPage;