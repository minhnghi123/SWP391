import { Link } from "react-router-dom";

import FooterHomePage from "../components/home/footerHomPage";
import BodyAboutPage from "../components/aboutUs/bodyAboutPage";
import Header from "../components/home/headerHomePage";

const AboutPage = () => {
  return (
    <div>
      {/* Header */}
      <Header />

      <main className="flex-1">
        <BodyAboutPage />
      </main>

      {/* Footer */}
      <FooterHomePage />
    </div>
  );
};

export default AboutPage;
