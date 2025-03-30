import { Link } from "react-router-dom";
import Header from '../components/home/headerHomePage';
import BodyHomePage from '../components/home/bodyHomePage';
import FooterHomePage from '../components/home/footerHomPage';

export default function Home() {
  return (
    <div >
      {/* Header */}
      
        <Header />
      

      {/* Body */}
      <main className="flex-1">
        <BodyHomePage />
      </main>

      {/* Footer */}
      <FooterHomePage />
    </div>
  );
}