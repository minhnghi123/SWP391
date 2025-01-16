import { Link } from 'react-router-dom';

import FooterHomePage from '../components/footerHomPage';
import BodyAboutPage from '../components/bodyAboutPage';
import Header from '../components/headerHomePage';

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