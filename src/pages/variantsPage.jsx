import { Link } from "react-router-dom";

import FooterHomePage from '../components/footerHomPage';
import BodyVariantsHomePage from "../components/bodyVariantsPage";
import Header from '../components/headerHomePage';

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