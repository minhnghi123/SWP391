import { Link } from 'react-router-dom';

import FooterHomePage from '../components/home/footerHomPage';
import BodyAboutPage from '../components/aboutUs/bodyAboutPage';
import Header from '../components/home/headerHomePage';

const AboutPage = () => {
    return (
        <div className="relative min-h-screen flex flex-col">
            <Header/>
            <BodyAboutPage/>
            <FooterHomePage/>
        </div>
    )
}

export default AboutPage;